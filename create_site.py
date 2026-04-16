import os

html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dhruv Varshney</title>
    <link rel="icon" href="iitkgp_logo.jpg" type="image/jpeg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="gui.css">
</head>
<body>
    <nav id="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <span class="nav-name">Dhruv Varshney</span>
                <span class="nav-sub">Exploration Geophysics &bull; CS Minor</span>
            </div>
            <div class="nav-links">
                <a href="index.html">Terminal</a>
                <a href="#work">Work</a>
                <a href="#projects">Projects</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
    </nav>

    <main>
        <section class="hero">
            <h1>Merging <span>Computational Physics</span> with Machine Intelligence.</h1>
            <p>B.S. (Hons.) student at IIT Kharagpur specializing in Exploration Geophysics and Computer Science. Currently exploring Neural NER and ASR systems.</p>
            <div class="hero-actions">
                <a href="#work" class="btn-primary">View Work</a>
                <div class="divider"></div>
                <div class="hero-socials">
                    <a href="https://github.com"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path></svg></a>
                    <a href="https://linkedin.com"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                </div>
            </div>
        </section>

        <section id="work" class="section">
            <div class="section-title">
                <h2>01 / Selected Experience</h2>
            </div>
            <div class="section-content work-list">
                <div class="work-item">
                    <div class="work-header">
                        <h3>Xceedance Consulting</h3>
                        <span class="work-year">2025</span>
                    </div>
                    <p class="work-role">Analyst Programmer Intern</p>
                    <p class="work-desc">Building intelligent extraction systems for insurance data using Azure AI few-shot learning. Optimized unstructured datasets for NER modeling with 94.2% entity classification accuracy.</p>
                    <div class="tags">
                        <span class="tag">#Azure AI</span><span class="tag">#LLM</span><span class="tag">#NER</span><span class="tag">#Normalization</span>
                    </div>
                </div>

                <div class="work-item">
                    <div class="work-header">
                        <h3>Dept. of CS, IIT Kharagpur</h3>
                        <span class="work-year">2024</span>
                    </div>
                    <p class="work-role">Research Intern</p>
                    <p class="work-desc">Developed a robust Sanskrit ASR system by fine-tuning Wav2Vec2 on custom datasets. Integrated noise injection and pitch shifting for model robustness.</p>
                    <div class="tags">
                        <span class="tag">#Sanskrit ASR</span><span class="tag">#Wav2Vec2</span><span class="tag">#PyTorch</span><span class="tag">#NLP</span>
                    </div>
                </div>

                <div class="work-item">
                    <div class="work-header">
                        <h3>Homecoming Cloud Kitchen</h3>
                        <span class="work-year">2024</span>
                    </div>
                    <p class="work-role">Full-Stack Developer</p>
                    <p class="work-desc">Architected a central state-controlled PWA with Firebase backend. Implemented real-time order tracking and offline-first capabilities.</p>
                    <div class="tags">
                        <span class="tag">#React</span><span class="tag">#Firebase</span><span class="tag">#PWA</span><span class="tag">#UI/UX</span>
                    </div>
                </div>
            </div>
        </section>

        <section id="projects" class="section">
            <div class="section-title">
                <h2>02 / Technical Projects</h2>
            </div>
            <div class="section-content project-grid">
                <div class="project-item">
                    <div class="project-image">
                        <svg class="project-placeholder" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </div>
                    <div class="project-header">
                        <div>
                            <h3>Jane Street Pokerbots</h3>
                            <p class="project-type">Game Theory / AI</p>
                        </div>
                        <svg class="project-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                    <p class="project-desc">Peak rank #30. High-performance Python bot utilizing Monte Carlo estimation and EV-based auction bidding.</p>
                </div>

                <div class="project-item">
                    <div class="project-image">
                        <svg class="project-placeholder" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </div>
                    <div class="project-header">
                        <div>
                            <h3>Emergency Evacuation</h3>
                            <p class="project-type">Computer Vision</p>
                        </div>
                        <svg class="project-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                    <p class="project-desc">YOLOv11 and HSV pipeline for real-time human detection and spatial mapping at 30 FPS.</p>
                </div>

                <div class="project-item">
                    <div class="project-image">
                        <svg class="project-placeholder" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </div>
                    <div class="project-header">
                        <div>
                            <h3>Housing Price Prediction</h3>
                            <p class="project-type">Kaggle Machine Learning</p>
                        </div>
                        <svg class="project-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                    <p class="project-desc">Bayesian Optimization for hyperparameter tuning. Top-tier R-squared performance.</p>
                </div>

                <div class="project-item">
                    <div class="project-image">
                        <svg class="project-placeholder" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </div>
                    <div class="project-header">
                        <div>
                            <h3>Sanskrit ASR Engine</h3>
                            <p class="project-type">Speech Processing</p>
                        </div>
                        <svg class="project-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                    <p class="project-desc">Temporal alignment of text and audio files via fine-tuned Transformer architectures.</p>
                </div>
            </div>
        </section>

        <section id="about" class="section">
            <div class="section-title">
                <h2>03 / About & Skills</h2>
            </div>
            <div class="section-content">
                <div class="about-grid">
                    <div class="about-col">
                        <h3>Education</h3>
                        <div class="edu-card">
                            <h4>IIT Kharagpur</h4>
                            <p class="edu-degree">B.S. (Hons.) Exploration Geophysics</p>
                            <span class="edu-grade">8.34 CGPA</span>
                        </div>
                        <div class="edu-card">
                            <h4>Kendriya Vidyalaya</h4>
                            <p class="edu-degree">CBSE Class XII</p>
                            <span class="edu-grade">91.2%</span>
                        </div>
                    </div>
                    <div class="about-col">
                        <h3>Expertise</h3>
                        <div class="skill-tags">
                            <span class="skill-tag">C/C++</span>
                            <span class="skill-tag">Python</span>
                            <span class="skill-tag">React</span>
                            <span class="skill-tag">PyTorch</span>
                            <span class="skill-tag">TensorFlow</span>
                            <span class="skill-tag">Bash</span>
                            <span class="skill-tag">MySQL</span>
                            <span class="skill-tag">OpenCV</span>
                            <span class="skill-tag">Azure AI</span>
                            <span class="skill-tag">Firebase</span>
                        </div>
                    </div>
                </div>

                <div class="honors-card">
                    <div class="honors-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                        <h3>Honors & Achievements</h3>
                    </div>
                    <ul class="honors-list">
                        <li><span>JEE Advanced Top 6.4%</span><span class="honors-val">2023</span></li>
                        <li><span>Codeforces Specialist (1400+)</span><span class="honors-val">kingdhruv</span></li>
                        <li><span>WBJEE Rank Top 1%</span><span class="honors-val">Rank ~1k</span></li>
                        <li><span>LeetCode 150+ Solved</span><span class="honors-val">Active</span></li>
                    </ul>
                </div>
            </div>
        </section>

        <section id="contact" class="contact-section">
            <h2 class="contact-title">Get in Touch</h2>
            <a href="mailto:dhruvvarshney2906@gmail.com" class="contact-email">dhruvvarshney2906@gmail.com</a>
            <div class="contact-socials">
                <a href="#">LinkedIn</a>
                <a href="#">GitHub</a>
                <a href="#">Codeforces</a>
            </div>
        </section>
    </main>

    <footer>
        <span>&copy; 2026 Dhruv Varshney</span>
        <div class="footer-location">
            <span>Kharagpur, WB</span>
            <div class="dot"></div>
        </div>
    </footer>

    <script>
        const nav = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>'''

css_content = ''':root {
  --bg: #fafafa;
  --text: #1a1a1a;
  --border: rgba(0,0,0,0.05);
  --zinc-200: #e4e4e7;
  --zinc-400: #a1a1aa;
  --zinc-500: #71717a;
  --zinc-600: #52525b;
  --zinc-800: #27272a;
  --zinc-900: #18181b;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--text);
  color: white;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Nav */
nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  transition: all 0.5s;
  padding: 32px 0;
  border-bottom: 1px solid transparent;
}

