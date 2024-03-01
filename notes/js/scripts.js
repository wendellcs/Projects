const sendBtn = document.querySelector('.btn.formButton')
const form = document.getElementById('form')
const containerBox = document.querySelector('.container-box')
const qtd = document.querySelector('.qtd')

const word = document.querySelector('.form-box-word')
const meaning = document.querySelector('.form-box-meaning')

const popup = document.querySelector('.container-popup')
form.addEventListener('submit', (e) => { e.preventDefault() })

const boxes = []

class Box {
    constructor(title, text) {
        this.title = title
        this.text = text
    }
}

sendBtn.addEventListener('click', (e) => {
    if (word.value && meaning.value) {
        const box = new Box(word.value, meaning.value)
        boxes.push(box)

        renderNotes()
    } else {
        alert('Preencha todos os campos')
    }
})

function renderNotes(saved) {
    containerBox.innerHTML = ''

    if (saved) {
        boxes.push(...saved)
    }

    console.log(boxes.length)

    boxes.forEach((box, index) => {
        containerBox.append(createBox(box, index))
    })

    qtd.textContent = boxes.length
    updateAndSaveNotes(boxes)
}


function createBox(box, index) {
    const { title, text } = box

    const boxDiv = document.createElement('div')
    boxDiv.classList.add('box')

    const _title = document.createElement('h2')
    _title.textContent = title

    const _text = document.createElement('p')
    _text.textContent = text

    const buttonsContainer = document.createElement('div')
    buttonsContainer.classList.add('buttons-container')

    const editBtn = document.createElement('button')
    editBtn.innerHTML = 'Edit'
    editBtn.setAttribute('data', index)
    editBtn.classList.add('btn', 'edit')

    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.setAttribute('data', index)
    deleteBtn.classList.add('btn', 'delete')

    buttonsContainer.appendChild(editBtn)
    buttonsContainer.appendChild(deleteBtn)

    boxDiv.appendChild(_title)
    boxDiv.appendChild(_text)
    boxDiv.appendChild(buttonsContainer)

    return boxDiv
}


document.addEventListener("click", (e) => {
    if (popup.parentElement) {
        if (!popup.contains(e.target) && !e.target.classList.contains('edit')) {
            popup.parentElement.removeChild(popup)
        }
    }
})

containerBox.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data")
    const parent = e.target.parentElement.parentElement

    if (e.target.classList.contains('delete')) {
        boxes.splice(index, 1)
        containerBox.removeChild(parent)
        renderNotes()
    }

    if (e.target.classList.contains('edit')) {
        if (popup.parentElement == parent) {
            popup.classList.add('hidden')
            parent.removeChild(popup)
        } else {
            popup.classList.remove('hidden')
            parent.append(popup)
            popup.querySelector('#popup-word').focus()
            verifyCardHeight(parent)
        }
    }

})


// Verify the height of the new card and if necessary, generate the popup further from the top
function verifyCardHeight(parent) {
    const elementHeigh = parent.offsetHeight
    if (elementHeigh > 180) {
        popup.style.top = elementHeigh + 'px'
    } else {
        popup.style.top = '180px'
    }
}


// Preventing default popup-form behavior 
document.querySelector('.popup-form').addEventListener('submit', (e) => {
    e.preventDefault()
})

// Saves all the notes in the user's browser
function updateAndSaveNotes(list) {
    localStorage.clear()
    localStorage.setItem('notes', JSON.stringify(list))
}

// Get every note which has been saved in the browser
renderNotes(renderNotes(JSON.parse(localStorage.getItem('notes'))))