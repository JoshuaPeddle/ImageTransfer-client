
class Model {
  constructor(style, background_url, label) {
    this.style = style;
    this.background_url = background_url;
    this.label = label;
  }
}
  
// Fetch process.env.NEXT_PUBLIC_IMAGE_SERVER/styles
const getModels = () => {
  const models = [  ];
  fetch(process.env.NEXT_PUBLIC_IMAGE_SERVER+'styles')
    .then((res) => res.json())
    .then((data) => {
      Object.keys(data).forEach((model) => {
        models.push(new Model(model, data[model]['mini'], data[model]['full_name']));
      });
    }); 
  return models;
};
export { Model, getModels };

