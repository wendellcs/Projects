class CardController {
    constructor(service, view) {
        view.renderCards(service.cardList)
        this.service = service
        this.view = view
    }

    addCard(card) {
        if (!card instanceof CardModel) throw TypeError("Card must be an instance of CardModel")

        this.service.addCard(card)
        this.view.renderCards(this.service.cardList)
        this.view.updateCardsNumber(this.service.cardList.length)
    }

    renderDefinitions(definitions, wordClass) {
        this.view.renderDefinitions(definitions, wordClass)
    }
}