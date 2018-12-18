#!/usr/bin/env bash

#set -x

ARGS=`getopt -o '' --long PROJECT_NAME:,COMMIT_MESSAGE:,SOFT_VERSION:,REQUEST_URL:,COOKIE: -- "$@"`
if [ $? != 0 ]; then
    echo "参数错误..."
    exit 1
fi


#echo ${ARGS}
#将规范化后的命令行参数分配至位置参数（$1,$2,...)
eval set -- "${ARGS}"

while true
do
    case "$1" in
        --PROJECT_NAME)
            case "$2" in
            "")
                echo "PROJECT_NAME is empty";
                shift 2
                ;;
            *)
                echo "PROJECT_NAME=$2"
                PROJECT_NAME=$2
                shift 2
                ;;
            esac
            ;;
        --COMMIT_MESSAGE)
            case "$2" in
            "")
                echo "COMMIT_MESSAGE is empty";
                shift 2
                ;;
            *)
                echo "COMMIT_MESSAGE=$2"
                COMMIT_MESSAGE=$2
                shift 2
                ;;
            esac
            ;;
        --SOFT_VERSION)
            case "$2" in
            "")
                echo "SOFT_VERSION is empty";
                shift 2
                ;;
            *)
                echo "SOFT_VERSION=$2"
                SOFT_VERSION=$2
                shift 2
                ;;
            esac
            ;;
        --REQUEST_URL)
            case "$2" in
            "")
                echo "REQUEST_URL is empty";
                shift 2
                ;;
            *)
                echo "REQUEST_URL=$2"
                REQUEST_URL=$2
                shift 2
                ;;
            esac
            ;;
        --COOKIE)
            case "$2" in
            "")
                echo "COOKIE is empty";
                shift 2
                ;;
            *)
                echo "COOKIE=$2"
                COOKIE=$2
                shift 2
                ;;
            esac
            ;;
        --)
            echo "--"
            shift
            break
            ;;
        *)
            echo "Internal error!"
            shift
            ;;
    esac
done

echo --- 接收参数如下: ---
echo ---1 PROJECT_NAME-----:${PROJECT_NAME}
echo ---2 COMMIT_MESSAGE---:${COMMIT_MESSAGE}
echo ---3 SOFT_VERSION-----:${SOFT_VERSION}
echo ---4 REQUEST_URL------:${REQUEST_URL}
echo ---5 COOKIE-----------:${COOKIE}
echo --------- end ------------

curl -X POST --data operate=deploy ${REQUEST_URL}/operate --cookie "${COOKIE}"
echo "已发送重新部署指令"


#if [[  ${COMMIT_MESSAGE} =~ "重启" ]]; then
#    echo "------ 检测到需要重启服务 ------"
#    server_name=${PROJECT_NAME}"\s*"${SOFT_VERSION}
#    data=`sudo docker images | grep -E ''${server_name}'' | grep -v mariadb | grep -v service | awk '{print $1":"$2}'`
#    arr=(${data//\\n/ })
#    echo "------ 查询到的 ${PROJECT_NAME}:${SOFT_VERSION} 的服务有:${arr[*]} ------"
#    for i in ${arr[@]}
#    do
#        echo "------ service name = $i "
#        #curl $3 --cookie "$4" > /home/gitlab-runner/logs/${PROJECT_NAME}.txt
#        #sed -i "s!\"image\":\"[^\"]\+\"!\"image\":\"$i\"!g" /home/gitlab-runner/logs/$SHASHORT.txt
#        echo --- POST ---
#        #output=`cat /home/gitlab-runner/logs/${PROJECT_NAME}.txt`
#        #echo ${output}
#        #curl -X PUT -H "Content-Type: multipart/form-data" --data "$output" $3 --cookie "$4"
#        curl -X POST --data operate=deploy ${REQUEST_URL}/operate --cookie "${COOKIE}"
#        echo "已发送重新部署指令"
#    done
#else
#    echo "不需要重启"
#fi


