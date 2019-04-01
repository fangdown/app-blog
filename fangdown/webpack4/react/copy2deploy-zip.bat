@echo off
echo 进入build,
cd build
"C:\Program Files\7-Zip\7z.exe" a "social-recruit.zip" "*"
rename social-recruit.zip social-recruit.tar.gz
echo build ok update svn,
echo social-recruit.zip move to ..\..\deploy-zip\,
move social-recruit.tar.gz ..\..\..\deploy-zip\
start ..\..\..\deploy-zip\