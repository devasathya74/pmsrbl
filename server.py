#!/usr/bin/env python3
"""
Simple HTTP Server with proper MIME types for ES6 modules
"""
import os
import http.server
import socketserver
import mimetypes

# Add JavaScript module MIME type
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/javascript', '.mjs')

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        # Cache control for development
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()
    
    def guess_type(self, path):
        """Override to ensure .js files get correct MIME type"""
        base, ext = os.path.splitext(path)
        if ext == '.js':
            return 'application/javascript'
        return super().guess_type(path)

if __name__ == '__main__':
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        print(f"Serving directory: {os.getcwd()}")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
