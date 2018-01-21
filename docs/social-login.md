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
- Replace your `web.rest.SocialController` depending on your auth: [JWT](https://gist.github.com/ruddell/7e08d937337a245301ae9806c1be7d9e) or [Session](https://gist.github.com/ruddell/b8fa6e203e5baab577780da02cb04381)
  - Add call to new SocialService method
- Replace your `service.SocialService` depending on your auth: [JWT](https://gist.github.com/ruddell/380f5c4de45a0069e746b1e22f2a963d) or [Session](https://gist.github.com/ruddell/fba150a0acc8d7ab5aed287b2f883d91)
  - Add method for registering/authenticating via social auth token
- Replace your `SocialServiceIntTest` depending on your auth: [JWT](https://gist.github.com/ruddell/4c92e33edddc76d756488c27c4dba567) or [Session](https://gist.github.com/ruddell/2f04af2ba6a8ea9af94da751e69f9ee8)
  - Import new SocialService dependencies
   
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
there, a SocialConnection is created and saved in the database, enabling authentication across all devices.
