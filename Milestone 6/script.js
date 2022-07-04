// UI Elements 
const isButton = document.querySelector('.is-button')
const result = document.querySelector('.result')
const userInput = document.querySelector('.user-input')
const spinnerElement = document.querySelector('#spinnerElement')
const errorMessage = document.querySelector('.error-message')
const resultsContainer = document.querySelector('.results-container')


// Hide Error on Default 
hideError()


// Event Listerners
isButton.addEventListener('click', calcFibo)


// Hide Spinner On Default
hideSpinner()



// Fucntions    // Calc Fibo Main Fucntion

function calcFibo(e) {
    e.preventDefault()

   if(userInput.value === '') return 
    userInput.style.borderColor = 'black'
    hideError()
    const number = userInput.value

    if (number > 50) {
        showError()
        return
    }

    getResults()
    showSpinner()




    // Fetch data from local Server
    fetch(`http://localhost:5050/fibonacci/${number}`)
        .then(data => data.json())
        .then(res => {
            console.log(res);

            result.style.color = 'black'
            result.textContent = res.result
            result.style.textDecoration = 'underline'
            result.style.fontSize = '25px'
            result.style.fontWeight = 'bold'
            hideSpinner()
        })

        .catch(err => {
            console.error(err)
            presentError42()
            hideSpinner()
        })



}










// Spinners + Erros Fucntions

function hideSpinner() {
    spinnerElement.style.display = 'none'
}

function showSpinner() {
    spinnerElement.style.display = 'inline-block'
}

function showError() {

    errorMessage.style.display = 'block'
    userInput.style.borderColor = '#D9534F'

}

function hideError() {
    errorMessage.style.display = 'none'

}



function presentError42() {
    result.style.fontWeight = '400'
    result.style.color = '#D9534F'
    result.style.fontSize = '14px'
    result.textContent = 'Server Error: 42 is the meaning of life'
    result.style.textDecoration = 'none'

}


// MILESTONE 6

function getResults() {
    fetch(`http://localhost:5050/getFibonacciResults `)
        .then(data => data.json())
        .then(res => {
            
             console.log(res);
            for (let i of res.results) {

                const HTML = `<span class="fs-5-text border-bottom  border-secondary mt-4">The Fibonnaci Of <b>${i.number}</b> is <b>${i.result}</b>. Calculated at: ${(new Date(i.createdDate)).toString()} <br> </span>`

                resultsContainer.insertAdjacentHTML("beforeend", HTML)

            }


        })


}


