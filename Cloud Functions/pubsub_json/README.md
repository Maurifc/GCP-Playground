# Cloud Functions   
Basic NodeJS Function Triggered by PubSub Event
-------------------

### Enable APIs
```bash
gcloud services enable cloudbuild.googleapis.com \
                        cloudfunctions.googleapis.com
```

### Create a topic
```bash
gcloud pubsub topics create unixtopic
```

### Deploy
```bash
gcloud functions deploy pubsub-json \
        --runtime nodejs16 \
        --trigger-topic unixtopic \
        --entry-point pubsubJson
```

### Check if it works
Post message on pubsub
```bash
gcloud pubsub topics publish unixtopic --message '{"service": "teste"}'
```

Check function logs
```bash
$ gcloud functions logs read pubsub-json
D      pubsub-json  oxhv9fh05qhp  2022-04-19 16:47:24.647  Function execution took 82 ms. Finished with status: ok
       pubsub-json  oxhv9fh05qhp  2022-04-19 16:47:24.642  service >> teste
       pubsub-json  oxhv9fh05qhp  2022-04-19 16:47:24.641  "{\"service\": \"teste\"}"
D      pubsub-json  oxhv9fh05qhp  2022-04-19 16:47:24.564  Function execution started
```

### Delete function
```bash
gcloud functions delete pubsub-json 
```
