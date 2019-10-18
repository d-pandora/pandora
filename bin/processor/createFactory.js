"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var ncp_1 = require("ncp");
var path_1 = __importDefault(require("path"));
var colors_1 = __importDefault(require("colors"));
var stream_replace_1 = __importDefault(require("stream-replace"));
function createComponent(templateName, choices, spinning) {
    var type = choices.type, component = choices.component;
    var sourcePath = path_1.default.resolve(__dirname, "../../templates/" + templateName + "/" + type + "/" + component);
    var targetPath = process.cwd() + "/src/view/" + type + "/" + component;
    var tagertContainer = process.cwd() + "/src/view/" + type;
    if (!fs_1.default.existsSync(tagertContainer)) {
        fs_1.default.mkdirSync(tagertContainer);
    }
    spinning.info("copy from " + sourcePath + " to " + targetPath);
    return execNcp(sourcePath, targetPath);
}
function createPage(templateName, choices, spinning) {
    var page = choices.page, type = choices.type, pagedir = choices.pagedir, moduleName = choices.moduleName;
    var sourcePath = path_1.default.resolve(__dirname, "../../templates/" + templateName + "/" + type + "/" + page);
    var targetPath = process.cwd() + "/src/view/" + type;
    var dirs = pagedir.split('/');
    while (dirs.length) {
        var dir = dirs.shift();
        targetPath = targetPath + "/" + dir;
        if (!fs_1.default.existsSync(targetPath)) {
            fs_1.default.mkdirSync(targetPath);
        }
    }
    spinning.info("copy from " + sourcePath + " to " + targetPath);
    return execNcp(sourcePath, targetPath, moduleName);
}
function execNcp(sourcePath, targetPath, moduleName) {
    return new Promise(function (resolve, reject) {
        // if (fs.existsSync(targetPath)) {
        //   resolve({
        //     success: false,
        //     msg: 'file aleardy exits!'
        //   })
        //   return
        // }
        console.log('......moduleName', moduleName);
        ncp_1.ncp(sourcePath, targetPath, {
            transform: function (reader, writer) {
                console.log('......moduleName', moduleName);
                if (moduleName) {
                    console.log('......moduleName', moduleName);
                    var replaceName = sourcePath.slice(sourcePath.lastIndexOf('/') + 1);
                    var UpperReplaceName = replaceName.replace(/^\S/, function (s) { return s.toUpperCase(); });
                    var UpperCaseMoudleName = moduleName.replace(/^\S/, function (s) { return s.toUpperCase(); });
                    var replaceNameReg = new RegExp(replaceName, "g");
                    var UpperReplaceNameReg = new RegExp(UpperReplaceName, "g");
                    console.log('......replaceName', replaceName);
                    reader.pipe(stream_replace_1.default(replaceNameReg, moduleName))
                        .pipe(stream_replace_1.default(UpperReplaceNameReg, UpperCaseMoudleName))
                        .pipe(stream_replace_1.default(/moduleName/g, moduleName))
                        .pipe(stream_replace_1.default(/ModuleName/g, UpperCaseMoudleName))
                        .pipe(writer);
                }
                else {
                    reader.pipe(writer);
                }
            }
        }, function (err) {
            if (err) {
                resolve({
                    success: false,
                    msg: colors_1.default.red("build fail!, " + err),
                });
            }
            resolve({
                success: true,
                msg: colors_1.default.green(moduleName + " created!"),
            });
        });
    });
}
exports.default = {
    createPage: createPage,
    createComponent: createComponent,
};
