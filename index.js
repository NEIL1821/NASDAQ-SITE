async function getUrlAsync(theUrl) {
    try {
        var response = await fetch(theUrl);
        var data = await response.json();
        return data;
    } catch (error) {
      console.error(error);
    }
}

var clickToSearch =  document.getElementById("clickToSearch");
var theSearchList = document.getElementById("theSearchList");
var userSearch = document.getElementById("userSearch");


clickToSearch.addEventListener("click", function() {
    var theUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${userSearch.value}&limit=10&exchange=NASDAQ`
    var results = getUrlAsync(theUrl);
    results.then(data => {
     displayResults(data);
    });
});

 function displayResults(dataFromSearch) {//create list elements out of 
    theSearchList.innerHTML ="";
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
            linkInside.innerText = `${dataFromSearch[i].name} (${dataFromSearch[i].symbol})`;
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
            if (allPercentages.includes("+")) {
                changePercent.style.color = "red";
            }
            else if (allPercentages.includes("-")) {
                changePercent.style.color = "green";
            }
            listItem.appendChild(imgInside);//Image gets appended 1st 
            listItem.appendChild(linkInside);//Name & Symbol appended 2nd 
            listItem.appendChild(changePercent);
        
            theSearchList.appendChild(listItem);//Laslty appending the whole row to Search list 
        });  
    } 
}


// Need to give this a class first & create a new instance 
// var allNasdaq = getUrlAsync(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/nasdaq_constituent`);
// allNasdaq.then(data => {
//     handleAllNas(data);
//    });

// function handleAllNas(nasData) {
//     var myMarquee = document.getElementById('marqueeContainer');
//     for (let i = 0 ; i < nasData.length ; i++ ) {
//     var allNasdaqPrices = getUrlAsync(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote-short/${nasData[i].symbol}`);
//      allNasdaqPrices.then(data => {
//         var theMarquee = document.getElementById('marqueeContainer');
//         var allSymbols = nasData[i].symbol;
//         var theSymbol = document.createElement('span');
//         theSymbol.classList.add('col')
//         theSymbol.innerHTML = allSymbols;
//         var allThePrices = data[0].price;
//         var pricetoTag = document.createElement('span');
//         pricetoTag.innerText = ` $${allThePrices}`;
//         pricetoTag.style.color ="#66f756";
//         theSymbol.appendChild(pricetoTag);
//         myMarquee.appendChild(theSymbol);
//         });
//     }
// }

// export dafault handleAllNas;
