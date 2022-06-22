



// Milestone 1 - Fibonacci

// function fibonacci(n) {
//    return n < 1 ? 0: n <= 2 ? 1: fibonacci(n - 1) + fibonacci(n - 2)
// }

// function printRes(Number) {
//       console.log(`The Fib of ${Number} is ${fibonacci(Number)}`);
//       document.querySelector('h4').textContent = `The Fibonacci  of ${Number} is ${fibonacci(Number)}`
// }


// printRes(6)




// Milestone #2

// const fibonacci = n => {
//       let a = 0, b = 1, c = n;

//       for(let i = 2; i <= n; i++) {
//         c = a + b;
//         a = b;
//         b = c;
//       }

//       return c;

//     };

//     let fibNumber = 8

// document.querySelector('h4').textContent = 
// `The fibonacci of ${fibNumber} is 
// ${fibonacci(fibNumber)}`


// Milestone #3


const button = document.querySelector('button')
const userInput = document.querySelector('input')

button.addEventListener('click' , () => {
      let fibNumber = userInput.value
      const fibonacci = n => {
            let a = 0, b = 1, c = n;
      
            for (let i = 2; i <= n; i++) {
                  c = a + b;
                  a = b;
                  b = c;
            }
      
            return c;  
      
      };
      
       
      
      document.querySelector('span').textContent =  `${fibonacci(fibNumber)}`
      
})




// Milestone 4

fetch('http://localhost:5050/fibonacci/5')
.then(response => response.json())
.then(data => {
      console.log(data)
})
     



