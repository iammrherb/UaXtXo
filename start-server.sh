#!/bin/bash
echo "🌐 Starting Zero Trust Platform Server..."
echo "========================================"
echo ""
echo "Server will start on: http://localhost:8080"
echo "Press Ctrl+C to stop"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8080
else
    echo "❌ Python not found. Please install Python to run the server."
    exit 1
fi
