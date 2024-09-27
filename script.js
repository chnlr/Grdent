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
    var video = new Whammy.Video(30);  // 30 FPS for smooth animation
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;
  
    const color1 = document.getElementById("color1").value;
    const color2 = document.getElementById("color2").value;
  
    // Generate 100 frames (3.6 degrees per frame for a full rotation)
    for (let i = 0; i <= 100; i++) {
      const angle = i * 3.6;  // Change angle for animation
  
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
  
      // Apply gradient to canvas
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Add frame to video
      video.add(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
  
    // Render the video and download
    video.compile(false, function(output) {
      var url = window.URL.createObjectURL(output);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'moving-gradient.webm';  // WebM video download
      link.click();
    });
  }