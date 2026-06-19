const fs = require('fs');
const path = require('path');

const appPath = path.resolve('src/app/App.tsx');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Update imports
content = content.replace(
  /import \{ useState, useEffect, useRef \} from "react";\nimport \{ ArrowRight, Mail, Linkedin, ExternalLink, ChevronDown, Send \} from "lucide-react";[\s\S]*?\/\/ ─── Data ───[^\n]*\n/m,
  `import { useState, useEffect, useRef } from "react";
import { ArrowRight, Mail, Linkedin, ExternalLink, ChevronDown, Send, X, FileText, Loader2 } from "lucide-react";

import resumeFile from "../imports/RESUME.pdf";

// ─── Cloudinary Config ───────────────────────────────────────────────────────
const CLOUDINARY_CLOUD_NAME = "YOUR_CLOUD_NAME"; // Replace with your cloud name
const getCloudinaryUrl = (publicId: string, transformations: string = "") => {
  const t = transformations ? \`\${transformations}/\` : "";
  return \`https://res.cloudinary.com/\${CLOUDINARY_CLOUD_NAME}/image/upload/\${t}\${publicId}\`;
};

// ─── Data ────────────────────────────────────────────────────────────────────
export const statsData = [
  { n: "2+", label: "Years designing" },
  { n: "11+", label: "Assets shipped" },
  { n: "3", label: "Clients worked with" },
];

`
);

// 2. Replace image properties with imageId in projects array
content = content.replace(/image: imgReligioGram,/g, 'imageId: "Screenshot_2026-06-19_183437.png",');
content = content.replace(/image: imgFinanceNewYear,/g, 'imageId: "Screenshot_2026-06-19_183327.png",');
content = content.replace(/image: imgFinstreetCountdown,/g, 'imageId: "P_1.jpeg",');
content = content.replace(/image: imgFinstreetHolo,/g, 'imageId: "F.png",');
content = content.replace(/image: imgFinstreetCollage,/g, 'imageId: "FIN.png",');
content = content.replace(/image: imgFinstreetClock,/g, 'imageId: "FINSTREET.png",');
content = content.replace(/image: imgFinstreetEvent,/g, 'imageId: "P_2.jpeg",');
content = content.replace(/image: imgUHTechInfographic,/g, 'imageId: "Screenshot_2026-06-19_184258.png",');
content = content.replace(/image: imgUHTechClientReview,/g, 'imageId: "Screenshot_2026-06-19_184311.png",');
content = content.replace(/image: imgUHTechTestimonials,/g, 'imageId: "Screenshot_2026-06-19_184318.png",');
content = content.replace(/image: imgUHTechMothersDay,/g, 'imageId: "UH_TECH.png",');

// Add the new projects right before the closing bracket of projects array
const newProjects = `
  {
    id: 12,
    group: "FINSTREET",
    title: "FINSTREET'26 — Main Poster",
    description: "Official promotional poster for the upcoming FINSTREET'26 event",
    tag: "Event Poster",
    aspect: "tall",
    imageId: "Poster_-_FINSTREET_26.png",
    accent: "#101010",
  },
  {
    id: 13,
    group: "Finance Club",
    title: "Market Analysis Graphic",
    description: "Detailed market insight and technical analysis visual",
    tag: "Infographic",
    aspect: "square",
    imageId: "Screenshot_2026-06-19_184341.png",
    accent: "#1e1e1e",
  },
  {
    id: 14,
    group: "Finance Club",
    title: "Weekly Wrap-up",
    description: "Summary visual detailing the weekly market performance and highlights",
    tag: "Social Media",
    aspect: "tall",
    imageId: "Screenshot_2026-06-19_184350.png",
    accent: "#2a2a2a",
  },
];`;
content = content.replace(/  \},\n\];/g, '  },' + newProjects);

// 3. Update Nav
content = content.replace(
  /<a\n          href="mailto:prishajha@example\.com"\n          className="hidden md:flex items-center gap-2 bg-foreground text-\[#F5F2ED\] font-\['DM_Sans'\] text-sm px-4 py-2 rounded-full hover:bg-accent transition-colors duration-300"\n        >\n          <Mail size=\{14\} \/>\n          Hire me\n        <\/a>/m,
  `<div className="hidden md:flex items-center gap-4">
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
        </div>`
);

