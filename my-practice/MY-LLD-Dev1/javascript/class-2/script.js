let radii = [1,2,3,4,5,6,7,8,9]; // radius of circle
// const PI = 3.14;
// perimeter  = 2PIr
// let perimeter = [];

// areas (PIr**2)
//let areas = [];

// Diameter of circle 2r
// let diameter = [];

function perimeter(radius) {
    return 2 * Math.PI * radius;
}

function area(radius) {
    return  Math.PI * radius**2;
}
function diameter(radius) {
    return 2 * radius;
}

function calculate(radii, callback) {
    let res = [];

    for(let radius of radii) {
        res.push(callback(radius));
    }

    return res;
}


console.log('Perimeters ', calculate(radii, perimeter));
console.log('Areas ', calculate(radii, area));
console.log('Diameters ', calculate(radii, diameter));

