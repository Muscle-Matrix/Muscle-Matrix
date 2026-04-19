# Muscle Matrix

Muscle Matrix is a responsive gym management web app based on the uploaded project synopsis. It combines member and trainer records, attendance, fee tracking, workout scheduling, BMI and calorie calculation, diet planning, progress reports, and a subscription academy for martial arts learning paths.

## Open the Website

Open `index.html` in a browser.

For installable PWA behavior, run:

```powershell
node server.js
```

Then open `http://127.0.0.1:4173`.

The app stores demo data in browser local storage. The Google sign-in button is a demo flow; production Google login needs an OAuth client ID and backend token verification.

Default login:

```text
Username: Siddharth123
Password: 12345678
```

## Main Modules

- Login page with local demo access and Google-ready entry point
- Dashboard for members, trainers, attendance, fees, and suggestions
- Member, trainer, membership, and fee management
- Attendance and workout schedule tracking
- BMI, BMR, calories, and goal-based workout generator
- Diet planner with macros and meal templates
- Martial arts subscription paths inspired by Lookism-style training arcs
- Demo payment gateway for unlocking the martial arts academy
- Progress timeline and JSON report export
- PWA manifest and service worker for installable web app support

## Subscription Access

The martial arts section is locked until a plan is paid through the demo payment gateway. The demo gateway stores a transaction locally and unlocks all combat paths and video links. For real payments, connect the checkout flow in `app.js` to Razorpay, Stripe, UPI, or another production provider.

## APK Status

The project includes web/PWA files that can be packaged into an APK with Android Studio, Capacitor, or a WebView wrapper. This machine currently does not have a working Java/Gradle Android build chain, so an APK binary was not generated here.

Recommended build path:

1. Install Android Studio with a working JDK.
2. Use a PWA-to-APK tool or Capacitor.
3. Point the Android app to this web build.
4. Build a debug or release APK from Android Studio.
