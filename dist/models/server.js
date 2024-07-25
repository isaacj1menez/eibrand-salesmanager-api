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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoutes_1 = __importDefault(require("../routes/productRoutes"));
const saleRoutes_1 = __importDefault(require("../routes/saleRoutes"));
const fileUploadRoutes_1 = __importDefault(require("../routes/fileUploadRoutes"));
const collaboratorRoutes_1 = __importDefault(require("../routes/collaboratorRoutes"));
const inventoryRoutes_1 = __importDefault(require("../routes/inventoryRoutes"));
const whatsappRoutes_1 = __importDefault(require("../routes/whatsappRoutes"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const mongooseConfig_1 = __importDefault(require("../database/mongooseConfig"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.apiPaths = {
            productos: '/api/products',
            ventas: '/api/sales',
            uploads: '/api/uploads',
            colaboradores: '/api/collaborators',
            inventario: '/api/inventory',
            whatsapp: '/api/whatsapp',
            auth: '/api/auth'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '2210';
        this.initializeDataBase();
        this.middlewares();
        this.routes();
    }
    routes() {
        this.app.use(this.apiPaths.productos, productRoutes_1.default);
        this.app.use(this.apiPaths.ventas, saleRoutes_1.default);
        this.app.use(this.apiPaths.uploads, fileUploadRoutes_1.default);
        this.app.use(this.apiPaths.colaboradores, collaboratorRoutes_1.default);
        this.app.use(this.apiPaths.inventario, inventoryRoutes_1.default);
        this.app.use(this.apiPaths.whatsapp, whatsappRoutes_1.default);
        this.app.use(this.apiPaths.auth, authRoutes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    initializeDataBase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, mongooseConfig_1.default)();
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map