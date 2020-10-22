// initial flag for when starting a new number
let newValue = true;

// define vars for last value and the last operator pressed
let displayValue = '0';
let lastValue;
let currentValue;
let lastOperator = '=';

// define necessary DOM elements to be javascript vars
const screen = document.getElementById('screen');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');
const zeroButton = document.getElementById('zero');
const oneButton = document.getElementById('one');
const twoButton = document.getElementById('two');
const threeButton = document.getElementById('three');
const fourButton = document.getElementById('four');
const fiveButton = document.getElementById('five');
const sixButton = document.getElementById('six');
const sevenButton = document.getElementById('seven');
const eightButton = document.getElementById('eight');
const nineButton = document.getElementById('nine');

// wire up operatorCicked with operator buttons
addButton.addEventListener('click', operatorClicked);
subtractButton.addEventListener('click', operatorClicked);
multiplyButton.addEventListener('click', operatorClicked);
divideButton.addEventListener('click', operatorClicked);

// wire up equal button with equalClicked function
document.getElementById('equal').addEventListener('click', equalClicked);

// wire up clearClicked with clear button
document.getElementById('clear').addEventListener('click', clearClicked);

// wire up deleteClicked with delete button
document.getElementById('delete').addEventListener('click', deleteClicked);

// wire up onclick for all number buttons
zeroButton.addEventListener('click', numberClicked);
oneButton.addEventListener('click', numberClicked);
twoButton.addEventListener('click', numberClicked);
threeButton.addEventListener('click', numberClicked);
fourButton.addEventListener('click', numberClicked);
fiveButton.addEventListener('click', numberClicked);
sixButton.addEventListener('click', numberClicked);
sevenButton.addEventListener('click', numberClicked);
eightButton.addEventListener('click', numberClicked);
nineButton.addEventListener('click', numberClicked);

// wire up decimal point button
document.getElementById('decimal').addEventListener('click', decimalClicked);

// wire up keyboard support for numbers, decimal point, backspace, and operators
document.addEventListener('keyup', (e) => {
  switch (e.key) {
    case ('Backspace'):
      deleteClicked();
      break;
    case ('.'):
      decimalClicked();
      break;
    case ('+'):
      operatorClicked.call(addButton);
      break;
    case ('-'):
      operatorClicked.call(subtractButton);
      break;
    case ('*'):
      operatorClicked.call(multiplyButton);
      break;
    case ('/'):
      operatorClicked.call(divideButton);
      break;
    case ('0'):
      numberClicked.call(zeroButton);
      break;
    case ('1'):
      numberClicked.call(oneButton);
      break;
    case ('2'):
      numberClicked.call(twoButton);
      break;
    case ('3'):
      numberClicked.call(threeButton);
      break;
    case ('4'):
      numberClicked.call(fourButton);
      break;
    case ('5'):
      numberClicked.call(fiveButton);
      break;
    case ('6'):
      numberClicked.call(sixButton);
      break;
    case ('7'):
      numberClicked.call(sevenButton);
      break;
    case ('8'):
      numberClicked.call(eightButton);
      break;
    case ('9'):
      numberClicked.call(nineButton);
      break;
    case ('='):
        equalClicked();
  }
});

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
  screen.innerHTML = '0';
  displayValue = '0';
  lastOperator = '=';
  newValue = true;
}

// updates screen value when numbers are pressed
function numberClicked() {
  // if displayValue is 0 temporarily reset to empty string to remove leading 0
  if (displayValue === '0') {
    displayValue = '';
  // if starting a new value after a calculation reset to empty string to remove leading 0
  } else if (newValue === true) {
    displayValue = '';
  } else {
    displayValue = screen.innerHTML.toString();
  }
  displayValue += this.innerHTML.toString();
  screen.innerHTML = displayValue;
  newValue = false;
}

// called when the decimal point button is clicked and adds a decimal if okay
function decimalClicked() {
  if (!displayValue.includes('.')) {
    displayValue = screen.innerHTML.toString();
    displayValue += '.';
  } else if (newValue === true) {
    displayValue = '0.'
  }
  screen.innerHTML = displayValue;
  newValue = false;
}

// called when the equal button is clicked. takes the stored lastValue and lastOperator
// with the current displayValue and updates the screen to display the result
function equalClicked() {
  currentValue = Number(displayValue);
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
      // if dividing by 0 reset everything and display alert
      if (currentValue === 0) {
        alert('Dividing by 0 is not allowed');
        displayValue = '0';
        lastValue = 0;
        lastOperator = '=';
        newValue = true;
        return;
      }
      screen.innerHTML = operate(divide, lastValue, currentValue);
  };
  // reinitialize values for next calculation
  displayValue = '0';
  lastValue = 0;
  lastOperator = '=';
  newValue = true;
}

// delete one from screen if delete button pressed
function deleteClicked() {
  if (newValue === true  || displayValue.length === 1) {
    displayValue = '0';
    screen.innerHTML = displayValue;
  } else {
    displayValue = displayValue.substring(0, displayValue.length - 1);
    screen.innerHTML = displayValue;
  }
}

// called when an operation button is pressed. gathers values for the first number
// and operator to be used in calculation
function operatorClicked() {
  // get first number, operator, and reset screen to 0 for second number
  if (lastOperator === '=') {
    lastValue = Number(displayValue);
    lastOperator = this.innerHTML;
    displayValue = '0';
    screen.innerHTML = displayValue;
  } else {
    currentValue = Number(displayValue);
    switch(lastOperator) {
      case ('+'):
        lastValue = operate(add, lastValue, currentValue);
        break;
      case ('-'):
        lastValue = operate(subtract, lastValue, currentValue);
        break;
      case ('*'):
        lastValue = operate(multiply, lastValue, currentValue);
        break;
      case ('/'):
        // if dividing by 0 reset everything and display alert
        if (currentValue === 0) {
          alert('Dividing by 0 is not allowed');
          displayValue = '0';
          lastValue = 0;
          lastOperator = '=';
          newValue = true;
          return;
        }
        lastValue = operate(divide, lastValue, currentValue);
    };
    lastOperator = this.innerHTML;
    displayValue = lastValue.toString();
    screen.innerHTML = displayValue;
    newValue = true;
  }
}
