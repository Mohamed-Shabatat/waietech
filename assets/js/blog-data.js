// assets/js/blog-data.js

const blogData = [
    {
        id: "phishing-attacks-2026",
        featured: true, // هذا المتغير هو المسؤول عن تفعيل الكرت وحقنه في الصفحة الرئيسية!
        category: "cybersecurity", // الفئات المتفق عليها: cybersecurity, ai, digital-skills, networks
        image: "assets/images/Phishing Attack.jfif", 
        badgeKey: "badge_blog", // المفتاح الجاهز لديك في ملف lang.js
        titleKey: "blog_latest_article_title", // المفتاح الجاهز لديك في ملف lang.js
        descKey: "blog_latest_article_excerpt", // المفتاح الجاهز لديك في ملف lang.js
        date: "01/6/2026",
        readTime: 3, // دقائق القراءة
        
        // رابط المرجع الأصلي (إذا وجد يظهر الزر في السايدبار، وإذا كان فارغاً يختفي)
        referenceUrl: "https://www.cisa.gov/news-events/news/recognizing-and-preventing-phishing-attacks",
        
        // محتوى المقال الداخلي لصفحة التفاصيل مقسم لفقرات مترجمة لسهولة الرندر
        content: {
            ar: {
                subtitle1: "ما هو التصيد الإلكتروني وهندسته ؟",
                paragraph1: "يعتبر التصيد الإلكتروني (Phishing) أحد أخطر أساليب الهندسة الاجتماعية التي تعتمد على خداع الضحية للحصول على بياناته الحساسة مثل كلمات المرور وبطاقات الائتمان، وذلك من خلال رسائل بريد إلكتروني أو روابط وهمية تحاكي الشركات الرسمية بشكل متطابق.",
                subtitle2: "كيف تكتشف الروابط المفخخة ؟",
                paragraph2: "لحماية نفسك، يجب دائماً فحص النطاق (Domain) الخاص بالرابط بدقة، والتأكد من بروتوكول الحماية HTTPS، وعدم التفاعل مع الرسائل التي تخلق نوعاً من الاستعجال الخبيث أو الخوف المصطنع لتدفعك للضغط فوراً.",
                quickTip: "لا توجد شركة أمنية أو بنك يطلب منك تحديث بياناتك السرية عبر رابط بريد إلكتروني مباشر أبداً!"
            },
            en: {
                subtitle1: "What is Phishing and Social Engineering ?",
                paragraph1: "Phishing is one of the most dangerous social engineering techniques that relies on deceiving victims into revealing sensitive data like passwords, through spoofed emails or fake links that perfectly mimic official entities.",
                subtitle2: "How to Detect Malicious Links ?",
                paragraph2: "To protect yourself, always inspect the domain name carefully, verify the HTTPS protocol, and never interact with urgent messages that create a false sense of panic.",
                quickTip: "No secure institution or bank will ever ask you to update your secret credentials via a direct email link!"
            }
        }
    },

    {
        id: "generative-ai-future-2026",
        featured: false, 
        category: "ai", 
        image: "assets/images/AI.jfif", // يمكنك مطابقتها مع مسار صورك
        badgeKey: "filter_ai", 
        titleKey: "blog_ai_title", 
        descKey: "blog_ai_excerpt", 
        date: "03/6/2026",
        readTime: 4, 
        referenceUrl: "https://www.ibm.com/topics/generative-ai",
        content: {
            ar: {
                subtitle1: "ثورة الذكاء الاصطناعي التوليدي",
                paragraph1: "شهدت الآونة الأخيرة قفزة هائلة في تقنيات الذكاء الاصطناعي التوليدي، حيث لم يعد الأمر مقتصراً على تحليل البيانات الثابتة، بل امتد لابتكار نصوص، صور، وأكواد برمجية كاملة تحاكي الإبداع البشري وتختصر مئات ساعات العمل اليومية.",
                subtitle2: "كيف تستثمر الذكاء الاصطناعي في مجالك؟",
                paragraph2: "النجاح اليوم لا يكمن في الخوف من الأتمتة، بل في تعلم كيفية صياغة الأوامر الذكية (Prompt Engineering) واستخدام هذه الأدوات كعوامل مساعدة لرفع الكفاءة الإنتاجية وابتكار حلول برمجية وتقنية متقدمة بسرعة فائقة.",
                quickTip: "الذكاء الاصطناعي لن يحل محل المبرمج، ولكن المبرمج الذي يستخدم الذكاء الاصطناعي سيحل محل من لا يستخدمه!"
            },
            en: {
                subtitle1: "The Generative AI Revolution",
                paragraph1: "Generative AI has introduced a massive leap in technology. It is no longer just about analyzing static data, but rather about creating human-like text, images, and complete source code, saving hundreds of daily work hours.",
                subtitle2: "How to Leverage AI in Your Domain?",
                paragraph2: "Success today isn't about fearing automation; it is about mastering Prompt Engineering and utilizing these tools to boost productivity and build advanced software and tech solutions at unparalleled speeds.",
                quickTip: "AI will not replace programmers, but programmers who use AI will replace those who do not!"
            }
        }
    },
    {
        id: "essential-digital-skills-2026",
        featured: false, 
        category: "digital-skills", 
        image: "assets/images/AI.jfif", 
        badgeKey: "badge_digital_skills", 
        titleKey: "blog_skills_title", 
        descKey: "blog_skills_excerpt", 
        date: "05/6/2026",
        readTime: 3, 
        referenceUrl: "https://www.unesco.org/en/digital-skills-critical-lifelong-learning",
        content: {
            ar: {
                subtitle1: "لماذا أصبحت المهارات الرقمية ضرورة حتمية؟",
                paragraph1: "المهارات الرقمية لم تعد رفاهية للمتخصصين فحسب، بل أصبحت لغة العصر الأساسية للجميع. من إدارة البيانات السحابية إلى فهم أساسيات البرمجة وحماية الهوية الرقمية، تشكل هذه المهارات العمود الفقري للتوظيف في سوق العمل الحديث.",
                subtitle2: "خطوات عملية لبناء مهارات تقنية متينة",
                paragraph2: "ابدأ بتعلم مهارات البحث المتقدم، والتعامل المستقر مع أدوات الإنتاجية السحابية، يليه فهم أساسيات التحليل الرقمي لفتح آفاق مهنية واعدة والقدرة على مواكبة التحول الرقمي الشامل الذي تشهده كافة المؤسسات.",
                quickTip: "الاستثمار في تطوير مهاراتك الرقمية اليوم هو الضمان الحقيقي الوحيد لاستدامة نموك المهني غداً!"
            },
            en: {
                subtitle1: "Why Digital Skills Are Now Essential?",
                paragraph1: "Digital literacy is no longer a luxury reserved for tech experts; it has become the fundamental language of our era. From cloud computing to basic coding and identity protection, these skills form the backbone of modern employment.",
                subtitle2: "Practical Steps to Build Solid Tech Skills",
                paragraph2: "Start by mastering advanced research techniques, cloud collaboration tools, followed by understanding core digital data analysis to unlock promising career opportunities and adapt to institutional digital transformations.",
                quickTip: "Investing in your digital skills today is the only true guarantee for sustaining your professional growth tomorrow!"
            }
        }
    },
    {
        id: "iot",
        featured: false, 
        category: "networks", 
        image: "assets/images/digital.jfif", 
        badgeKey: "badge_networks", 
        titleKey: "blog_networks_title", 
        descKey: "blog_networks_excerpt", 
        date: "06/6/2026",
        readTime: 5, 
        referenceUrl: "https://www.cisco.com/c/en/us/solutions/internet-of-things/overview.html",
        content: {
            ar: {
                subtitle1: "بنية الشبكات الحديثة وإنترنت الأشياء",
                paragraph1: "تتطور بنية الشبكات بسرعة مذهلة لاستيعاب مليارات الأجهزة المتصلة بإنترنت الأشياء (IoT). لم يعد الأمر مقتصراً على ربط الحواسيب، بل أصبحت البنية التحتية تعتمد على السحابة الذكية والشبكات المعرفة برمجياً (SDN) لضمان سرعة نقل البيانات.",
                subtitle2: "تحديات الأمن والاتصال في شبكات المستقبل",
                paragraph2: "مع زيادة الأجهزة المتصلة، تتضاعف الثغرات الأمنية المحتملة. هنا يأتي دور مهندسي الشبكات لابتكار بروتوكولات حماية متطورة تعتمد على التشفير القوي وإدارة حركة المرور الذكية لتفادي أي هجمات أو انقطاع في الاتصال التكاملي.",
                quickTip: "الشبكات المستقرة والآمنة هي الشريان الخفي الذي يغذي كافة تطبيقات الذكاء الاصطناعي والأنظمة الرقمية في العالم!"
            },
            en: {
                subtitle1: "Modern Network Architecture & IoT",
                paragraph1: "Network infrastructures are evolving rapidly to accommodate billions of connected IoT devices. It is no longer just about connecting computers; infrastructure now heavily relies on the smart cloud and Software-Defined Networking (SDN) to guarantee real-time data flow.",
                subtitle2: "Security and Connectivity Challenges in Future Networks",
                paragraph2: "With more connected endpoints, potential security gaps multiply. This is where network engineers step in to establish advanced protection protocols based on robust encryption and intelligent traffic management to prevent system breaches.",
                quickTip: "Stable and secure networks are the hidden arteries that feed every single AI application and digital ecosystem in the world!"
            }
        }
    },
];