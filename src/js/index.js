// Import the class GetData and Ingredients who create objects to fill the Beer-boxes and Ingredients
//With the data from the API.
import { getData } from "./class.js";
import { ingredients } from "./class.js";
$('body').on('click', '.list-category', function(){
    $('.list-category').removeClass("active-list");
    $(this).addClass("active-list")})
//Eventhandler part

//When the user clicks on the logo, it's showing the Beers menu.
$('#logo').on('click', function(){
    $('.global').css('display', 'none')
    $('#random').css('display', 'none')
    $('.pick-a-beer').css('display', 'none')
    $('footer').css('display', 'flex')
    $('.grid-container').css('display', 'grid')
    $('.list-category').removeClass("active-list");
    $('#beers-menu').addClass("active-list") 
});
//Pagination eventhandler part

//When the user clicks on a page number, a new class 'active' is created in the html
// on the selected number and delete the active class on the previous number of the page.
$('body').on('click', '.page-number', function(){
    $('.page-number').removeClass("active");
    $(this).addClass("active");
    $('.grid-container').empty();
    loadingData();
})
//When the user clicks on the >> sign, it's doing the same thing as the click event just on the top
//and it's going to the next number.
$('body').on('click', '.next', function(){
    if($('.active').next().hasClass('page-number')){
    $('.active').removeClass('active').next().addClass('active');} 
    $('.grid-container').empty();
    loadingData();
})
//When the user clicks on the >> sign, it's doing the same thing as the first click event of
//the pagination and it's going to the previous number. 
$('body').on('click', '.previous', function(){
    if($('.active').prev().hasClass('page-number')){
    $('.active').removeClass('active').prev().addClass('active');} 
    $('.grid-container').empty();  
    loadingData();
})
//Click event, with hiding and showing menu and Ingredients Box :
//Show the beer main menu when clicking on the button Beer Menu.
$('#beers-menu').on('click', function(){
    $('.global').css('display', 'none')
    $('.pick-a-beer').css('display', 'none')
    $('#random').css('display', 'none')
    $('.grid-container').css('display', 'grid')
    $('footer').css('display', 'flex')
    $('#div-box').css('display', 'none')
});
//Show the random beer menu when clicking on the button Quick Find.
$('#random-menu').on('click', function(){
    $('.global').css('display', 'flex')
    $('.pick-a-beer').css('display', 'none')
    $('#random').css('display', 'flex')
    $('.grid-container').css('display', 'none')
    $('footer').css('display', 'none')
});
//Show the pick a beer menu when clicking on the button pick a beer.
$('#pick-menu').on('click', function(){
    $('.global').css('display', 'none')
    $('#random').css('display', 'none')
    $('.pick-a-beer').css('display', 'grid')
    $('footer').css('display', 'none')
    $('.grid-container').css('display', 'none')
    $('#div-box').css('display', 'none')
});
//Show and hide the ingredients box when clicking on the button ingredients.
$('body').on('click', ".ingredients", function(){
    $('#div-box').css('display', 'flex')
});
$('#close-button').on('click', function(){
    $('#div-box').css('display', 'none')
});
//Sorry
$('.pick-a-beer-but').on('click', function(){
    alert('This feature will come later in the year.. Stay Tuned !')
});
//This is targeting the value of the pH of the beer, and adding differents colors depending 
//of the value.
let pHColor = (beerPH)=>{
  if(beerPH>5){
    return '#D7292C'
    }else if(beerPH>4){
       return "#E4844C"
}else{
    return "#F4E484"}};

//When the page load for the first time, it's loading the Beers menu on the 1st page
//and hiding the Quick Find Menu.
$.ajax({
    url: "https://api.punkapi.com/v2/beers?page=1&per_page=6",
    method: 'GET',
   }).done(function(data) { 
    //create beer object
    //add html to the page
    let beers=[];
    data.forEach(element => {
       beers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
       let colorOfPH = pHColor(element.ph);
       $('.grid-container').append('<div class="grid-beer"><img src="'
       +element.image_url+'"><h1 class="name">'+element.name+'</h1><p class= "description">'
       +element.description+'</p><div class="value"><h2 class="abv">ABV<p class="abv-value">'
       +element.abv+'</p></h2><h2 class="ibu">IBU<p class="ibu-value">'
       +element.ibu+'</p></h2><h2 class="ph" style="background-color:'+colorOfPH+';">pH<p class="ph-value">'+element.ph+'</p></h2></div>')
    });
    $('.pick-a-beer').css('display', 'none')
    $('#random').css('display', 'none')
    $('#div-box').css('display', 'none')
   })
