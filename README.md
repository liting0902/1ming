npm install --save-dev webpack webpack-cli webpack-dev-server

## babel
npm install --save-dev babel-loader @babel/cli @babel/core @babel/preset-env @babel/preset-react @babel/register @babel/plugin-proposal-class-properties

## basic loaders
npm install --save-dev css-loader style-loader file-loader url-loader  html-webpack-plugin react react-dom react-router-dom

# copy-webpack-plugin
npm install --save-dev copy-webpack-plugin

## 讓css className 不重複
npm install --save-dev classnames
## styled-component
npm install --save-dev styled-components  
## css-loader 文檔說明
https://webpack.docschina.org/loaders/css-loader/#sourcemap  

npm install jest jest-single-file-coverage enzyme enzyme-adapter-react-16 react-test-renderer babel-jest --save-dev
## @std/esm  
npm install --save-dev @std/esm  
## babel-plugin-transform-modules-commonjs
## This plugin transforms ECMAScript modules to CommonJS
npm install --save-dev @babel/plugin-transform-modules-commonjs  
https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs#via-cli  
![](2020-04-20-16-35-28.png)
## react-treebeard
npm install --save-dev react-treebeard
//npm install --save-dev rc-tree

npm install --save-dev uuid

npm install --save-dev react-scripts

## MiniCssExtractPlugin - 獨立的 CSS 檔
npm install --save-dev mini-css-extract-plugin

npm install --save-dev @babel/node

npm install --save-dev express  html-loader jquery jstree openurl  

npm install --save-dev csv-loader xml-loader

## MiniCssExtractPlugin - 獨立的 CSS 檔
Webpack 4 以前使使用 extract-text-webpack-plugin；Webpack 4 之後則是使用 mini-css-extract-plugin。
npm install --save-dev mini-css-extract-plugin

## Html-Webpack-Plugin  index.html 動態刪除  
<--script src="index.js"-->  
https://ithelp.ithome.com.tw/articles/10199945

## file-loader
png|svg|jpg|gif

## material-ui
npm install --save-dev @material-ui/core
npm install --save-dev @material-ui/lab
npm install --save-dev @material-ui/icons
npm install --save-dev react-spring

## rc-tree
npm install --save-dev rc-tree

## JQuery
npm install --save-dev jquery jsdom

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
console.log($); //测试jquery是否可以正常工作

## lodash
npm install --save-dev lodash  

## Mocha + chai
npm install --save-dev mocha chai  

## REDUX
https://ithelp.ithome.com.tw/users/20110371/ironman/1616?page=3
npm install --save-dev redux react-redux redux-logger redux-thunk redux-promise  redux-devtools-extension  

https://chentsulin.github.io/redux/docs/basics/UsageWithReact.html  
https://github.com/xgrommx/awesome-redux  

![](ReactComponentLifecycle.png)

## SSR PreRender
npm install prerender-node --save-dev  
https://prerender.io/  

## Coren  比較React 各種 SSR 方案
https://medium.com/@wwwy3y3/coren-最簡單-最有彈性的-react-sever-side-render-解決方案-b36e708d3956  
https://medium.com/@wwwy3y3/react-composite-server-side-render-a85a90f841f5  
https://medium.com/@evenchange4/react-stack-開發體驗與優化策略-b056da2fa0aa  



## React renderToString
https://iandays.com/2019/01/30/reactssr/

$\color{lime}{ReactDOMServer.renderToStaticMarkup()}$
https://stackoverflow.com/questions/39308011/convert-react-jsx-object-to-html  


## Gatsby.js 基於react產生靜態網頁

## yargs
npm install --save-dev yargs  

## 信用卡輸入頁面 React
https://airwavess.github.io/react-interactive-paycard/?fbclid=IwAR2fEF_0vePzBLevzKv2gb0XuXmKkcA0CNb6pOHqsaq0X3I3-nEktuAMiL8

## webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer

## html-react-parser
npm install --save-dev html-react-parser

## html-to-react
https://www.npmjs.com/package/html-to-react
npm install --save-dev html-to-react

## firebase (Global 全域)
npm install -g firebase-tools

## bootstrap
npm install --save-dev bootstrap  
