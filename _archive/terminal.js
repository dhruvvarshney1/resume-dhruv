const input = document.getElementById('cmd-input');
const output = document.getElementById('output');

// Keep input focused whenever clicking on the terminal background
document.addEventListener('click', () => {
    // Only focus if the user hasn't selected text
    if (window.getSelection().toString() === '') {
        input.focus();
    }
});

const asciiBanner = `
██████╗ ██╗  ██╗██████╗ ██╗   ██╗██╗   ██╗
██╔══██╗██║  ██║██╔══██╗██║   ██║██║   ██║
██║  ██║███████║██████╔╝██║   ██║██║   ██║
██║  ██║██╔══██║██╔══██╗██║   ██║╚██╗ ██╔╝
██████╔╝██║  ██║██║  ██║╚██████╔╝ ╚████╔╝
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═══╝

██╗   ██╗ █████╗ ██████╗ ███████╗██╗  ██╗███╗  ██╗███████╗██╗   ██╗
██║   ██║██╔══██╗██╔══██╗██╔════╝██║  ██║████╗ ██║██╔════╝╚██╗ ██╔╝
██║   ██║███████║██████╔╝███████╗███████║██╔██╗██║█████╗   ╚████╔╝
╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║██╔══██║██║╚████║██╔══╝    ╚██╔╝
 ╚████╔╝ ██║  ██║██║  ██║███████║██║  ██║██║ ╚███║███████╗   ██║
  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚══╝╚══════╝   ╚═╝

─────────────────────────────────────────────────────────────
Data Science & Software Engineering
Indian Institute of Technology, Kharagpur · West Bengal, India
─────────────────────────────────────────────────────────────

Type <span class="highlight">'help'</span> or <span class="highlight">'?'</span> to see available commands.
`;

