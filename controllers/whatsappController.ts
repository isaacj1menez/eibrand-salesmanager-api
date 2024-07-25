import { Request, Response } from 'express';
import axios from 'axios';

const whatsapp_token = process.env.WHATSAPP_BEARER_TOKEN;
const phone_id = process.env.PHONE_ID;

export const sendWhatsAppMessage = async (req: Request, res: Response) => {
    const { to, templateName, client, order } = req.body;

    const data = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'template',
        template: {
            name: templateName,
            language: {
                code: 'es'
            },
            components: [
                {
                    type: "body",
                    parameters: [
                        {
                            type: "text",
                            text: client
                        }
                    ]
                },
                {
                    type: "button",
                    sub_type: "url",
                    index: 0,
                    parameters: [
                        {
                            type: "text",
                            text: order
                        }
                    ]
                }
            ]
        }
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + whatsapp_token
        }
    };

    try {
        const response = await axios.post(`https://graph.facebook.com/v19.0/${phone_id}/messages`, data, config);
        res.json({
            success: true,
            message: 'Message sent successfully',
            data: response.data
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error sending message',
            error: error.message
        });
    }
};

export const sendWhatsAppMessageGuide = async (req: Request, res: Response) => {
    const { to, templateName, client, guide } = req.body;

    const data = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'template',
        template: {
            name: templateName,
            language: {
                code: 'es'
            },
            components: [
                {
                    type: "body",
                    parameters: [
                        {
                            type: "text",
                            text: client
                        },
                        {
                            type: "text",
                            text: guide
                        }
                    ]
                }
            ]
        }
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + whatsapp_token
        }
    };

    try {
        const response = await axios.post(`https://graph.facebook.com/v19.0/${phone_id}/messages`, data, config);
        res.json({
            success: true,
            message: 'Message sent successfully',
            data: response.data
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error sending message',
            error: error.message
        });
    }
};

