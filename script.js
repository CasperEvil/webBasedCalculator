const displayField = document.querySelector('#displayField');
const equalsBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#clear');
const allNumberBtns = document.querySelectorAll('.calcBtn');
const allOperatorBtns = document.querySelectorAll('.operatorBtn');
const backBtn = document.querySelector('#backBtn');
const decimalBtn = document.querySelector('#decimalBtn');

let operator;
let firstNumber = '';
let secondNumber = '';
let firstToSecond = false;
let allowMoreDecimals = true;

allNumberBtns.forEach(element => {
    element.addEventListener('click', (e) => {
        if (displayField.value === 'You can\'t do that! Try again!') {
            displayField.value = '';
            firstNumber = '';
            secondNumber = '';
            firstToSecond = false;
            displayField.value += element.textContent;
            firstNumber += element.textContent;
        } else if ((displayField.value).length > 25) {
            // do nothing
        } else if (!firstToSecond) {
            if (element.textContent === '.' && displayField.value === '') {
                displayField.value += '0'
            }
            displayField.value += element.textContent;
            firstNumber += element.textContent;         
        } else {
            if (secondNumber === '') {
                displayField.value = '';
            }
            if (element.textContent === '.' && secondNumber === '') {
                displayField.value += '0'
            }
            displayField.value += element.textContent;
            secondNumber += element.textContent;
        }
    });
});

allOperatorBtns.forEach(element => {
    element.addEventListener('click', (e) => {
        operator = element.textContent;
        firstToSecond = true;
        allowMoreDecimals = true;
        decimalBtn.disabled = false;
        element.classList.add('inUseOperator');
    });
});

clearBtn.addEventListener('click', (e) => {
    clear();
});

backBtn.addEventListener('click', (e) => {
    if ((displayField.value).length === 1) {
        displayField.value = '';
    } else if (displayField.value.length > 1) {
        displayField.value = (displayField.value).slice(0, -1)
    }
});

decimalBtn.addEventListener('click', (e) => {
    allowMoreDecimals = false;
    decimalBtn.disabled = true;
});

equalsBtn.addEventListener('click', (e) => {

    if (firstNumber === '' || secondNumber === '') {
        return null;
    }
    
    let x, y = 0;

    if (firstNumber.includes('.')) {
        x = parseFloat(firstNumber, 10);
    } else {
        x = parseInt(firstNumber, 10);
    }

    if (secondNumber.includes('.')) {
        y = parseFloat(secondNumber, 10);
    } else {
        y = parseInt(secondNumber, 10);
    }

    let output = 0;
    switch (operator) {
        case '+': 
            output = add(x, y);
            break;
        case '-':
            output = subtract(x, y);
            break;
        case '*':
            output = multiply(x, y);
            break;
        case '/':
            output = divide(x, y);
            break;
    }

    displayField.value = output;
    firstNumber = displayField.value;

    allOperatorBtns.forEach(element => {
        if (element.classList.contains('inUseOperator')) {
            element.classList.remove('inUseOperator');
        }
    });

    secondNumber = '';
});

function add(num1, num2) {
    const answer = num1 + num2;
    if (answer.length > 25) {
        return answer.toFixed(25);
    } else {
        return answer;
    }
}
function subtract(num1, num2) {
    const answer = num1 - num2;
    if (answer.length > 25) {
        return answer.toFixed(25);
    } else {
        return answer;
    }
}
function multiply(num1, num2) {
    const answer = num1 * num2;
    if (answer.length > 25) {
        return answer.toFixed(25);
    } else {
        return answer;
    }
}
function divide(num1, num2) {
    if (num1 === 0 || num2 === 0) {
        return 'You can\'t do that! Try again!';
    } else {
        const answer = num1 / num2;
        if (answer.length > 25) {
            return answer.toFixed(25);
        } else {
            return answer;
        }
    }
}
function clear() {
    displayField.value = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    firstToSecond = false;
    allowMoreDecimals = true;
    decimalBtn.disabled = false;
}