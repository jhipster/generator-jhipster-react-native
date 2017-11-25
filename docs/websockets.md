## Websockets

A websockets example is present under the "Chat" menu item in the DrawerContent.  To enable this in your JHipster backend, make the following changes.

    src/main/config/WebsocketConfiguration.java
    -registry.addEndpoint("/websocket/tracker")
    +registry.addEndpoint("/websocket/tracker", "/websocket/chat")

The default JHipster websockets configuration requires users to authenticate before connecting.

For a more advanced websockets example, see the JhiTrackerComponent.ts and TrackerService.java in the generated JHipster webapp.
