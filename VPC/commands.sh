#! Create VM
gcloud compute instances create <VM_NAME> \
    --machine-type=e2-micro \
    --network=<NETWORK_NAME> \
    --subnet=<SUBNET_NAME> \
    --zone=<ZONE> \
    --tags=<TAGS>

#! Create VM with no external IP
gcloud compute instances create <VM_NAME> \
    --machine-type=e2-micro \
    --network=<NETWORK_NAME> \
    --subnet=<SUBNET_NAME> \
    --zone=<ZONE> \
    --tags=<TAGS> \
    --no-address

gcloud compute instances create vm-sn2-b \
    --machine-type=e2-micro \
    --network=vpc-teste-1 \
    --subnet=sn-teste-2 \
    --zone=us-west1-a \
    --tags=onsn2 \
    --no-address

#! Add tags to VM
gcloud compute instances add-tags <VM_NAME> \
    --zone <ZONE> \
    --tags <TAGS>

#! List VMs
gcloud compute instances list

#! Create Firewall rule
gcloud compute firewall-rules create <RULE_NAME> \
    --network <NETWORK_NAME>
    --direction <DIRECTION>
    --action <ACTION>
    --source-ranges <SOURCE_RANGES>
    --target-tags <TARGET_TAGS> \
    --rules <PROTOCOL>:<PORT>
    --enable-logging

#! Delete Firewall rule
gcloud compute firewall-rules delete <RULE_NAME>

#! List Firewall rules
gcloud compute firewall-rules list

gcloud compute routers nats create <NAT_CONFIG> \
    --router=<NAT_ROUTER> \
    --nat-external-ip-pool=<IP_ADDRESSES>
    --nat-custom-subnet-ip-ranges=<SUBNETS>
    --nat-all-subnet-ip-ranges \
    --enable-logging

#! Create Cloud Router 
gcloud compute routers create nat-router \
    --network <NETWORK_NAME> \
    --region <REGION>

#! Create NAT   
gcloud compute routers nats create nat-config \
    --router-region <REGION> \
    --router nat-router \
    --nat-all-subnet-ip-ranges \
    --auto-allocate-nat-external-ips

#! GCP - Default login
gcloud auth application-default login

#! GCP - Connect to VM Instance with Agent Forwarding
gcloud compute ssh --zone <ZONE> <VM_NAME>  --project <PROJECT> -- -A