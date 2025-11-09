'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserProfile } from '@/types';

export default function ProfilePage() {
  const [email, setEmail] = useState('hameda9795@gmail.com');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Hamed Akhgari',
    email: 'hameda9795@gmail.com',
    phone: '+31 6 23434286',
    location: 'Utrecht, Netherlands',
    professionalTitle: 'Backend Engineer',
    yearsOfExperience: 0.5,
    bootcampInfo: 'Capgemini bootcamp, 720 hours intensive training, Oct 2024 - Mar 2025',
    backgroundYears: 14,
    backgroundField: 'Civil Engineering',
    education: [
      {
        degree: 'Mathematics & System Analysis',
        institution: 'Utrecht University',
        location: 'Utrecht, Netherlands',
      },
      {
        degree: 'B.S. Civil Engineering',
        institution: 'Azad University',
        location: 'Iran',
      },
    ],
    technicalSkills: {
      expert: ['Java', 'Spring Boot', 'PostgreSQL', 'MySQL', 'RabbitMQ', 'REST APIs', 'Docker', 'Git', 'Agile', 'Performance Optimization'],
      proficient: ['React.js', 'Angular', 'TypeScript', 'CI/CD', 'Microservices Architecture'],
      learning: ['GCP', 'Gradle', 'Kubernetes', 'Advanced database optimization for large scale'],
    },
    projects: [
      {
        name: 'Restaurant Management System',
        description: '500+ concurrent users, <2s response time, 12+ APIs, 85% test coverage',
        technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'JUnit'],
        metrics: ['500+ concurrent users', '<2s response time', '12+ APIs', '85% test coverage'],
        status: 'production',
      },
      {
        name: 'RabbitMQ Order Notification',
        description: '94% latency improvement (5.2s → 281ms), event-driven architecture',
        technologies: ['Java', 'Spring Boot', 'RabbitMQ'],
        metrics: ['94% latency improvement', '5.2s → 281ms'],
        status: 'production',
      },
      {
        name: 'ParsiBrug',
        description: 'Live production, 1000+ monthly translations, <2s response time',
        technologies: ['Java', 'Spring Boot', 'REST API'],
        metrics: ['1000+ monthly translations', '<2s response time'],
        status: 'production',
        url: 'https://parsibrug.com',
      },
      {
        name: 'Bitzomax',
        description: 'Live production, 200+ video streams, fully deployed',
        technologies: ['Java', 'Spring Boot', 'Video Streaming'],
        metrics: ['200+ video streams'],
        status: 'production',
      },
    ],
    achievements: [
      { description: '94% latency improvement through asynchronous architecture', metric: '94%' },
      { description: '500+ concurrent user systems with sub-2 second response times', metric: '500+ users' },
      { description: '85% test coverage with JUnit/Mockito', metric: '85%' },
      { description: '40% bug reduction through code reviews', metric: '40%' },
      { description: '25% UI/Backend performance improvement', metric: '25%' },
      { description: '30% code complexity reduction', metric: '30%' },
      { description: 'Led 5-person Agile team, 95% sprint completion', metric: '95%' },
    ],
    certifications: [],
    languages: [
      { name: 'English', proficiency: 'Professional' },
      { name: 'Dutch', proficiency: 'Basic' },
      { name: 'Persian', proficiency: 'Native' },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          profileData: profile,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Profile saved successfully!');
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (error) {
      setMessage('Error saving profile');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile({ ...profile, [field]: value });
  };

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
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => updateProfile('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfile('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => updateProfile('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => updateProfile('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Professional Background */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Professional Background</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={profile.professionalTitle}
                  onChange={(e) => updateProfile('professionalTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience (Professional Dev)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.yearsOfExperience}
                  onChange={(e) => updateProfile('yearsOfExperience', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bootcamp/Training Info
                </label>
                <textarea
                  value={profile.bootcampInfo}
                  onChange={(e) => updateProfile('bootcampInfo', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Career Years
                </label>
                <input
                  type="number"
                  value={profile.backgroundYears}
                  onChange={(e) => updateProfile('backgroundYears', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Career Field
                </label>
                <input
                  type="text"
                  value={profile.backgroundField}
                  onChange={(e) => updateProfile('backgroundField', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Technical Skills</h2>
            <p className="text-sm text-gray-600 mb-4">Enter skills separated by commas</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expert Level
                </label>
                <input
                  type="text"
                  value={profile.technicalSkills?.expert?.join(', ') || ''}
                  onChange={(e) =>
                    updateProfile('technicalSkills', {
                      ...profile.technicalSkills,
                      expert: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proficient Level
                </label>
                <input
                  type="text"
                  value={profile.technicalSkills?.proficient?.join(', ') || ''}
                  onChange={(e) =>
                    updateProfile('technicalSkills', {
                      ...profile.technicalSkills,
                      proficient: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currently Learning
                </label>
                <input
                  type="text"
                  value={profile.technicalSkills?.learning?.join(', ') || ''}
                  onChange={(e) =>
                    updateProfile('technicalSkills', {
                      ...profile.technicalSkills,
                      learning: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Work Experience</h2>
              <button
                type="button"
                onClick={() => {
                  const newExp = {
                    title: '',
                    company: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    current: false,
                    responsibilities: [''],
                    achievements: [''],
                  };
                  updateProfile('workExperience', [...(profile.workExperience || []), newExp]);
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
              >
                + Add Experience
              </button>
            </div>

            {profile.workExperience && profile.workExperience.length > 0 ? (
              <div className="space-y-6">
                {profile.workExperience.map((exp, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = profile.workExperience?.filter((_, i) => i !== index);
                          updateProfile('workExperience', updated);
                        }}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => {
                            const updated = [...(profile.workExperience || [])];
                            updated[index].title = e.target.value;
                            updateProfile('workExperience', updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company *
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...(profile.workExperience || [])];
                            updated[index].company = e.target.value;
                            updateProfile('workExperience', updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location || ''}
                          onChange={(e) => {
                            const updated = [...(profile.workExperience || [])];
                            updated[index].location = e.target.value;
                            updateProfile('workExperience', updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date (e.g., Jan 2023)
                        </label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => {
                            const updated = [...(profile.workExperience || [])];
                            updated[index].startDate = e.target.value;
                            updateProfile('workExperience', updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date (leave empty if current)
                        </label>
                        <input
                          type="text"
                          value={exp.endDate || ''}
                          disabled={exp.current}
                          onChange={(e) => {
                            const updated = [...(profile.workExperience || [])];
                            updated[index].endDate = e.target.value;
                            updateProfile('workExperience', updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={exp.current || false}
                          onChange={(e) => {
                            const updated = [...(profile.workExperience || [])];
                            updated[index].current = e.target.checked;
                            if (e.target.checked) {
                              updated[index].endDate = undefined;
                            }
                            updateProfile('workExperience', updated);
                          }}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          Currently working here
                        </label>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Responsibilities (one per line)
                      </label>
                      <textarea
                        value={exp.responsibilities.join('\n')}
                        onChange={(e) => {
                          const updated = [...(profile.workExperience || [])];
                          updated[index].responsibilities = e.target.value.split('\n').filter(r => r.trim());
                          updateProfile('workExperience', updated);
                        }}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No work experience added yet.</p>
            )}
          </div>

          {/* Projects */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Projects</h2>
              <button
                type="button"
                onClick={() => {
                  const newProject = {
                    name: '',
                    description: '',
                    technologies: [],
                    metrics: [],
                    status: 'development' as const,
                  };
                  updateProfile('projects', [...(profile.projects || []), newProject]);
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
              >
                + Add Project
              </button>
            </div>

            {profile.projects && profile.projects.length > 0 ? (
              <div className="space-y-6">
                {profile.projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-medium">Project {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = profile.projects?.filter((_, i) => i !== index);
                          updateProfile('projects', updated);
                        }}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Name *
                        </label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => {
                            const updated = [...(profile.projects || [])];
                            updated[index].name = e.target.value;
                            updateProfile('projects', updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          value={project.description}
                          onChange={(e) => {
                            const updated = [...(profile.projects || [])];
                            updated[index].description = e.target.value;
                            updateProfile('projects', updated);
                          }}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Technologies (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={project.technologies.join(', ')}
                          onChange={(e) => {
                            const updated = [...(profile.projects || [])];
                            updated[index].technologies = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                            updateProfile('projects', updated);
                          }}
                          placeholder="Java, Spring Boot, PostgreSQL"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Metrics/Achievements (one per line)
                        </label>
                        <textarea
                          value={project.metrics?.join('\n') || ''}
                          onChange={(e) => {
                            const updated = [...(profile.projects || [])];
                            updated[index].metrics = e.target.value.split('\n').filter(m => m.trim());
                            updateProfile('projects', updated);
                          }}
                          rows={3}
                          placeholder="500+ concurrent users&#10;<2s response time&#10;85% test coverage"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                          </label>
                          <select
                            value={project.status || 'development'}
                            onChange={(e) => {
                              const updated = [...(profile.projects || [])];
                              updated[index].status = e.target.value as 'production' | 'development' | 'completed';
                              updateProfile('projects', updated);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="development">Development</option>
                            <option value="production">Production</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            URL (optional)
                          </label>
                          <input
                            type="url"
                            value={project.url || ''}
                            onChange={(e) => {
                              const updated = [...(profile.projects || [])];
                              updated[index].url = e.target.value;
                              updateProfile('projects', updated);
                            }}
                            placeholder="https://example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No projects added yet.</p>
            )}
          </div>

          {/* Education */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Education</h2>
              <button
                type="button"
                onClick={() => {
                  const newEdu = {
                    degree: '',
                    institution: '',
                    location: '',
                    graduationYear: '',
                  };
                  updateProfile('education', [...(profile.education || []), newEdu]);
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
              >
                + Add Education
              </button>
            </div>

            {profile.education && profile.education.length > 0 ? (
              <div className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-sm font-medium">Education {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = profile.education?.filter((_, i) => i !== index);
                          updateProfile('education', updated);
                        }}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Degree *
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = [...(profile.education || [])];
                            updated[index].degree = e.target.value;
                            updateProfile('education', updated);
                          }}
                          placeholder="B.S. Computer Science"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Institution *
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...(profile.education || [])];
                            updated[index].institution = e.target.value;
                            updateProfile('education', updated);
                          }}
                          placeholder="University Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={edu.location || ''}
                          onChange={(e) => {
                            const updated = [...(profile.education || [])];
                            updated[index].location = e.target.value;
                            updateProfile('education', updated);
                          }}
                          placeholder="City, Country"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Graduation Year
                        </label>
                        <input
                          type="text"
                          value={edu.graduationYear || ''}
                          onChange={(e) => {
                            const updated = [...(profile.education || [])];
                            updated[index].graduationYear = e.target.value;
                            updateProfile('education', updated);
                          }}
                          placeholder="2020"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No education added yet.</p>
            )}
          </div>

          {/* Achievements */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Key Achievements</h2>
              <button
                type="button"
                onClick={() => {
                  const newAchievement = {
                    description: '',
                    metric: '',
                  };
                  updateProfile('achievements', [...(profile.achievements || []), newAchievement]);
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
              >
                + Add Achievement
              </button>
            </div>

            {profile.achievements && profile.achievements.length > 0 ? (
              <div className="space-y-3">
                {profile.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-4 items-start border border-gray-200 rounded-lg p-3">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          value={achievement.description}
                          onChange={(e) => {
                            const updated = [...(profile.achievements || [])];
                            updated[index].description = e.target.value;
                            updateProfile('achievements', updated);
                          }}
                          placeholder="Achievement description"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={achievement.metric || ''}
                          onChange={(e) => {
                            const updated = [...(profile.achievements || [])];
                            updated[index].metric = e.target.value;
                            updateProfile('achievements', updated);
                          }}
                          placeholder="Metric (e.g., 94%)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = profile.achievements?.filter((_, i) => i !== index);
                        updateProfile('achievements', updated);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No achievements added yet.</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>

          {message && (
            <div
              className={`p-4 rounded-md ${
                message.includes('Error')
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
