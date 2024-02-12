
/* konkatinera searchFor till   
let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&page=${currentPage}&format=json&nojsoncallback=1`;    */

let apiKey='ac3ec2c4437de194d14c257d4a6244a9';
let currentPage = 1; //default
let numberOfPhotosPerPage =8;

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", getPhotos);

/* fetch (url)    ersätt imgData med response.json*/

async function getPhotos(){
  clearGallery();
  const data = await sendApi();
  /*showImages();*/
  showImagesApi(data);
  clearInput();
}

  function clearGallery(){
    let galleryContainer = document.getElementById("gallery");
    if (galleryContainer.hasChildNodes()) {
      while (galleryContainer.firstChild) {
        galleryContainer.removeChild(galleryContainer.firstChild);
      }
    }
  }

  //Rensa sökruta när sökning gjorts.
  function clearInput(){
    searchFor.value="";
  }

function sendApi(){
  let text =document.getElementById("searchFor").value.trim();    //hämta text när funktionen anropats efter att sök knappen aktiveras, för att säkerställa att det finns ett sökord.
  /*let text ='katt';*/
  let url = `https://api.flickr.com/services/rest?api_key=${apiKey}&method=flickr.photos.search&text=${text}&page=${currentPage}&per_page=${numberOfPhotosPerPage}&sort=interestingness-desc&format=json&nojsoncallback=1`; 
  return fetch(url)
  .then(function(response){
    return response.json();
  })
  .catch (function(error){
    console.error(error);
  });
}

//Från json filen gör url för varje bild. Populera sedan dessa i DOM.
function showImagesApi(data) {
  const galleryContainer = document.getElementById("gallery");
  data.photos.photo.forEach((photo)=>{

    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
console.log(url);

  let imageBox = document.createElement("div");
  imageBox.classList.add("image-box");
  let imageElement = document.createElement("img");
  imageElement.src = url;
  /*imageElement.width = 200;*/
  imageElement.height = 200;
  imageBox.appendChild(imageElement);
  galleryContainer.appendChild(imageBox);
  })
}
/*
//temporära bilder. ska ersättas med svar från anropet
let imgData = [
  { image: "https://live.staticflickr.com/7372/12502775644_acfd415fa7_w.jpg" },
  { image: "https://live.staticflickr.com/7372/12502775644_acfd415fa7_w.jpg" },
  { image: "https://live.staticflickr.com/7372/12502775644_acfd415fa7_w.jpg" },
  { image: "https://live.staticflickr.com/7372/12502775644_acfd415fa7_w.jpg" },
];


//populera bilderna till DOM
function showImages() {
  console.log(searchFor.value);
  imgData.forEach((value) => {
    console.log(value.image);
    let galleryContainer = document.getElementById("gallery");
    let imageBox = document.createElement("div");
    imageBox.classList.add("image-box");
    let imageElement = document.createElement("img");
    imageElement.src = value.image;
    imageElement.width = 200;
    imageBox.appendChild(imageElement);
    galleryContainer.appendChild(imageBox);
  });
}
*/
