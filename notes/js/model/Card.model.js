export class Card {
    constructor(_word, _index) {
        if (!_word || !_index) {
            throw new Error('Word and index are required')
        }
        this.word = _word
        this.index = _index
    }

    getIndex() {
        return this.index
    }
}
