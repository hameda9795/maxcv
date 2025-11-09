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

  // Detect job level and special requirements
  const jobLevel = detectJobLevel(job.description);
  const specialRequirements = extractSpecialRequirements(job.description);

  return `You are an expert ATS CV writer with deep knowledge of jobscan.co scoring algorithms. Your goal is to create a CV that scores 90+ on jobscan.co while remaining honest and professional.

## JOB ANALYSIS (CRITICAL - READ FIRST):

**Job Level Detected:** ${jobLevel}
**Special Requirements:** ${specialRequirements}
**Company/Industry:** ${job.company} - ${extractIndustry(job.description)}

${jobLevel === 'junior' ? `
**JUNIOR ROLE - CRITICAL TONE ADJUSTMENTS:**
- Use "Junior", "Learning", "Eager to", "Interest in" language
- Emphasize willingness to learn and adapt
- Show awareness of what you're still learning
- If job mentions specific onboarding path (IT Support → QA → Dev), EXPLICITLY address it
- Focus on potential and growth trajectory, not just achievements
` : ''}

${specialRequirements ? `
**SPECIAL REQUIREMENTS DETECTED:**
${specialRequirements}
**YOU MUST address these explicitly in a ROLE ALIGNMENT section**
` : ''}

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

5. **SOFT SKILLS INTEGRATION (CRITICAL - 3 issues to fix):**
   - Soft skills to explicitly mention: ${softSkills || 'agile, collaboration, team-oriented, problem-solving, communication, analytical, passionate'}
   - MUST include: "passionate" (if job mentions it), "analytical skills", "working closely"
   - Integration examples:
     * "Passionate about writing clean, maintainable code"
     * "Strong analytical skills applied to complex problem-solving"
     * "Working closely with cross-functional teams including business analysts, developers, and testers"
   - Mention in summary AND multiple experience bullets
   - Use exact phrases from job posting

6. **COMPANY/PRODUCT-SPECIFIC KEYWORDS (CRITICAL FOR CONTEXT):**
   - If job mentions specific products/platforms, reference them if relevant:
     * Company products (e.g., "Plexus", "Workflow", "Datamart", "Output")
     * Domain-specific terms (e.g., "back-office", "workflow editor", "data warehouse", "reports")
   - Integration: "Experience with workflow systems and back-office solutions"
   - Only mention if you have relevant transferable experience
   - Shows you read the job description carefully

7. **CRITICAL MISSING KEYWORDS (MUST INCLUDE IF APPLICABLE):**
   - **SQL** - Mention both "SQL" AND specific databases ("PostgreSQL", "MySQL", "DB2")
   - **Agile ceremonies** - "Sprint planning", "Daily stand-ups", "Retrospectives"
   - **Quality practices** - "Quality guidelines", "Security guidelines", "Engineering practices"
   - **Team composition** - "Business analysts", "Developers", "Testers", "Distributed team"
   - **Technical practices** - "Technical documentation", "Bug resolution", "Code review"
   - **Key attributes** - "Scalability", "Maintainability", "Performance", "Security"
   - **Language proficiency** - "English proficient" or "Proficient in English"

8. **SEARCHABILITY OPTIMIZATION (2 issues to fix):**
   - Use standard ATS headings: PROFESSIONAL SUMMARY, CORE COMPETENCIES, PROFESSIONAL EXPERIENCE, EDUCATION
   - Include job title variations (Java Engineer, Java Developer, Software Engineer)
   - Add acronyms with full forms: "REST API (Representational State Transfer)", "SQL (Structured Query Language)"
   - Use industry-standard terms alongside company-specific ones
   - NO URLs or links (LinkedIn, GitHub) - these hurt ATS parsing

9. **FORMATTING FOR ATS (1 issue to fix):**
   - Plain text only, no tables or columns
   - Use simple bullets (• or -)
   - No headers/footers
   - No text boxes or graphics
   - No hyperlinks or URLs
   - Standard fonts implied (Arial, Calibri, Times New Roman)
   - Clear section separators
   - Consistent spacing

10. **RECRUITER TIPS (CRITICAL - Jobscan requirement):**
    - **WORD COUNT:** Target 1000+ words total (not 400-500)
    - **MEASURABLE RESULTS:** Include 5-7 quantified achievements PER project (minimum 15 total)
    - **Quantify EVERYTHING:** Every bullet point MUST have numbers, percentages, time saved, scale, impact
    - Examples: "Reduced latency by 94% (5.2s → 281ms)", "Served 500+ concurrent users", "85% test coverage", "12+ APIs", "<2s response time"
    - **Power verbs:** Architected, Engineered, Optimized, Built, Deployed, Implemented, Designed, Led, Developed, Maintained, Delivered, Achieved
    - **NO negative phrases or clichés:** Avoid "responsible for", "helped with", "worked on", "tried to", "attempted"
    - Use POSITIVE, ACTIVE language: "Developed", "Built", "Achieved" (not "was responsible for developing")
    - **Show progression and impact** with concrete numbers
    - Include PROFESSIONAL DEVELOPMENT section for bootcamp/training
    - Demonstrate continuous improvement and learning

11. **HONESTY WHILE MAXIMIZING SCORE:**
    - Never fabricate skills you don't have
    - But USE EVERY SKILL YOU DO HAVE from the job description
    - Frame bootcamp as "intensive professional training" or "professional development program"
    - Connect previous career systematically: "Engineering background provides systematic problem-solving approach"

12. **CRITICAL RULES FOR 90+ SCORE:**
    - NEVER skip a keyword from job description if candidate has that skill
    - ALWAYS use exact phrasing from job posting (not synonyms)
    - REPEAT important keywords 2-4 times across different sections
    - Include soft skills EXPLICITLY with exact phrases (not just implied)
    - Mention SQL separately even if you list specific databases
    - Include agile ceremony terms (sprint planning, stand-ups, retrospectives)
    - Reference quality, security, maintainability, scalability explicitly
    - NO URLs or contact links beyond email/phone

---

## OUTPUT FORMAT (OPTIMIZED FOR JOBSCAN.CO 90+ SCORE):

Generate a complete, ready-to-use CV in plain text format. Use this EXACT structure:

\`\`\`
[FULL NAME]
[Email] | [Phone] | [Location]

PROFESSIONAL SUMMARY
[3-4 lines tailored to job level and requirements]

${jobLevel === 'junior' ? `
JUNIOR ROLE EXAMPLE: "[Job Title] focused on [specific domain from job]. [X months/years] professional development ([training details]) plus [Y years] prior [field] experience that sharpened [transferable skills]. Delivered [X] production apps with [key metrics]. Strong interest in [specific technologies mentioned in job]; ${specialRequirements?.includes('IT Support') ? 'open to onboarding path that starts with IT Support and QA to master the platform before transitioning fully into development role.' : 'eager to deepen knowledge in [learning areas].'}"
` : `
MID/SENIOR ROLE EXAMPLE: "Java Software Engineer with [X] years experience in [specific domain]. Expertise in Java, Spring Boot, SQL databases (PostgreSQL, DB2, MySQL), Git, and Gradle. Passionate about writing scalable, maintainable code with strong analytical skills. Proven experience in agile development, sprint planning, and cross-functional team collaboration with business analysts, developers, and testers. Delivered production systems serving 500+ concurrent users with <2s response times and 85% test coverage."
`}

[CRITICAL:
- For JUNIOR roles: emphasize learning, interest, willingness, transitioning, growth potential
- For SENIOR roles: emphasize expertise, leadership, achievements, scale
- Always mention specific domain/industry if clear from job description
- If special onboarding path mentioned, acknowledge it explicitly]

CORE COMPETENCIES
[List ALL matching keywords from job description, grouped by category. CRITICAL: Include SQL separately + specific databases]

Programming Languages & Frameworks:
Java | Spring Boot | React.js | Angular | TypeScript

Databases & Data Management:
SQL (Structured Query Language) | PostgreSQL | MySQL | DB2 | Database Design | Query Optimization

Development Tools & Practices:
Git | Gradle | Docker | CI/CD (Continuous Integration/Continuous Deployment) | Agile Methodologies | Scrum | Sprint Planning | Daily Stand-ups | Retrospectives

Testing & Quality:
Unit Testing | Integration Testing | System Testing | JUnit | Mockito | Test Coverage | Quality Guidelines | Security Guidelines

Architecture & Performance:
REST API (Representational State Transfer) | Microservices Architecture | Performance | Scalability | Maintainability

Engineering Practices:
Code Review | Technical Documentation | Bug Resolution | Engineering Practices | Debugging

${jobLevel === 'junior' || specialRequirements ? `
Learning & Development:
[List technologies mentioned in job that you're learning or interested in]
e.g., "Apache Kafka (learning)" | "IoT/Streaming (learning)" | "Event-Driven Architecture (deepening knowledge)"
` : ''}

[CRITICAL:
- Use EXACT terms from job description, include both acronyms and full forms
- For junior roles or when job emphasizes learning, add "Learning & Development" section
- Show what you're currently learning that's relevant to the role
- Use phrases like "(learning)", "(deepening knowledge)", "(eager to learn)"]

PROFESSIONAL EXPERIENCE

[Project 1 - Most relevant to job] | [Start - End Date]
[Title matching job description] | Java, Spring Boot, SQL, PostgreSQL, Docker, Git, Gradle
• Developed and maintained [feature] using Java, Spring Boot, and SQL databases (PostgreSQL, DB2), achieving [metric]% performance improvement and serving [X]+ users with <[X]s response times
• Architected scalable backend infrastructure with focus on performance, scalability, and maintainability, reducing system latency by [X]% ([Xs] → [Xs])
• Participated in agile ceremonies including sprint planning, daily stand-ups, and retrospectives, improving team delivery efficiency by [X]% and achieving [X]% sprint completion rate
• Collaborated closely with cross-functional teams (business analysts, developers, testers) across distributed locations, delivering [X]+ production-ready features following quality and security guidelines
• Implemented comprehensive testing strategy with unit testing, integration testing, and system testing using JUnit and Mockito, achieving [X]% test coverage and reducing bugs by [X]%
• Created and maintained technical documentation for [X]+ features, ensuring knowledge transfer and adherence to engineering practices, reducing onboarding time by [X]%
• Debugged and resolved [X]+ critical bugs within [X] hours average resolution time, demonstrating strong analytical skills and commitment to code quality
[CRITICAL:
 - MINIMUM 5-7 bullets per project
 - EVERY bullet must have quantified metric
 - Include hard skills + soft skills + numbers
 - NO negative phrases ("responsible for", "helped with")
 - Use strong action verbs
 - Each bullet should be detailed and specific]

[Project 2 - Second most relevant] | [Start - End Date]
[Title] | [Technologies]
• [Action verb] [detailed task] using [specific technologies], resulting in [quantified improvement]: [metric]% increase in [performance/efficiency/quality]
• [Action verb] [architecture/design work] achieving [scale metric]: [X]+ [users/requests/transactions] with [performance metric]
• Implemented [specific feature] with [technologies], improving [metric] by [X]% and reducing [metric] by [X]%
• Collaborated with [team composition] to deliver [X]+ features, participating in [agile ceremonies] and achieving [metric]% delivery success
• Optimized [specific component] using [tools/practices], resulting in [X]% performance gain and [cost/time] savings of [metric]
[Continue with 5-7 quantified bullets]

[Project 3 - Third project if applicable] | [Start - End Date]
[Title] | [Technologies]
• [Developed/Built/Architected] [feature] with [technologies], serving [X]+ users and processing [X]+ [transactions/requests] daily
• [Implemented/Deployed] [specific solution] achieving [metric]% improvement in [performance/quality/efficiency]
• [Optimized/Enhanced] [component] reducing [metric] by [X]% and improving [metric] by [X]%
• Collaborated in [agile/scrum] environment, participating in [ceremonies] and delivering [X]+ features with [X]% quality
• Maintained [X]% test coverage through comprehensive testing with [tools], identifying and resolving [X]+ issues
[Continue pattern with 5-7 quantified bullets]

[CRITICAL REQUIREMENTS FOR WORD COUNT 1000+:
 - Include 3-4 projects/experiences
 - Each project needs 5-7 detailed bullet points
 - Every bullet should be comprehensive with context + action + result + metrics
 - Add details about scale, impact, technologies, team collaboration
 - Expand on technical implementation details where relevant]

EDUCATION
[Degree] | [Institution] | [Location] | [Year]
[Degree] | [Institution] | [Location] | [Year]

PROFESSIONAL DEVELOPMENT
[Bootcamp/Training] | [Organization] | [Dates] | [Hours/Intensity]

${specialRequirements || jobLevel === 'junior' ? `
ROLE ALIGNMENT ([Job Title])
[CRITICAL - This section directly addresses job-specific requirements]
• [Address specific industry interest] - e.g., "Interested in IoT event-driven data processing and real-time telemetry"
• [Address learning path] - e.g., "Apache Kafka learning path underway" or "Eager to deepen knowledge in [specific tech]"
• [Address special requirements] - If job mentions onboarding path (IT Support → QA → Developer), say: "Willing to start via IT Support + QA onboarding to learn the platform before transitioning into junior role"
• [Show domain awareness] - Mention company's domain/industry and express genuine interest
• [List compatible skills already have] - Comfortable with Docker, CI/CD, PostgreSQL
[Make this section conversational and show you READ and UNDERSTOOD the job posting]
` : ''}

ATS KEYWORDS
[List all relevant keywords in a comma-separated format for maximum ATS scanning]
${hardSkills} | ${tools} | ${softSkills} | Agile/Scrum | [Add job-specific terms like IoT, Streaming, Real-Time, etc. if relevant] | [Add industry-specific terms] | [Add any special requirements keywords]

[Optional: CERTIFICATIONS - if relevant to job]

[Optional: REFERENCES - "Available upon request"]
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
✓ Acronyms included with full forms (CI/CD, REST API, SQL)
✓ Standard ATS section headers used (PROFESSIONAL SUMMARY, CORE COMPETENCIES, PROFESSIONAL EXPERIENCE, EDUCATION)
✓ Job title variations included
✓ NO URLs or hyperlinks (LinkedIn, GitHub, etc.)

HARD SKILLS (Target: 0 issues):
✓ SQL mentioned separately AND specific databases (PostgreSQL, DB2, MySQL)
✓ Every technical skill from job description included if candidate has it
✓ Skills repeated 2-4 times across sections (summary + core competencies + experience bullets)
✓ EXACT terminology used (no synonyms) - PostgreSQL not Postgres, Git not version control
✓ Comprehensive CORE COMPETENCIES section with ALL matching keywords
✓ Skills integrated in project descriptions with context
✓ Performance, Scalability, Maintainability, Security mentioned explicitly
✓ Technical Documentation, Bug Resolution, Code Review mentioned
✓ Agile ceremonies: Sprint Planning, Daily Stand-ups, Retrospectives

SOFT SKILLS (Target: 0 issues):
✓ "Passionate" explicitly mentioned (if in job description)
✓ "Analytical skills" explicitly mentioned
✓ "Working closely" or "collaborating closely" with teams
✓ Team composition mentioned: "business analysts, developers, testers"
✓ Soft skills in professional summary
✓ Soft skills demonstrated in multiple experience bullets
✓ "Proficient in English" or "English proficient" if mentioned

RECRUITER TIPS (Target: 0 issues):
✓ WORD COUNT: 1000+ words total (not 400-500)
✓ MEASURABLE RESULTS: 15+ quantified achievements total (5-7 per project)
✓ Every bullet point has specific numbers/metrics/percentages
✓ Strong action verbs used (Developed, Architected, Implemented, Delivered, Achieved - NOT "responsible for", "helped with")
✓ NO negative phrases or clichés
✓ Production impact emphasized with scale metrics
✓ Consistent formatting throughout
✓ PROFESSIONAL DEVELOPMENT section for bootcamp/training
✓ 3-4 projects shown with detailed descriptions
✓ Each bullet comprehensive and detailed (not short)

FORMATTING (Target: 0 issues):
✓ Plain text, single column only
✓ No tables, graphics, or complex formatting
✓ No URLs or hyperlinks
✓ Standard bullets (•) and clear sections
✓ Professional appearance
✓ Consistent spacing

KEYWORD DENSITY:
✓ Top 10 keywords from job appear 2-4 times each
✓ Keywords in: Summary + Core Competencies + Experience descriptions
✓ Natural integration (not keyword stuffing)

HONESTY:
✓ No fabricated skills or experience
✓ Accurate representation of experience level
✓ All claims backed by actual projects/achievements

LENGTH & DETAIL:
✓ Target 1000+ words total (current requirement)
✓ 3-4 projects with 5-7 bullets each
✓ Every bullet detailed and comprehensive
✓ Section heading "PROFESSIONAL EXPERIENCE" only (not "PROFESSIONAL EXPERIENCE / KEY PROJECTS")

**NOW: Generate the complete CV following ALL requirements above.

CRITICAL REQUIREMENTS FOR 90+ SCORE:
1. WORD COUNT: Minimum 1000 words (be detailed and comprehensive)
2. MEASURABLE RESULTS: At least 15+ quantified achievements across all projects
3. NO negative phrases: Use active, positive language only
4. 3-4 projects shown with 5-7 detailed bullets each
5. Section heading: "PROFESSIONAL EXPERIENCE" (not combined with "KEY PROJECTS")

This CV must score 90+ on jobscan.co while being honest and compelling.**`;
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
    // Databases & SQL
    /\b(SQL|PostgreSQL|MySQL|MongoDB|Redis|Oracle|SQL Server|DB2|Cassandra|DynamoDB)\b/gi,
    /\b(Database|Databases|Data warehouse|Query Optimization)\b/gi,
    // Cloud & DevOps
    /\b(AWS|Azure|GCP|Google Cloud|Docker|Kubernetes|Jenkins|GitLab|CI\/CD|Terraform)\b/gi,
    // Tools
    /\b(Git|Gradle|Maven|npm|Webpack|Jira|Confluence)\b/gi,
    // Testing
    /\b(JUnit|Mockito|Jest|Mocha|Selenium|Cypress|Unit Testing|Integration Testing|System Testing|Test Coverage)\b/gi,
    // Architecture & Practices
    /\b(Microservices|REST\s?API|GraphQL|SOAP|Event-Driven|Serverless)\b/gi,
    /\b(Performance|Scalability|Maintainability|Security|Quality)\b/gi,
    /\b(Architecture|Architectural|Design|Code Review|Refactoring|Debugging|Bug Resolution)\b/gi,
    /\b(Technical Documentation|Documentation|Engineering Practices)\b/gi,
    // Methodologies & Agile
    /\b(Agile|Scrum|Kanban|TDD|BDD|DevOps)\b/gi,
    /\b(Sprint Planning|Daily Stand-ups|Stand-ups|Retrospectives|Code Reviews)\b/gi,
    // Company/Product Specific (will catch if mentioned)
    /\b(Plexus|Workflow|Datamart|Output)\b/gi,
  ];

  // Soft skills patterns
  const softSkillPatterns = [
    /\b(agile|scrum|collaboration|collaborative|collaborating|team\s?player|team\s?oriented|team\s?work|teamwork)\b/gi,
    /\b(communication|communicating|analytical|analytical\s?skills|problem[\s-]solving|critical\s?thinking)\b/gi,
    /\b(leadership|mentoring|cross[\s-]functional|cross\s?functional)\b/gi,
    /\b(attention\s?to\s?detail|quality[\s-]focused|quality[\s-]oriented|quality|passionate|passion)\b/gi,
    /\b(professional|proficient|proficiency|English|working\s?together|working\s?closely)\b/gi,
    /\b(business\s?analysts?|developers?|testers?|distributed\s?team)\b/gi,
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

  // Ensure important soft skills are always included
  const defaultSoftSkills = [
    'agile', 'collaboration', 'team-oriented', 'analytical',
    'problem-solving', 'passionate', 'cross-functional', 'communication'
  ];

  return {
    hardSkills: Array.from(hardSkills),
    softSkills: Array.from(new Set([...softSkills, ...defaultSoftSkills])).slice(0, 15),
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
    'maintainability', 'security', 'quality', 'workflow', 'framework',
    'configuration', 'automated', 'manual', 'reports', 'customers', 'clients',
    'solutions', 'ecosystem', 'guidelines', 'practices', 'bugs', 'resolution',
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

/**
 * Detect job seniority level
 */
function detectJobLevel(jobDescription: string): string {
  const text = jobDescription.toLowerCase();

  if (/\b(junior|entry[\s-]level|graduate|trainee|intern)\b/i.test(text)) {
    return 'junior';
  } else if (/\b(senior|lead|principal|staff|architect)\b/i.test(text)) {
    return 'senior';
  } else if (/\b(mid[\s-]level|medior|intermediate)\b/i.test(text)) {
    return 'mid-level';
  }

  return 'mid-level'; // default
}

/**
 * Extract special requirements (onboarding paths, specific expectations)
 */
function extractSpecialRequirements(jobDescription: string): string {
  const requirements: string[] = [];
  const text = jobDescription;

  // Detect onboarding/progression paths
  if (/support.*qa|qa.*support|start.*support|begin.*support/i.test(text)) {
    requirements.push('- Onboarding path detected: May start with IT Support/QA before full development role');
  }

  if (/traineeship|training.*program|onboarding.*path/i.test(text)) {
    requirements.push('- Traineeship/training program mentioned');
  }

  // Detect learning emphasis
  if (/willing to learn|eager to learn|interest in learning/i.test(text)) {
    requirements.push('- Emphasis on willingness to learn');
  }

  // Detect specific tech learning
  const learningTech = text.match(/learning\s+(\w+)|interest in\s+(\w+)/gi);
  if (learningTech) {
    requirements.push(`- Learning interests: ${learningTech.join(', ')}`);
  }

  return requirements.length > 0 ? requirements.join('\n') : '';
}

/**
 * Extract industry/domain from job description
 */
function extractIndustry(jobDescription: string): string {
  const text = jobDescription.toLowerCase();

  if (/\b(iot|internet of things|telemetry|sensor|device|embedded)\b/i.test(text)) {
    return 'IoT / Embedded Systems';
  } else if (/\b(fintech|financial|banking|payment)\b/i.test(text)) {
    return 'FinTech / Finance';
  } else if (/\b(water|utilities|energy|infrastructure)\b/i.test(text)) {
    return 'Utilities / Infrastructure';
  } else if (/\b(healthcare|medical|health)\b/i.test(text)) {
    return 'Healthcare';
  } else if (/\b(e-commerce|retail|marketplace)\b/i.test(text)) {
    return 'E-commerce';
  }

  return 'Technology';
}
