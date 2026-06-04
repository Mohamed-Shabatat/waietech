document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const activityId = urlParams.get("id");

    if (!activityId || typeof activitiesData === 'undefined') {
        window.location.href = "activities.html"; 
        return;
    }

    const activity = activitiesData.find(act => act.id === activityId);
    if (!activity) {
        window.location.href = "activities.html";
        return;
    }

    // دالة حقن البيانات والترجمة الديناميكية المحدثة
    const renderActivityDetails = () => {
        const currentLang = localStorage.getItem("lang") || "ar";
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === "en" ? "ltr" : "rtl";

        const langPack = translations[currentLang] || translations["ar"];

        // حقن نصوص البانر
        document.getElementById("detail-title").innerText = langPack[activity.titleKey] || "";
        document.getElementById("detail-desc").innerText = langPack[activity.descKey] || "";
        document.getElementById("detail-badge").innerText = langPack[activity.badgeKey] || "";
        document.getElementById("detail-date").innerText = activity.date;
        document.getElementById("detail-location").innerText = activity.location[currentLang] || activity.location["ar"];
        
        // 🌟 حقن مسار الصورة الرئيسية لحمايتها هندسياً عبر الـ src المباشر للـ img
        const heroImgElement = document.getElementById("detail-hero-img");
        if (heroImgElement) heroImgElement.src = activity.image;

        // حقن الإحصائيات الجانبية
        document.getElementById("detail-attendees-count").innerText = activity.attendees;
        document.getElementById("detail-partners-list").innerText = langPack[activity.partnersKey] || "";

        // حقن قائمة المخرجات
        const outputsContainer = document.getElementById("detail-outputs");
        outputsContainer.innerHTML = "";
        const outputsArray = langPack[activity.outputsKey] || [];
        if (Array.isArray(outputsArray)) {
            outputsArray.forEach(text => {
                const li = document.createElement("li");
                li.innerText = text;
                outputsContainer.appendChild(li);
            });
        }

        // حقن ألبوم الصور مع تفعيل خاصية المشاهدة والتكبير (Lightbox)
        const galleryContainer = document.getElementById("detail-gallery");
        galleryContainer.innerHTML = "";
        if (activity.gallery && activity.gallery.length > 0) {
            activity.gallery.forEach(imgSrc => {
                const wrapper = document.createElement("div");
                wrapper.className = "gallery-img-wrapper";
                wrapper.innerHTML = `<img src="${imgSrc}" alt="WaieTech Photo">`;
                
                // 🌟 مستمع حدث النقر لتكبير الصورة
                wrapper.addEventListener("click", () => {
                    openLightbox(imgSrc);
                });
                
                galleryContainer.appendChild(wrapper);
            });
        }

        // المرفقات التدريبية
        const materialsWrapper = document.getElementById("training-materials-wrapper");
        const linksContainer = document.getElementById("detail-materials-links");
        linksContainer.innerHTML = "";
        
        if (activity.materials && activity.materials.length > 0) {
            materialsWrapper.style.display = "block";
            activity.materials.forEach(mat => {
                const a = document.createElement("a");
                a.href = mat.url;
                a.className = "btn-hub-link"; 
                a.style.marginTop = "10px";
                a.innerHTML = `<i class="fas fa-download"></i> <span>${langPack[mat.nameKey] || "تحميل"}</span>`;
                linksContainer.appendChild(a);
            });
        } else {
            materialsWrapper.style.display = "none";
        }

        // زر النشاط التالي دائرياً
        const currentIndex = activitiesData.findIndex(act => act.id === activityId);
        const nextIndex = (currentIndex + 1) % activitiesData.length; 
        const nextActivity = activitiesData[nextIndex];
        const nextBtn = document.getElementById("next-activity-btn");
        if (nextBtn && nextActivity) {
            nextBtn.href = `activity-detail.html?id=${nextActivity.id}`;
        }

        // ترجمة الكلمات الثابتة المحددة بـ data-i18n
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            if (langPack[key]) element.innerText = langPack[key];
        });
    };

    // 🌟 دوال تشغيل نافذة تكبير الصور (Lightbox Functionality)
    const lightboxModal = document.getElementById("image-lightbox");
    const lightboxImg = document.getElementById("lightbox-target-img");
    
    const openLightbox = (src) => {
        if (!lightboxModal || !lightboxImg) return;
        lightboxModal.style.display = "block";
        lightboxImg.src = src;
    };

    const closeLightbox = () => {
        if (lightboxModal) lightboxModal.style.display = "none";
    };

    // مستمعات إغلاق نافذة الصور
    const closeBtn = document.getElementById("lightbox-close");
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (lightboxModal) {
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });
    }

    // التشغيل الأولي للملف
    renderActivityDetails();

    // إعادة الرندر عند تحويل اللغة
    const langToggleBtn = document.getElementById("lang-toggle") || document.querySelector(".lang-switch");
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            setTimeout(renderActivityDetails, 100);
        });
    }
});