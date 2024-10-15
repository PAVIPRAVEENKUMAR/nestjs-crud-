"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ItemSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    qty: Number,
    description: String,
});
//# sourceMappingURL=items.schema.js.map