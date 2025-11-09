'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CVFormatter from '@/components/CVFormatter';
import { exportToPDF, exportToDOCX, generateFileName } from '@/lib/cvExport';

export default function ApplicationPage() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('id');

  const [email, setEmail] = useState('hameda9795@gmail.com');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedCV, setGeneratedCV] = useState('');
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Load existing application if ID is provided
  useEffect(() => {
    if (applicationId) {
      loadApplication(applicationId);
    }
  }, [applicationId]);

  const loadApplication = async (id: string) => {
    setLoading(true);
    try {
      // Fetch applications for the user
      const response = await fetch(`/api/applications?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (data.success) {
        // Find the specific application
        const app = data.applications.find((a: any) => a.id === id);

        if (app) {
          setJobTitle(app.jobTitle);
          setCompanyName(app.companyName);
          setJobDescription(app.jobDescription);

          // Load documents if they exist
          if (app.documents && app.documents.length > 0) {
            const cvDoc = app.documents.find((d: any) => d.type === 'cv');
            const coverLetterDoc = app.documents.find((d: any) => d.type === 'cover_letter');

            if (cvDoc) setGeneratedCV(cvDoc.content);
            if (coverLetterDoc) setGeneratedCoverLetter(coverLetterDoc.content);
          }
        }
      }
    } catch (error) {
      console.error('Error loading application:', error);
      setError('Error loading application');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    setGeneratedCV('');
    setGeneratedCoverLetter('');

    try {
      // First, get the user's profile
      const profileResponse = await fetch(`/api/profile?email=${encodeURIComponent(email)}`);
      const profileData = await profileResponse.json();

      if (!profileData.success) {
        setError('Please create your profile first!');
        setGenerating(false);
        return;
      }

      const profile = profileData.profile;

      // Create job application
      const appResponse = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          jobTitle,
          companyName,
          jobDescription,
        }),
      });

      const appData = await appResponse.json();

      if (!appData.success) {
        setError('Error creating application: ' + appData.error);
        setGenerating(false);
        return;
      }

      const applicationId = appData.application.id;

      // Generate CV and Cover Letter in parallel
      const [cvResponse, coverLetterResponse] = await Promise.all([
        fetch('/api/generate/cv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profile: {
              fullName: profile.fullName,
              email: profile.email,
              phone: profile.phone,
              location: profile.location,
              professionalTitle: profile.professionalTitle,
              yearsOfExperience: profile.yearsOfExperience,
              bootcampInfo: profile.bootcampInfo,
              backgroundYears: profile.backgroundYears,
              backgroundField: profile.backgroundField,
              education: profile.education,
              technicalSkills: profile.technicalSkills,
              projects: profile.projects,
              achievements: profile.achievements,
              workExperience: profile.workExperience,
              certifications: profile.certifications,
              languages: profile.languages,
            },
            job: {
              title: jobTitle,
              company: companyName,
              description: jobDescription,
            },
            applicationId,
          }),
        }),
        fetch('/api/generate/cover-letter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profile: {
              fullName: profile.fullName,
              email: profile.email,
              phone: profile.phone,
              location: profile.location,
              professionalTitle: profile.professionalTitle,
              yearsOfExperience: profile.yearsOfExperience,
              bootcampInfo: profile.bootcampInfo,
              backgroundYears: profile.backgroundYears,
              backgroundField: profile.backgroundField,
              education: profile.education,
              technicalSkills: profile.technicalSkills,
              projects: profile.projects,
              achievements: profile.achievements,
              workExperience: profile.workExperience,
              certifications: profile.certifications,
              languages: profile.languages,
            },
            job: {
              title: jobTitle,
              company: companyName,
              description: jobDescription,
            },
            applicationId,
          }),
        }),
      ]);

      const cvData = await cvResponse.json();
      const coverLetterData = await coverLetterResponse.json();

      if (cvData.success && coverLetterData.success) {
        setGeneratedCV(cvData.cv);
        setGeneratedCoverLetter(coverLetterData.coverLetter);
      } else {
        setError('Error generating documents: ' + (cvData.error || coverLetterData.error));
      }
    } catch (error: any) {
      setError('Error: ' + error.message);
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              MaxCV
            </Link>
            <nav className="space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {applicationId ? 'View Application' : 'New Job Application'}
          </h1>
          {applicationId && (
            <Link
              href="/application"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + New Application
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Job Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Medior Java Engineer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Keylane"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description *
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here..."
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={generating || !jobTitle || !companyName || !jobDescription}
                  className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  {generating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating with GPT-4...
                    </span>
                  ) : (
                    'Generate CV & Cover Letter'
                  )}
                </button>

                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-md">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {/* Generated CV */}
            {generatedCV && (
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Generated CV</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(generatedCV)}
                      className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={() => exportToPDF(generatedCV, generateFileName(companyName, 'pdf'))}
                      className="px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600 rounded-md"
                    >
                      📄 PDF
                    </button>
                    <button
                      onClick={() => exportToDOCX(generatedCV, generateFileName(companyName, 'docx'))}
                      className="px-4 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded-md"
                    >
                      📝 DOCX
                    </button>
                  </div>
                </div>
                <CVFormatter cvText={generatedCV} />
              </div>
            )}

            {/* Generated Cover Letter */}
            {generatedCoverLetter && (
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Generated Cover Letter</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(generatedCoverLetter)}
                      className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={() => exportToPDF(generatedCoverLetter, generateFileName(companyName + '-CoverLetter', 'pdf'))}
                      className="px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600 rounded-md"
                    >
                      📄 PDF
                    </button>
                    <button
                      onClick={() => exportToDOCX(generatedCoverLetter, generateFileName(companyName + '-CoverLetter', 'docx'))}
                      className="px-4 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded-md"
                    >
                      📝 DOCX
                    </button>
                  </div>
                </div>
                <div className="bg-white p-6 rounded border border-gray-200">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                    {generatedCoverLetter}
                  </div>
                </div>
              </div>
            )}

            {!generatedCV && !generatedCoverLetter && !generating && (
              <div className="bg-white shadow rounded-lg p-6">
                <div className="text-center text-gray-500 py-12">
                  <div className="text-6xl mb-4">📄</div>
                  <p>Fill in the job details and click "Generate" to create your documents</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
