#!/bin/sh
echo "----- do zip social-recruit.tar.gz and move to deploy-zip --------"
npm run build-new
cd dist
zip -r social-recruit.zip *
mv social-recruit.zip social-recruit.tar.gz
mv social-recruit.tar.gz ../../../deploy-zip/
#rm social-recruit.tar.gz
echo "-----------done---------"