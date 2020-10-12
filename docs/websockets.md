## Websockets

A websockets example is present under the "Chat" menu item in the DrawerContent. To enable this in your JHipster backend, Ignite JHipster made the following changes to your JHipster app's WebsocketConfiguration.java:

```text
src/main/java/.../config/WebsocketConfiguration.java
-registry.addEndpoint("/websocket/tracker")
+registry.addEndpoint("/websocket/tracker", "/websocket/chat")
```

The default JHipster websockets configuration requires users to authenticate before connecting.

For a more advanced websockets example, see the [tracker.service.ts][1] and [ActivityService.java][2] in the generated JHipster webapp.

[1]: https://github.com/jhipster/jhipster-sample-app-websocket/blob/main/src/main/webapp/app/core/tracker/tracker.service.ts
[2]: https://github.com/jhipster/jhipster-sample-app-websocket/blob/main/src/main/java/io/github/jhipster/sample/web/websocket/ActivityService.java
