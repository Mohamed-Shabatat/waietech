// assets/js/blog-detail.js
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("id");

    // التحقق الآمن من وجود معرّف المقال أو كونه مسجلاً بملف البيانات
    if (!articleId || typeof blogData === 'undefined') {
        window.location.href = "blog.html"; 
        return;
    }

    const article = blogData.find(item => item.id === articleId);
    if (!article) {
        window.location.href = "blog.html";
        return;
    }

    // دالة المعالجة وحقن نصوص ومكونات المقال المترجمة
    const renderBlogDetails = () => {
        const currentLang = localStorage.getItem("lang") || "ar";
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === "en" ? "ltr" : "rtl";

        const langPack = translations[currentLang] || translations["ar"];

        // 1. حقن النصوص الأساسية للبانر العلوي من ملف اللغات الرئيسي
        document.getElementById("detail-title").innerText = langPack[article.titleKey] || "";
        document.getElementById("detail-badge").innerText = langPack[article.badgeKey] || "";
        document.getElementById("detail-date").innerText = article.date;
        document.getElementById("detail-read-time").innerText = article.readTime;
        
        // حقن خلفية البانر المباشرة والمحمية هندسياً
        const heroImgElement = document.getElementById("detail-hero-img");
        if (heroImgElement) heroImgElement.src = article.image;

        // 2. سحب وحقن فقرات المقال الداخلية من كائن المحتوى المترجم (content) المباشر
        const articleContent = article.content[currentLang] || article.content["ar"];
        
        if (articleContent) {
            document.getElementById("blog-subtitle-1").innerText = articleContent.subtitle1 || "";
            document.getElementById("blog-paragraph-1").innerText = articleContent.paragraph1 || "";
            document.getElementById("blog-subtitle-2").innerText = articleContent.subtitle2 || "";
            document.getElementById("blog-paragraph-2").innerText = articleContent.paragraph2 || "";
            
            // التحقق من وجود نصيحة سريعة (Quick Tip) لحقنها أو إخفاء الصندوق بالكامل
            const quickTipWrapper = document.getElementById("blog-quick-tip-wrapper");
            if (articleContent.quickTip) {
                quickTipWrapper.style.display = "flex";
                document.getElementById("blog-quick-tip").innerText = articleContent.quickTip;
            } else {
                quickTipWrapper.style.display = "none";
            }
        }

        // 3. معالجة وحقن المرجع الأصلي للمقال (referenceUrl) في شريط الأدوات الجانبي
        const referenceWrapper = document.getElementById("blog-reference-wrapper");
        const referenceLinksContainer = document.getElementById("blog-reference-links");
        referenceLinksContainer.innerHTML = "";

        if (article.referenceUrl && article.referenceUrl.trim() !== "") {
            referenceWrapper.style.display = "block";
            
            const a = document.createElement("a");
            a.href = article.referenceUrl;
            a.target = "_blank";
            a.className = "btn-reference-link";
            
            const btnText = langPack["btn_visit_source"] || "زيارة المصدر الأصلي";
            a.innerHTML = `<i class="fas fa-external-link-alt"></i> <span>${btnText}</span>`;
            
            referenceLinksContainer.appendChild(a);
        } else {
            referenceWrapper.style.display = "none";
        }

        // 4. بناء زر المقال التالي بشكل دائري مستمر ومستقر
        const currentIndex = blogData.findIndex(item => item.id === articleId);
        const nextIndex = (currentIndex + 1) % blogData.length; 
        const nextArticle = blogData[nextIndex];
        const nextBtn = document.getElementById("next-blog-btn");
        
        if (nextBtn && nextArticle) {
            nextBtn.href = `blog-detail.html?id=${nextArticle.id}`;
        }

        // 5. تفعيل مفاتيح data-i18n المتبقية للعناصر الثابتة بالصفحة لترجمتها فورياً
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            if (langPack[key]) element.innerText = langPack[key];
        });
    };

    // تعيين الدالة على كائن النوافذ العالمي لاستدعائها خارجياً
    window.renderBlogDetails = renderBlogDetails;

    // التشغيل التأسيسي الأول للمقالة عند تحميل الملف
    renderBlogDetails();

    // مستمع حدث زر تبديل اللغة لإعادة صياغة ورندر نصوص المقالة والفقرات فوراً
    const langToggleBtn = document.getElementById("lang-toggle") || document.querySelector(".lang-switch");
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            setTimeout(renderBlogDetails, 100);
        });
    }
});