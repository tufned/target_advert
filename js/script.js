const navBar = document.querySelector('.nav-bar');

const whyArrow = document.querySelector('.why-target-arrow');
const whyTextShell = document.querySelector('.why-target-shell');
const whyText = document.querySelector('.why-target-text');

const aboutText = document.querySelector('.about-text');

const howTitle = document.querySelector('#how-it-works h2');
const antiRevealHowText = document.querySelector('.anti-reveal-how-text');
const howText_all = document.querySelectorAll('.how-text-area p');


const homeSec = document.getElementById('home');
const aboutTargetSec = document.getElementById('about-target');
const servicesSec = document.getElementById('services');
const howItWorksSec = document.getElementById('how-it-works');
const portfolioSec = document.getElementById('portfolio');
const contactSec = document.getElementById('contact');

const navbarBut = document.querySelectorAll('.middle-but-shell');


const screenHeight = window.innerHeight;




// ----------------- smooth scrolling -----------------
const links = document.querySelectorAll('a[href*="#"]');

for (let link of links) {
    const link_href = link.getAttribute('href');
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link_href).scrollIntoView({
            block: "start",
            behavior: "smooth"
        });
    });
}




window.addEventListener('scroll', () => {
    // ----------------- navbar -----------------
    navbarBut.forEach(elem => {
        if (elem.href.includes('#about-target') && aboutTargetSec.getBoundingClientRect().top < 300 && servicesSec.getBoundingClientRect().top > 300) {
            elem.classList.add('middle-but-shell_active');
        }
        else if (elem.href.includes('#services') && servicesSec.getBoundingClientRect().top < 300 && howItWorksSec.getBoundingClientRect().top > 300) {
            elem.classList.add('middle-but-shell_active');
        }
        else if (elem.href.includes('#how-it-works') && howItWorksSec.getBoundingClientRect().top < 300 && portfolioSec.getBoundingClientRect().top > 300) {
            elem.classList.add('middle-but-shell_active');
        }
        else if (elem.href.includes('#portfolio') && portfolioSec.getBoundingClientRect().top < 300 && contactSec.getBoundingClientRect().top > 300) {
            elem.classList.add('middle-but-shell_active');
        }
        else {
            elem.classList.remove('middle-but-shell_active');
        }
    });




    // ----------------- why section -----------------
    if (window.scrollY > 50) {
        whyArrow.classList.add('why-target-arrow_active');
    } else {
        whyArrow.classList.remove('why-target-arrow_active');
    }


    if (whyTextShell.getBoundingClientRect().top <= 160) {
        whyText.classList.add('why-target-text_active');
    } else {
        whyText.classList.remove('why-target-text_active');
    }


    // ----------------- how section -----------------
    if (antiRevealHowText.getBoundingClientRect().top < 670) {
        for (let i = 0; i < howText_all.length; i++) {
            if (i != howText_all.length - 1) howText_all[i].style.opacity = 0;
            else howText_all[i].classList.add('how-span-anim_hide');
        }
        antiRevealHowText.style.opacity = 0;
        howTitle.style.opacity = 0;
    } else {
        for (let i = 0; i < howText_all.length; i++) {
            if (i != howText_all.length - 1) howText_all[i].style.opacity = 1;
            else howText_all[i].classList.remove('how-span-anim_hide');
        }
        antiRevealHowText.style.opacity = 1;
        howTitle.style.opacity = 1;
    }



    // ----------------- reveal -----------------
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        const revealPos = reveals[i].getBoundingClientRect().top;
        const revealPoint = -80;

        if (revealPos < screenHeight - revealPoint) {
            reveals[i].classList.add('reveal-active');
        } else {
            reveals[i].classList.remove('reveal-active');
        }
    }
});









// ----------------- portfolio section -----------------
const portfolioTitle = document.querySelector('.portfolio-title');

const projects = document.querySelector('.projects');
const project_all = document.querySelectorAll('.project');

const projectsClickableArea_left = document.querySelector('.projects-clickable-area-left');
const projectsClickableArea_right = document.querySelector('.projects-clickable-area-right');


const projectsWidth = projects.getBoundingClientRect().width;
const projectWidth = projectsWidth / (project_all.length - project_all.length * 5/100); // !!!????



let portfolioButPress = 0;
let bool = false;

projectsClickableArea_right.addEventListener('click', () => {
    portfolioCursorBut.classList.add('portfolio_cursor-but_pressed');
    
    if (portfolioButPress == 0) {
        portfolioTitle.style.color = '#bbbbbd';
        project_all[1].classList.remove('project-2');
        project_all[2].classList.remove('project-3');
        projects.classList.add('projects-active');

        projectsClickableArea_right.classList.add('projects-clickable-area-right_active');
        projectsClickableArea_left.classList.add('projects-clickable-area-left_active');
    }

    if (portfolioButPress < project_all.length-2 && bool == true) portfolioButPress++;
    projects.style.transform = `translateX(-${projectWidth * portfolioButPress}px)`;

    bool = true;
});

