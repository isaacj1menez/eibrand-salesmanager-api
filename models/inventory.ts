// models/Inventory.ts
import { Schema, model, Document } from 'mongoose';

interface IInventory extends Document {
    nombre: string;
    color?: string;
    talla?: string;
    stock: number;
    categoria: string
}

const InventorySchema = new Schema<IInventory>({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },
    talla: {
        type: String,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    categoria: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

const Inventory = model<IInventory>('Inventory', InventorySchema);
export default Inventory;
