const theSpinner = document.getElementById('theSpinner');

async function getUrlAsync(url) {
    try {
        theSpinner.classList.remove("d-none");
        var response = await fetch(url);
        var data = await response.json();
        theSpinner.classList.add("d-none");
        return data;
    } catch (error) {
      console.error(error);
    }
}



var urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('symbol')) {
    var symbolParam = urlParams.get('symbol');
    var firstUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbolParam}`;
    var secondUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbolParam}?serietype=line`;
    
    var response1 = getUrlAsync(firstUrl);
    var response2 = getUrlAsync(secondUrl);
    response1.then(data => {
       handlingProfile(data); 
    });
    
    response2.then(data => { 
        handleHistorical(data)
    });
}

function handlingProfile(profileData) {
    
    const profileImage = document.getElementById('companyLogo');
    const profileName = document.getElementById('companyName');
    profileImage.src = profileData.profile.image;
    profileName.innerText = profileData.profile.companyName;
    profileName.classList.add('align-self-center');
    const stockPrice = document.getElementById('stockPrice');
    stockPrice.innerText = `Stock Price: $${profileData.profile.price}`;
    greenOrRed(profileData);
    const theDescription = document.getElementById('companyDeets');
    theDescription.innerText = profileData.profile.description;

    // console.log(profileData.profile.website)
}

function handleHistorical (historicalArray) {
    console.log(historicalArray);
    var xAxis = [];
    var theHistVals = [];
    for (let i = historicalArray.historical.length - 1 ; i >= 0 ; i-- )  {
       xAxis.push(historicalArray.historical[i].date);
       theHistVals.push(historicalArray.historical[i].close);
    }   
    createChart(xAxis, theHistVals);
}

function greenOrRed(percentages) {
    const changePercent = document.getElementById('percentChange');
    changePercent.innerHTML = percentages.profile.changesPercentage;
    console.log(percentages);
    var theChange = percentages.profile.changesPercentage;
    if (theChange.includes("+")) {
        //add green class
        changePercent.style.color ="red";
    } else if ( theChange.includes("-")) {
        //add red class 
        changePercent.style.color ="#66f756";
    }
}

function createChart(xAxis, theHistVals) {
//     var xAxis = [];
// var theHistVals =[];
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xAxis,
        datasets: [{
            label: 'Stock Price History',
            data: theHistVals,
            backgroundColor:
            [
                'rgba(255, 100, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
            'rgba(255, 99, 132, 10)',
            'rgba(54, 162, 235, 10)',
            'rgba(255, 206, 86, 10)',
            'rgba(75, 192, 192, 10)',
            'rgba(153, 102, 255, 10)',
            'rgba(255, 159, 64, 1)'],
            borderWidth: 1
            }
        ]}
    });
}


