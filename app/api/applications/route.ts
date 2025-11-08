import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - List all applications for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        applications: {
          include: {
            documents: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      applications: user.applications,
    });
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// POST - Create a new job application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, jobTitle, companyName, jobDescription, notes } = body;

    if (!email || !jobTitle || !companyName || !jobDescription) {
      return NextResponse.json(
        { error: 'Email, job title, company name, and job description are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please create a profile first.' },
        { status: 404 }
      );
    }

    // Create application
    const application = await prisma.jobApplication.create({
      data: {
        userId: user.id,
        jobTitle,
        companyName,
        jobDescription,
        notes,
      },
      include: {
        documents: true,
      },
    });

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (error: any) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create application' },
      { status: 500 }
    );
  }
}
