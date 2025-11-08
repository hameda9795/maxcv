import { NextRequest, NextResponse } from 'next/server';
import { openai, AI_MODEL } from '@/lib/openai';
import { generateCVPrompt } from '@/lib/prompts';
import { UserProfile, JobPosting } from '@/types';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profile, job, applicationId } = body as {
      profile: UserProfile;
      job: JobPosting;
      applicationId?: string;
    };

    // Validate required fields
    if (!profile || !job) {
      return NextResponse.json(
        { error: 'Profile and job information are required' },
        { status: 400 }
      );
    }

    // Generate the CV using OpenAI
    const prompt = generateCVPrompt(profile, job);

    console.log('Generating CV with GPT-4...');

    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert CV writer specializing in ATS-optimized resumes for software engineers. You create compelling, honest, and highly targeted CVs that pass applicant tracking systems and impress hiring managers.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const cvContent = completion.choices[0]?.message?.content || '';
    const tokensUsed = completion.usage?.total_tokens || 0;

    // Save to database if applicationId is provided
    if (applicationId) {
      await prisma.generatedDocument.create({
        data: {
          applicationId,
          type: 'cv',
          content: cvContent,
          aiModel: AI_MODEL,
          promptUsed: prompt,
          tokensUsed,
        },
      });
    }

    return NextResponse.json({
      success: true,
      cv: cvContent,
      metadata: {
        model: AI_MODEL,
        tokensUsed,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Error generating CV:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate CV' },
      { status: 500 }
    );
  }
}
