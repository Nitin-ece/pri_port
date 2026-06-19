const fs = require('fs');
const path = require('path');

const appPath = path.resolve('src/app/App.tsx');
let content = fs.readFileSync(appPath, 'utf8');

const modalString = `      
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
      )}`;

content = content.replace(modalString, '');

const replaceTarget = `<div key={p.id} className="break-inside-avoid">
              <ProjectCard project={p} onClick={() => setSelectedProject(p)} />
            </div>
          ))}
        </div>
      </div>
    </section>`;

const newContent = `<div key={p.id} className="break-inside-avoid">
              <ProjectCard project={p} onClick={() => setSelectedProject(p)} />
            </div>
          ))}
        </div>
      </div>
${modalString}
    </section>`;

content = content.replace(replaceTarget, newContent);

fs.writeFileSync(appPath, content, 'utf8');
console.log('Fixed Lightbox placement');
