import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

/**
 * Parse plain text CV into structured sections
 */
export function parseCVSections(cvText: string) {
  const sections: { [key: string]: string } = {};
  const lines = cvText.split('\n');
  let currentSection = '';
  let currentContent: string[] = [];

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Detect section headers (ALL CAPS lines)
    if (trimmed && trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.includes('|')) {
      // Save previous section
      if (currentSection) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      // Start new section
      currentSection = trimmed;
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  });

  // Save last section
  if (currentSection) {
    sections[currentSection] = currentContent.join('\n').trim();
  }

  return sections;
}

/**
 * Export CV to PDF with ATS-friendly formatting
 */
export function exportToPDF(cvText: string, fileName: string = 'CV.pdf') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const maxWidth = pageWidth - (margin * 2);

  let yPosition = margin;
  const lineHeight = 5;
  const sectionSpacing = 8;

  const lines = cvText.split('\n');

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }

    if (!trimmed) {
      yPosition += lineHeight / 2;
      return;
    }

    // Detect section headers (ALL CAPS)
    const isSectionHeader = trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.includes('|');

    if (isSectionHeader) {
      // Section header: Bold, 12pt
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      yPosition += sectionSpacing;
      doc.text(trimmed, margin, yPosition);
      yPosition += lineHeight + 2;
    } else if (trimmed.startsWith('•')) {
      // Bullet point: Normal, 10pt
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const bulletText = trimmed.substring(1).trim();
      const splitText = doc.splitTextToSize(`• ${bulletText}`, maxWidth);
      doc.text(splitText, margin, yPosition);
      yPosition += splitText.length * lineHeight;
    } else if (index === 0) {
      // Name (first line): Bold, 14pt
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(trimmed, margin, yPosition);
      yPosition += lineHeight + 2;
    } else if (trimmed.includes('|')) {
      // Lines with pipes: Normal, 10pt, slightly larger spacing
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(trimmed, margin, yPosition);
      yPosition += lineHeight + 1;
    } else {
      // Regular text: Normal, 10pt
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const splitText = doc.splitTextToSize(trimmed, maxWidth);
      doc.text(splitText, margin, yPosition);
      yPosition += splitText.length * lineHeight;
    }
  });

  doc.save(fileName);
}

/**
 * Export CV to DOCX with proper formatting
 */
export async function exportToDOCX(cvText: string, fileName: string = 'CV.docx') {
  const lines = cvText.split('\n');
  const paragraphs: Paragraph[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      // Empty line
      paragraphs.push(new Paragraph({ text: '' }));
      return;
    }

    // Detect section headers
    const isSectionHeader = trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.includes('|');

    if (isSectionHeader) {
      // Section Header: Bold, 12pt, spacing before
      paragraphs.push(
        new Paragraph({
          text: trimmed,
          heading: HeadingLevel.HEADING_2,
          spacing: {
            before: 200,
            after: 100,
          },
        })
      );
    } else if (index === 0) {
      // Name: Bold, 14pt
      paragraphs.push(
        new Paragraph({
          text: trimmed,
          heading: HeadingLevel.HEADING_1,
          spacing: {
            after: 100,
          },
        })
      );
    } else if (trimmed.startsWith('•')) {
      // Bullet point
      const bulletText = trimmed.substring(1).trim();
      paragraphs.push(
        new Paragraph({
          text: bulletText,
          bullet: {
            level: 0,
          },
          spacing: {
            after: 50,
          },
        })
      );
    } else {
      // Regular text
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed,
              font: 'Calibri',
              size: 22, // 11pt (size is in half-points)
            }),
          ],
          spacing: {
            after: 100,
          },
        })
      );
    }
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, fileName);
}

/**
 * Generate file name from company name
 */
export function generateFileName(companyName: string, extension: 'pdf' | 'docx'): string {
  const cleanCompany = companyName
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return `Hamed-Akhgari-CV-${cleanCompany}.${extension}`;
}
