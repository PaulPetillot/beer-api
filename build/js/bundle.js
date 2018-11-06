(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getData = function getData(image, heading, description, abv, ibu, ph, tagline) {
    _classCallCheck(this, getData);

    this.image = image;
    this.heading = heading;
    this.description = description;
    this.abv = abv;
    this.ibu = ibu;
    this.ph = ph;
    this.tagline = tagline;
};

;

var ingredients = function ingredients(malt, hops, yeast) {
    _classCallCheck(this, ingredients);

    this.malt = malt;
    this.hops = hops;
    this.yeast = yeast;
};

;
$('body').on('click', '.page-number', function () {
    $('.page-number').removeClass("active");
    $(this).addClass("active");
    $('.grid-container').empty();
    loadingData();
});

$('body').on('click', '.next', function () {
    if ($('.active').next().hasClass('page-number')) {
        $('.active').removeClass('active').next().addClass('active');
    }
    $('.grid-container').empty();
    loadingData();
});

$('body').on('click', '.previous', function () {
    if ($('.active').prev().hasClass('page-number')) {
        $('.active').removeClass('active').prev().addClass('active');
    }
    $('.grid-container').empty();
    loadingData();
});
//Basic loading with Page 1 and hiden quick find
$.ajax({
    url: "https://api.punkapi.com/v2/beers?page=1&per_page=6",
    method: 'GET'
}).done(function (data) {
    //create beer object
    //add html to the page
    var beers = [];
    data.forEach(function (element) {
        beers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
        $('.grid-container').append('<div class="grid-beer"><img src="' + element.image_url + '"><h1 class="name">' + element.name + '</h1><p class= "description">' + element.description + '</p><div class="value"><h2 class="abv">ABV<p class="abv-value">' + element.abv + '</p></h2><h2 class="ibu">IBU<p class="ibu-value">' + element.ibu + '</p></h2><h2 class="ph">pH<p class="ph-value">' + element.ph + '</p></h2></div>');
    });
    $('.pick-a-beer').css('display', 'none');
    $('#random').css('display', 'none');
});

$.ajax({
    url: "https://api.punkapi.com/v2/beers/random",
    method: 'GET'
}).done(function (datab) {
    //create beer object
    //add html to the page
    $('.global').empty();
    var randomBeers = [];
    var randomIngredient = [];
    datab.forEach(function (element) {
        randomBeers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
        randomIngredient.push(new ingredients(element.ingredients.malt, element.ingredients.hops, element.ingredients.yeast));
        $('.global').append('<div class="article-container"><div class="beer-image"><img src="' + element.image_url + '"></div><div class="random-beer-data"><h1 class="name">' + element.name + '</h1><h3 class="tagline">' + element.tagline + '</h3><p class= "description">' + element.description + '</p><div class="value"><h2 class="abv">ABV<p class="abv-value">' + element.abv + '</p></h2><h2 class="ibu">IBU<p class="ibu-value">' + element.ibu + '</p></h2><h2 class="ph">pH<p class="ph-value">' + element.ph + '</p></h2></div><div id="button-ingredients"><button class="ingredients">INGREDIENTS</button></div></div></div>');
    });
    $('.global').css('display', 'none');
});

//Pagination and loading
function loadingData() {
    var url = "https://api.punkapi.com/v2/beers";
    url += '?' + $.param({
        'page': $('.active').text(),
        'per_page': 6
    });
    // load Beer Page part
    $.ajax({
        url: url,
        method: 'GET'
    }).done(function (data) {
        //create beer object
        //add html to the page
        var beers = [];
        data.forEach(function (element) {
            beers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
            $('.grid-container').append('<div class="grid-beer"><img src="' + element.image_url + '"><h1 class="name">' + element.name + '</h1><p class= "description">' + element.description + '</p><div class="value"><h2 class="abv">ABV<p class="abv-value">' + element.abv + '</p></h2><h2 class="ibu">IBU<p class="ibu-value">' + element.ibu + '</p></h2><h2 class="ph">pH<p class="ph-value">' + element.ph + '</p></h2></div>');
        });
    });
}
//Load Random Beer Part 
$('#random').on('click', function () {
    $.ajax({
        url: "https://api.punkapi.com/v2/beers/random",
        method: 'GET'
    }).done(function (datab) {
        //create beer object
        //add html to the page
        $('.global').empty();
        var randomBeers = [];
        var randomIngredient = [];
        datab.forEach(function (element) {
            randomBeers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
            randomIngredient.push(new ingredients(element.ingredients.malt, element.ingredients.hops, element.ingredients.yeast));
            $('.global').append('<div class="article-container"><div class="beer-image"><img src="' + element.image_url + '"></div><div class="random-beer-data"><h1 class="name">' + element.name + '</h1><h3 class="tagline">' + element.tagline + '</h3><p class= "description">' + element.description + '</p><div class="value"><h2 class="abv">ABV<p class="abv-value">' + element.abv + '</p></h2><h2 class="ibu">IBU<p class="ibu-value">' + element.ibu + '</p></h2><h2 class="ph">pH<p class="ph-value">' + element.ph + '</p></h2></div><div id="button-ingredients"><button class="ingredients">INGREDIENTS</button></div></div></div>');
        });
        console.log(randomIngredient);
    });
});

$('#beers-menu').on('click', function () {
    $('.global').css('display', 'none');
    $('.pick-a-beer').css('display', 'none');
    $('#random').css('display', 'none');
    $('.grid-container').css('display', 'grid');
    $('footer').css('display', 'flex');
});
$('#random-menu').on('click', function () {
    $('.global').css('display', 'flex');
    $('.pick-a-beer').css('display', 'none');
    $('#random').css('display', 'flex');
    $('.grid-container').css('display', 'none');
    $('footer').css('display', 'none');
});
$('#pick-menu').on('click', function () {
    $('.global').css('display', 'none');
    $('#random').css('display', 'none');
    $('.pick-a-beer').css('display', 'grid');
    $('footer').css('display', 'none');
    $('.grid-container').css('display', 'none');
});

//const pHColor = (element.ph) => {
//   if(element.ph.value > 5){
//        $('.ph').css('background-color', 'red')
//   } else if(element.ph.value > 4){
//        $('.ph').css('background-color', 'orange')
//  } else if(element.ph.value > 1){
//    $('.ph').css('background-color', 'yellow')}};

},{}]},{},[1]);
