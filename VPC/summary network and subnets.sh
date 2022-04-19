# Networks (VPCs)
# You can choose to create an auto mode or custom mode VPC network. Each new network that you create must have a unique name within the same project.

# Subnets
# You can create subnets when you create the network, or you can add subnets later.


#! Create VPC with subnet custom mode
gcloud compute networks create <NETWORK_NAME> \
    --subnet-mode=custom \
    --bgp-routing-mode=regional \
    --mtu=1400

# About firewall rules
# After you create a network, create firewall rules to allow or deny traffic between resources in the network, such as communication between VM instances. 
# You also use firewall rules to control what traffic leaves or enters the VPC network to or from the internet.    

#! View VPC
gcloud compute networks list

#! Delete VPC
gcloud compute networks delete <NETWORK_NAME>

# Instances on this network will not be reachable until firewall rules
# are created. As an example, you can allow all internal traffic between
# instances as well as SSH, RDP, and ICMP by running:
#! Add firewall rules
gcloud compute firewall-rules create <RULE_NAME> --network <NETWORK_NAME> --allow tcp,udp,icmp --source-ranges <IP_RANGE>
gcloud compute firewall-rules create <RULE_NAME> --network <NETWORK_NAME> --allow tcp:22,tcp:3389,icmp

#? Working with subnets
# Cannot change name or region after cretion. But you can delete and create another as long as no resources are using it.
# Has a primary IPv4 range and one or more secondary ranges (alias IP).
# IPv4 range can be different. Subnet A = 10.10.0.0/16 but Subnet B = 172.16.0.0/20
# Ipv4 range can be expanded after subnet creation
# Secondary IPs can be removed if no resources are using that range
# The longest mask to use is /29
# Primary and secondary ranges for subnets cannot overlap with any allocated range, any primary or secondary range of another subnet in the same network, or any IPv4 ranges of subnets in peered networks.
# IPv4 ranges for all subnets must be unique among VPC networks that are connected to one another by VPC Network Peering.
# Primary and secondary ranges can't conflict with on-premises IP ranges if you have connected your VPC network to another network with Cloud VPN, Dedicated Interconnect, or Partner Interconnect.

#! Create subnet
gcloud compute networks subnets create <SUBNET_NAME> \
    --network=<NETWORK_NAME> \
    --range=<PRIMARY_RANGE> \
    --region=<REGION>
    
#! List all subnets
gcloud compute networks subnets list

#! List all subnets from a network
gcloud compute networks subnets list \
   --network=<NETWORK_NAME>

#! Describe subnet defails
gcloud compute networks subnets describe <SUBNET_NAME> \
    --region=<REGION>

#! Delete subnet
gcloud compute networks subnets delete <SUBNET_NAME> \
    --region=<REGION>

gcloud compute networks subnets delete sn-teste-2 \
    --region=us-west1

#! Expand subnet IP range ( CANNOT BE UNDONE !)
gcloud compute networks subnets expand-ip-range <SUBNET_NAME> \
  --region=<REGION> \
  --prefix-length=<MASK>

#! Delete an network (VPC)
gcloud compute networks delete <NETWORK_NAME>