import axios from 'axios';
import { renderSnackbar } from '../uiComponents/Snackbar';
import { elements } from '../views/base';
import { renderWordList } from '../index';

export default class Signup {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.validateonSubmit();
	}

	async validateonSubmit() {
		let self = this;

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			var error = 0;
			self.fields.forEach((field) => {
				const input = document.querySelector(`#${field}`);
				if (self.validateFields(input) == false) {
					error++;
				}
			});
			if (error == 0) {
				self.userSignup(document.querySelector(`#${self.fields[0]}`).value, 
				document.querySelector(`#${self.fields[1]}`).value,
				document.querySelector(`#${self.fields[2]}`).value,
				document.querySelector(`#${self.fields[3]}`).value)
			}
		});
	}

	validateFields(field) {
		if (field.value.trim() === "") {
			this.setStatus(
				field,
				`${field.previousElementSibling.innerText} cannot be blank`,
				"error"
			);
			return false;
		} else {
			if (field.type == "password") {
				if (field.value.length < 8) {
					this.setStatus(
						field,
						`${field.previousElementSibling.innerText} must be at least 8 characters`,
						"error"
					);
					return false;
				} else {
					this.setStatus(field, null, "success");
					return true;
				}
			} else {
				this.setStatus(field, null, "success");
				return true;
			}
		}
	}

	setStatus(field, message, status) {
		const errorMessage = field.parentElement.querySelector(".error-message");

		if (status == "success") {
			if (errorMessage) {
				errorMessage.innerText = "";
			}
			field.classList.remove("input-error");
		}

		if (status == "error") {
			errorMessage.innerText = message;
			field.classList.add("input-error");
		}
	}

	async userSignup(name, email, password, passwordConfirm) {
        try {
			// console.log(email, password);
            const res = await axios({
              method: 'POST',
            //   url: 'https://wordwallet-api.netlify.app/.netlify/functions/api/v1/users/signup',
			  url: 'https://api.mrinalrai.in/.netlify/functions/api/v1/users/signup',
              // url: 'http://127.0.0.1:9000/.netlify/functions/api/v1/users/signup',
              data: {
				name,
                email,
                password,
				passwordConfirm
              },
			  // credentials: 'include', // Don't forget to specify this if you need cookies
			  withCredentials: true,
			  credentials: 'include'
            });
        
            if (res.data.status === 'success') {
              renderSnackbar('User successfully created');
            //   return word;
            //   window.setTimeout(() => {
            //     location.assign('/');
            //   }, 1500);
				elements.signupScreen.style.display = "none";
				elements.loginScreen.style.display = "none";
				elements.dashboard.style.display = "flex";
				renderWordList();
            }
          } catch (err) {
			console.log(err.response);
            renderSnackbar("Request failed. ");
          }
    }
}

const form = document.querySelector(".signup__input--container");
if (form) {
	const fields = ["name", "email", "signupPassword", "passwordCnfrm"];
	const validator = new Signup(form, fields);
}