nav.scrolled {
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 16px 0;
  border-bottom-color: var(--border);
}

.nav-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  flex-direction: column;
}

.nav-name {
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: -0.05em;
}

.nav-sub {
  font-size: 10px;
  color: var(--zinc-400);
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  gap: 32px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--zinc-500);
}

.nav-links a {
  transition: color 0.3s;
}

.nav-links a:hover {
  color: black;
}

/* Main */
main {
  max-width: 1152px;
  margin: 0 auto;
  padding: 192px 24px 96px;
}

/* Hero */
.hero {
  max-width: 896px;
  margin-bottom: 192px;
  animation: fadeUp 1s ease-out;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero h1 {
  font-size: 80px;
  font-family: 'Playfair Display', serif;
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 48px;
}

.hero h1 span {
  font-style: italic;
}

.hero p {
  font-size: 24px;
  color: var(--zinc-500);
  font-weight: 300;
  line-height: 1.6;
  max-width: 672px;
  margin: 0 0 48px;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.btn-primary {
  padding: 12px 32px;
  background: var(--text);
  color: white;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: var(--zinc-800);
}

.divider {
  height: 1px;
  width: 48px;
  background: var(--zinc-200);
}

.hero-socials {
  display: flex;
  gap: 16px;
  color: var(--zinc-400);
}

.hero-socials a:hover {
  color: var(--text);
}

/* Layout Grid */
.section {
  border-top: 1px solid var(--border);
  padding-top: 96px;
  margin-bottom: 192px;
  display: flex;
  gap: 96px;
}

.section-title {
  width: 33.333%;
}

.section-title h2 {
  position: sticky;
  top: 128px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--zinc-400);
  margin: 0;
}

.section-content {
  width: 66.666%;
}

/* Work Items */
.work-list {
  display: flex;
  flex-direction: column;
  gap: 128px;
}

.work-item {
  position: relative;
}

.work-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;
}

