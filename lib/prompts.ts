import { UserProfile, JobPosting } from '@/types';

/**
 * CRITICAL: This is the core prompt for CV generation
 * Optimized for ATS systems and hiring managers
 */
export function generateCVPrompt(profile: UserProfile, job: JobPosting): string {
  return `You are an expert CV writer specializing in ATS-optimized resumes for software engineers. Your task is to create a highly targeted, professional CV that will pass Applicant Tracking Systems (ATS) and impress hiring managers.

## CANDIDATE PROFILE:

**Personal Information:**
- Name: ${profile.fullName}
- Email: ${profile.email}
- Phone: ${profile.phone || 'N/A'}
- Location: ${profile.location || 'N/A'}

**Professional Background:**
- Title: ${profile.professionalTitle || 'Software Engineer'}
- Professional Development: ${profile.yearsOfExperience || 0} months${profile.bootcampInfo ? ` (${profile.bootcampInfo})` : ''}
- Previous Career: ${profile.backgroundYears ? `${profile.backgroundYears} years in ${profile.backgroundField}` : 'N/A'}

**Education:**
${profile.education ? JSON.stringify(profile.education, null, 2) : 'Not provided'}

**Technical Skills:**
${profile.technicalSkills ? JSON.stringify(profile.technicalSkills, null, 2) : 'Not provided'}

**Projects:**
${profile.projects ? JSON.stringify(profile.projects, null, 2) : 'Not provided'}

**Achievements:**
${profile.achievements ? JSON.stringify(profile.achievements, null, 2) : 'Not provided'}

**Work Experience:**
${profile.workExperience ? JSON.stringify(profile.workExperience, null, 2) : 'Not provided'}

---

## TARGET JOB:

**Position:** ${job.title}
**Company:** ${job.company}

**Job Description:**
${job.description}

---

## YOUR TASK - CRITICAL REQUIREMENTS:

1. **ATS OPTIMIZATION (HIGHEST PRIORITY):**
   - Use ONLY plain text, single column format
   - NO tables, graphics, images, or complex formatting
   - Extract ALL relevant keywords from the job description
   - Place keywords naturally throughout the CV
   - Match technical terms EXACTLY as they appear in job posting
   - Use standard section headings: "PROFESSIONAL SUMMARY", "TECHNICAL SKILLS", "PROFESSIONAL EXPERIENCE", "PROJECTS", "EDUCATION"

2. **KEYWORD MATCHING:**
   - Identify top 15-20 keywords from job description
   - Integrate them naturally in summary, skills, and experience sections
   - Prioritize technical skills, tools, and methodologies mentioned in job posting
   - Use exact terminology (e.g., if job says "Spring Boot", use "Spring Boot", not "Spring Framework")

3. **HONESTY & ACCURACY:**
   - NEVER exaggerate or fabricate experience
   - Clearly distinguish between "professional development experience" and "previous career"
   - Present bootcamp/training as intensive professional development
   - Frame limited experience as "rapid learning trajectory" and "proven capability"
   - Use phrases like "6 months intensive professional development" rather than implying years of experience

4. **QUANTIFIED ACHIEVEMENTS:**
   - EVERY bullet point should include metrics when possible
   - Use format: [Action Verb] + [What] + [Result with metric]
   - Examples: "Optimized API response time by 94% (5.2s → 281ms)"
   - Highlight production deployments, user counts, performance improvements

5. **ACTION VERBS:**
   - Start each bullet with strong verbs: Architected, Engineered, Optimized, Built, Deployed, Implemented, Designed, Led, Reduced, Improved, Developed
   - Avoid weak verbs: Worked on, Helped with, Responsible for

6. **PROFESSIONAL SUMMARY (3-4 lines):**
   - Lead with strongest qualification matching the job
   - Mention bootcamp as "intensive professional development" if relevant
   - Highlight top 2-3 relevant achievements with metrics
   - Include key technologies from job description
   - Example tone: "Backend Engineer with 6 months intensive professional development and 14 years engineering background. Proven track record in production systems serving 500+ concurrent users with <2s response times. Specialized in Java, Spring Boot, and microservices architecture. Achieved 94% latency improvement through asynchronous design patterns."

7. **TECHNICAL SKILLS SECTION:**
   - Group by proficiency level (Expert, Proficient, Learning)
   - List job-required skills FIRST in each category
   - Use comma-separated format for ATS readability
   - Include versions/specifics where mentioned in job (e.g., "Java 11+", "PostgreSQL 14")

8. **EXPERIENCE/PROJECTS FORMATTING:**
   - For each entry: [Title/Project Name] | [Technologies] | [Dates/Duration]
   - 3-5 bullet points per entry
   - Focus on projects most relevant to this specific job
   - Emphasize production deployments and real-world impact
   - Include scale metrics (users, requests, data volume, uptime)

9. **PREVIOUS CAREER CONNECTION:**
   - Frame previous career as asset (systematic thinking, reliability, precision)
   - One-line mention maximum, focus on transferable skills
   - Example: "14 years civil engineering background brings systematic approach and reliability focus to software development"

10. **LENGTH & STRUCTURE:**
    - Target 1 page for <5 years total experience
    - Maximum 2 pages if extensive relevant projects
    - Prioritize relevance over completeness
    - Most relevant information in top 50% of first page

---

## OUTPUT FORMAT:

Generate a complete, ready-to-use CV in plain text format. Use this EXACT structure:

\`\`\`
[FULL NAME]
[Email] | [Phone] | [Location]

PROFESSIONAL SUMMARY
[3-4 compelling lines highlighting most relevant qualifications for THIS job]

TECHNICAL SKILLS
Expert: [Skills matching job requirements first, then others]
Proficient: [Skills matching job requirements first, then others]
Learning: [Skills showing growth potential]

PROFESSIONAL EXPERIENCE / KEY PROJECTS
[Most relevant project/experience for this job]
[Title/Project Name] | [Key Technologies] | [Timeline]
• [Quantified achievement with action verb]
• [Quantified achievement with action verb]
• [Quantified achievement with action verb]

[Second most relevant project]
[Continue pattern...]

EDUCATION
[Degree] | [Institution] | [Year]
[Degree] | [Institution] | [Year]

[Optional: CERTIFICATIONS or ADDITIONAL INFORMATION if highly relevant]
\`\`\`

---

## FINAL CHECKLIST - VERIFY BEFORE SUBMITTING:

✓ All keywords from job description included naturally
✓ No exaggerations or false claims
✓ Every achievement quantified with metrics
✓ All bullet points start with strong action verbs
✓ Plain text, single column, ATS-friendly format
✓ Most relevant information in top half of first page
✓ Technical skills match job requirements
✓ Production/deployed projects emphasized
✓ Professional, confident tone without being apologetic about experience level

NOW: Generate the complete CV following ALL requirements above. Make it compelling, honest, and optimized to pass ATS and impress the hiring manager for THIS specific job.`;
}

