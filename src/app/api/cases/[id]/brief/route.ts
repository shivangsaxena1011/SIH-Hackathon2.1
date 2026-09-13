import { NextResponse } from 'next/server';
import { generateInvestigationBrief, formatBriefToMarkdown } from '@/lib/cases/investigation-brief';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');

  const brief = generateInvestigationBrief(id);

  if (format === 'markdown' || format === 'md') {
    return new NextResponse(formatBriefToMarkdown(brief), {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="INVESTIGATION-BRIEF-${brief.caseNumber}.md"`
      }
    });
  }

  return NextResponse.json({ success: true, data: brief });
}
