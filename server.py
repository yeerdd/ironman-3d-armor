# -*- coding: utf-8 -*-
import http.server
import socketserver
import os
import sys

PORT = 5173
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
    
    def log_message(self, format, *args):
        pass

class RobustThreadingTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

    def handle_error(self, request, client_address):
        pass

if __name__ == '__main__':
    port = PORT
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    
    try:
        with RobustThreadingTCPServer(('127.0.0.1', port), QuietHandler) as httpd:
            print(f'STARK_SERVER_RUNNING_ON: http://localhost:{port}')
            sys.stdout.flush()
            httpd.serve_forever()
    except Exception as e:
        print(f'Error starting server: {e}')
