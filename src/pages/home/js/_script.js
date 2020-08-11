import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

window.addEventListener('load', () => {
  //取得裝置寬
  window.currentWidth = getViewWidth()
  //變換裝置寬度時重整頁面
  window.addEventListener('resize', (e) => {
    let newWidth = getViewWidth()
    if (newWidth !== currentWidth) {
      location.reload()
    }
  })
  
  // TOGGLE MENU
  const menu = document.querySelector('.js-menu')
  const toggleNav = document.querySelector('.js-toggle-nav')

  toggleNav.addEventListener('click', () => {
    console.log('toggleNav ticked')
    menu.classList.toggle('is-open')
    toggleNav.classList.toggle('is-open')
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
      // top of trigger el hits 70% of viewport
      start: 'top 70%',
      end: 'top+=800% 70%', 
      scrub: 1,
      // markers: true,
    },
    defaults: {
      ease: 'Power1.easeInOut',
    }
  })
  .from('.js-disp-1', {
    autoAlpha: 0.2,
    x: '-15vw',
    y: -50,
    rotate: '20deg'
  }, '0.1')
  .from('.js-disp-2', {
    autoAlpha: 0.2,
    x: '-5vw',
    y: 10,
    rotate: '7deg'
  }, '0.1')
  .from('.js-disp-3', {
    autoAlpha: 0.2,
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
      end: 'bottom+=170% bottom',
      pin: true,
      scrub: 0.8,
      // markers: true,
    }
  })
  .to('.js-t-head-card', {
    x: -651,
    ease: 'Power1.easeInOut',
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
    y: 100,
    x: -10,
    rotate: '10deg',
  }, '0') 
  .from('.js-fashion-obj-2', {
    y: 150,
    x: -50,
    rotate: '14deg',
  }, '0') 
  .from('.js-fashion-obj-3', {
    y: 180,
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