//When the page load for the first time, it's loading the Quick-Find menu and hide it
//just to have the data and something on the screen without pushing the random beer button.
$.ajax({
url: "https://api.punkapi.com/v2/beers/random",
method: 'GET',
    }).done(function(datab) { 
    //create beer object
    //add html to the page
    $('.global').empty();
      //Create empty string and array
    let randomBeers=[]
    let randomIngredient = [];
    let maltIngredients = '';
    let hopsIngredients = '';
    let yeastIngredients = '';
    datab.forEach(element => {
    randomBeers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
    randomIngredient.push(new ingredients(element.ingredients.malt, element.ingredients.hops, element.ingredients.yeast))
    let colorOfPH = pHColor(element.ph);
    $('.global').append('<div class="article-container"><div class="beer-image"><img src="'
    +element.image_url+'"></div><div class="random-beer-data"><h1 class="name">'
    +element.name+'</h1><h3 class="tagline">'+element.tagline+'</h3><p class= "description">'
    +element.description+'</p><div class="value"><h2 class="abv">ABV<p class="abv-value">'
    +element.abv+'</p></h2><h2 class="ibu">IBU<p class="ibu-value">'
    +element.ibu+'</p></h2><h2 class="ph" style="background-color:'+colorOfPH+';">pH<p class="ph-value">'
    +element.ph+'</p></h2></div><div id="button-ingredients"><button class="ingredients">INGREDIENTS</button></div></div></div>');
    //Loops to add to the empty strings of malt, hops and yeast the API data.
    element.ingredients.malt.forEach((element, key, arr) => {
        maltIngredients+= `${element.name} (${element.amount.value} ${element.amount.unit})`;
        if (key!== arr.length-1){
            maltIngredients+= ", ";
        }
    });
    element.ingredients.hops.forEach((element, key, arr) => {
        hopsIngredients+= `${element.name} (${element.amount.value} ${element.amount.unit})`;
        if (key!== arr.length-1){
            hopsIngredients+= ", ";
        }
    });
    yeastIngredients = element.ingredients.yeast;
    //Add html code with using the data than we got previously with the loops 
   $('#box-malt-div').append('<h2>Malt:</h2><p id="box-malt">'+maltIngredients+'</p>')
   $('#box-hops-div').append('<h2>Hops:</h2><p id="box-hops">'+hopsIngredients+'</p>')
   $('#box-yeast-div').append('<h2>Yeast:</h2><p id="box-yeast">'+yeastIngredients+'</p>')
});
    $('.global').css('display', 'none')
})



//Pagination and loading
function loadingData(){
    //Target the value of active class, created previously.
var url = "https://api.punkapi.com/v2/beers"
url += '?' + $.param({
    'page': $('.active').text(),
    'per_page' : 6
   });
// load Beer Page part
$.ajax({
    url: url,
    method: 'GET',
   }).done(function(data) { 
    //create beer object
    //add html to the page
    let beers=[];
    data.forEach(element => {
       beers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
       let colorOfPH = pHColor(element.ph);
       console.log(colorOfPH, element.ph)
       $('.grid-container').append('<div class="grid-beer"><img src="'
       +element.image_url+'"><h1 class="name">'
       +element.name+'</h1><p class= "description">'
       +element.description+'</p><div class="value"><h2 class="abv">ABV<p class="abv-value">'
       +element.abv+'</p></h2><h2 class="ibu">IBU<p class="ibu-value">'
       +element.ibu+'</p></h2><h2 class="ph" style="background-color:'+colorOfPH+';">pH<p class="ph-value">'+element.ph+'</p></h2></div>')
    });
   })
}
//Load Random Beer Part 
$('#random').on('click', function(){ 
$.ajax({
url: "https://api.punkapi.com/v2/beers/random",
method: 'GET',
   }).done(function(datab) { 
    //create beer object
    //add html to the page
    //empty the div of the html to only have the new data
    $('.global').empty();
    $('.div-box-ingredients').empty();
    //Create empty string and array
    let randomBeers=[]
    let maltIngredients = ''
    let randomIngredient = [];
    let yeastIngredients = '';
    let hopsIngredients = '';
    datab.forEach(element => {
       randomBeers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
       randomIngredient.push(new ingredients(element.ingredients.malt, element.ingredients.hops, element.ingredients.yeast))
       let colorOfPH = pHColor(element.ph);
       $('.global').append('<div class="article-container"><div class="beer-image"><img src="'
       +element.image_url+'"></div><div class="random-beer-data"><h1 class="name">'
       +element.name+'</h1><h3 class="tagline">'+element.tagline+'</h3><p class= "description">'
       +element.description+'</p><div class="value"><h2 class="abv">ABV<p class="abv-value">'
       +element.abv+'</p></h2><h2 class="ibu">IBU<p class="ibu-value">'
       +element.ibu+'</p></h2><h2 class="ph" style="background-color:'+colorOfPH+';">pH<p class="ph-value">'
       +element.ph+'</p></h2></div><div id="button-ingredients"><button class="ingredients">INGREDIENTS</button></div></div></div>');
       //Loops to add to the empty strings of malt, hops and yeast the API data.
       element.ingredients.malt.forEach((element, key, arr) => {
        maltIngredients+= `${element.name} (${element.amount.value} ${element.amount.unit})`;
        if (key!== arr.length-1){
            maltIngredients+= ", ";
        }
    });
    element.ingredients.hops.forEach((element, key, arr) => {
        hopsIngredients+= `${element.name} (${element.amount.value} ${element.amount.unit})`;
        if (key!== arr.length-1){
            hopsIngredients+= ", ";
        }
    });
    yeastIngredients = element.ingredients.yeast;
    //Add html code with using the data than we got previously with the loops 
    $('.div-box-ingredients').append('<div class="box-title-ingredient" id="box-malt-div"><h2>Malt:</h2><p id="box-malt">'
    +maltIngredients+'</p></div><div class="box-title-ingredient" id="box-hops-div"><h2>Hops:</h2><p id="box-hops">'
    +hopsIngredients+'</p></div><div class="box-title-ingredient" id="box-yeast-div"><h2>Yeast:</h2><p id="box-yeast">'
    +yeastIngredients+'</p></div></div><p id="space"></p></div>')
    });
   })
});


