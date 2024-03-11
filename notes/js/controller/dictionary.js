export async function dictionary(word) {
    if (!word) throw new Error('Plesa, insert a valid word')

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        if (!response.ok) throw new Error('Palavra não encontrada')

        const data = await response.json()

        const meanings = data[0].meanings
        const definitions = meanings.map(meaning => meaning.definitions)
        const titles = meanings.map(mean => mean.partOfSpeech)

        const results = {
            word,
            titles,
            definitions
        }

        return results
    } catch (err) {
        alert(err.message)
        return null
    }
}