const sendBtn = document.querySelector('.btn.formButton')
const form = document.getElementById('form')
const containerBox = document.querySelector('.container-box')
const qtd = document.querySelector('.qtd')

const word = document.querySelector('.form-box-word')
const meaning = document.querySelector('.form-box-meaning')
form.addEventListener('submit', (e) => { e.preventDefault() })

const boxes = [{
    title: 'Teste',
    text: 'lorem ipsum dolor sit amet, consectet null a ante tell Lorem ipsum dolor'
}]


renderNotes()

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

function renderNotes() {
    containerBox.innerHTML = ''
    boxes.forEach((box, index) => {
        containerBox.append(createBox(box, index))
        qtd.textContent = boxes.length
    })
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

containerBox.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data")
    const parent = e.target.parentElement.parentElement

    if (e.target.classList.contains('delete')) {
        boxes.splice(index, 1)
        containerBox.removeChild(parent)
    }

    if (e.target.classList.contains('edit')) {

    }

    renderNotes()
})