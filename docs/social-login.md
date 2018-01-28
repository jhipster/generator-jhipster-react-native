## Social Login

There are several steps needed to enable social login in an Ignite JHipster project.  First of all, 
this guide expects your JHipster backend to already be configured with the Social Login option (chosen 
during generation).

### In your JHipster backend

- Set a custom repository and version for spring-social-facebook due to a bug in API versions v2.8+  
  - In your pom.xml:
```
    <!-- specific version and repository due to spring-social-facebook bug -->
    <repositories>
        <repository> 
            <id>repository.spring.milestone</id> 
            <name>Spring Milestone Repository</name> 
            <url>http://repo.spring.io/milestone</url> 
        </repository>
    </repositories>
        
     ...
     
    <dependency>
        <groupId>org.springframework.social</groupId>
        <artifactId>spring-social-facebook</artifactId>
        <version>3.0.0.M1</version>
    </dependency>
```

Ignite JHipster updated several of JHipster's social login files.  See the changes in your JHipster app.
- `web.rest.SocialController`
  - Adds call to new SocialService method
- `service.SocialService` 
  - Adds method for registering/authenticating via social auth token
- `SocialServiceIntTest`
  - Imports new SocialService dependencies
   
### In your React Native application

- Configure Linking where necessary according to the ([React Native docs](https://facebook.github.io/react-native/docs/linking.html))
- Configure [react-native-simple-auth](https://github.com/adamjmcgrath/react-native-simple-auth#providers-setup)
  - This guide describes how to obtain the correct keys for each social network and how to set up 
  linking so your app receives the redirection from the browser.  
- Configure your social client IDs and secrets in App/Config/AppConfig.js

```
  social: {
    google: {
      appId: '227777777779-hddmrjhipsterfanhere5tt.apps.googleusercontent.com',
      callback: 'com.googleusercontent.apps.227777777779-hddmrjhipsterfanhere5tt:/oauth2redirect'
    },
    facebook: {
      appId: '1104619382567621',
      callback: 'fb1104619382567621://authorize'
    },
    twitter: {
      appId: '2v2sd1ldN2CsxdSdfRyFJB9Ek',
      appSecret: 'dIffNnLRsi1BQ9ahYdJHIPSTER0tN67JGzEDSR1lwyh76tW9o0GTssv0',
      callback: 'ignitesocial://authorize'
    }
  }
```

For iOS, your Xcode URL Types should look like:

![screen shot 2018-01-13 at 3 28 15 pm](https://user-images.githubusercontent.com/4294623/34909819-9756247c-f876-11e7-8a1f-c9a923119406.png)

### Differences from the JHipster Angular Frontend

The user authenticates directly with the social network, then sends their access token to your JHipster backend.  From
there, a SocialConnection is created and saved in the database, enabling authentication to the same account across all devices.
