import { gsap } from "gsap"
import { SlowMo } from "gsap/EasePack";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getTranslations } from "./_translations.js"
gsap.registerPlugin(ScrollTrigger, SlowMo)

// TRANSLATION
window.locale = "zh"
window.translations = getTranslations()
window.i18n = function(string) {
  return window.translations[`${window.locale}`][`${string}`];
}
console.log(window.translations)

// LOADING
let progress = 0
let images = document.querySelectorAll('img')
let image_count = images.length
let percent_per_image = 100 / image_count
let percent_text = document.querySelector('#loading_text')
let loading = document.querySelector('#loading')

images.forEach(img => {
  img.addEventListener('load', () => {
    progress += percent_per_image
    let percent = Math.round(progress)
    percent_text.innerHTML = percent
  })
})

window.addEventListener('load', () => {
  percent_text.innerHTML = 100
  setTimeout(() => {
    loading.style.opacity = '0'
  }, 1000);
  setTimeout(() => {
    loading.style.display = 'none'
  }, 1500);
  // loading end

  // LAZY LOAD IMG
  document.querySelectorAll('[data-src]').forEach(el => {
    el.setAttribute('src', el.dataset.src)
  })

  //取得裝置寬
  window.currentWidth = getViewWidth()
  //變換裝置寬度時重整頁面
  window.addEventListener('resize', (e) => {
    let newWidth = getViewWidth()
    if (newWidth !== currentWidth) {
      location.reload()
    }
  })

  // TOGGLE LANG
  const langSet = document.querySelector('.js-lang-set')
  const toZh = document.querySelector('.js-zh')
  const toEn = document.querySelector('.js-en')
  
  toZh.addEventListener('click', () => {
    if(langSet.classList.contains('en')) {
      langSet.classList.remove('en')
      document.body.classList.remove('en')
      window.locale = "zh"
      // translate all text feilds to zh
      document.querySelectorAll('[data-field]').forEach(el => {
        el.innerHTML = i18n(el.dataset.field.toLowerCase());
      })
    }
  })
  toEn.addEventListener('click', () => {
    if(!langSet.classList.contains('en')) {
      langSet.classList.add('en')
      document.body.classList.add('en')
      window.locale = "en"
      // translate all text feilds to en
      document.querySelectorAll('[data-field]').forEach(el => {
        el.innerHTML = i18n(el.dataset.field.toLowerCase());
      });
    }
  })
  // END OF TOGGLE LANG
  
  // TOGGLE MENU
  window.menuIsOpen = false
  const menu = document.querySelector('.js-menu')
  const toggleNav = document.querySelector('.js-toggle-nav')
  const toggleNavBars = toggleNav.querySelectorAll('.js-toggle-nav-bar')
  
  toggleNav.addEventListener('click', () => {
    if (menuIsOpen) hideMenu(menu, toggleNavBars)
    else openMenu(menu, toggleNavBars)
    window.menuIsOpen = !window.menuIsOpen
  })
  // END OF TOGGLE MENU

  // GSAP SCROLL TRIGGER
  // fixbg
  let fixbgMakerTl = registerFixBgMakerTl()
  let fixbgFashionTl = registerFixBgFashionTl()
  let fixbgPureTl = registerFixBgPureTl()

  // head cards
  let headCardTl = registerHeadCardTl()

  // sroll & reveal elements
  // titles
  gsap.utils.toArray('.js-t-title').forEach(el => {
    registerTitleTw(el)
  })
  // ingredient list
  let ingredListTl = registerIngredListTl()
  // circle layer
  let circleLayerTl = registerCircleLayerTl()
  // product img
  let productImgTl = registerProductImgTl()
  // END OF GSAP SCROLL TRIGGER
})

function openMenu(menu, toggleNavBars) {
  menu.style.opacity = '1'
  menu.style.visibility = 'visible'
  toggleNavBars[0].style.transform = 'rotate(45deg) translate(5px, 6px)'
  toggleNavBars[1].style.opacity = '0'
  toggleNavBars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)'
}
function hideMenu(menu, toggleNavBars) {
  menu.style.opacity = '0'
  menu.style.visibility = 'hidden'
  toggleNavBars[0].style.transform = 'none'
  toggleNavBars[1].style.opacity = '1'
  toggleNavBars[2].style.transform = 'none'
}

function getViewWidth() {
  return window.innerWidth || 0
}

