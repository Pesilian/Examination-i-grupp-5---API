
/* konkatinera searchFor till   
let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&page=${currentPage}&format=json&nojsoncallback=1`;    */

const apiKey='ac3ec2c4437de194d14c257d4a6244a9';
const currentPage = 1; //default
const numberOfPhotosPerPage =8;

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", getPhotos);


async function getPhotos(){
  clearGallery();
  const data = await sendApi();
  /*showImages();*/
  showImagesApi(data);
  clearInput();
}

  function clearGallery(){
    const galleryContainer = document.getElementById("gallery");
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
  imageElement.className='modal-content';
  /*imageElement.width = 200;*/
  imageElement.height = 200;
  imageBox.appendChild(imageElement);
  galleryContainer.appendChild(imageBox);
  imageElement.addEventListener('click', toggleModal);
  })
  }
// För att visa  vald bild förstorad när den klickas. Klick nr 2 stänger modala bilden.
function toggleModal() {
  // Toggle 'modal' class on the clicked image
  this.classList.toggle('modal');
}


