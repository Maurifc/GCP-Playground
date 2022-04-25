/**
 *  Required. The desired node count for the pool.
 */
const nodeCount = process.argv[3]
/**
 *  The name (project, location, cluster, node pool id) of the node pool to set
 *  size.
 *  Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`.
 */
// const name = 'projects/unixlike-tue-347711/zones/us-east1-d/clusters/ctop/nodePools/default-pool'
const name = process.argv[2]

// Imports the Container library
const {ClusterManagerClient} = require('@google-cloud/container').v1;

// Instantiates a client
const containerClient = new ClusterManagerClient();

async function callSetNodePoolSize() {
  // Construct request
  const request = {
    name,
    nodeCount,
  };

  // Run request
  const response = await containerClient.setNodePoolSize(request);
  console.log(response);
}

callSetNodePoolSize();
