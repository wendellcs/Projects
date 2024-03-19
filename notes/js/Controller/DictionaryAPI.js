class DictionaryAPI {
    async getWord(word) {
        if (!word) throw new Error('Plesa, insert a valid word')

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

            if (!response.ok) throw new Error("We couldn't find the word in the dictionary...")

            const data = await response.json()

            const meanings = data[0].meanings
            const definitions = meanings.map(meaning => meaning.definitions)
            const wordClasses = meanings.map(mean => mean.partOfSpeech)

            const results = {
                word,
                wordClasses,
                definitions
            }

            return results
        } catch (err) {
            return null
        }
    }
}

/* Criar um texto escrito loading quando algo estiver carregando ( Ser mais criativo que isso) */