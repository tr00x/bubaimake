module.exports = {
  apps: [{
    name: "masynbazar-backend",
    script: "/root/.nvm/versions/node/v22.18.0/bin/npm",
    args: "run server",
    cwd: "/var/www/masynbazar",
    env: {
      NODE_ENV: "production",
      PORT: 3001
    }
  }]
}
