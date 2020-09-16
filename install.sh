
# 安装supervisor
installSupervisor(){
    echo '=======检测是否已全局安装node服务启动器superviosr======='
    hasSuper=$(npm ls supervisor -g)
    hasSuper=${hasSuper: -7}
    if [ $hasSuper == '(empty)' ]
    then
        echo '====未安装,启动安装程序===='
        npm i supervisor -g
        echo '====安装完毕===='
    else
        echo '====服务已存在===='
    fi
}

# 编译所有library
buildLibrary(){
    echo '=======开始编译所有library======='
    library_string=$(node -pe "const conf = require('../angular.json').projects; let list = []; for(let k in conf) {if(/^\@goku\//.test(k)){list.push(k)}};list")
    int=0
    library_string=${library_string//[/}
    library_string=${library_string//]/}
    library_list=(${library_string//,/ })
    while(( $int<${#library_list[*]} ))
    do
        library_name=${library_list[${int}]}
        library_name=${library_name/\'/}
        library_name=${library_name/\'/}
        echo "====开始编译${library_name}===="
        ng build ${library_name} --prod
        let int++
    done
    echo '=======所有library编译完毕======='
}

# 安装服务器依赖
installServer(){
    echo '=======开始安装node服务依赖======='
    cd ./server
    npm i
    cd ..
    echo '=======node服务依赖安装完毕======='
}

# 安装主程序依赖
installMain(){
    echo '=======开始安装主程序依赖======='
    npm i
    echo '=======主程序依赖安装完毕======='
}

installMain
buildLibrary
installSupervisor
installServer