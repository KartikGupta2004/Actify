import "@tensorflow/tfjs";
import use from "@tensorflow-models/universal-sentence-encoder";

// Load the model once when the module is imported
let model;

const loadModel = async () => {
  if (!model) {
    model = await use.load();
    console.log("Model loaded successfully");
  }
};

const generateEmbeddings = async (job) => {
  try {
    await loadModel(); // Ensure the model is loaded
    console.log("Generating embeddings for job:", job);

    const jobEmbedding = await model.embed([job]);
    jobEmbedding.print(true /* verbose */);
    const jobEmbedding1D = jobEmbedding.squeeze();

    const values = jobEmbedding1D.dataSync();
    const arr = Array.from(values);

    return arr;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
};

export { generateEmbeddings };