function registerCircleLayerTl() {
  return gsap.timeline({ 
    repeat: -1,
    defaults: {      
      stagger: 0.3,
      ease: 'Sine.easeInOut',
    } 
  })
  .fromTo('.js-circle-layer', 
    {
      r: 0,
    }, 
    { 
      r: 76.855,
      duration: 3,
    }
  )
  .fromTo('.js-circle-layer', 
    {
      autoAlpha: 0.146,
    }, 
    { 
      autoAlpha: 0.01,
      duration: 1.5,
    }
    , '1.5'
  )
}

function registerProductImgTl() {
  return gsap.timeline({
    scrollTrigger: {
      trigger: '.js-t-disp',
      // top of trigger el hits 50% of viewport
      start: 'top 50%',
      toggleActions: 'play none none none',
      once: true,
      // markers: true,
    },
    defaults: {
      ease: 'Power1.easeOut',
      duration: 2.5,
    }
  })
  .to('.js-disp-1', {
    x: '-15vw',
    y: -50,
    rotate: '20deg'
  }, '0.1')
  .to('.js-disp-2', {
    x: '-5vw',
    y: 10,
    rotate: '7deg'
  }, '0.1')
  .to('.js-disp-3', {
    y: -20,
    rotate: '8deg'
  }, '0')
}
function registerTitleTw(el) {
  gsap.fromTo(
      el,
      { autoAlpha: 0, y: 10 },
      {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        autoAlpha: 1,
        y: 0,
        duration: 3,
        ease: 'Sine.easeOut',
      }
    )
}
function registerIngredListTl() {
  return gsap.timeline({
    scrollTrigger: {
      trigger: '.js-ingred-list',
      start: 'top 70%',
      // markers: true,
    }, 
    defaults: {
      ease: 'Power1.easeInOut',
      duration: 2,
  }})
  .from('.js-ingred-1', {
    x: -50,
    autoAlpha: 0,
  }) 
  .from('.js-ingred-2', {
    x: -50,
    autoAlpha: 0,
  }, '0.5') 
  .from('.js-ingred-3', {
    x: -50,
    autoAlpha: 0,
  }, '1') 
}
function registerHeadCardTl() {
  return gsap.timeline({
    scrollTrigger: {
      trigger: '.js-t-head-card',
      // top of trigger hits 25% of viewport
      start: 'top 25%',
      end: '+=160% 25%',
      pin: true,
      scrub: 0.8,
      // markers: true,
    }
  })
  .to('.js-t-head-card', {
    x: -651,
    ease: SlowMo.ease.config(0.5, 0.4, false),
  }) 
}
function registerFixBgMakerTl() {
  return gsap.timeline({
    scrollTrigger: {
      trigger: '.js-t-bg1',
      // bottom of trigger hits bottom of viewport
      start: 'bottom bottom',
      // 30% height beyond trigger hits the top of viewport 
      end: 'bottom+=30% top', 
      scrub: true,
      // markers: true,
    }
  })
  .set('.js-fixbg-maker', { autoAlpha: 1, })
  .to('.js-fixbg-maker', {
    y: -50,
    scale: 1.04,
  }) 
}
function registerFixBgFashionTl() {
  return gsap.timeline({
    scrollTrigger: {
      trigger: '.js-t-bg2',
      start: 'bottom-=15% bottom',
      end: 'bottom+=60% top', 
      scrub: true,
      // markers: true,
    }
  })
  .set('.js-fixbg-maker', { autoAlpha: 0, })
  .set('.js-fixbg-fashion', { autoAlpha: 1, })
  .to('.js-fixbg-fashion', {
    y: -50,
    scale: 1.04,
  })
  .from('.js-fashion-obj-1', {
    y: 600,
    x: -10,
    rotate: '10deg',
  }, '0') 
  .from('.js-fashion-obj-2', {
    y: 650,
    x: -50,
    rotate: '14deg',
  }, '0') 
  .from('.js-fashion-obj-3', {
    y: 680,
    x: -175,
    rotate: '25deg',
  }, '0') 
}
function registerFixBgPureTl() {
  return gsap.timeline({
    scrollTrigger: {
      trigger: '.js-t-bg3',
      start: 'bottom-=30% bottom',
      end: 'bottom+=40% top', 
      scrub: true,
      // markers: true,
    }
  })
  .set('.js-fixbg-maker', { autoAlpha: 0, })
  .set('.js-fixbg-fashion', { autoAlpha: 0, })
  .set('.js-fixbg-pure', { autoAlpha: 1, })
  .to('.js-fixbg-pure', {
    y: -50,
    scale: 1.04,
  }) 
}