import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';
import gsap from 'gsap';
import axios from 'axios';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';
import animation from './modules/animation/animation.js';


/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.axios = axios;

/* eslint-disable-next-line */
const locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  // lerp: 1.05,
  smoothMobile: false,
  multiplier: 0.5,
  lerp: 0.05,
});
// locoScroll.destroy();
global.locoScroll = locoScroll;

window.addEventListener('load',function(evt){
  animation(locoScroll);
});
/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
const forms = ['[data-home-connection]', '[data-home-popup]'];
const formsWithRedirect = ['[data-popup-form]'];

const formsWithTel = ['[data-home-footer]'];

formsWithTel.forEach(form => {
  const $form = document.querySelector(form);
  // console.log(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: 'toster',
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
            }),
            rule: yup
              .string()
              .trim()
              .required(i18next.t('required'))
              .max(30)
              .matches(/^\D+$/, i18next.t('field_too_letter')),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });
    // $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
    //   $form.querySelector('[name="phone"]').focus();
    // }, false);
  }
});

formsWithRedirect.forEach(form => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          document.querySelector('.thanks-page').style.opacity = 1;
          setTimeout(() => {
            document.querySelector('.thanks-page').style.opacity = 0;
          }, 5000);
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
            }),
            rule: yup
              .string()
              .trim()
              .required(i18next.t('required'))
              .max(30, i18next.t('field_more_letter'))
              .matches(/^\D+$/, i18next.t('field_only_letter')),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),
            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });
    // $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
    //   $form.querySelector('[name="phone"]').focus();
    // }, false);
  }
});

forms.forEach(form => {
  const $form = document.querySelector(form);
  // console.log(form);
  // console.log($form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          document.querySelector('.thanks-page').style.opacity = 1;
          setTimeout(() => {
            document.querySelector('.thanks-page').style.opacity = 0;
          }, 5000);
          setTimeout(() => {
            document.querySelector('#popup').classList.remove('active');
          }, 500);
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
            }),
            rule: yup
              .string()
              .trim()
              .required(i18next.t('required'))
              .max(30, i18next.t('field_more_letter'))
              .matches(/^\D+$/, i18next.t('field_only_letter')),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(17, i18next.t('field_too_short', { cnt: 17 - 5 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });

    // $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
    //   $form.querySelector('[name="phone"]').focus();
    // }, false);
  }
});

/*
 * form handlers end
 */
function disableScroll() {
  const containersScroll = document.querySelectorAll('[data-disable-page-scroll]');
  containersScroll.forEach(block => {
    block.addEventListener('mouseenter', () => {
      locoScroll.stop();
    });
    block.addEventListener('mouseleave', () => {
      locoScroll.start();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  disableScroll();
  // locoScroll.update();
});
/** ******************************* */

const blockForUpdatingLocoScroll = document.querySelectorAll('.contact');
blockForUpdatingLocoScroll.forEach(image => {
  const callback = function(entries, observer) {
    /* Content excerpted, show below */
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        locoScroll.update();
        observer.unobserve(image);
      }
    });
  };
  // eslint-disable-next-line no-undef
  const observer = new IntersectionObserver(callback, {});
  const target = image;
  observer.observe(target);
});

const $pageUp = document.querySelectorAll('.pageup');
$pageUp.forEach(arrow => {
  const scroller = locoScroll !== undefined ? locoScroll : window;
  arrow.addEventListener('click', () => {
    scroller.scrollTo(0, 0);
  });
});
