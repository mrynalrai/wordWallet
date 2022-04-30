import { elements } from '../views/base';

export const renderSnackbar = (msg) => {
    elements.snackBar.innerHTML = msg;
    elements.snackBar.className = "show";
    setTimeout(function(){ elements.snackBar.className = elements.snackBar.className.replace("show", ""); }, 3000);
}