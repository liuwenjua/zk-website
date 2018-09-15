# 团火网站

## <a name="getting-started">&sect; 快速开始</a>

### <a name="installation">⊙ 安装</a>
> 建议升级到 node 6.x + npm 3.x 环境  

> 推荐将npm源切换到淘宝镜像：`npm set registry https://registry.npm.taobao.org/` 

> 具体参考 [淘宝NPM镜像](https://npm.taobao.org/)

> `git clone`后，打开命令窗口切换到工程目录下，敲下`npm install`安装依赖

### <a name="start">⊙ 启动</a>
> `npm start`，启动browser-sync，默认浏览器会自动打开`localhost:7070`

### <a name="deploy">⊙ 部署</a>
> `npm run dist`，自动打包输出到dist目录，并启动browser-sync试运行

> `npm run publish`，dist目录下所有文件打包成website.zip，输出到release目录