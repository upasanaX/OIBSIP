"""
Generate a professional PDF resume with clickable hyperlinks for Upasana Roy
using ReportLab. Output: scratch/resume_generated.pdf
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import KeepTogether

# ── Paths ──────────────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(
    r"C:\Users\upasa\.gemini\antigravity\brain\03f6bba1-6133-4b60-b5b3-f868f119bbb3\scratch"
)
os.makedirs(OUT_DIR, exist_ok=True)
OUTPUT_PATH = os.path.join(OUT_DIR, "resume_generated.pdf")

# ── Palette ────────────────────────────────────────────────────────────────────
DARK_BG   = HexColor("#0a192f")   # navy (header)
ACCENT    = HexColor("#64ffda")   # teal accent
MID_BLUE  = HexColor("#1e3a5f")   # section heading bar
LINK_CLR  = HexColor("#0a66c2")   # LinkedIn blue for links
TEXT_DARK = HexColor("#1a1a2e")
GRAY      = HexColor("#555555")
LIGHT_GRAY= HexColor("#888888")
RULE_CLR  = HexColor("#64ffda")

# ── Styles ─────────────────────────────────────────────────────────────────────
def styles():
    base = dict(fontName="Helvetica", fontSize=10, leading=14,
                textColor=TEXT_DARK, spaceAfter=0, spaceBefore=0)

    name_style = ParagraphStyle("Name",
        fontName="Helvetica-Bold", fontSize=22, leading=26,
        textColor=white, alignment=TA_LEFT, spaceAfter=2)

    tagline_style = ParagraphStyle("Tagline",
        fontName="Helvetica", fontSize=10, leading=14,
        textColor=ACCENT, alignment=TA_LEFT, spaceAfter=4)

    contact_style = ParagraphStyle("Contact",
        fontName="Helvetica", fontSize=9, leading=13,
        textColor=white, alignment=TA_LEFT)

    sec_heading = ParagraphStyle("SecHeading",
        fontName="Helvetica-Bold", fontSize=11, leading=15,
        textColor=white, spaceBefore=8, spaceAfter=0,
        backColor=MID_BLUE, borderPad=(3, 6, 3, 6))

    job_title = ParagraphStyle("JobTitle",
        fontName="Helvetica-Bold", fontSize=10, leading=14,
        textColor=TEXT_DARK, spaceBefore=6, spaceAfter=1)

    company = ParagraphStyle("Company",
        fontName="Helvetica-Oblique", fontSize=9.5, leading=13,
        textColor=MID_BLUE, spaceAfter=1)

    date_style = ParagraphStyle("Date",
        fontName="Helvetica", fontSize=9, leading=13,
        textColor=LIGHT_GRAY, spaceAfter=2)

    bullet = ParagraphStyle("Bullet",
        fontName="Helvetica", fontSize=9.5, leading=14,
        textColor=TEXT_DARK, leftIndent=12, firstLineIndent=-8,
        spaceAfter=1)

    normal = ParagraphStyle("Normal", **{**base, "spaceAfter": 2})

    proj_title = ParagraphStyle("ProjTitle",
        fontName="Helvetica-Bold", fontSize=10, leading=14,
        textColor=MID_BLUE, spaceBefore=6, spaceAfter=1)

    proj_tech = ParagraphStyle("ProjTech",
        fontName="Helvetica-Oblique", fontSize=9, leading=13,
        textColor=GRAY, spaceAfter=1)

    skill_cat = ParagraphStyle("SkillCat",
        fontName="Helvetica-Bold", fontSize=9.5, leading=13,
        textColor=TEXT_DARK, spaceAfter=1)

    summary_style = ParagraphStyle("Summary",
        fontName="Helvetica", fontSize=9.5, leading=14,
        textColor=TEXT_DARK, alignment=TA_JUSTIFY, spaceAfter=4)

    return {
        "name": name_style,
        "tagline": tagline_style,
        "contact": contact_style,
        "sec": sec_heading,
        "job": job_title,
        "company": company,
        "date": date_style,
        "bullet": bullet,
        "normal": normal,
        "proj": proj_title,
        "proj_tech": proj_tech,
        "skill_cat": skill_cat,
        "summary": summary_style,
    }


def link(text, url, color=None):
    c = color or LINK_CLR
    hex_c = c.hexval() if hasattr(c, 'hexval') else '#0a66c2'
    # Use HTML color string directly
    return f'<link href="{url}"><font color="{hex_c}">{text}</font></link>'


def bullet_pt(text, s):
    return Paragraph(f"• {text}", s["bullet"])


def section_heading(title, s):
    return Paragraph(f"&nbsp;{title}", s["sec"])


def hr():
    return HRFlowable(width="100%", thickness=0.8, color=RULE_CLR,
                      spaceAfter=4, spaceBefore=0)


# ── Build Document ─────────────────────────────────────────────────────────────
def build():
    s = styles()

    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        leftMargin=15*mm, rightMargin=15*mm,
        topMargin=12*mm, bottomMargin=12*mm,
        title="Upasana Roy — Resume",
        author="Upasana Roy",
        subject="Full Stack Web Developer & AI Enthusiast",
    )

    story = []
    W = A4[0] - 30*mm   # usable width

    # ══════════════════════════════════════════════════════════════════════════
    # HEADER BLOCK  (navy background table)
    # ══════════════════════════════════════════════════════════════════════════
    gh_link   = link("github.com/upasanaX",         "https://github.com/upasanaX",                            "#64ffda")
    li_link   = link("linkedin.com/in/upasana-roy-170328202", "https://www.linkedin.com/in/upasana-roy-170328202", "#64ffda")
    em_link   = link("upasana2k25@gmail.com",        "mailto:upasana2k25@gmail.com",                           "#64ffda")

    name_para    = Paragraph("Upasana Roy", s["name"])
    tagline_para = Paragraph("Full Stack Web Developer &amp; AI / Computer Vision Enthusiast", s["tagline"])
    contact_para = Paragraph(
        f"{em_link}  &nbsp;|&nbsp;  {gh_link}  &nbsp;|&nbsp;  {li_link}<br/>"
        f"Kolkata, West Bengal, India  &nbsp;|&nbsp;  B.Tech CSE (2025–2029) RCCIIT",
        s["contact"])

    header_table = Table(
        [[name_para], [tagline_para], [contact_para]],
        colWidths=[W],
    )
    header_table.setStyle(TableStyle([
        ("BACKGROUND",   (0,0), (-1,-1), DARK_BG),
        ("LEFTPADDING",  (0,0), (-1,-1), 10),
        ("RIGHTPADDING", (0,0), (-1,-1), 10),
        ("TOPPADDING",   (0,0), (0,0),   10),
        ("BOTTOMPADDING",(0,-1),(-1,-1), 10),
        ("TOPPADDING",   (0,1), (-1,-1),  2),
        ("BOTTOMPADDING",(0,0), (-1,-2),  2),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 6))

    # ══════════════════════════════════════════════════════════════════════════
    # PROFESSIONAL SUMMARY
    # ══════════════════════════════════════════════════════════════════════════
    story.append(section_heading("PROFESSIONAL SUMMARY", s))
    story.append(hr())
    story.append(Paragraph(
        "Motivated B.Tech CSE undergraduate at RCCIIT, Kolkata with hands-on experience in "
        "full-stack web development (React, Next.js, Node.js, TypeScript) and AI/Computer Vision "
        "(YOLOv8, OpenCV, TensorFlow). Completed two industry internships — building real-time "
        "object-tracking dashboards at CodeAlpha and responsive web applications at Oasis Infobyte. "
        "Passionate about building impactful products at the intersection of intelligent systems and "
        "modern web technologies. SIH 2026 hackathon participant and active open-source contributor.",
        s["summary"]))
    story.append(Spacer(1, 4))

    # ══════════════════════════════════════════════════════════════════════════
    # TECHNICAL SKILLS
    # ══════════════════════════════════════════════════════════════════════════
    story.append(section_heading("TECHNICAL SKILLS", s))
    story.append(hr())

    skills_data = [
        ("Languages",       "Python · TypeScript · JavaScript (ES2024) · HTML5 · CSS3 · SQL"),
        ("Frontend",        "React.js · Next.js 14 · Tailwind CSS · ShadCN/UI · Framer Motion · Three.js"),
        ("Backend",         "Node.js · Express.js · REST APIs · WebSockets · Prisma ORM"),
        ("Databases",       "PostgreSQL · MongoDB · Supabase · Firebase · Redis"),
        ("AI / CV / ML",    "YOLOv8 · OpenCV · TensorFlow · PyTorch · Roboflow · Hugging Face"),
        ("Cloud & DevOps",  "Vercel · Netlify · GitHub Actions · Docker (basics) · GCP (basics)"),
        ("Tools",           "Git · GitHub · VS Code · Figma · Postman · Linux · Jupyter Notebook"),
    ]

    for cat, items in skills_data:
        row = Table([[Paragraph(f"<b>{cat}:</b>", s["skill_cat"]),
                      Paragraph(items, s["normal"])]],
                    colWidths=[38*mm, W-38*mm])
        row.setStyle(TableStyle([
            ("VALIGN", (0,0), (-1,-1), "TOP"),
            ("LEFTPADDING",  (0,0), (-1,-1), 0),
            ("RIGHTPADDING", (0,0), (-1,-1), 0),
            ("TOPPADDING",   (0,0), (-1,-1), 1),
            ("BOTTOMPADDING",(0,0), (-1,-1), 1),
        ]))
        story.append(row)
    story.append(Spacer(1, 4))

    # ══════════════════════════════════════════════════════════════════════════
    # WORK EXPERIENCE
    # ══════════════════════════════════════════════════════════════════════════
    story.append(section_heading("WORK EXPERIENCE", s))
    story.append(hr())

    # --- CodeAlpha ---
    exp1_header = Table(
        [[Paragraph("AI / Computer Vision Intern", s["job"]),
          Paragraph("Jan 2026 – Mar 2026", s["date"])]],
        colWidths=[W*0.65, W*0.35]
    )
    exp1_header.setStyle(TableStyle([
        ("VALIGN",       (0,0),(-1,-1),"TOP"),
        ("LEFTPADDING",  (0,0),(-1,-1), 0),
        ("RIGHTPADDING", (0,0),(-1,-1), 0),
        ("TOPPADDING",   (0,0),(-1,-1), 0),
        ("BOTTOMPADDING",(0,0),(-1,-1), 0),
        ("ALIGN",        (1,0),(1,0),  "RIGHT"),
    ]))
    story.append(exp1_header)
    story.append(Paragraph(
        link("CodeAlpha", "https://github.com/upasanaX/CodeAlpha_AI", "#1e3a5f")
        + " — Remote Internship",
        s["company"]))
    story.append(bullet_pt(
        "Built <b>TrackOptic AI</b> — a real-time multi-object tracking system using <b>YOLOv8</b> "
        "and <b>ByteTrack</b>, processing live camera feeds with &lt;30 ms inference latency.", s))
    story.append(bullet_pt(
        "Developed <b>Coursemate AI</b> — an intelligent course recommendation engine powered by "
        "NLP and collaborative filtering, achieving 87% user satisfaction in testing.", s))
    story.append(bullet_pt(
        "Created <b>LinguoFlow PRO</b> — a multilingual real-time translation tool supporting "
        "15+ languages with Hugging Face transformer models.", s))
    story.append(bullet_pt(
        "Repo: " + link("github.com/upasanaX/CodeAlpha_AI", "https://github.com/upasanaX/CodeAlpha_AI"), s))
    story.append(Spacer(1, 6))

    # --- Oasis Infobyte ---
    exp2_header = Table(
        [[Paragraph("Web Development Intern", s["job"]),
          Paragraph("Nov 2025 – Jan 2026", s["date"])]],
        colWidths=[W*0.65, W*0.35]
    )
    exp2_header.setStyle(TableStyle([
        ("VALIGN",       (0,0),(-1,-1),"TOP"),
        ("LEFTPADDING",  (0,0),(-1,-1), 0),
        ("RIGHTPADDING", (0,0),(-1,-1), 0),
        ("TOPPADDING",   (0,0),(-1,-1), 0),
        ("BOTTOMPADDING",(0,0),(-1,-1), 0),
        ("ALIGN",        (1,0),(1,0),  "RIGHT"),
    ]))
    story.append(exp2_header)
    story.append(Paragraph(
        link("Oasis Infobyte (OIBSIP)", "https://github.com/upasanaX/OIBSIP", "#1e3a5f")
        + " — Remote Internship",
        s["company"]))
    story.append(bullet_pt(
        "Developed an interactive personal <b>portfolio website</b> (HTML5/CSS3/JS) with animated "
        "hero section, project gallery, and contact form — deployed on Vercel.", s))
    story.append(bullet_pt(
        "Built a feature-rich <b>To-Do List Application</b> with local storage persistence, "
        "drag-and-drop task ordering, and category filtering.", s))
    story.append(bullet_pt(
        "Created a responsive <b>Temperature Converter</b> supporting Celsius, Fahrenheit, Kelvin, "
        "and Rankine with real-time bi-directional conversion.", s))
    story.append(bullet_pt(
        "Repo: " + link("github.com/upasanaX/OIBSIP", "https://github.com/upasanaX/OIBSIP"), s))
    story.append(Spacer(1, 4))

    # ══════════════════════════════════════════════════════════════════════════
    # PROJECTS
    # ══════════════════════════════════════════════════════════════════════════
    story.append(section_heading("PROJECTS", s))
    story.append(hr())

    projects = [
        {
            "name": "TrackOptic AI — Real-Time Object Tracking System",
            "url":  "https://github.com/upasanaX/CodeAlpha_AI",
            "tech": "Python · YOLOv8 · ByteTrack · OpenCV · Streamlit · TypeScript",
            "desc": [
                "Real-time multi-object detection and tracking from live camera feeds and video files.",
                "Implemented ByteTrack algorithm achieving consistent ID assignment across frames.",
                "Streamlit dashboard with live bounding-box overlays, FPS counter, and export to CSV.",
                "Supports COCO 80-class detection; custom-trained on Roboflow datasets.",
            ]
        },
        {
            "name": "GlobePay — International Payment Platform",
            "url":  "https://github.com/upasanaX/Globepay",
            "tech": "TypeScript · Next.js 14 · Prisma · PostgreSQL · Supabase · Tailwind CSS",
            "desc": [
                "Full-stack fintech app enabling cross-border payments with real-time FX conversion.",
                "JWT-based auth, Prisma ORM with PostgreSQL, and row-level security via Supabase.",
                "Interactive dashboard with transaction history, exchange-rate charts, and analytics.",
                "⭐ 1 star on GitHub — open-source fintech reference implementation.",
            ]
        },
        {
            "name": "KrishiKavach — AI Agricultural Advisory Platform",
            "url":  "https://github.com/upasanaX/SIH2026_TechBrats",
            "tech": "TypeScript · React · Node.js · Express · Google Gemini API · PostgreSQL",
            "desc": [
                "Built for Smart India Hackathon 2026 (SIH2026) with team TechBrats.",
                "AI chatbot (Gemini API) providing crop disease diagnosis and treatment recommendations.",
                "Real-time weather integration and soil health dashboard for 10,000+ farmers use case.",
                "Multilingual support (Hindi/Bengali/English); ⭐ 2 stars on GitHub.",
            ]
        },
        {
            "name": "TripMate — AI-Powered Travel Companion",
            "url":  "https://github.com/upasanaX/TripMate-Modified",
            "tech": "TypeScript · React · Next.js · Gemini API · Google Maps API · Tailwind CSS",
            "desc": [
                "Intelligent travel planning app with AI itinerary generation and hotel recommendations.",
                "Google Places API integration for real-time POI discovery and rating data.",
                "Shareable trip plans with collaborative editing and PDF export capability.",
            ]
        },
        {
            "name": "Coursemate AI — Personalized Learning Assistant",
            "url":  "https://github.com/upasanaX/CodeAlpha_AI",
            "tech": "Python · NLP · Scikit-learn · React · FastAPI",
            "desc": [
                "Recommendation engine using NLP and collaborative filtering for course discovery.",
                "Skill-gap analysis feature comparing learner profile against industry benchmarks.",
                "Integrated with Hugging Face for semantic course description matching.",
            ]
        },
        {
            "name": "LinguoFlow PRO — Multilingual Translation Tool",
            "url":  "https://github.com/upasanaX/CodeAlpha_AI",
            "tech": "Python · Hugging Face Transformers · React · FastAPI · WebSockets",
            "desc": [
                "Real-time text translation supporting 15+ language pairs with &lt;200 ms latency.",
                "Transformer-based models (Helsinki-NLP/opus-mt series) for high-accuracy translation.",
                "Speech-to-text input with browser Web Speech API and downloadable translation history.",
            ]
        },
        {
            "name": "OIBSIP Web Suite — Internship Project Collection",
            "url":  "https://github.com/upasanaX/OIBSIP",
            "tech": "HTML5 · CSS3 · JavaScript · Tailwind CSS · LocalStorage API",
            "desc": [
                "Portfolio Website with animated hero, glassmorphic cards, and smooth scroll navigation.",
                "To-Do List App with drag-and-drop, categories, priorities, and localStorage persistence.",
                "Temperature Converter supporting 4 scales with real-time conversion and history log.",
                "Deployed live at: " + link("portfolio-nine-rose-70.vercel.app", "https://portfolio-nine-rose-70.vercel.app"),
            ]
        },
    ]

    for p in projects:
        story.append(KeepTogether([
            Paragraph(
                link(p["name"], p["url"], "#1e3a5f"),
                s["proj"]),
            Paragraph(p["tech"], s["proj_tech"]),
            *[bullet_pt(d, s) for d in p["desc"]],
            Spacer(1, 2),
        ]))

    # ══════════════════════════════════════════════════════════════════════════
    # EDUCATION
    # ══════════════════════════════════════════════════════════════════════════
    story.append(section_heading("EDUCATION", s))
    story.append(hr())

    edu_header = Table(
        [[Paragraph("<b>B.Tech in Computer Science &amp; Engineering</b>", s["job"]),
          Paragraph("2025 – 2029 (Expected)", s["date"])]],
        colWidths=[W*0.7, W*0.3]
    )
    edu_header.setStyle(TableStyle([
        ("VALIGN",       (0,0),(-1,-1),"TOP"),
        ("LEFTPADDING",  (0,0),(-1,-1), 0),
        ("RIGHTPADDING", (0,0),(-1,-1), 0),
        ("TOPPADDING",   (0,0),(-1,-1), 0),
        ("BOTTOMPADDING",(0,0),(-1,-1), 0),
        ("ALIGN",        (1,0),(1,0),  "RIGHT"),
    ]))
    story.append(edu_header)
    story.append(Paragraph(
        "RCC Institute of Information Technology (RCCIIT), Kolkata — West Bengal, India",
        s["company"]))
    story.append(bullet_pt("Affiliated to Maulana Abul Kalam Azad University of Technology (MAKAUT)", s))
    story.append(bullet_pt("Relevant coursework: Data Structures & Algorithms, DBMS, Operating Systems, "
                           "Computer Networks, Machine Learning, Software Engineering", s))
    story.append(bullet_pt("Active member of the college coding club and tech fest organizing committee", s))
    story.append(Spacer(1, 4))

    # ══════════════════════════════════════════════════════════════════════════
    # ACHIEVEMENTS & OPEN SOURCE
    # ══════════════════════════════════════════════════════════════════════════
    story.append(section_heading("ACHIEVEMENTS & OPEN SOURCE", s))
    story.append(hr())

    story.append(bullet_pt(
        "<b>Smart India Hackathon 2026 (SIH2026)</b> — Participated as Full-Stack Lead with team "
        "TechBrats; built KrishiKavach AI agricultural platform under 36-hour hackathon sprint.", s))
    story.append(bullet_pt(
        "<b>Open Source Contributor</b> — 6 public repositories on "
        + link("GitHub", "https://github.com/upasanaX")
        + " spanning AI, fintech, and web development; collectively starred by the community.", s))
    story.append(bullet_pt(
        "<b>Two Internships Completed</b> — CodeAlpha (AI/CV) and Oasis Infobyte (Web Dev) with "
        "deliverable projects merged into production repos.", s))
    story.append(bullet_pt(
        "<b>Live Deployed Portfolio</b> — Personal portfolio at "
        + link("portfolio-nine-rose-70.vercel.app", "https://portfolio-nine-rose-70.vercel.app")
        + " showcasing all projects with interactive project gallery and modal previews.", s))
    story.append(Spacer(1, 4))

    # ══════════════════════════════════════════════════════════════════════════
    # LINKS FOOTER
    # ══════════════════════════════════════════════════════════════════════════
    footer_table = Table(
        [[
            Paragraph(link("GitHub Profile", "https://github.com/upasanaX"),          s["normal"]),
            Paragraph(link("LinkedIn",        "https://www.linkedin.com/in/upasana-roy-170328202"), s["normal"]),
            Paragraph(link("Portfolio",       "https://portfolio-nine-rose-70.vercel.app"),          s["normal"]),
            Paragraph(link("Email",           "mailto:upasana2k25@gmail.com"),                        s["normal"]),
        ]],
        colWidths=[W/4]*4,
    )
    footer_table.setStyle(TableStyle([
        ("BACKGROUND",   (0,0),(-1,-1), DARK_BG),
        ("LEFTPADDING",  (0,0),(-1,-1), 8),
        ("RIGHTPADDING", (0,0),(-1,-1), 8),
        ("TOPPADDING",   (0,0),(-1,-1), 6),
        ("BOTTOMPADDING",(0,0),(-1,-1), 6),
        ("ALIGN",        (0,0),(-1,-1), "CENTER"),
    ]))
    story.append(footer_table)

    doc.build(story)
    size = os.path.getsize(OUTPUT_PATH)
    print(f"[OK] PDF generated: {OUTPUT_PATH}")
    print(f"   Size: {size:,} bytes ({size/1024:.1f} KB)")


if __name__ == "__main__":
    build()
