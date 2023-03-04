gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray('img');
const loader = document.querySelector('.loader--text');
const updateProgress = (instance) =>
  loader.textContent = `${Math.round(instance.progressedCount * 100 / images.length)}%`;

const showDemo = () => {
  document.body.style.overflow = 'auto';
  document.scrollingElement.scrollTo(0, 0);
  gsap.to(document.querySelector('.loader'), { autoAlpha: 0 });

  gsap.utils.toArray('section').forEach((section, index) => {
    const w = section.querySelector('.wrapper');
    const [x, xEnd] = (index % 2) ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
    gsap.fromTo(w, { x }, {
      x: xEnd,
      scrollTrigger: {
        trigger: section,
        scrub: 0.5
      }
    });
  });
}

imagesLoaded(images).on('progress', updateProgress).on('always', showDemo);


//ani
const t1 = gsap.timeline({ defaults: { duration: 1 } })
const t2 = gsap.timeline({ defaults: { duration: 0.5 } })
const t3 = gsap.timeline({ defaults: { duration: 3 } })
t2.fromTo(".hello", { x: "-20%" }, { x: "0%" })
t3.fromTo(".name", { opacity: 0 }, { opacity: 1 })
t1.fromTo(".icon", { x: "20%" }, { x: "0%" })
t1.fromTo(".info", { opacity: 0 }, { opacity: 1 })

const t4 = gsap.timeline({ defaults: { duration: 0.5 } })
t4.fromTo(".header", { y: "-90%" }, { y: "0%" })


let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
  clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees. 

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -700);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
    }
  }
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });


ScrollTrigger.create({
  trigger: ".whoareyou",
  scrub: 1,
  start: "top center",
  end: "top 100px",
  onEnter: () => {
    const t = gsap.timeline({ defaults: { duration: 2 } })
    t.fromTo(".icon", { y: "0%" }, { y: "130%" })
  onEnterBack: () => {
      const t = gsap.timeline({ defaults: { duration: 1 } })
      t.fromTo(".icon", { y: "130%" }, { y: "0%" })
    }
  }
})
ScrollTrigger.create({
  trigger: ".intro",
  scrub: 1,
  //start: "top center",
  end:"250px 100px",
  onEnterBack: () => {
    const t = gsap.timeline({ defaults: { duration: 2 } })
    t.fromTo(".icon", { y: "130%" }, { y: "0%" })
  },
  onLeaveBack:()=>{
    const t = gsap.timeline({ defaults: { duration: 1 } })
    t.fromTo(".icon", { y: "0%" }, { y: "130%" })
  }
})

ScrollTrigger.create({
  trigger: ".about",
  scrub: 1,
  start: "-80px center",
  end: "80px 100px",
  onEnter: () => {
    const t = gsap.timeline({ defaults: { duration: 2 } })
    t.fromTo(".projects", { y: "20%" }, { y: "0%" })
    onLeave: ()=>{
      const t = gsap.timeline({ defaults: { duration: 1 } })
      t.fromTo(".icon",{ opacity: 1 }, { opacity: 0 })
    }
  }
})