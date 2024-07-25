// controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'E1br4Nd.20xx';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error al registrar el usuario', error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error al iniciar sesión', error: error.message });
    }
};

export const verifyToken = (req: Request, res: Response) => {
    const authHeader  = req.headers['authorization'];
    if (!authHeader ) {
        return res.status(401).json({ success: false, message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token malformed' });
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Token inválido' });
        }
        res.json({ success: true, message: 'Token válido', user: decoded });
    });
};
