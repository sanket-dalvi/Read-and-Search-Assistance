#!/bin/bash

# Navigate to your Node.js project directory
# cd /path/to/your/nodejs/project
cd docpdf/pdfdoc/research-ranking-app/my-app/htmls/

# Start your Node.js server using pm2
pm2 start server/index.js --name "my-node-server2"

# Save current pm2 process list to automatically restart on server reboot
pm2 save

# Display status (optional)
pm2 status
