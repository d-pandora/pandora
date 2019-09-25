#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
require("./fragement");
require("./init");
function help() {
    commander_1.default.parse(process.argv);
    if (commander_1.default.args.length < 1 || typeof commander_1.default.args[0] === 'string') {
        return commander_1.default.help();
    }
}
help();
