## linux命令
1. 查看进程 ps u
2. 杀死进程 kill -9 pid
3. 查看文件 vi  filename
4. 查看文件前几行 head 20 filename
5. 查看文件后几行 tail 20 filename
6. 创建目录 mkdir dirname
7. 删除目录 rm dirname, rm -rf dirname  
8. 复制文件 cp -R sourcepath topath
9. 移动文件 mv soucrepath topath
10. 更改文件权限 chmod -R 755
11. 更改文件归属 chown -R root:user
12. sh 运行文件
13. vi 打开文件
14. 查找文件  find pathname(路径,.表示当前路径) -name -print es: find . 'zip2copy.sh' -print
15. 统计文件的行数 、词数、字符数、 wc filename
16. 远程登录 telnet xxx.cn
17. 远程登录 rlogin hostname
18. 远程主机执行命令 rsh 
19. ftp传输 ftp xxx.cn
20. 本地与远程直接复制文件 rcp file host:file2
    