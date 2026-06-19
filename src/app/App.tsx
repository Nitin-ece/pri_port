import { useState, useEffect, useRef } from "react";
import { ArrowRight, Mail, Linkedin, ExternalLink, ChevronDown, Send, X, FileText, Loader2 } from "lucide-react";

import resumeFile from "../imports/RESUME.pdf";

import imgReligioGram from "../imports/Screenshot_2026-06-19_183437.png";
import imgFinanceNewYear from "../imports/Screenshot_2026-06-19_183327.png";
import imgFinstreetCountdown from "../imports/P_1.jpeg";
import imgFinstreetEvent from "../imports/P_2.jpeg";
import imgFinstreetHolo from "../imports/F.png";
import imgFinstreetCollage from "../imports/FIN.png";
import imgFinstreetClock from "../imports/FINSTREET.png";
import imgUHTechInfographic from "../imports/Screenshot_2026-06-19_184258.png";
import imgUHTechClientReview from "../imports/Screenshot_2026-06-19_184311.png";
import imgUHTechTestimonials from "../imports/Screenshot_2026-06-19_184318.png";
import imgUHTechMothersDay from "../imports/UH_TECH.png";
import imgFinstreetMain from "../imports/Poster_-_FINSTREET_26.png";
import imgMarketAnalysis from "../imports/Screenshot_2026-06-19_184341.png";
import imgWeeklyWrapup from "../imports/Screenshot_2026-06-19_184350.png";

// ─── Data ────────────────────────────────────────────────────────────────────
const statsData = [
  { n: "2+", label: "Years designing" },
  { n: "11+", label: "Assets shipped" },
  { n: "3", label: "Clients worked with" },
];


const projects = [
  {
    id: 1,
    group: "ReligioGram",
    title: "ReligioGram — Logo Design",
    description: "Primary brand mark for a spiritual traditions platform — gold letterform with lantern motifs on deep navy",
    tag: "Logo Design",
    aspect: "tall",
    image: imgReligioGram,
    accent: "#1a237e",
  },
  {
    id: 2,
    group: "Finance Club",
    title: "Finance Club — New Year 2026",
    description: "Festive social post for BIT Mesra Finance Club, gold typography on dark with firework bursts",
    tag: "Social Media",
    aspect: "tall",
    image: imgFinanceNewYear,
    accent: "#1a1a2e",
  },
  {
    id: 3,
    group: "FINSTREET",
    title: "FINSTREET — 9 Days to Go (Dark)",
    description: "Countdown poster — candlestick chart overlay, cinematic vertical black bars, Finance Club branding",
    tag: "Event Poster",
    aspect: "tall",
    image: imgFinstreetCountdown,
    accent: "#0d1b2a",
  },
  {
    id: 4,
    group: "FINSTREET",
    title: "FINSTREET — 9 Days to Go (Holographic)",
    description: "Glitch-art treatment — holographic numeral, neon cyan bars, currency symbols scattered across field",
    tag: "Event Poster",
    aspect: "tall",
    image: imgFinstreetHolo,
    accent: "#001a2e",
  },
  {
    id: 5,
    group: "FINSTREET",
    title: "FINSTREET — 9 Days to Go (Collage)",
    description: "Editorial photo-collage — finance imagery fragments arranged around an oversized countdown digit",
    tag: "Event Poster",
    aspect: "tall",
    image: imgFinstreetCollage,
    accent: "#1a0f0a",
  },
  {
    id: 6,
    group: "FINSTREET",
    title: "FINSTREET — 0.5 Days to Go",
    description: "Atmospheric final countdown — crumbling antique clock under teal moonlight, surreal compositing",
    tag: "Event Poster",
    aspect: "tall",
    image: imgFinstreetClock,
    accent: "#052a2e",
  },

  {
    id: 8,
    group: "UH Tech",
    title: "UH Tech — Brand Infographic",
    description: "Visual brand statement with trust metrics and pie-chart data storytelling",
    tag: "Infographic",
    aspect: "tall",
    image: imgUHTechInfographic,
    accent: "#2c2c2c",
  },
  {
    id: 9,
    group: "UH Tech",
    title: "UH Tech — Client Review Poster",
    description: "Warm minimal editorial card showcasing client-first positioning for social distribution",
    tag: "Social Media",
    aspect: "tall",
    image: imgUHTechClientReview,
    accent: "#5c4a32",
  },
  {
    id: 10,
    group: "UH Tech",
    title: "UH Tech — Testimonials Graphic",
    description: "Screenshotted client praise repackaged into a shareable 5-star testimonial visual",
    tag: "Social Media",
    aspect: "square",
    image: imgUHTechTestimonials,
    accent: "#2c2c2c",
  },
  {
    id: 11,
    group: "UH Tech",
    title: "UH Tech — Mother's Day",
    description: "Warm occasion graphic — soft photography with hand-lettered script and brand overlay",
    tag: "Occasion Post",
    aspect: "tall",
    image: imgUHTechMothersDay,
    accent: "#7a4f3a",
  },
  {
    id: 12,
    group: "FINSTREET",
    title: "FINSTREET'26 — Main Poster",
    description: "Official promotional poster for the upcoming FINSTREET'26 event",
    tag: "Event Poster",
    aspect: "tall",
    image: imgFinstreetMain,
    accent: "#101010",
  },
  {
    id: 13,
    group: "Academic",
    title: "Physics Educational Diagram",
    description: "Educational vector diagram illustrating a spring-mass physical system",
    tag: "Edu Design",
    aspect: "square",
    image: imgMarketAnalysis,
    accent: "#1e1e1e",
  },
  {
    id: 14,
    group: "Academic",
    title: "Collision Educational Diagram",
    description: "Educational graphic depicting a collision scenario on a smooth floor",
    tag: "Edu Design",
    aspect: "tall",
    image: imgWeeklyWrapup,
    accent: "#2a2a2a",
  },
];

