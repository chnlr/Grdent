let previousGradient = '';

function updateGradient() {
  const color1 = document.getElementById("color1").value;
  const color2 = document.getElementById("color2").value;
  const angle = document.getElementById("angle").value;

  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  
  // Real-time background and preview change
  document.getElementById("preview").style.background = gradient;
  document.body.style.background = gradient;
  document.body.style.backgroundSize = '200% 200%';

  // Update angle display
  document.getElementById("angleValue").textContent = `${angle}°`;

  // Update CSS code display
  document.getElementById("cssCode").value = `background: ${gradient};`;
}

function generateGradient() {
  // Save current gradient
  previousGradient = document.getElementById("preview").style.background;

  // Update CSS
  updateGradient();
}

function downloadGradient() {
  const color1 = document.getElementById("color1").value;
  const color2 = document.getElementById("color2").value;
  const angle = document.getElementById("angle").value;

  // Get canvas and context
  const canvas = document.getElementById('gradientCanvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size (You can adjust size as needed)
  canvas.width = 800;
  canvas.height = 400;

  // Create gradient on canvas
  const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);

  // Apply gradient fill to canvas
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Download canvas as image
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'gradient.png';
  link.click();
}

function downloadVideo() {
    var video = new Whammy.Video(30);  // 30 FPS for a smooth video
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;
  
    const color1 = document.getElementById("color1").value;
    const color2 = document.getElementById("color2").value;
  
    // Create 5 seconds of frames at 30 FPS
    const totalFrames = 30 * 5;  // 30 FPS * 5 seconds = 150 frames
  
    for (let i = 0; i < totalFrames; i++) {
        const angle = (i / totalFrames) * 360;  // Gradually change the angle
  
        // Create the gradient for the current frame
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
  
        // Fill the canvas with the gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        // Add the current canvas frame to the video
        video.add(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
  
    // Render and download the video
    video.compile(false, function(output) {
        var url = window.URL.createObjectURL(output);
        var link = document.createElement('a');
        link.href = url;
        link.download = 'moving-gradient.webm';  // Downloads as .webm video
        link.click();
    });
}