// Usage: node index.js <REPLICAS>
const k8s = require('@kubernetes/client-node');
const jq = require('node-jq')

const cluster = {
    server: 'https://34.74.241.102',
    skipTLSVerify: true
};

const user = {
    token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU3c3hvc01xc291cldkNmRrR2Faa0ZLNTRjU09KbzF6Wlo1andwU0JWNmsifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InNldHVwLWZ1bmN0aW9uLXRva2VuLXNrczVwIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6InNldHVwLWZ1bmN0aW9uIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiMjdjZDE0NDAtMzRhOS00OGNlLWJmNjItZWIzMjhjM2MyNjg3Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlZmF1bHQ6c2V0dXAtZnVuY3Rpb24ifQ.DSNKCQgwORJxg6Po2jBYZh6qtLpXeQQJC-sWpBmps3BOl7kHEo27SmAUwgMZw4u1kA1aw8Exg8XepkA1B0d4I7_63Kq0ZLaVFiUCCH87aMOiGkruJGkay_mfXIuTZWSKbVq1uBBMZaomGEwDQs6Pwglv4AA4BVRGU7OcW10Rby936uKO5LFP8F1B9Maw2j5jRrmXEeW1mugjFqx2wiJHOWArTT5y_fclW3KUQdduY4yOCMojuatM78W_f1_zvcmaiu42rukFVeckWLZR8lcKsn8X9LjyAUjtwnhDkVkJSctceku4QdtXJGZp0lmp7JmbzHYO_T5aOd1OLPjJSQUXEQ"
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