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

let ishomeSec = true;
let isMobile = false;




// mobile (ontouch)
document.addEventListener('touchstart', onTouch);

function onTouch() {
    document.removeEventListener('touchstart', onTouch);
    isMobile = true;
}




// ----------------- smooth scrolling -----------------
const links = document.querySelectorAll('a[href*="#"]');

for (let link of links) {
    const link_href = link.getAttribute('href');
    link.addEventListener('click', e => {
        if (navBar.hasAttribute('style')) {
            mobileNavbarIsActive = false;
            navBar.style = null;
        }

        e.preventDefault();
        if (link_href == '#portfolio') {
            document.querySelector(link_href).scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }
        else {
            document.querySelector(link_href).scrollIntoView({
                block: "start",
                behavior: "smooth"
            });
        }
    });
}




// ----------------- navbar mobile -----------------
const navbarMobileBut = document.querySelector('.navbar-mobile-but');
const navbarCloseBut = document.querySelector('.navbar_close-but');

let mobileNavbarIsActive = false;

navbarMobileBut.addEventListener('click', () => {
    navBar.style.transform = 'translateY(0)';
    setTimeout(() => {
        navBar.style.borderRadius = 0;
    }, 400);

    mobileNavbarIsActive =  true; 
    curPageScrollPos = window.scrollY;
    
    navbarCloseBut.addEventListener('click', onNavbarCloseBut);
});


function onNavbarCloseBut() {
    navBar.removeAttribute('style');
    mobileNavbarIsActive =  false; 
}






