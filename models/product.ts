import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
    nombre: string;
    precio: number;
    categoriaBase: string;
    categoria: string;
    imagen?: string;
    codigo?: string;
    descripcion?: string;
}

const ProductSchema = new Schema<IProduct>({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
    },
    categoriaBase: {
        type: String,
        required: true,
        trim: true,
    },
    categoria: {
        type: String,
        required: true,
        trim: true,
    },
    imagen: {
        type: String,
        trim: true,
    },
    codigo: {
        type: String,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});

const Product = model<IProduct>('Product', ProductSchema);

export default Product;
