const sendBtn = document.querySelector('.btn.formButton')
const form = document.querySelector('.form')
const containerBox = document.querySelector('.container-box')
const qtd = document.querySelector('.qtd')

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
    const word = document.querySelector('.form-box-word').value
    const meaning = document.querySelector('.form-box-meaning').value

    if (word && meaning) {
        const box = new Box(word, meaning)
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
    deleteBtn.innerHTML = 'X'
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

        console.log('apaga')
    }

    if (e.target.classList.contains('edit')) {

    }

    renderNotes()
})