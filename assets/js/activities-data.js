// assets/js/activities-data.js

const activitiesData = [
    {
        id: "cyber-awareness-2026",
        featured: true, 
        category: "workshops",
        image: "assets/images/cybersecurity.jfif", 
        badgeKey: "filter_workshops", 
        titleKey: "act_workshop_title", 
        descKey: "act_workshop_desc", 
        date: "15/6/2026", 
        location: { ar: "مركز بناء المهارات"}, // ستبقى هكذا أو نترجمها بالسكريبت
        link: "activity-detail.html",

        attendees: "+150",
        partnersKey: "act_001_partners",
        outputsKey: "act_001_outputs", // مفتاح مصفوفة المخرجات في الترجمة
        gallery: [
            "assets/images/cybersecurity.jfif",
            "assets/images/cybersecurity.jfif",
            "assets/images/cybersecurity.jfif",
            "assets/images/cybersecurity.jfif"
        ],

        materials: [
            { nameKey: "mat_presentation", url: "downloads/cyber_basics.pdf" }
        ]
    },



    {
        id: "digital-skills-camp",
        featured: false, 
        category: "campaigns",
        image: "assets/images/digital.jfif", 
        badgeKey: "filter_campaigns", // نربطها بمفاتيح الترجمة لديك مباشرة
        titleKey: "act_camp_title", // سنضيف المفاتيح في ملف الترجمة بالخطوة التالية
        descKey: "act_camp_desc", 
        date: "20/6/2026",
        location: { ar: "قاعة الابتكار الرقمي"}, 
        link: "activity-detail.html",

        attendees: "",
        partnersKey: "",
        outputsKey: "",
        gallery: [
            "assets/images/digital.jfif",
            "assets/images/digital.jfif",
            "assets/images/digital.jfif",
            "assets/images/digital.jfif",
        ],

        materials :[],
    },


    {
        id: "ai-safety-forum",
        featured: false, 
        category: "seminars",
        image: "assets/images/AI.jfif", 
        badgeKey: "filter_seminars", 
        titleKey: "act_forum_title", 
        descKey: "act_forum_desc", 
        date: "25/6/2026",
        location: { ar: "المدرج الرئيسي"}, 
        link: "activity-detail.html",

        attendees: "",
        partnersKey: "",
        outputsKey: "",
        gallery: [
            "assets/images/AI.jfif",
            "assets/images/AI.jfif",
            "assets/images/AI.jfif",
            "assets/images/AI.jfif",
        ],

        materials :[],
    }
];