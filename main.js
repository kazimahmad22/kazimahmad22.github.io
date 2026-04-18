/**
 * Kazim Ahmad Portfolio - Design Logic
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- Section Scroll Animations ---
    const sections = document.querySelectorAll("section");
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // --- Header Scroll Effect ---
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- Services Carousel Logic (Removed: unused) ---

    // --- Active Link Highlighting ---
    const navLinks = document.querySelectorAll(".nav-link");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current) && current !== "") {
                link.classList.add("active");
            }
        });
    });

    // --- Form Handling ---
    // --- Formspree Integration ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // UI State: Sending
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
            btn.disabled = true;

            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    btn.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT';
                    contactForm.reset();
                    
                    // Reset button after 5 seconds
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }, 5000);
                } else {
                    // Formspree Error
                    const data = await response.json();
                    throw new Error(data.error || "Submission failed");
                }
            } catch (error) {
                // Network or Logic Error
                btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ERROR. TRY AGAIN';
                btn.classList.add('btn-error');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.remove('btn-error');
                }, 4000);
                
                console.error("Formspree Error:", error);
            }
        });
    }

    // --- Theme Toggle Logic ---
    const themeBtn = document.querySelector(".theme-toggle");
    const themeIcon = themeBtn.querySelector("i");
    const body = document.body;

    // Check saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light-mode");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

    themeBtn.addEventListener("click", () => {
        // Animation start
        themeIcon.style.transform = "rotate(360deg) scale(0)";
        
        setTimeout(() => {
            // Toggle Theme
            body.classList.toggle("light-mode");
            
            // Swap Icon
            if (body.classList.contains("light-mode")) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
                localStorage.setItem("theme", "light");
            } else {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
                localStorage.setItem("theme", "dark");
            }
            
            // Animation end (restore scale)
            themeIcon.style.transform = "rotate(0deg) scale(1)";
        }, 200); // Wait for half the transition time or so
    }); 

    // --- Dynamic Projects Rendering ---
    const projectsGrid = document.querySelector(".projects-grid");
    
    if (projectsGrid) {
        // Check if we are in a subdirectory (specifically /projects/)
        const isProjectsPage = window.location.pathname.includes("/projects/") || window.location.pathname.endsWith("/projects");
        
        // Use a more robust pathing strategy: try to find the root of the site
        // If we are on the projects page, we need to go up one level for assets
        const assetPrefix = isProjectsPage ? "../" : "./";
        
        const attemptFetch = async (paths) => {
            for (const path of paths) {
                try {
                    const response = await fetch(path);
                    if (!response.ok) continue;
                    const data = await response.json();
                    if (!data || !Array.isArray(data)) continue;
                    
                    renderProjects(data);
                    return true;
                } catch (e) {
                    console.warn(`Failed to load projects from ${path}:`, e);
                }
            }
            return false;
        };

        const renderProjects = (data) => {
            projectsGrid.innerHTML = ""; 
            data.forEach(project => {
                const card = document.createElement("div");
                card.className = "project-card";
                
                const getImagePath = (path) => {
                    if (path.startsWith("./")) {
                        return assetPrefix + path.substring(2);
                    }
                    return path;
                };

                const tagImages = {
                    "WordPress": "assets/wordpress.svg",
                    "Elementor": "assets/elementor.svg",
                    "Figma": "assets/figma.svg"
                };
                
                let tagsHtml = `<div class="project-tags" style="display: flex; gap: 8px; align-items: center; margin-bottom: 24px;">`;
                project.tags.forEach(tag => {
                    if (tagImages[tag]) {
                        tagsHtml += `<img src="${assetPrefix + tagImages[tag]}" alt="${tag}" title="${tag}" style="width: 20px; height: 20px;">`;
                    }
                });
                tagsHtml += `</div>`;

                card.innerHTML = `
                    <div class="project-image-wrapper">
                        <img src="${getImagePath(project.image)}" alt="${project.title}" class="project-thumb">
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3>${project.title}</h3>
                        </div>
                        <p>${project.description}</p>
                        ${tagsHtml}
                        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-project">Visit Site</a>
                    </div>
                `;
                projectsGrid.appendChild(card);
            });
        };

        const paths = isProjectsPage ? ["./projects.json", "projects.json"] : ["./projects/projects.json", "projects/projects.json"];
        
        attemptFetch(paths).then(success => {
            if (!success) {
                projectsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 40px;">Unable to load projects. Please refresh or check back later.</p>`;
            }
        });
    }

    // --- Dynamic Testimonials Rendering & Carousel ---
    const testimonialsTrack = document.querySelector(".testimonials-track");
    const paginationRoot = document.querySelector(".testimonials-pagination");
    const modal = document.getElementById("testimonialModal");
    const modalQuote = document.getElementById("modalQuote");
    const modalAuthor = document.getElementById("modalAuthor");

    if (testimonialsTrack) {
        const prevBtn = document.querySelector(".nav-btn.prev");
        const nextBtn = document.querySelector(".nav-btn.next");

        const attemptTestimonialsFetch = async (paths) => {
            for (const path of paths) {
                try {
                    const res = await fetch(path);
                    if (!res.ok) continue;
                    const data = await res.json();
                    renderTestimonials(data);
                    return true;
                } catch (e) {
                    console.warn(`Failed to load testimonials from ${path}:`, e);
                }
            }
            return false;
        };

        const renderTestimonials = (data) => {
            let currentIdx = 0;
            testimonialsTrack.innerHTML = ""; // Clear existing
            
            // 1. Render Cards
            data.forEach(item => {
                const card = document.createElement("div");
                card.className = "testimonial-card";
                const isLong = item.content.length > 200;
                card.innerHTML = `
                    <div class="testimonial-content">
                        <p class="testimonial-quote">${item.content}</p>
                        ${isLong ? `<button class="btn-read-more" data-full="${item.content.replace(/"/g, '&quot;')}" data-name="${item.name}">Read More</button>` : ''}
                    </div>
                    <p class="testimonial-author">${item.name}</p>
                `;
                testimonialsTrack.appendChild(card);
            });

            // 2. Setup Carousel & Pagination
            const updatePagination = () => {
                paginationRoot.innerHTML = "";
                const isMobile = window.innerWidth <= 768;
                const visibleCards = isMobile ? 1 : 2;
                const maxPossibleIdx = Math.max(0, data.length - visibleCards);

                // One dot per possible view
                for (let i = 0; i <= maxPossibleIdx; i++) {
                    const dot = document.createElement("div");
                    dot.className = `dot ${i === currentIdx ? 'active' : ''}`;
                    dot.addEventListener("click", () => slideTo(i));
                    paginationRoot.appendChild(dot);
                }
                
                // Initial slide to update buttons
                slideTo(currentIdx);
            };

            function slideTo(idx) {
                const isMobile = window.innerWidth <= 768;
                const visibleCards = isMobile ? 1 : 2;
                const maxPossibleIdx = Math.max(0, data.length - visibleCards);
                
                // Clamp index
                currentIdx = Math.max(0, Math.min(idx, maxPossibleIdx));
                
                const gap = 20;
                const containerWidth = document.querySelector(".testimonials-container").offsetWidth;
                // Width of one card
                const cardWidth = (containerWidth - (isMobile ? 0 : gap)) / visibleCards;
                
                const moveAmount = currentIdx * (cardWidth + gap);
                testimonialsTrack.style.transform = `translateX(-${moveAmount}px)`;
                
                // Update dots
                document.querySelectorAll(".dot").forEach((d, i) => {
                    d.classList.toggle("active", i === currentIdx);
                });

                // Update Navigation Buttons state
                if (prevBtn) prevBtn.disabled = currentIdx === 0;
                if (nextBtn) nextBtn.disabled = currentIdx === maxPossibleIdx;
            }

            updatePagination();

            // Navigation button listeners
            if (prevBtn) prevBtn.addEventListener("click", () => slideTo(currentIdx - 1));
            if (nextBtn) nextBtn.addEventListener("click", () => slideTo(currentIdx + 1));

            // 3. Handle Modal (added listener once to track)
            testimonialsTrack.addEventListener("click", (e) => {
                if (e.target.classList.contains("btn-read-more")) {
                    modalQuote.innerText = e.target.getAttribute("data-full");
                    modalAuthor.innerText = e.target.getAttribute("data-name");
                    modal.classList.add("active");
                    document.body.style.overflow = "hidden";
                }
            });

            window.addEventListener("resize", () => {
                updatePagination();
            });
        };

        const testimonialsPaths = isProjectsPage ? ["../testimonials.json", "testimonials.json"] : ["./testimonials.json", "testimonials.json"];
        attemptTestimonialsFetch(testimonialsPaths);
    }

    // --- Mobile Menu Toggle logic ---
    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        const closeMobileMenu = () => {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "";
        };

        if (menuClose) menuClose.addEventListener("click", closeMobileMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });
    }

    // Modal Close logic
    if (modal) {
        const closeBtn = modal.querySelector(".modal-close");
        const overlay = modal.querySelector(".modal-overlay");

        const closeModal = () => {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        };

        closeBtn.addEventListener("click", closeModal);
        overlay.addEventListener("click", closeModal);
    }
});