.work-header h3 {
  font-size: 30px;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  margin: 0;
  transition: all 0.3s;
}

.work-item:hover .work-header h3 {
  font-style: italic;
}

.work-year {
  font-size: 12px;
  font-family: monospace;
  color: var(--zinc-400);
}

.work-role {
  font-size: 14px;
  color: var(--zinc-500);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 24px;
}

.work-desc {
  font-size: 18px;
  color: var(--zinc-600);
  font-weight: 300;
  line-height: 1.6;
  margin: 0 0 32px;
  max-width: 576px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  color: var(--zinc-400);
}

/* Project Grid */
.project-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 48px;
  row-gap: 96px;
}

.project-item {
  cursor: pointer;
}

.project-image {
  aspect-ratio: 4/5;
  background: #f4f4f5;
  border-radius: 8px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--zinc-300);
}

.project-placeholder {
  transition: transform 0.7s ease;
  color: #d4d4d8;
}

.project-item:hover .project-placeholder {
  transform: scale(1.1);
}

.project-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0);
  transition: background 0.3s;
}

.project-item:hover .project-image::after {
  background: rgba(0,0,0,0.05);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.project-header h3 {
  font-size: 20px;
  font-family: 'Playfair Display', serif;
  margin: 0 0 4px;
  transition: font-style 0.3s;
}

.project-item:hover .project-header h3 {
  font-style: italic;
}

.project-type {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--zinc-400);
  margin: 0;
}

.project-icon {
  opacity: 0;
  transition: opacity 0.3s;
}

.project-item:hover .project-icon {
  opacity: 1;
}

.project-desc {
  font-size: 14px;
  color: var(--zinc-500);
  font-weight: 300;
  line-height: 1.6;
  margin: 16px 0 0;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.5s ease;
}

.project-item:hover .project-desc {
  opacity: 1;
  transform: translateY(0);
}

/* About and Skills */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
}

.about-col h3 {
  font-size: 24px;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  margin: 0 0 24px;
  font-weight: 400;
}

.edu-card {
  border-left: 1px solid var(--zinc-200);
  padding-left: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-bottom: 24px;
}

.edu-card h4 {
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 4px;
}

.edu-degree {
  font-size: 12px;
  color: var(--zinc-500);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 8px;
}

.edu-grade {
  font-size: 14px;
  font-family: monospace;
  color: var(--zinc-400);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  padding: 6px 16px;
  border: 1px solid var(--zinc-200);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 999px;
  color: var(--zinc-600);
}

/* Honors */
.honors-card {
  margin-top: 96px;
  padding: 48px;
  background: var(--zinc-900);
  color: white;
  border-radius: 32px;
}

.honors-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.honors-header svg {
  color: var(--zinc-400);
  width: 24px;
  height: 24px;
}

.honors-header h3 {
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  letter-spacing: -0.02em;
}

.honors-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.honors-list li {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  font-size: 14px;
  font-weight: 300;
  color: var(--zinc-400);
}

.honors-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.honors-val {
  font-family: monospace;
  color: white;
}

/* Contact */
.contact-section {
  padding: 96px 0 48px;
  border-top: 1px solid var(--border);
  text-align: center;
}

.contact-title {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  color: var(--zinc-400);
  margin: 0 0 48px;
}

.contact-email {
  font-size: 64px;
  font-family: 'Playfair Display', serif;
  transition: all 0.3s;
  display: inline-block;
  color: var(--text);
}

.contact-email:hover {
  font-style: italic;
}

.contact-socials {
  margin-top: 64px;
  display: flex;
  justify-content: center;
  gap: 48px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--zinc-400);
}

.contact-socials a {
  transition: color 0.3s;
}

.contact-socials a:hover {
  color: var(--text);
}

/* Footer */
footer {
  max-width: 1152px;
  margin: 0 auto;
  padding: 48px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--zinc-400);
  border-top: 1px solid var(--border);
}

.footer-location {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
  100% { opacity: 1; transform: scale(1); }
}

@media (max-width: 768px) {
  .section {
    flex-direction: column;
    gap: 48px;
    padding-top: 48px;
    margin-bottom: 96px;
  }
  .section-title, .section-content {
    width: 100%;
  }
  .section-title h2 {
    position: relative;
    top: 0;
  }
  .hero h1 {
    font-size: 48px;
  }
  .hero p {
    font-size: 18px;
  }
  .project-grid, .about-grid {
    grid-template-columns: 1fr;
  }
  .nav-links {
    display: none;
  }
  .contact-email {
    font-size: 32px;
  }
  .work-header {
    flex-direction: column;
    gap: 4px;
  }
}
'''

with open('gui.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

with open('gui.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

print("success")
