// PM2 process definition for the IMETS Academy web app (Next.js).
// Usage (on the server, from the repo root):
//   pnpm install && pnpm build
//   pm2 start ecosystem.config.js && pm2 save
// Runtime config comes from `.env.production` / `.env` in this directory.
module.exports = {
  apps: [
    {
      name: 'imets-web',
      cwd: __dirname,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '600M',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
  ],
};
