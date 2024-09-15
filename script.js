const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')
tabs.forEach(tab =>{
    tab.addEventListener('click',()=>{
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => tabContent.classList.remove('active'))
        target.classList.add('active')
    })
})

const languageLinks = document.querySelectorAll('[data-language]');
const aboutMe = document.getElementById('about-me');

const defaultLanguage = 'en';
document.querySelector(`[data-language="${defaultLanguage}"]`).classList.add('selected');

const translations = {
    en: "I am a dedicated and motivated Computer Science student at ITU University, Lahore. with a strong foundation in programming, software development, and problem-solving. I am seeking opportunities to apply my skills, contribute to innovative projects, and grow professionally.",
    fr: "Je suis un étudiant en informatique dévoué et motivé à l'Université ITU de Lahore. avec une solide base en programmation, développement de logiciels et résolution de problèmes. Je recherche des opportunités pour appliquer mes compétences, contribuer à des projets innovants et évoluer professionnellement.",
    ar: "أنا طالب مجتهد ومتحفز في جامعة تكنولوجيا المعلومات، لاهور، لدي أساس قوي في البرمجة وتطوير البرمجيات وحل المشكلات. أسعى للحصول على فرص لتطبيق مهاراتي والمساهمة في مشاريع مبتكرة والنمو على المستوى المهني.",
    ur: "میں آئی ٹی یو یونیورسٹی، لاہور میں کمپیوٹر سائنس کا ایک محنتی اور متحرک طالب علم ہوں، جس کی بنیاد پروگرامنگ، سافٹ ویئر ڈیولپمنٹ، اور مسئلہ حل کرنے میں مضبوط ہے۔ میں ایسے مواقع کی تلاش میں ہوں جہاں میں اپنی مہارتوں کا استعمال کر سکوں، جدید پروجیکٹس میں حصہ لے سکوں، اور پیشہ ورانہ طور پر ترقی کر سکوں۔"
};


aboutMe.textContent = translations[defaultLanguage];

languageLinks.forEach(link => {
    link.addEventListener('click', () => {
        languageLinks.forEach(link => link.classList.remove('selected'));
        link.classList.add('selected');
        const selectedLanguage = link.getAttribute('data-language');
        aboutMe.textContent = translations[selectedLanguage];
    });
});
