# -*- coding: utf-8 -*-
"""
STARK INDUSTRIES // 3D STANDALONE SHOWCASE SERVER
独立 3D 展台本地静态服务器，支持自动寻找空闲端口与 GLB/WASM/MediaPipe 高速传输
"""
import http.server
import socketserver
import os
import sys
import socket
import mimetypes
import urllib.parse

# 注册 3D 与 WebAssembly/MediaPipe 关键 MIME 类型
mimetypes.add_type("model/gltf-binary", ".glb")
mimetypes.add_type("application/wasm", ".wasm")
mimetypes.add_type("application/octet-stream", ".task")
mimetypes.add_type("text/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("text/plain", ".txt")
mimetypes.add_type("application/json", ".json")

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class StandaloneStageHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        clean_path = parsed.path.lstrip("/")
        disk_path = os.path.join(DIRECTORY, clean_path)

        # 路由兜底防404
        if clean_path in ["viewer", "viewer/", "viewer/index.html", "lab", "lab/"]:
            self.send_response(302)
            self.send_header("Location", "/")
            self.end_headers()
            return

        # 目录无斜杠重定向
        if os.path.isdir(disk_path) and not parsed.path.endswith("/"):
            new_path = parsed.path + "/"
            if parsed.query:
                new_path += "?" + parsed.query
            self.send_response(301)
            self.send_header("Location", new_path)
            self.end_headers()
            return

        super().do_GET()

    def do_HEAD(self):
        parsed = urllib.parse.urlparse(self.path)
        clean_path = parsed.path.lstrip("/")
        disk_path = os.path.join(DIRECTORY, clean_path)
        if clean_path in ["viewer", "viewer/", "viewer/index.html", "lab", "lab/"]:
            self.send_response(302)
            self.send_header("Location", "/")
            self.end_headers()
            return
        if os.path.isdir(disk_path) and not parsed.path.endswith("/"):
            self.send_response(301)
            self.send_header("Location", parsed.path + "/")
            self.end_headers()
            return
        super().do_HEAD()

    def end_headers(self):
        # 允许跨域与缓存友好
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

class ThreadingTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True

def find_available_port(start_port=3001, max_tries=50):
    for p in range(start_port, start_port + max_tries):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("0.0.0.0", p))
                return p
            except OSError:
                continue
    return start_port

if __name__ == "__main__":
    target_port = 3001
    if len(sys.argv) > 1:
        try:
            target_port = int(sys.argv[1])
        except ValueError:
            target_port = find_available_port(3001)
    else:
        # 如果 3001 被占用则自动顺延
        target_port = find_available_port(3001)

    print("=" * 64)
    print("  STARK INDUSTRIES // 3D STANDALONE STAGE")
    print("  钢铁侠 3D 独立展台已启动")
    print(f"  默认展示战甲: MARK I (马克 1 号)")
    print(f"  本地访问地址: http://localhost:{target_port}")
    print("  支持手势交互 (MediaPipe Optical Sensor) 与 360° 空间轨道运镜")
    print("=" * 64)

    with ThreadingTCPServer(("0.0.0.0", target_port), StandaloneStageHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n服务已退出。")
