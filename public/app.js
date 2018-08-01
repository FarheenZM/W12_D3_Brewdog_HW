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
  renderBeer(beers);
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

const renderBeer = function (beers) {

  const selectedBeer = document.querySelector('select');
  selectedBeer.addEventListener('change', function(event) {

    let beer = beers[this.value];

    saveBeer(beer);
    beerDetails(beer);
  });

}


const beerDetails = function(beer){

  const div = document.getElementById('div-beer');
  clearContent(div);

  const beerName = document.createElement('p');
  beerName.innerText = "Name : " + beer.name;

  const tagline = document.createElement('p');
  tagline.innerText = beer.tagline;

  const first_brewed = document.createElement('p');
  first_brewed.innerText = beer.first_brewed;

  const description = document.createElement('p');
  description.innerText = beer.description;

  const beerImage = document.createElement('img');
  beerImage.src = beer.image_url;

  div.appendChild(beerName);
  div.appendChild(tagline);
  div.appendChild(first_brewed);
  div.appendChild(description);
  div.appendChild(beerImage);

  return div;

}

const saveBeer = function(beer){
  const jsonString = JSON.stringify(beer);
  localStorage.setItem('beer', jsonString);
}

const app = function(){

  const url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);

  let jsonString = localStorage.getItem("beer");
  let savedBeer = JSON.parse(jsonString);
  beerDetails(savedBeer);

}

const clearContent = function(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  };
}


window.addEventListener('load', app);
