import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

window.addEventListener('load', () => {
  // TOGGLE MENU
  const menu = document.querySelector('.js-menu')
  const toggleNav = document.querySelector('.js-toggle-nav')

  toggleNav.addEventListener('click', () => {
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
  // END OF GSAP SCROLL TRIGGER
})
function registerHeadCardTl() {
  return gsap.timeline({
    scrollTrigger: {
      trigger: '.js-t-head-card',
      // top of trigger hits bottom of viewport
      start: 'top 25%',
      // 30% height beyond trigger hits the top of viewport 
      end: 'bottom+=170% bottom',
      pin: true,
      scrub: 0.1,
      markers: true,
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
    scale: 1.05,
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
    scale: 1.05,
  }) 
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
    scale: 1.05,
  }) 
}