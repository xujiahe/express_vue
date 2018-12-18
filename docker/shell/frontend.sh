#!/usr/bin/env bash
cd /home/gitlab-runner
echo -------$1---------
echo -------$2---------
echo -------$3---------
echo -------$4---------
echo -------$5---------
echo -------$6---------
DIR_NAME=${1##*/}
PROJECT_PATH=/home/gitlab-runner/projects
echo ------- DIR_NAME = ${DIR_NAME} ---------
echo ------- PROJECT_PATH = ${PROJECT_PATH} ---------

mkdir ${PROJECT_PATH}/$2
cd ${PROJECT_PATH}/$2/${DIR_NAME}
sudo rm -rf `ls -A  | egrep -v node_modules`


#将3rd下的资源文件拷贝到static下
cp -f ${PROJECT_PATH}/3rd/megvii0725.zip $1/static/

#将DIR_NAME目录下的文件拷贝至PROJECT_PATH目录下，但排除.git文件夹
rsync -a --exclude $2/.git $1 ${PROJECT_PATH}/$2/


sudo docker run \
     -v /home/gitlab-runner:/home/gitlab-runner \
     -v ${PROJECT_PATH}/$2/${DIR_NAME}/node_modules:${PROJECT_PATH}/$2/${DIR_NAME}/node_modules \
     -v /root/.npm/:/root/.npm/ \
     -v /root/.ssh/:/root/.ssh/ \
     ampregistry:5000/node_taobao:10.7.0 \
     /home/gitlab-runner/shell/frontend-build.sh ${PROJECT_PATH}/$2/${DIR_NAME}
echo -----------------------------------------------------------------

cp $1/docker/Dockerfile ${PROJECT_PATH}/$2/

cd ${PROJECT_PATH}/$2

SHA=$3
LSDATE=`date +%y%m%d%H%M`
echo ${LSDATE}
#sudo docker build -t ampregistry:5000/$2:$5.$LSDATE-${SHA:0:8}-$6 .
sudo docker build -t ampregistry:5000/sng-biz-railwayfc-web:$5 .
echo ampregistry:5000/sng-biz-railwayfc-web:$5

