const number = document.querySelector('.number');
const btn = document.querySelector('.btn');
const output = document.querySelector('.display');

getFibonacci = (num) => {
  if (isNaN(num)) { return alert('Please enter a number'); }
  let memo = [0, 1];

  for (; num > 1; num--) {
    memo.push(memo.shift() + memo[0]);
  }
  return memo[num];
};

const handleClick = (e) => {
  e.preventDefault();

  const result = getFibonacci(number.value);
  output.value = result ? result : '';
  number.value = '';
};

btn.addEventListener('click', handleClick);

