import { NextResponse } from 'next/server';
import { analyzeProjectScopeWithGemini } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, description, industry } = body;

    if (!description || description.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please provide at least a brief description of your project requirements.' },
        { status: 400 }
      );
    }

    const analysis = await analyzeProjectScopeWithGemini({
      service: service || 'Digital Experiences',
      description: description.trim(),
      industry: industry || 'Technology & Business',
    });

    return NextResponse.json({
      success: true,
      analysis,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal scoping error';
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}
