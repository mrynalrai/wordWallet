import { elements } from "./base";

export const getInput = () => {
    let formInputs = Array.from(elements.formInputs);
    return formInputs.map(node => node.value);
};

export const clearInput = () => {
    let formInputs = Array.from(elements.formInputs);
    formInputs[0].focus();
    formInputs.forEach(node => node.value = '');
}

export const clearResults = () => {
    elements.wordList.innerHTML = '';
}

export const renderResults = (words) => {
    words.forEach(renderWord);
};

const renderWord = word => {
    if (word.sample !== '') {
        word.sample = `<q><em>${word.sample}</q></em>`
    }
    const markup = 
    `
    <li id="${word.id}">
        <a class="item" href="#${word.id}">
            <div>
                <h2>${word.word} <ion-icon class="delete" name="close"></ion-icon> </h2>
                <p>${word.meaning}</p>
                <p>${word.sample}</p>
                <p>${word.details}</p>
            </div>
        </a>
    </li>
    `;
    elements.wordList.insertAdjacentHTML('beforeend', markup);
}

export const deleteWord = node => {
    if (node.parentElement) node.parentElement.removeChild(node);
}