## OAuth2 OIDC

After generating your app, you need to configure a few things for OIDC to work correctly - you will need to add a URL 
scheme to your app, and then add that scheme as a valid redirect URI in Keycloak or Okta.


Ignite JHipster generates several files in your JHipster backend's folder.  See the changes in your JHipster app.
- `web.rest.AuthInfoResource`
  - Adds an API endpoint returning OAuth2 issuer information
- `config.ResourceServerConfiguration.java` 
  - Handles authentication with a Bearer token instead of a cookie
   
   
### Choose a URL Scheme
The value of the URL scheme is up to the app developer, but needs to be consistent throughout the app.  A sample generated URL scheme value is pre-configured in 
`Config/AppConfig.js`,  matching your app's name.  For purposes of this documentation, we are using `oidc-example` as the URL scheme.


#### Keycloak + Okta Configuration
Add the URL scheme from above as a valid redirect URI, followed by the word "authorize".  For example, if your URL scheme is `oidc-example` then the redirect URI
 should look like `oidc-example://authorize`

#### Android URL Scheme Setup
Where `oidc-example` is your chosen URL scheme, add the following to your app's `android/app/src/main/AndroidManifest.xml` file:
```xml
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="oidc-example" />
        </intent-filter>
```

Set the `launchMode` of `MainActivity` to `singleTask` in `AndroidManifest.xml`

```xml
    <activity
      android:name=".MainActivity"
      android:launchMode="singleTask"
      ...
```

#### iOS URL Scheme Setup
Configure Linking for the iOS platform by adding the following lines to your app's iOS `AppDelegate.m` file:

```c
#import <React/RCTLinkingManager.h>
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```
Then configure your iOS url scheme on the `Project` -> `Info` -> `URL Types` section like in the screenshot below:

![35599933-434fa4a8-05f9-11e8-8474-017d96ba5b10](https://user-images.githubusercontent.com/4294623/35661218-b5d2694e-06de-11e8-8cbb-bab63213f790.png)
