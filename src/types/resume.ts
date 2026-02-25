export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: string[];
  links: {
    github: string;
    linkedin: string;
  };
}

export const emptyResume = (): ResumeData => ({
  personal: { name: '', email: '', phone: '', location: '' },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: [],
  links: { github: '', linkedin: '' },
});

export const sampleResume = (): ResumeData => ({
  personal: {
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary:
    'Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean code and user-centric design. Led teams of 4–6 engineers and shipped features used by millions. Strong in React, TypeScript, and Node.js. Focused on performance, accessibility, and maintainability.',
  education: [
    {
      id: 'edu-1',
      institution: 'Stanford University',
      degree: 'B.S.',
      field: 'Computer Science',
      startDate: '2016',
      endDate: '2020',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Corp',
      role: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2022',
      endDate: 'Present',
      description: 'Lead development of customer-facing web applications. Reduced load time by 30%.',
    },
    {
      id: 'exp-2',
      company: 'Startup Inc',
      role: 'Software Engineer',
      location: 'Remote',
      startDate: '2020',
      endDate: '2022',
      description: 'Built and maintained REST APIs and frontend features.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Open Source Library',
      description: 'A widely-used React component library with 10k+ downloads.',
      url: 'https://github.com/janedoe/library',
    },
    {
      id: 'proj-2',
      name: 'Dashboard Tool',
      description: 'Internal analytics dashboard serving 50+ users.',
      url: 'https://github.com/janedoe/dashboard',
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Jest'],
  links: {
    github: 'https://github.com/janedoe',
    linkedin: 'https://linkedin.com/in/janedoe',
  },
});
