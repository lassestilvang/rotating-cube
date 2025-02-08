// Get canvas element and set it to full window size
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get 2D rendering context
var g = canvas.getContext("2d");

// Define the 8 vertices of the cube in 3D space (x, y, z)
// Each vertex is at either -1 or 1 on each axis
var nodes = [
  [-1, -1, -1], // back bottom left
  [-1, -1, 1], // front bottom left
  [-1, 1, -1], // back top left
  [-1, 1, 1], // front top left
  [1, -1, -1], // back bottom right
  [1, -1, 1], // front bottom right
  [1, 1, -1], // back top right
  [1, 1, 1], // front top right
];

// Define the 12 edges of the cube by connecting vertices
// Each edge is defined by two vertex indices from the nodes array
var edges = [
  [0, 1], // left face edges
  [1, 3],
  [3, 2],
  [2, 0],
  [4, 5], // right face edges
  [5, 7],
  [7, 6],
  [6, 4],
  [0, 4], // connecting edges between left and right faces
  [1, 5],
  [2, 6],
  [3, 7],
];

// Scale the cube by multiplying each dimension by the given factors
function scale(factor0, factor1, factor2) {
  nodes.forEach(function (node) {
    node[0] *= factor0; // scale x
    node[1] *= factor1; // scale y
    node[2] *= factor2; // scale z
  });
}

// Rotate the cube around X and Y axes
function rotateCuboid(angleX, angleY) {
  // Precalculate sine and cosine values for performance
  var sinX = Math.sin(angleX);
  var cosX = Math.cos(angleX);

  var sinY = Math.sin(angleY);
  var cosY = Math.cos(angleY);

  nodes.forEach(function (node) {
    // Store original coordinates
    var x = node[0];
    var y = node[1];
    var z = node[2];

    // Rotate around X axis
    node[0] = x * cosX - z * sinX;
    node[2] = z * cosX + x * sinX;

    z = node[2]; // Get updated z value for Y rotation

    // Rotate around Y axis
    node[1] = y * cosY - z * sinY;
    node[2] = z * cosY + y * sinY;
  });
}

// Draw the cube on the canvas
function drawCuboid() {
  g.save(); // Save the current canvas state

  // Clear canvas and set up the drawing
  g.clearRect(0, 0, canvas.width, canvas.height);
  g.translate(canvas.width / 2, canvas.height / 2); // Move origin to center
  g.strokeStyle = "#FFFFFF";
  g.beginPath();

  // Draw each edge of the cube
  edges.forEach(function (edge) {
    var p1 = nodes[edge[0]];
    var p2 = nodes[edge[1]];
    g.moveTo(p1[0], p1[1]); // Only use x and y coordinates for 2D projection
    g.lineTo(p2[0], p2[1]);
  });

  g.closePath();
  g.stroke();

  g.restore(); // Restore the original canvas state
}

// Initialize cube size and orientation
scale(200, 200, 200); // Make cube larger
rotateCuboid(Math.PI / 4, Math.atan(Math.sqrt(2))); // Set initial rotation

// Animation loop: rotate and redraw the cube every 17ms (approximately 60 FPS)
setInterval(function () {
  rotateCuboid(Math.PI / 360, 0); // Rotate slightly around X axis only
  drawCuboid();
}, 17);
