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
exports.sendWhatsAppMessageGuide = exports.sendWhatsAppMessage = void 0;
const axios_1 = __importDefault(require("axios"));
const whatsapp_token = process.env.WHATSAPP_BEARER_TOKEN;
const phone_id = process.env.PHONE_ID;
const sendWhatsAppMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.post(`https://graph.facebook.com/v19.0/${phone_id}/messages`, data, config);
        res.json({
            success: true,
            message: 'Message sent successfully',
            data: response.data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error sending message',
            error: error.message
        });
    }
});
exports.sendWhatsAppMessage = sendWhatsAppMessage;
const sendWhatsAppMessageGuide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.post(`https://graph.facebook.com/v19.0/${phone_id}/messages`, data, config);
        res.json({
            success: true,
            message: 'Message sent successfully',
            data: response.data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error sending message',
            error: error.message
        });
    }
});
exports.sendWhatsAppMessageGuide = sendWhatsAppMessageGuide;
//# sourceMappingURL=whatsappController.js.map