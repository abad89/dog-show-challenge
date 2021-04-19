const serverUrl = `http://localhost:3000/dogs`

const nameInput = document.getElementById('nameInput')
const breedInput = document.getElementById('breedInput')
const sexInput = document.getElementById('sexInput')
let currentDogId

const makeButton = `<td><button type="button">Edit Dog</button></td>`

const getDogs = () => {
   return fetch(`${serverUrl}`)
        .then(r => r.json())
}

const addDogToTable = (dog) => {
    const table = document.getElementById(`table-body`)
    table.innerHTML += `<tr id="${dog.id}"><td id="${dog.name}">${dog.name}</td><td id="${dog.breed}">${dog.breed}</td><td id="${dog.sex}">${dog.sex}</td>${makeButton}</tr>`
}


const addDogToEditForm = (tableEntry) => {
    const str = tableEntry.path[2].firstChild
    nameInput.value = str.id
    breedInput.value = str.nextSibling.id
    sexInput.value = str.nextSibling.nextSibling.id
    currentDogId = tableEntry.path[2].id
}


const editButtonClicked = (e) => {
    e.preventDefault()
    addDogToEditForm(e)
}

const makeEditButtonWork = () => {
    const buttons = document.querySelectorAll("button")
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            editButtonClicked(e)
        })
    })
}

const patchDog = (dogName, dogBreed, dogSex) => {
    dogName = nameInput.value
    dogBreed = breedInput.value
    dogSex = sexInput.value
    const formData = {
        "id": currentDogId,
        "name": `${dogName}`,
        "breed": `${dogBreed}`,
        "sex": `${dogSex}`
    }
    console.log(formData)
    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }
    fetch(`${serverUrl}/${currentDogId}`, configObj).then(location.reload()).catch(console.log(`error?`))
}

const submitButtonClicked = (e) => {
    e.preventDefault()
    patchDog(e)  
}

const makeSubmitButtonWork = () => {
    const button = document.getElementById('submit-button')
    button.addEventListener("click", (e) => {
        submitButtonClicked(e)
    })
}

getDogs().then(dogs => {
    dogs.forEach(dog => addDogToTable(dog))
    currentDogId =
    makeEditButtonWork()
    makeSubmitButtonWork()
})


