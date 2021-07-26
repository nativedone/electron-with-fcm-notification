# electron-fcm-demo

**Demonstration of [electron-push-receiver](https://github.com/MatthieuLemoine/electron-push-receiver).**
This demo app shows how to make use of Matthieu Lemoine's excellent electron module for receiveing push notifications from Google's Firebase Cloud Messaging (FCM) service.

```bash
# Clone this repository
git clone https://github.com/nativedone/electron-with-fcm-notification.git 
# Go into the repository
cd electron-with-fcm-notification
# Install dependencies
npm install
```

You'll need a free Firebase project and you'll want to have Postman installed to simulate the server push.

1. Go to the [Firebase starting page](https://console.firebase.google.com)
2. Select (or create a new) project
3. Go into your Firebase project settings and then into Cloud Messaging
4. Copy your Sender ID and paste it into renderer.js (in place of 123456789)
5. Update .env.sample with Sender ID
6. Rename .env.sample to .env

```bash
# Run the app
npm start
```

With the app running, select View -> Toggle Developer Tools.  You should see the client's FCM push token in the Chromium debug console.  Copy this token and paste it into FCM's web console.

FCM's web console allows you to send single or batch push notifications ad-hoc to your electron app. 


## Based on
https://github.com/CydeSwype/electron-fcm-demo

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
