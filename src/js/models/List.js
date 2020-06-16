import uniqid from 'uniqid';

export default class List{
    constructor() {
        this.words = [];
    }
    getWordList() {
        return this.words;
    }
    getWord(query) {
        return this.words.find(word => word.word.toLowerCase() == query.toLowerCase());
    }
    addWord(word) {
        let newWord = {
            id: uniqid()
        }
        newWord = Object.assign(word, {id:uniqid()});
        this.words.push(newWord);
        this.persistData();
        return word;
    }

    deleteWord(id) {
        const index = this.words.findIndex(el => el.id === id);
        // // [2,4,8] splice(1, 2) -> returns [4, 8], original array is [2]
        // // [2,4,8] slice(1, 2) -> returns 4, original array is [2,4,8]
        this.words.splice(index, 1);
        this.persistData();
    }

    persistData() {
        localStorage.setItem('words', JSON.stringify(this.words));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('words'));
        
        // Restoring likes from the localStorage
        if (storage) this.words = storage;
    }
}