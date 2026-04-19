# Muscle Matrix Android Wrapper

This folder is an APK-ready Android WebView wrapper for the web app in the project root.

## Build Requirements

- Android Studio
- Working JDK 17 or newer
- Android SDK with build tools
- Gradle or Android Studio's bundled Gradle runner

The current machine reported a broken Java runtime and no Gradle command, so the APK binary cannot be compiled in this session.

## Build Steps

1. Open this `android-wrapper` folder in Android Studio.
2. Let Android Studio sync Gradle.
3. Choose `Build > Build Bundle(s) / APK(s) > Build APK(s)`.

The Gradle file copies `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, `sw.js`, and `assets/` into Android assets before building.
