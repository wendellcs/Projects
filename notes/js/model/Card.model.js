class CardModel {
    constructor({ word, wordClasses, definitions }) {
        if (!word || !wordClasses || !definitions) {
            throw new Error('These datas are required')
        }
        this.word = word
        // Tratar melhor esses abaixo:
        this.wordClasses = wordClasses
        this.definitions = definitions
    }
}
