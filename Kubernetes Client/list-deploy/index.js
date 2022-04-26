const k8s = require('@kubernetes/client-node');
const jq = require('node-jq')

const cluster = {
    server: 'https://34.74.241.102',
    skipTLSVerify: true
};

const user = {
    token: ""
};

const kc = new k8s.KubeConfig();
kc.loadFromClusterAndUser(cluster, user);

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

k8sApi.listNamespacedDeployment('default').then(async (res) => {
    //Get deployments
    const deployments = (await jq.run('.items[].metadata.name',
                                res.body,
                                {input: 'json'}))
                            .replace(/\"/g, "", ).split("\n") // Remove double quotes and turn string into array 

                                   
    console.log(deployments);
});