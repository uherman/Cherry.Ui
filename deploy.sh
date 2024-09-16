docker build . -t uherman/cherry-ui

docker push uherman/cherry-ui

kubectl apply -f deploy/deployment.yml

kubectl rollout restart deployment cherry-ui