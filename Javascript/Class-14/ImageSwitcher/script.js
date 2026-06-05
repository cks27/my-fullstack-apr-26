

/*

Given two images
    - Toggle the images at an interval of 1 sec each.
      such that image1 is displayed for 1 sec and then image2 is displayed
      and then again image1 and then image2 and so on...

      image 1 = "https://images.unsplash.com/photo-1776455129240-a9ac916c0c7d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
      image 2 = "https://images.unsplash.com/photo-1773236759289-251d9687b6e3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D"
*/

const img = document.querySelector('img');

const IMAGE1 = "https://images.unsplash.com/photo-1776455129240-a9ac916c0c7d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D";
const IMAGE2 = "https://images.unsplash.com/photo-1773236759289-251d9687b6e3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D";

let isTrue = false;

function toggleImage() {
    if (isTrue) {
        img.setAttribute('src', IMAGE2);
    }
    else {
        img.setAttribute('src', IMAGE1);
    }
    
    isTrue = !isTrue;
}

setInterval(toggleImage, 1000);