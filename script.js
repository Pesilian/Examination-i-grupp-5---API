let apiKey = 'ac3ec2c4437de194d14c257d4a6244a9';
let currentPage = 1; //default
let numberOfPhotosPerPage = 8;

let submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', function () {
  let text = document.getElementById('searchFor').value.trim();
  fetchPhotos(text);
  clearInput();
});

//ett API anrop

async function fetchPhotos(text) {
  let url = `https://api.flickr.com/services/rest?api_key=${apiKey}&method=flickr.photos.search&text=${text}&page=${currentPage}&per_page=${numberOfPhotosPerPage}&sort=interestingness-desc&format=json&nojsoncallback=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.stat === 'fail') {
      throw new Error(data.message);
    }

    const photos = data.photos.photo;
    displayImages(photos);
  } catch (error) {
    console.error('Error fetching photos:', error.message);
  }
}

function displayImages(images) {
  const galleryElement = document.getElementById('gallery');
  galleryElement.innerHTML = '';
  images.forEach(photo => {
    const imageElement = createImageElem(photo);
    imageElement.style.display = 'inline-block';
    galleryElement.appendChild(imageElement);
  }); //Funktionen createImageElem tar hand om att skapa HTML-bilder från API-data, medan displayImages renderar och visar dessa bilder på webbsidan genom att manipulera DOM.
}

function createImageElem(photo) {
  const imageElem = document.createElement('img');
  const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

  imageElem.src = photoUrl;
  imageElem.alt = photo.title;
  imageElem.height = 200;
  imageElem.addEventListener('click', modal);
  return imageElem;
}

//Rensa sökruta när sökning gjorts.
function clearInput() {
  searchFor.value = '';
}

const modal = function () {
  this.classList.toggle('modal');
  document.body.classList.toggle('modalbackground');
};
