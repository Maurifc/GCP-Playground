# Cloud Scheduler - PubSub
Create a Job that publish messages on a pubsub topic every minute

## Setup
Enable API
```bash
gcloud services enable cloudscheduler.googleapis.com
```

Create a topic
```bash
gcloud pubsub topics create cron-topic \
                --location=us-central1 
```

Create a subscription
```bash
gcloud pubsub subscriptions create cron-sub --topic cron-topic
```

Setup scheduler job to run every minute
```bash
gcloud scheduler jobs create pubsub hello-everyminute \
            --schedule="* * * * *" \
            --topic=cron-topic \
            --location=us-central1 \
            --message-body='{"message": "Hello"}'
```

Check published messages
```bash
gcloud pubsub subscriptions pull cron-sub --auto-ack
```

## References:
<https://crontab.guru/every-1-minute>
<https://cloud.google.com/pubsub/docs/publish-receive-messages-gcloud>