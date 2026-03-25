document.addEventListener('DOMContentLoaded', () => {

    const projectsData = {
        "1": {
            title: "Jewel Whisperer",
            short_desc: "AI-powered conversational recommendation system designed to provide personalized jewelry suggestions based on user preferences and cultural context.",
            problem: "Traditional jewelry platforms rely on browsing and filtering, which makes decision-making overwhelming and inefficient. They lack personalization and contextual understanding for occasions.",
            solution: "Designed a conversational interface that interacts with users and dynamically generates recommendations using the Gemini language model. Focused on <strong>simplifying decision-making</strong> through guided interaction instead of traditional browsing.",
            architecture: ["User Input (Text/Voice)", "Frontend Interface", "Gemini API", "Response Processing", "UI Rendering"],
            features: [
                "<strong>Personalized recommendations</strong> paired with price filtering constraints",
                "<strong>Occasion-based suggestions</strong> incorporating wishlist functionality",
                "Built-in comparison tool alongside native Voice input support"
            ],
            outcome: "Developed systems focused on integrating AI into user-facing product flows, successfully balancing strict rule-based filtering with the flexibility of language models.",
            github: "https://github.com/Priyam2709/jewel_whisper",
            live: ""
        },
        "2": {
            title: "Movie Recommendation System",
            short_desc: "A hybrid recommendation system that combines content-based and collaborative filtering techniques to deliver personalized movie suggestions.",
            problem: "Single-method recommendation systems often fail to provide accurate suggestions due to limited context or lack of user similarity data.",
            solution: "Designed a <strong>Hybrid approach</strong> model that leverages both content similarity (TF-IDF, cosine similarity) and collaborative filtering (SVD++) to drastically improve recommendation accuracy and mitigate cold-start issues.",
            architecture: ["User Preferences", "Feature Extraction", "Content Filtering + Collaborative Model", "Combined Output", "UI"],
            features: [
                "<strong>Hybrid filtering approach</strong> to generate multi-dimensional predictions",
                "Dynamic suggestion engines targeting historical user preference weighting",
                "Scalable modular design preventing architectural lock-in"
            ],
            outcome: "Gained practical experience in building and deploying hybrid ML pipelines. Established a clear methodology for balancing model weights and handling sparse user matrices.",
            github: "https://github.com/Priyam2709/movie-recommender",
            live: ""
        },
        "3": {
            title: "Resume Skill Gap Analyzer",
            short_desc: "A system designed to analyze resumes and identify skill gaps by comparing candidate profiles against job requirements.",
            problem: "Candidates often lack clarity on which skills they are missing for specific roles. Existing tools heavily prioritize applicant screening rather than guiding human-driven improvement.",
            solution: "Developed an NLP-driven system that extracts skills from resumes and maps them against job descriptions. The priority was exclusively on generating <strong>actionable insights</strong> over calculating arbitrary matching scores.",
            architecture: ["Resume Input", "Text Processing", "Skill Extraction", "Job Description Parsing", "Skill Comparison", "Gap Analysis Output"],
            features: [
                "<strong>Skill gap identification</strong> driven by contextual NLP parsing",
                "Automated mapping between structured job descriptions and unstructured resumes",
                "Targeted actionable recommendations for immediate candidate improvement"
            ],
            outcome: "Developed scalable text processing architectures. Proved the viability of prioritizing insight-driven evaluation logic over simple binary evaluation tasks.",
            github: "https://github.com/Priyam2709/skillgap",
            live: ""
        },
        "4": {
            title: "Virtual Memory Simulator",
            short_desc: "A simulator designed to visualize and analyze memory management techniques and page replacement algorithms.",
            problem: "Operating system concepts like physical memory management and paging are incredibly abstract and difficult to debug natively.",
            solution: "Built an interactive simulator demonstrating exactly how different page replacement mechanics (FIFO, LRU, Optimal) operate under varying memory constraints. Focused exclusively on <strong>visualization clarity</strong> and mathematical accuracy.",
            architecture: ["User Input", "Algorithm Simulation", "Memory State Tracking", "Output Visualization"],
            features: [
                "<strong>Real-time updates</strong> tracking live frame replacement behaviors",
                "Parallel side-by-side technical performance metrics display",
                "Modular algorithm ingestion logic supporting multiple concurrent methods"
            ],
            outcome: "Strengthened core understanding of fundamental Operating System architecture and memory constraints while translating purely theoretical edge-cases into structured application logic.",
            github: "https://github.com/Priyam2709/Optimem",
            live: ""
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const project = projectsData[projectId];
    const container = document.getElementById('project-container');

    if (project) {
        
        // Build architecture flow HTML
        let archHTML = '';
        project.architecture.forEach((step, index) => {
            archHTML += `<div class="arch-step">${step}</div>`;
            if (index < project.architecture.length - 1) {
                archHTML += `<div class="arch-arrow">↓</div>`;
            }
        });

        // Build feature list HTML
        let featuresHTML = '';
        project.features.forEach(feat => {
            featuresHTML += `<li>${feat}</li>`;
        });

        const liveButton = project.live ? `<a href="${project.live}" target="_blank" class="btn primary-btn mt-6 magnetic reveal-up delay-2">Live Demo</a>` : '';

        container.innerHTML = `
            <header class="project-header">
                <h1 id="p-title" class="reveal-up text-primary">${project.title}</h1>
                <p id="p-desc" class="reveal-up delay-1 text-secondary">${project.short_desc}</p>
                <div class="flex-center mt-6">
                    <a id="p-git" href="${project.github}" target="_blank" class="btn outline-btn magnetic reveal-up delay-2">View on GitHub</a>
                    ${liveButton}
                </div>
            </header>

            <section class="project-body container">
                <div class="content-block hover-3d reveal-up delay-3">
                    <h2 class="accent">Problem Definition</h2>
                    <p id="p-prob">${project.problem}</p>
                    <hr class="content-divider" />
                    <h2 class="accent">The Solution</h2>
                    <p id="p-sol">${project.solution}</p>
                </div>
                
                <div class="content-block architecture-block hover-3d reveal-up border-glow">
                    <h2 class="accent text-center">System Architecture</h2>
                    <div id="p-arch" class="arch-flow">
                        ${archHTML}
                    </div>
                </div>
                
                <div class="content-block hover-3d reveal-up">
                    <h2 class="accent">Key Features</h2>
                    <ul id="p-feat" class="feature-list">
                        ${featuresHTML}
                    </ul>
                    <hr class="content-divider" />
                    <h2 class="accent">Outcome</h2>
                    <p id="p-out" class="outcome-box text-secondary">${project.outcome}</p>
                </div>
            </section>
        `;

        // Re-initialize animations dynamically
        setTimeout(() => {
            if(window.initObserver) window.initObserver();
            if(window.init3D) window.init3D();
            document.querySelectorAll('.magnetic').forEach(magnet => {
                const follower = document.querySelector('.cursor-follower');
                magnet.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    this.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
                    if(follower) follower.classList.add('hovered');
                });
                magnet.addEventListener('mouseleave', function() {
                    this.style.transform = `translate(0px, 0px)`;
                    this.style.transition = `transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)`;
                    if(follower) follower.classList.remove('hovered');
                });
                magnet.addEventListener('mouseenter', function() {
                    this.style.transition = `none`;
                });
            });
        }, 100);

    } else {
        container.innerHTML = `
            <header class="project-header">
                <h1 class="reveal-up accent">Project Not Found</h1>
                <p class="reveal-up delay-1">The requested project ID does not exist.</p>
                <div class="flex-center mt-6">
                    <a href="index.html" class="btn primary-btn magnetic reveal-up delay-2">Return Home</a>
                </div>
            </header>
        `;
    }
});