const skills = ["Figma", "Canva", "C", "C++", "Python", "R", "NumPy", "Flask"];

const tagColors: Record<string, string> = {
  "Logo Design": "bg-amber-100 text-amber-800",
  "Social Media": "bg-rose-100 text-rose-800",
  "Event Poster": "bg-blue-100 text-blue-800",
  "Infographic": "bg-violet-100 text-violet-800",
  "Occasion Post": "bg-pink-100 text-pink-800",
  "Edu Design": "bg-emerald-100 text-emerald-800",
};

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 100;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrollY) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);
  return active;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Components ───────────────────────────────────────────────────────────────

function Nav({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["about", "work", "experience", "contact"];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#F5F2ED]/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-['Playfair_Display'] text-lg font-semibold tracking-tight text-foreground hover:text-accent transition-colors"
        >
          {/* Logo Removed */}
        </button>
        <div className="hidden md:flex items-center gap-8">
          {links.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`font-['DM_Sans'] text-sm tracking-wide capitalize transition-colors ${
                active === id
                  ? "text-accent font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {id}
            </button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a
            href={resumeFile}
            download="Prisha_Jha_Resume.pdf"
            className="flex items-center gap-2 text-foreground font-['DM_Sans'] text-sm hover:text-accent transition-colors duration-300"
          >
            <FileText size={14} />
            Download Resume
          </a>
          <a
            href="mailto:prishajha.professional@gmail.com"
            className="flex items-center gap-2 bg-foreground text-[#F5F2ED] font-['DM_Sans'] text-sm px-4 py-2 rounded-full hover:bg-accent transition-colors duration-300"
          >
            <Mail size={14} />
            Hire me
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-start justify-end pb-24 px-6 pt-32 max-w-6xl mx-auto"
    >
      {/* decorative number removed */}

      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-accent" />
          <span className="font-['DM_Mono'] text-xs uppercase tracking-[0.2em] text-accent">
            Available for freelance
          </span>
        </div>

        <h1 className="font-['Playfair_Display'] text-[clamp(3rem,8vw,7rem)] leading-[1.05] font-semibold text-foreground mb-6">
          Prisha
          <br />
          <em className="italic text-accent">Jha.</em>
        </h1>

        <p className="font-['DM_Sans'] text-xl font-light text-muted-foreground mb-4 tracking-wide">
          Graphic Designer &nbsp;·&nbsp; UI/UX Visuals
        </p>

        <p className="font-['DM_Sans'] text-base text-muted-foreground max-w-lg leading-relaxed mb-12">
          Crafting visual identities and digital experiences where design
          thinking meets precision — student of Quantitative Economics and Data Science
          at BIT Mesra, designer at UH Tech.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3 bg-foreground text-[#F5F2ED] font-['DM_Sans'] text-sm font-medium px-7 py-4 rounded-full hover:bg-accent transition-all duration-300"
          >
            Get in touch
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-3 border border-border font-['DM_Sans'] text-sm font-medium px-7 py-4 rounded-full hover:border-foreground transition-colors duration-300 text-foreground"
          >
            View work
          </button>
          <a
            href={resumeFile}
            download="Prisha_Jha_Resume.pdf"
            className="flex items-center gap-3 border border-border font-['DM_Sans'] text-sm font-medium px-7 py-4 rounded-full hover:border-foreground transition-colors duration-300 text-foreground"
          >
            View Resume
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-10 right-6 flex flex-col items-center gap-2 opacity-50">
        <span className="font-['DM_Mono'] text-[10px] tracking-[0.2em] text-muted-foreground rotate-90 mb-4">
          scroll
        </span>
        <ChevronDown size={16} className="text-muted-foreground animate-bounce" />
      </div>

      {/* horizontal rule */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-border" />
    </section>
  );
}

function About() {
  const { ref, inView } = useInView();
  return (
    <section id="about" className="py-28 px-6 max-w-6xl mx-auto" ref={ref}>
      <div
        className={`grid md:grid-cols-[1fr_2fr] gap-16 lg:gap-24 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* left */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-accent" />
            <span className="font-['DM_Mono'] text-xs uppercase tracking-[0.2em] text-accent">
              About
            </span>
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl font-semibold text-foreground leading-tight">
            Design as a
            <br />
            <em className="italic">discipline.</em>
          </h2>
        </div>

        {/* right */}
        <div className="space-y-8">
          <p className="font-['DM_Sans'] text-base leading-relaxed text-foreground/80">
            I&apos;m Prisha Jha — a graphic designer and student in{" "}
            <span className="font-medium text-foreground">
              Quantitative Economics and Data Science
            </span>{" "}
            at BIT Mesra, Ranchi. Currently interning as a Graphic Design Intern
            at{" "}
            <span className="font-medium text-foreground">UH Tech</span>, where
            I create visual assets and UI concepts for digital products and
            events.
          </p>
          <p className="font-['DM_Sans'] text-base leading-relaxed text-foreground/80">
            My background in data science shapes how I approach design — with
            systems thinking, iteration, and precision. Whether it&apos;s building a
            brand identity from scratch or prototyping a UI flow, I care about
            the details that make things feel considered.
          </p>

          {/* skills */}
          <div>
            <p className="font-['DM_Mono'] text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Tools &amp; Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="font-['DM_Sans'] text-sm px-3 py-1.5 bg-secondary border border-border rounded-full text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-200 cursor-default"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* stats row */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border">
            {statsData.map(({ n, label }) => (
              <div key={label}>
                <p className="font-['Playfair_Display'] text-3xl font-semibold text-foreground">
                  {n}
                </p>
                <p className="font-['DM_Sans'] text-xs text-muted-foreground mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}

function ProjectCard({ project, onClick }: { project: (typeof projects)[0], onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group cursor-pointer" onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl bg-secondary mb-4">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-auto block transition-transform duration-700 ${
            hovered ? "scale-105" : "scale-100"
          }`}
          loading="lazy"
        />
        {/* overlay */}
        <div
          className={`absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `linear-gradient(to top, ${project.accent}f0 0%, ${project.accent}80 40%, transparent 70%)`,
          }}
        >
          <p className="font-['DM_Sans'] text-white text-sm font-light leading-snug">
            {project.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <ExternalLink size={13} className="text-white/80" />
            <span className="font-['DM_Mono'] text-white/80 text-xs">
              View project
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-['DM_Sans'] text-sm font-medium text-foreground leading-snug">
            {project.title}
          </p>
          <p className="font-['DM_Mono'] text-xs text-muted-foreground mt-0.5">
            {project.group}
          </p>
        </div>
        <span
          className={`shrink-0 font-['DM_Sans'] text-xs px-2.5 py-1 rounded-full ${
            tagColors[project.tag] ?? "bg-secondary text-foreground"
          }`}
        >
          {project.tag}
        </span>
      </div>
    </article>
  );
}

function Work() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const groups = ["All", "UH Tech", "FINSTREET", "Finance Club", "Academic", "ReligioGram"];
  const [active, setActive] = useState("All");
  const { ref, inView } = useInView(0.05);

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.group === active);

  return (
    <section id="work" className="py-28 px-6 max-w-6xl mx-auto" ref={ref}>
      <div
        className={`transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent" />
              <span className="font-['DM_Mono'] text-xs uppercase tracking-[0.2em] text-accent">
                Work
              </span>
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl font-semibold text-foreground">
              Selected projects.
            </h2>
          </div>

          {/* filter tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {groups.map((g) => (
              <button
                key={g}
                onClick={() => setActive(g)}
                className={`font-['DM_Sans'] text-sm px-4 py-2 rounded-full border transition-all duration-200 ${
                  active === g
                    ? "bg-foreground text-[#F5F2ED] border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((p) => (
            <div key={p.id} className="break-inside-avoid">
              <ProjectCard project={p} onClick={() => setSelectedProject(p)} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedProject(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full max-h-[90vh] bg-[#111] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 bg-black/50 flex items-center justify-center p-4 min-h-[40vh] relative">
              <Loader2 className="absolute animate-spin text-white/30" size={32} />
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="max-h-[80vh] w-auto object-contain relative z-10"
                loading="eager"
              />
            </div>
            <div className="w-full md:w-80 bg-[#161616] p-8 flex flex-col shrink-0">
              <div className="mb-6">
                <span className={`inline-block font-['DM_Sans'] text-xs px-2.5 py-1 rounded-full mb-4 ${tagColors[selectedProject.tag] ?? "bg-secondary text-foreground"}`}>
                  {selectedProject.tag}
                </span>
                <h3 className="font-['Playfair_Display'] text-2xl text-white mb-2 leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="font-['DM_Mono'] text-sm text-white/50">
                  {selectedProject.group}
                </p>
              </div>
              <p className="font-['DM_Sans'] text-white/80 leading-relaxed text-sm flex-1">
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Experience() {
  const { ref, inView } = useInView();
  const items = [
    {
      type: "work",
      title: "Graphic Design Intern",
      org: "UH Tech",
      period: "Jan 2026 — Present",
      desc: "Creating social media graphics, brand infographics, occasion posts, and client testimonial assets for a university-affiliated technology organization. Work spans Instagram-first verticals, trust-building collateral, and seasonal campaigns.",
      tags: ["Canva", "Social Media", "Brand", "Infographic"],
    },
    {
      type: "edu",
      title: "Integrated M.Sc — Quantitative Economics and Data Science (QEDS)",
      org: "BIT Mesra, Ranchi",
      period: "2025 — 2030",
      desc: "Pursuing a specialized program bridging quantitative economics and data science. Coursework includes Python, C/C++, R, and numerical methods.",
      tags: ["QEDS", "BIT Mesra", "Python", "C++"],
    },
  ];

  return (
    <section id="experience" className="py-28 px-6 max-w-6xl mx-auto" ref={ref}>
      <div
        className={`transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-accent" />
          <span className="font-['DM_Mono'] text-xs uppercase tracking-[0.2em] text-accent">
            Experience
          </span>
        </div>
        <h2 className="font-['Playfair_Display'] text-4xl font-semibold text-foreground mb-16">
          Background.
        </h2>

        {/* timeline */}
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-border hidden md:block" />

          <div className="space-y-12">
            {items.map((item, i) => (
              <div key={i} className="md:pl-12 relative">
                {/* dot */}
                <div
                  className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 hidden md:flex items-center justify-center ${
                    item.type === "work"
                      ? "bg-accent border-accent"
                      : "bg-card border-border"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.type === "work" ? "bg-accent-foreground" : "bg-muted-foreground"
                    }`}
                  />
                </div>

                <div className="bg-card border border-border rounded-2xl p-7 hover:border-accent/40 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-['DM_Sans'] font-semibold text-foreground text-base">
                        {item.title}
                      </h3>
                      <p className="font-['DM_Sans'] text-accent text-sm font-medium mt-0.5">
                        {item.org}
                      </p>
                    </div>
                    <span className="font-['DM_Mono'] text-xs text-muted-foreground whitespace-nowrap bg-secondary px-3 py-1.5 rounded-full">
                      {item.period}
                    </span>
                  </div>
                  <p className="font-['DM_Sans'] text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="font-['DM_Mono'] text-xs px-2.5 py-1 bg-secondary rounded-md text-foreground/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("https://formspree.io/f/YOUR_ENDPOINT_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 5000);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-28 px-6 bg-foreground text-[#F5F2ED]"
      ref={ref}
    >
      <div
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          {/* left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent" />
              <span className="font-['DM_Mono'] text-xs uppercase tracking-[0.2em] text-accent">
                Contact
              </span>
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl font-semibold leading-tight mb-6">
              Let&apos;s make
              <br />
              <em className="italic text-accent">something</em>
              <br />
              together.
            </h2>
            <p className="font-['DM_Sans'] text-sm text-[#F5F2ED]/60 leading-relaxed mb-10">
              Open to freelance projects, collaborations, and internship
              opportunities. Drop a message or reach out directly.
            </p>

            <div className="space-y-5">
              <a
                href="mailto:prishajha.professional@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5F2ED]/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Mail size={16} className="text-[#F5F2ED]" />
                </div>
                <div>
                  <p className="font-['DM_Mono'] text-xs text-[#F5F2ED]/40 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="font-['DM_Sans'] text-sm text-[#F5F2ED] group-hover:text-accent transition-colors">
                    prishajha.professional@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/prisha-jha-67889a3b0/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5F2ED]/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Linkedin size={16} className="text-[#F5F2ED]" />
                </div>
                <div>
                  <p className="font-['DM_Mono'] text-xs text-[#F5F2ED]/40 uppercase tracking-wider">
                    LinkedIn
                  </p>
                  <p className="font-['DM_Sans'] text-sm text-[#F5F2ED] group-hover:text-accent transition-colors">
                    linkedin.com/in/prisha-jha-67889a3b0
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* right — form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <Send size={20} className="text-accent" />
                </div>
                <p className="font-['Playfair_Display'] text-2xl text-[#F5F2ED] mb-2">
                  Message sent!
                </p>
                <p className="font-['DM_Sans'] text-sm text-[#F5F2ED]/50">
                  I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {(
                  [
                    { id: "name", label: "Your name", type: "text" },
                    { id: "email", label: "Email address", type: "email" },
                  ] as const
                ).map(({ id, label, type }) => (
                  <div key={id}>
                    <label
                      htmlFor={id}
                      className="font-['DM_Mono'] text-xs text-[#F5F2ED]/40 uppercase tracking-wider block mb-2"
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      required
                      value={form[id as "name" | "email"]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [id]: e.target.value }))
                      }
                      className="w-full bg-[#F5F2ED]/10 border border-[#F5F2ED]/15 rounded-lg px-4 py-3 font-['DM_Sans'] text-sm text-[#F5F2ED] placeholder-[#F5F2ED]/30 focus:outline-none focus:border-accent transition-colors"
                      placeholder={type === "email" ? "you@email.com" : "Priya S."}
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="message"
                    className="font-['DM_Mono'] text-xs text-[#F5F2ED]/40 uppercase tracking-wider block mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="w-full bg-[#F5F2ED]/10 border border-[#F5F2ED]/15 rounded-lg px-4 py-3 font-['DM_Sans'] text-sm text-[#F5F2ED] placeholder-[#F5F2ED]/30 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                {error && (
                  <p className="text-red-400 font-['DM_Sans'] text-sm text-center mb-2">
                    Something went wrong. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full flex items-center justify-center gap-3 bg-accent text-accent-foreground font-['DM_Sans'] text-sm font-medium py-4 rounded-full hover:bg-[#F5F2ED] hover:text-foreground transition-all duration-300 disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send message"}
                  {!loading && (
                    <Send
                      size={15}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* footer strip */}
        <div className="mt-20 pt-8 border-t border-[#F5F2ED]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['DM_Sans'] text-xs text-[#F5F2ED]/30">
            © 2026 Prisha Jha. All rights reserved.
          </p>
          <p className="font-['DM_Mono'] text-xs text-[#F5F2ED]/30">
            Designed &amp; built with intention.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const active = useScrollSpy(["hero", "about", "work", "experience", "contact"]);

  return (
    <div className="bg-background min-h-screen overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Nav active={active} />
      <Hero />
      <About />
      <Work />
      <Experience />
      <Contact />
    </div>
  );
}
