#!/bin/bash

# NAC Total Cost Analyzer Launch Script
# Starts a local web server for development testing

echo "Starting NAC Total Cost Analyzer..."

# Check if Python is installed
if command -v python3 &>/dev/null; then
    echo "Starting server with Python 3..."
    python3 -m http.server 8080
elif command -v python &>/dev/null; then
    # Check Python version
    python_version=$(python -c 'import sys; print(sys.version_info[0])')
    
    if [ "$python_version" -eq 3 ]; then
        echo "Starting server with Python 3..."
        python -m http.server 8080
    else
        echo "Starting server with Python 2..."
        python -m SimpleHTTPServer 8080
    fi
else
    echo "Python not found. Please install Python to run the local server."
    exit 1
fi
