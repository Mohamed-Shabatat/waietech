// assets/js/activities-data.js

const activitiesData = [
    {
        id: "cyber-awareness-2026",
        featured: true, 
        category: "workshops",
        image: "assets/images/cybersecurity.jfif", 
        badgeKey: "badge_activity", 
        titleKey: "act_workshop_title", 
        descKey: "act_workshop_desc", 
        date: "15/6/2026", 
        location: { ar: "مركز بناء المهارات"}, // ستبقى هكذا أو نترجمها بالسكريبت
        link: "activities.html"
    },
    {
        id: "digital-skills-camp",
        featured: false, 
        category: "campaigns",
        image: "assets/images/Phishing Attack.jfif", 
        badgeKey: "filter_campaigns", // نربطها بمفاتيح الترجمة لديك مباشرة
        titleKey: "act_camp_title", // سنضيف المفاتيح في ملف الترجمة بالخطوة التالية
        descKey: "act_camp_desc", 
        date: "20/6/2026",
        location: { ar: "قاعة الابتكار الرقمي"}, 
        link: "activities.html"
    },
    {
        id: "ai-safety-forum",
        featured: false, 
        category: "seminars",
        image: "assets/images/Phishing Attack.jfif", 
        badgeKey: "filter_seminars", 
        titleKey: "act_forum_title", 
        descKey: "act_forum_desc", 
        date: "25/6/2026",
        location: { ar: "المدرج الرئيسي"}, 
        link: "activities.html"
    }
];