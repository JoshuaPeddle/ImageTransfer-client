
class Model {
  constructor(style, background_url, label) {
    this.style = style;
    this.background_url = background_url;
    this.label = label;
  }
}
  
const monet = new Model('monet', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ44ma1Zna7SK6Ty16vKUgKBblwtIkvNJxoBA&usqp=CAU', 'Monet');
const gogh = new Model('gogh', 'https://uploads3.wikiart.org/00142/images/vincent-van-gogh/the-starry-night.jpg!PinterestSmall.jpg', 'Van Gogh');
const picasso = new Model('picasso', 'https://uploads0.wikiart.org/images/pablo-picasso/a-bullfight-1934.jpg!PinterestSmall.jpg', 'Picasso');
const dali = new Model('dali', 'https://uploads5.wikiart.org/images/salvador-dali/the-persistence-of-memory-1931.jpg!PinterestSmall.jpg', 'Dali');
const models = [ monet, gogh, picasso, dali ];
export { Model, models };

