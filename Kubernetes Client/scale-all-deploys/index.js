// Usage: node index.js <REPLICAS>
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

                                   
    console.log('Deployments to scale: ' + deployments);

    const patch = [ {
        "op": "replace",
        "path":"/spec/replicas",
        "value": parseInt(process.argv[2])
    } ]
    
    const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};

    console.log('Scaling to ' + process.argv[2] + ' replicas');
    deployments.forEach((dep) => {
        k8sApi.patchNamespacedDeploymentScale(dep, 'default', patch, undefined, undefined, undefined, undefined, options)
            .then((res) => {
                console.log("Patched: " + dep);
            })
            .catch((err) => console.log("Error: " + err))
    })
    
});