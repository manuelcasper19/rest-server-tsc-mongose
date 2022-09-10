"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    rol: {
        type: String,
        require: [true, 'Es necesario el rol']
    }
});
exports.default = (0, mongoose_1.model)('Rol', roleSchema);
//# sourceMappingURL=role.js.map