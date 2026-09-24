#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gera o currículo profissional em PDF (1 página A4).
Os textos espelham assets/js/data.js — ao alterar o portfólio,
atualize aqui e rode:  python tools/generate_resume.py
Saída: assets/docs/curriculo-vinicius-nunes.pdf
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer,
                                Table, TableStyle, HRFlowable)
from reportlab.lib.units import mm

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'docs', 'curriculo-vinicius-nunes.pdf')

INK   = HexColor('#1E293B')   # texto
DARK  = HexColor('#0F172A')   # nomes/títulos
BLUE  = HexColor('#1D4ED8')   # acentos
MUTE  = HexColor('#64748B')   # metadados
LINE  = HexColor('#CBD5E1')   # filetes

S = {
 'name':    ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=19, leading=22, textColor=DARK, alignment=TA_CENTER),
 'role':    ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=11.5, leading=14, textColor=BLUE, alignment=TA_CENTER, spaceBefore=2),
 'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=8.6, leading=11.5, textColor=MUTE, alignment=TA_CENTER),
 'tag':     ParagraphStyle('tag', fontName='Helvetica-Oblique', fontSize=9.2, leading=12, textColor=INK, alignment=TA_CENTER, spaceBefore=4),
 'h2':      ParagraphStyle('h2', fontName='Helvetica-Bold', fontSize=10.3, leading=12, textColor=DARK, spaceBefore=9, spaceAfter=2),
 'body':    ParagraphStyle('body', fontName='Helvetica', fontSize=8.8, leading=11.6, textColor=INK),
 'job':     ParagraphStyle('job', fontName='Helvetica-Bold', fontSize=9.4, leading=12, textColor=DARK, spaceBefore=4),
 'meta':    ParagraphStyle('meta', fontName='Helvetica', fontSize=8.2, leading=10.5, textColor=MUTE, spaceBefore=1),
 'bullet':  ParagraphStyle('bullet', fontName='Helvetica', fontSize=8.6, leading=11.2, textColor=INK, leftIndent=10, bulletIndent=2, spaceBefore=1),
 'comp':    ParagraphStyle('comp', fontName='Helvetica', fontSize=8.4, leading=11.4, textColor=INK, spaceBefore=1.5),
}

def h2(text):
    return [Paragraph(text, S['h2']),
            HRFlowable(width='100%', thickness=0.9, color=LINE, spaceAfter=4)]

def job(title, meta, bullets=None, desc=None):
    out = [Paragraph(title, S['job']), Paragraph(meta, S['meta'])]
    if desc:
        out.append(Paragraph(desc, S['body']))
    for b in (bullets or []):
        out.append(Paragraph(b, S['bullet'], bulletText='–'))
    return out

story = []

# ------------------------------------------------------------ cabeçalho
story += [
  Paragraph('VINICIUS NUNES DA SILVA', S['name']),
  Paragraph('Analista de Tecnologia da Informação', S['role']),
  Paragraph('Garça/SP · Disponível para mudança e remoto &nbsp;|&nbsp; vininunesilva3@gmail.com &nbsp;|&nbsp; '
            '(14) 99139-6525 &nbsp;|&nbsp; www.linkedin.com/in/vinicius-nunes-da-silva-2049792b8 &nbsp;|&nbsp; '
            'github.com/Vinenuness', S['contact']),
  Paragraph('“Transformando problemas de TI em soluções práticas, eficientes e automatizadas.”', S['tag']),
]

# ------------------------------------------------------------ resumo
story += h2('RESUMO')
story.append(Paragraph(
  'Profissional de TI com atuação em suporte N1/N2/N3, infraestrutura, operações e automação. '
  'Experiência em implantação de sistemas hospitalares, administração de ambientes Windows/Linux e Nextcloud, '
  'com desenvolvimento de soluções internas em Python e uso de dados (SQL, Excel, Power BI) para apoiar decisões. '
  'Formação em Gestão de T.I. e Engenharia de Software, com base técnica em Eletrônica.', S['body']))

# ------------------------------------------------------------ experiência
story += h2('EXPERIÊNCIA PROFISSIONAL')
story += job('AHBB Rede Santa Casa — Analista de TI (Suporte N3, Software & Infraestrutura)',
             'Dez/2025 – Atual · Garça/SP',
             bullets=[
   'Automação de processos com scripts Python e sistemas web internos — economia estimada de <b>15 horas semanais</b> de trabalho manual.',
   'Administração do ambiente corporativo Nextcloud: usuários, permissões, compartilhamento seguro e rotinas automatizadas de backup, em conformidade com a <b>LGPD</b>.',
   'Implantação de sistemas hospitalares (análise de infraestrutura, testes e pós-go-live) com <b>redução de 30%</b> no tempo de implantação via mapeamento de fluxos.',
   'Suporte avançado a usuários e alinhamento com a gestão de TI em decisões técnicas e de segurança.',
 ])
