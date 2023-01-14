import axios from 'axios';
import { renderSnackbar } from '../uiComponents/Snackbar';
import { elements } from '../views/base';
import { renderWordList, showScreen } from '../index';
import * as forgotPassView from './../views/forgotPassView';

export default class ForgotPass {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.validateonSubmit();
	}

	async validateonSubmit() {
		let self = this;

		this.form.addEventListener("submit", (e) => {
			elements.forgotBtn.value = "SENDING...";
			e.preventDefault();
			// forgotPassView.postSubmit()
			// var error = 0;
			self.forgotPass(document.querySelector(`#${self.fields[0]}`).value)
		});
	}

	async forgotPass(email) {
        try {
			// console.log(email, password);
            const res = await axios({
              method: 'POST',
              url: 'https://api.mywordwallet.com/.netlify/functions/api/v1/users/forgotPassword',
              // url: 'http://127.0.0.1:9000/.netlify/functions/api/v1/users/forgotPassword',
              data: {
                email
              },
			  withCredentials: true,
			  credentials: 'include'
            });
        
            if (res.data.status === 'success') {
				forgotPassView.postSubmit();
            }
          } catch (err) {
			elements.loginBtn.value = "SUBMIT";
            renderSnackbar("Something went wrong.");
          }
    }
}

const form = document.querySelector(".forgotPass__input--container");
if (form) {
	console.log(form);
	const fields = ["forgotEmail"];
	const validator = new ForgotPass(form, fields);
}
