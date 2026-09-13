import { NextResponse } from 'next/server';
import { seedPersons } from '@/data/seed';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Valid query string required' }, { status: 400 });
    }

    const q = query.toLowerCase().trim();
    let response = "";
    let sources: string[] = [];

    // Query 1: Connections for Rahul Mehra
    if (q.includes('rahul mehra') && (q.includes('connection') || q.includes('associate') || q.includes('link'))) {
      response = `Rahul Mehra (Person ID: P-1042, Alias: R. Mehra) has 7 direct connections in the intelligence network:
• Associated Person: Arjun Verma (P-2041) — Observed together at Industrial Sector 7 and shared vehicle events.
• Associated Vehicle: MP09-DEMO-4821 (Swift Sedan) — Vehicle registered / tracked with Rahul Mehra.
• Associated Identifier: ID-DEMO-88421 — Monitored phone number (+91-XXXX-XXX-421).
• Associated Document: DOC-2026-041-009 — Identity document currently flagged for forensic review.
• Primary Location: Bhopal Central Zone (L-001) — Multiple surveillance sightings.
• Associated Cases: Case #2026-041 (Operation Trishul), Case #2026-017 (Operation Kavach), and Case #2025-089 (Operation Netra).`;
      sources = [
        "Network Graph: Node P-1042",
        "Case #2026-041 Docket",
        "ANPR Event EVT-002",
        "Document DOC-2026-041-009",
        "Surveillance Event EVT-001"
      ];
    }
    // Query 2: Cases associated with Rahul Mehra
    else if ((q.includes('case') || q.includes('cases')) && q.includes('rahul mehra')) {
      response = `Rahul Mehra (P-1042) is recorded across 3 active investigations:
1. Case #2026-041 (Operation Trishul) — HIGH Priority: Multi-entity investigation involving document irregularities and coordinated vehicle transit.
2. Case #2026-017 (Operation Kavach) — HIGH Priority: Financial document irregularity investigation linked to identical vehicle MP09-DEMO-4821.
3. Case #2025-089 (Operation Netra) — MEDIUM Priority: Surveillance pattern analysis involving repeated appearances at sensitive checkpoints.`;
      sources = [
        "Case Files: #2026-041, #2026-017, #2025-089",
        "Cross-Case Overlap Matrix",
        "Person Profile: P-1042"
      ];
    }
    // Query 3: Vehicles appearing across multiple cases
    else if (q.includes('vehicle') || q.includes('car') || q.includes('anpr')) {
      response = `Cross-case vehicle analysis identified:
1. MP09-DEMO-4821 (Swift Sedan):
   • Appears in Case #2026-041 and Case #2026-017.
   • Associated with persons Rahul Mehra (P-1042) and Arjun Verma (P-2041).
   • Recorded at Transit Checkpoint Alpha (EVT-002) and Industrial Sector 7 (EVT-004).

2. UP32-DEMO-4455 (Toyota Fortuner):
   • Appears in Case #2026-052 and Case #2026-038.
   • Associated with Vikram Joshi (P-5023) and Rakesh Dubey (P-1634).

3. MP09-DEMO-1122 (Maruti Eeco Van):
   • Appears in Case #2026-041 and Case #2025-089.`;
      sources = [
        "ANPR Database: MP09-DEMO-4821",
        "Vehicle Registry Records",
        "Cross-Case Analysis Engine"
      ];
    }
    // Query 4: Strongest cross-case relationships
    else if (q.includes('cross-case') || q.includes('strongest') || q.includes('overlap')) {
      response = `The strongest cross-case correlation is between Case #2026-041 (Operation Trishul) and Case #2026-017 (Operation Kavach):
• Shared Subject: Rahul Mehra (P-1042) appears as an active entity in both dockets.
• Shared Associate: Arjun Verma (P-2041) co-occurs in both files.
• Shared Transport: Vehicle MP09-DEMO-4821 is logged in ANPR checkpoint events for both investigations.
• Shared Communication: Masked Identifier ID-DEMO-88421 links to both investigations.
• Correlation Confidence: 87% (Demo Analytics Score).`;
      sources = [
        "Cross-Case Entity Overlap Matrix",
        "Insight INS-001",
        "Investigation Files: C-001 & C-002"
      ];
    }
    // Query 5: Summarize Case 2026-041
    else if (q.includes('summarize') || q.includes('2026-041') || q.includes('trishul')) {
      response = `Investigation Summary for Case #2026-041 (Operation Trishul):
• Status: ACTIVE INVESTIGATION | Priority: HIGH
• Lead Officer: Inspector Priya Sharma (O-102)
• Total Linked Entities: 12 (including 3 persons, 2 vehicles, 1 document, 4 locations)
• Key Network Hub: Rahul Mehra (P-1042)
• Document Under Review: DOC-2026-041-009 (Forensic photo edge anomaly flagged)
• Primary Incident Chain: 09:40 (Bhopal Central) → 10:15 (Transit Checkpoint Alpha) → 11:05 (Industrial Sector 7) → 12:10 (Lake Road Camera).
• Recommendation: Review linked evidence EV-2026-041-001 and perform authorized manual identity verification.`;
      sources = [
        "Case #2026-041 Docket",
        "Document DOC-2026-041-009 Analysis",
        "Timeline Events: EVT-001 through EVT-006"
      ];
    }
    // Query 6: Evidence supporting high-priority alert / insight
    else if (q.includes('evidence') || q.includes('alert') || q.includes('support')) {
      response = `The High-Priority Investigation Review is supported by 4 verifiable indicators:
1. Document Forensics: Photo boundary manipulation detected in identity card DOC-2026-041-009 (Score: 74% / SUSPICIOUS).
2. Entity Resolution: Name and DOB match Rahul Mehra at 94% confidence, but visual mismatch requires officer review.
3. Cross-Case Links: Same subject and vehicle MP09-DEMO-4821 present in Case #2026-017.
4. Cryptographic Chain of Custody: Evidence EV-2026-041-001 hash (SHA-256: a7f3d2e1b9c8f4a5...) is verified intact.`;
      sources = [
        "Evidence EV-2026-041-001",
        "Insight INS-001",
        "Forensic Analysis DOC-2026-041-009",
        "Alert ALT-001"
      ];
    }
    // Query 7: Path finding & entity connection tracing
    else if (q.includes('path') || q.includes('trace') || (q.includes('connect') && (q.includes('between') || q.includes('how')))) {
      response = `SENTINEL Path Finder traced a 2-hop connection between Rahul Mehra (P-1042) and Harsh Pandey (P-1412):
• Step 1: Rahul Mehra [PERSON] — USES → Vehicle MP09-DEMO-4821 [VEHICLE] (94% confidence via Transport Department registration)
• Step 2: Vehicle MP09-DEMO-4821 [VEHICLE] — APPEARED_AT → Transit Checkpoint Alpha (91% confidence via ANPR sensor log)
• Step 3: Vehicle MP09-DEMO-4821 [VEHICLE] — LINKED_TO → Harsh Pandey [PERSON] (70% confidence via Cross-Case Analysis)
Overall Composite Confidence: 78% (Harmonic Average).
Conduit Type: Shared illicit transport conduit operating across state border.`;
      sources = [
        "Path Finder Engine: BFS Traversal",
        "Vehicle MP09-DEMO-4821 ANPR Logs",
        "Cross-Case Analysis: Case #2026-041 \u2194 Case #2026-017"
      ];
    }
    // Query 8: Network community clusters
    else if (q.includes('cluster') || q.includes('cell') || q.includes('community') || q.includes('syndicate')) {
      response = `Network Cluster Detection identified 3 operational syndicate cells:
1. Trishul Central Syndicate Core (Purple • Density 0.88):
   • Hub: Rahul Mehra (P-1042)
   • Members: Arjun Verma, Document DOC-2026-041-009, Vehicle MP09-DEMO-4821
   • Bridge Node: Vehicle MP09-DEMO-4821 bridges to Operation Kavach.

2. Transit Logistics & Courier Cell (Cyan • Density 0.74):
   • Hub: Sameer Khan (P-3099)
   • Members: Harsh Pandey, Vehicle RJ-14-CZ-8892, Indore Logistics Hub

3. Document & Identity Laundering Ring (Amber • Density 0.69):
   • Hub: Vikram Malhotra (P-4012)
   • Members: Synthetic Identifier ID-DEMO-88421, Document DOC-2026-041-010`;
      sources = [
        "Network Cluster Detection Engine",
        "Graph Topology Analysis",
        "Community Partition Matrix"
      ];
    }
    // Query 9: Priority Score & Urgency
    else if (q.includes('priority score') || q.includes('urgency') || q.includes('score for case')) {
      response = `Investigation Priority Score for Case #2026-041: 82 / 100 [CRITICAL REVIEW REQUIRED]
Evaluation Tier: URGENT INVESTIGATION PRIORITY

Contributing Risk Factors:
• Multi-Jurisdictional Cross-Case Conduit (+30 pts): Shared vehicle conduit to Case #2026-017.
• Unresolved Evidentiary Identity Discrepancy (+26 pts): Photo boundary anomaly in DOC-2026-041-009.
• High Network Entity Density (+18 pts): 14 correlated nodes and 12 operational edges.
• Active Cryptographic Evidence Lock (+8 pts): 4 verified SHA-256 evidence items.

STATUTORY NOTICE: PRIORITY != GUILT. This score directs investigative resource allocation for authorized officer review.`;
      sources = [
        "SENTINEL Priority Scoring Engine",
        "Case #2026-041 Evidence Register",
        "Forensic Analysis DOC-2026-041-009"
      ];
    }
    // Query 10: What changed? / Delta monitor
    else if (q.includes('what changed') || q.includes('change') || q.includes('delta') || q.includes('update')) {
      response = `Change Monitor detected 4 new intelligence updates for Case #2026-041 since the last shift review:
1. [ALERT] New Cross-Case Association: Harsh Pandey (P-1412) linked via vehicle overlap.
2. [WARNING] Forensic Pre-Screen Re-evaluated: Photo boundary manipulation confirmed on DOC-2026-041-009 (Confidence: 82%).
3. [ALERT] Transit Checkpoint Hit: Vehicle MP09-DEMO-4821 logged at Checkpoint Alpha.
4. [INFO] Cryptographic Artifact Sealed: Analysis artifact EV-2026-041-004 verified with SHA-256 hash.`;
      sources = [
        "Investigation Change Monitor",
        "Checkpoint Alpha Sensor Stream",
        "Evidence Registry Audit Trail"
      ];
    }
    // Query 11: Investigation brief / dossier
    else if (q.includes('brief') || q.includes('dossier') || q.includes('executive')) {
      response = `Executive Investigation Brief generated for Case #2026-041 (Operation Trishul):
• Classification: LAW ENFORCEMENT SENSITIVE // PROTOTYPE DEMO USE ONLY
• Priority Index: 82/100 (CRITICAL REVIEW REQUIRED)
• Primary Subjects: Rahul Mehra (Degree 7 hub), Arjun Verma (Degree 3)
• Verified Evidence Items: 4 cryptographically sealed SHA-256 artifacts
• Active Cross-Case Links: Operation Kavach (#2026-017) and Operation Netra (#2025-089)
• Section 65B Compliance: Digital chain of custody maintained for judicial submission.
You can view the full printable dossier or export markdown in the Investigation Workspace.`;
      sources = [
        "Investigation Brief Generator",
        "Section 65B Evidentiary Log",
        "Case #2026-041 Executive Summary"
      ];
    }
    // Fallback: Dynamic keyword matching from seed dataset
    else {
      // Check if person name matches
      const matchedPerson = seedPersons.find(p => q.includes(p.name.toLowerCase()));
      if (matchedPerson) {
        response = `Profile for ${matchedPerson.name} (${matchedPerson.id}):
• Status: ${matchedPerson.status} | Priority: ${matchedPerson.riskLevel}
• Aliases: ${matchedPerson.aliases.join(', ') || 'None recorded'}
• Associated Cases: ${matchedPerson.associatedCaseIds.join(', ')}
• Date of Birth: ${matchedPerson.dob || 'Unspecified'} | Nationality: ${matchedPerson.nationality || 'IND'}`;
        sources = [`Person Registry: ${matchedPerson.id}`];
      } else {
        response = `I can help you query the investigation dataset. Try asking:
• "Show connections for Rahul Mehra"
• "Find connection between Rahul Mehra and Harsh Pandey"
• "What are the network clusters?"
• "What is the priority score for Case 2026-041?"
• "What changed in Case 2026-041?"
• "Summarize Case #2026-041"`;
        sources = ["SENTINEL AI Knowledge Base (Demo)"];
      }
    }

    return NextResponse.json({ response, sources });
  } catch (error) {
    console.error('Assistant error', error);
    return NextResponse.json({ error: 'Failed to process query' }, { status: 500 });
  }
}
