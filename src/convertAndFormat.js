function convertAndFormat(num) {
  if (typeof num !== 'number') {
    throw new Error(`${num} is not a number`)
  }

  //negative boolean
  const isNegative = num < 0;

  //change num to string
  num = num.toString();

  //split num into an array
  num = num.split('');


  if (isNegative) {
    num.shift();
  }

  let i = num.indexOf('.');
  if (i === -1) {
    i = num.length;
  }

  for (let j = i - 3; j > 0; j = j - 3) {
    num.splice(j, 0, ',');
  }

  if (isNegative) {
    num.unshift('-');
  }

  num = num.join('');
  return num;
}

export default convertAndFormat


