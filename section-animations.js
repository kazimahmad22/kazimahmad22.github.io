// Import GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Services Section Animation
gsap.from(".servicesSection .title", {
  scrollTrigger: {
    trigger: ".servicesSection",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".servicesSection .card", {
  scrollTrigger: {
    trigger: ".servicesSection",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out",
});

// Portfolio Section Animation
gsap.from(".portfolioSection .title", {
  scrollTrigger: {
    trigger: ".portfolioSection",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".portfolioSection .card", {
  scrollTrigger: {
    trigger: ".portfolioSection",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out",
});

// Testimonials Section Animation
gsap.from(".testimonialsSection .title", {
  scrollTrigger: {
    trigger: ".testimonialsSection",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".testimonialsSection .card", {
  scrollTrigger: {
    trigger: ".testimonialsSection",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out",
});

// Footer Animation
gsap.from(".footer h1", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".footer .bar", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  x: -30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out",
});
