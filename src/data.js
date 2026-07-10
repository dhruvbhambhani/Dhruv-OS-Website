export const profile = {
  name: "Dhruv Bhambhani",
  email: "dhruvbhambhani@tamu.edu",
  github: "https://github.com/dhruvbhambhani",
  linkedin: "https://www.linkedin.com/in/dhruvbhambhani05",
  updated: "07/06/2026",
}

export const experience = [
  {
    role: "R&D Software Engineering Intern",
    company: "Powell Industries · Houston, TX",
    period: "May 2026 – Present",
    monogram: "PI",
    logo: "/powell-logo.png",
    description:
      "Prototyped a local RAG pipeline (LangChain, Ollama Llama 3, ChromaDB) across 500+ technical docs, then productionized it in the Snowflake ecosystem with Cortex Search and product-line AI agents — 200+ queries/day at 95% accuracy. Demoed 8 weeks ahead of schedule with a custom Streamlit front-end, preserving 75+ years of institutional knowledge.",
    tags: ["LangChain", "Ollama", "ChromaDB", "Snowflake", "RAG", "Streamlit"],
  },
  {
    role: "Lead Applied AI Researcher",
    company: "SUCCESS Lab, Texas A&M",
    period: "Apr 2026 – Present",
    monogram: "SL",
    logo: "/tamu-logo.png",
    description:
      "Researching a multi-tiered LLM agentic architecture integrating NVIDIA Nemotron with the OpenClaw framework for multi-robot coordination across ROS and ESP32 micro-ROS nodes. Architected a security layer defending against prompt injection, context manipulation, and cross-layer exploitation in physical robotics environments, based on a 470-advisory taxonomy.",
    tags: ["NVIDIA Nemotron", "OpenClaw", "ROS", "micro-ROS", "LLM Security"],
  },
  {
    role: "Computational AI Researcher",
    company: "DIGIT Lab, Texas A&M",
    period: "Apr 2026 – Present",
    monogram: "DL",
    logo: "/tamu-logo.png",
    description:
      "Co-authoring an NSF-funded ($500K) research paper on interpretable ML for mechanical engineering design rules — extending a 1D interpretability framework to 2D interaction effects with a PS-Tree symbolic regression pipeline decoding pairwise feature interactions from an energy-based model predicting UTS.",
    tags: ["Interpretable ML", "Symbolic Regression", "PS-Tree", "Python"],
  },
  {
    role: "Web Developer & Robotics Engineer",
    company: "TURTLE Robotics, Texas A&M",
    period: "Aug 2025 – Present",
    monogram: "TR",
    logo: "/turtle-logo.png",
    description:
      "Full-stack development for a 350+ member robotics organization — Supabase-backed member database and a fine-tuned Gemini onboarding chatbot (+40% project engagement). Built an ESP32 robot with wireless joystick input, PWM motor control, and a servo-actuated claw.",
    tags: ["React", "Supabase", "Gemini LLM", "ESP32", "C++"],
  },
  {
    role: "Software Engineering Intern",
    company: "JBB Asset Management LLC · Houston, TX",
    period: "May 2024 – Aug 2024",
    monogram: "JB",
    description:
      "Architected a multi-tenant web ecosystem of 5 distributed full-stack apps (Next.js, Node.js, Supabase PostgreSQL) centralizing operations for a 500+ unit real estate portfolio. Built a document-synthesis pipeline compiling legally-compliant lease agreements and a LangChain + Redis multi-agent framework for maintenance ticket dispatch.",
    tags: ["Next.js", "Node.js", "Supabase", "Flask", "LangChain", "Redis"],
    link: {
      label: "JBB Asset Management",
      sub: "jbbassetmanagement.com",
      href: "https://www.jbbassetmanagement.com/",
    },
  },
]

export const projects = [
  {
    title: "CRYOS · TAMUHack26 — Runners-up, USAA Track",
    period: "Jan 2026",
    meta: "Hackathon",
    href: "https://github.com/VedSoni-dev/cryos",
  },
  {
    title: "EDEN Robotics — Humanoid Cognitive Architecture (Funded by Texas A&M)",
    period: "Jan 2026 – Present",
    meta: "Robotics",
    href: "https://github.com/EDEN-robotics",
  },
  {
    title: "Crescent Place Apartments Website",
    period: "Jan 2026 – Present",
    meta: "Real Estate",
    href: "https://www.crescentplaceapartments.com/",
  },
  {
    title: "Pier Club Apartments Website",
    period: "Jan 2026 – Present",
    meta: "Real Estate",
    href: "https://www.pierclubapartments.com/",
  },
  {
    title: "JBB Asset Management Website",
    period: "Oct 2025 – Present",
    meta: "Web",
    href: "https://www.jbbassetmanagement.com/",
  },
]

export const volunteering = [
  {
    role: "Web Developer",
    company: "Aggie Coding Club, Texas A&M",
    period: "Jan 2025 – May 2025",
    monogram: "AC",
    description:
      "Full-stack development for the NPC Room project — React frontend with a Java, Spring Boot, and MongoDB backend.",
    tags: ["React", "Java", "Spring Boot", "MongoDB"],
  },
  {
    role: "Data Analyst",
    company: "Aggie Data Science Club, Texas A&M",
    period: "Jan 2025 – May 2025",
    monogram: "DS",
    description:
      "Cleaned data and simulated operation efficiency using Random Forest, XGBoost, and KNN regression for the Chemical Plant Simulation & Automation project.",
    tags: ["Python", "Random Forest", "XGBoost", "ML"],
  },
]
