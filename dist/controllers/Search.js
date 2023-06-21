"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Search_1 = __importDefault(require("../services/Search"));
const search = (req, res) => {
    Search_1.default.search(req, res);
};
exports.default = { search };
//# sourceMappingURL=Search.js.map