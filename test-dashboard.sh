#!/bin/bash
echo "Testing Dashboard Integration..."

# Open browser with cache disabled
if command -v google-chrome &> /dev/null; then
    google-chrome --disable-application-cache --disable-cache index.html
elif command -v firefox &> /dev/null; then
    firefox -private index.html
else
    echo "Please open index.html in your browser with cache cleared (Ctrl+Shift+R)"
fi
