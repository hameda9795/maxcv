import { NextRequest, NextResponse } from 'next/server';
import { openai, AI_MODEL } from '@/lib/openai';
import { generateCoverLetterPrompt } from '@/lib/prompts';
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

    // Generate the cover letter using OpenAI
    const prompt = generateCoverLetterPrompt(profile, job);

    console.log('Generating cover letter with GPT-4...');

    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert cover letter writer for software engineering positions. You create compelling, personalized cover letters that demonstrate genuine interest and strong fit while maintaining professionalism and authenticity.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const coverLetterContent = completion.choices[0]?.message?.content || '';
    const tokensUsed = completion.usage?.total_tokens || 0;

    // Save to database if applicationId is provided
    if (applicationId) {
      await prisma.generatedDocument.create({
        data: {
          applicationId,
          type: 'cover_letter',
          content: coverLetterContent,
          aiModel: AI_MODEL,
          promptUsed: prompt,
          tokensUsed,
        },
      });
    }

    return NextResponse.json({
      success: true,
      coverLetter: coverLetterContent,
      metadata: {
        model: AI_MODEL,
        tokensUsed,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Error generating cover letter:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
}
