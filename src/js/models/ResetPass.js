import axios from 'axios';
import { renderSnackbar } from '../uiComponents/Snackbar';
import { elements } from '../views/base';
import * as resetPassView from './../views/resetPassView';

export default class ResetPass {
	constructor(form, fields, token) {
		this.form = form;
		this.fields = fields;
		this.token = token;
		this.validateonSubmit();
	}

	async validateonSubmit() {
		let self = this;

		this.form.addEventListener("submit", (e) => {
			elements.resetBtn.value = "SENDING...";
			e.preventDefault();
			// resetPassView.postSubmit()
			// var error = 0;
			self.resetPass(document.querySelector(`#${self.fields[0]}`).value, document.querySelector(`#${self.fields[1]}`).value)
		});
	}

	async resetPass(resetPassword, resetConfirmPassword) {
        try {
			// console.log(email, password);
            const res = await axios({
              method: 'PATCH',
              url: `https://api.mywordwallet.com/.netlify/functions/api/v1/users/resetPassword/${this.token}`,
              // url: 'http://127.0.0.1:9000/.netlify/functions/api/v1/users/forgotPassword',
              data: {
                password: resetPassword,
				passwordConfirm: resetConfirmPassword
              },
			  withCredentials: true,
			  credentials: 'include'
            });
			console.log(res.data.status);
            if (res.data.status == 'success') {
				resetPassView.postSubmit();
            }
          } catch (err) {
			elements.resetBtn.value = "SUBMIT";
            renderSnackbar("Something went wrong.");
          }
    }
}

