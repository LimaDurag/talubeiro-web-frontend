function generateRandomNumbers(N, X) {
    const min = Math.pow(10, X - 1);
    const max = Math.pow(10, X) - 1;
    const numbers = [];
  
    for (let i = 0; i < N; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.push(randomNumber);
    }
  
    return numbers;
  }

  export {generateRandomNumbers}