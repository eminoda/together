const logger = require('./logger')('util');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = {
    tempSaveFile: (file) => {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(file.path, function (err, data) {
                    if (err) {
                        logger.error(err);
                        reject(err);
                        return;
                    }
                    if (!fs.existsSync(process.env.UPLOAD_DIR)) {
                        mkdirp.sync(process.env.UPLOAD_DIR)
                    }
                    let tempUploadDir = path.resolve(process.env.UPLOAD_DIR, file.name);
                    fs.writeFile(tempUploadDir, data, function (err) {
                        if (err) {
                            logger.error(err);
                            reject(err);
                            return;
                        }
                        resolve(tempUploadDir);
                    })
                });
            } catch (err) {
                logger.error(err);
                reject(err);
            }
        })
    },
    getTempFileStream: (tempUploadDir) => {
        try {
            return fs.createReadStream(tempUploadDir);
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }
}