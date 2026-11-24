// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Razi ur Rehman",
  first: "Razi",
  last: "ur Rehman",
  title: "Full-Stack Developer",
  roles: [
    "Full-Stack Developer",
    "Associate Software Engineer",
    "AI Integration Engineer",
    "Next.js + FastAPI Builder",
  ],
  location: "Islamabad, Pakistan",
  email: "razirao593@gmail.com",
  phone: "+92 319 0113400",
  whatsapp: "https://wa.me/923190113400",
  github: "https://github.com/trio191",
  githubHandle: "trio191",
  cv: "/Razi_ur_Rehman_CV.pdf",
  summary:
    "Computer Science graduate (BSCS, 2026) and full-stack developer who has been building and shipping web applications since 2023. Hands-on with React.js, Next.js and Node.js on the front and back end, with both SQL and NoSQL databases, and with LLM-powered features in production. I apply OOP, data structures and clean-code practices to build scalable, maintainable products, and I take ownership of debugging and optimization.",
};

export const stats = [
  { value: 2023, suffix: "", label: "Shipping code since" },
  { value: 122, suffix: "+", label: "REST endpoints in one system" },
  { value: 133, suffix: "", label: "RBAC permissions designed" },
  { value: 3, suffix: "", label: "Companies worked with" },
];

export const skillGroups = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "Python", "PHP", "Dart"] },
  { label: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Alpine.js"] },
  { label: "Backend", items: ["Node.js", "Express.js", "FastAPI", "Laravel", "REST APIs"] },
  { label: "Databases", items: ["PostgreSQL", "MySQL", "Firestore", "Redis", "Prisma", "SQLAlchemy"] },
  { label: "AI", items: ["LLMs", "RAG", "Whisper", "Groq / Llama", "AI Agents"] },
  { label: "Tools", items: ["Git", "GitHub", "Celery", "Vercel", "Railway", "Flutter"] },
];

export const allSkills = skillGroups.flatMap((g) => g.items);

export const experience = [
  {
    role: "Full Stack AI Engineer",
    company: "DevSpire Digital",
    place: "Islamabad",
    period: "Nov 2025 – Oct 2026",
    points: [
      "Built client products end to end with Next.js / React on the frontend and Node.js and Python (FastAPI) on the backend.",
      "DSOS (dealership CRM): 122+ REST endpoints with role-based access control, a 3-layer rule-based next-action engine (34 unit tests), Celery/Redis reminders, automated email with retry and real-time notifications.",
      "WhatsApp AI agent: multilingual automated replies for small businesses with voice-note transcription, image understanding, per-customer memory and owner handoff.",
      "MeetScribe: recordings into speaker-labelled transcripts, summaries and Word minutes in a single LLM call, with a pre-check that rejects irrelevant audio to cut cost.",
    ],
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "LLMs"],
  },
  {
    role: "Associate Full Stack Developer",
    company: "Meta Edge Solution",
    place: "Pakistan",
    period: "Nov 2024 – Oct 2025",
    points: [
      "Developed and maintained client web applications using React / Next.js, Node.js / Express, Laravel and MySQL.",
      "Built REST APIs, authentication and admin dashboards, and integrated third-party services and payment gateways.",
      "Worked on Git-based workflows, code reviews, bug fixing and production deployments.",
    ],
    tags: ["React", "Node.js", "Laravel", "MySQL"],
  },
  {
    role: "Frontend Developer Intern",
    company: "Desired Technology",
    place: "Sahiwal",
    period: "May 2024 – Oct 2024",
    points: [
      "Built responsive user interfaces with React, JavaScript and Tailwind CSS from Figma designs.",
      "Connected frontend screens to REST APIs and handled forms, validation and state management.",
      "Fixed UI bugs and improved page performance and cross-browser compatibility.",
    ],
    tags: ["React", "Tailwind", "Figma"],
  },
];

export const projects = [
  {
    name: "DSOS",
    full: "Dealership Sales Operating System",
    desc: "CRM and sales platform for car dealerships: 19 frontend routes, 122+ REST endpoints, RBAC with 133 permissions across 16 modules, a 12-status deal pipeline and a rule-based next-action engine covered by 34 unit tests.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Celery"],
    accent: "#7c5cff",
    featured: true,
  },
  {
    name: "JARVIS",
    full: "WhatsApp AI Assistant",
    desc: "Node.js WhatsApp connector with a FastAPI AI service, a swappable LLM provider, voice-note transcription and per-number conversation memory.",
    stack: ["Node.js", "FastAPI", "Groq LLM", "Whisper"],
    accent: "#22d3ee",
    featured: true,
  },
  {
    name: "MeetScribe",
    full: "AI Meeting Minutes",
    desc: "Turns meeting recordings into speaker-labelled transcripts, summaries and Word minutes in one LLM call, with an audio relevance pre-check to save cost.",
    stack: ["Python", "LLMs", "Speech-to-Text"],
    accent: "#ff4ecd",
    featured: true,
  },
  {
    name: "Baba Mast",
    full: "Atta Chakki E-commerce Store",
    desc: "Storefront and custom admin panel from scratch: product variants, cart, multi-step checkout, full CRUD and a Chart.js sales dashboard.",
    stack: ["Laravel 11", "MySQL", "Tailwind", "Alpine.js"],
    accent: "#34d399",
    featured: false,
  },
  {
    name: "AddBazar",
    full: "Advertising Marketplace (FYP)",
    desc: "Advertising marketplace for Pakistan with three user roles: Admin, Business Owner and Vendor.",
    stack: ["PHP", "MySQL", "Bootstrap 5"],
    accent: "#fb923c",
    featured: false,
  },
  {
    name: "Food Donation",
    full: "Mobile App",
    desc: "Flutter mobile application with real-time data sync on Firebase Firestore.",
    stack: ["Flutter", "Firestore"],
    accent: "#60a5fa",
    featured: false,
  },
];

export const education = {
  degree: "Bachelor of Science in Computer Science (BSCS)",
  school: "Barani Institute of Sciences, Arid University Rawalpindi",
  year: "Graduated 2026",
  cgpa: "3.28",
};

export const certifications = [
  "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents (Udemy)",
  "Generative AI and Artificial Intelligence (AI) for Leaders (Udemy)",
];

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];
