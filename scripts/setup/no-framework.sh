#!/usr/bin/env bash
echo ""
echo "Installing AppLaunchpad with static files and basic configuration"
echo ""

if [[ "$1" = "" ]]; then
  read -p "AppLaunchpad project folder name: " folder
else
  folder=$1
  echo "AppLaunchpad project folder name: $folder"
fi
# steps to execute line by line
echo ""

mkdir $folder && cd $folder

npm init -y > /dev/null

# add "start" command to the package.json file. This command is split into 2 lines on purpose!
sed 's/"scripts": {/"scripts": {\
\   "buildConfig":"webpack --entry .\/src\/applaunchpad-config\/applaunchpad-config.es6.js --output-path .\/public\/assets --output-filename applaunchpad-config.js --mode production",/1' package.json > p.tmp.json && mv p.tmp.json package.json
sed 's/"scripts": {/"scripts": {\
\   "start":"live-server --entry-file=index.html public",/1' package.json > p.tmp.json && mv p.tmp.json package.json

npm i -save @applaunchpad-project/core @applaunchpad-project/client fundamental-styles @sap-theming/theming-base-content live-server webpack webpack-cli @babel/core @babel/preset-env babel-loader 
mkdir -p public/assets
mkdir -p src/applaunchpad-config

# download assets
curl https://raw.githubusercontent.com/davidwl/applaunchpad/master/scripts/setup/assets/index.html > public/index.html
curl https://raw.githubusercontent.com/davidwl/applaunchpad/master/scripts/setup/assets/applaunchpad-config.es6.js > src/applaunchpad-config/applaunchpad-config.es6.js
curl https://raw.githubusercontent.com/davidwl/applaunchpad/master/scripts/setup/assets/basicMicroFrontend.html > public/assets/basicMicroFrontend.html


cp -r node_modules/\@applaunchpad-project/core public/applaunchpad-core
cp -r node_modules/\@applaunchpad-project/client public/applaunchpad-client
cp -r node_modules/fundamental-styles/dist public/fundamental-styles
cp -r node_modules/@sap-theming/theming-base-content public/theming-base-content

echo "Building config with command: npm run buildConfig"
npm run buildConfig

echo "Running live-server with command: npm run start"
npm run start
