import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const noDeepRelative = {
  group: ["../../../*"],
  message: "Use the @/* path alias instead of deep relative imports.",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Baseline: no deep relative imports; no raw console (use @/lib/logger).
  {
    rules: {
      "no-restricted-imports": ["error", { patterns: [noDeepRelative] }],
      "no-console": "error",
    },
  },

  // §3 boundary: only lib/dal may touch lib/db.
  {
    files: ["src/components/**", "src/features/**", "src/app/**", "src/providers/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            noDeepRelative,
            {
              group: ["@/lib/db", "@/lib/db/*"],
              message: "Import data through @/lib/dal, never @/lib/db directly.",
            },
          ],
        },
      ],
    },
  },

  // §3 boundary: components/ui stays generic (no features, data layer or store).
  {
    files: ["src/components/ui/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            noDeepRelative,
            {
              group: [
                "@/features/*",
                "@/lib/dal",
                "@/lib/dal/*",
                "@/lib/db",
                "@/lib/db/*",
                "@/store",
                "@/store/*",
              ],
              message:
                "components/ui must stay generic — no features, data layer or store imports.",
            },
          ],
        },
      ],
    },
  },

  // Test files may reach anywhere.
  {
    files: ["**/*.{test,spec}.{ts,tsx}", "src/test/**"],
    rules: { "no-restricted-imports": "off" },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "coverage/**"]),
]);

export default eslintConfig;
