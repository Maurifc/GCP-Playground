// Usage: node index.js <NODE_POOL> <NODE_COUNT>

const {ClusterManagerClient} = require('@google-cloud/container').v1;
const jq = require('node-jq')
const containerClient = new ClusterManagerClient();

const nodeCount = process.argv[3]
const name = process.argv[2]

// Resize node pool
async function resizeNodePool() {
  console.log("Resizing node pool to " + nodeCount + " nodes");
  const request = {
    name,
    nodeCount,
  };

  const response = await containerClient.setNodePoolSize(request);
}

async function getNodeCount(){
  try {
    const request = {
      name: process.argv[2]
    };
  
    const res = await containerClient.getNodePool(request)
    return res[0].initialNodeCount
  } catch (err) {
    console.log("Failed when getting nodepool size: " + err)    
  }
}


// Returns only when nodepool has the desired size
async function waitResizing(callback){
  let currentNodeCount;

  do {
    console.log("Waiting...");
    await new Promise(r => setTimeout(r, 5000)); // Sleep for 5 secs

    currentNodeCount = await getNodeCount()
    console.log("Current nodes on the pool: " + currentNodeCount);
  } while (currentNodeCount != nodeCount);
  
  callback()
}

resizeNodePool();

waitResizing(() => console.log("Cluster resized ;)"))

