#!/usr/bin/env bash
ssh -i '~/.ssh/ErrandsPair.pem' ec2-user@18.191.103.130 "
pwd;
mv fluffyhome/fluffyhome-*.jar fluffyhome/fluffyhome.jar.bak
pwd;
cp upload/fluffyhome-*.jar fluffyhome/;
pwd;
cd fluffyhome/
pwd;
./restartBackend.sh
exit;"
echo -e "restart: \033[32;49;1m [DONE] \033[39;49;0m"