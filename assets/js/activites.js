// assets/js/activities.js
document.addEventListener("DOMContentLoaded", () => {

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
                            <a href="activities.html" class="btn-hub-link" onclick="event.preventDefault(); window.innerWidth > 768 ? window.open('activities.html', '_blank') : window.location.href = 'activities.html';">
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