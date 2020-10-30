const fs = require('fs-extra');
const { patchInFile } = require('./patch-in-file');

function patchWebsockets() {
    if (this.websocket) {
        const websocketConfigPath = `${this.directoryPath}/src/main/java/${this.packageFolder}/config/WebsocketConfiguration.java`;
        if (fs.existsSync(websocketConfigPath)) {
            patchInFile(websocketConfigPath, {
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
