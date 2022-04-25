const k8s = require('@kubernetes/client-node');

const cluster = {
    name: 'cclient',
    server: 'https://34.74.241.102',
    skipTLSVerify: true
};

const user = {
    token: ""
};

const kc = new k8s.KubeConfig();
kc.loadFromClusterAndUser(cluster, user);

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi.listNamespacedPod('default').then((res) => {
    console.log(res.body);
});