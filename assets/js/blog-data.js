// assets/js/blog-data.js

const blogData = [
    {
        id: "nvidia-gtc-2026",
        featured: true, // مفعّل ليكون الكرت الرئيسي المميز المحقون في الصفحة الرئيسية!
        category: "ai", 
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", 
        badgeKey: "filter_ai", 
        titleKey: "blog_nvidia_title", 
        descKey: "blog_nvidia_excerpt", 
        date: "24/3/2026",
        readTime: 5, 
        referenceUrl: "https://www.nvidia.com/gtc/",
        content: {
            ar: {
                subtitle1: "معمارية معالجات الـ Quantum-X والذكاء الاصطناعي السيادي",
                paragraph1: "شهد مؤتمر إنفيديا السنوي GTC 2026 إطلاق الجيل الجديد من رقاقات المعالجة الفائقة المصممة خصيصاً للنماذج الذكية المليارية. ركز المؤتمر هذا العام على مفهوم 'الذكاء الاصطناعي السيادي'، حيث تسعى الدول والمنظمات لبناء مراكز بيانات مستقلة لا تعتمد على السحابة العامة، مما يوفر كفاءة طاقة أعلى بنسبة 45% وقدرة معالجة مضاعفة لعمليات التدريب والاستدلال المعقدة.",
                subtitle2: "برمجيات NIM وتأثيرها على تطوير التطبيقات الأمنية",
                paragraph2: "إلى جانب العتاد، أعلنت إنفيديا عن تحديثات جذرية في حزمة برمجيات NVIDIA Inference Microservices (NIM)، والتي تتيح للمطورين نشر نماذج ذكاء اصطناعي محلية مغلقة ومحمية بالكامل خلال دقائق. هذه الخطوة تمثل ثورة في فحص الثغرات البرمجية المؤتمت وتحليل سلوك الشبكات، حيث يمكن للمؤسسات الآن تشغيل نماذج لغوية ضخمة دون المخاطرة بتسريب البيانات الحساسة خارج حدود شبكاتها.",
                quickTip: "مؤتمر NVIDIA GTC يثبت أن مستقبل التكنولوجيا يتجه نحو المعالجة المحلية المغلقة (Edge AI) لضمان خصوصية البيانات القصوى للبنى التحتية الحساسة."
            },
            en: {
                subtitle1: "Quantum-X Architecture & Sovereign AI",
                paragraph1: "NVIDIA's GTC 2026 conference unveiled the next generation of supercomputing chips tailored for trillion-parameter AI models. This year, the focus was heavily on 'Sovereign AI', driving nations and enterprises to build independent data centers, offering 45% better power efficiency and doubled computing capacity.",
                subtitle2: "NIM Microservices Revolutionary Security Impact",
                paragraph2: "Alongside hardware, NVIDIA announced radical updates to its NIM software suite. This allows developers to deploy local, fully secured AI models on-premise within minutes, representing a breakthrough for automated vulnerability scanning and network behavior analysis without risking data leakage.",
                quickTip: "NVIDIA GTC proves that the future of technology is shifting toward secure Edge AI computation to ensure maximum data privacy for critical infrastructures."
            }
        }
    },
    {
        id: "phishing-attacks-2026",
        featured: false, 
        category: "cybersecurity", 
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", 
        badgeKey: "filter_cybersecurity", 
        titleKey: "blog_latest_article_title", 
        descKey: "blog_latest_article_excerpt", 
        date: "15/5/2026",
        readTime: 4, 
        referenceUrl: "https://www.cisa.gov/news-events/news/recognizing-and-preventing-phishing-attacks",
        content: {
            ar: {
                subtitle1: "تحذيرات CISA لعام 2026 من هجمات التصيد المتطورة لتخطّي الـ MFA",
                paragraph1: "أصدرت وكالة الأمن السيبراني وأمن البنية التحتية (CISA) تحذيراً أمنياً حاسماً بشأن موجة جديدة من هجمات التصيد الاحتيالي المتقدمة القائمة على تقنيات (Adversary-in-the-Middle). هذه الهجمات لم تعد تكتفي بسرقة كلمات المرور التقليدية، بل باتت تستخدم خوادم وكيلة ذكية لاعتراض رموز التحقق الثنائي (MFA tokens) وجلسات التعريف اللحظية للمستخدمين لمحاكاة تسجيل دخول شرعي بالكامل.",
                subtitle2: "كيف تواجه المؤسسات والفرق الأمنية هندسة التصيد الجديدة؟",
                paragraph2: "تؤكد المستجدات على ضرورة انتقال المنشآت فوراً نحو بروتوكولات التحقق غير القابلة للتصيد (Phishing-Resistant MFA) مثل مفاتيح الأمان الفيزيائية المعتمدة على معايير FIDO2/WebAuthn، والابتعاد التدريجي عن الاعتماد على الرسائل النصية القصيرة (SMS) أو تطبيقات التوثيق التقليدية التي يسهل اعتراض نطاقاتها وهندستها عكسياً.",
                quickTip: "التحقق الثنائي عبر الـ SMS لم يعد كافياً في عام 2026؛ حماية الأنظمة الحساسة تتطلب الآن توثيقاً رقمياً مقاوماً للتصيد وهندسة النطاقات العكسية."
            },
            en: {
                subtitle1: "CISA 2026 Advisory: Advanced Phishing Tactics Bypassing MFA",
                paragraph1: "The Cybersecurity and Infrastructure Security Agency (CISA) issued a critical advisory regarding a new wave of advanced Adversary-in-the-Middle (AiTM) phishing attacks. These campaigns no longer just steal text credentials; they deploy proxy engines to intercept live Multi-Factor Authentication (MFA) tokens and session cookies.",
                subtitle2: "How Security Teams Mitigate Next-Gen Phishing Architectures",
                paragraph2: "Modern alerts stress transitioning immediately toward Phishing-Resistant MFA protocols like physical security keys utilizing FIDO2/WebAuthn standards, gradually moving away from legacy SMS-based or standard authenticator app methods that are highly vulnerable to domain spoofing.",
                quickTip: "SMS verification is no longer enough in 2026; securing sensitive endpoints now demands phishing-resistant authentication methods strictly."
            }
        }
    },
    {
        id: "essential-digital-skills-2026",
        featured: false, 
        category: "digital-skills", 
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", 
        badgeKey: "filter_digital_skills", 
        titleKey: "blog_skills_title", 
        descKey: "blog_skills_excerpt", 
        date: "02/6/2026",
        readTime: 3, 
        referenceUrl: "https://www.unesco.org/en/digital-skills-critical-lifelong-learning",
        content: {
            ar: {
                subtitle1: "إطار اليونسكو 2026 المحدث للكفاءة ومحو الأمية الرقمية",
                paragraph1: "أطلقت منظمة اليونسكو رسمياً تحديثها الشامل لأطر المهارات الرقمية المطلوبة عالمياً، مشيرة إلى أن محو الأمية التقنية في عام 2026 تجاوز مجرد استخدام البرمجيات المكتبية الأساسية. الإطار الجديد يركز بشكل مكثف على كفاءات التعامل مع البيانات السحابية، فهم أخلاقيات الذكاء الاصطناعي، والقدرة على حماية البيانات الشخصية والخصوصية الرقمية في بيئات العمل المؤتمتة.",
                subtitle2: "المرونة التقنية كمعيار أساسي لاستدامة الوظائف",
                paragraph2: "أصبح دمج المهارات الرقمية المتقدمة في التعليم والتدريب المهني ركيزة أساسية لسد الفجوة بين الخريجين وسوق العمل. تشمل المستجدات ضرورة إتقان مهارات التحليل والتحقق من صحة المعلومات الرقمية لمكافحة التضليل المعلوماتي الناتج عن تقنيات التوليد الآلي، لضمان استقرار ونمو المسارات المهنية الناشئة.",
                quickTip: "الأمية الرقمية اليوم ليست عدم معرفة الكمبيوتر، بل هي عدم القدرة على تقييم البيانات وتأمين الهوية الرقمية والتعامل مع الذكاء الاصطناعي بمسؤولية."
            },
            en: {
                subtitle1: "UNESCO's Updated 2026 Digital Literacy & Competency Framework",
                paragraph1: "UNESCO officially launched its updated global digital skills framework, declaring that tech literacy in 2026 expands far beyond operating standard desktop software. The newly introduced guidelines heavily target cloud data competence, AI ethics comprehension, and personal data privacy guardrails within automated workplaces.",
                subtitle2: "Technical Agility as a Core Benchmark for Job Sustainability",
                paragraph2: "Embedding advanced digital fluencies into professional education is now vital to bridge the career readiness gap. The framework prioritizes information verification skills to counter automated misinformation, ensuring sustainable professional trajectories.",
                quickTip: "Digital illiteracy today is no longer about computer usage; it is the inability to securely evaluate data and interact responsibly with AI ecosystems."
            }
        }
    },
    {
        id: "iot-networks-2026",
        featured: false, 
        category: "networks", 
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80", 
        badgeKey: "filter_networks", 
        titleKey: "blog_networks_title", 
        descKey: "blog_networks_excerpt", 
        date: "05/6/2026",
        readTime: 5, 
        referenceUrl: "https://www.cisco.com/c/en/us/solutions/internet-of-things/overview.html",
        content: {
            ar: {
                subtitle1: "بنية الشبكات المستدامة وإنترنت الأشياء الصناعي من Cisco لعام 2026",
                paragraph1: "أعلنت شركة سيسكو عن أحدث بنية تحتية مخصصة لإدارة شبكات إنترنت الأشياء الصناعية (IIoT) فائقة الكثافة. التوجه الحالي لعام 2026 يركز على الشبكات المعرفة برمجياً (SDN) الموفرة للطاقة والتي تستخدم خوارزميات ذكية لتوجيه البيانات لحظياً عبر الشبكات الهجينة، مما يقلل من زمن الاستجابة (Latency) إلى مستويات غير مسبوقة داخل المصانع والمنشآت الذكية.",
                subtitle2: "تكامل التشفير الكمي ومستقبل حماية بروتوكولات الاتصال",
                paragraph2: "مع اتصال مليارات الحساسات والأجهزة بالشبكات، قدمت المستجدات الهندسية حلول تشفير متطورة مبنية على مبادئ التشفير المقاوم للحوسبة الكمومية (Post-Quantum Cryptography). هذا يضمن حماية حزم البيانات المتبادلة بين الأنظمة الموزعة، مما يغلق الثغرات التقليدية لشبكات IoT ويحمي مسارات الاتصال الحيوية من الاختراق والتعطيل القسري.",
                quickTip: "بنية الشبكات الحديثة لا تقاس بالسرعة فقط، بل بقدرتها الديناميكية على إدارة ملايين الاتصالات المتزامنة لإنترنت الأشياء بأمان وتشفير مطلق."
            },
            en: {
                subtitle1: "Cisco's 2026 Sustainable Infrastructure & Industrial IoT Architecture",
                paragraph1: "Cisco unveiled its newest networking architecture built for ultra-dense Industrial IoT (IIoT) ecosystems. The 2026 paradigm centers on energy-efficient Software-Defined Networking (SDN) that utilizes edge intelligence to route data dynamically across hybrid links, reducing factory-wide latency to zero.",
                subtitle2: "Post-Quantum Encryption & The Future of Endpoint Connectivity",
                paragraph2: "As billions of sensors flood modern grids, engineering breakthroughs introduce Post-Quantum Cryptography (PQC) solutions into connection protocols. This safeguards telemetry data streams distributed across wide-area networks, neutralizing historical IoT structural vulnerabilities completely.",
                quickTip: "Modern network design is not merely measured by raw bandwidth, but by its dynamic capacity to securely manage millions of concurrent IoT node pathways."
            }
        }
    }
];