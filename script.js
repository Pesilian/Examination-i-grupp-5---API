let searchFor = document.getElementById("searchFor");

/* konkatinera searchFor till   
let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&page=${currentPage}&format=json&nojsoncallback=1`;    */

/* fetch (url)    ersätt imgData med response.json*/



let submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", clearGallery);

//temporära bilder. ska ersättas med svar från anropet
let imgData = [
  { image: "https://live.staticflickr.com/7372/12502775644_acfd415fa7_w.jpg" },
  { image: "https://live.staticflickr.com/7372/12502775644_acfd415fa7_w.jpg" },
  { image: "https://live.staticflickr.com/7372/12502775644_acfd415fa7_w.jpg" },
  { image: "https://live.staticflickr.com/7372/12502775644_acfd415fa7_w.jpg" },
];


//Rensa sökruta när sökning gjorts.
function clearInput(){
searchFor.value="";
}

function clearGallery(){
  let galleryContainer = document.getElementById("gallery");
  if (galleryContainer.hasChildNodes()) {
          while (galleryContainer.firstChild) {
          galleryContainer.removeChild(galleryContainer.firstChild);
      }
  }
  showImages();
  clearInput();
}
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