#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var inquirer_1 = __importDefault(require("inquirer"));
var ora_1 = __importDefault(require("ora"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var createFactory_1 = __importDefault(require("./processor/createFactory"));
commander_1.default.command('create')
    .option('-c, --create', 'create a new component')
    .description('create a new component')
    .alias('c')
    .action(function (option) { return __awaiter(void 0, void 0, void 0, function () {
    function inquire() {
        return __awaiter(this, void 0, void 0, function () {
            function handleSuccess(msg) {
                spinning.succeed(msg);
                process.exit();
            }
            function handleFailed(msg) {
                spinning.fail(msg);
                process.exit();
            }
            var choices, spinning, processor, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer_1.default.prompt(promps)];
                    case 1:
                        choices = _a.sent();
                        spinning = ora_1.default('start creating...');
                        processor = createFactory_1.default.createComponent;
                        switch (choices.type) {
                            case 'components':
                                processor = createFactory_1.default.createComponent;
                                break;
                            case 'pages':
                                processor = createFactory_1.default.createPage;
                        }
                        spinning.start();
                        return [4 /*yield*/, processor(config.templateName, choices, spinning)];
                    case 2:
                        result = _a.sent();
                        if (result.success) {
                            handleSuccess(result.msg);
                        }
                        else {
                            handleFailed(result.msg);
                        }
                        spinning.stop();
                        return [2 /*return*/];
                }
            });
        });
    }
    var cwd, config, componentsPath, components, pagesPath, pages, promps;
    return __generator(this, function (_a) {
        cwd = process.cwd();
        if (!fs_1.default.existsSync(cwd + "/package.json")) {
            console.log('.....请在项目根目录下进行操作');
            return [2 /*return*/];
        }
        config = require(cwd + "/package.json");
        componentsPath = path_1.default.resolve(__dirname, "../templates/" + config.templateName + "/components");
        components = fs_1.default.readdirSync("" + componentsPath);
        pagesPath = path_1.default.resolve(__dirname, "../templates/" + config.templateName + "/pages");
        pages = fs_1.default.readdirSync("" + pagesPath);
        promps = [
            {
                type: 'list',
                name: 'type',
                message: 'please selet the copy files type page or component?',
                choices: ['pages', 'components'],
            },
            {
                type: 'list',
                name: 'component',
                message: 'please selet a component?',
                choices: components,
                when: function (answers) {
                    return answers.type === 'components';
                }
            },
            {
                type: 'list',
                name: 'page',
                message: 'please selet a page?',
                choices: pages,
                when: function (answers) {
                    return answers.type === 'pages';
                }
            },
            {
                type: 'input',
                name: 'pagedir',
                message: 'please input you page dirname exmaple：user/list?',
                when: function (answers) {
                    return answers.type === 'pages';
                }
            },
            {
                type: 'input',
                name: 'moduleName',
                message: 'please input you page export module name：userList?',
                when: function (answers) {
                    return answers.type === 'pages';
                }
            },
            {
                type: 'list',
                name: 'routes',
                message: 'link page to routes?',
                choices: ['Yes', 'No'],
                when: function (answers) {
                    return pages.indexOf(answers.type) > -1;
                }
            },
        ];
        inquire();
        return [2 /*return*/];
    });
}); });
