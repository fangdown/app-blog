#!/bin/sh
echo "----- do zip mtalent-mobile.tar.gz and move to deploy-zip --------"
npm run build
cd dist
zip -r mtalent-mobile.zip *
mv mtalent-mobile.zip mtalent-mobile.tar.gz
mv mtalent-mobile.tar.gz ../../../deploy-zip/
#rm mtalent-mobile.tar.gz
echo "-----------done---------"