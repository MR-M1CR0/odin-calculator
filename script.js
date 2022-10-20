'use strict';

let currentNum = '';
let previousNum = '';
let operator = '';

const currentDisplayNumber = document.querySelector('.currentNumber');
const previousDisplayNumber = document.querySelector('.previousNumber');
const decimal = document.querySelector('.decimal');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

const displayResults = function () {
  if (previousNum.length <= 19) {
    currentDisplayNumber.textContent = previousNum;
  } else {
    currentDisplayNumber.textContent = previousNum.slice(0, 19) + '...';
  }
  previousDisplayNumber.textContent = '';
  operator = '';
  currentNum = '';
};

const roundNumber = function (num) {
  return Math.round(num * 100000) / 100000;
};

const calculate = function () {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);
  if (operator === ' + ') {
    previousNum += currentNum;
  } else if (operator === ' - ') {
    previousNum -= currentNum;
  } else if (operator === ' x ') {
    previousNum *= currentNum;
  } else if (operator === ' ÷ ') {
    if (currentNum <= 0) {
      previousNum = 'Error';
      displayResults();
      return;
    }
    previousNum /= currentNum;
  }
  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResults();
};

const handleNumber = function (number) {
  if (previousNum !== '' && currentNum !== '' && operator === '') {
    previousNum = '';
    currentDisplayNumber.textContent = currentNum;
  }
  if (currentNum.length <= 20) {
    currentNum += number;
    currentDisplayNumber.textContent = currentNum;
  }
};

const operatorCheck = function (text) {
  operator = text;
  previousDisplayNumber.textContent = previousNum + operator;
  currentDisplayNumber.textContent = '';
  currentNum = '';
};

const handleOperator = function (op) {
  if (previousNum === '') {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === '') {
    operatorCheck(op);
  } else {
    calculate();
    operator = op;
    currentDisplayNumber.textContent = '0';
    previousDisplayNumber.textContent = previousNum + operator;
  }
};

numbers.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
  });
});

operators.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleOperator(e.target.textContent);
  });
});

equal.addEventListener('click', () => {
  if (currentNum !== '' && previousNum !== '') {
    calculate();
  }
});

const addDecimal = function () {
  if (!currentNum.includes('.')) {
    currentNum += '.';
    currentDisplayNumber.textContent = currentNum;
  }
};

decimal.addEventListener('click', addDecimal);

const clearResult = function () {
  currentNum = '';
  previousNum = '';
  operator = '';
  currentDisplayNumber.textContent = '0';
  previousDisplayNumber.textContent = previousNum;
};

clear.addEventListener('click', clearResult);

const deleteLastNum = function () {
  currentDisplayNumber.textContent = currentDisplayNumber.textContent
    .toString()
    .slice(0, -1);
  currentNum = currentDisplayNumber.textContent;
  if (
    currentDisplayNumber.textContent === '' &&
    previousDisplayNumber.textContent === ''
  )
    currentDisplayNumber.textContent = '0';
};

del.addEventListener('click', deleteLastNum);

window.addEventListener('keydown', (e) => {
  e.preventDefault();

  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }

  if (
    e.key === 'Enter' ||
    (e.key === '-' && currentNum !== '' && previousNum !== '')
  ) {
    calculate();
  }

  if (e.key === '+') handleOperator(' + ');
  if (e.key === '-') handleOperator(' - ');
  if (e.key === '*') handleOperator(' x ');
  if (e.key === '/') handleOperator(' ÷ ');

  if (e.key === '.') addDecimal();

  if (e.key === 'Delete') clearResult();

  if (e.key === 'Backspace') deleteLastNum();
});
