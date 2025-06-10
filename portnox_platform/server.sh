#!/bin/bash
echo "Starting Portnox Platform Server..."
echo "Access the platform at: http://localhost:8080"
cd "$(dirname "$0")"
python3 -m http.server 8080
