document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".waie-contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // منع الصفحة من إعادة التحميل الافتراضية

            // 1. تحديد لغة الموقع الحالية
            const lang = document.documentElement.lang || "ar";

            // 2. جلب القيم من حقول الإدخال بدقة بحسب الـ IDs الحالية
            const name = document.getElementById("form_name")?.value || "";
            const email = document.getElementById("form_email")?.value || "";
            const phone = document.getElementById("form_phone")?.value || "غير محدد (Not Specified)";
            const message = document.getElementById("form_message")?.value || "";
            
            // 3. جلب النص الظاهري الحالي المختار للموضوع من القائمة المنسدلة
            const selectedDiv = document.getElementById("dropdown-selected");
            const subject = selectedDiv ? selectedDiv.textContent.trim() : "";

            // 4. فحص المنصة ونوع الجهاز (هاتف أم حاسوب)
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const platform = isMobile ? (window.innerWidth <= 768 ? "Mobile" : "Tablet") : "Desktop";
            const platformText = lang === "ar" 
                ? (platform === "Mobile" ? "هاتف (Mobile)" : platform === "Tablet" ? "تابلت (Tablet)" : "حاسوب (Desktop)")
                : platform;

            // 5. توليد التاريخ والوقت ورقم التذكرة الزمني الفريد (WT-YYMMDD-HHMMSS)
            const now = new Date();
            const year = now.getFullYear().toString().slice(-2);
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const dateStr = `${now.getFullYear()}-${month}-${day}`;
            const timeStr = now.toLocaleTimeString(lang === "ar" ? "ar-EG" : "en-US", { hour: '2-digit', minute: '2-digit' });
            
            // صناعة رقم التذكرة الذكي
            const ticketId = `WT-${year}${month}${day}-${hours}${minutes}${seconds}`;

            // 6. إرسال حزمة البيانات النظيفة إلى السيرفر الصامت (Vercel API)
            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ticketId,
                        name,
                        email,
                        phone,
                        subject,
                        message,
                        lang,
                        platform: platformText,
                        date: dateStr,
                        time: timeStr
                    }),
                });

                const result = await response.json();

                if (result.success) {
                    // إشعار النجاح التفاعلي بحسب لغة التصفح
                    alert(lang === "ar" ? "تم إرسال رسالتك بنجاح!" : "Your message has been sent successfully!");
                    
                    // إعادة تهيئة الحقول وتفريغها بعد النجاح
                    contactForm.reset();
                    
                    // إعادة القائمة المنسدلة والعداد لشكلهم الافتراضي
                    if (selectedDiv) {
                        selectedDiv.textContent = lang === "ar" ? "اختر موضوع الرسالة..." : "Choose a subject...";
                        selectedDiv.style.color = "#4a5568";
                    }
                    const counter = document.getElementById("message-counter");
                    if (counter) counter.textContent = "0 / 300";
                    
                } else {
                    alert(lang === "ar" ? "عذراً، حدث خطأ أثناء الإرسال." : "Sorry, an error occurred while sending.");
                }
            } catch (error) {
                console.error("Error during submission:", error);
                alert(lang === "ar" ? "فشل الاتصال بالسيرفر الصامت!" : "Failed to connect to the server!");
            }
        });
    }
});