#!/usr/bin/env bash
echo ---------Path: $1 -----------
cd $1
pwd

#清除缓存
#npm cache clean --force

#npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
#npm config set phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
#npm config set electron_mirror=https://npm.taobao.org/mirrors/electron/


echo --------- 设置环境变量 ---------------
#npm config set registry https://registry.npm.taobao.org
#npm config set disturl https://npm.taobao.org/dist


npm config set loglevel=http
echo --------- 开始npm install ---------------
#--unsafe-perm=true --allow-root
npm install -verbose --unsafe-perm=true --allow-root
echo --------- 开始执行编译 -------------
#执行编译
npm run build
echo --------- 修改权限 ---------------
#chmod -R 777 $1/public
