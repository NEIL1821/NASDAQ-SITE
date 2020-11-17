import {getUrlAsync} from "./asyncFetch.js"

export class Marquee {
    constructor(element) {
        this.element = element;
        // this.fetcher = new Fetcher();
    };

    createMarquee() {
        var allNasdaq = getUrlAsync(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/nasdaq_constituent`);
        allNasdaq.then(data => {
            this.handleAllNas(data);
        });

    }

    handleAllNas(nasData) {
        var myMarquee = document.getElementById('marqueeContainer');
        for (let i = 0 ; i < nasData.length ; i++ ) {
            var allNasdaqPrices = getUrlAsync(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote-short/${nasData[i].symbol}`);
            allNasdaqPrices.then(data => {
                var theMarquee = document.getElementById('marqueeContainer');
                var allSymbols = nasData[i].symbol;
                var theSymbol = document.createElement('span');
                theSymbol.classList.add('col')
                theSymbol.innerHTML = allSymbols;
                var allThePrices = data[0].price;
                var pricetoTag = document.createElement('span');
                pricetoTag.innerText = ` $${allThePrices}`;
                pricetoTag.style.color ="#66f756";
                theSymbol.appendChild(pricetoTag);
                myMarquee.appendChild(theSymbol);
            });
        }
    }
};


