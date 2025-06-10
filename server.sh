#!/bin/bash

echo "🚀 Starting Portnox Ultimate Platform Server..."
echo "📡 Access the platform at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo

# Check if Python 3 is installed
if command -v python3 &> /dev/null; then
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    python -m http.server 8080
else
    echo "❌ Python is not installed. Please install Python to run the server."
    exit 1
fi
