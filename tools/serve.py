#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Servidor local de desenvolvimento do portfólio.

Uso:
    python tools/serve.py            # http://localhost:8787
    python tools/serve.py 9000       # porta personalizada
"""
import http.server
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8787


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        '.svg': 'image/svg+xml',
        '.js': 'text/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.webmanifest': 'application/manifest+json; charset=utf-8',
    }

    def end_headers(self):
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

    def send_error(self, code, message=None, explain=None):
        """Serve 404.html em rotas inexistentes (paridade com GitHub Pages)."""
        if code == 404:
            try:
                with open('404.html', 'rb') as f:
                    body = f.read()
            except OSError:
                return super().send_error(code, message, explain)
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            if self.command != 'HEAD':
                self.wfile.write(body)
            return
        super().send_error(code, message, explain)


class Server(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == '__main__':
    with Server(('127.0.0.1', PORT), Handler) as httpd:
        print(f'Portfolio rodando em http://localhost:{PORT}  (Ctrl+C para parar)')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nServidor encerrado.')
