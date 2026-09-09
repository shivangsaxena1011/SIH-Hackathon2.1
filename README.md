# 🛡️ SENTINEL — AI-Powered Secure Identity, Evidence & Criminal Network Intelligence Platform

> **Smart India Hackathon (SIH) Prototype**  
> **Primary Problem Statement:** PS189 — AI-Powered Criminal Network Analysis System  
> **Supporting Capability:** AI-Based Identity & Document Intelligence  
> **Core Tagline:** *Identity → Evidence → Connections → Intelligence*

---

## ⚠️ Important Disclaimer & Ethical Notice
This platform is a **prototype designed exclusively for demonstration during the Smart India Hackathon**. It uses **100% fictional, synthetic, and deterministic demo data**. It does not connect to real government databases, telecom backbones, actual CCTV networks, or live facial recognition surveillance infrastructure. All analytical outputs represent **investigative leads requiring human verification and do not constitute legal conclusions or proof of guilt**.

---

## 🎯 Executive Overview
Modern criminal investigations are hindered by fragmented, silod evidentiary data—ranging from forged identification documents and sporadic ANPR vehicle captures to cross-jurisdictional case files.

**SENTINEL** resolves this challenge by turning fragmented investigation data into explainable, cryptographic connections:
1. **Document Intelligence**: Deep forensic scrutiny, OCR extraction, and MRZ validation of submitted identity assets.
2. **Deterministic Entity Resolution**: Correlating ambiguous aliases, physical records, and document numbers into unified identity clusters.
3. **Interactive Knowledge Graph**: Visualizing multi-dimensional relationships across Persons, Vehicles, Identifiers, Locations, and Cases.
4. **Cross-Case Intelligence**: Highlighting overlapping nodes across seemingly disconnected ongoing investigations.
5. **Geospatial & Timeline Reconstruction**: Synchronized chronological playback of events and vector map visualization.
6. **Explainable AI Investigation Engine**: Rule-based detection of network hubs, co-occurrences, and suspicious patterns with explicit supporting indicators.
7. **Zero-Trust Security & Evidence Chain of Custody**: Strict RBAC, session management, tamper-evident SHA-256 evidence hashing, and immutable audit trails.

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PRESENTATION LAYER (Next.js 16)                       │
│  Dark-First Command Center UI • React Flow Graph • SVG Intelligence Map    │
│  Framer Motion • Space Grotesk & DM Sans • Responsive Glassmorphism         │
├─────────────────────────────────────────────────────────────────────────────┤
│                    API & SERVICE ABSTRACTION LAYER                          │
│  Next.js App Route Handlers • Server-Side RBAC Enforcement                  │
│  Auth Service • Document Analyzer • Entity Resolver • AI Engine • Search    │
├─────────────────────────────────────────────────────────────────────────────┤
│                    CORE REPOSITORY & GRAPH ENGINES                          │
│  Graph Service (Neo4j-Swappable) • Deterministic Centrality Calculations   │
│  Cryptographic Engine (Node.js Crypto SHA-256) • Audit Logging Pipeline    │
├─────────────────────────────────────────────────────────────────────────────┤
│                        DATA LAYER & SEED STORE                              │
│  SQLite (better-sqlite3) / Synthetic Seed Repository (Zero External Deps)   │
│  16 Persons • 8 Vehicles • 9 Identifiers • 12 Locations • 9 Cases • 32 Evts│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 💻 Tech Stack
- **Framework**: Next.js 16 (App Router, Server Actions & Route Handlers)
- **Language**: TypeScript 5 (Strict Typing across 16+ data models)
- **Styling & Design Tokens**: Tailwind CSS, CSS Variables (`#0B0716` canvas, `#1A0F2E` panels, `#A855F7` luminous purple accents)
- **Graph Visualization**: React Flow (`reactflow` interactive nodes, edges, custom layouts)
- **Motion & Micro-interactions**: Framer Motion
- **Icons**: Lucide React
- **Cryptography & Hashing**: Web Crypto API & Node.js `crypto` (SHA-256 integrity verification)
- **Database Abstraction**: SQLite (`better-sqlite3`) with in-memory deterministic seed fallback

