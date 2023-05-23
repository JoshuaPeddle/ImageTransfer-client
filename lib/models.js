
class Model {
  constructor(style, background_url, label, num_variants=1) {
    this.style = style;
    this.background_url = background_url;
    this.label = label;
    this.num_variants = num_variants;
    this.current_variant = 0;
  }
  nextVariant() {
    const variant = this.current_variant;
    this.current_variant = (this.current_variant + 1) % this.num_variants;
    return variant;
  }
}
  
// Fetch process.env.NEXT_PUBLIC_IMAGE_SERVER/styles
const getModels = async () => {
  const models = {};
  await fetch(process.env.NEXT_PUBLIC_IMAGE_SERVER+'styles')
    .then((res) => res.json())
    .then((data) => {
      Object.keys(data).forEach((model) => {
        models[model] = new Model(model, data[model]['mini'], data[model]['full_name'], data[model]['num_variants']);
      });
    }); 
  return models;
};
export { Model, getModels };

