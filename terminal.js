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
 ____  _                       __     __             _                      
|  _ \\| |__  _ __ _   ___   __ \\ \\   / /_ _ _ __ ___| |__  _ __   ___ _   _ 
| | | | '_ \\| '__| | | \\ \\ / /  \\ \\ / / _\` | '__/ __| '_ \\| '_ \\ / _ \\ | | |
| |_| | | | | |  | |_| |\\ V /    \\ V / (_| | |  \\__ \\ | | | | | |  __/ |_| |
|____/|_| |_|_|   \\__,_| \\_/      \\_/ \\__,_|_|  |___/_| |_|_| |_|\\___|\\__, |
                                                                      |___/ 
Welcome to Dhruv Varshney's Terminal Portfolio.
Data Science & Software Engineering @ IIT Kharagpur.

Type <span class="highlight">'help'</span> or <span class="highlight">'?'</span> to see a list of available commands.
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

    experience: `<span class="highlight">Analyst Programmer (May '25 - Oct '25)</span>
@ Xceedance Consulting Private Limited
- Extracted information from insurance data using <span class="accent">LLM</span> workflows and normalization techniques.
- Generated synthetic datasets with <span class="accent">genAI</span> to cover edge-case structures.
- Performed extensive exploratory data analysis and cleaning.
- Built a few-shot classification model using the <span class="accent">Azure AI API</span>.`,

    projects: `<span class="highlight">1. Sanskrit Speech-to-Text Model (Jan '25 - Present)</span>
- Cleaned and preprocessed audio-text aligned datasets.
- Trained a <span class="accent">Wav2Vec2</span> model for Sanskrit transcription, improving WER and CER.

<span class="highlight">2. Home-coming Cloud Kitchen (May '25 - Present)</span>
- Built a fully functional static website in Vanilla JS, HTML, CSS.
- Implemented a dynamic menu rendering system based on dates & time slots.
- Engineered JSON-based interactive cart and order calculation system.

<span class="highlight">3. Image-Filtering Web App (May '25 - Present)</span>
- Developed a responsive web app using OpenCV and Flask backend.
- Applied real-time image filters transmitted efficiently via base64 & Fetch API.`,

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
          setTimeout(() => { window.location.href = 'gui.html'; }, 800);
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