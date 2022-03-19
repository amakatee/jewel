import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const swatches = document.querySelectorAll('.swatches img')
const gallery = document.querySelector('.photo-gallery')
const slides = document.querySelectorAll('.photo-gallery-container')
let currentSwatch = "1"


const tl = gsap.timeline({defaults: {duratiom: 0.75, ease: 'Power3.easeOut'}})

 function setUpAnimation(){
    animateMainPage()
    // pinningOnScroll()
    carooselAnimation()
}

function pinningOnScroll(){
//    const tlIntro = gsap.timeline({
//        ScrollTrigger: {
//            trigger: '.main-page',
//            start:'0%',
//            end: '200%',
//            pin: true,
//            pinSpacing: false


//        }
//    })


}
function animateMainPage(){
    tl.fromTo(
        '.first-page',
        {scale: 1.2, borderRadius: "0rem" },
        {scale: 1,
        borderRadius: "0rem",
        delay: 0.35,
        duration:1.5,
        // ease:'elastic.out(1.5, 1)'
    
    })
    tl.fromTo(".cta1", {x: "100%", opacity: 0.5}, {x: 0, opacity: 1}, "<20%")
    tl.fromTo(".cta3", {x: "-100%", opacity: 0.5}, {x: 0, opacity: 1}, "<20%")
    tl.fromTo(".cta2", {y: "100%", opacity: 0.5}, {y: 0, opacity: 1}, "<20%")
    tl.fromTo(".cta4", {x: "100%", opacity: 0.5}, {x: 0, opacity: 1}, "<20%")
    tl.fromTo(".cta6", {x: "-100%", opacity: 0.5}, {x: 0, opacity: 1}, "<20%")
    tl.fromTo(".cta5", {y: "100%", opacity: 0.5}, {y: 0, opacity: 1}, "<20%")
    

}


function carooselAnimation(){
    swatches.forEach((swatch,index) => {
        const coord = slides[index].getBoundingClientRect().left
        console.log(coord)

        swatch.addEventListener("click", e => {
            const swatchName = e.target.getAttribute('swatch')  
            console.log(swatchName)  
            gsap.to(gallery, {x: -coord, duration: 1, ease:"Power.easeOut"})
            })
           
    })
    
}

setUpAnimation()