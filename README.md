# Scripts for monitoring and restarting miners

to execute in background and on launch:

Make a myapp.service file (replacing 'myapp' with your app's name, obviously):

[Unit]
Description=My app

[Service]
ExecStart=/var/www/myapp/app.js
Restart=always
User=nobody
# Note RHEL/Fedora uses 'nobody', Debian/Ubuntu uses 'nogroup'
Group=nobody  
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/var/www/myapp

[Install]
WantedBy=multi-user.target
Note if you're new to Unix: /var/www/myapp/app.js should have #!/usr/bin/env node on the very first line.

Copy your service file into the /etc/systemd/system.

Start it with systemctl start myapp.

Enable it to run on boot with systemctl enable myapp.

See logs with journalctl -u myapp

This is taken from How we deploy node apps on Linux, 2018 edition, which also includes commands to generate an AWS/DigitalOcean/Azure CloudConfig to build Linux/node servers (including the .service file).

From this link:

https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service
