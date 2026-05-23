// ============================================================
// PORTFOLIO DATA — Mohammed Sameer
// All content is stored here. Edit via /admin panel or directly.
// ============================================================

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  resumeUrl: string;
  avatarUrl: string;
  tagline: string;
}

export interface HeroData {
  headline: string;
  description: string;
  roles: string[];
  ctaButtons: { label: string; href: string; variant: 'primary' | 'secondary' | 'outline' }[];
}

export interface AboutData {
  bio: string[];
  highlights: string[];
  interests: string[];
  stats: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  level?: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  score: string;
  scoreLabel: string;
  description?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  responsibilities: string[];
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  url?: string;
  badge?: string;
}

export interface ResearchInterest {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
}

export interface SWOTItem {
  id: string;
  text: string;
}

export interface SWOTData {
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
}

export interface VisionData {
  longTermGoal: string;
  fiveYearGoals: { id: string; title: string; description: string }[];
}

export interface ContactData {
  email: string;
  phone: string;
  location: string;
  emailjsServiceId: string;
  emailjsTemplateId: string;
  emailjsPublicKey: string;
  availability: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  hero: HeroData;
  about: AboutData;
  skills: SkillCategory[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  researchInterests: ResearchInterest[];
  swot: SWOTData;
  vision: VisionData;
  contact: ContactData;
}

// ============================================================
// DEFAULT DATA — Change via /admin panel
// ============================================================

export const defaultPortfolioData: PortfolioData = {
  personal: {
    name: 'Mohammed Sameer',
    title: 'Mechanical Engineering Student',
    subtitle: 'CAD · CFD · AI · Automation · Web Development',
    email: 'msam81401@gmail.com',
    phone: '+91 9392164156',
    location: 'Hyderabad, Telangana, India',
    githubUrl: 'https://github.com/mohammedsameer',
    linkedinUrl: 'https://linkedin.com/in/mohammedsameer',
    portfolioUrl: 'https://mohammedsameer.dev',
    resumeUrl: '#',
    avatarUrl: '',
    tagline: 'Building the future with CAD, CFD, AI & Code',
  },

  hero: {
    headline: 'Mohammed Sameer',
    description:
      'Mechanical Engineering student building innovative solutions using CAD, CFD, AI, automation, and software development.',
    roles: [
      'Mechanical Engineer',
      'CFD Enthusiast',
      'AI Builder',
      'CAD Designer',
      'Full Stack Developer',
      'Automation Developer',
      'Engineering Innovator',
      'Simulation Engineer',
    ],
    ctaButtons: [
      { label: 'Download Resume', href: '#', variant: 'primary' },
      { label: 'View Projects', href: '#projects', variant: 'secondary' },
      { label: 'Contact Me', href: '#contact', variant: 'outline' },
      { label: 'GitHub', href: 'https://github.com/mohammedsameer', variant: 'outline' },
    ],
  },

  about: {
    bio: [
      'I am a Mechanical Engineering student at JNTUK with a strong academic and practical foundation in CAD design, 3D modeling, Computational Fluid Dynamics, and modern software development.',
      'My journey bridges the gap between classical engineering and cutting-edge technology — combining physical simulation with AI-assisted workflows and automation to build solutions that matter.',
      'I have hands-on experience from internships at CITD and TECHARO, working on real engineering and design challenges. My passion lies in leveraging AI for engineering innovation and sustainable technology.',
    ],
    highlights: [
      'CAD & 3D Modeling Expert',
      'OpenFOAM CFD Simulation',
      'AI-assisted Engineering',
      'Full Stack Web Development',
      'Workflow Automation',
      'Technical Documentation',
      'Engineering Problem Solver',
      'Team Collaborator',
    ],
    interests: [
      'Artificial Intelligence',
      'Smart Manufacturing',
      'CFD Simulation',
      'Engineering Automation',
      'Sustainable Technology',
      'Industry 4.0',
    ],
    stats: [
      { label: 'CGPA', value: '7.5' },
      { label: 'Internships', value: '2' },
      { label: 'Projects', value: '4+' },
      { label: 'Certifications', value: '4+' },
    ],
  },

  skills: [
    {
      id: 'cad-engineering',
      title: 'Engineering & CAD',
      icon: '⚙️',
      skills: [
        { name: 'SolidWorks', level: 90 },
        { name: 'CATIA V5', level: 85 },
        { name: 'Fusion 360', level: 80 },
        { name: 'AutoCAD', level: 82 },
        { name: 'ANSYS', level: 75 },
        { name: 'OpenFOAM', level: 78 },
        { name: 'ParaView', level: 72 },
        { name: 'Flownex', level: 65 },
      ],
    },
    {
      id: 'programming',
      title: 'Programming',
      icon: '💻',
      skills: [
        { name: 'Python', level: 80 },
        { name: 'C', level: 70 },
        { name: 'C++', level: 72 },
        { name: 'JavaScript', level: 82 },
        { name: 'TypeScript', level: 75 },
      ],
    },
    {
      id: 'web-development',
      title: 'Web Development',
      icon: '🌐',
      skills: [
        { name: 'React', level: 80 },
        { name: 'Next.js', level: 75 },
        { name: 'TailwindCSS', level: 82 },
        { name: 'Responsive Design', level: 85 },
        { name: 'Deployment', level: 75 },
        { name: 'E-commerce Websites', level: 72 },
      ],
    },
    {
      id: 'ai-automation',
      title: 'AI & Automation',
      icon: '🤖',
      skills: [
        { name: 'AI Tools', level: 80 },
        { name: 'Workflow Automation', level: 75 },
        { name: 'AI Agents', level: 70 },
        { name: 'Prompt Engineering', level: 82 },
        { name: 'Automation Scripts', level: 76 },
        { name: 'AI-assisted Engineering', level: 78 },
      ],
    },
    {
      id: 'design',
      title: 'Design Skills',
      icon: '🎨',
      skills: [
        { name: 'Graphic Design', level: 75 },
        { name: 'Technical Visualization', level: 80 },
        { name: 'UI/UX', level: 70 },
        { name: 'Creative Design Thinking', level: 78 },
        { name: 'Visual Communication', level: 76 },
      ],
    },
    {
      id: 'engineering-concepts',
      title: 'Engineering Concepts',
      icon: '🔬',
      skills: [
        { name: 'CFD Simulation', level: 78 },
        { name: 'Fluid Mechanics', level: 82 },
        { name: 'Thermal Engineering', level: 76 },
        { name: 'Machine Design', level: 74 },
        { name: 'Manufacturing Processes', level: 70 },
        { name: 'Design Optimization', level: 72 },
      ],
    },
  ],

  education: [
    {
      id: 'btech',
      degree: 'Bachelor of Technology — Mechanical Engineering',
      institution: 'Jawaharlal Nehru Technological University, Kukatpally',
      year: '2023 – 2027 (Expected)',
      score: '7.5',
      scoreLabel: 'CGPA',
      description: 'Hyderabad, Telangana',
    },
    {
      id: 'intermediate',
      degree: 'Intermediate / 12th Grade',
      institution: 'Narayana Junior College',
      year: '2021 – 2023',
      score: '970',
      scoreLabel: 'Score',
      description: 'Science Stream',
    },
    {
      id: 'secondary',
      degree: 'Secondary School (10th Grade)',
      institution: 'Sri Chaitanya High School',
      year: '2021',
      score: '10',
      scoreLabel: 'GPA',
      description: 'Perfect Academic Record',
    },
  ],

  experience: [
    {
      id: 'citd',
      role: 'CAD Design Intern',
      company: 'Central Institute of Tool Design (CITD)',
      location: 'Hyderabad, India',
      duration: 'May 2024 – June 2024',
      type: 'Internship',
      responsibilities: [
        'Prepared detailed technical documentation for engineering projects',
        'Created comprehensive CAD designs using SolidWorks and CATIA',
        'Built accurate 3D models for prototyping and visualization',
        'Assisted engineering teams in design review and optimization',
        'Developed functional prototypes for testing and validation',
        'Improved design visualization processes for better communication',
      ],
      skills: ['SolidWorks', 'CATIA', 'Technical Documentation', 'Team Collaboration', '3D Modeling'],
    },
    {
      id: 'techaro',
      role: 'Graphic Design Intern',
      company: 'TECHARO',
      location: 'Hyderabad, India',
      duration: 'January 2024 – February 2024',
      type: 'Internship',
      responsibilities: [
        'Assisted project managers in planning and execution of design projects',
        'Managed project timelines and deliverables effectively',
        'Created visual designs and marketing materials',
        'Handled budget tracking and financial reporting for projects',
        'Provided creative design support across multiple campaigns',
        'Collaborated with cross-functional teams on branding initiatives',
      ],
      skills: ['Graphic Design', 'Project Coordination', 'Team Collaboration', 'Design Thinking', 'Adobe Suite'],
    },
  ],

  projects: [
    {
      id: 'cfd-square-cylinder',
      title: 'CFD Analysis of Laminar Flow Over a Square Cylinder',
      description:
        'Comprehensive CFD simulation of steady-state laminar flow around a square cylinder using OpenFOAM v13, including pressure distribution and drag/lift coefficient analysis.',
      longDescription:
        'Performed a detailed computational fluid dynamics study of laminar flow behavior around a square cylinder using OpenFOAM v13. The project encompassed mesh generation with blockMesh, solver configuration for steady-state incompressible flow, Reynolds number parametric study, pressure distribution analysis, streamline and contour visualization in ParaView, and extraction of drag and lift coefficients at various Re values.',
      category: 'CFD Simulation',
      tags: ['OpenFOAM', 'ParaView', 'CFD', 'Fluid Mechanics', 'Mesh Generation', 'Reynolds Analysis'],
      githubUrl: 'https://github.com/mohammedsameer/cfd-square-cylinder',
      featured: true,
      status: 'completed',
    },
    {
      id: 'cad-piston-assembly',
      title: 'In-Line 4-Cylinder Piston Arrangement — CAD Design',
      description:
        'Complete CAD model of a 4-cylinder piston arrangement studying mechanical alignment, component interaction, and assembly relationships across all engine components.',
      longDescription:
        'Designed a full 4-cylinder inline engine assembly in SolidWorks including individual component modeling (cylinders, pistons, connecting rods, crankshaft), constraint-based assembly design, motion study for dynamic analysis, technical drawing generation, and BOM creation for manufacturing documentation.',
      category: 'CAD Design',
      tags: ['SolidWorks', 'CAD Modeling', 'Assembly Design', '3D Modeling', 'Engineering Drawing'],
      githubUrl: 'https://github.com/mohammedsameer/4-cylinder-cad',
      featured: true,
      status: 'completed',
    },
    {
      id: 'web-projects',
      title: 'Web Development Projects',
      description:
        'Collection of responsive web projects including a Vercel Website Downloader tool and multiple E-commerce Landing Pages with modern UI and deployment workflows.',
      longDescription:
        'Built several full-stack web applications including a Vercel Website Downloader utility using Node.js, multiple e-commerce landing pages with React and TailwindCSS, and various responsive UI components deployed on Vercel. Each project features clean code architecture, mobile responsiveness, and modern design patterns.',
      category: 'Web Development',
      tags: ['React', 'Next.js', 'JavaScript', 'TailwindCSS', 'Node.js', 'Vercel', 'E-commerce'],
      githubUrl: 'https://github.com/mohammedsameer',
      demoUrl: 'https://mohammedsameer.dev',
      featured: true,
      status: 'completed',
    },
    {
      id: 'ai-engineering',
      title: 'AI & Automation Engineering',
      description:
        'Futuristic AI-powered engineering workflows including AI assistants, agentic systems, voice AI, automation tools, and RAG systems for mechanical engineering applications.',
      longDescription:
        'Ongoing research and development into AI-powered engineering solutions. Exploring the intersection of Large Language Models with mechanical engineering workflows — from AI-assisted CFD parameter optimization to automated design review systems, voice-controlled CAD modeling, and RAG-based engineering knowledge bases.',
      category: 'AI & Automation',
      tags: ['AI Agents', 'RAG Systems', 'Voice AI', 'Automation', 'Python', 'Engineering AI', 'LLM'],
      githubUrl: 'https://github.com/mohammedsameer',
      featured: true,
      status: 'in-progress',
    },
  ],

  certifications: [
    {
      id: 'ds-ml-corizo',
      name: 'Data Science and Machine Learning',
      issuer: 'Corizo',
      year: '2024',
      url: '#',
    },
    {
      id: 'solidworks-ansys',
      name: 'SolidWorks and ANSYS Training',
      issuer: 'CITD — Central Institute of Tool Design',
      year: '2024',
      url: '#',
    },
    {
      id: 'webdev-corizo',
      name: 'Web Development Bootcamp',
      issuer: 'Corizo',
      year: '2024',
      url: '#',
    },
    {
      id: 'openfoam-cfd',
      name: 'OpenFOAM v13 CFD Training',
      issuer: 'Self-directed / Online',
      year: '2024',
      url: '#',
    },
  ],

  researchInterests: [
    {
      id: 'cfd-advanced',
      title: 'Computational Fluid Dynamics',
      category: 'Simulation',
      icon: '🌊',
      description: 'Advanced CFD techniques, turbulence modeling, and flow simulation methodologies',
    },
    {
      id: 'turbulence',
      title: 'Turbulence Modeling',
      category: 'Simulation',
      icon: '🔄',
      description: 'RANS, LES, and DNS approaches for turbulent flow simulation',
    },
    {
      id: 'design-optimization',
      title: 'Design Optimization',
      category: 'Engineering',
      icon: '📐',
      description: 'Parametric design, topology optimization, and generative design approaches',
    },
    {
      id: 'ai-mech',
      title: 'AI in Mechanical Engineering',
      category: 'AI & Engineering',
      icon: '🤖',
      description: 'Machine learning for engineering simulation, predictive maintenance, and design automation',
    },
    {
      id: 'sustainable-energy',
      title: 'Sustainable Energy Systems',
      category: 'Sustainability',
      icon: '⚡',
      description: 'Renewable energy technologies, heat transfer optimization, and green engineering',
    },
    {
      id: 'smart-manufacturing',
      title: 'Smart Manufacturing',
      category: 'Industry 4.0',
      icon: '🏭',
      description: 'Industry 4.0, IoT integration, digital twins, and intelligent manufacturing systems',
    },
    {
      id: 'automation',
      title: 'Intelligent Automation',
      category: 'Industry 4.0',
      icon: '⚙️',
      description: 'Robotic process automation, AI-driven workflows, and autonomous engineering systems',
    },
    {
      id: 'flow-simulation',
      title: 'Flow Simulation & Visualization',
      category: 'Simulation',
      icon: '📊',
      description: 'Multi-physics simulation, visualization pipelines, and interactive CFD dashboards',
    },
  ],

  swot: {
    strengths: [
      { id: 's1', text: 'Strong technical foundation across mechanical and software engineering' },
      { id: 's2', text: 'Diverse skill set spanning CAD, CFD, AI, and web development' },
      { id: 's3', text: 'Quick learner with ability to adapt to new technologies rapidly' },
      { id: 's4', text: 'Creative problem-solving with multidisciplinary approach' },
      { id: 's5', text: 'Proven team collaboration from internship experience' },
      { id: 's6', text: 'Self-motivated with strong drive for innovation' },
    ],
    weaknesses: [
      { id: 'w1', text: 'Limited industrial experience (still in education phase)' },
      { id: 'w2', text: 'Still developing deep specialization in a primary domain' },
      { id: 'w3', text: 'Need for more advanced industry-recognized certifications' },
    ],
    opportunities: [
      { id: 'o1', text: 'Growing demand in engineering design and simulation companies' },
      { id: 'o2', text: 'Rapid expansion of the automation and AI engineering industry' },
      { id: 'o3', text: 'AI engineering startups seeking multidisciplinary talent' },
      { id: 'o4', text: 'Sustainable technology sector offering emerging roles' },
      { id: 'o5', text: 'R&D departments seeking simulation and CFD specialists' },
    ],
    threats: [
      { id: 't1', text: 'Highly competitive engineering and technology job market' },
      { id: 't2', text: 'Rapid technology evolution requiring continuous upskilling' },
      { id: 't3', text: 'Need for continuous learning to stay current with AI advancements' },
    ],
  },

  vision: {
    longTermGoal:
      'To become an innovative mechanical engineer capable of building efficient engineering solutions through advanced simulation, AI-assisted engineering, intelligent automation, sustainable design, and modern software systems — bridging the gap between physical engineering and digital intelligence.',
    fiveYearGoals: [
      {
        id: 'g1',
        title: 'Gain Industrial Experience',
        description: 'Secure full-time engineering role in a leading design, simulation, or tech company',
      },
      {
        id: 'g2',
        title: 'Develop CFD Specialization',
        description: 'Achieve mastery in advanced CFD techniques, turbulence modeling, and multi-physics simulation',
      },
      {
        id: 'g3',
        title: 'Build AI-Engineering Solutions',
        description: 'Create AI-powered tools that transform mechanical engineering workflows and automation',
      },
      {
        id: 'g4',
        title: 'Grow Professional Network',
        description: 'Establish connections with leading engineers, researchers, and innovators globally',
      },
      {
        id: 'g5',
        title: 'Pursue Advanced Certifications',
        description: 'Earn advanced certifications in CFD, AI engineering, and project management',
      },
    ],
  },

  contact: {
    email: 'msam81401@gmail.com',
    phone: '+91 9392164156',
    location: 'Hyderabad, Telangana, India',
    emailjsServiceId: 'YOUR_SERVICE_ID',
    emailjsTemplateId: 'YOUR_TEMPLATE_ID',
    emailjsPublicKey: 'YOUR_PUBLIC_KEY',
    availability: 'Open to internships, collaborations, and full-time opportunities',
  },
};

// ============================================================
// STORAGE KEY
// ============================================================
const STORAGE_KEY = 'ms_portfolio_data_v1';

export function loadPortfolioData(): PortfolioData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<PortfolioData>;
      return { ...defaultPortfolioData, ...parsed };
    }
  } catch {
    // fallback to default
  }
  return defaultPortfolioData;
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.error('Failed to save portfolio data');
  }
}

export function resetPortfolioData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
