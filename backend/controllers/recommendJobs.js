import { tensor } from "@tensorflow/tfjs-core";
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(node, priority) {
    var flag = false;
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i].priority < priority) {
        this.values.splice(i, 0, { node, priority });
        flag = true;
        break;
      }
    }
    if (!flag) {
      this.values.push({ node, priority });
    }
  }

  dequeue() {
    return this.values.shift();
  }

  size() {
    return this.values.length;
  }
}
const computeCosineSimilarity = (emb1, emb2) => {
  const dotProduct = emb1.dot(emb2);
  const magnitude1 = emb1.norm();
  const magnitude2 = emb2.norm();
  return dotProduct.div(magnitude1.mul(magnitude2));
};

const recommendJobs = async (jobs, user) => {
  const pq = new PriorityQueue();
  // console.log('User:', user);

  const resumeEmbedding1D = tensor(user.embeddings);
  // resumeEmbedding1D.print(true);
  console.log("Skills:", resumeEmbedding1D.shape);

  for (const job of jobs) {
    const jobEmbedding1D = tensor(job.embeddings);
    console.log("Job embedding shape:", jobEmbedding1D.shape);

    try {
      const similarityTensor = await computeCosineSimilarity(
        jobEmbedding1D,
        resumeEmbedding1D
      );

      const similarity = (await similarityTensor.data())[0];
      pq.enqueue(job, similarity);
    } catch (error) {
      console.error("Error computing similarity for job:", job, error);
    }
  }

  // console.log("Before initializing order"); // Add debug output
  const order = [];
  // console.log("Order initialized:", order);  // Confirm order is initialized

  while (pq.size() !== 0) {
    const job = pq.dequeue();
    if (job) {
      order.push(job.node);
    } else {
      console.warn("Dequeued job is undefined.");
    }
  }

  // console.log("Final order:", order);  // Debugging output
  console.log("done");
  return order;
};

export { recommendJobs };
