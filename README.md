# MaxCV - AI-Powered CV & Cover Letter Generator

**MaxCV** is a professional web application that generates ATS-optimized CVs and compelling cover letters tailored to specific job applications using GPT-4.

## Features

✅ **User Profile Management** - Store and update your resume information
✅ **Job Application Tracking** - Manage multiple job applications
✅ **AI-Powered CV Generation** - GPT-4 creates ATS-optimized CVs
✅ **AI-Powered Cover Letter Generation** - Personalized cover letters for each job
✅ **Keyword Optimization** - Extracts and matches keywords from job descriptions
✅ **Production Focus** - Emphasizes deployed applications and quantified achievements
✅ **Document History** - Saves all generated documents per application

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **AI**: OpenAI GPT-4 Turbo
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd maxcv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/maxcv?schema=public"

   # OpenAI - Get your key from https://platform.openai.com/api-keys
   OPENAI_API_KEY="sk-..."

   # NextAuth
   NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**

   Create a PostgreSQL database:
   ```bash
   createdb maxcv
   ```

   Run Prisma migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### 1. Create Your Profile

Navigate to `/profile` and enter:
- Personal information (name, email, phone, location)
- Professional background (experience, bootcamp info, previous career)
- Technical skills (expert, proficient, learning)
- Projects with metrics
- Achievements
- Education

### 2. Create a New Application

Navigate to `/application` and:
1. Enter your email
2. Paste the job title
3. Paste the company name
4. Paste the full job description
5. Click "Generate CV & Cover Letter"

### 3. Review Generated Documents

The AI will generate:
- **ATS-Optimized CV**: Plain text, single column, keyword-rich
- **Tailored Cover Letter**: Personalized, 250-350 words

You can copy the documents to your clipboard or save them.

### 4. View Your Applications

Navigate to `/dashboard` to see all your job applications and generated documents.

## AI Prompt Strategy

The application uses carefully engineered prompts that:

1. **Extract keywords** from job descriptions
2. **Match technical skills** to job requirements
3. **Quantify all achievements** with metrics
4. **Use strong action verbs** (Architected, Optimized, Built, etc.)
5. **Maintain honesty** about experience level
6. **Emphasize production deployments** and real-world impact
7. **Format for ATS compatibility** (plain text, standard headings)

### GPT-4 Model Configuration

- **CV Generation**: `gpt-4-turbo-preview`, temperature 0.7, max 2000 tokens
- **Cover Letter**: `gpt-4-turbo-preview`, temperature 0.8, max 1000 tokens

Higher temperature for cover letters creates more natural, personalized writing.

## Database Schema

```prisma
User
  - id, email, password, name
  - profile (1:1)
  - applications (1:N)

Profile
  - Personal info (name, email, phone, location)
  - Professional background (title, experience, bootcamp, previous career)
  - Skills, projects, achievements (JSON fields)
  - Education, certifications, languages

JobApplication
  - Job details (title, company, description)
  - Status (draft, applied, interview, rejected, accepted)
  - documents (1:N)

GeneratedDocument
  - Type (cv, cover_letter)
  - Content
  - AI metadata (model, tokens, prompt used)
  - Version control
```

## API Endpoints

### Profile Management
- `GET /api/profile?email=<email>` - Get user profile
- `POST /api/profile` - Create/update profile

### Applications
- `GET /api/applications?email=<email>` - List all applications
- `POST /api/applications` - Create new application

### AI Generation
- `POST /api/generate/cv` - Generate CV
- `POST /api/generate/cover-letter` - Generate cover letter

## Project Structure

```
maxcv/
├── app/
│   ├── api/
│   │   ├── generate/
│   │   │   ├── cv/route.ts
│   │   │   └── cover-letter/route.ts
│   │   ├── profile/route.ts
│   │   └── applications/route.ts
│   ├── profile/page.tsx
│   ├── application/page.tsx
│   ├── dashboard/page.tsx
│   └── page.tsx
├── lib/
│   ├── prisma.ts
│   ├── openai.ts
│   └── prompts.ts
├── types/
│   └── index.ts
├── prisma/
│   └── schema.prisma
└── README.md
```

## Key Features Explained

### ATS Optimization

The CV generator follows ATS best practices:
- Plain text, single column format
- No tables, graphics, or complex formatting
- Standard section headings
- Keyword matching from job descriptions
- Exact terminology matching

### Prompt Engineering

The prompts are designed to:
- Analyze user profile and job description
- Extract relevant keywords
- Prioritize matching skills and experiences
- Generate quantified achievements
- Maintain honest representation
- Create compelling narratives

### Example Prompt Structure

```
1. System role: Expert CV writer
2. Candidate profile: Full user data
3. Target job: Job description
4. Requirements: 10-point checklist
   - ATS optimization
   - Keyword matching
   - Honesty
   - Quantified metrics
   - Action verbs
   - Professional summary
   - Skills prioritization
   - Experience formatting
   - Previous career connection
   - Length/structure
5. Output format: Exact template
6. Final checklist: Verification points
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Database Setup for Production

Use a hosted PostgreSQL database:
- [Neon](https://neon.tech) (recommended, free tier available)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

Update `DATABASE_URL` in production environment variables.

## Tips for Best Results

1. **Complete Your Profile**: The more detailed your profile, the better the AI can tailor your CV
2. **Include Metrics**: Quantify all achievements (%, numbers, scale)
3. **Paste Full Job Description**: More context helps the AI match keywords
4. **Review and Edit**: AI-generated content should be reviewed before submission
5. **Update Regularly**: Keep your profile current with new projects and skills

## OpenAI API Costs

Approximate costs per generation:
- CV: ~$0.05-0.10 (2000 tokens)
- Cover Letter: ~$0.02-0.05 (1000 tokens)
- Total per application: ~$0.07-0.15

GPT-4 Turbo pricing (as of 2024):
- Input: $10 / 1M tokens
- Output: $30 / 1M tokens

## Troubleshooting

### Database Connection Error
```bash
# Check if PostgreSQL is running
pg_isready

# Verify connection string
psql "postgresql://user:password@localhost:5432/maxcv"
```

### Prisma Generation Error
```bash
# Regenerate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### OpenAI API Error
- Verify API key is correct
- Check API usage limits at https://platform.openai.com/usage
- Ensure billing is set up

## Future Enhancements

- [ ] PDF export functionality
- [ ] DOCX export functionality
- [ ] User authentication with NextAuth
- [ ] Application status tracking
- [ ] Email notifications
- [ ] Template customization
- [ ] Multi-language support
- [ ] Interview preparation tips
- [ ] Application analytics

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, and GPT-4**
