const postDeployCommand = [
  'MEDIASOUP_ANNOUNCED_IP=`curl ifconfig.co`',
  'npm install',
  'sudo -E pm2 reload ecosystem.config.js --env production',
].join(' && ')

module.exports = {
  apps : [
    {
      name: 'app',
      script: 'app/node_modules/.bin/gulp',
      args: '--gulpfile ./app/gulpfile.js live',
      instances: 1,
      autorestart: true,
      // watch: true,
      max_memory_restart: '1G',
      env: {
        PROTOO_LISTEN_PORT: 800,
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        DOMAIN: 'socket.sansoohan.ga',
        HTTPS_CERT_PRIVKEY: '/etc/letsencrypt/live/socket.sansoohan.ga/privkey.pem',
        HTTPS_CERT_FULLCHAIN: '/etc/letsencrypt/live/socket.sansoohan.ga/fullchain.pem',
        PROTOO_LISTEN_PORT: 443
      },
    },
    {
      name: 'server1',
      script: 'server/server.js',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PROTOO_LISTEN_PORT: 800,
        MEDIASOUP_ANNOUNCED_IP: '192.168.11.19',
        // DEBUG: '*mediasoup* *INFO* *WARN* *ERROR*',
        // INTERACTIVE: 'true',
      },
      env_production: {
        NODE_ENV: 'production',
        HTTPS_CERT_PRIVKEY: '/etc/letsencrypt/live/socket.sansoohan.ga/privkey.pem',
        HTTPS_CERT_FULLCHAIN: '/etc/letsencrypt/live/socket.sansoohan.ga/fullchain.pem',
        PROTOO_LISTEN_PORT: 443
      },
    }
  ],
  deploy : {
    production : {
      user : 'ubuntu',
      host : 'socket.sansoohan.ga',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no', 'ForwardAgent=yes'],
      ref  : 'origin/v3',
      repo : 'git@github.com:sansoohan/mediasoup-broadcast-example.git',
      path : '/home/ubuntu/mediasoup-broadcast-example',
      'post-deploy' : postDeployCommand
    }
  }
};