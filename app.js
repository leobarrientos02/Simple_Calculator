// Class
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = "";
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === `.` && this.currentOperand.includes(`.`)) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    // Ensure that the user does not add two operations together
    if (this.currentOperand === ``) return;
    if (this.previousOperand !== ``) {
      {
        this.compute();
      }
    }
    // Get the operation selected
    this.operation = operation;
    // Saves the current operand
    this.previousOperand = this.currentOperand;
    // Clear the latest operand
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    // Check if the user actually enters a value
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case `+`:
        computation = prev + current;
        break;
      case `-`:
        computation = prev - current;
        break;
      case `*`:
        computation = prev * current;
        break;
      case `/`:
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = ``;
  }

  updateDisplay() {
    // Set the current Operand display
    this.currentOperandTextElement.innerText = this.currentOperand;

    // Set the previous Operand display
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}
// Declare Variables
const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
const equalsButton = document.querySelector(`[data-equals]`);
const deleteButton = document.querySelector(`[data-delete]`);
const allClearButton = document.querySelector(`[data-all-clear]`);
const previousOperandTextElement = document.querySelector(
  `[data-previous-operand]`
);
const currentOperandTextElement = document.querySelector(
  `[data-current-operand]`
);

// Declare the Calculator Class
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// All Numbers Buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Add a number to the output
    calculator.appendNumber(button.innerText);
    // Updates the Display
    calculator.updateDisplay();
  });
});

// All Operations Buttons
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Add an operation to the output
    calculator.chooseOperation(button.innerText);
    // Updates the Display
    calculator.updateDisplay();
  });
});

// Equals Button
equalsButton.addEventListener(`click`, (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

// Clear Button
allClearButton.addEventListener(`click`, (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

// Delete Button
deleteButton.addEventListener(`click`, (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
