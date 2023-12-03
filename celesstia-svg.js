// Define a function to create an SVG image based on the simulation
function createSVG(planetsWithLightStatus) {
    // Create an SVG container
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "800");
    svg.setAttribute("height", "600");
  
    // Define a color scale to assign distinct colors to each planet based on distance from the sun
    let colorScale = d3.scaleSequential().domain([0, d3.max(planetsWithLightStatus, d => d.distance)]).interpolator(d3.interpolateRainbow);
  
    // Loop through the planets
    for (let i = 0; i < planetsWithLightStatus.length; i++) {
      // Create a circle for each planet
      let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", planetsWithLightStatus[i].distance * 10);
      circle.setAttribute("cy", "300");
      circle.setAttribute("r", planetsWithLightStatus[i].size);
      circle.setAttribute("fill", colorScale(planetsWithLightStatus[i].distance));
  
      // Append the circle to the SVG container
      svg.appendChild(circle);
    }
  
    // Append the SVG container to the body of the document
    document.body.appendChild(svg);
  }
  
  // Run the createSVG function when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', (event) => {
    createSVG(planetsWithLightStatus);
  });