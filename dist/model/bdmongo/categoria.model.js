"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categoriaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        unique: true,
        require: [true, 'El nombre de la categoria es necesasrio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    fechaCreacion: {
        type: Date,
        default: (0, mongoose_1.now)()
    }
});
//esto lo hacemos para extraer la "_v y _id de mongo de la respuesta"
categoriaSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password, _id } = _a, categoria = __rest(_a, ["__v", "password", "_id"]);
    categoria.id = _id;
    return categoria;
};
exports.default = (0, mongoose_1.model)('Categoria', categoriaSchema);
//# sourceMappingURL=categoria.model.js.map