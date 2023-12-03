// generate json variable for data
// Planet Name	Distance (AU)	Size (km)
// Mercuria	0.4	4879
// Earthia	1	12742
// Marsia	1.5	6779
// Venusia	0.7	12104

var planets = [
    {
        "name": "Mercuria",
        "distance": 0.4,
        "size": 4879
    },
    {
        "name": "Earthia",
        "distance": 1,
        "size": 12742
    },
    {
        "name": "Marsia",
        "distance": 1.5,
        "size": 6779
    },
    {
        "name": "Venusia",
        "distance": 0.7,
        "size": 12104
    }
];

// Define a function getLightStatus that takes a planet and an array of all planets as parameters
function getLightStatus(planet, planets) {
    // Sort the planets array in ascending order of their distance from the sun
    planets.sort((a, b) => a.distance - b.distance);

    // Find the index of the given planet in the sorted array
    let index = planets.findIndex(p => p.name === planet.name);

    // Filter out the planets that are closer to the sun and larger than the given planet
    let largerPlanetsCloserToSun = planets.slice(0, index).filter(p => p.size > planet.size);

    // Filter out the planets that are closer to the sun and smaller than the given planet
    let smallerPlanetsCloserToSun = planets.slice(0, index).filter(p => p.size < planet.size);

    // If there are more than one larger planets closer to the sun, return "None (Multiple Shadows)"
    if (largerPlanetsCloserToSun.length > 1) {
        return "None (Multiple Shadows)";
    }
    // If there is one larger planet closer to the sun, return "None"
    else if (largerPlanetsCloserToSun.length === 1) {
        return "None";
    }
    // If there is at least one smaller planet closer to the sun, return "Partial"
    else if (smallerPlanetsCloserToSun.length >= 1) {
        return "Partial";
    }
    // If there are no planets closer to the sun, return "Full"
    else {
        return "Full";
    }
}

// Create an array of all planets with their lightStatus
var planetsWithLightStatus = planets.map(planet => {
    return {
        ...planet,
        lightStatus: getLightStatus(planet, planets)
    };
});

console.log(planetsWithLightStatus);

// Define a function to create an SVG image based on the simulation
function createSVG(planetsWithLightStatus) {
    // Create an SVG container
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", window.innerWidth);
    svg.setAttribute("height", window.innerHeight);
    svg.style.backgroundColor = "black";


    // Define a color scale to assign distinct colors to each planet based on distance from the sun
    let colorScale = d3.scaleSequential().domain([0, d3.max(planetsWithLightStatus, d => d.distance)]).interpolator(d3.interpolateRainbow);

    // Define logarithmic scales for the distances and sizes
    //let distanceScale = d3.scaleLog().domain([1, d3.max(planetsWithLightStatus, d => d.distance)]).range([0, Math.min(window.innerWidth, window.innerHeight) / 2 - 50]);
    // Define logarithmic scales for the distances and sizes
    let distanceScale = d3.scaleLog().domain([1, 10]).range([0, Math.min(window.innerWidth, window.innerHeight) / 2 - 50]);
    let sizeScale = d3.scaleLog().domain([1, d3.max(planetsWithLightStatus, d => d.size)]).range([1, 40]);


    // Create a circle for the sun at the bottom of the SVG
    let sun = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    sun.setAttribute("cx", window.innerWidth / 2);
    sun.setAttribute("cy", "50"); // Add an offset to position the sun below the planets
    sun.setAttribute("r", "50");
    sun.setAttribute("fill", "yellow");


    // Append the sun to the SVG container
    svg.appendChild(sun);
    // Loop through the planets
    for (let i = 0; i < planetsWithLightStatus.length; i++) {
        // Create a circle for each planet
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        // Set the x coordinate of the planet to be the same as the sun
        let cx = window.innerWidth / 2;

        // Calculate the y coordinate of the planet based on its distance from the sun
        let cy = window.innerHeight / 2 + distanceScale(planetsWithLightStatus[i].distance);

        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", sizeScale(planetsWithLightStatus[i].size));
        circle.setAttribute("fill", colorScale(planetsWithLightStatus[i].distance));

        // Add the distance as an attribute to the circle
        circle.setAttribute("data-distance", planetsWithLightStatus[i].distance);

        // Append the circle to the SVG container
        svg.appendChild(circle);




        // Create a text element for the planet's details
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");

        // Set the position of the text to be slightly offset from the circle
        text.setAttribute("x", cx + 10);
        text.setAttribute("y", cy);
        text.setAttribute("fill", "white");

        // Set the text content to the planet's name, distance, and light status
        text.textContent = `Name: ${planetsWithLightStatus[i].name}, Distance: ${planetsWithLightStatus[i].distance}, Light Status: ${planetsWithLightStatus[i].lightStatus}`;

        // Append the text to the SVG container
        svg.appendChild(text);
    }


    // Append the SVG container to the body of the document
    document.body.appendChild(svg);
}

// Run the createSVG function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    createSVG(planetsWithLightStatus);
});