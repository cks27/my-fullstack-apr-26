const number = document.getElementById("number");
const increment = document.getElementById("increment");
const add = document.getElementById("add");
const subtract = document.getElementById("subtract");
const reset = document.getElementById("reset");

let counterValue = 0;

function updateCounter() {
  number.innerText = counterValue;
}

add.addEventListener("click", () => {
  counterValue = parseInt(counterValue) + parseInt(increment.value);
  updateCounter();
});
subtract.addEventListener("click", () => {
  counterValue = parseInt(counterValue) - parseInt(increment.value);
  updateCounter();
});
reset.addEventListener("click", () => {
  counterValue = 0;
  updateCounter();
});