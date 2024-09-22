document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget);
            tabContents.forEach(content => content.classList.remove('active'));
            target.classList.add('active');
            tabs.forEach(t => t.classList.remove('active-tab'));
            tab.classList.add('active-tab');
        });
    });
});

const portfolioData = {
    name: "Abdullah Zahid",
    title: "Student",
    contactInfo: {
        email: "Bscs22111@itu.edu.pk",
        resume: "#",
        linkedin: "https://www.linkedin.com/in/muhammad-abdullah-zahid-a1b7802b8/",
        github: "https://github.com/MAbdullah369",
        phone: "+92 3034232979"
    },
    aboutMe: {
        en: "I am a dedicated and motivated Computer Science student at ITU University, Lahore. with a strong foundation in programming, software development, and problem-solving. I am seeking opportunities to apply my skills, contribute to innovative projects, and grow professionally.",
        fr: "Je suis un étudiant en informatique dévoué et motivé à l'Université ITU de Lahore. avec une solide base en programmation, développement de logiciels et résolution de problèmes. Je recherche des opportunités pour appliquer mes compétences, contribuer à des projets innovants et évoluer professionnellement.",
        ar: "أنا طالب مجتهد ومتحفز في جامعة تكنولوجيا المعلومات، لاهور، لدي أساس قوي في البرمجة وتطوير البرمجيات وحل المشكلات. أسعى للحصول على فرص لتطبيق مهاراتي والمساهمة في مشاريع مبتكرة والنمو على المستوى المهني.",
        ur: "میں آئی ٹی یو یونیورسٹی، لاہور میں کمپیوٹر سائنس کا ایک محنتی اور متحرک طالب علم ہوں، جس کی بنیاد پروگرامنگ، سافٹ ویئر ڈیولپمنٹ، اور مسئلہ حل کرنے میں مضبوط ہے۔ میں ایسے مواقع کی تلاش میں ہوں جہاں میں اپنی مہارتوں کا استعمال کر سکوں، جدید پروجیکٹس میں حصہ لے سکوں، اور پیشہ ورانہ طور پر ترقی کر سکوں۔"
    },
    education: [
        {
            degree: "Bachelor in Computer Science",
            institution: "Information Technology University",
            year: "2022-present"
        },
        {
            degree: "Pre Engineering",
            institution: "Punjab group of colleges",
            year: "2020-2022"
        }
    ],
    skills: ["Problem Solving", "Teamwork", "C++", "Basic Python", "HTML, CSS"],
    projects: [
        { title: "Scientific Calculator in C#", description: "A calculator supporting advanced operations using C# and DSA concepts.", date: "Feb 2023" },
        { title: "Search Engine in C++", description: "A search engine prototype implementing Data Structures and Algorithms.", date: "Dec 2023" },
        { title: "Paint Brush in Python", description: "A simple paint application using OOP.", date: "May 2023" },
        { title: "Chess Game in C++", description: "A classic chess game using C++ and OOP concepts.", date: "Mar 2023" },
        { title: "Ludo in C++", description: "A multiplayer Ludo game using OOP in C++.", date: "May 2023" },
        { title: "Snake Game in C++", description: "A console-based snake game using OOP in C++.", date: "Jan 2023" },
        { title: "Gomoku Game in Python and C++", description: "A Gomoku board game developed with basic programming concepts.", date: "Nov 2022" },
        { title: "Shogi Game in C++", description: "A Japanese chess game built using programming fundamentals.", date: "Jan 2023" },
        { title: "12 Beads Game in C++", description: "A strategy-based 12 beads game created in the programming fundamentals course.", date: "Dec 2022" },
        { title: "Animation and Simulation in C++", description: "A simulation with basic animations using fundamental programming concepts.", date: "Dec 2022" }
    ],
    socialMediaFeed: [
        "https://www.youtube.com/embed/mxQOOMX4NQM",
        "https://www.youtube.com/embed/VfV4eV-HDWc",
        "https://www.youtube.com/embed/_kcmfvOTvZ0",
        "https://www.youtube.com/embed/yvK5YZT0gUM"
    ]
};

function populatePortfolio() {
    document.getElementById("name").textContent = portfolioData.name;
    document.getElementById("title").textContent = portfolioData.title;

    const contactInfo = document.getElementById("contact-info");
    contactInfo.innerHTML = `
        <a href="mailto:${portfolioData.contactInfo.email}">${portfolioData.contactInfo.email}</a>
        <br>
        <a href="${portfolioData.contactInfo.resume}">My Resume</a>
        <br>
        <a href="${portfolioData.contactInfo.linkedin}" target="_blank">Linkedin</a>
        <br>
        <a href="${portfolioData.contactInfo.github}" target="_blank">Github</a>
        <br>
        <a href="https://wa.me/${portfolioData.contactInfo.phone.replaceAll(" ", "")}">${portfolioData.contactInfo.phone}</a>
    `;

    document.getElementById("about-me").textContent = portfolioData.aboutMe['en'];

    const educationContainer = document.getElementById("education");
    portfolioData.education.forEach(edu => {
        educationContainer.innerHTML += `
            <p><b>${edu.degree}</b> - ${edu.institution} (${edu.year})</p>
        `;
    });

    const skillsContainer = document.getElementById("skills");
    portfolioData.skills.forEach(skill => {
        skillsContainer.innerHTML += `<ul><li>${skill}</li></ul>`;
    });

    const projectsContainer = document.getElementById("projects-list");
    portfolioData.projects.forEach(project => {
        projectsContainer.innerHTML += `
            <div class="proj">
                <h1>${project.title}</h1>
                <p>${project.description} <br> Completed in ${project.date}.</p>
            </div>
        `;
    });

    const socialMediaContainer = document.getElementById("social-media");
    portfolioData.socialMediaFeed.forEach(videoUrl => {
        socialMediaContainer.innerHTML += `
            <iframe width="320" height="190" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
        `;
    });
}

const languageLinks = document.querySelectorAll('[data-language]');
const aboutMe = document.getElementById('about-me');

languageLinks.forEach(link => {
    link.addEventListener('click', () => {
        const selectedLanguage = link.getAttribute('data-language');
        aboutMe.textContent = portfolioData.aboutMe[selectedLanguage];
    });
});

document.addEventListener("DOMContentLoaded", populatePortfolio);