// 4. Update Hero buttons
content = content.replace(
  /<button\n            onClick=\{\(\) => document\.getElementById\("work"\)\?\.scrollIntoView\(\{ behavior: "smooth" \}\)\}[\s\S]*?View work\n          <\/button>/m,
  `<button
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
          </a>`
);

// 5. Update About stats row
content = content.replace(
  /\[\n              \{ n: "2\+", label: "Years designing" \},\n              \{ n: "11\+", label: "Assets shipped" \},\n              \{ n: "3", label: "Clients worked with" \},\n            \]/m,
  `statsData`
);

// 6. Update ProjectCard
content = content.replace(
  /function ProjectCard\(\{ project \}: \{ project: \(typeof projects\)\[0\] \}\) \{/m,
  `function ProjectCard({ project, onClick }: { project: (typeof projects)[0], onClick?: () => void }) {`
);

content = content.replace(
  /<article\n      className="group cursor-pointer"/m,
  `<article\n      className="group cursor-pointer" onClick={onClick}`
);

content = content.replace(
  /src=\{project\.image\}/m,
  `src={getCloudinaryUrl(project.imageId, "f_auto,q_auto,c_fill,g_auto,w_800")}`
);

// 7. Update Work component
content = content.replace(
  /function Work\(\) \{/m,
  `function Work() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);`
);

content = content.replace(
  /<ProjectCard project=\{p\} \/>/m,
  `<ProjectCard project={p} onClick={() => setSelectedProject(p)} />`
);

content = content.replace(
  /<\/div>\n    <\/section>/m,
  `</div>
      
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
                src={getCloudinaryUrl(selectedProject.imageId, "f_auto,q_auto")} 
                alt={selectedProject.title}
                className="max-h-[80vh] w-auto object-contain relative z-10"
                loading="eager"
              />
            </div>
            <div className="w-full md:w-80 bg-[#161616] p-8 flex flex-col shrink-0">
              <div className="mb-6">
                <span className={\`inline-block font-['DM_Sans'] text-xs px-2.5 py-1 rounded-full mb-4 \${tagColors[selectedProject.tag] ?? "bg-secondary text-foreground"}\`}>
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

    </section>`
);

// 8. Update Experience
content = content.replace(
  /title: "B\.Tech — Quantum Engineering & Device Sciences",\n      org: "BIT Mesra, Ranchi",\n      period: "2023 — 2027",/m,
  `title: "Integrated M.Tech — Quantum Engineering & Device Sciences (QEDS)",
      org: "BIT Mesra, Ranchi",
      period: "2025 — 2030",`
);

// 9. Update Contact info
content = content.replace(
  /<a\n                href="mailto:prishajha@example\.com"/m,
  `<a\n                href="mailto:prishajha.professional@gmail.com"`
);
content = content.replace(
  /prishajha@example\.com/m, // Only the display text remains to be replaced here
  `prishajha.professional@gmail.com`
);

content = content.replace(
  /href="https:\/\/linkedin\.com\/in\/prisha-jha"/m,
  `href="https://www.linkedin.com/in/prisha-jha-67889a3b0/"`
);
content = content.replace(
  /linkedin\.com\/in\/prisha-jha/m,
  `linkedin.com/in/prisha-jha-67889a3b0`
);

// 10. Update Form submission logic
content = content.replace(
  /const \[sent, setSent\] = useState\(false\);\n\n  const handleSubmit = \(e: React\.FormEvent\) => \{\n    e\.preventDefault\(\);\n    setSent\(true\);\n    setForm\(\{ name: "", email: "", message: "" \}\);\n    setTimeout\(\(\) => setSent\(false\), 4000\);\n  \};/m,
  `const [sent, setSent] = useState(false);
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
  };`
);

content = content.replace(
  /<button\n                  type="submit"\n                  className="group w-full flex items-center justify-center gap-3 bg-accent text-accent-foreground font-\['DM_Sans'\] text-sm font-medium py-4 rounded-full hover:bg-\[#F5F2ED\] hover:text-foreground transition-all duration-300"\n                >\n                  Send message\n                  <Send\n                    size=\{15\}\n                    className="group-hover:translate-x-1 transition-transform"\n                  \/>\n                <\/button>/m,
  `{error && (
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
                </button>`
);

fs.writeFileSync(appPath, content, 'utf8');
console.log('App.tsx updated successfully.');
