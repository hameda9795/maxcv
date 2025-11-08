'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">MaxCV</h1>
            <nav className="space-x-4">
              <Link
                href="/profile"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Profile
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            AI-Powered CV & Cover Letter Generator
          </h2>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Generate ATS-optimized CVs and compelling cover letters tailored to each job application
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Powered by GPT-4, designed to pass Applicant Tracking Systems and impress hiring managers
          </p>

          <div className="flex justify-center gap-4 mb-16">
            <Link
              href="/profile"
              className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
              Create Your Profile
            </Link>
            <Link
              href="/application"
              className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-50 transition-colors border-2 border-indigo-600"
            >
              New Application
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">ATS-Optimized</h3>
              <p className="text-gray-600">
                Plain text, keyword-rich CVs designed to pass Applicant Tracking Systems
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                GPT-4 Turbo analyzes your profile and job description to create perfect matches
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Tailored Content</h3>
              <p className="text-gray-600">
                Every CV and cover letter is customized for the specific job position
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">Create Profile</h4>
                <p className="text-sm text-gray-600">
                  Enter your background, skills, projects, and achievements
                </p>
              </div>

              <div className="text-center">
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">Add Job Details</h4>
                <p className="text-sm text-gray-600">
                  Paste the job description and company information
                </p>
              </div>

              <div className="text-center">
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">AI Generation</h4>
                <p className="text-sm text-gray-600">
                  GPT-4 creates optimized CV and cover letter
                </p>
              </div>

              <div className="text-center">
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h4 className="font-semibold mb-2">Review & Apply</h4>
                <p className="text-sm text-gray-600">
                  Review, edit if needed, and apply with confidence
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            MaxCV - AI-Powered CV & Cover Letter Generator © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