story += job('Profissional autônomo — Desenvolvedor & Consultor de TI Freelance',
             'Mar/2022 – Atual',
             desc='Soluções web em Python/Flask com integração a bancos SQL, automação de processos, '
                  'manutenção de hardware, configuração de redes locais e boas práticas de segurança.')
story += job('Prefeitura Municipal de Garça — Agente Comunitário de Saúde',
             'Ago/2022 – Nov/2025 · Garça/SP',
             desc='Organização e consolidação de dados, Excel avançado para relatórios gerenciais e indicadores, '
                  'operação de sistemas governamentais (Gov.br / e-SUS) e integridade de registros.')
story += job('Experiências anteriores',
             '2021 – 2022',
             desc='EIXO SP — atendimento ao cliente e operação de caixa. PPA Brasil — eletrônica, diagnóstico de '
                  'falhas, controle de qualidade e ERP TOTVS Protheus (conferência de notas fiscais).')

# ------------------------------------------------------------ formação
story += h2('FORMAÇÃO ACADÊMICA')
edu = [
  ('MBA em Gestão de T.I.', 'Unicorp Faculdades'),
  ('Pós-graduação em Engenharia de Software', 'Unicorp Faculdades'),
  ('Graduação em Análise e Desenvolvimento de Sistemas', 'UNIVEM — Marília/SP'),
  ('Técnico em Eletrônica', 'ETEC Monsenhor Antônio Magliano — Garça/SP'),
  ('Bacharelado em Engenharia Civil (incompleto — 4 anos cursados)', '—'),
]
for degree, school in edu:
    story.append(Paragraph(f'<b>{degree}</b> — {school}' if school != '—' else degree, S['comp']))

# ------------------------------------------------------------ certificações
story += h2('CERTIFICAÇÕES E CURSOS')
certs = [
  'Hackers do Bem — Cibersegurança (144h)',
  'Dell Technical Support — HW, SW & Infra',
  'Google Technical Support Fundamentals',
  'Análise de Dados e BI — Power BI, R e Excel',
  'Programação Python',
  'Administração de BD & Lógica de Programação',
]
rows = [[Paragraph(certs[i], S['comp']), Paragraph(certs[i + 1], S['comp'])] for i in range(0, len(certs), 2)]
t = Table(rows, colWidths=[95 * mm, 78 * mm])
t.setStyle(TableStyle([
  ('VALIGN', (0, 0), (-1, -1), 'TOP'),
  ('LEFTPADDING', (0, 0), (-1, -1), 0),
  ('RIGHTPADDING', (0, 0), (-1, -1), 6),
  ('TOPPADDING', (0, 0), (-1, -1), 0),
  ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
]))
story.append(t)

# ------------------------------------------------------------ competências
story += h2('COMPETÊNCIAS')
comps = [
  ('Suporte e Operações', 'Suporte N1/N2/N3 · Troubleshooting · Gestão de chamados · Implantação de sistemas · Documentação'),
  ('Infraestrutura', 'Windows · Linux · Redes · Servidores · Nextcloud · Backup · Nginx · VPN'),
  ('Automação', 'Python · Scripts · Batch · PowerShell · Agentes Windows'),
  ('Desenvolvimento', 'Python · Flask · SQL · REST API · PHP · HTML/CSS · JavaScript'),
  ('Dados', 'Power BI · Excel Avançado · SQL · Pandas · NumPy · R'),
  ('Segurança e Governança', 'LGPD · Controle de acesso · Gestão de incidentes · Análise de vulnerabilidades · ITIL · COBIT'),
  ('Ferramentas', 'Git/GitHub · TOTVS Protheus · AnyDesk · Microsoft 365 · Jira'),
]
for name, items in comps:
    story.append(Paragraph(f'<b><font color="#1D4ED8">{name}:</font></b> {items}', S['comp']))

# ------------------------------------------------------------ build
def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 7.3)
    canvas.setFillColor(MUTE)
    canvas.drawCentredString(A4[0] / 2, 9 * mm,
        'Portfólio: vinenuness.github.io/portfolio  ·  AtivoFix: github.com/Vinenuness/ativofix')
    canvas.restoreState()

doc = SimpleDocTemplate(OUT, pagesize=A4,
                        leftMargin=15 * mm, rightMargin=15 * mm,
                        topMargin=11 * mm, bottomMargin=14 * mm,
                        title='Currículo — Vinicius Nunes da Silva',
                        author='Vinicius Nunes da Silva',
                        subject='Analista de Tecnologia da Informação',
                        keywords='TI, suporte, infraestrutura, automação, Python')
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(f'PDF gerado: {OUT} ({os.path.getsize(OUT) // 1024} KB, {doc.page} página{"s" if doc.page > 1 else ""})')
