@echo off
echo 进入build,
cd dist
"C:\Program Files\7-Zip\7z.exe" a "mtalent-mobile.zip" "*"
rename mtalent-mobile.zip mtalent-mobile.tar.gz
echo build ok update svn,
echo mtalent-mobile.zip move to ..\..\deploy-zip\,
move mtalent-mobile.tar.gz ..\..\..\deploy-zip\
start ..\..\..\deploy-zip\