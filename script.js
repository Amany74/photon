const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');
let ready = false ;
let imagesLoaded =  0;
let totalImages = 10;
let photos_Array = {};

const count = 10 ;
const apiKey = 'kOgV6p1hyHvn4FLsQxgMYxgJsuS2ApI1QBbxq7N0Zkc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// load image indicator function 
function imageLoaded(){
    imagesLoaded++;
    console.log(`yay , ${imagesLoaded} has loaded !`);
    if(imagesLoaded === totalImages) {
        ready = true;
        console.log('ready = ' , ready);
    };
}


// Updating DOM
function displayPhotos(){
    imagesLoaded = 0 ;
    totalImages = photos_Array.length;
    console.log('totalimages = ',totalImages);
    photos_Array.forEach((photo)=>{
        // create link of photo to unsplash
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target' , '_blank');
        // create img tag for photo
        const img = document.createElement('img');
        img.setAttribute('src' , photo.urls.regular);
        img.setAttribute('alt' , photo.alt_description);
        img.setAttribute('title' , photo.alt_description);
        // event listener checks when the image loads
        img.addEventListener('load' , imageLoaded);
        // adding the a tag and img tag to image constainer
        item.appendChild(img); // appending img to a
        imageContainer.appendChild(item);
    });

}

// GET from Unsplash
async function getRandPhotos(){
    try{
       const response = fetch(apiUrl) ;
       console.log(response);
       const data = await (await response).json();
       photos_Array = data ;

       displayPhotos();
     }
    catch(e){
        console.log(e);
    }
}

getRandPhotos();


window.addEventListener('scroll',()=>{

    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready === true){
        ready = false;
        getRandPhotos();
        console.log('loading more ... ')
    }

});