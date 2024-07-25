import express, { Application } from 'express';
import productRoutes from '../routes/productRoutes';
import saleRoutes from '../routes/saleRoutes';
import fileUploadRoutes from '../routes/fileUploadRoutes';
import collaboratorRoutes from '../routes/collaboratorRoutes';
import inventoryRoutes from '../routes/inventoryRoutes';
import whatsappRoutes from '../routes/whatsappRoutes';
import authRoutes from '../routes/authRoutes';
import connectDataBase from '../database/mongooseConfig';
import cors from 'cors';


class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        productos: '/api/products',
        ventas: '/api/sales',
        uploads: '/api/uploads',
        colaboradores: '/api/collaborators',
        inventario: '/api/inventory',
        whatsapp: '/api/whatsapp',
        auth: '/api/auth'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '2210'

        this.initializeDataBase();
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use(this.apiPaths.productos, productRoutes);
        this.app.use(this.apiPaths.ventas, saleRoutes);
        this.app.use(this.apiPaths.uploads, fileUploadRoutes);
        this.app.use(this.apiPaths.colaboradores, collaboratorRoutes);
        this.app.use(this.apiPaths.inventario, inventoryRoutes);
        this.app.use(this.apiPaths.whatsapp, whatsappRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async initializeDataBase() {
        await connectDataBase();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export default Server;