const inputs = document.querySelectorAll("#inputs input");

inputs.forEach((input, index) => {
  // 1. Move to next input when a digit is entered
  input.addEventListener("input", () => {
    // Only allow numeric characters (0-9)
    if (isNaN(input.value)) {
      input.value = "";
      return;
    }
    
    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  // 2. Clear current input and move to previous input on Backspace or Delete
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      input.value = "";
      if (index > 0) {
        inputs[index - 1].focus();
      }
    }
  });
});