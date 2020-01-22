#!/usr/bin/env bash
ssh -i '~/.ssh/ErrandsPair.pem' ec2-user@18.191.103.130 "
pwd;
rm -rf fluffyhome/angularbak
mv fluffyhome/angular fluffyhome/angularbak;
pwd;
cp -rf upload/angular fluffyhome/;
chmod 777 fluffyhome/angular
chmod 777 fluffyhome/angular/*
pwd;
sudo nginx -s reload;
sudo service nginx restart;
exit;"
echo -e "restart: \033[32;49;1m [DONE] \033[39;49;0m"
