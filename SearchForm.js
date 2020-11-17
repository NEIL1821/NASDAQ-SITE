import {getUrlAsync} from "./asyncFetch.js";

export class SearchForm {
    constructor(inputElement, buttonElement) {
        this.input = inputElement;
        this.button = buttonElement;
    };
 
    onSearch(func) {
        this.button.addEventListener("click", () => {
            var results = getUrlAsync(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.input.value}&limit=10&exchange=NASDAQ`);
            results.then(data => {
                func(data, this.input.value);
            });
        });
    };

};
