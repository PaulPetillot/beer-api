class getData {
    constructor(image_url, name, description, abv, ibu, ph, tagline) {
        this.image_url = image_url;
        this.name = name;
        this.description = description;
        this.abv = abv;
        this.ibu = ibu;
        this.ph = ph;
        this.tagline = tagline
    };

    beerHtml() {
        let pHColor = (beerPH) => {
            if (beerPH > 5) {
                return '#D7292C'
            } else if (beerPH > 4) {
                return "#E4844C"
            } else {
                return "#F4E484"
            }
        };
        return `<div class="grid-beer">
            <img src="${this.image_url}"><h1 class="name">${this.name}</h1><p class= "description">
            ${this.description}</p><div class="value"><h2 class="abv">ABV<p class="abv-value">
            ${this.abv} </p></h2><h2 class="ibu">IBU<p class="ibu-value">
            ${this.ibu}</p></h2><h2 class="ph" style="background-color:${pHColor(this.ph)};">pH<p class="ph-value">${this.ph}</p></h2></div>`
    }

    randomBeerHtml() {
        let pHColor = (beerPH) => {
            if (beerPH > 5) {
                return '#D7292C'
            } else if (beerPH > 4) {
                return "#E4844C"
            } else {
                return "#F4E484"
            }
        };
        return `<div class="article-container"><div class="beer-image"><img src="
            ${this.image_url}"></div><div class="random-beer-data"><h1 class="name">
            ${this.name}</h1><h3 class="tagline">${this.tagline}</h3><p class= "description">
            ${this.description}</p><div class="value">
            <h2 class="abv">ABV<p class="abv-value"> ${this.abv}</p></h2>
            <h2 class="ibu">IBU<p class="ibu-value"> ${this.ibu}</p></h2>
            <h2 class="ph" style="background-color:${pHColor(this.ph)};">pH<p class="ph-value">
            ${this.ph}</p></h2></div><div id="button-ingredients"><button class="ingredients">INGREDIENTS</button>
            </div></div></div>`
    }
};
class ingredients {
    constructor(malt, hops, yeast) {
        this.malt = malt;
        this.hops = hops;
        this.yeast = yeast;
    }
};
export {
    getData
};
export {
    ingredients
};