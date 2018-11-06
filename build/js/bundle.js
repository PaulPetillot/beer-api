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
$('body').on('click', '.page-number', function () {
    $('.page-number').removeClass("active");
    $(this).addClass("active");
});

$('body').on('click', '.next', function () {
    if ($('.active').next().hasClass('page-number')) {
        $('.active').removeClass('active').next().addClass('active');
    }
});

$('body').on('click', '.previous', function () {
    if ($('.active').prev().hasClass('page-number')) {
        $('.active').removeClass('active').prev().addClass('active');
    }
});
var url = "https://api.punkapi.com/v2/beers?page=" + $('.active').text() + "&per_page=6";
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
    });
    console.log(beers);
});

//Load Random Beer Part   
$.ajax({
    url: "https://api.punkapi.com/v2/beers/random",
    method: 'GET'
}).done(function (datab) {
    //create beer object
    //add html to the page
    var randomBeers = [];
    datab.forEach(function (element) {
        randomBeers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
    });
    console.log(randomBeers);
});

},{}]},{},[1]);
