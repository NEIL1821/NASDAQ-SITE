import {getUrlAsync} from "./asyncFetch.js";

export class SearchResult {
    constructor(element) {
        this.element = element;
        // this.fetcher = new Fetcher();
    };

    displayResults(dataFromSearch, searchText) {//create list elements out of
        this.element.innerHTML ="";
        for (let i = 0 ; i < dataFromSearch.length ; i++ ) {
            var companyResults = getUrlAsync(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${dataFromSearch[i].symbol}`);
            companyResults.then(companyData => {

                var listItem = document.createElement('a'); // MAIN ROW
                listItem.classList.add("row");
                listItem.classList.add("nav-link");
                listItem.style.borderBottom = "1px solid grey";
                listItem.href = `company.html?symbol=${dataFromSearch[i].symbol}`//Gives main row link

                var linkInside = document.createElement('span'); // 2nd COL
                linkInside.classList.add("col-3");
                var text = `${dataFromSearch[i].name} (${dataFromSearch[i].symbol})`;
                this.highlight(text, searchText, linkInside);
                linkInside.style.fontSize = '30px';

                var imgInside = document.createElement('img'); // 1st COL
                imgInside.style.width = '50px';
                imgInside.style.height = '50px';
                imgInside.style.borderRadius ='10px'
                imgInside.style.boxShadow = "10px 20px 30px grey";
                imgInside.src = companyData.profile.image;

                var changePercent = document.createElement('span');
                changePercent.classList.add("col-3");
                var allPercentages = companyData.profile.changesPercentage;
                changePercent.innerText = allPercentages;
                changePercent.style.fontSize = '30px';
                if (allPercentages.includes("+")) {
                    changePercent.style.color = "red";
                }
                else if (allPercentages.includes("-")) {
                    changePercent.style.color = "#66f756";
                }
                listItem.appendChild(imgInside);//Image gets appended 1st 
                listItem.appendChild(linkInside);//Name & Symbol appended 2nd 
                listItem.appendChild(changePercent);
            
                this.element.appendChild(listItem);//Laslty appending the whole row to Search list 
            });  
        } 
    }

    highlight(text, searchText, span) {
        var start = "";
        var middle = "";
        var end = "";
        var match = text.toLowerCase().match(searchText.toLowerCase());
        if (match) {
            var startIndex = match.index;
            var endIndex = match.index + searchText.length;

            start = text.substring(0, startIndex);
            middle = text.substring(startIndex, endIndex);
            end = text.substring(endIndex, text.length);
        } else {
            start = text;
        }
        var span1 = document.createElement("span");
        span1.innerText = start;
        span.appendChild(span1);

        var span2 = document.createElement("span");
        span2.innerText = middle;
        span2.style.color = "yellow";
        span.appendChild(span2);

        var span3 = document.createElement("span");
        span3.innerText = end;
        span.appendChild(span3);
        
    }

}