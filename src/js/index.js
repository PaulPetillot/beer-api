class getData{
    constructor(image, heading, description, abv, ibu, ph, tagline){
        this.image = image;
        this.heading = heading;
        this.description = description;
        this.abv = abv;
        this.ibu= ibu;
        this.ph = ph;
        this.tagline = tagline}
    };
$('body').on('click', '.page-number', function(){
    $('.page-number').removeClass("active");
    $(this).addClass("active");
})
    
$('body').on('click', '.next', function(){
    if($('.active').next().hasClass('page-number')){
    $('.active').removeClass('active').next().addClass('active');}   
})
       
$('body').on('click', '.previous', function(){
    if($('.active').prev().hasClass('page-number')){
    $('.active').removeClass('active').prev().addClass('active');}   
})
var url = "https://api.punkapi.com/v2/beers?page="+$('.active').text()+"&per_page=6"; 
// load Beer Page part
$.ajax({
    url: url,
    method: 'GET',
   }).done(function(data) { 
    //create beer object
    //add html to the page
    let beers=[]
    data.forEach(element => {
       beers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
    });
    console.log(beers)
   })

//Load Random Beer Part   
$.ajax({
url: "https://api.punkapi.com/v2/beers/random",
method: 'GET',
   }).done(function(datab) { 
    //create beer object
    //add html to the page
    let randomBeers=[]
    datab.forEach(element => {
       randomBeers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
    });
    console.log(randomBeers)
   })

