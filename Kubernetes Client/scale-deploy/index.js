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

const patch = [ {
    "op": "replace",
    "path":"/spec/replicas",
    "value": 1
} ]

const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};

k8sApi.patchNamespacedDeploymentScale('app-1', 'default', patch, undefined, undefined, undefined, undefined, options)
    .then((res) => {
        console.log("Patched");
    })
    .catch((err) => console.log("Error: " + err))