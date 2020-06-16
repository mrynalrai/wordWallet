import { elements } from "./base";

export const clearResults = () => {
    elements.wordList.innerHTML = '';
}

export const renderResults = (words) => {
    words.forEach(renderWord);
};

const renderWord = word => {
    let markup;
    if (word.sample !== '') {
        markup = 
        `
        <li id="${word.id}">
            <a class="item" href="#${word.id}">
                <div>
                    <h2>${word.word} <ion-icon class="delete" name="close"></ion-icon> </h2>
                    <p>${word.meaning}</p>
                    <p><q><em>${word.sample}</q></em></p>
                    <p>${word.details}</p>
                </div>
            </a>
        </li>
        `;
    } else {
        markup = 
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
    }
    
    elements.wordList.insertAdjacentHTML('beforeend', markup);
}

export const renderNolistMsg = () => {
    const markup = 
    `
    <h2 class="no-result"><em>No results</em></h2>
    `;
    elements.wordList.insertAdjacentHTML('beforeend', markup);
}
export const deleteWord = node => {
    if (node.parentElement) node.parentElement.removeChild(node);
}