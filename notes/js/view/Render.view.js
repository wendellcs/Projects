class Render {
    constructor({ cardsContainer, definitionsContainer }) {
        if (!cardsContainer || !definitionsContainer) throw new Error('Containers are required');

        this.cardsContainer = cardsContainer;
        this.definitionsContainer = definitionsContainer;
    }

    // Creates a new card with the given word and its classes.
    renderCards(cards) {
        this.cardsContainer.innerHTML = '';
        if (cards.length > 0) {
            cards.forEach((_card, i) => {
                const card = document.createElement('div');
                card.setAttribute('data', i)
                card.classList.add('card');

                const title = document.createElement('h2')
                title.textContent = _card.word;

                const topics = document.createElement('select')
                topics.className = 'topics'

                _card.wordClasses.forEach((wc) => {
                    const option = document.createElement('option')
                    option.textContent = wc;
                    option.className = 'topics-option'
                    option.value = wc
                    topics.appendChild(option)
                })

                const viewBtn = document.createElement('button')
                viewBtn.textContent = 'view'
                viewBtn.classList.add('btn', 'view')

                card.appendChild(title);
                card.appendChild(topics);
                card.appendChild(viewBtn);

                this.cardsContainer.appendChild(card);
            })
        }
    }

    // Render the definitions of the chosen word
    renderDefinitions(data, wordClass) {
        this.definitionsContainer.innerHTML = '';

        const { definitions, wordClasses } = data

        const index = wordClasses.findIndex(word => word.indexOf(wordClass) !== -1);

        definitions[index].forEach(defi => {
            const definition = document.createElement('div')
            definition.classList.add('definition')

            const p = document.createElement('p')
            p.textContent = defi.definition

            definition.append(p)
            this.definitionsContainer.appendChild(definition)
        })

        this.updateTitles(data, wordClass)
    }

    // Update the word class and the word title
    updateTitles({ word }, wordClass) {
        document.querySelector('.container-results-header-wordClass').textContent = wordClass
        document.querySelector('.container-results-header-word').textContent = word
    }

    // Update the number of created cards
    updateCardsNumber(value) {
        document.querySelector('.qtd').textContent = value
    }
}
