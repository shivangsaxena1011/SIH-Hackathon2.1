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
        response = `No supporting information was found in the authorized demo dataset.

You can query any entity in the authorized synthetic investigation dataset. Try asking:
• "Show connections for Rahul Mehra"
• "What cases is Rahul Mehra associated with?"
• "Which vehicles appear across multiple cases?"
• "What evidence supports the current insight?"
• "Summarize Case #2026-041"`;
        sources = ["Sentinel AI Knowledge Base (Demo)"];
      }
    }

    return NextResponse.json({ response, sources });
  } catch (error) {
    console.error('Assistant error', error);
    return NextResponse.json({ error: 'Failed to process query' }, { status: 500 });
  }
}
