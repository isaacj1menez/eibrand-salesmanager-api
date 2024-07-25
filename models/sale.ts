import { Schema, model, Document } from 'mongoose';

interface ISale extends Document {
    fecha: Date;
    fechaEntrega: Date;
    total: number;
    anticipo?: number;
    restante: number;
    metodoPago: string;
    status: string;
    descuento?: number;
    envio?: number;
    cargoDisenos?: number;
    impuestos?: number;
    statusPago: string;
    cliente: {
        nombre: string;
        telefono: string;
        canalComunicacion: string;
        direccion: {
            direccion: string;
            codigoPostal: string;
            estado: string;
        };
    };
    productos: Array<{
        id: string
        nombre: string;
        cantidad: number;
        precio: number;
        subtotal: number;
        diseno?: string;
        inventario?: Schema.Types.ObjectId;
        categoria?: string;
    }>;
    imagenComprobante?: string;
    observaciones?: string;
    guiaEnvio?: string;
    puntoEntrega?: string;
    urgente: boolean;
    vendedor: string;
    resultado?: string;
}

const SaleSchema = new Schema<ISale>({
    fecha: {
        type: Date,
        required: true,
    },
    fechaEntrega: {
        type: Date,
        required: true,
    },
    total: {
        type: Number,
        required: true,
        min: 0,
    },
    anticipo: {
        type: Number,
        min: 0,
    },
    restante: {
        type: Number,
        required: true,
        min: 0,
    },
    metodoPago: {
        type: String,
        required: true,
        trim: true,
        enum: ['EFECTIVO', 'TRANSFERENCIA', 'DEPÓSITO'],
    },
    status: {
        type: String,
        required: true,
        trim: true,
        enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA', 'ENVIADA'],
    },
    descuento: {
        type: Number,
        min: 0,
    },
    envio: {
        type: Number,
        min: 0,
    },
    cargoDisenos: {
        type: Number,
        min: 0,
    },
    impuestos: {
        type: Number,
        min: 0,
    },
    statusPago: {
        type: String,
        required: true,
        trim: true,
        enum: ['PENDIENTE', 'PAGADO', 'ANTICIPO'],
    },
    cliente: {
        nombre: { type: String, required: true, trim: true },
        telefono: { type: String, required: true, trim: true },
        canalComunicacion: {
            type: String,
            required: true,
            trim: true,
            enum: ['INSTAGRAM', 'FACEBOOK', 'GOOGLE', 'WHATSAPP', 'PERSONAL'],
        },
        direccion: {
            direccion: { type: String, trim: true },
            codigoPostal: { type: String, trim: true },
            estado: { type: String, trim: true },
        },
    },
    productos: [
        {
            id: { type: String },
            nombre: { type: String, required: true, trim: true },
            cantidad: { type: Number, required: true, min: 1 },
            precio: { type: Number, required: true, min: 0 },
            subtotal: { type: Number, required: true, min: 0 },
            diseno: { type: String, trim: true },
            inventario: { type: Schema.Types.ObjectId },
            categoria: { type: String }
        },
    ],
    imagenComprobante: { type: String, trim: true },
    observaciones: { type: String, trim: true },
    guiaEnvio: { type: String, trim: true },
    puntoEntrega: { type: String, trim: true },
    urgente: { type: Boolean, default: false },
    vendedor: { type: String, required: true },
    resultado: { type: String },
}, { timestamps: true });

const Sale = model<ISale>('Sale', SaleSchema);

export default Sale;
