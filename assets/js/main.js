// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {

    // أولاً: زرع كود الـ HTML الخاص باللودر تلقائياً في بداية الـ body لكل الصفحات
    if (!document.getElementById("cyber-loader")) {
        // 1. قراءة لغة الموقع الحالية المخزنة في المتصفح (الافتراضية هي العربية "ar")
        const currentLang = localStorage.getItem("lang") || "ar";

        // 2. تحديد النص بناءً على اللغة الحالية
        const loadingMessage = currentLang === "ar" 
            ? "جاري تشفير الاتصال والتحميل..." 
            : "Encrypting connection and loading...";

        // 3. بناء كود الـ HTML مع إضافة خاصية data-i18n لضمان المزامنة المستقبلية
        const loaderHTML = `
            <div id="cyber-loader" class="cyber-loader-overlay">
                <div class="loader-content">
                    <div class="spinner"></div>
                    <p class="loader-text" data-i18n="loading_text">${loadingMessage}</p>
                </div>
            </div>
        `;
        
        // إدراج اللودر كأول عنصر داخل الـ body مباشرة ليظهر فوراً
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    }

    // زرع أيقونة الموقع (Favicon) الموحدة تلقائياً في رأس الصفحة
    if (!document.querySelector("link[rel*='icon']")) {
        const favicon = document.createElement('link');
        favicon.rel = 'shortcut icon';
        favicon.href = 'assets/images/icon_waietech.png';
        favicon.type = 'image/x-icon';
        document.head.appendChild(favicon);
    }
    
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navOverlay = document.getElementById("nav-overlay");

    // التأكد من أن العناصر تم حقنها بنجاح في الصفحة قبل إضافة الأحداث
    if (menuToggle && navLinks && navOverlay) {
        
        // فتح وإغلاق القائمة
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            navOverlay.classList.toggle("active");
            
            // تغيير شكل الأيقونة من قضبان (bars) إلى إكس (times) عند الفتح
            const icon = menuToggle.querySelector("i");
            if (navLinks.classList.contains("open")) {
                icon.className = "fas fa-times";
            } else {
                icon.className = "fas fa-bars";
            }
        });

        // إغلاق القائمة عند الضغط على الخلفية المعتمة
        navOverlay.addEventListener("click", () => {
            navLinks.classList.remove("open");
            navOverlay.classList.remove("active");
            menuToggle.querySelector("i").className = "fas fa-bars";
        });

        // إغلاق القائمة تلقائياً عند الضغط على أي رابط (مفيد في الشاشات الصغيرة)
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                navOverlay.classList.remove("active");
                menuToggle.querySelector("i").className = "fas fa-bars";
            });
        });
    }

    // إدارة شاشة اللودر للتنقل الداخلي والحفظ
    
    // فحص الرابط فوراً قبل أي شيء
    const urlParams = new URLSearchParams(window.location.search);
    const disableLoader = urlParams.get('loader') === 'off';

    // إذا كان الرابط يحتوي على ?loader=off، نقوم بحذف اللودر من الـ DOM فوراً قبل أن يراه المستخدم
    if (disableLoader) {
        const quickLoader = document.getElementById("cyber-loader");
        if (quickLoader) {
            quickLoader.remove(); // حظر وحذف نهائي من جذوره
        }
    }

    // معالجة اللودر في حالة التنقل الداخلي الطبيعي
    window.addEventListener("load", () => {
        // إذا لم يكن اللودر محذوفاً (أي في حالة التنقل الداخلي)
        if (!disableLoader) {
            const loader = document.getElementById("cyber-loader");
            if (loader) {
                const extraDelay = 1000; 
                setTimeout(() => {
                    loader.classList.add("fade-out");
                    setTimeout(() => {
                        loader.style.display = "none";
                    }, 500);
                }, extraDelay);
            }
        }
    });

    // 2️⃣ أنميشن تصاعد الأعداد التفاعلي لقسم Our Impact
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const startCounting = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-target'), 10);
                    let currentCount = 0;
                    
                    const duration = 2000; 
                    
                    let calculatedStep = Math.floor(duration / countTo);
                    let stepTime = calculatedStep < 15 ? 15 : calculatedStep;
                    
                    const counter = setInterval(() => {
                        currentCount += Math.ceil(countTo / 100); 
                        if (currentCount >= countTo) {
                            target.innerText = `+${countTo}`;
                            clearInterval(counter);
                        } else {
                            target.innerText = `+${currentCount}`;
                        }
                    }, stepTime);
                    
                    observer.unobserve(target); 
                }
            });
        };

        // التعديل هنا فقط: جعلها كلمة واحدة بدون مسافة
        const observer = new IntersectionObserver(startCounting, { threshold: 0.5 });
        stats.forEach(stat => observer.observe(stat));
    }



    //form

    const contactForm = document.querySelector(".waie-contact-form");
    const submitBtn = document.querySelector(".btn-submit-contact");
    
    const subjectInput = document.getElementById("form_subject");
    const subjectCounter = document.getElementById("subject-counter");
    const maxSubject = 50;

    const messageInput = document.getElementById("form_message");
    const messageCounter = document.getElementById("message-counter");
    const maxMessage = 500;

    // دالة التحقق والقص الفوري للحماية
    function validateAndCount(input, counter, maxLength) {
        if (!input || !counter) return true;

        // الحماية الجوهرية: إذا تم حذف maxlength من الـ HTML، الـ JS سيقوم بقص النص فوراً
        if (input.value.length > maxLength) {
            input.value = input.value.substring(0, maxLength);
        }

        const currentLength = input.value.length;
        counter.textContent = `${currentLength} / ${maxLength}`;

        if (currentLength >= maxLength) {
            counter.style.color = "#e53e3e"; // تنبيه أحمر
            return true;
        } else {
            counter.style.color = "#718096";
            return false;
        }
    }

    // مراقبة حقل الموضوع أثناء الكتابة
    if (subjectInput) {
        subjectInput.addEventListener("input", () => {
            validateAndCount(subjectInput, subjectCounter, maxSubject);
        });
    }

    // مراقبة حقل النص أثناء الكتابة
    if (messageInput) {
        messageInput.addEventListener("input", () => {
            validateAndCount(messageInput, messageCounter, maxMessage);
        });
    }

    // الفحص الأمني النهائي عند محاولة الإرسال (حظر التلاعب بالـ F12)
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            const isSubjectOver = subjectInput && subjectInput.value.length > maxSubject;
            const isMessageOver = messageInput && messageInput.value.length > maxMessage;

            if (isSubjectOver || isMessageOver) {
                e.preventDefault(); // إلغاء عملية الإرسال فوراً وحظرها
                alert("تنبيه أمني: تم تجاوز الحد المسموح به من الحروف برمجياً!");
                return false;
            }
        });
    }
    
});