window.addEventListener('scroll', (e) => {
    // ----------------- navbar mobile scroll disable -----------------
    if (mobileNavbarIsActive) {
        window.scrollTo(0, curPageScrollPos);
    }



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








    if (window.scrollY < homeSec.offsetHeight) ishomeSec = true;
    else ishomeSec = false;






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
    // let howSecAntiRevealPoint = 740;
    let howSecAntiRevealPoint = 650;
    if (screenHeight >= 800) howSecAntiRevealPoint = 520;
    else if (screenHeight >= 768 && screenHeight < 800) howSecAntiRevealPoint = 630;
    else if (screenHeight >= 600 && screenHeight < 768) howSecAntiRevealPoint = 520;

    if (window.innerWidth < 480) howSecAntiRevealPoint = 580;
    // if (window.visualViewport.height >= 900) howSecAntiRevealPoint = 670;
    // if (window.visualViewport.height >= 1000) howSecAntiRevealPoint = 750;
    // console.log(window.visualViewport)

    if (antiRevealHowText.getBoundingClientRect().top < howSecAntiRevealPoint) {
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





    // portfolio (reset)
    if (portfolioSec.getBoundingClientRect().bottom < 0 || portfolioSec.getBoundingClientRect().top - screenHeight > 0) {
        projectsReset();
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





// ----------------- home page title on mousemove -----------------
const homeTitle = document.querySelector('.home-main-text');
const homeTitleBg = document.querySelector('.home-main-text_bg');

document.addEventListener('mousemove', e => {
    if (ishomeSec && isMobile == false) {
        homeTitle.style.transform = `translateX(${elemOnMouseMove(homeTitle, e, 30, false).x}px)`;

        homeTitleBg.style.transform = `translate(${elemOnMouseMove(homeTitleBg, e, 15, true).x}px, ${elemOnMouseMove(homeTitleBg, e, 15, true).y}px)`;
    } 
});



function elemOnMouseMove(elem, e, force, invert) {
    const elemCenterPos_x = elem.getBoundingClientRect().left + elem.getBoundingClientRect().width / 2;
    const elemCenterPos_y = elem.getBoundingClientRect().top + elem.getBoundingClientRect().height / 2;

    let mouse_x = 0;
    let mouse_y = 0;

    if (invert) {
        mouse_x = -(e.clientX - elemCenterPos_x);
        mouse_y = -(e.clientY - elemCenterPos_y);
    }
    else {
        mouse_x = e.clientX - elemCenterPos_x;
        mouse_y = e.clientY - elemCenterPos_y;
    }

    return {
        x: mouse_x / force,
        y: mouse_y / force,
    } 
}






// ----------------- portfolio section -----------------
const portfolioTitle = document.querySelector('.portfolio-title');

const projects = document.querySelector('.projects');
const project_all = document.querySelectorAll('.project');

const projectsClickableArea_left = document.querySelector('.projects-clickable-area-left');
const projectsClickableArea_right = document.querySelector('.projects-clickable-area-right');
const projectsClickableArea_mobile = document.querySelector('.projects-clickable-area_mobile');

const projectsWidth = projects.getBoundingClientRect().width;
const projectWidth = projectsWidth / (project_all.length - project_all.length * 5/100); // !!!????



let portfolioButPress = 0;
let isPressed = false;


function onProjectsClickableArea_right() {    
    if (portfolioButPress == 0) {
        portfolio_mobile();

        portfolioTitle.classList.add('portfolio-title_active');
        project_all[1].classList.remove('project-2');
        project_all[2].classList.remove('project-3');
        projects.classList.add('projects-active');

        projectsClickableArea_right.classList.add('projects-clickable-area-right_active');
        projectsClickableArea_left.classList.add('projects-clickable-area-left_active');
    }

    let portfolioButPress_max = project_all.length - 2;
    if (window.innerWidth < 768) {
        portfolioButPress_max = project_all.length - 1;
    }

    if (portfolioButPress < portfolioButPress_max && isPressed == true) portfolioButPress++;
    projects.style.transform = `translateX(-${projectWidth * portfolioButPress}px)`;

    isPressed = true;
}

function onProjectsClickableArea_left() {
    if (portfolioButPress == 0) {
        portfolioTitle.classList.remove('portfolio-title_active');
        project_all[1].classList.add('project-2');
        project_all[2].classList.add('project-3');
        isPressed = false;
        projects.classList.remove('projects-active');

        projectsClickableArea_right.classList.remove('projects-clickable-area-right_active');
        projectsClickableArea_left.classList.remove('projects-clickable-area-left_active');
    }

    if (portfolioButPress > 0) portfolioButPress--;
    projects.style.transform = `translateX(-${projectWidth * portfolioButPress}px)`;
}


projectsClickableArea_right.addEventListener('click', onProjectsClickableArea_right);
projectsClickableArea_left.addEventListener('click', onProjectsClickableArea_left);





function projectsReset() {
    for (let i = 0; i < portfolioButPress + 1; i++) {
        onProjectsClickableArea_left();
        console.log(portfolioButPress);
    }
}




// portfolio mobile
function portfolio_mobile() {
    if (isMobile) {
        projectsClickableArea_mobile.classList.add('projects-clickable-area_mobile_active');
    } else {
        projectsClickableArea_mobile.classList.remove('projects-clickable-area_mobile_active');
    }
}


let touchStart = 0;
let touchEnd = 0;

projectsClickableArea_mobile.addEventListener('touchstart', e => {
    touchStart = e.touches[0].clientX;
    projectsClickableArea_mobile.addEventListener('touchend', onTouchEnd);
});

function onTouchEnd(e) {
    projectsClickableArea_mobile.removeEventListener('touchend', onTouchEnd);
    touchEnd = e.changedTouches[0].clientX;

    if (touchEnd < touchStart) {
        onProjectsClickableArea_right();
    }
    else if (touchEnd > touchStart) {
        onProjectsClickableArea_left();
    }

    console.log(touchStart, touchEnd);
}





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

var contactForm_data = {
    name: '',
    email: '',
    contacts_extra: '',
    services: [],
    message: '',
};



contactInput_all.forEach(input => {
    input.addEventListener('change', () => {
        if (input.value.length > 0) {
            input.classList.add('contact-input_active');
        }
        else input.classList.remove('contact-input_active');



        if (input.classList.contains('contact-input-name')) {
            if (input.value.length > 2) {
                inputsChecked[0] = 1;
                contactForm_data.name = input.value.trim();
            } 
            else inputsChecked[0] = 0;
        }
        if (input.classList.contains('contact-input-email')) {
            if (input.value.includes('@') && input.value.includes('.')) {
                inputsChecked[1] = 1;
                contactForm_data.email = input.value.trim();
            } 
            else inputsChecked[1] = 0;
        }
        if (input.classList.contains('contact-input-extra-contacts')) {
            contactForm_data.contacts_extra = input.value.trim();
        }


        inputsCheckedFunc();
    });
});




let checkboxServices = [];

contactService_all.forEach(elem => {
    elem.addEventListener('click', () => {
        const checkbox = elem.querySelector('.checkbox-filled');

        if (checkbox.classList.contains('checkbox-filled_active')) {
            checkbox.classList.remove('checkbox-filled_active');
        }
        else {
            checkbox.classList.add('checkbox-filled_active');
        }
 


        let checkboxChecked = [0, 0, 0];
        checkboxServices = [];

        for (let i = 0; i < contactService_all.length; i++) {
            const checkbox = contactService_all[i].querySelector('.checkbox-filled');
            const contactService_text = contactService_all[i].querySelector('.checkbox-label').innerHTML;
            
            if (checkbox.classList.contains('checkbox-filled_active')) {
                checkboxChecked[i] = 1;

                if (contactForm_data.services.includes(contactService_text) == false) checkboxServices.push(contactService_text);
            }
            else {
                if (contactForm_data.services.includes(contactService_text)) checkboxServices.splice(i, 1);
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
        submitBut.addEventListener('click', onSubmitFrom);
    }
    else {
        submitBut.classList.remove('submit-but_active');
        submitBut.removeEventListener('click', onSubmitFrom);
    }
}



const contactInput_textarea = document.querySelector('.contact-input-textarea');
const submitPopup = document.querySelector('.submit-popup');


function onSubmitFrom (e) {
    e.preventDefault();

    contactForm_data.message = contactInput_textarea.value;
    contactForm_data.services = checkboxServices.join(' + ');

    console.log(contactForm_data);

    emailjs.send('targetAd_landing', 'template_nhub7rt', contactForm_data)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
           onFormSuccess();
        }, function(error) {
           console.log('FAILED...', error);
           onFormError();
        });
}



function onFormSuccess() {
    contactInput_all.forEach(elem => {
        elem.value = '';
    })
    contactService_all.forEach(elem => {
        const checkbox = elem.querySelector('.checkbox-filled');

        if (checkbox.classList.contains('checkbox-filled_active')) {
            checkbox.classList.remove('checkbox-filled_active');
        }
    })
    contactInput_textarea.value = '';

    submitPopup.classList.add('submit-popup_active');
    setTimeout(() => {
        submitPopup.classList.remove('submit-popup_active');
    }, 13000);
}


function onFormError() {
    const submitPopup_img = submitPopup.querySelector('.submit-popup_img');
    const submitPopup_title = submitPopup.querySelector('.submit-popup_text-area h4');
    const submitPopup_extraText = submitPopup.querySelector('.submit-popup_text-area p');

    submitPopup_img.src = './assets/icons/close-circle-svgrepo-com_red.svg';
    submitPopup_title.innerHTML = 'Не вдалося відправити заяву';
    submitPopup_extraText.innerHTML = 'Спробуйте, будь ласка, пізніше';

    submitPopup.classList.add('submit-popup_active');
    setTimeout(() => {
        submitPopup.classList.remove('submit-popup_active');
    }, 13000);
}