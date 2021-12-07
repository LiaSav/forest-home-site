import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import splitToLinesAndFadeUp from './effect/splitToLinesAndFadeUp';
import paralax from './effect/paralax.js';
import {throttle, debounce} from '../helpers/helpers';
import paralaxNoOverflow from './effect/paralaxNoOverflow';
import clipPathEntry from './effect/clipPathEntry';
import menuLinksEffect from './menu';
import fadeInUp from './effect/fadeInUp';
import screen1ChangeSlider from './screen1ChangeSlider';
import section7HoverImage from './section7HoverImage';
import socialIconsParalax from './socialIconsParalax';

export default function animation(scroller) {
    gsap.registerPlugin(ScrollTrigger);
    scroller.on("scroll", ScrollTrigger.update);
    
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector(".page__inner").style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener('refresh', () => window.locoScroll.update());
    ScrollTrigger.refresh();

    menuLinksEffect();
    splitToLinesAndFadeUp('.section-1__text', 2.35);
    splitToLinesAndFadeUp('.title, .section-4__right .text');


    fadeInUp('.footer-contacts__right-item, .section-2__left .text, .section-3__left .text,.section-5 .text, .section-5 .small-text, .section-3__left .small-text');
    fadeInUp('footer form .form-field, footer form .small-text, footer form .form-btn-wrap');
    if (window.location.pathname.match(/planning/g)) {
        paralax('.planning-1__img');
        splitToLinesAndFadeUp('.title-inner-page');
        fadeInUp('.planning-2 .text, .planning-3 .text');
    }


    /**Complex blocksAnim */
    function blockComplexAnim(wrapper, trigger, elemToAnim) {
        // const block2 = document.querySelector('.complex-2');
        const block2 = document.querySelector(wrapper);
        gsap.timeline({
            scrollTrigger: {
                // trigger: '.complex-2__img',
                trigger: trigger,
                scrub: true,
                // end: '50% 50%'
            }
        })
        // .from('.complex-2__wrapper', { yPercent: -50 })
        .fromTo(elemToAnim, { y: -80 }, { y: 20 })
    }
    if (window.location.pathname.match(/complex/g)) {
        blockComplexAnim('.complex-2','.complex-2__img','.complex-2__wrapper');
        blockComplexAnim('.complex-3','.complex-3__img','.complex-3__wrapper');
        blockComplexAnim('.complex-4','.complex-4__img','.complex-4__wrapper');
        blockComplexAnim('.complex-5','.complex-5__img','.complex-5__wrapper');
        fadeInUp('.complex-2 .italic-title, .complex-2 .text, .complex-2 .big-text');
        fadeInUp('.complex-3 .italic-title, .complex-3 .text, .complex-3 .big-text');
        fadeInUp('.complex-4 .italic-title, .complex-4 .text, .complex-4 .big-text');
        fadeInUp('.complex-5 .italic-title, .complex-5 .text, .complex-5 .big-text');
    }


    function loaderAnimation() {
        if (sessionStorage.getItem('loader') !== null) {
            return undefined;
        }
        const loader = document.querySelector('.loader-wrap');
        const headerLogo = document.querySelector('.header__logo img');
        const loaderText = loader.querySelector('.loader-wrap__text');
        const headerScaleCoef = loaderText.getBoundingClientRect().width / headerLogo.getBoundingClientRect().width;
        return gsap.timeline()
            .set(headerLogo, { scale: headerScaleCoef, autoAlpha: 0 })
            .to(loader.querySelector('img'), {
                clipPath: 'polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)',
                ease: 'power4.out',
                duration: 2.35
            })
            .to(loader, { yPercent: -100 })
            .to('.loader-wrap img', { autoAlpha: 0, duration:0.1 }, '<')
            .to('.header__logo img', { autoAlpha: 1, duration:0.1 }, '<')
            .add(() => {
                sessionStorage.setItem('loader', true);
            }, '<')

    }
    // loaderAnimation();

    const headerAnimWithoutPreloader = gsap.timeline({ 
        paused: true,
        defaults: {
            ease: 'power3.out',
            duration : 2.5,
            clearProps: 'transform'
        }
    })
        .fromTo('.header__left>*', { 
            xPercent: -100,autoAlpha:0
        }, {
            xPercent: 0,
            autoAlpha: 1
        },"<75%")
        .fromTo('.header__right>*', { 
            xPercent: 100,autoAlpha:0
        }, {
            xPercent: 0,
            autoAlpha: 1
        },'<')
        .fromTo('.section-1__text', { 
            xPercent: -100,autoAlpha:0
        }, {
            xPercent: 0,
            autoAlpha: 1
        },'<')
        .fromTo('.section-1__scroll', { 
            x: '30vw',autoAlpha:0
        }, {
            x: 0,
            autoAlpha: 1
        },'<')
        .fromTo('.section-1__social', { 
            x: 100,autoAlpha:0
        }, {
            x: 0,
            clearProps: 'all',
            autoAlpha: 1
        },'<')
        ;
    if (sessionStorage.getItem('loader') === null) {
        window.ttl1 = gsap.timeline({
            defaults: {
                ease: 'power3.out',
                duration : 2.5
            }
        })
            .add(loaderAnimation())
            
            .fromTo('.header__left>*', { 
                xPercent: -100,autoAlpha:0
            }, {
                xPercent: 0,
                autoAlpha: 1
            },"<75%")
            .fromTo('.header__right>*', { 
                xPercent: 100,autoAlpha:0
            }, {
                xPercent: 0,
                autoAlpha: 1
            },'<')
            .fromTo('.section-1__text', { 
                xPercent: -100,autoAlpha:0
            }, {
                xPercent: 0,
                autoAlpha: 1
            },'<')
            .fromTo('.header__logo img', { 
                yPercent: 300,
            }, {
                yPercent: 0,
                scale: 1,
                autoAlpha: 1
            },'<');
    } else {
        document.querySelector('.loader-wrap') && document.querySelector('.loader-wrap').remove();
        headerAnimWithoutPreloader.play();
    }

    screen1ChangeSlider();

    function buttonMenuEffect(selector) {
        const button = document.querySelector(selector);
        const parent = button.parentElement;
        let scaleCoef = parent.getBoundingClientRect().width / button.getBoundingClientRect().width;
        if (isNaN(scaleCoef)) scaleCoef = 3.25;
        // console.log(scaleCoef);
        button.addEventListener('mouseenter', () => {
            gsap.timeline({
                defaults: {
                    ease: 'power4.out'
                }
            })
            .to(button.querySelector('svg'), {
                scaleX: 0.4,
                duration: 0.1
            })
            .to(button, {
                borderRadius: 0,
                scaleX: scaleCoef,
            },'<')
        })
        button.addEventListener('mouseleave', () => {
            gsap.timeline({
                defaults: {
                    ease: 'power4.out'
                }
            })
            .to(button.querySelector('svg'), {
                scaleX: 1,
                duration: 0.1
            })
            .to(button, {
                borderRadius: '50%',
                scaleX: 1,
            },'<')
        })

    }
    buttonMenuEffect('.header__right-burg');
    buttonMenuEffect('.menu-top__right-burg');

    gsap.timeline({
        scrollTrigger: {
            trigger: '.section-4__left',
            scrub: true,
        }
    })
    .from('.section-4__left-img', {
        yPercent: 100
    })
    gsap.timeline({
        scrollTrigger: {
            trigger: '.section-3__right',
            scrub: true,
        }
    })
    .from('.section-3__right-img', {
        yPercent: 100
    });


    document.querySelector('.section-3') && gsap.timeline({
        scrollTrigger: {
            trigger: '.section-3',
            scrub: true,
            start: '20% bottom',
            end: '50% bottom',
        }
    })
        .fromTo(
            '.section-3 .title span, .section-3 .subtitle', 
            {   color: '#26262C'     },
            { color: '#fff' }
        )
    
    paralax('.section-4__left-bg, .section-3__right-bg', '#fff');
    paralax('.complex-1__item img, .complex-2__item img, .complex-3__item img, .complex-4__item img, .complex-5__item img');
    paralax('.complex-1__img, .complex-2__img, .complex-3__img, .complex-4__img, .complex-5__img');
    section7HoverImage();


    function handleHeader(e) {
        const direction = scroller.lastDeltaY > e.delta.y ? -1 : 1;
        // console.log(scroller.lastDeltaY, e.delta.y);
        if (scroller.lastDeltaY === e.delta.y) return;
        if (e.delta.y < 150)  {
            showHeader();
            return;
        };
        direction>0 ? hideHeader() : showHeader();
        scroller.lastDeltaY = e.delta.y;
    };
    function hideHeader() {
        gsap.to('.header', { yPercent: -100 })
    }
    function showHeader() {
        gsap.to('.header', { yPercent: 0 })
    }
    const throttleTime = 1000;
    const handleHeaderDeounced = throttle(handleHeader, throttleTime);
    scroller.on('scroll', handleHeaderDeounced);

    /**Menu Anim */
    function menuHandler(){
        const call = document.querySelector('.header__right-button-menu');
        const close = document.querySelector('.menu-top__right-button-menu');
        const menu = document.querySelector('.menu');
        const links = menu.querySelectorAll('.menu-main__left-links a');
        const rightBlocks = menu.querySelectorAll('.menu-main__right-item');
        // const heightofRightBlocks 
        call.addEventListener('click', openMenu);
        close.addEventListener('click', closeMenu);
        function openMenu() {
            gsap.timeline({
                defaults: {
                    ease: 'power4.out',
                    duration: 1.75,
                }
            })
                .fromTo(menu, 
                    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
                    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
                )
                .fromTo(rightBlocks, { skewX: 5, yPercent: -100, }, { skewX: 0, yPercent: 0, stagger: 0.1 }, '<')
                .fromTo(links, { skewX: 5, yPercent: -100, }, { skewX: 0, yPercent: 0, stagger: 0.1 }, '<')
        }
        function closeMenu() {
            gsap.timeline()
                .add(() => menu.classList.add('active'))
                .fromTo(menu, 
                    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
                    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
                )
                .fromTo(rightBlocks, 
                    { skewX: 0, yPercent: 0, }, 
                    {  skewX: 5, yPercent: -100,stagger: 0.1 }, 
                    '<'
                    )
                .fromTo(links, 
                    { skewX: 0, yPercent: 0, }, 
                    { skewX: 5, yPercent: -100, stagger: 0.1 }, 
                    '<'
                    )
        }
        
    }
    menuHandler();
    /**Menu Anim END */

    
    clipPathEntry('.complex-2__item img, .complex-5__img, complex-3__item img, complex-4__item img, complex-5__item img');
    paralaxNoOverflow('.complex-5-bg, .complex-1-bg, .complex-2-bg, .complex-3-bg, .complex-4-bg');
    
    socialIconsParalax('.section-1__social a', scroller);



    function footerColorEffect(){
        const footer = document.querySelector('.footer-contacts')
        if (footer === null) return;
        gsap.timeline({
            scrollTrigger: {
                trigger: footer,
                scrub: true,
                start: '0% bottom',
                end: '50% bottom',
            }
        })
        .fromTo(footer, { backgroundColor: 'rgba(255,255,255,1)' }, { ease: 'power4.out', backgroundColor: 'rgba(255,255,255,0)' })
    }

    if (!window.location.pathname.match(/complex/g)) {
        footerColorEffect();
    }
    

    const section1 = document.querySelector('.section-1__scroll');
    section1 && section1
        .addEventListener('click', () => {
            scroller.scrollTo(section1.closest('section').nextElementSibling)
        })
    function scrollInnertia(scroller) {
        if (document.querySelector('.section-7__item') === null) return;
        let some = 0;
        let isAnim = false;
        const maxSkewValue = -25;
        scroller.on('scroll', () => {
            if (isAnim === true) return;
            gsap.timeline()
                .add(() => isAnim = true)
                .to('.section-7__item', { duration: 1,  skewX: maxSkewValue })
                .to('.section-7__item', { duration: 1,  skewX: 0,delay: 0.5 })
                .add(() => isAnim = false)
            some += 1;
            // someDeb();
        })
    }

    // function screen7LinksHoverEffect
    scrollInnertia(scroller);



    function digitsSvgHover() {
        const withDigits = document.querySelectorAll('.section-6 .section-6__left svg, .section-6 .section-6__right svg');
        withDigits.forEach(svg => {
            const pathToAnimate = Array.from(svg.querySelectorAll('path:nth-child(-n+2)')).reverse();
            svg.addEventListener('mouseenter', () => {
                console.log();
                gsap.to(pathToAnimate, { 
                    y: (index,t) => -10 * (index + 1),
                })
            })
            svg.addEventListener('mouseleave', () => {
                gsap.to(pathToAnimate, { y: 0 })
            })
        })
    }
    digitsSvgHover();
    function section2PinBgChange() {
        const section = document.querySelector('.section-2');
        const section5 = document.querySelector('.section-5');
        const pinEl = document.createElement('div');
        pinEl.setAttribute('data-screen2-pin', '');
        section.append(pinEl);
        gsap.timeline({
            scrollTrigger: {
                trigger: section,
                pin: pinEl,
                scrub: true,
                endTrigger: section5,
            }
        })
        .to(pinEl, { backgroundColor:  '#26262C', duration: 0.1},'-=25%')
        .to(pinEl, { backgroundColor:  '#26262C', duration: 0.1})
        .to(pinEl, { backgroundColor:  '#26262C', duration: 0.1})
        .to(pinEl, { backgroundColor:  '#26262C', duration: 0.1})
        .to(pinEl, { backgroundColor:  '#26262C', duration: 0.1})
        .to(pinEl, { backgroundColor:  '#26262C', duration: 0.1})
        .to(pinEl, { backgroundColor:  '#fff', duration: 0.1})
        // .to(pinEl, { backgroundColor:  '#fff', duration: 0.1})
    }
    section2PinBgChange();
}