projectsClickableArea_left.addEventListener('click', () => {
    if (portfolioButPress == 0) {
        portfolioTitle.style.color = '#000';
        project_all[1].classList.add('project-2');
        project_all[2].classList.add('project-3');
        bool = false;
        projects.classList.remove('projects-active');

        projectsClickableArea_right.classList.remove('projects-clickable-area-right_active');
        projectsClickableArea_left.classList.remove('projects-clickable-area-left_active');
    }

    if (portfolioButPress > 0) portfolioButPress--;
    projects.style.transform = `translateX(-${projectWidth * portfolioButPress}px)`;

    // portfolioCursorBut.classList.remove('portfolio_cursor-but_pressed');
});




// portfolio cursor
const portfolioCursorBut = document.querySelector('.portfolio_cursor-but');

const projectsClickableArea_all = document.querySelectorAll('.projects-clickable-area');
const projectsArea = document.querySelectorAll('.projects-area');


projectsClickableArea_all.forEach(elem => {
    elem.addEventListener('mouseenter', e => {
        if (elem.classList.contains('projects-clickable-area-left')) {
            portfolioCursorBut.style.transform = 'translate(-50%, -50%) rotate(180deg)';
        }
        else if (elem.classList.contains('projects-clickable-area-right')) {
            portfolioCursorBut.style.transform = 'translate(-50%, -50%) rotate(0)';
        }
        portfolioCursorBut.style.opacity = '1';
    });
    elem.addEventListener('mousemove', e => {
        portfolioCursorBut.style.top = `${e.clientY}px`;
        portfolioCursorBut.style.left = `${e.clientX}px`;
    });
    elem.addEventListener('mouseleave', e => {
        portfolioCursorBut.style.opacity = '0';
    });
});

document.addEventListener('touchstart', () => {portfolioCursorBut.style.display = 'none'});
document.addEventListener('touchmove', () => {portfolioCursorBut.style.display = 'none'});
document.addEventListener('touchend', () => {portfolioCursorBut.style.display = 'none'});








// services ( for contact )
const orderBut_all = document.querySelectorAll('.order-but');

const contactService_all = document.querySelectorAll('.contact-service-shell');


orderBut_all.forEach(btn => {
    btn.addEventListener('click', () => {
        contactService_all.forEach(ckeckbox => {
            if (btn.id == 'analyse' && ckeckbox.classList.contains('contact-service-analyse')) {
                ckeckbox.querySelector('.checkbox-filled').classList.add('checkbox-filled_active');
            }
            else if (btn.id == 'target' && ckeckbox.classList.contains('contact-service-target')) {
                ckeckbox.querySelector('.checkbox-filled').classList.add('checkbox-filled_active');
            }
            else if (btn.id == 'banners' && ckeckbox.classList.contains('contact-service-banners')) {
                ckeckbox.querySelector('.checkbox-filled').classList.add('checkbox-filled_active');
            }
        })
    });
});






// contact
const contactInput_all = document.querySelectorAll('.contact-input');
const submitBut = document.querySelector('.submit-but');

let inputsChecked = [0, 0, 0];



contactInput_all.forEach(input => {
    input.addEventListener('change', () => {
        if (input.value.length > 0) {
            input.classList.add('contact-input_active');
        }
        else input.classList.remove('contact-input_active');



        if (input.classList.contains('contact-input-name')) {
            if (input.value.length > 2) {
                inputsChecked[0] = 1;
            } 
            else inputsChecked[0] = 0;
        }
        if (input.classList.contains('contact-input-email')) {
            if (input.value.includes('@') && input.value.includes('.')) {
                inputsChecked[1] = 1;
            } 
            else inputsChecked[1] = 0;
        }


        inputsCheckedFunc();
    });
});



contactService_all.forEach(elem => {
    elem.addEventListener('click', () => {
        const checkbox = elem.querySelector('.checkbox-filled');

        if (checkbox.classList.contains('checkbox-filled_active') != false) {
            checkbox.classList.remove('checkbox-filled_active');
        }
        else {
            checkbox.classList.add('checkbox-filled_active');
        }


        let checkboxChecked = [0, 0, 0];
        for (let i = 0; i < contactService_all.length; i++) {
            const checkbox = contactService_all[i].querySelector('.checkbox-filled');
    
            if (checkbox.classList.contains('checkbox-filled_active')) {
                checkboxChecked[i] = 1;
            }
            else {
                checkboxChecked[i] = 0;
            }
        }
        
        if (checkboxChecked.includes(1)) {
            inputsChecked[2] = 1;
        }
        else inputsChecked[2] = 0;

        inputsCheckedFunc();
    });
});





function inputsCheckedFunc() {
    if (inputsChecked[0] == 1 && inputsChecked[1] == 1 && inputsChecked[2] == 1) {
        submitBut.classList.add('submit-but_active');

    }
    else {
        submitBut.classList.remove('submit-but_active');
    }
}