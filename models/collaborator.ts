import { Schema, model, Document } from 'mongoose';

interface ICollaborator extends Document {
    nombreCompleto: string;
    correo: string;
    telefono: string;
}

const CollaboratorSchema = new Schema<ICollaborator>({
    nombreCompleto: {
        type: String,
        required: true,
        trim: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const Collaborator = model<ICollaborator>('Collaborator', CollaboratorSchema);

export default Collaborator;
