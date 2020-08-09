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
  // END OF GSAP SCROLL TRIGGER
})