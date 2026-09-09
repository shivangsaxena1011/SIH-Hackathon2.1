# SIH JUDGING DEMO CHECKLIST & OPERATING GUIDE

**Project:** SENTINEL — AI-Powered Secure Identity, Evidence & Criminal Network Intelligence Platform  
**Problem Statement:** PS189 (Criminal Network Analysis System)  
**Target Duration:** 3–5 Minutes Live Demonstration  

---

## BEFORE DEMO (Technical Pre-Flight Checks)

- [ ] **1. Start Server:** Run 
pm start (or 
pm run dev) in sih-platform on port 3000.
- [ ] **2. Confirm Login Page:** Open http://localhost:3000/login in Google Chrome or Edge.
- [ ] **3. Confirm Demo Data Loaded:** Run 
pm run demo:init or confirm 16 persons, 8 vehicles, 9 cases.
- [ ] **4. Test One-Click Login:** Click **"Use Demo Account"** -> Confirm instant dashboard entry.
- [ ] **5. Confirm Primary Case Available:** Open /cases/C-001 (Operation Trishul) -> Verify 9 tabs.
- [ ] **6. Confirm Document Forensics:** Open /documents/D-001 -> Verify OCR (96%) and Forensics (74%).
- [ ] **7. Confirm Knowledge Graph:** Open /network -> Verify Rahul Mehra (P-1042) centered at hub.
- [ ] **8. Confirm Map Renders:** Open /map -> Verify SVG vector map loads without external API keys.
- [ ] **9. Confirm AI Insights:** Open /insights -> Verify Insight #001 has expandable explanation.
- [ ] **10. Confirm Audit Ledger:** Open /audit -> Verify live recorded actions appear.
- [ ] **11. Test Demo Reset:** Click "Reset Demo Dataset" on /settings -> Confirm return to dashboard.
- [ ] **12. Display Resolution & Zoom:** Set browser zoom to 100% or 90% at 1920x1080 / 1366x768.

---

## DURING DEMO (Recommended 3-Minute Presentation Path)

| Time | Step | Route | Key Talking Points for Judges |
| :---: | :--- | :--- | :--- |
| **0:00** | **1. Login & MFA** | /login | Click **"Use Demo Account"**. Explain zero-knowledge access, department role separation, and demo environment safety. |
| **0:15** | **2. Command Dashboard** | /dashboard | Point out real-time investigation metrics, priority alerts, and the **Primary Focus Docket (Case #2026-041)**. |
| **0:30** | **3. Case Workspace** | /cases/C-001 | Click **"START DEMO (Case #2026-041)"**. Show 9 unified investigation tabs (Overview, Entities, Documents, Graph, etc.). Mention restricted Case #2026-999 is blocked by RBAC. |
| **0:50** | **4. Document Forensics** | /documents/D-001 | Open suspect identity card **DOC-2026-041-009**. Show automated OCR (96%), font irregularity detection, and photo boundary anomaly. |
| **1:10** | **5. Entity Resolution** | /documents/D-001 | Show candidate matching. Click **"RESOLVE ENTITY"** -> Instant confirmation: **Rahul Mehra (94% Match)**. Note: *"Priority != Guilt"*. |
| **1:30** | **6. Knowledge Graph** | /network | Show Rahul Mehra (P-1042) as the syndicate hub with 7 direct connections. Highlight associates, vehicles (MP09-DEMO-4821), and phone lines. |
| **1:50** | **7. Cross-Case Links** | /cross-case | Reveal that vehicle MP09-DEMO-4821 and Rahul Mehra bridge Case #2026-041 (Bhopal) and Case #2026-017 (Indore). |
| **2:10** | **8. Timeline & Geospatial** | /timeline & /map | Trace chronological sequence from 09:40 to 12:10 on the zero-dependency vector map across surveillance checkpoints. |
| **2:30** | **9. Explainable AI** | /insights | Open Insight #001. Expand **"WHY THIS INSIGHT?"** to show the exact indicators and cited Evidence IDs. |
| **2:45** | **10. Evidence Integrity**| /security | Verify SHA-256 cryptographic hash. Run interactive 1-byte tamper simulation to demonstrate tamper detection. |
| **2:55** | **11. Audit Ledger** | /audit | Show the immutable audit trail that recorded every step taken during the presentation. |

---

## AFTER DEMO (Reset for Next Round)

- [ ] **1. Reset Environment:** Navigate to /settings and click **"Reset Demo Dataset"** (or run 
pm run demo:reset in terminal).
- [ ] **2. Confirm Clean State:** Dashboard will display the green **"DEMO ENVIRONMENT RESTORED"** confirmation banner.
