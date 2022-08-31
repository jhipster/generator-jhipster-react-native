## WebSockets

A websockets example is present under "Chat" in the Drawer Menu. JHipster React Native uses the existing `/websocket/tracker` endpoint to connect. It sends and receives chat messages using the `/topic/chat` message mapping.

**Note:** The default JHipster websockets configuration requires users to authenticate before connecting.

For a more advanced websockets example, see the [tracker.service.ts][1] and [ActivityService.java][2] in the generated JHipster webapp.

[1]: https://github.com/jhipster/jhipster-sample-app-websocket/blob/main/src/main/webapp/app/core/tracker/tracker.service.ts
[2]: https://github.com/jhipster/jhipster-sample-app-websocket/blob/main/src/main/java/io/github/jhipster/sample/web/websocket/ActivityService.java
