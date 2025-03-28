/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('.nav__menu')
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('shadow-header')
                       : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/* ============== PROJECT POPUP ================ */
document.addEventListener("click", (e) => {
    const button = e.target.closest(".projects__button"); 
    if (button) {
        const projectsItem = button.closest(".projects__card");
        toggleProjectsPopup();
        projectsItemDetail(projectsItem);
    }
});

function toggleProjectsPopup() {
    document.querySelector(".projects__popup").classList.toggle("open");
}

document.querySelector(".projects__popup-close").addEventListener("click", toggleProjectsPopup);

function projectsItemDetail(projectsItem) {
    if (!projectsItem) {
        console.error("Không tìm thấy .projects__card");
        return;
    }

    const popupImage = projectsItem.getAttribute("data-popup-image") || projectsItem.querySelector(".projects__img").src;
    document.querySelector(".pp__thumbnail img").src = popupImage;

    const contentDetail = projectsItem.querySelector(".projects__content-detail");
    if (!contentDetail) {
        console.error("Không tìm thấy .projects__content-detail trong", projectsItem);
        return;
    }

    document.querySelector(".projects__popup-body").innerHTML = contentDetail.innerHTML;
}

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
    e.preventDefault();

    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    emailjs.send("service_firhis3", "template_7pkppgf", params, "jlCh7Vr71n0vHJ6_O")
        .then(() => {
            contactMessage.textContent = "Message sent successfully ✅";

            setTimeout(() => {
                contactMessage.textContent = "";
            }, 5000);

            contactForm.reset();
        })
        .catch((error) => {
            contactMessage.textContent = "Failed to send message ❌";
            console.error("EmailJS Error:", error);
        });
};

contactForm.addEventListener("submit", sendEmail);


contactForm.addEventListener('submit', sendEmail)
/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.getBoundingClientRect().top + window.scrollY - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }      
    })
}

window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal('.home__perfil, .about__image, .contact__mail', {origin: 'right'})
sr.reveal(
    '.home__name, .home__info, .about__container, ' +
    '.section__title-1, .about__info, ' +
    '.contact__social, .contact__data',
    { origin: 'left' }
  );
sr.reveal('.projects__card', {interval: 100})
