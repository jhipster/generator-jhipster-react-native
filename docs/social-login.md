## Social Login (ALPHA Instructions)

There are several steps needed to enable social login in an Ignite JHipster project.  First of all, 
this guide expects your JHipster backend to already be configured with the Social Login option (chosen 
during generation).

In your JHipster backend:

- pom.xml    
  
  
    # specific version and repository due to spring-social-facebook bug
    <repositories>
        <repository>
            <id>alfresco-public</id>
            <url>https://artifacts.alfresco.com/nexus/content/groups/public</url>
        </repository>
    </repositories>
        
     ...
     
    <dependency>
        <groupId>org.springframework.social</groupId>
        <artifactId>spring-social-facebook</artifactId>
        <version>3.0.0.M1</version>
    </dependency>

- Replace your `web.rest.SocialController` with [this gist](https://gist.github.com/ruddell/4d003c7d8035268d34b8e842a338c979)
  - The main difference is the addition of a method for creating a social connection from a token.
  
In your React Native application:

- [Configure react-native-oauth](https://github.com/fullstackreact/react-native-oauth)
  - **Important**: This will not work if you do not complete all the steps.
  - This guide describes how to obtain the correct keys for each social network, how to set up 
  linking so your app receives the responses, and other required manual changes.
    
- Configure your social client IDs and secrets in SocialConfig.js


    // you can also store these in your Info.plist (iOS) for more security
    this.manager.configure({
      twitter: {
        consumer_key: '2v2sd1ldN2CsxdSdfRyFJB9Ek',
        consumer_secret: 'dIffNnLRsi1BQ9ahYdJHIPSTER0tN67JGzEDSR1lwyh76tW9o0GTssv0'
      },
      facebook: {
        client_id: '1104619382567621',
        client_secret: 'f261aa20310afasdbbb42b8da1733b53b'
      },
      google: {
        callback_url: `com.googleusercontent.apps.227777777779-hddmrjhipsterfanhere5tt:/oauth-response/google`,
        client_id: '227777777779-hddmrjhipsterfanhere5tt.apps.googleusercontent.com'
      }
    })
    
### Differences from the Webapp

The user authenticates with the social network, then sends the token to your JHipster backend.  From
there, a SocialConnection is created and saved in the database, enabling authentication across all devices.
