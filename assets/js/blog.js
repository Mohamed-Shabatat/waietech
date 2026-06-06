// assets/js/blog.js
document.addEventListener("DOMContentLoaded", () => {

    // [1] معالجة وحقن كرت الصفحة الرئيسية (Home Page) - قسم المقال المميز
    const mainFeaturedBlogContainer = document.getElementById("main-featured-blog-container");

    if (mainFeaturedBlogContainer && typeof blogData !== 'undefined') {
        const featuredArticle = blogData.find(article => article.featured === true);
        
        if (featuredArticle) {
            const currentLang = localStorage.getItem("lang") || "ar";
            
            const homeLangPack = translations[currentLang] || translations["ar"];
            const homeTitle = homeLangPack[featuredArticle.titleKey] || "";
            const homeDesc = homeLangPack[featuredArticle.descKey] || "";
            const homeBadge = homeLangPack[featuredArticle.badgeKey] || "";
            const readTimeText = homeLangPack["minutes_read"] || "دقائق قراءة";
            const homeBtnText = homeLangPack["btn_read_blog"] || "اقرأ المدونة";
            
            mainFeaturedBlogContainer.outerHTML = `
                <div class="hub-card-item" data-id="${featuredArticle.id}">
                    <div class="hub-card-image">
                        <img src="${featuredArticle.image}" alt="WaieTech Blog">
                        <span class="hub-badge badge-blog hub-badge-pos" data-i18n="${featuredArticle.badgeKey}">${homeBadge}</span>
                    </div>
                    <div class="hub-card-content">
                        <div class="hub-card-meta">
                            <span><i class="far fa-calendar-alt"></i> ${featuredArticle.date}</span>
                            <span><i class="far fa-clock"></i> ${featuredArticle.readTime} <span data-i18n="minutes_read">${readTimeText}</span></span>
                        </div>
                        <h3 class="hub-card-title" data-i18n="${featuredArticle.titleKey}">${homeTitle}</h3>
                        <p class="hub-card-excerpt" data-i18n="${featuredArticle.descKey}">${homeDesc}</p>
                        <div class="hub-card-footer">
                            <a href="blog-detail.html?id=${featuredArticle.id}" class="btn-hub-link" onclick="event.preventDefault(); window.innerWidth > 768 ? window.open('blog-detail.html?id=${featuredArticle.id}', '_blank') : window.location.href = 'blog-detail.html?id=${featuredArticle.id}';">
                                <span data-i18n="btn_read_blog">${homeBtnText}</span> 
                                <i class="fas fa-arrow-left arrow-icon"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // [2] معالجة وحقن كروت صفحة المدونة الرقمية والفلترة (Blog Page)
    const blogPageGrid = document.getElementById("blog-page-grid");
    const blogFilterButtons = document.querySelectorAll(".blog-filter-btn");

    window.renderBlogArticles = (filterCategory = "all") => {
        if (!blogPageGrid || typeof blogData === 'undefined') return;

        blogPageGrid.innerHTML = ""; 
        const currentLang = localStorage.getItem("lang") || "ar";
        
        const filteredData = filterCategory === "all" 
            ? blogData 
            : blogData.filter(article => article.category === filterCategory);
            
        const langPack = translations[currentLang] || translations["ar"];

        // معالجة حالة الأقسام الفارغة وضمان بقاء قالب الترجمة الفورية فعالاً بنسبة 100%
        if (filteredData.length === 0) {
            const noArticlesText = langPack["no_articles"] || "لا توجد مقالات منشورة في هذا القسم حالياً.";
            blogPageGrid.innerHTML = `
                <p style="text-align:center; width:100%; color:var(--text-light); padding:40px; font-family:'Tajawal';" data-i18n="no_articles">${noArticlesText}</p>`;
            return;
        }

        let cardsHTML = "";

        filteredData.forEach(article => {
            const badgeText = langPack[article.badgeKey] || "";
            const titleText = langPack[article.titleKey] || "";
            const descText = langPack[article.descKey] || "";
            const readTimeText = langPack["minutes_read"] || "دقائق قراءة";
            const btnText = langPack["btn_view_details"] || "عرض التفاصيل";

            cardsHTML += `
                <div class="blog-page-card" data-category="${article.category}">
                    <div class="blog-card-image-box">
                        <img src="${article.image}" alt="WaieTech Blog Article">
                        <span class="blog-card-badge" data-i18n="${article.badgeKey}">${badgeText}</span>
                    </div>
                    <div class="blog-card-info-content">
                        <div class="blog-card-top-meta">
                            <span><i class="far fa-calendar-alt"></i> ${article.date}</span>
                            <span>
                                <i class="far fa-clock"></i> 
                                ${article.readTime} 
                                <span data-i18n="minutes_read">${readTimeText}</span>
                            </span>
                        </div>
                        <h3 class="blog-card-main-title" data-i18n="${article.titleKey}">${titleText}</h3>
                        <p class="blog-card-main-desc" data-i18n="${article.descKey}">${descText}</p>
                        <div class="blog-card-bottom-footer">
                            <a href="blog-detail.html?id=${article.id}" class="btn-blog-page-link" onclick="event.preventDefault(); window.innerWidth > 768 ? window.open('blog-detail.html?id=${article.id}', '_blank') : window.location.href = 'blog-detail.html?id=${article.id}';">
                                <span data-i18n="btn_view_details">${btnText}</span> 
                                <i class="fas fa-arrow-left blog-arrow-icon"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
        
        blogPageGrid.innerHTML = cardsHTML;
    };

    // تشغيل الأزرار، التهيئة الأولية والكبسولة المتحركة لتبويبات فئات المدونة
    if (blogPageGrid && typeof blogData !== 'undefined') {
        // التشغيل الأولي المستقر للكروت عند تحميل الصفحة
        window.renderBlogArticles("all");

        const blogIndicator = document.querySelector(".blog-filter-indicator");
        const blogWrapper = document.querySelector(".blog-filter-tabs-wrapper");

        // دالة متطابقة هندسياً لدعم حركة الكبسولة للغتين العربية والانجليزية بدقة 100%
        const updateBlogIndicatorPosition = (activeBtn) => {
            if (!blogIndicator || !blogWrapper || window.innerWidth <= 768) return; 
            
            const wrapperRect = blogWrapper.getBoundingClientRect();
            const btnRect = activeBtn.getBoundingClientRect();
            
            const currentLang = document.documentElement.lang || "ar";

            blogIndicator.style.width = `${btnRect.width}px`;

            if (currentLang === "en") {
                const offsetLeft = btnRect.left - wrapperRect.left;
                blogIndicator.style.right = "auto";
                blogIndicator.style.left = "6px"; 
                blogIndicator.style.transform = `translateX(${offsetLeft - 6}px)`;
            } else {
                const offsetRight = wrapperRect.right - btnRect.right;
                blogIndicator.style.left = "auto";
                blogIndicator.style.right = "6px"; 
                blogIndicator.style.transform = `translateX(${-offsetRight + 6}px)`; 
            }
        };

        // ضبط موقع كبسولة التبويب المفعّل افتراضياً لأول مرة
        const initialBlogActiveBtn = document.querySelector(".blog-filter-btn.active");
        if (initialBlogActiveBtn) {
            setTimeout(() => updateBlogIndicatorPosition(initialBlogActiveBtn), 150);
        }

        // مستمعات أحداث أزرار التبويبات والفلترة
        blogFilterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                blogFilterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                
                updateBlogIndicatorPosition(btn);
                
                window.renderBlogArticles(btn.getAttribute("data-filter"));
            });
        });

        // إعادة ضبط موضع الكبسولة الديناميكي عند تغيير قياس الشاشة للزوار
        window.addEventListener("resize", () => {
            const currentActive = document.querySelector(".blog-filter-btn.active");
            if (currentActive) updateBlogIndicatorPosition(currentActive);
        });

        // تحديث موضع الكبسولة التوافقي عند النقر الفوري على أزرار لغات الموقع
        const langToggleBtn = document.getElementById("lang-toggle") || document.querySelector(".lang-switch");
        const langToggleMobileBtn = document.getElementById("lang-toggle-mobile");
        
        const refreshBlogIndicatorOnLangChange = () => {
            setTimeout(() => {
                const currentActive = document.querySelector(".blog-filter-btn.active");
                if (currentActive) updateBlogIndicatorPosition(currentActive);
            }, 60); 
        };

        if (langToggleBtn) langToggleBtn.addEventListener("click", refreshBlogIndicatorOnLangChange);
        if (langToggleMobileBtn) langToggleMobileBtn.addEventListener("click", refreshBlogIndicatorOnLangChange);
    }

    // [3] مستمع حدث زر تبديل اللغة لضمان إعادة رندر المقالات والترجمات الفورية بسلاسة
    const langToggleBtn = document.getElementById("lang-toggle") || document.querySelector(".lang-switch");
    const langToggleMobileBtn = document.getElementById("lang-toggle-mobile");

    const updateBlogOnLangChange = () => {
        if (typeof window.renderBlogArticles === 'function' && document.getElementById("blog-page-grid")) {
            const activeFilter = document.querySelector(".blog-filter-btn.active")?.getAttribute("data-filter") || "all";
            window.renderBlogArticles(activeFilter);
        }
    };

    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            setTimeout(updateBlogOnLangChange, 70);
        });
    }

    if (langToggleMobileBtn) {
        langToggleMobileBtn.addEventListener("click", () => {
            setTimeout(updateBlogOnLangChange, 70);
        });
    }
    
});