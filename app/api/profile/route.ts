import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Retrieve user profile
export async function GET(request: NextRequest) {
  try {
    // TODO: Get userId from session/auth
    // For now, we'll use a hardcoded userId or email from query params
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
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: user.profile,
    });
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// POST - Create or update user profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, profileData } = body;

    if (!email || !profileData) {
      return NextResponse.json(
        { error: 'Email and profile data are required' },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      // Create new user with a temporary password
      // In production, use proper authentication
      user = await prisma.user.create({
        data: {
          email,
          password: 'temp_password', // TODO: Implement proper auth
          name: profileData.fullName,
        },
        include: { profile: true },
      });
    }

    // Create or update profile
    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        professionalTitle: profileData.professionalTitle,
        yearsOfExperience: profileData.yearsOfExperience,
        bootcampInfo: profileData.bootcampInfo,
        backgroundYears: profileData.backgroundYears,
        backgroundField: profileData.backgroundField,
        education: profileData.education,
        technicalSkills: profileData.technicalSkills,
        projects: profileData.projects,
        achievements: profileData.achievements,
        workExperience: profileData.workExperience,
        certifications: profileData.certifications,
        languages: profileData.languages,
      },
      create: {
        userId: user.id,
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        professionalTitle: profileData.professionalTitle,
        yearsOfExperience: profileData.yearsOfExperience,
        bootcampInfo: profileData.bootcampInfo,
        backgroundYears: profileData.backgroundYears,
        backgroundField: profileData.backgroundField,
        education: profileData.education,
        technicalSkills: profileData.technicalSkills,
        projects: profileData.projects,
        achievements: profileData.achievements,
        workExperience: profileData.workExperience,
        certifications: profileData.certifications,
        languages: profileData.languages,
      },
    });

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error: any) {
    console.error('Error saving profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save profile' },
      { status: 500 }
    );
  }
}
