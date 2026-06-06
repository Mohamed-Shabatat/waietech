// assets/js/components.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. حقن القائمة العلوية (Header) مع دعم الموبايل (تم إزالة target="_blank" الثابتة)
    const headerElement = document.getElementById("header");
    if (headerElement) {
        headerElement.innerHTML = `
            <nav class="navbar">
                <div class="logo-container">
                    <img src="assets/images/logo.png" alt="WaieTech Logo" class="logo-img">
                    <span class="logo-text" data-i18n="logo_text">وَعْي تك</span>
                </div>
                
                <ul class="nav-links" id="nav-links">
                    <div class="sidebar-mobile-header">
                        <img src="assets/images/logo.png" alt="Logo" class="sidebar-logo">
                        <button id="lang-toggle-mobile" class="btn-lang-mobile">EN</button>
                    </div>

                    <li><i class="fas fa-home nav-icon"></i><a href="home.html" data-i18n="nav_home">الرئيسية</a></li>
                    <li><i class="fas fa-info-circle nav-icon"></i><a href="about.html" data-i18n="nav_about">من نحن</a></li>
                    <li><i class="fas fa-th-large nav-icon"></i><a href="services.html" data-i18n="nav_services">خدماتنا</a></li>
                    <li><i class="fas fa-graduation-cap nav-icon"></i><a href="courses.html" data-i18n="nav_courses">الدورات</a></li>
                    <li><i class="fas fa-calendar-alt nav-icon"></i><a href="activities.html" data-i18n="nav_activities">الأنشطة</a></li>
                    <li><i class="fas fa-blog nav-icon"></i><a href="blog.html" data-i18n="nav_blog">المدونة</a></li>
                    <li><i class="fas fa-envelope nav-icon"></i><a href="contact.html" data-i18n="nav_contact">تواصل معنا</a></li>
                </ul>

                <div class="nav-actions">
                    <button id="lang-toggle" class="btn-lang">EN</button>
                    <button class="menu-toggle" id="menu-toggle" aria-label="Toggle Menu">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </nav>
            <div class="nav-overlay" id="nav-overlay"></div>
        `;
    }

    // 2. تحديد الصفحة الحالية وإضافة الخط الأزرق (.active) تلقائياً
    const currentPath = window.location.pathname.split("/").pop();
    // إذا كان الرابط فارغاً أو ينتهي بـ / نعتبره الصفحة الرئيسية home.html
    const currentPage = currentPath === "" ? "home.html" : currentPath;

    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        const linkAttribute = link.getAttribute("href");
        
        // إزالة أي كلاس active قديم مضاف افتراضياً
        link.classList.remove("active");
        
        // مقارنة اسم الملف الحالي برابط العنصر وتفعيل الخط الأزرق له
        if (linkAttribute === currentPage) {
            link.classList.add("active");
        }
    });

    // 3. فتح الروابط في تبويبة جديدة لسطح المكتب فقط (شاشات أكبر من 768px)
    if (window.innerWidth > 768) {
        navLinks.forEach(link => {
            // التحقق من أنه ليس رابط الصفحة الرئيسية إذا كنت لا تفضل فتح الرئيسية في تبويبة جديدة
            if (link.getAttribute("href") !== "home.html") {
                link.setAttribute("target", "_blank");
            }
        });
    }


    //-----------------------//


    // حقن زر الصعود للأعلى في الصفحة
    const backToTopBtn = document.createElement("button");
    backToTopBtn.id = "backToTop";
    backToTopBtn.className = "back-to-top";
    backToTopBtn.innerHTML = `<i class="fas fa-chevron-up"></i>`;
    document.body.appendChild(backToTopBtn);

    // التحكم في ظهور الزر عند التمرير لأسفل وصعود الصفحة عند الضغط عليه
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });



    //-----------------------//

    // 2. حقن التذييل الاحترافي المطور (Mega Footer) مع الكلمات الجوهرية والروابط المستقبلية
    const footerElement = document.getElementById("footer");
    if (footerElement) {
        footerElement.innerHTML = `
            <div class="footer-wrapper">
                <div class="footer-grid">
                    
                    <div class="footer-col about-col">
                        <div class="footer-logo">
                            <img src="assets/images/white_logo.png" alt="WaieTech Logo" class="logo-img">
                            <span class="logo-text" data-i18n="logo_text">وَعْي تك</span>
                        </div>
                        <p class="footer-desc" data-i18n="hero_desc">
                            مبادرة تقنية تهتم بنشر الوعي بالأمن السيبراني، التمكين الرقمي، وتطوير المهارات التكنولوجية الحديثة للشباب والمجتمع.
                        </p>
                        <div class="footer-core-values">
                            <span data-i18n="val_awareness">التوعية</span> • 
                            <span data-i18n="val_empowerment">التمكين</span> • 
                            <span data-i18n="val_growth">النمو</span> • 
                            <span data-i18n="val_security">الأمن</span>
                        </div>
                    </div>

                    <div class="footer-col">
                        <h4 class="col-title" data-i18n="footer_links_title">روابط سريعة</h4>
                        <ul class="footer-links">
                            <li><a href="home.html" data-i18n="nav_home">الرئيسية</a></li>
                            <li><a href="about.html" data-i18n="nav_about">من نحن</a></li>
                            <li><a href="services.html" data-i18n="nav_services">خدماتنا</a></li>
                            <li><a href="courses.html" data-i18n="nav_courses">الدورات</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4 class="col-title" data-i18n="footer_future_title">المبادرات والأخبار</h4>
                        <ul class="footer-links">
                            <li><a href="activities.html" data-i18n="nav_activities">الورش والفعاليات</a></li>
                            <li><a href="blog.html" data-i18n="nav_blog">مدونة التوعية</a></li>
                            <li><a href="cooming-soon.html" data-i18n="nav_impact">إنجازاتنا</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4 class="col-title" data-i18n="footer_support_title">تواصل معنا</h4>
                        <ul class="footer-contact-info">
                            <li><i class="fas fa-envelope"></i> <span>info@waietech.com</span></li>
                            <li><i class="fas fa-map-marker-alt"></i> <span data-i18n="footer_location">المملكة الأردنية الهاشمية</span></li>
                        </ul>
                        <div class="footer-socials">
                            <a href="https://www.linkedin.com/company/waietech" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                            <a href="https://www.instagram.com/waietech" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="https://chat.whatsapp.com/HByxRD39W0a9ABUs6xjder" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                            <a href="https://www.nahno.org/ngo/%D9%88%D9%8E%D8%B9%D9%92%D9%8A-%D8%AA%D9%83-81393" target="_blank" aria-label="Website"><i class="fas fa-globe"></i></a>
                        </div>
                    </div>

                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2026 <span data-i18n="logo_text">وَعْي تك</span>. <span data-i18n="footer_rights">جميع الحقوق محفوظة.</span></p>
            </div>
        `;
    }
});