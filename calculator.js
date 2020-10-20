// initialize a flag for the first number entered in the calculator
let enteringFirstNum = true;

// define vars for last value and the last operator pressed
let displayValue = '0';
let lastValue;
let lastOperator;

// define necessary DOM elements to be javascript vars
const screen = document.getElementById('screen');
const equalButton = document.getElementById('equal');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');

// wire up operatorCicked with operator buttons
document.getElementById('add').addEventListener('click', operatorClicked);
document.getElementById('subtract').addEventListener('click', operatorClicked);
document.getElementById('multiply').addEventListener('click', operatorClicked);
document.getElementById('divide').addEventListener('click', operatorClicked);

// wire up equal button with equalClicked function
document.getElementById('equal').addEventListener('click', equalClicked);

// wire up clearClicked with clear button
document.getElementById('clear').addEventListener('click', clearClicked);

// wire up onclick for all number buttons
document.getElementById('zero').addEventListener('click', numberClicked);
document.getElementById('one').addEventListener('click', numberClicked);
document.getElementById('two').addEventListener('click', numberClicked);
document.getElementById('three').addEventListener('click', numberClicked);
document.getElementById('four').addEventListener('click', numberClicked);
document.getElementById('five').addEventListener('click', numberClicked);
document.getElementById('six').addEventListener('click', numberClicked);
document.getElementById('seven').addEventListener('click', numberClicked);
document.getElementById('eight').addEventListener('click', numberClicked);
document.getElementById('nine').addEventListener('click', numberClicked);

// adds two values
function add(a, b) {
  return a + b;
}

// subtracts two values
function subtract(a, b) {
  return a - b;
}

// multiplies two values
function multiply(a, b) {
  return a * b;
}

// divides two values
function divide(a, b) {
  return a / b;
}

// takes an math operator and two values and applies the operator to the numbers
function operate(operator, a, b) {
  return operator(a, b);
}

// clears all values when the clear button is pressed
function clearClicked() {
  screen.innerHTML = 0;
}

// updates screen value when numbers are pressed
function numberClicked() {
  displayValue = screen.innerHTML.toString();
  displayValue += this.innerHTML.toString();
  screen.innerHTML = displayValue;
}

// called when the equal button is clicked. takes the stored lastValue and lastOperator
// with the current displayValue and updates the screen to display the result
function equalClicked() {
  let currentValue = Number(displayValue);
  switch(lastOperator) {
    case ('+'):
      screen.innerHTML = operate(add, lastValue, currentValue);
      break;
    case ('-'):
      screen.innerHTML = operate(subtract, lastValue, currentValue);
      break;
    case ('*'):
      screen.innerHTML = operate(multiply, lastValue, currentValue);
      break;
    case ('/'):
      screen.innerHTML = operate(divide, lastValue, currentValue);
  };
}

// called when an operation button is pressed. gathers values for the first number
// and operator to be used in calculation
function operatorClicked() {
  // get first number, operator, and reset screen to 0 for second number
  lastValue = Number(displayValue);
  lastOperator = this.innerHTML;
  screen.innerHTML = '0';
}
