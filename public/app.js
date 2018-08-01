const makeRequest = function(url, callback){

  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}


const requestComplete = function(){

  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateList(beers);
  getBeer(beers);
}

const populateList = function(beers){
  let select = document.getElementById('select-beer');

  beers.forEach(function(beer, index){

    let option = document.createElement('option');
    option.innerText = beer.name;
    option.value = index;
    select.appendChild(option);
  });
}

const getBeer = function (beers) {
  const selectedBeer = document.createElement('select');
  selectedBeer.addEventListener('change', function(event) {
    let beer = beers[this.value];
    saveBeer(beer)
    beerDetails(beer);
  });
}

// const handleSelectChanged = function(event){
//
//   var index = this.selectedIndex;
//   var beer = beers[index];
//   console.log(index);
//   console.log(beer);
//   renderBeer(beer);
// }

const beerDetails = function(beer){
  const pTag = document.createElement('p');
  pTag.innerText = "Name : " + beer.name;
}

const saveBeer = function(beer){
  const jsonString = JSON.stringify(beer);
  localStorage.setItem('beer', jsonString);
}

var app = function(){

  const url ='https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);

  let jsonString = localStorage.getItem('beer');
  let savedBeer = JSON.parse(jsonString);
  beerDetails(savedBeer);

}

window.addEventListener('load', app);
