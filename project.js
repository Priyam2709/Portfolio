document.addEventListener('DOMContentLoaded', () => {

    const projectsData = {
        "1": {
            title: "Jewel Whisperer",
            short_desc: "Conversational AI system reducing decision friction via Gemini LLM.",
            problem: "Traditional e-commerce platforms force users into tedious browsing paradigms. This generates high bounce rates and fails to capture contextual nuance for personalized purchases.",
            solution: "Designed a conversational architecture that completely replaces traditional browsing. The system interprets complex user context to dynamically generate personalized jewelry recommendations via the Gemini API.",
            architecture: ["Client-Side UI", "Context Processor", "Gemini Integration", "Content Structuring", "Response Rendering"],
            features: [
                "<strong>Conversational NLP Interface</strong> handling unstructured user constraints natively",
                "Processed multiple interaction flows reducing standard time-to-recommendation",
                "Built-in comparison engine mapping product attributes dynamically"
            ],
            outcome: "Mastered LLM-to-UI pipeline integration. Learned how to synthesize unstructured text into strict data paradigms to control non-deterministic AI outputs.",
            tradeoffs: "Chose serverless architecture for faster deployment speed, but increased latency on cold starts. Utilized LLM generated responses—highly flexible context mapping, but required rigorous prompt engineering to format outputs safely.",
            future: "If I had more time: Introduce real-time analytics tracking to capture user drop-offs and integrate a secure Python backend for proprietary filtering algorithms.",
            github: "https://github.com/Priyam2709/jewel_whisper",
            live: ""
        },
        "2": {
            title: "Movie Recommendation System",
            short_desc: "Hybrid ML architecture combining content and collaborative filtering.",
            problem: "Single-method recommendation engines suffer from severe data sparsity and cold-start issues, failing to capture both global popularity and niche user interests.",
            solution: "Engineered a hybrid machine learning pipeline. The system solves the cold-start problem by utilizing TF-IDF for content mapping, while deploying SVD++ for handling latent user-item interaction similarities.",
            architecture: ["Data Ingestion", "TF-IDF Vectorization", "SVD++ Modeler", "Hybrid Weighting", "Top-N Output"],
            features: [
                "<strong>Hybrid scoring model</strong> optimizing precision across large datasets",
                "Generated baseline datasets handling 10,000+ interaction rows dynamically",
                "Modular algorithmic pipeline ensuring components can be hot-swapped seamlessly"
            ],
            outcome: "Developed robust understanding of combining theoretical machine learning models into applied systems. Proved that hybridized models significantly outperform isolated mathematical approaches in real-world sparsity conditions.",
            tradeoffs: "Calculated TF-IDF vectors at runtime—reduced storage overhead, but increased processing time during initial query load. Selected SVD++ over standard SVD to capture implicit feedback at the cost of longer training duration.",
            future: "If I had more time: Implement an automated model retraining pipeline using an airflow cron job and migrate the storage layer to a dedicated vector database.",
            github: "https://github.com/Priyam2709/movie-recommender",
            live: ""
        },
        "3": {
            title: "Resume Skill Gap Analyzer",
            short_desc: "NLP-driven pipeline parsing unstructured data into actionable career insights.",
            problem: "Candidates remain unaware of critical missing requirements in their profiles. Standard ATS tools are built to screen out candidates rather than provide actionable feedback.",
            solution: "Architected a natural language processing system that parses unstructured resume PDFs and maps them against job descriptions to isolate precise skill deficits.",
            architecture: ["PDF Ingestion", "NLP Tokenization", "Entity Recognition", "Intersection Matrix", "Insight Gen"],
            features: [
                "<strong>Automated entity extraction</strong> processing high volumes of unstructured text",
                "Actionable visual dashboards immediately isolating candidate deficiencies",
                "Strict algorithmic mapping returning >90% precision on core tech stacks"
            ],
            outcome: "Gained structural expertise in processing zero-format PDF data. Learned the immense difficulty in standardizing vocabulary schemas and mapping loosely coupled technical terms.",
            tradeoffs: "Relied on rule-based NLP extraction—provided absolute deterministic output, but struggled with highly creative resume configurations compared to an LLM semantic substitute.",
            future: "If I had more time: Deploy a secondary LLM verification layer for contextual skill grouping and integrate a live web-scraping module to ingest real-time job listings directly from LinkedIn.",
            github: "https://github.com/Priyam2709/skillgap",
            live: ""
        },
        "4": {
            title: "Virtual Memory Simulator",
            short_desc: "Interactive C++ simulation visualizing core OS memory replacement architectures.",
            problem: "Operating System concepts like physical memory management and paging are incredibly abstract, making edge-cases notoriously difficult to debug and visualize natively.",
            solution: "Designed an interactive visualization architecture demonstrating exactly how page replacement mechanics (FIFO, LRU, Optimal) operate under extreme memory constraints.",
            architecture: ["Input Config", "Memory State Tracker", "Algorithm Engine", "Metrics Exporter"],
            features: [
                "<strong>Real-time state tracking</strong> of live frame replacements under high throughput",
                "Parallel evaluation engine simulating 3 core OS algorithms simultaneously",
                "Modular structural implementation in C++ ensuring total memory safety"
            ],
            outcome: "Solidified core engineering principles in memory allocation and state management. Learned to translate deep theoretical OS edge-cases into readable graphical data.",
            tradeoffs: "Built purely in C++ to guarantee maximum execution speed and zero overhead, at the cost of significantly harder cross-platform distribution and frontend UI rendering.",
            future: "If I had more time: Build a WebAssembly (Wasm) bridge to execute the C++ core directly inside the browser for web-native simulations without losing performance.",
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
                    <h2 class="accent">Key Engineering Features</h2>
                    <ul id="p-feat" class="feature-list">
                        ${featuresHTML}
                    </ul>
                    <hr class="content-divider" />
                    <h2 class="accent">Key Outcomes & Learnings</h2>
                    <p id="p-out" class="outcome-box text-secondary">${project.outcome}</p>
                </div>
                
                <div class="content-block hover-3d reveal-up delay-1" style="border-left: 4px solid var(--accent-color);">
                    <h2 class="accent">Engineering Trade-offs</h2>
                    <p class="text-secondary" style="margin-top: 1rem;">${project.tradeoffs}</p>
                    <hr class="content-divider" />
                    <h2 class="accent" style="color: #6366f1;">Future Improvements</h2>
                    <p class="text-secondary" style="margin-top: 1rem; font-style: italic;">${project.future}</p>
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
