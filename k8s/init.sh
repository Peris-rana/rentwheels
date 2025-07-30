#!/bin/bash
# script to initialize k8 cluster
# check the status of the cluster

status=$(minikube status --format '{{.Host}}')

if [[ "$status" == "Running" ]];then
   echo -e " \n✅ Minikube is running\n"
else 
   echo "🚀 Minikube is not running, starting it now"
   minikube start
   echo "⏳ Waiting for few seconds"
   sleep 10
fi



# run the files 
echo "📦 Applying Kubernetes deployment and service configurations"
echo -e "_________________________________________________________\n"
kubectl apply -f client-rentwheels.yml
kubectl apply -f admin-rentwheels.yml
kubectl apply -f server-rentwheels.yml
kubectl apply -f mongo-rentwheels.yml
echo -e "_________________________________________________________\n"
kubectl get all
echo -e "_________________________________________________________\n"



minikube service rentwheels-client-service --url &
minikube service rentwheels-admin-service --url &

# forward the ports
echo -e "📡 Forwarding ports of the server and mongodb\n"
kubectl port-forward service/rentwheels-server-service 5900:80 &
kubectl port-forward service/rentwheels-mongo-service 27017:27017 &
wait
