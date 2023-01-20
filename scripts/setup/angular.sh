#!/usr/bin/env bash
set -e
echo ""
echo "Installing AppLaunchpad with Angular and basic configuration"
echo ""
if [[ "$1" = "" ]]; then
  read -p "AppLaunchpad project folder name: " folder
else
  folder=$1
  echo "AppLaunchpad project folder name: $folder"
fi
# steps to execute line by line
echo ""
ng new $folder --routing && cd $folder

npm i -P @applaunchpad-project/core @applaunchpad-project/client fundamental-styles @sap-theming/theming-base-content webpack@5.74.0 webpack-cli@4.10.0 
sed 's/"scripts": {/"scripts": {\
\   "buildConfig":"webpack --entry .\/src\/applaunchpad-config\/applaunchpad-config.es6.js --output-path .\/src\/assets --output-filename applaunchpad-config.js --mode production",/1' package.json > p.tmp.json && mv p.tmp.json package.json
mkdir -p src/applaunchpad-config

 # the following steps can be copy and pasted to the terminal at once
mv src/index.html src/angular.html

# download assets
curl https://raw.githubusercontent.com/davidwl/applaunchpad/master/scripts/setup/assets/index.html > src/index.html
curl https://raw.githubusercontent.com/davidwl/applaunchpad/master/scripts/setup/assets/applaunchpad-config.es6.js > src/applaunchpad-config/applaunchpad-config.es6.js
curl https://raw.githubusercontent.com/davidwl/applaunchpad/master/scripts/setup/assets/basicMicroFrontend.html > src/assets/basicMicroFrontend.html

# string replacements in some files
sed 's#"src/index.html"#"src/angular.html"#g' angular.json > tmp.json && mv tmp.json angular.json

sed 's#"src/styles.css"#"src/styles.css",\
             "node_modules/fundamental-styles/dist/theming/sap_fiori_3.css",\
             "node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3/css_variables.css",\
             "node_modules/fundamental-styles/dist/fundamental-styles.css"#g' angular.json > tmp.json && mv tmp.json angular.json
sed 's#"src/assets"#"src/assets",\
              "src/index.html",\
              "src/logout.html",\
              {"glob": "fundamental-styles.css","input": "node_modules/fundamental-styles/dist","output": "/fundamental-styles"},\
              {"glob": "*","input": "node_modules/@sap-theming/theming-base-content","output": "/fonts"},\
              {"glob": "**","input": "node_modules/@applaunchpad-project/core","output": "/applaunchpad-core"},\
              {"glob": "applaunchpad-client.js","input": "node_modules/@applaunchpad-project/client","output": "/applaunchpad-client"}#g' angular.json > tmp.json && mv tmp.json angular.json

npm run buildConfig
npm run start