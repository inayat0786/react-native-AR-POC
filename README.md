# react-native-AR-POC

#react-native-deepar

Do following chanes inside node_modules/react-native-deepar/android/buil.gradle

 compileSdkVersion safeExtGet('Deepar_compileSdkVersion', 34)
  buildToolsVersion safeExtGet('Deepar_buildToolsVersion', '34.0.0')
  defaultConfig {
    minSdkVersion safeExtGet('Deepar_minSdkVersion', 23)
    targetSdkVersion safeExtGet('Deepar_targetSdkVersion', 34)
    versionCode 1
    versionName "1.0"
  }