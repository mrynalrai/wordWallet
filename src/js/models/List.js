import uniqid from 'uniqid';

export default class List{
    constructor() {
        this.words = [];
    }
    getWordList() {
        return this.words;
    }

    addWord(word) {
        let newWord = {
            id: uniqid()
        }
        newWord = Object.assign(word, {id:uniqid()});
        this.words.push(newWord);
        return word;
    }

    deleteWord(id) {
        const index = this.words.findIndex(el => el.id === id);
        // // [2,4,8] splice(1, 2) -> returns [4, 8], original array is [2]
        // // [2,4,8] slice(1, 2) -> returns 4, original array is [2,4,8]
        this.words.splice(index, 1);
    }
}