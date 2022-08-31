'use strict';

window.addEventListener("DOMContentLoaded", () => {

//Tabs of About my self section
const tabsSwitcher = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontainer__content'),
      tabsParent = document.querySelector('.tabheader__items');

function hideTabsContent() {
    tabsContent.forEach(tab => {
        tab.classList.add('hide');
        tab.classList.remove('show', 'fade');

        tabsSwitcher.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    });
}

function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');

    tabsSwitcher[i].classList.add('tabheader__item_active');
}

hideTabsContent();
showTabContent();

tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if(target && target.classList.contains('tabheader__item')) {
        tabsSwitcher.forEach((item, i) => {
            if(target == item) {
                hideTabsContent();
                showTabContent(i);
            }
        });
    }
});

//Modal window

const modalWindowTrigger = document.querySelectorAll('[data-modal]'),
      modalWindow = document.querySelector('.modal');

function openModalWindow() {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
}

modalWindowTrigger.forEach(item => {
    item.addEventListener('click', openModalWindow);
});

function closeModalWindow() {
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
}

modalWindow.addEventListener('click', (e) => {
    if(e.target === modalWindow || e.target.getAttribute('data-close') == '') {
        closeModalWindow();
    }
});

document.addEventListener('keydown', (e) => {
    if(e.code === 'Escape' && modalWindow.classList.contains('show')) {
        closeModalWindow();
    }
});




//Slider
const slides = document.querySelectorAll('.slider__slide'),
      slider = document.querySelector('.slider'),
      prev = document.querySelector('.slider__counter-prev'),
      next = document.querySelector('.slider__counter-next'),
      current = document.querySelector('#current'),
      total = document.querySelector('#total'),
      slidesWrapper = document.querySelector('.slider__wrapper'),
      slidesViewport = document.querySelector('.slider__inner'),
      width = window.getComputedStyle(slidesWrapper).width;

      

let slideIndex = 1;
let slideOffset = 0;

if(slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
}

slidesViewport.style.width = 100 * slides.length + '%';
slidesViewport.style.display = 'flex';
slidesViewport.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slider.style.position = 'relative';

const indicators = document.createElement('ol');
const dots = [];

indicators.classList.add('carousel-indicators');
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 25%;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;

slider.append(indicators);

for(let i = 0; i<slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;

        if(i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
}

next.addEventListener('click', () => {
    console.log(slideOffset);
    if(slideOffset == +width.slice(0, width.length - 2) * (slides.length - 1)) { //slice() to cut px
        slideOffset = 0;
    } else {
        slideOffset += +width.slice(0, width.length - 2);
    }

    slidesViewport.style.transform = `translateX(-${slideOffset}px)`;

    if(slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = '1.0';
});

    prev.addEventListener('click', () => {
        if(slideOffset == 0) {
            slideOffset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            slideOffset -= +width.slice(0, width.length - 2);
        }

        slidesViewport.style.transform = `translateX(-${slideOffset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1.0';

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            slideOffset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesViewport.style.transform = `translateX(-${slideOffset}px)`;

            if(slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1; 
        });
    });







//Burger menu
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if(iconMenu) {
    iconMenu.addEventListener('click', function(e) {
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        document.body.classList.toggle('_lock');
    });
}


//scrolling to section

const menuLinks = document.querySelectorAll('.menu__link');
// console.log(menuLinks);
if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });    
}

function onMenuLinkClick(e) {
    const menuLink = e.target;
    // console.log(menuLink);
    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector('.header').offsetHeight;

        if(iconMenu.classList.contains('_active')) {
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
            document.body.classList.remove('_lock');
        }

        window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
        });
        e.preventDefault();
    }
}
});



