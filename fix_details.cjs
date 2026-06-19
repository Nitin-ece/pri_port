const fs = require('fs');
const path = require('path');

const appPath = path.resolve('src/app/App.tsx');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Fix About section text
content = content.replace(
  /Quantum Engineering &amp; Device Sciences/g,
  'Quantitative Economics and Data Science'
);
content = content.replace(
  /Quantum Engineering\s+at BIT Mesra/g,
  'Quantitative Economics and Data Science\n          at BIT Mesra'
);

// 2. Fix Experience section (Degree)
content = content.replace(
  /Integrated M\.Tech — Quantum Engineering & Device Sciences \(QEDS\)/g,
  'Integrated M.Tech — Quantitative Economics and Data Science (QEDS)'
);

// 3. Fix Experience section (Finance Club)
content = content.replace(
  /org: "Finance Club, BIT Mesra",\n\s*period: "2025 — Present",/g,
  'org: "Finance Club, BIT Mesra",\n      period: "2024 — 2025",'
);

// 4. Fix Project 13
content = content.replace(
  /group: "Finance Club",\n\s*title: "Market Analysis Graphic",\n\s*description: "Detailed market insight and technical analysis visual",\n\s*tag: "Infographic",/g,
  \`group: "Educational",
    title: "Physics Educational Diagram — Spring Mass System",
    description: "Detailed vector diagram illustrating a spring-mass physical system for educational materials",
    tag: "Edu Design",\`
);

// 5. Fix Project 14
content = content.replace(
  /group: "Finance Club",\n\s*title: "Weekly Wrap-up",\n\s*description: "Summary visual detailing the weekly market performance and highlights",\n\s*tag: "Social Media",/g,
  \`group: "Educational",
    title: "Physics Educational Diagram — Collision",
    description: "Educational graphic depicting a collision scenario on a smooth floor for academic reference",
    tag: "Edu Design",\`
);

fs.writeFileSync(appPath, content, 'utf8');
console.log('Fixed degree, club period, and edu project details.');
