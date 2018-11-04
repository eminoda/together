const debug = require('debug')('upload');
const formidable = require('formidable');
const util = require('../util');

module.exports = async (ctx, next) => {
    debug('start');
    if (ctx.path == '/upload') {
        let tempUploadDir = await new Promise(function (resolve, reject) {
            var form = new formidable.IncomingForm();
            form.parse(ctx.req, function (err, fields, files) {
                if (files && files.pic) {
                    util.tempSaveFile(files.pic).then(data => {
                        resolve(data);
                    }).catch(err => {
                        reject(err);
                    })
                } else {
                    reject('incorrect upload form');
                }
            });
        })
        ctx.state.tempUploadDir = tempUploadDir;
    }
    await next();
    debug('end');
}