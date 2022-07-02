// UI Elements 
const isButton = document.querySelector('.is-button')
const result = document.querySelector('.result')
const userInput = document.querySelector('.user-input')
const spinnerElement = document.querySelector('#spinnerElement')
const errorMessage = document.querySelector('.error-message')
const resultsContainer = document.querySelector('.results-container')
const checkBox = document.querySelector('#check-box')
const form = document.querySelector('.form')
const resultsURL = `http://localhost:5050/getFibonacciResults`

// Hide Error on Default 
hideError()


// Event Listerners


// Hide Spinner On Default
hideSpinner()



// Fucntions    // Calc Fibo Main Fucntion


function calcFibo(e) {

    if (userInput.value === '') return
    userInput.style.borderColor = 'black'
    hideError()
 
    const number = userInput.value

    if (number > 50) {
        showError()
        errorMessage.innerHTML = ''
        return
    }

    showSpinner()




    // Fetch data from local Server
    fetch(`http://localhost:5050/fibonacci/${number}`)


        .then(data => {
            if (!data.ok) {
                data.text().then(data => {
                    result.innerHTML = `error : ${data}`
                    presentError42()
                    throw new Error(data)


                })
            }


            return data.json()
        })


        .then(res => {
            console.log(res);


            result.style.color = 'black'
            result.textContent = res.result
            result.style.textDecoration = 'underline'
            result.style.fontSize = '25px'
            result.style.fontWeight = 'bold'
            hideSpinner()
            getResults()


        })

        .catch(err => {
            console.log(err)
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
    result.style.textDecoration = 'none'

}


function hideError42() {
    result.innerHTML = ''
}




// MILESTONE 6

function getResults() {




    fetch(`http://localhost:5050/getFibonacciResults `)
        .then(data => data.json())
        .then(res => {

            const sorted = res.results.sort(function (a, b) {
                // console.log('a', a, 'b', b)
                if (a.createdDate < b.createdDate) return -1;
                if (a.createdDate > b.createdDate) return 1;

                return 0;
            })


            clearList()

            for (let i = 0; i < sorted.length; i++) {

                console.log(i);

                const HTML = `<span class="fs-4  pb-2    border-bottom  border-secondary  mt-5 lh-lg">The Fibonnaci Of <b>${res.results[i].number}</b> is <b>${res.results[i].result}</b>. Calculated at: ${(new Date(res.results[i].createdDate)).toString()} <br> </span>`

                resultsContainer.insertAdjacentHTML("beforeend", HTML)
            }



            // const HTML = `<span id="mySpan"  class="fs-5-text border-bottom  border-secondary pb-3 mt-4">The Fibonnaci Of <b>${sorted[i].number}</b> is <b>${sorted[i].result}</b>. Calculated at: ${(new Date(sorted[i].createdDate)).toString()} <br> </span>`


        })

        .catch(err => console.log(err))



}





// Milestone 7 


let checkBoxMode = false


form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (userInput.value === '') return

    if (!userInput.value === 42) {
        userInput.style.borderColor = 'black'
        result.style.textDecoration = 'underline'
        result.style.fontSize = '25px'
        result.style.fontWeight = 'bold'

    }


    hideError()



    const number = userInput.value

    if (number > 50) {
        showError()
        result.innerHTML = ''
        return
    }

    // BOX UNCHECKED
    if (!checkBox.checked) {

        result.style.fontWeight = 'bold'
        hideError()
        fibonacci(userInput.value)

    }


    // BOX CHECKED
    else {

        calcFibo()



    }







})





// Default Local Fibonnaci Function 
const fibonacci = n => {

    
    userInput.style.borderColor = '#CCCCCC'
    let a = 0, b = 1, c = n;

    for (let i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }

    // console.log(c);
    result.innerText = c



};



function clearList() {

    resultsContainer.innerHTML = ' '




}

// Milestone 7.1


const select = document.getElementById('select')

select.addEventListener('change', sortResults)


async function sortResults(e) {

if(!checkBox.checked) return 

    const selectValue = e.target.value
    console.log(e.target.value);

    const data = fetch(resultsURL)
    const res = await (await data).json()
    console.log('res', res);


    
    switch (selectValue) {

        case 'num-acc':
            clearList()
            const lowToHigh = res.results.sort((a, b) => {
                return a.number - b.number
            })

            for (let i = 0; i < lowToHigh.length; i++) {
                const HTML = `<span class="fs-4  pb-2    border-bottom  border-secondary  mt-5 lh-lg">The Fibonnaci Of <b>${lowToHigh[i].number}</b> is <b>${lowToHigh[i].result}</b>. Calculated at: ${(new Date(lowToHigh[i].createdDate)).toString()} <br> </span>`

                resultsContainer.insertAdjacentHTML("beforeend", HTML)
            }
            break

        case 'num-des':
            clearList()
            const highToLow = res.results.sort((a, b) => {
                return b.number - a.number
            })

            for (let i = 0; i < highToLow.length; i++) {
                const HTML = `<span class="fs-4  pb-2    border-bottom  border-secondary  mt-5 lh-lg">The Fibonnaci Of <b>${highToLow[i].number}</b> is <b>${highToLow[i].result}</b>. Calculated at: ${(new Date(highToLow[i].createdDate)).toString()} <br> </span>`

                resultsContainer.insertAdjacentHTML("beforeend", HTML)
            }
            break
            case 'date-acc':
                clearList()
                const dateACC = res.results.sort((a, b) => {
                    return a.createdDate - b.createdDate
    
                })
                for(let i = 0 ; i < dateACC.length; i++) {
                    const HTML = `<span class="fs-4  pb-2    border-bottom  border-secondary  mt-5 lh-lg">The Fibonnaci Of <b>${dateACC[i].number}</b> is <b>${dateACC[i].result}</b>. Calculated at: ${(new Date(dateACC[i].createdDate)).toString()} <br> </span>`
    
                    resultsContainer.insertAdjacentHTML("beforeend", HTML)
                }
    
                break


            

            break
            case 'date-des':
                clearList()
                const dateDes = res.results.sort((a, b) => {
                    return b.createdDate - a.createdDate
    
                })
                for(let i = 0 ; i < dateDes.length; i++) {
                    const HTML = `<span class="fs-4  pb-2    border-bottom  border-secondary  mt-5 lh-lg">The Fibonnaci Of <b>${dateDes[i].number}</b> is <b>${dateDes[i].result}</b>. Calculated at: ${(new Date(dateDes[i].createdDate)).toString()} <br> </span>`
    
                    resultsContainer.insertAdjacentHTML("beforeend", HTML)
                }
    
                break



    }

    


}










