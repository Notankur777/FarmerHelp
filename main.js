// Assistant toggle (existing code)
const assistantBtn = document.getElementById('assistant-btn');
const assistantPanel = document.getElementById('assistant-panel');

assistantBtn.addEventListener('click', () => {
    if (assistantPanel.style.display === 'flex') {
        assistantPanel.style.display = 'none';
    } else {
        assistantPanel.style.display = 'flex';
    }
});

// Voice Recognition
const micBtn = document.getElementById('mic-btn');
const voiceOutput = document.getElementById('voice-output');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;

    micBtn.addEventListener('click', () => {
        voiceOutput.innerText = "Listening... 🎙️";
        recognition.start();
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        voiceOutput.innerText = "You said: " + transcript;
    };

    recognition.onerror = (event) => {
        voiceOutput.innerText = "Error: " + event.error;
    };
} else {
    voiceOutput.innerText = "Your browser does not support voice recognition.";
}

// START VOICE button functionality → open assistant + auto start mic
const startVoiceBtn = document.getElementById('voice-btn');
startVoiceBtn.addEventListener('click', () => {
    assistantPanel.style.display = 'flex';
    if (recognition) {
        voiceOutput.innerText = "Listening... 🎙️";
        recognition.start();
    }
});

// IMAGE UPLOAD functionality
const uploadBtn = document.getElementById('image-btn');

// Create image panel dynamically
const imagePanel = document.createElement('div');
imagePanel.id = 'image-panel';
imagePanel.innerHTML = `
    <h3>Upload Crop Image</h3>
    <input type="file" id="crop-image" accept="image/*"><br>
    <img id="preview-image" src="" alt="Preview" style="display:none;">
    <button id="process-btn">Process</button>
    <div id="result-box" style="display:none;"></div>
`;
document.body.appendChild(imagePanel);

uploadBtn.addEventListener('click', () => {
    imagePanel.style.display = 'flex';
});

const cropInput = document.getElementById('crop-image');
const previewImage = document.getElementById('preview-image');
const processBtn = document.getElementById('process-btn');
const resultBox = document.getElementById('result-box');

cropInput.addEventListener('change', () => {
    const file = cropInput.files[0];
    if(file){
        previewImage.src = URL.createObjectURL(file);
        previewImage.style.display = 'block';
    }
});

// Process Button → simulate AI analysis
processBtn.addEventListener('click', () => {
    resultBox.style.display = 'block';
    // Example AI analysis result
    resultBox.innerHTML = `
        <h4>Crop Analysis Result:</h4>
        <p>pH Level Needed: 6.5</p>
        <p>Water Required: 1.2 liters/day</p>
        <p>Fertilizer Recommendation: NPK 20:20:20</p>
        <p>Suggested Pesticide: Neem Oil</p>
        <p>Growth Stage: Vegetative</p>
    `;
});
