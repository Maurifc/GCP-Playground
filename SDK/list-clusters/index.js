async function main() {
    const container = require('@google-cloud/container');
  
    // Create the Cluster Manager Client
    const client = new container.v1.ClusterManagerClient();
  
    async function quickstart() {
      const zone = 'us-east1-d';
      const projectId = await client.getProjectId();
      const request = {
        projectId: projectId,
        zone: zone,
      };
  
      const [response] = await client.listClusters(request);
      console.log('Clusters: ', response);
    }
    quickstart();
  }
  
  main().catch(console.error);