#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser
import threading
import time

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

# Configure handler
Handler.extensions_map.update({
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
})

def open_browser():
    time.sleep(1)
    webbrowser.open(f'http://localhost:{PORT}')

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🚀 Server running at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    
    # Open browser in a separate thread
    threading.Thread(target=open_browser).start()
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n⏹️  Server stopped")
        httpd.shutdown()
