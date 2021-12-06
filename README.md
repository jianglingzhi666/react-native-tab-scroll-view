
# react-native-tab-scroll-view

## Getting started

`$ npm install react-native-tab-scroll-view --save`

### Mostly automatic installation

`$ react-native link react-native-tab-scroll-view`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-react-native-tab-scroll-view` and add `RNReactNativeTabScrollView.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNReactNativeTabScrollView.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.quenice.cardview.RNReactNativeTabScrollViewPackage;` to the imports at the top of the file
  - Add `new RNReactNativeTabScrollViewPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-react-native-tab-scroll-view'
  	project(':react-native-react-native-tab-scroll-view').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-react-native-tab-scroll-view/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-react-native-tab-scroll-view')
  	```


## Usage
```javascript
import RNReactNativeTabScrollView from 'react-native-react-native-tab-scroll-view';

// TODO: What to do with the module?
RNReactNativeTabScrollView;
```
  