import { UserProfile, JobPosting } from '@/types';

/**
 * CRITICAL: This is the core prompt for CV generation
 * OPTIMIZED FOR JOBSCAN.CO - Target Score: 90+
 * Focus: Maximum keyword density, exact matching, strategic placement
 */
export function generateCVPrompt(profile: UserProfile, job: JobPosting): string {
  // Extract keywords for strategic placement
  const keywords = extractAdvancedKeywords(job.description);
  const hardSkills = keywords.hardSkills.join(', ');
  const softSkills = keywords.softSkills.join(', ');
  const tools = keywords.tools.join(', ');

  return `You are an expert ATS CV writer with deep knowledge of jobscan.co scoring algorithms. Your goal is to create a CV that scores 90+ on jobscan.co while remaining honest and professional.

## JOBSCAN.CO OPTIMIZATION REQUIREMENTS (CRITICAL):

**SCORE TARGET: 90+ on jobscan.co**

This requires:
1. **95%+ keyword match** from job description
2. **Exact phrase matching** (not synonyms)
3. **Strategic keyword repetition** (2-4 times per important keyword)
4. **Multiple section placement** (keywords in summary + skills + experience)
5. **Both acronyms AND full forms** (e.g., "CI/CD (Continuous Integration/Continuous Deployment)")
6. **Hard skills + Soft skills** explicitly mentioned
7. **ATS-friendly formatting** (plain text, standard headers)

## EXTRACTED KEYWORDS FROM JOB DESCRIPTION:

**Hard Skills/Technologies:** ${hardSkills}
**Soft Skills:** ${softSkills}
**Tools/Frameworks:** ${tools}

**CRITICAL:** You MUST use these EXACT terms throughout the CV, exactly as they appear in the job description. Do not use synonyms or variations.

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

## YOUR TASK - JOBSCAN.CO OPTIMIZATION STRATEGY:

**KEYWORD PLACEMENT STRATEGY (CRITICAL FOR 90+ SCORE):**

1. **PROFESSIONAL SUMMARY (Must include):**
   - Job title from posting (exact match)
   - Top 5-7 hard skills from job description
   - 2-3 soft skills from job description
   - Key metrics/achievements
   - EXAMPLE: "Java Software Engineer with expertise in Spring Boot, PostgreSQL, and Gradle. Experienced in agile development and cross-functional team collaboration..."

2. **CORE COMPETENCIES/TECHNICAL PROFICIENCIES SECTION (NEW - CRITICAL):**
   - Create a dedicated section immediately after summary
   - List ALL matching hard skills as bullet points or comma-separated
   - Include BOTH acronym and full form (SQL - Structured Query Language, CI/CD - Continuous Integration/Continuous Deployment)
   - Group by category if needed (Programming, Databases, Tools, Methodologies)
   - This section is SCANNED HEAVILY by ATS - include every matching keyword

3. **KEYWORD DENSITY REQUIREMENTS:**
   - Each critical keyword must appear 2-4 times across different sections
   - First mention: Professional Summary
   - Second mention: Core Competencies/Technical Skills
   - Third mention: In project/experience descriptions
   - Fourth mention: In context within bullets

4. **HARD SKILLS INTEGRATION (12 issues to fix):**
   - Use EXACT terminology from job description
   - If job says "PostgreSQL" - use "PostgreSQL" (not "Postgres")
   - If job says "Git" - use "Git" (not "version control")
   - If job says "Gradle" - use "Gradle" (not "build tools")
   - Include version numbers if mentioned ("Java 11+", "PostgreSQL 14")
   - Repeat in: Summary, Skills section, AND project descriptions
   - Never use synonyms - only exact matches

5. **SOFT SKILLS INTEGRATION (2 issues to fix):**
   - Common soft skills to include: ${softSkills || 'agile, collaboration, team-oriented, problem-solving, communication, analytical'}
   - Integrate naturally: "Led agile team of 5", "Collaborated with cross-functional teams"
   - Mention in summary AND experience bullets
   - Use exact phrases from job posting

6. **SEARCHABILITY OPTIMIZATION (3 issues to fix):**
   - Use standard ATS headings: PROFESSIONAL SUMMARY, CORE COMPETENCIES, TECHNICAL SKILLS, PROFESSIONAL EXPERIENCE, EDUCATION
   - Include job title variations (Java Engineer, Java Developer, Software Engineer)
   - Add acronyms with full forms: "REST API (Representational State Transfer)"
   - Use industry-standard terms alongside company-specific ones

7. **FORMATTING FOR ATS (1 issue to fix):**
   - Plain text only, no tables or columns
   - Use simple bullets (• or -)
   - No headers/footers
   - No text boxes or graphics
   - Standard fonts implied (Arial, Calibri, Times New Roman)
   - Clear section separators

8. **RECRUITER TIPS (2 issues to fix):**
   - Quantify EVERYTHING (numbers, percentages, scale)
   - Use power verbs: Architected, Engineered, Optimized, Built, Deployed, Implemented, Designed, Led
   - Show progression and impact
   - Include relevant certifications or training
   - Keep consistent formatting

9. **HONESTY WHILE MAXIMIZING SCORE:**
   - Never fabricate skills you don't have
   - But USE EVERY SKILL YOU DO HAVE from the job description
   - Frame bootcamp as "intensive professional training" or "professional development program"
   - Connect previous career systematically: "Engineering background provides systematic problem-solving approach"

10. **CRITICAL RULES:**
    - NEVER skip a keyword from job description if candidate has that skill
    - ALWAYS use exact phrasing from job posting
    - REPEAT important keywords across multiple sections
    - Include soft skills explicitly (not just implied)

---

## OUTPUT FORMAT (OPTIMIZED FOR JOBSCAN.CO 90+ SCORE):

Generate a complete, ready-to-use CV in plain text format. Use this EXACT structure:

\`\`\`
[FULL NAME]
[Email] | [Phone] | [Location]

PROFESSIONAL SUMMARY
[3-4 lines with: job title match + top 5-7 hard skills + 2-3 soft skills + key metrics]
EXAMPLE: "Java Software Engineer with 6 months intensive professional development and 14 years engineering background. Expertise in Java, Spring Boot, PostgreSQL, Git, and Gradle. Proven experience in agile development, cross-functional collaboration, and system integration. Delivered production systems serving 500+ concurrent users with <2s response times and 85% test coverage using JUnit and Mockito."

CORE COMPETENCIES
[List ALL matching keywords from job description, grouped by category]

Programming Languages & Frameworks:
Java | Spring Boot | React.js | Angular | TypeScript

Databases & Data Management:
PostgreSQL | MySQL | DB2 | Database Design | Query Optimization

Development Tools & Practices:
Git | Gradle | Docker | CI/CD (Continuous Integration/Continuous Deployment) | Agile Methodologies | Scrum

Testing & Quality:
Unit Testing | Integration Testing | System Testing | JUnit | Mockito | Test Coverage

Additional Skills:
REST API (Representational State Transfer) | Microservices Architecture | Performance Optimization | Code Review | Technical Documentation

[Include acronyms with full forms, use EXACT terms from job description]

PROFESSIONAL EXPERIENCE / KEY PROJECTS

[Project 1 - Most relevant to job] | [Start - End Date]
[Title matching job description] | Java, Spring Boot, PostgreSQL, Docker, Git
• [Action verb] [task] using [keyword from job] resulting in [metric] - mention agile/collaboration if relevant
• [Action verb] [task] with [keyword from job] achieving [metric] - integrate technical skills naturally
• [Action verb] [task] leveraging [keyword from job] to [result with number]
• Collaborated with cross-functional teams using agile methodologies to deliver production-ready solutions
[CRITICAL: Each bullet should include 1-2 keywords from job description + quantified result + soft skill if applicable]

[Project 2]
[Continue same pattern - integrate different keywords from job description]

[Project 3]
[Continue pattern]

EDUCATION
[Degree] | [Institution] | [Location] | [Year]
[Degree] | [Institution] | [Location] | [Year]

[Optional: PROFESSIONAL DEVELOPMENT]
[Bootcamp/Training] | [Organization] | [Dates] | [Hours/Intensity]

[Optional: CERTIFICATIONS - if relevant to job]
\`\`\`

**CRITICAL FORMATTING RULES:**
- Use standard section headers in ALL CAPS
- Use pipe symbols (|) to separate information clearly
- Use bullet points (•) for achievements
- Keep line spacing consistent
- NO tables, NO columns, NO graphics
- Each section clearly separated by blank line

---

## FINAL CHECKLIST - JOBSCAN.CO 90+ SCORE:

**BEFORE SUBMITTING, VERIFY:**

SEARCHABILITY (Target: 0 issues):
✓ All job description keywords present EXACTLY as written
✓ Acronyms included with full forms (CI/CD, REST API, etc.)
✓ Standard ATS section headers used
✓ Job title variations included

HARD SKILLS (Target: 0 issues):
✓ Every technical skill from job description included if candidate has it
✓ Skills repeated 2-4 times across sections (summary + core competencies + experience)
✓ EXACT terminology used (no synonyms)
✓ Technical skills in CORE COMPETENCIES section
✓ Skills integrated in project descriptions with context

SOFT SKILLS (Target: 0 issues):
✓ Soft skills from job description explicitly mentioned (agile, collaboration, analytical, problem-solving)
✓ Soft skills in professional summary
✓ Soft skills demonstrated in experience bullets

RECRUITER TIPS (Target: 0 issues):
✓ Every bullet point quantified with numbers/metrics
✓ Strong action verbs used (Architected, Engineered, Optimized, Built, Deployed)
✓ Production impact emphasized
✓ Consistent formatting throughout

FORMATTING (Target: 0 issues):
✓ Plain text, single column only
✓ No tables, graphics, or complex formatting
✓ Standard bullets and clear sections
✓ Professional appearance

KEYWORD DENSITY:
✓ Top 10 keywords from job appear 2-4 times each
✓ Keywords in: Summary + Core Competencies + Experience descriptions
✓ Natural integration (not keyword stuffing)

HONESTY:
✓ No fabricated skills or experience
✓ Accurate representation of experience level
✓ All claims backed by actual projects/achievements

**NOW: Generate the complete CV following ALL requirements above. This CV must score 90+ on jobscan.co while being honest and compelling.**`;
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
 * ADVANCED keyword extraction optimized for jobscan.co
 * Extracts: hard skills, soft skills, tools, multi-word phrases
 */
export function extractAdvancedKeywords(jobDescription: string): {
  hardSkills: string[];
  softSkills: string[];
  tools: string[];
  allKeywords: string[];
} {
  const text = jobDescription;

  // Common technical hard skills patterns
  const hardSkillPatterns = [
    // Programming languages
    /\b(Java|JavaScript|TypeScript|Python|C\+\+|C#|Ruby|Go|Rust|Scala|Kotlin)\b/gi,
    // Frameworks
    /\b(Spring Boot|Spring|React\.?js|Angular|Vue\.?js|Node\.?js|Django|Flask|Express)\b/gi,
    // Databases
    /\b(PostgreSQL|MySQL|MongoDB|Redis|Oracle|SQL Server|DB2|Cassandra|DynamoDB)\b/gi,
    // Cloud & DevOps
    /\b(AWS|Azure|GCP|Google Cloud|Docker|Kubernetes|Jenkins|GitLab|CI\/CD|Terraform)\b/gi,
    // Tools
    /\b(Git|Gradle|Maven|npm|Webpack|Jira|Confluence)\b/gi,
    // Testing
    /\b(JUnit|Mockito|Jest|Mocha|Selenium|Cypress|Unit Testing|Integration Testing|System Testing)\b/gi,
    // Architecture
    /\b(Microservices|REST\s?API|GraphQL|SOAP|Event-Driven|Serverless)\b/gi,
    // Methodologies
    /\b(Agile|Scrum|Kanban|TDD|BDD|DevOps)\b/gi,
  ];

  // Soft skills patterns
  const softSkillPatterns = [
    /\b(agile|scrum|collaboration|collaborative|team\s?player|team\s?oriented|team\s?work)\b/gi,
    /\b(communication|analytical|problem[\s-]solving|critical thinking)\b/gi,
    /\b(leadership|mentoring|cross[\s-]functional)\b/gi,
    /\b(attention to detail|quality[\s-]focused|quality[\s-]oriented)\b/gi,
  ];

  const hardSkills: Set<string> = new Set();
  const softSkills: Set<string> = new Set();

  // Extract hard skills
  hardSkillPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => hardSkills.add(match));
    }
  });

  // Extract soft skills
  softSkillPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => softSkills.add(match.toLowerCase()));
    }
  });

  // Extract additional context keywords
  const contextKeywords = extractContextKeywords(text);

  return {
    hardSkills: Array.from(hardSkills),
    softSkills: Array.from(new Set([...softSkills, ...['agile', 'collaboration', 'team-oriented', 'analytical', 'problem-solving']])).slice(0, 10),
    tools: Array.from(hardSkills).filter(skill =>
      /git|gradle|maven|docker|jenkins|jira/i.test(skill)
    ),
    allKeywords: [...Array.from(hardSkills), ...Array.from(softSkills), ...contextKeywords],
  };
}

/**
 * Extract contextual keywords (nouns, important terms)
 */
function extractContextKeywords(text: string): string[] {
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
    'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have',
    'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may',
    'might', 'must', 'can', 'this', 'that', 'these', 'those', 'we', 'you', 'they',
    'it', 'about', 'who', 'which', 'when', 'where', 'why', 'how', 'all', 'each',
    'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'than', 'too',
    'very', 'own', 'same', 'so', 'then', 'there', 'here', 'now', 'just', 'also',
  ]);

  // Important technical terms that might not match patterns
  const importantTerms = [
    'performance', 'scalability', 'optimization', 'architecture', 'design',
    'development', 'implementation', 'deployment', 'production', 'testing',
    'documentation', 'code review', 'refactoring', 'debugging', 'monitoring',
  ];

  const words = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(word =>
      word.length > 3 &&
      !commonWords.has(word) &&
      (importantTerms.includes(word) || /^[a-z]+$/i.test(word))
    );

  // Count frequency
  const frequency: { [key: string]: number } = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Return top 20 by frequency
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);
}

/**
 * Legacy function - kept for compatibility
 */
export function extractJobKeywords(jobDescription: string): string[] {
  const keywords = extractAdvancedKeywords(jobDescription);
  return keywords.allKeywords;
}
