# ADARSHA iOS
It has a search engine with an intuitive front-end that facilitates searching and browsering of the processed Tabetan texts

## Setup

Tested on xcode Version 6.4 (6E35b)


```
# do this for the first time only
npm run init
```
Add node_modules/kfs_* and kdb file to project

![xcode-add-files](https://raw.githubusercontent.com/kmsheng/AdarshaIos/master/docs/xcode-add-files.png)

Add assets/images/* to image.xcassets ( xcode )

See [adding static resources to your ios app using images xcassets](https://facebook.github.io/react-native/docs/image.html#adding-static-resources-to-your-ios-app-using-images-xcassets)

# do this before deploying to iphone

```
react-native bundle --minify
```
