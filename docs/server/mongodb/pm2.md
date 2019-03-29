## PM2 常用命令
命令 | 参考释义
$ pm2 start app.js |  # 启动app.js应用程序
$ pm2 start app.js -i 4 # cluster mode 模式启动4个app.js的应用实例# 4个应用程序会自动进行负载均衡
$ pm2 start app.js --name="api" |  # 启动应用程序并命名为 "api"
$ pm2 start app.js --watch      |  # 当文件变化时自动重启应用
$ pm2 start script.sh           |  # 启动 bash 脚本
$ pm2 list                      |  # 列表 PM2 启动的所有的应用程序
$ pm2 monit                     |  # 显示每个应用程序的CPU和内存占用情况
$ pm2 show [app-name]           |  # 显示应用程序的所有信息
$ pm2 logs                      |  # 显示所有应用程序的日志
$ pm2 logs [app-name]           |  # 显示指定应用程序的日志
$ pm2 flush                       # 清空所有日志文件
$ pm2 stop all                  |  # 停止所有的应用程序
$ pm2 stop 0                    |  # 停止 id为 0的指定应用程序
$ pm2 restart all               |  # 重启所有应用
$ pm2 reload all                |  # 重启 cluster mode下的所有应用
$ pm2 gracefulReload all        |  # Graceful reload all apps in cluster mode
$ pm2 delete all                |  # 关闭并删除所有应用
$ pm2 delete 0                  |  # 删除指定应用 id 0
$ pm2 scale api 10              |  # 把名字叫api的应用扩展到10个实例
$ pm2 reset [app-name]          |  # 重置重启数量
$ pm2 startup                   |  # 创建开机自启动命令
$ pm2 save                      |  # 保存当前应用列表
$ pm2 resurrect                 |  # 重新加载保存的应用列表
$ pm2 update                    |  # Save processes, kill PM2 and restore processes
$ pm2 generate                  |  # Generate a sample json configuration file


$ pm2 logs 显示所有进程日志
$ pm2 stop all 停止所有进程
$ pm2 restart all 重启所有进程
$ pm2 reload all 0秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0 停止指定的进程
$ pm2 restart 0 重启指定的进程
$ pm2 startup 产生 init 脚本 保持进程活着
$ pm2 web 运行健壮的 computer API endpoint (http://localhost:9615)
$ pm2 delete 0 杀死指定的进程
$ pm2 delete all 杀死全部进程

运行进程的不同方式：
$ pm2 start app.js -i max 根据有效CPU数目启动最大进程数目
$ pm2 start app.js -i 3 启动3个进程
$ pm2 start app.js -x 用fork模式启动 app.js 而不是使用 cluster
$ pm2 start app.js -x -- -a 23 用fork模式启动 app.js 并且传递参数 (-a 23)
$ pm2 start app.js --name serverone 启动一个进程并把它命名为 serverone
$ pm2 stop serverone 停止 serverone 进程
$ pm2 start app.json 启动进程, 在 app.json里设置选项
$ pm2 start app.js -i max -- -a 23 在--之后给 app.js 传递参数
$ pm2 start app.js -i max -e err.log -o out.log 启动 并 生成一个配置文件