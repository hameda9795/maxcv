export interface UserProfile {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  professionalTitle?: string;
  yearsOfExperience?: number;
  bootcampInfo?: string;
  backgroundYears?: number;
  backgroundField?: string;
  education?: Education[];
  technicalSkills?: TechnicalSkills;
  projects?: Project[];
  achievements?: Achievement[];
  workExperience?: WorkExperience[];
  certifications?: Certification[];
  languages?: Language[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  graduationYear?: string;
  description?: string;
}

export interface TechnicalSkills {
  expert?: string[];
  proficient?: string[];
  learning?: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  metrics?: string[];
  url?: string;
  status?: 'production' | 'development' | 'completed';
}

export interface Achievement {
  description: string;
  metric?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  responsibilities: string[];
  achievements?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  url?: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface JobPosting {
  title: string;
  company: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
}

export interface GeneratedCV {
  content: string;
  format: 'markdown' | 'text' | 'html';
  metadata: {
    model: string;
    tokensUsed: number;
    generatedAt: Date;
  };
}

export interface GeneratedCoverLetter {
  content: string;
  metadata: {
    model: string;
    tokensUsed: number;
    generatedAt: Date;
  };
}
