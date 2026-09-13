# SIH JUDGING DEMO CHECKLIST & OPERATING GUIDE

**Project:** SENTINEL — AI-Powered Secure Identity, Evidence & Criminal Network Intelligence Platform  
**Problem Statement:** PS189 (AI-Powered Criminal Network Analysis System)  
**Supporting Capability:** AI-Based Identity & Document Intelligence  
**Target Duration:** 3–5 Minutes Live Demonstration  

---

## BEFORE DEMO (Technical Pre-Flight Checks)

- [ ] **1. Start Server:** Run `npm start` (or `npm run dev`) in `sih-platform` on port 3000.
- [ ] **2. Confirm Login Page:** Open `http://localhost:3000/login` in Google Chrome or Edge.
- [ ] **3. Confirm Demo Data Loaded:** Verify 16 persons, 8 vehicles, 9 cases, 30 relationships loaded.
- [ ] **4. Test One-Click Login:** Click **"⚡ ONE-CLICK DEMO ACCESS (OFFICER)"** -> Confirm instant dashboard entry.
- [ ] **5. Confirm Primary Case Available:** Open `/cases/C-001` (Operation Trishul) -> Verify 9 tabs and Case Workspace link.
- [ ] **6. Confirm Document Forensics:** Open `/documents/D-001` -> Verify OCR (96%), MRZ, and Forensics (82% Suspicious).
- [ ] **7. Confirm Knowledge Graph:** Open `/network` -> Verify Rahul Mehra (P-1042) centered at hub with degree 7.
- [ ] **8. Confirm Path Finder:** Open Path Finder modal on `/network` -> Query `Rahul Mehra` to `Harsh Pandey` -> Verify 2-hop path via Vehicle `V-001`.
- [ ] **9. Confirm Community Clusters:** Click "Clusters" toggle on `/network` -> Verify 3 community partitions.
- [ ] **10. Confirm Map & Replay:** Open `/map` -> Verify SVG vector map loads without external API keys; open `/timeline` to test Replay Controller.
- [ ] **11. Confirm AI Insights & Brief:** Open `/insights` -> Open "Why This Insight?" modal; open Case Workspace -> Generate Section 65B Executive Brief.
- [ ] **12. Confirm Audit Ledger:** Open `/audit` -> Verify live recorded actions appear in real-time.
- [ ] **13. Test Demo Reset:** Click "Reset Demo Dataset" on `/settings` -> Confirm clean state restoration.
- [ ] **14. Display Resolution:** Set browser zoom to 100% or 90% at 1920x1080 / 1366x768.

---

## DURING DEMO (Recommended 3–5 Minute Presentation Path)

| Time | Step | Route | Key Talking Points for Judges |
| :---: | :--- | :--- | :--- |
| **0:00** | **1. Secure Access & MFA** | `/login` | Click **"⚡ ONE-CLICK DEMO ACCESS"**. Explain role separation, strict credential validation, cryptographic HMAC-SHA256 session tokens, and zero token leakage to JavaScript. |
| **0:25** | **2. Command Dashboard** | `/dashboard` | Highlight real-time intelligence KPIs, high-priority alerts, and the **Primary Focus Docket (Case #2026-041 — Operation Trishul)**. |
| **0:45** | **3. Investigation Workspace** | `/cases/C-001/workspace` | Open unified case workspace. Highlight the Change Monitor ("What Changed?"), quick action bar, and automated investigation health score. |
| **1:10** | **4. Document Forensics & Tampering** | `/documents/D-001` | Inspect evidentiary identity card **DOC-2026-041-009**. Show automated OCR (96%), font irregularity detection, and photo boundary anomaly. |
| **1:30** | **5. Entity Resolution** | `/documents/D-001` | Show candidate matching. Click **"RESOLVE ENTITY"** -> Instant confirmation: **Rahul Mehra (94% Match)**. Note: *"Priority != Guilt"*. |
| **1:55** | **6. Knowledge Graph & Hubs** | `/network` | Show Rahul Mehra (P-1042) as the syndicate hub with canonical degree 7. Show filter controls, edge confidence levels, and provenance cards. |
| **2:20** | **7. Investigation Path Finder** | `/network` (Modal) | Launch Path Finder. Search `Rahul Mehra` to `Harsh Pandey`. System traces 2-hop BFS shortest path through conduit vehicle `MP09-DEMO-4821`. |
| **2:45** | **8. Community Clusters** | `/network` | Toggle Cluster View. Show automatic partitioning into 3 distinct operational cells (Trishul Syndicate Core, Logistics Cell, Laundering Ring). |
| **3:10** | **9. Cross-Case Correlation** | `/cross-case` | Demonstrate cross-case overlap between Case #2026-041 (Bhopal) and Case #2026-017 (Indore) via vehicle MP09-DEMO-4821 and person links. |
| **3:30** | **10. Timeline Replay & Map** | `/timeline` & `/map` | Use the Timeline Replay Controller to playback chronological sequence from 09:40 to 12:10 on the zero-dependency SVG vector map. |
| **3:50** | **11. Explainable AI Insights** | `/insights` | Open Insight #001. Click **"Why This Insight?"** to inspect the multi-hop evidence chain and cited cryptographic evidence hashes. |
| **4:10** | **12. Priority Scoring** | `/cases/C-001/workspace` | Review the Explainable Priority Score (82/100, Critical Review) with the mandatory `PRIORITY != GUILT` human-in-the-loop disclaimer. |
| **4:25** | **13. Section 65B Legal Brief** | `/cases/C-001/workspace` | Click **"GENERATE BRIEF"**. Produce print-ready Executive Investigation Brief compliant with Section 65B of the Indian Evidence Act. |
| **4:45** | **14. Security & Audit Ledger** | `/security` & `/audit` | Verify SHA-256 evidence integrity, run 1-byte tamper simulation, and inspect the immutable audit trail recording every officer action. |

---

## AFTER DEMO (Reset for Next Round)

- [ ] **1. Reset Environment:** Navigate to `/settings` and click **"Reset Demo Dataset"** (or run `npm run demo:reset`).
- [ ] **2. Confirm Clean State:** Dashboard displays the green confirmation banner and all demo state is deterministically restored.