/**
 * Prompt for generating tailored cover letters
 */
export function generateCoverLetterPrompt(profile: UserProfile, job: JobPosting): string {
  return `You are an expert cover letter writer for software engineering positions. Create a compelling, personalized cover letter that demonstrates genuine interest and strong fit.

## CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

## TARGET JOB:
Position: ${job.title}
Company: ${job.company}
Description: ${job.description}

## YOUR TASK:

Create a professional cover letter (250-350 words) following this structure:

**Opening Paragraph:**
- Express genuine enthusiasm for the specific role and company
- Mention 1-2 specific aspects of the job/company that attracted you
- Brief introduction of your background

**Body Paragraph 1 - Relevant Experience:**
- Highlight 2-3 most relevant achievements/projects for THIS job
- Use specific metrics and results
- Connect your experience to their requirements
- Be honest about experience level but frame positively

**Body Paragraph 2 - Value Proposition:**
- Explain why you're a strong fit for their specific needs
- Mention specific technologies/skills from job description
- Highlight rapid learning ability and growth trajectory
- If applicable, connect previous career experience to software development (systematic thinking, reliability, etc.)

**Closing Paragraph:**
- Express enthusiasm for contributing to their team
- Mention availability for interview
- Professional sign-off

## CRITICAL REQUIREMENTS:

1. **Personalization:** Reference specific technologies, projects, or challenges mentioned in job description
2. **Authenticity:** Sound genuine, not generic or templated
3. **Confidence:** Professional and confident tone, not apologetic about experience level
4. **Metrics:** Include 2-3 quantified achievements
5. **Conciseness:** 250-350 words maximum
6. **Action-oriented:** Focus on what you can contribute, not just what you want to learn
7. **Company research:** If company name is recognizable, mention something specific about their work/culture

## TONE:
- Professional but warm
- Confident without being arrogant
- Enthusiastic without being desperate
- Specific without being verbose

## OUTPUT FORMAT:

\`\`\`
Dear Hiring Manager,

[Opening paragraph]

[Body paragraph 1]

[Body paragraph 2]

[Closing paragraph]

Sincerely,
${profile.fullName}
\`\`\`

NOW: Generate the complete cover letter following ALL requirements above.`;
}

/**
 * Extract keywords from job description for optimization
 */
export function extractJobKeywords(jobDescription: string): string[] {
  // This is a simplified version - in production, you'd use NLP
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'we', 'you', 'they', 'it']);

  const words = jobDescription
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word));

  // Count frequency
  const frequency: { [key: string]: number } = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([word]) => word);
}
