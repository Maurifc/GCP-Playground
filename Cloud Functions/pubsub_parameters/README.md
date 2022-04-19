# Cloud Functions - Parameters
Basic NodeJS Function Triggered by PubSub Event
-------------------

### Enable APIs
```bash
gcloud services enable cloudbuild.googleapis.com \
                        cloudfunctions.googleapis.com
```

### Create a topic
```bash
gcloud pubsub topics create parameters-topic
```

### Deploy
```bash
gcloud functions deploy parameters \
        --runtime nodejs16 \
        --trigger-topic parameters-topic \
        --entry-point parameters
```

### Check if it works
Post message on pubsub
```bash
gcloud pubsub topics publish parameters-topic --message '{"action": "f1"}'

or 

gcloud pubsub topics publish parameters-topic --message '{"action": "f2"}'
```

Check function logs
```bash
$ gcloud functions logs read parameters

```

### Delete resources
```bash
gcloud functions delete parameters 
gcloud pubsub topics delete parameters-topic
```
