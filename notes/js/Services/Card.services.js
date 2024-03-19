class CardService {
    constructor() {
        this.cardList = []
    }

    addCard(card) {
        if (!card instanceof CardModel) throw TypeError('Card must be an instance of Card')
        this.cardList.push(card)
    }
}