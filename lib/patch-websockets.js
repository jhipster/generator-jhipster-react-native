const fs = require('fs-extra');

function patchWebsockets() {
    if (this.websocket) {
        const websocketConfigPath = `${this.directoryPath}/src/main/java/${this.context.packageFolder}/config/WebsocketConfiguration.java`;
        if (fs.existsSync(websocketConfigPath)) {
            this.patchInFile(websocketConfigPath, {
                replace: '"/websocket/tracker"',
                insert: '"/websocket/tracker", "/websocket/chat"',
            });
        } else {
            this.warning(`Couldn't find WebsocketConfiguration.java at ${websocketConfigPath}`);
        }
    }
}
module.exports = {
    patchWebsockets,
};