---

## ⚡ SIH DEMO QUICK START

For judges and evaluators running a fast live demonstration:

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure optional environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   *(Note: Zero external API keys or cloud dependencies are required; offline demo fallback is 100% active).*
3. **Initialize demo dataset:**
   ```bash
   npm run demo:init
   ```
4. **Start the application:**
   ```bash
   npm run dev    # Or: npm run build && npm start
   ```
5. **Open login page:**
   Visit [`http://localhost:3000/login`](http://localhost:3000/login).
6. **Use demo credentials:**
   Click the **"Use Demo Account"** one-click button (auto-populates `officer.demo` / `Demo@12345` / MFA `123456`) and click **"ACCESS COMMAND CENTER"**.
7. **Click "START INVESTIGATION DEMO":**
   On the Dashboard or Landing Page, click **"START DEMO (Case #2026-041)"** to immediately open the primary investigation docket, or click **"Guided 11-Step Tour"** to launch the step-by-step presentation panel.

### 📋 Expected Demo Sequence (3–5 Minutes):
```
01 — CASE        Case #2026-041 (Operation Trishul) investigation docket
02 — DOCUMENT    DOC-2026-041-009 evidentiary identity card inspection
03 — IDENTITY    OCR (96%), forensic edge pre-screen & Entity Resolution (Rahul Mehra 94%)
04 — GRAPH       Radial knowledge graph with Rahul Mehra (P-1042) centered at hub
05 — CROSS-CASE  Multi-case entity overlap (Vehicle MP09-DEMO-4821 & phone links)
06 — TIMELINE    Chronological sequence from 09:40 to 12:10 across surveillance corridors
07 — MAP         Zero-dependency SVG vector intelligence map with event popups
08 — AI INSIGHT  Explainable "Why This Insight?" cards with explicit evidence citations
09 — EVIDENCE    SHA-256 cryptographic chain of custody & 1-byte tamper simulation
10 — SECURITY    Interactive judge security verification & RBAC enforcement
11 — AUDIT       Tamper-evident system audit trail recording all officer actions
```

---

## 🔑 Demo Credentials

| Demo Role | Officer ID | Password | MFA Code | Accessible Scope |
|---|---|---|---|---|
| **Investigating Officer** | `officer.demo` | `Demo@12345` | `123456` | Active Cases, Network Graph, Timeline, Map, Evidence, Upload |
| **Super Admin** | `admin.demo` | `Demo@12345` | `123456` | Full Access (All cases, audit, security center, system controls) |
| **Forensic Officer** | `forensic.demo` | `Demo@12345` | `123456` | Documents, Forensics, Evidence integrity, Lab records |
| **Analyst** | `analyst.demo` | `Demo@12345` | `123456` | Network graph, Timeline, Map, AI Insights, Cross-Case analytics |
| **Auditor** | `auditor.demo` | `Demo@12345` | `123456` | Read-only audit logs, Security status, Compliance tracking |

*Tip: On the login page, you can also click the **"Use Demo Account"** button to auto-fill these credentials.*

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- Node.js 18.17+ or 20+ installed
- npm 9+

### 2. Installation
```bash
# Navigate to the project directory
cd sih-platform

# Install dependencies
npm install
```

### 3. Run Verification Smoke Tests
```bash
npm run test
```
*Expected: 17/17 tests passing (cryptographic hashing, RBAC matrix, entity scoring, centrality, and AI safety checks).*

### 4. Launch Application
```bash
# Start development server
npm run dev

# Or build and launch production server
npm run build
npm run start
```

Visit: `http://localhost:3000`

---

## 🎬 Primary SIH Presentation Walkthrough (The End-to-End Story)

You can launch this sequence manually or navigate to the dedicated **Guided Judge Demo** at `/demo`.

1. **Secure Access (`/login`)**:
   - Log in as Inspector Priya Sharma (`officer.demo`, password `Demo@12345`, MFA `123456`).
   - Notice the multi-factor validation animation and HttpOnly session creation.
2. **Command Dashboard (`/dashboard`)**:
   - Inspect live KPIs (47 active cases, 126 entities correlated, 19 cross-case links).
   - Review the priority alerts and chronological activity stream.
3. **Open Primary Investigation (`/cases/C-001`)**:
   - Open **Case #2026-041 — Operation Trishul**.
   - Note the 12 linked entities and multi-jurisdictional scope.
4. **Document Forensic Ingestion (`/documents/D-001`)**:
   - Inspect Document **DOC-2026-041-009** (Identity Card).
   - Review OCR field extraction (96% accuracy) alongside MRZ data.
   - Inspect the **Forensic Pre-Screen**: edge anomalies detected around the photo region.
5. **Entity Resolution (`/documents/D-001`)**:
   - The engine matches the document to **Rahul Mehra (94% confidence)** based on name, DOB, and prior link signals.
   - Disclaimers highlight: *"Entity resolution provides an investigative lead and does not establish guilt."*
6. **Criminal Intelligence Graph (`/network`)**:
   - Explore the interactive React Flow network.
   - **Rahul Mehra** appears as the primary network hub (7 direct connections).
   - Trace connections to Vehicle **MP09-DEMO-4821**, Identifier **ID-DEMO-88421**, and associate **Arjun Verma**.
7. **Cross-Case Intelligence (`/cross-case`)**:
   - Highlight the cross-case correlation between **Case #2026-041**, **Case #2026-017**, and **Case #2025-089**.
   - View the entity overlap matrix confirming shared vehicle and location footprints.
8. **Timeline Reconstruction (`/timeline`)**:
   - Filter chronological events: 09:40 (Bhopal Central) → 10:15 (Transit Checkpoint Alpha) → 11:05 (Industrial Sector 7) → 12:10 (Lake Road Camera).
9. **Geospatial Intelligence (`/map`)**:
   - View the vector intelligence map showing camera clusters and checkpoints connected sequentially.
10. **Explainable AI Insights (`/insights`)**:
    - Review **Insight #001**: Cross-Case Entity Association (87% confidence).
    - Expand **"Why This Insight?"** to view the exact deterministic rules and supporting indicators.
11. **Cryptographic Evidence Registry (`/evidence`)**:
    - View the SHA-256 hash `a7f3d2e1b9c8f4a5...` with **INTEGRITY: VERIFIED**.
12. **Immutable Audit Trail (`/audit`)**:
    - Confirm the full action log recording Officer O-102's access history, and demonstrate access denial when attempting to access unauthorized files.

---

## 🔒 Security Architecture
- **Zero Trust Principles**: Principle of least privilege enforced across all 5 user tiers.
- **Server-Side Authorization**: API routes and views validate role permissions server-side.
- **Tamper-Evident Evidence**: Every evidentiary object possesses a deterministic 256-bit SHA digest.
- **Session Protection**: Strict HttpOnly cookies without insecure `localStorage` tokens.
- **Audit Completeness**: All access attempts (allowed and denied) generate structured audit events.

---

## 🔭 Future Production Evolution
In an enterprise government deployment, the architecture transitions seamlessly:
- **Graph Engine**: Prototype abstraction maps directly to an enterprise **Neo4j Enterprise Cluster** using Cypher queries.
- **Document OCR**: Replaced with hardened local OCR models (Tesseract / PaddleOCR / LayoutLM) in an air-gapped environment.
- **Data Ingestion**: Apache Kafka streams processing encrypted events from authorized law enforcement record management systems (RMS).
- **Zero-Knowledge Evidence**: Distributed ledger or PKI timestamp authority for multi-agency evidentiary non-repudiation.
