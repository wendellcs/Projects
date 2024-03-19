class Render {
    constructor({ cardsContainer, definitionsContainer }) {
        if (!cardsContainer || !definitionsContainer) throw new Error('Containers are required');

        this.cardsContainer = cardsContainer;
        this.definitionsContainer = definitionsContainer;
    }

    renderCards(cards) {
        this.cardsContainer.innerHTML = '';
        if (cards.length > 0) {
            cards.forEach((_card) => {
                const card = document.createElement('div');
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


                card.appendChild(title);
                card.appendChild(topics);

                this.cardsContainer.appendChild(card);
            })
        }


    }

    updateCardsNumber(value) {
        document.querySelector('.qtd').textContent = value
    }

    renderDefinitions(definition) {

    }
}