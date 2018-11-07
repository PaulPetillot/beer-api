class getData{
    constructor(image, heading, description, abv, ibu, ph, tagline){
        this.image = image;
        this.heading = heading;
        this.description = description;
        this.abv = abv;
        this.ibu= ibu;
        this.ph = ph;
        this.tagline = tagline};
};
class ingredients{
    constructor(malt, hops, yeast){
        this.malt = malt;
        this.hops = hops;
        this.yeast = yeast;
    }
};
export { getData };
export { ingredients };