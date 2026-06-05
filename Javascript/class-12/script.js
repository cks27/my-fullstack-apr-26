const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");



setInterval(() => {
    img1.classList[0].toggle('hide');
    img2.classList[0].toggle('hide');
}, 1000);