import uniqid from 'uniqid';
import axios from 'axios';
import { renderSnackbar } from '../uiComponents/Snackbar';
import { elements } from '../views/base';

export default class List{
    constructor() {
        this.words = [];
    }
    async getWordList() {
        try {
            const res = await axios({
                method: 'GET',
                url: 'https://api.mywordwallet.com/.netlify/functions/api/v1/words',
                // url: 'http://127.0.0.1:9000/.netlify/functions/api/v1/words'
                withCredentials: true,
			          credentials: 'include'
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
          console.log(err.response);
          // renderSnackbar(err.response.data.message);
          // https://stackoverflow.com/questions/57222395/hosting-a-react-app-and-express-app-on-the-same-domain
          renderSnackbar('You are not logged in!');
          return err.response.data.error.statusCode;
        }
    }
    async getWord(query) {
        // return this.words.find(word => word.word.toLowerCase() == query.toLowerCase());
        // let word = this.words.find(word => word.word.toLowerCase() == query.toLowerCase());
        // if(!word) return;
        try {
            const res = await axios({
                method: 'GET',
                url: `https://api.mywordwallet.com/.netlify/functions/api/v1/words/${query}`,
                // url: `https://http://127.0.0.1:9000/.netlify/functions/api/v1/words/${query}`
                withCredentials: true,
			          credentials: 'include'
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
            const lWord = word.word.toLowerCase().trim();
            const res = await axios({
              method: 'POST',
              url: 'https://api.mywordwallet.com/.netlify/functions/api/v1/words',
              // url: 'http://127.0.0.1:9000/.netlify/functions/api/v1/words',
              data: {
                word: lWord,
                meaning: word.meaning,
                sample: word.sample,
                details: word.details
              },
              withCredentials: true,
			        credentials: 'include'
            });
        
            if (res.data.status === 'success') {
              renderSnackbar('Word added successfully');
              return word;
            //   window.setTimeout(() => {
            //     location.assign('/');
            //   }, 1500);
            }
          } catch (err) {
            if (err.response && err.response.data && err.response.data.message && err.response.data.message.code && err.response.data.message.code == 11000) {
              renderSnackbar("Request failed. Word already added.");
            } else {
              renderSnackbar("Request failed.");
            }
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
              url: `https://api.mywordwallet.com/.netlify/functions/api/v1/words/${id}`,
              // url: `http://127.0.0.1:9000/.netlify/functions/api/v1/words/${id}`,
              withCredentials: true,
			        credentials: 'include'
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

    async logout() {
      try {
        const res = await axios({
          method: 'POST',
          // url: 'http://127.0.0.1:9000/.netlify/functions/api/v1/users/logout',
          url: `https://api.mywordwallet.com/.netlify/functions/api/v1/users/logout`,
          data: {},
          withCredentials: true,
          credentials: 'include'
        });
        if ((res.data.status === 'success')) {
          elements.logoutBtn.style.color = "#ffffff";
          location.reload(true);
        }
      } catch (err) {
        elements.logoutBtn.style.color = "#ffffff";
        // console.log(err.response);
        renderSnackbar('Error logging out! Try again.');
      }
    };

    async getUserDetails() {
      try {
        const res = await axios({
          method: 'GET',
          // url: 'http://127.0.0.1:9000/.netlify/functions/api/v1/users/details',
          url: `https://api.mywordwallet.com/.netlify/functions/api/v1/users/details`,
          data: {},
          withCredentials: true,
          credentials: 'include'
        });
        if ((res.data.status === 'success')) {
          return [res.data.data.name, res.data.data.email];
        }          
      } catch (err) {
        // console.log(err.response);
          // renderSnackbar(err.response.data.message);
          renderSnackbar('You are not logged in!');
          return err.response.status;
      }
    };

    // persistData() {
    //     localStorage.setItem('words', JSON.stringify(this.words));
    // }

    // async readStorage() {
    //     // const storage = JSON.parse(localStorage.getItem('words'));
        
    //     // Restoring likes from the localStorage
    //     // if (storage) this.words = storage;
    // }
}