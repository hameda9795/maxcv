'use client';

import React from 'react';

interface CVFormatterProps {
  cvText: string;
}

export default function CVFormatter({ cvText }: CVFormatterProps) {
  const lines = cvText.split('\n');

  const renderLine = (line: string, index: number) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={index} className="h-2"></div>;
    }

    // Detect section headers (ALL CAPS)
    const isSectionHeader =
      trimmed === trimmed.toUpperCase() &&
      trimmed.length > 3 &&
      !trimmed.includes('|') &&
      !trimmed.startsWith('•');

    if (isSectionHeader) {
      return (
        <h2
          key={index}
          className="text-sm font-bold text-gray-900 mt-4 mb-2 uppercase border-b border-gray-300 pb-1"
        >
          {trimmed}
        </h2>
      );
    }

    // First line is the name
    if (index === 0) {
      return (
        <h1 key={index} className="text-xl font-bold text-gray-900 mb-1">
          {trimmed}
        </h1>
      );
    }

    // Contact info (second line usually)
    if (index === 1 && trimmed.includes('|')) {
      return (
        <p key={index} className="text-sm text-gray-600 mb-4">
          {trimmed}
        </p>
      );
    }

    // Bullet points
    if (trimmed.startsWith('•')) {
      return (
        <li key={index} className="text-sm text-gray-800 ml-4 mb-1 leading-relaxed">
          {trimmed.substring(1).trim()}
        </li>
      );
    }

    // Lines with pipes (project headers, education)
    if (trimmed.includes('|')) {
      return (
        <p key={index} className="text-sm font-semibold text-gray-900 mb-1">
          {trimmed}
        </p>
      );
    }

    // Regular text
    return (
      <p key={index} className="text-sm text-gray-800 mb-1 leading-relaxed">
        {trimmed}
      </p>
    );
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Calibri:wght@400;700&display=swap');

        .font-sans {
          font-family: 'Calibri', Arial, sans-serif;
        }
      `}</style>
      <div className="max-w-4xl mx-auto">{lines.map(renderLine)}</div>
    </div>
  );
}