const commands = {
    help: `Available commands:
  <span class="highlight">about</span>       - Who am I?
  <span class="highlight">education</span>   - My academic background
  <span class="highlight">experience</span>  - Relevant work experience
  <span class="highlight">projects</span>    - Things I have built
  <span class="highlight">skills</span>      - Technologies and languages
  <span class="highlight">clear</span>       - Clear the terminal output
  <span class="highlight">gui</span>         - Return to the standard graphical resume
  <span class="highlight">contact</span>     - How to reach me`,
  
    '?': `Available commands:
  <span class="highlight">about</span>       - Who am I?
  <span class="highlight">education</span>   - My academic background
  <span class="highlight">experience</span>  - Relevant work experience
  <span class="highlight">projects</span>    - Things I have built
  <span class="highlight">skills</span>      - Technologies and languages
  <span class="highlight">clear</span>       - Clear the terminal output
  <span class="highlight">gui</span>         - Return to the standard graphical resume
  <span class="highlight">contact</span>     - How to reach me`,

    about: `Hi, I am <span class="highlight">Dhruv Varshney</span>!
I am pursuing a 4-Year B.S. in Exploration Geophysics with a Minor in Computer Science and Engineering at the Indian Institute of Technology (IIT) Kharagpur.
I am passionate about Applied Machine Learning, Data Engineering, and Full-Stack Development.`,

    education: `<span class="highlight">[ 2023 - 2027 ] Indian Institute of Technology, Kharagpur</span>
- Bachelor of Science in Exploration Geophysics
- Minor in Computer Science and Engineering
- CGPA: <span class="accent">8.34/10</span>

<span class="highlight">[ 2022 - 2023 ] Kendriya Vidyalaya IIT Kharagpur</span>
- CBSE Class XII (91.2%)

<span class="highlight">[ 2020 - 2021 ] Kendriya Vidyalaya IIT Kharagpur</span>
- CBSE Class X (97.6%)`,

    experience: `<span class="highlight">Analyst Programmer Intern (May '25 - Oct '25)</span>
@ Xceedance Consulting Private Limited
- Extracted structured information from insurance data using <span class="accent">LLM</span> workflows and domain-specific normalization.
- Generated diverse synthetic datasets with <span class="accent">GenAI</span> to cover edge-case policy structures.
- Performed exploratory data analysis (EDA) and cleaned data, standardizing/normalizing entity fields.
- Built and evaluated a few-shot classification model on <span class="accent">Azure OpenAI API</span> for key entity tagging.

<span class="highlight">Undergraduate Research Intern (May '24 - Nov '24)</span>
@ Vedvani (Prof. Pawan Goyal)
- Built Sanskrit speech-to-text pipeline: scraped and aligned audio/text transcripts using BeautifulSoup.
- Engineered text normalization preserving svaras (tonal markers) to improve phoneme-level accuracy.
- Fine-tuned a <span class="accent">Wav2Vec2 / Transformer</span> acoustic model for low-resource Sanskrit phonetics.
- Achieved a 12% relative WER reduction vs baseline.`,

    projects: `<span class="highlight">1. Jane Street Pokerbots</span>
- High-performance Python bot utilizing Monte Carlo estimation and EV-based auction bidding.
- Peak rank #30. Demonstrated strong application of Game Theory and AI algorithms.

<span class="highlight">2. Real-Time AI Emergency Evacuation System</span>
- Integrated <span class="accent">YOLOv11</span> for human detection and HSV color-thresholding for hazard simulation.
- Applied homography to map 3D camera coordinates onto a 2D floor plan.
- Implemented A* pathfinding to dynamically regenerate safe routes in under 50 ms.

<span class="highlight">3. Prediction of House Prices | Kaggle</span>
- Developed 6 regression models (RF, GB, XGBoost), achieving 90% R² score and $25,450 RMSE.
- Implemented Bayesian Optimization to tune XGBoost hyperparameters, reducing prediction error by 50%.

<span class="highlight">4. Spaceship & Titanic Survival Predictions | Kaggle</span>
- Built pipelines with statistical imputation and one-hot encoding.
- Developed XGBoost, Random Forest, and SVM classifiers achieving high ROC-AUC.

<span class="highlight">5. Home-coming Cloud Kitchen (May '25 - Present)</span>
- Built fully functional static website (Vanilla JS, HTML, CSS) with interactive cart.
- Implemented dynamic availability & pricing recalculation with a clean state model.

<span class="highlight">6. Image-Filtering Web App (Flask + OpenCV)</span>
- Developed responsive web app using OpenCV and <span class="accent">Flask</span> backend.
- Applied real-time image filters efficiently via base64 & Fetch API.

<span class="highlight">7. Sudoku Solver (C++ / SFML)</span>
- Backtracking solver visualized step-by-step highlighting conflicts.
- Demonstrated recursion, pruning, and interactive event-driven graphics.`,

    skills: `<span class="dim">/* Core Languages */</span>
<span class="highlight">Languages:</span> Python, JavaScript, HTML/CSS, C/C++

<span class="dim">/* Frameworks & Tools */</span>
<span class="highlight">Technologies:</span> LLMs, OpenCV, Flask, Vanilla JS, Git, GitHub Pages

<span class="dim">/* Domain Interests */</span>
<span class="highlight">Domains:</span> Applied Machine Learning, Data Engineering, Statistical Modeling`,

    contact: `You can reach me via:
<span class="highlight">Email:</span> dhruvvarshney2906@gmail.com
<span class="highlight">Alternate:</span> dhruvvarshney@kgpian.iitkgp.ac.in
<span class="highlight">Phone:</span> +91 8597986847`,
    
    gui: `Redirecting to standard web resume...`
};

// Initial print
function printBanner() {
    const div = document.createElement('div');
    div.className = 'output-box';
    div.innerHTML = `<div class="ascii-art">${asciiBanner}</div>`;
    output.appendChild(div);
}

printBanner();

// Handle commands
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const cmd = input.value.trim().toLowerCase();
        input.value = ''; // clear input
        
        // Echo the user's command
        const echoDiv = document.createElement('div');
        echoDiv.className = 'cmd-echo';
        echoDiv.innerHTML = `<span class="prompt"><span class="user">guest@dhruv</span>:<span class="dir">~</span>$</span> ${cmd}`;
        output.appendChild(echoDiv);
        
        if (cmd !== '') {
            processCommand(cmd);
        }
        
        // Auto scroll to bottom
        window.scrollTo(0, document.body.scrollHeight);
    }
});

function processCommand(cmd) {
    // Hidden commands / clear / redirects
    if (cmd === 'clear') {
        output.innerHTML = '';
        return;
    }
    
    if (cmd === 'gui') {
        setTimeout(() => { window.location.href = 'index.html'; }, 800);
        return;
    }
    
    // Look up command or default to error
    const responseDiv = document.createElement('div');
    responseDiv.className = 'output-box';
    
    if (commands[cmd]) {
        // Replace line breaks with <br> to render in HTML properly
        responseDiv.innerHTML = commands[cmd].replace(/\n/g, '<br>');
    } else {
        responseDiv.innerHTML = `bash: ${cmd}: command not found... type <span class="highlight">'help'</span> for a list of commands.`;
    }
    
    output.appendChild(responseDiv);
}