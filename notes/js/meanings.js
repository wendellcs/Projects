export class Dictionary {

    static async getWordMeaning(word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        const data = await response.json()

        const meanings = data[0].meanings

        const definitions = meanings.map(meaning => meaning.definitions)

        const titles = meanings.map(mean => mean.partOfSpeech)

        const info = {
            word,
            titles,
            definitions
        }

        return info
    }
}