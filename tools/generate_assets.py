#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador de assets visuais do portfolio (favicon + Open Graph).
Python puro (stdlib) — nao requer Pillow.

Uso:  python tools/generate_assets.py
Saida: assets/favicon.ico, assets/favicon.svg, assets/favicon-32.png,
       assets/apple-touch-icon.png, assets/img/og-image.png,
       assets/img/og-ativofix.png, tools/preview_assets.html
"""
import os, struct, zlib, base64

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---------------------------------------------------------------- fontes 5x7
G = {
 'A': [".XXX.","X...X","X...X","XXXXX","X...X","X...X","X...X"],
 'B': ["XXXX.","X...X","X...X","XXXX.","X...X","X...X","XXXX."],
 'C': [".XXXX","X....","X....","X....","X....","X....",".XXXX"],
 'D': ["XXXX.","X...X","X...X","X...X","X...X","X...X","XXXX."],
 'E': ["XXXXX","X....","X....","XXXX.","X....","X....","XXXXX"],
 'F': ["XXXXX","X....","X....","XXXX.","X....","X....","X...."],
 'G': [".XXXX","X....","X....","X..XX","X...X","X...X",".XXXX"],
 'H': ["X...X","X...X","X...X","XXXXX","X...X","X...X","X...X"],
 'I': ["XXXXX","..X..","..X..","..X..","..X..","..X..","XXXXX"],
 'J': ["..XXX","...X.","...X.","...X.","...X.","X..X.",".XX.."],
 'K': ["X...X","X..X.","X.X..","XX...","X.X..","X..X.","X...X"],
 'L': ["X....","X....","X....","X....","X....","X....","XXXXX"],
 'M': ["X...X","XX.XX","X.X.X","X.X.X","X...X","X...X","X...X"],
 'N': ["X...X","XX..X","X.X.X","X..XX","X...X","X...X","X...X"],
 'O': [".XXX.","X...X","X...X","X...X","X...X","X...X",".XXX."],
 'P': ["XXXX.","X...X","X...X","XXXX.","X....","X....","X...."],
 'Q': [".XXX.","X...X","X...X","X...X","X.X.X","X..X.",".XX.X"],
 'R': ["XXXX.","X...X","X...X","XXXX.","X.X..","X..X.","X...X"],
 'S': [".XXXX","X....","X....",".XXX.","....X","....X","XXXX."],
 'T': ["XXXXX","..X..","..X..","..X..","..X..","..X..","..X.."],
 'U': ["X...X","X...X","X...X","X...X","X...X","X...X",".XXX."],
 'V': ["X...X","X...X","X...X","X...X","X...X",".X.X.","..X.."],
 'W': ["X...X","X...X","X...X","X.X.X","X.X.X","XX.XX","X...X"],
 'X': ["X...X","X...X",".X.X.","..X..",".X.X.","X...X","X...X"],
 'Y': ["X...X","X...X",".X.X.","..X..","..X..","..X..","..X.."],
 'Z': ["XXXXX","....X","...X.","..X..",".X...","X....","XXXXX"],
 '0': [".XXX.","X...X","X..XX","X.X.X","XX..X","X...X",".XXX."],
 '1': ["..X..",".XX..","..X..","..X..","..X..","..X..","XXXXX"],
 '2': ["XXXX.","....X","....X","..XX.",".X...","X....","XXXXX"],
 '3': ["XXXX.","....X","....X",".XXX.","....X","....X","XXXX."],
 '4': ["...X.","..XX.",".X.X.","X..X.","XXXXX","...X.","...X."],
 '5': ["XXXXX","X....","X....","XXXX.","....X","....X","XXXX."],
 '6': [".XXXX","X....","X....","XXXX.","X...X","X...X",".XXX."],
 '7': ["XXXXX","....X","...X.","..X..",".X...",".X...",".X..."],
 '8': [".XXX.","X...X","X...X",".XXX.","X...X","X...X",".XXX."],
 '9': [".XXX.","X...X","X...X",".XXXX","....X","....X","XXXX."],
 '-': [".....",".....",".....","XXXXX",".....",".....","....."],
 '.': [".....",".....",".....",".....","..X..","..X..","....."],
 ':': [".....","..X..","..X..",".....","..X..","..X..","....."],
 '/': ["....X","....X","...X.","..X..",".X...","X....","X...."],
 '%': ["XX..X","XX..X","...X.","..X..",".X...","X..XX","X..XX"],
 '·': [".....",".....",".....","..X..",".....",".....","....."],
 ' ': [".....",".....",".....",".....",".....",".....","....."],
}
ACCENTS = {  # char -> (base, [linhas acima], [linhas abaixo])
 'Ã': ('A', ["X.X.X", ".X.X."], []), 'Á': ('A', ["...X.", "..X.."], []),
 'Â': ('A', ["..X..", ".X.X."], []), 'À': ('A', ["..X..", ".X..."], []),
 'É': ('E', ["...X.", "..X.."], []), 'Ê': ('E', ["..X..", ".X.X."], []),
 'Í': ('I', ["...X.", "..X.."], []), 'Ó': ('O', ["...X.", "..X.."], []),
 'Ô': ('O', ["..X..", ".X.X."], []), 'Õ': ('O', ["X.X.X", ".X.X."], []),
 'Ú': ('U', ["...X.", "..X.."], []),
 'Ç': ('C', [], ["..X..", ".X..."]),
}

# ---------------------------------------------------------------- canvas RGB
class Canvas:
    def __init__(self, w, h, bg=(10, 14, 20)):
        self.w, self.h = w, h
        self.buf = bytearray(bytes(bg) * (w * h))
    def px(self, x, y, c):
        if 0 <= x < self.w and 0 <= y < self.h:
            i = (y * self.w + x) * 3
            self.buf[i:i + 3] = bytes(c)
    def rect(self, x, y, w, h, c):
        for yy in range(y, y + h):
            row = yy * self.w
            for xx in range(x, x + w):
                i = (row + xx) * 3
                if 0 <= xx < self.w and 0 <= yy < self.h:
                    self.buf[i:i + 3] = bytes(c)
    def outline(self, x, y, w, h, c, t=1):
        self.rect(x, y, w, t, c); self.rect(x, y + h - t, w, t, c)
        self.rect(x, y, t, h, c); self.rect(x + w - t, y, t, h, c)
    def text(self, x, y, s, scale, color, spacing=1, tracking=0):
        cx = x
        for ch in s:
            base, top, bot = ACCENTS.get(ch, (ch, [], []))
            gl = G.get(base.upper(), G[' '])
            oy = y + len(top) * scale
            for gy, row in enumerate(gl):
                for gx, cell in enumerate(row):
                    if cell == 'X':
                        self.rect(cx + gx * scale, oy + gy * scale, scale, scale, color)
            for ay, row in enumerate(top):
                for gx, cell in enumerate(row):
                    if cell == 'X':
                        self.rect(cx + gx * scale, y + ay * scale, scale, scale, color)
            for by, row in enumerate(bot):
                for gx, cell in enumerate(row):
                    if cell == 'X':
                        self.rect(cx + gx * scale, oy + 7 * scale + by * scale, scale, scale, color)
            cx += (5 + spacing) * scale + tracking
        return cx - (5 + spacing) * scale
    def text_w(self, s, scale, spacing=1, tracking=0):
        return max(0, len(s) * ((5 + spacing) * scale + tracking) - (spacing * scale))
    def chip(self, x, y, label, scale, fg, border, pad_x=16, pad_y=10):
        tw = self.text_w(label, scale, tracking=1)
        w = tw + pad_x * 2; h = 7 * scale + pad_y * 2
        self.outline(x, y, w, h, border)
        self.text(x + pad_x, y + pad_y, label, scale, fg, tracking=1)
        return w
    def save(self, path):
        d = os.path.dirname(path); os.makedirs(d, exist_ok=True)
        raw = bytearray()
        for yy in range(self.h):
            raw.append(0)
            raw += self.buf[yy * self.w * 3:(yy + 1) * self.w * 3]
        def chunk(tag, data):
            c = struct.pack('>I', len(data)) + tag + data
            return c + struct.pack('>I', zlib.crc32(tag + data) & 0xFFFFFFFF)
        png = (b'\x89PNG\r\n\x1a\n'
               + chunk(b'IHDR', struct.pack('>IIBBBBB', self.w, self.h, 8, 2, 0, 0, 0))
               + chunk(b'IDAT', zlib.compress(bytes(raw), 9))
               + chunk(b'IEND', b''))
        with open(path, 'wb') as f:
            f.write(png)
        return len(png)

    def to_pil(self):
        from PIL import Image
        return Image.frombytes('RGB', (self.w, self.h), bytes(self.buf))

def hexc(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

# cores da paleta
BG     = hexc('0A0E14')
GRID   = hexc('121A28')
BORDER = hexc('22304A')
WHITE  = hexc('F1F5F9')
CYAN   = hexc('22D3EE')
BLUE   = hexc('3B82F6')
GRAY   = hexc('94A3B8')
GRAY2  = hexc('64748B')

def backdrop(c, step=80):
    for x in range(0, c.w, step):
        for yy in range(c.h):
            c.px(x, yy, GRID)
    for y in range(0, c.h, step):
        for xx in range(c.w):
            c.px(xx, y, GRID)

# ---------------------------------------------------------------- favicon
def monogram(scale):
    c = Canvas(64, 64, hexc('0B0F17'))
    c.outline(0, 0, 64, 64, hexc('1B2941'))
    w = 2 * (5 * scale) + scale          # "VN" com 1*scale de gap
    h = 7 * scale
    x, y = (64 - w) // 2, (64 - h) // 2
    c.text(x, y, 'V', scale, WHITE)
    c.text(x + 6 * scale, y, 'N', scale, CYAN)
    return c

def write_ico(path, canvases):
    with open(path, 'wb') as f:
        f.write(struct.pack('<HHH', 0, 1, len(canvases)))
        offset = 6 + 16 * len(canvases)
        blobs = []
        for cv in canvases:
            # reaproveita save() gravando em memoria
            import io
            raw = bytearray()
            for yy in range(cv.h):
                raw.append(0); raw += cv.buf[yy * cv.w * 3:(yy + 1) * cv.w * 3]
            def chunk(tag, data):
                return (struct.pack('>I', len(data)) + tag + data
                        + struct.pack('>I', zlib.crc32(tag + data) & 0xFFFFFFFF))
            blob = (b'\x89PNG\r\n\x1a\n'
                    + chunk(b'IHDR', struct.pack('>IIBBBBB', cv.w, cv.h, 8, 2, 0, 0, 0))
                    + chunk(b'IDAT', zlib.compress(bytes(raw), 9))
                    + chunk(b'IEND', b''))
            blobs.append((cv.w, len(blob)))
        for (w, size) in blobs:
            f.write(struct.pack('<BBBBHHII', w % 256, w % 256, 0, 0, 1, 32, size, offset))
            offset += size
        for (w, size), cv in zip(blobs, canvases):
            raw = bytearray()
            for yy in range(cv.h):
                raw.append(0); raw += cv.buf[yy * cv.w * 3:(yy + 1) * cv.w * 3]
            def chunk(tag, data):
                return (struct.pack('>I', len(data)) + tag + data
                        + struct.pack('>I', zlib.crc32(tag + data) & 0xFFFFFFFF))
            f.write(b'\x89PNG\r\n\x1a\n'
                    + chunk(b'IHDR', struct.pack('>IIBBBBB', cv.w, cv.h, 8, 2, 0, 0, 0))
                    + chunk(b'IDAT', zlib.compress(bytes(raw), 9))
                    + chunk(b'IEND', b''))

def main():
    out = os.path.join(ROOT, 'assets')
    sizes = {}
    # favicons (64 base + redimensionados por escala do monograma)
    sizes['favicon-32.png'] = monogram(4).save(os.path.join(out, 'favicon-32.png'))
    write_ico(os.path.join(out, 'favicon.ico'), [monogram(1), monogram(2), monogram(3)])
    sizes['favicon.ico'] = os.path.getsize(os.path.join(out, 'favicon.ico'))
    # apple touch icon 180x180
    ap = Canvas(180, 180, hexc('0B0F17'))
    ap.outline(0, 0, 180, 180, hexc('16233B'))
    sc = 12
    w = 2 * (5 * sc) + sc; h = 7 * sc
    ap.text((180 - w) // 2, (180 - h) // 2, 'V', sc, WHITE)
    ap.text((180 - w) // 2 + 6 * sc, (180 - h) // 2, 'N', sc, CYAN)
    sizes['apple-touch-icon.png'] = ap.save(os.path.join(out, 'apple-touch-icon.png'))

    # favicon vetorial (svg de fallback moderno)
    with open(os.path.join(out, 'favicon.svg'), 'w', encoding='utf-8') as f:
        f.write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
                '<rect width="64" height="64" rx="12" fill="#0B0F17"/>'
                '<rect x="1" y="1" width="62" height="62" rx="11" fill="none" stroke="#1B2941"/>'
                '<text x="30" y="42" font-family="Arial,Helvetica,sans-serif" font-size="28" '
                'font-weight="700" fill="#F1F5F9" text-anchor="middle">V</text>'
                '<text x="46" y="42" font-family="Arial,Helvetica,sans-serif" font-size="28" '
                'font-weight="700" fill="#22D3EE" text-anchor="middle">N</text></svg>')

    # ------------------------------------------------ OG principal 1200x630
    og = Canvas(1200, 630, BG)
    backdrop(og)
    og.rect(64, 64, 10, 10, CYAN)
    og.text(86, 61, 'PORTFÓLIO PROFISSIONAL', 3, CYAN, tracking=4)
    og.rect(48, 130, 4, 190, CYAN)
    og.text(72, 130, 'VINICIUS', 11, WHITE)
    og.text(72, 226, 'NUNES', 11, WHITE)
    og.text(72, 340, 'ANALISTA DE TECNOLOGIA DA INFORMAÇÃO', 3, hexc('7DD3FC'))
    og.rect(64, 392, 700, 1, BORDER)
    og.text(64, 416, 'SUPORTE · INFRAESTRUTURA · AUTOMAÇÃO · OPERAÇÕES DE TI', 3, GRAY, tracking=1)
    og.chip(64, 468, 'SUPORTE N1/N2/N3', 3, hexc('7DD3FC'), BORDER)
    og.chip(64, 524, '15H/SEMANA ECONOMIZADAS COM AUTOMAÇÕES', 3, GRAY, BORDER)
    og.text(64, 580, 'GARÇA-SP · DISPONÍVEL PARA MUDANÇA E REMOTO', 3, GRAY2, tracking=1)
    og.rect(0, 624, 1200, 6, CYAN)

    # foto real do perfil (quando existir) na imagem de compartilhamento
    img = og.to_pil()
    photo_path = os.path.join(out, 'img', 'profile.jpg')
    if os.path.exists(photo_path):
        from PIL import Image, ImageDraw
        side = 330
        px_, py_ = 1200 - 64 - side, 118
        photo = Image.open(photo_path).convert('RGB').resize((side, side), Image.LANCZOS)
        mask = Image.new('L', (side, side), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, side, side], radius=42, fill=255)
        img.paste(photo, (px_, py_), mask)
    img.save(os.path.join(out, 'img', 'og-image.png'), optimize=True)
    sizes['og-image.png'] = os.path.getsize(os.path.join(out, 'img', 'og-image.png'))

    # ------------------------------------------------ OG AtivoFix 1200x630
    og2 = Canvas(1200, 630, BG)
    backdrop(og2)
    og2.rect(64, 64, 10, 10, BLUE)
    og2.text(86, 61, 'PROJETO EM DESTAQUE', 3, BLUE, tracking=4)
    og2.text(64, 130, 'ATIVOFIX', 14, CYAN)
    og2.text(64, 268, 'PLATAFORMA INTERNA DE GESTÃO DE TI', 5, WHITE)
    og2.rect(64, 350, 1072, 1, BORDER)
    og2.text(64, 378, 'INVENTÁRIO · CHAMADOS · USUÁRIOS · UNIDADES · AUTOMAÇÕES · RELATÓRIOS', 3, GRAY, tracking=1)
    x = 64
    for label in ['PYTHON', 'FLASK', 'SQLITE', 'REST API', 'WINDOWS AGENT', 'NGINX']:
        x += og2.chip(x, 430, label, 3, hexc('7DD3FC'), BORDER) + 14
    og2.text(64, 540, 'DESENVOLVIDO POR VINICIUS NUNES · ANALISTA DE TI', 3, GRAY2, tracking=2)
    og2.rect(0, 624, 1200, 6, BLUE)
    sizes['og-ativofix.png'] = og2.save(os.path.join(out, 'img', 'og-ativofix.png'))

    # folha de verificacao visual (base64, para abrir no preview)
    imgs = ''.join(
        f'<figure><img src="data:image/png;base64,{base64.b64encode(open(os.path.join(out, p), "rb").read()).decode()}"/>'
        f'<figcaption>{p}</figcaption></figure>'
        for p in ['favicon-32.png', 'apple-touch-icon.png', 'img/og-image.png', 'img/og-ativofix.png'])
    html = ('<!doctype html><meta charset="utf-8"><title>assets preview</title>'
            '<style>body{background:#111;color:#eee;font-family:monospace;padding:24px}'
            'figure{margin:0 0 24px}figcaption{padding:8px 0;color:#7dd3fc}'
            'img{image-rendering:pixelated;max-width:100%;border:1px solid #333}</style>'
            f'<h1>Assets gerados</h1>{imgs}')
    with open(os.path.join(ROOT, 'tools', 'preview_assets.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    for k, v in sizes.items():
        print(f'{k:24s} {v/1024:8.1f} KB')

if __name__ == '__main__':
    main()
