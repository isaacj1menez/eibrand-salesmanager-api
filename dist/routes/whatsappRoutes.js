"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const whatsappController_1 = require("../controllers//whatsappController");
const router = (0, express_1.Router)();
router.post('/send', whatsappController_1.sendWhatsAppMessage);
router.post('/guide', whatsappController_1.sendWhatsAppMessageGuide);
exports.default = router;
//# sourceMappingURL=whatsappRoutes.js.map