import gsap from "gsap/all";
/**
 * Появление со шторкой картинки и последущий паралакс
 * @param {string} selector - селекторы картинок для анимации
 * @param {string} curtainColor - Цвет шторки появления
 */
export default function paralax(selector, curtainColor) {
    const paralaxImages = document.querySelectorAll(selector)
    paralaxImages.forEach((image) => {

        const wrap = document.createElement('div');
        const complexInnerTitle = image.parentElement.querySelector('.title-inner-page');
        wrap.style.overflow = 'hidden';

        
        const curtain = document.createElement('div');
        wrap.classList.add('image-with-curtain-in');
        // console.log();
        curtain.classList.add('curtain');
        wrap.append(curtain);
        const imageMarginLeft = getComputedStyle(image).marginLeft;
        // const imageMarginTop = getComputedStyle(image).marginTop;
        if (complexInnerTitle === null) {
            image.parentElement.prepend(wrap);
        } else {
            complexInnerTitle.insertAdjacentElement('afterend', wrap);
        }
        
        // gsap.set(image, { });
        
        // gsap.set(curtain, { marginTop: imageMarginTop })
        wrap.prepend(image);
        gsap.set(wrap, { marginLeft: imageMarginLeft });
        gsap.set(image, { marginLeft: 0, autoAlpha: 0});
        gsap.set(curtain, { 
            // position: 'relative',
            width: image.getBoundingClientRect().width,
            marginRight: getComputedStyle(image).marginRight,
            height: image.getBoundingClientRect().height,
            // backgroundColor: curtainColor ? curtainColor : '',
        })
        // gsap.set(image, { scale: 1.1 })
        gsap.timeline({
            scrollTrigger: {
                trigger: image,
                start: '20% bottom',
                once: true,
            }
        })
        .to(curtain, { scaleY: 1 })
        .to(curtain, { scaleY: 0, transformOrigin: '50% 0%' })
        .to(image, { autoAlpha: 1 }, '<')
        // .add(() => curtain.remove())
        gsap.timeline({
            ease: 'none',
            scrollTrigger: {
            trigger: wrap,
            scrub: 0.5,
            // markers: true,
            },
        })
            .fromTo(image, {
            y: 35,
            }, {
            y: -35,
            ease: 'linear',
            });
        });
}