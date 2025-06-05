#!/bin/bash

echo "🚀 Deploying Portnox Executive Platform..."

# Check if all required files exist
echo "📋 Checking files..."
required_files=(
    "css/main.css"
    "js/modules/executive-platform.js"
    "js/modules/platform-init.js"
    "index.html"
)

missing_files=()
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
        echo "❌ Missing: $file"
    else
        echo "✅ Found: $file"
    fi
done

if [ ${#missing_files[@]} -eq 0 ]; then
    echo "✅ All required files present!"
    
    # Start local server
    echo "🌐 Starting local server..."
    python3 -m http.server 8080 &
    SERVER_PID=$!
    
    echo "✅ Server running at http://localhost:8080"
    echo "📋 Press Ctrl+C to stop"
    
    # Open browser
    if command -v open &> /dev/null; then
        open http://localhost:8080
    elif command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8080
    fi
    
    # Wait for interrupt
    wait $SERVER_PID
else
    echo "❌ Missing files detected. Please run the complete UI overhaul script first."
    exit 1
fi
