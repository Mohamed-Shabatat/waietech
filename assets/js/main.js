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

    // عداد حقل نص الرسالة فقط (تم إزالة حقل الموضوع تماماً)
    const messageInput = document.getElementById("form_message");
    const messageCounter = document.getElementById("message-counter");
    const maxMessage = 300;

    if (messageInput && messageCounter) {
        messageInput.addEventListener("input", () => {
            if (messageInput.value.length > maxMessage) {
                messageInput.value = messageInput.value.substring(0, maxMessage);
            }
            const currentLength = messageInput.value.length;
            messageCounter.textContent = `${currentLength} / ${maxMessage}`;
            
            if (currentLength >= maxMessage) {
                messageCounter.style.color = "#e53e3e"; 
            } else {
                messageCounter.style.color = "#718096"; 
            }
        });
    }

    // الفحص الأمني النهائي عند محاولة الإرسال للغتين
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            if (messageInput && messageInput.value.length > maxMessage) {
                e.preventDefault();
                alert("تنبيه أمني: تم تجاوز الحد المسموح به من الحروف!");
                return false;
            }
        });
    }

    //options

    // === كود القائمة المنسدلة المحدث والمحمي من التداخل ===
    const customDropdown = document.querySelector(".custom-dropdown");
    const selectedDiv = document.getElementById("dropdown-selected");
    const optionsList = document.getElementById("dropdown-options");
    const hiddenInput = document.getElementById("form_subject_hidden");

    if (customDropdown && selectedDiv && optionsList) {
        
        // 1. فتح وإغلاق القائمة عند النقر على الحقل الرئيسي
        selectedDiv.addEventListener("click", (e) => {
            e.stopPropagation();
            customDropdown.classList.toggle("active");
        });

        // 2. الاختفاء الفوري الحتمي بمجرد النقر على الخيار
        optionsList.addEventListener("click", function(e) {
            const li = e.target.closest("li");
            
            if (li) {
                e.stopPropagation();
                
                // تحديث البيانات
                selectedDiv.textContent = li.textContent;
                hiddenInput.value = li.getAttribute("data-value");
                selectedDiv.style.color = "#0b1f3a";
                
                // الحل القاطع: إغلاق الكلاس فوراً
                customDropdown.classList.remove("active");
                
                // إجبار الـ CSS على إخفائها فوراً في نفس اللحظة لمنع معالج الترجمة من إظهارها
                optionsList.style.pointerEvents = "none";
                setTimeout(() => {
                    optionsList.style.pointerEvents = "auto";
                }, 100);
            }
        });

        // 3. إغلاق القائمة عند النقر في أي مكان خارجها
        document.addEventListener("click", (e) => {
            if (!customDropdown.contains(e.target)) {
                customDropdown.classList.remove("active");
            }
        });
    }


    // يوضع الكود في نهاية ملف main.js قبل إغلاق حدث DOMContentLoaded

    // [1] معالجة وحقن كرت الصفحة الرئيسية (Home Page)
    const mainFeaturedActivityContainer = document.getElementById("main-featured-activity-container");

    if (mainFeaturedActivityContainer && typeof activitiesData !== 'undefined') {
        const featuredActivity = activitiesData.find(activity => activity.featured === true);
        
        if (featuredActivity) {
            const currentLang = localStorage.getItem("lang") || "ar";
            const locText = featuredActivity.location[currentLang] || featuredActivity.location["ar"];
            
            const homeLangPack = translations[currentLang] || translations["ar"];
            const homeTitle = homeLangPack[featuredActivity.titleKey] || "";
            const homeDesc = homeLangPack[featuredActivity.descKey] || "";
            const homeBadge = homeLangPack[featuredActivity.badgeKey] || "";
            const homeBtnText = homeLangPack["btn_explore_activities"] || "استكشف الأنشطة";
            
            mainFeaturedActivityContainer.outerHTML = `
                <div class="hub-card-item" data-id="${featuredActivity.id}">
                    <div class="hub-card-image">
                        <img src="${featuredActivity.image}" alt="WaieTech Activity">
                        <span class="hub-badge hub-badge-pos" data-i18n="${featuredActivity.badgeKey}">${homeBadge}</span>
                    </div>
                    <div class="hub-card-content">
                        <div class="hub-card-meta">
                            <span><i class="far fa-calendar-alt"></i> ${featuredActivity.date}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${locText}</span>
                        </div>
                        <h3 class="hub-card-title" data-i18n="${featuredActivity.titleKey}">${homeTitle}</h3>
                        <p class="hub-card-excerpt" data-i18n="${featuredActivity.descKey}">${homeDesc}</p>
                        <div class="hub-card-footer">
                            <a href="activities.html" class="btn-hub-link">
                                <span data-i18n="btn_explore_activities">${homeBtnText}</span> 
                                <i class="fas fa-arrow-left arrow-icon"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // [2] معالجة وحقن كروت صفحة الأنشطة والفلترة (Activities Page)
    const activitiesPageGrid = document.getElementById("activities-page-grid");
    const filterButtons = document.querySelectorAll(".filter-tab-btn");

    window.renderActivities = (filterCategory = "all") => {
        if (!activitiesPageGrid || typeof activitiesData === 'undefined') return;

        activitiesPageGrid.innerHTML = ""; 
        const currentLang = localStorage.getItem("lang") || "ar";
        
        const filteredData = filterCategory === "all" 
            ? activitiesData 
            : activitiesData.filter(act => act.category === filterCategory);
            
        // جلب حزمة الترجمة الحالية المحددة للموقع بشكل آمن
        const langPack = translations[currentLang] || translations["ar"];

        if (filteredData.length === 0) {
            const noActivitiesText = langPack["no_activities"] || "لا توجد أنشطة متوفرة في هذا القسم حالياً.";
            activitiesPageGrid.innerHTML = `
                <p style="text-align:center; width:100%; color:var(--text-light); padding:40px; font-family:'Tajawal';" data-i18n="no_activities">${noActivitiesText}</p>`;
            return;
        }

        let cardsHTML = "";

        filteredData.forEach(activity => {
            // استخراج النصوص المترجمة مباشرة من ملف الترجمة قبل حقن الـ HTML
            const badgeText = langPack[activity.badgeKey] || "";
            const titleText = langPack[activity.titleKey] || "";
            const descText = langPack[activity.descKey] || "";
            const btnText = langPack["btn_view_activity_details"] || "عرض التفاصيل";
            const locText = activity.location[currentLang] || activity.location["ar"];

            cardsHTML += `
                <div class="activity-page-card" data-category="${activity.category}">
                    <div class="act-card-image-box">
                        <img src="${activity.image}" alt="WaieTech Activity">
                        <span class="act-card-badge" data-i18n="${activity.badgeKey}">${badgeText}</span>
                    </div>
                    <div class="act-card-info-content">
                        <div class="act-card-top-meta">
                            <span><i class="far fa-calendar-alt"></i> ${activity.date}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${locText}</span>
                        </div>
                        <h3 class="act-card-main-title" data-i18n="${activity.titleKey}">${titleText}</h3>
                        <p class="act-card-main-desc" data-i18n="${activity.descKey}">${descText}</p>
                        <div class="act-card-bottom-footer">
                            <a href="activity-detail.html?id=${activity.id}" class="btn-act-page-link">
                                <span data-i18n="btn_view_activity_details">${btnText}</span> 
                                <i class="fas fa-arrow-left act-arrow-icon"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
        
        // ضخ الكروت دفعة واحدة وهي تحتوي على النصوص والترجمات الجاهزة تماماً
        activitiesPageGrid.innerHTML = cardsHTML;
    };

    // تشغيل الأزرار، التهيئة الأولية والكبسولة المتحركة
    if (activitiesPageGrid && typeof activitiesData !== 'undefined') {
        // التشغيل الأولي المستقر للكروت
        window.renderActivities("all");

        const indicator = document.querySelector(".filter-indicator");
        const wrapper = document.querySelector(".filter-tabs-wrapper");

        // دالة ذكية ومطورة تدعم اتجاهات اللغتين العربية والانجليزية بدقة 100%
        const updateIndicatorPosition = (activeBtn) => {
            if (!indicator || !wrapper || window.innerWidth <= 768) return; // عدم التشغيل على الموبايل
            
            const wrapperRect = wrapper.getBoundingClientRect();
            const btnRect = activeBtn.getBoundingClientRect();
            
            // معرفة اتجاه اللغة الحالي للموقع (ar أو en)
            const currentLang = document.documentElement.lang || "ar";

            // ضبط عرض الكبسولة ليتطابق مع حجم الزر تماماً
            indicator.style.width = `${btnRect.width}px`;

            if (currentLang === "en") {
                // في اللغة الإنجليزية: الحساب والارتكاز يبدأ من اليسار (Left)
                const offsetLeft = btnRect.left - wrapperRect.left;
                indicator.style.right = "auto";
                indicator.style.left = "6px"; // تعويض البادينغ الافتراضي للحاوية
                indicator.style.transform = `translateX(${offsetLeft - 6}px)`;
            } else {
                // في اللغة العربية: الحساب والارتكاز يبدأ من اليمين (Right) لمنع القفز العشوائي
                const offsetRight = wrapperRect.right - btnRect.right;
                indicator.style.left = "auto";
                indicator.style.right = "6px"; // تعويض البادينغ الافتراضي للحاوية
                indicator.style.transform = `translateX(${-offsetRight + 6}px)`; // قيمة سالبة لأن الاتجاه RTL
            }
        };

        // تشغيل الحركة لأول مرة عند تحميل الصفحة للزر النشط الافتراضي
        const initialActiveBtn = document.querySelector(".filter-tab-btn.active");
        if (initialActiveBtn) {
            setTimeout(() => updateIndicatorPosition(initialActiveBtn), 150);
        }

        // مستمعات أزرار الفلترة
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                
                // تحديث كبسولة الخلفية المتحركة فوراً بحسب اتجاه اللغة الحالي
                updateIndicatorPosition(btn);
                
                // رندر الكروت المفلترة
                window.renderActivities(btn.getAttribute("data-filter"));
            });
        });

        // تحديث موقع الكبسولة تلقائياً عند إعادة تغيير مقاس الشاشة
        window.addEventListener("resize", () => {
            const currentActive = document.querySelector(".filter-tab-btn.active");
            if (currentActive) updateIndicatorPosition(currentActive);
        });

        // تحديث موقع الكبسولة فوراً عند نقر زر تغيير اللغة (lang.js) لتقلب للجهة الأخرى بسلاسة
        const langToggleBtn = document.getElementById("lang-toggle") || document.querySelector(".lang-switch");
        const langToggleMobileBtn = document.getElementById("lang-toggle-mobile");
        
        const refreshIndicatorOnLangChange = () => {
            setTimeout(() => {
                const currentActive = document.querySelector(".filter-tab-btn.active");
                if (currentActive) updateIndicatorPosition(currentActive);
            }, 60); // تأخير بسيط جداً ليتغير كلاس الـ html أولاً
        };

        if (langToggleBtn) langToggleBtn.addEventListener("click", refreshIndicatorOnLangChange);
        if (langToggleMobileBtn) langToggleMobileBtn.addEventListener("click", refreshIndicatorOnLangChange);
    }

    // [3] مستمع حدث زر تبديل اللغة لضمان إعادة فلترة الكروت وترجمتها فوراً وبسلاسة
    const langToggleBtn = document.getElementById("lang-toggle") || document.querySelector(".lang-switch");
    const langToggleMobileBtn = document.getElementById("lang-toggle-mobile");

    const updateActivitiesOnLangChange = () => {
        if (typeof window.renderActivities === 'function' && document.getElementById("activities-page-grid")) {
            const activeFilter = document.querySelector(".filter-tab-btn.active")?.getAttribute("data-filter") || "all";
            window.renderActivities(activeFilter);
        }
    };

    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            // تأخير بسيط جداً للتأكد من قيام سكريبت lang.js بتحديث الـ localStorage أولاً
            setTimeout(updateActivitiesOnLangChange, 50);
        });
    }

    if (langToggleMobileBtn) {
        langToggleMobileBtn.addEventListener("click", () => {
            setTimeout(updateActivitiesOnLangChange, 50);
        });
    }

});