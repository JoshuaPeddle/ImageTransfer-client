
class Model {
  constructor(style, background_url, label) {
    this.style = style;
    this.background_url = background_url;
    this.label = label;
  }
}
  
const monet = new Model('monet', '', 'Monet');
const gogh = new Model('gogh', '', 'Van Gogh');
const picasso = new Model('picasso', '', 'Picasso');
const dali = new Model('dali', '', 'Dali');
const models = [ monet, gogh, picasso, dali ];
export { Model, models };

