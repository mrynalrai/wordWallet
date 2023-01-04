import axios from 'axios';
import { renderSnackbar } from '../uiComponents/Snackbar';

export default class Login {
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
				//do login api here
				self.userLogin(document.querySelector(`#${self.fields[0]}`).value, document.querySelector(`#${self.fields[1]}`).value)
				this.form.submit();
				// localStorage.setItem("auth", 1);
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

	async userLogin(email, password) {
        try {
			console.log(email, password);
            const res = await axios({
              method: 'POST',
              url: 'https://wordwallet-api.netlify.app/.netlify/functions/api/v1/users/login',
              // url: 'http://127.0.0.1:9000/.netlify/functions/api/v1/users/login',
              data: {
                email,
                password
              },
			  // credentials: 'include', // Don't forget to specify this if you need cookies
			  withCredentials: true,
			  credentials: 'include'
            });
        
            if (res.data.status === 'success') {
              renderSnackbar('User successfully login');
            //   return word;
            //   window.setTimeout(() => {
            //     location.assign('/');
            //   }, 1500);
            }
          } catch (err) {
			console.log(err);
            renderSnackbar("Request failed. ");
          }
    }
}

const form = document.querySelector(".login__input--container");
if (form) {
	const fields = ["username", "password"];
	const validator = new Login(form, fields);
}
