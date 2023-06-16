
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
let cachedModels: {[key: string]: Model} = {};
let lastFetch : Date= new Date();
const fetchModels = async () => {
  if (!process.env.NEXT_PUBLIC_IMAGE_SERVER) {
    throw new Error('Environment variable for the image server is not defined');
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_SERVER}styles`);
  const data = await response.json();
  return Object.keys(data).reduce((models: { [key: string]: Model }, model: string) => {
    models[model] = new Model(model, data[model]['mini'], data[model]['full_name'], data[model]['num_variants']);
    return models;
  }, {});
};
const getModels = async () => {
  try {
    const models = await fetchModels();
    return models;
  } catch (error) {
    console.error(error);
    return {};
  }
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

