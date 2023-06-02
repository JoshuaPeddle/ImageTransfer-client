
class Model {
  style: string;
  background_url: string;
  label: string;
  num_variants: number;
  current_variant: number;
  constructor(style: string, background_url: string, label: string, num_variants=1) {
    this.style = style;
    this.background_url = background_url;
    this.label = label;
    this.num_variants = num_variants;
    this.current_variant = 0;
  }
}
let cachedModels: {[key: string]: Model} = {}; // Models are cached for 5 minutes
let lastFetch : Date= new Date(); // Last time models were fetched
const getModels = async () => {
  let currentTime = new Date();
  if (Object.keys(cachedModels).length > 1 &&(currentTime.valueOf() - lastFetch.valueOf()) < 300000) return cachedModels;
  let models: {[key: string]: Model} = {};
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
const nextVariant = (model: Model) => {
  const to_return = model.current_variant;
  if (model.current_variant === model.num_variants-1) {
    model.current_variant = 0;
  } else {
    model.current_variant++;
  }
  return to_return;
};
export { Model, getModels, nextVariant };

