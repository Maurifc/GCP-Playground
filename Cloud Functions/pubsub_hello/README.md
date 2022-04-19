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
gcloud functions deploy hello \
        --runtime nodejs16 \
        --trigger-topic unixtopic \
        --entry-point helloPubSub
```

### Check if it works
Post message on pubsub
```bash
gcloud pubsub topics publish unixtopic --message "Queiroiz"
```

Check function logs
```bash
$ gcloud functions logs read hello
LEVEL  NAME   EXECUTION_ID  TIME_UTC                 LOG
D      hello  kz9drvpem5z1  2022-04-19 14:33:01.451  Function execution took 104 ms. Finished with status: ok
       hello  kz9drvpem5z1  2022-04-19 14:33:01.445  Queiroiz # console.log(message)
D      hello  kz9drvpem5z1  2022-04-19 14:33:01.347  Function execution started
```

### Delete function
```bash
gcloud functions delete helloGET 
```
