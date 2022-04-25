# List Clusters

## Setup

Enable APIs
```bash
gcloud services enable container.googleapis.com
```

Login
```bash
gcloud auth application-default login
```

Install Node dependencies
```bash
npm i
```

Find the node pool to be resized
```bash
gcloud container node-pools list --zone <ZONE> --cluster <CLUSTER_NAME>
```

Get its selflink
```bash
$ gcloud container node-pools describe <NODE_POOL_NAME> --zone <ZONE> --cluster <CLUSTER_NAME> | grep selfLink | sed 's,.*v1/,,'
projects/unixlike-tue-347711/zones/us-east1-d/clusters/ctop/nodePools/default-pool
```

```bash
node index.js <NODE_POOL_SELF_LINK> <NODE_COUNT>
```

Run application
```bash
npm run start
```

Check node count at pool ( change `zone` and `cluster` according to your cluster)
```bash
gcloud container node-pools describe default-pool --zone us-east1-d --cluster ctop | grep initialNodeCount
```


## References
<https://cloud.google.com/nodejs/docs/reference/container/latest>