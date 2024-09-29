document.addEventListener('DOMContentLoaded', () => {
    // Default colors and angle on page load
    const defaultColor1 = '#ff5733';
    const defaultColor2 = '#33b5ff';
    const defaultAngle = 90;

    // Set default values for color pickers
    document.getElementById("color1").value = defaultColor1;
    document.getElementById("color2").value = defaultColor2;
    document.getElementById("angle").value = defaultAngle;

    // Set initial background gradient
    const initialGradient = `linear-gradient(${defaultAngle}deg, ${defaultColor1}, ${defaultColor2})`;
    document.getElementById("preview").style.background = initialGradient;
    document.body.style.background = initialGradient;
    document.body.style.backgroundSize = '200% 200%'; // Smooth movement effect

    // Update the displayed CSS code
    document.getElementById("cssCode").value = `background: ${initialGradient};`;
});

// Function to update gradient based on user input
function updateGradient() {
    const color1 = document.getElementById("color1").value;
    const color2 = document.getElementById("color2").value;
    const angle = document.getElementById("angle").value;

    const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

    // Update the preview and body background
    document.getElementById("preview").style.background = gradient;
    document.body.style.background = gradient;

    // Update the angle value text
    document.getElementById("angleValue").textContent = `${angle}°`;

    // Update the button with the moving gradient
    const downloadButton = document.querySelector(".action-button");
    downloadButton.style.background = gradient;
    downloadButton.style.backgroundSize = "200% 200%"; // Enable animation effect
}

function downloadGradient() {
    const canvas = document.getElementById('gradientCanvas');
    const ctx = canvas.getContext('2d');
    const color1 = document.getElementById("color1").value;
    const color2 = document.getElementById("color2").value;
    const angle = document.getElementById("angle").value;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;

    // Create gradient on canvas
    const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Download the gradient as PNG
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'gradient.png';
    link.click();
}

let currentGradientType = 'linear';  // Default gradient type on load

document.addEventListener('DOMContentLoaded', () => {
    // Set the initial gradient on page load (linear by default)
    updateGradient();

    // Make sure the radial size slider is hidden initially
    document.querySelector('.size-picker').style.display = 'none';
});

function setGradientType(type) {
    currentGradientType = type;

    const angleContainer = document.querySelector('.angle-picker');
    const sizeContainer = document.querySelector('.size-picker');

    // Show or hide the appropriate sliders based on the gradient type
    if (type === 'linear') {
        angleContainer.style.display = 'block';
        sizeContainer.style.display = 'none';  // Hide size slider for linear
    } else {
        angleContainer.style.display = 'none'; // Hide angle slider for radial
        sizeContainer.style.display = 'block'; // Show size slider for radial
    }

    // Update the gradient preview
    updateGradient();

    // Update active button state
    document.getElementById('linearButton').classList.toggle('active', type === 'linear');
    document.getElementById('radialButton').classList.toggle('active', type === 'radial');
}

function updateGradient() {
    const color1 = document.getElementById("color1").value;
    const color2 = document.getElementById("color2").value;
    const angle = document.getElementById("angle").value;
    const size = document.getElementById("size").value;

    let gradient;
    if (currentGradientType === 'linear') {
        // Linear gradient with angle
        gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    } else {
        // Radial gradient with size control
        gradient = `radial-gradient(circle at center, ${color1} ${size}%, ${color2} 100%)`;
    }

    // Apply the gradient to the preview and body background
    document.getElementById("preview").style.background = gradient;
    document.body.style.background = gradient;

    // Apply the gradient to the download button with animation for both linear and radial
    const downloadButton = document.querySelector(".action-button");
    downloadButton.style.background = gradient;
    downloadButton.style.backgroundSize = "200% 200%";  // Enable smooth animation
}