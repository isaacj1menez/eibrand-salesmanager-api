import { Router } from 'express';
import { sendWhatsAppMessage, sendWhatsAppMessageGuide } from '../controllers//whatsappController';

const router = Router();

router.post('/send', sendWhatsAppMessage);
router.post('/guide', sendWhatsAppMessageGuide);

export default router;
