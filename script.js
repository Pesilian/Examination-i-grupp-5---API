const API_KEY = "d7ca9ba3efac55a2a4425ca73ab0962d";
const BASE_URL = "https://api.flickr.com";

let searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', function(){
    const searchTerm = document.getElementById('search').value;
    fetchPhotos(searchTerm);
});

function createImageElem(photo){ 
    const imageElem = document.createElement('img'); 
    const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`; 

    imageElem.src = photoUrl; 
    imageElem.alt = photo.title; 
    return imageElem; 
}

function displayImages(images){ 
    const galleryElement = document.getElementById("gallery"); 
    galleryElement.innerHTML = ""; 
    images.forEach(photo => { 
        const imageElement = createImageElem(photo);  
        imageElement.style.display = 'inline-block';
        galleryElement.appendChild(imageElement);  
    }); //Funktionen createImageElem tar hand om att skapa HTML-bilder från API-data, medan displayImages renderar och visar dessa bilder på webbsidan genom att manipulera DOM.
}

//ett API anrop

async function fetchPhotos(searchTerm){
    const url = `${BASE_URL}/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${searchTerm}&per_page=3&format=json&nojsoncallback=1`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.stat === "fail") {
            throw new Error(data.message);
        }

        const photos = data.photos.photo;
        displayImages(photos);
    } catch (error) {
        console.error('Error fetching photos:', error.message);
    }

}
