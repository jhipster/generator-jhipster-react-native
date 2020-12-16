const fs = require('fs');

function patchDetox() {
    if (this.detox) {
        fs.chmodSync('e2e/download-expo.sh', '755');
    }
}
module.exports = {
    patchDetox,
};
