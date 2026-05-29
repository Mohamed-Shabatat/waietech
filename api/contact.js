export default async function handler(req, res) {
    // 1. حظر أي طلبات غير مدعومة (نقبل فقط POST)
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    try {
        // 2. تفكيك البيانات القادمة من الـ Frontend
        const { ticketId, name, email, phone, subject, message, lang, platform, date, time } = req.body;

        // 3. جلب الـ IP الخاص بالمرسل تلقائياً من الـ Headers لأمان السيبراني
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || "Unknown";

        // 4. صياغة نص الرسالة الاحترافي كـ Plain Text بحسب لغة الموقع المرسل منها
        const isArabic = lang === "ar";
        
        const telegramText = isArabic 
? `📩 تذكرة جديدة - موقع WaieTech
----------------------------------
🆔 رقم التذكرة: ${ticketId}
👤 الاسم: ${name}
📧 البريد: ${email}
📞 الهاتف: ${phone}
📝 الموضوع: ${subject}

💬 الرسالة:
${message}

----------------------------------
🌐 لغة الموقع: العربية
💻 المنصة: ${platform}
🕒 التاريخ: ${date}
⏰ الوقت: ${time}
🛡️ عنوان الـ IP: ${ip}
🔗 الصفحة: Contact Page`
: `📩 New Ticket - WaieTech Website
----------------------------------
🆔 Ticket ID: ${ticketId}
👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
📝 Subject: ${subject}

💬 Message:
${message}

----------------------------------
🌐 Site Language: English
💻 Platform: ${platform}
🕒 Date: ${date}
⏰ Time: ${time}
🛡️ IP Address: ${ip}
🔗 Page: Contact Page`;

        // 5. جلب متغيرات البيئة السرية والمحمية من إعدادات Vercel
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        // التحقق من وجود المتغيرات حتى لا يتوقف السيرفر
        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.error("Missing Telegram Environment Variables");
            return res.status(500).json({ success: false, message: "Server configuration error" });
        }

        // 6. إرسال الطلب الصريح إلى سيرفرات تيليجرام الآمنة
        const telegramURL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const telegramResponse = await fetch(telegramURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramText,
            }),
        });

        // 7. التحقق من نجاح الإرسال إلى تيليجرام
        if (telegramResponse.ok) {
            return res.status(200).json({ success: true });
        } else {
            const errData = await telegramResponse.json();
            console.error("Telegram API Error:", errData);
            return res.status(500).json({ success: false, message: "Failed to send to Telegram" });
        }

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}