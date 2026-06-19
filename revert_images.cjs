const fs = require('fs');
const path = require('path');

const appPath = path.resolve('src/app/App.tsx');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Remove Cloudinary logic and add static imports
const oldImports = `// ─── Cloudinary Config ───────────────────────────────────────────────────────
const CLOUDINARY_CLOUD_NAME = "YOUR_CLOUD_NAME"; // Replace with your cloud name
const getCloudinaryUrl = (publicId: string, transformations: string = "") => {
  const t = transformations ? \`\${transformations}/\` : "";
  return \`https://res.cloudinary.com/\${CLOUDINARY_CLOUD_NAME}/image/upload/\${t}\${publicId}\`;
};`;

const newImports = `import imgReligioGram from "../imports/Screenshot_2026-06-19_183437.png";
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
import imgWeeklyWrapup from "../imports/Screenshot_2026-06-19_184350.png";`;

content = content.replace(oldImports, newImports);

// 2. Revert imageId back to image in projects array
content = content.replace(/imageId: "Screenshot_2026-06-19_183437\.png",/g, 'image: imgReligioGram,');
content = content.replace(/imageId: "Screenshot_2026-06-19_183327\.png",/g, 'image: imgFinanceNewYear,');
content = content.replace(/imageId: "P_1\.jpeg",/g, 'image: imgFinstreetCountdown,');
content = content.replace(/imageId: "F\.png",/g, 'image: imgFinstreetHolo,');
content = content.replace(/imageId: "FIN\.png",/g, 'image: imgFinstreetCollage,');
content = content.replace(/imageId: "FINSTREET\.png",/g, 'image: imgFinstreetClock,');
content = content.replace(/imageId: "P_2\.jpeg",/g, 'image: imgFinstreetEvent,');
content = content.replace(/imageId: "Screenshot_2026-06-19_184258\.png",/g, 'image: imgUHTechInfographic,');
content = content.replace(/imageId: "Screenshot_2026-06-19_184311\.png",/g, 'image: imgUHTechClientReview,');
content = content.replace(/imageId: "Screenshot_2026-06-19_184318\.png",/g, 'image: imgUHTechTestimonials,');
content = content.replace(/imageId: "UH_TECH\.png",/g, 'image: imgUHTechMothersDay,');
content = content.replace(/imageId: "Poster_-_FINSTREET_26\.png",/g, 'image: imgFinstreetMain,');
content = content.replace(/imageId: "Screenshot_2026-06-19_184341\.png",/g, 'image: imgMarketAnalysis,');
content = content.replace(/imageId: "Screenshot_2026-06-19_184350\.png",/g, 'image: imgWeeklyWrapup,');

// 3. Revert ProjectCard src
content = content.replace(/src=\{getCloudinaryUrl\(project\.imageId, "f_auto,q_auto,c_fill,g_auto,w_800"\)\}/g, 'src={project.image}');

// 4. Revert Lightbox modal src
content = content.replace(/src=\{getCloudinaryUrl\(selectedProject\.imageId, "f_auto,q_auto"\)\}/g, 'src={selectedProject.image}');

fs.writeFileSync(appPath, content, 'utf8');

// Also update index.html
const htmlPath = path.resolve('index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');
htmlContent = htmlContent.replace(/<meta property="og:image" content="https:\/\/res.cloudinary.com\/YOUR_CLOUD_NAME\/image\/upload\/f_auto,q_auto\/Poster_-_FINSTREET_26\.png" \/>/g, '<meta property="og:image" content="/src/imports/Poster_-_FINSTREET_26.png" />');
htmlContent = htmlContent.replace(/<link rel="icon" type="image\/png" href="https:\/\/res.cloudinary.com\/YOUR_CLOUD_NAME\/image\/upload\/w_32,h_32,c_fill,g_auto\/Screenshot_2026-06-19_183437\.png" \/>/g, '<link rel="icon" type="image/png" href="/src/imports/Screenshot_2026-06-19_183437.png" />');
fs.writeFileSync(htmlPath, htmlContent, 'utf8');

console.log('Reverted to local images');
