import axios from 'axios';
import { renderSnackbar } from '../uiComponents/Snackbar';
import { elements } from '../views/base';
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
			if (self.validateFields(document.querySelector(`#${self.fields[0]}`)) == true) {
				self.forgotPass(document.querySelector(`#${self.fields[0]}`).value);
			} else {
				elements.forgotBtn.value = "SUBMIT";
			}
		});
	}
	
	validateFields(field) {
		if (field.id == "forgotEmail") {
		  const re = new RegExp(/(.+)@(.+){2,}\.(.+){2,}/);
		  if (!re.test(field.value)) {
			this.setStatus(
			  elements.forgotUsernameError,
			  "error"
			);
			return false;
		  } else {
			this.setStatus(elements.forgotUsernameError, "success");
			return true;
		  }
		} else {
		  this.setStatus(elements.forgotUsernameError, "success");
		  return true;
		}
	  }
	
	  setStatus(field, status) {
		if (status == "success") {
		  if (field) {
			field.style.display = "none";
		  }
		}
	
		if (status == "error") {
		  console.log(field);
		  field.style.display = "inline";
		}
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
			elements.forgotBtn.value = "SUBMIT";
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
