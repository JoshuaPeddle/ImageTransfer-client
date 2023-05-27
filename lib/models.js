
class Model {
  constructor(style, background_url, label, num_variants=1) {
    this.style = style;
    this.background_url = background_url;
    this.label = label;
    this.num_variants = num_variants;
    this.current_variant = 0;
  }
}
let cachedModels = null; // Models are cached for 5 minutes
let lastFetch = null; // Last time models were fetched
const getModels = async () => {
  let currentTime = new Date();
  if (cachedModels != null && (currentTime - lastFetch) < 300000) return cachedModels;
  const models = {};
  await fetch(process.env.NEXT_PUBLIC_IMAGE_SERVER+'styles')
    .then((res) => res.json())
    .then((data) => {
      Object.keys(data).forEach((model) => {
        models[model] = new Model(model, data[model]['mini'], data[model]['full_name'], data[model]['num_variants']);
      });
    }); 
  lastFetch = new Date();
  cachedModels = models;
  return models;
};
// Increment the variant and return the new variant
const nextVariant = (model) => {
  if (model.current_variant === model.num_variants-1) {
    model.current_variant = 0;
  } else {
    model.current_variant++;
  }
  return model.current_variant;
};
export { Model, getModels, nextVariant };

