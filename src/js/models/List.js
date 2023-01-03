import uniqid from 'uniqid';
import axios from 'axios';
import { renderSnackbar } from '../uiComponents/Snackbar';

export default class List{
    constructor() {
        this.words = [];
    }
    async getWordList() {
        try {
            const res = await axios({
                method: 'GET',
                url: 'https://wordwallet-api.netlify.app/.netlify/functions/api/v1/words'
                // url: 'http://127.0.0.1:9000/.netlify/functions/api/v1/words'
            });
            // if ((res.data.status = 'success')) location.reload(true);
            this.words = res.data.data.words;
            let x = this.words.map(word => {
              word.num = Math.random();
              return word;
            });

            function compare(a, b) {
              // Use toUpperCase() to ignore character casing
              const bandA = a.num;
              const bandB = b.num;
            
              let comparison = 0;
              if (bandA > bandB) {
                comparison = 1;
              } else if (bandA < bandB) {
                comparison = -1;
              }
              return comparison;
            }
            
            x.sort(compare);
            this.words = x;

            return this.words;
        } catch (err) {
          renderSnackbar('Error fetching data! Try again.');
        }
    }
    async getWord(query) {
        // return this.words.find(word => word.word.toLowerCase() == query.toLowerCase());
        // let word = this.words.find(word => word.word.toLowerCase() == query.toLowerCase());
        // if(!word) return;
        try {
            const res = await axios({
                method: 'GET',
                url: `https://wordwallet-api.netlify.app/.netlify/functions/api/v1/words/${query}`
                // url: `https://http://127.0.0.1:9000/.netlify/functions/api/v1/words/${query}`
            });
            // if ((res.data.status = 'success')) location.reload(true);
            return res.data.data.docs;
        } catch (err) {
          renderSnackbar('Error fetching data! Try again.');
        }
    }
    async addWord(word) {
        // console.log(word);
        // let newWord = {
        //     id: uniqid()
        // }
        // newWord = Object.assign(word, {id:uniqid()});
        // this.words.push(newWord);
        // this.persistData();
        // return word;

        try {
            const res = await axios({
              method: 'POST',
              url: 'https://wordwallet-api.netlify.app/.netlify/functions/api/v1/words',
              // url: 'http://127.0.0.1:9000/.netlify/functions/api/v1/words',
              data: {
                word: word.word,
                meaning: word.meaning,
                sample: word.sample,
                details: word.details
              }
            });
        
            if (res.data.status === 'success') {
              renderSnackbar('Word added successfully');
              return word;
            //   window.setTimeout(() => {
            //     location.assign('/');
            //   }, 1500);
            }
          } catch (err) {
            renderSnackbar("Request failed. " + err.response.data.message.name);
          }
    }

    async deleteWord(id) {
        // const index = this.words.findIndex(el => el.id === id);
        // // // [2,4,8] splice(1, 2) -> returns [4, 8], original array is [2]
        // // // [2,4,8] slice(1, 2) -> returns 4, original array is [2,4,8]
        // this.words.splice(index, 1);
        // this.persistData();

        try {
            const res = await axios({
              method: 'DELETE',
              url: `https://wordwallet-api.netlify.app/.netlify/functions/api/v1/words/${id}`
              // url: `http://127.0.0.1:9000/.netlify/functions/api/v1/words/${id}`
            });
        
            // if (res.data.status === 'success') {
            renderSnackbar('Word deleted successfully');
            //   window.setTimeout(() => {
            //     location.assign('/');
            //   }, 1500);
            // }
          } catch (err) {
            renderSnackbar(err.response.data.message);
          }
    }

    // persistData() {
    //     localStorage.setItem('words', JSON.stringify(this.words));
    // }

    // async readStorage() {
    //     // const storage = JSON.parse(localStorage.getItem('words'));
        
    //     // Restoring likes from the localStorage
    //     // if (storage) this.words = storage;
    // }
}