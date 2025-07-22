
import React from 'react';

type Settings = Record<string, any>;

export const getCircularTestimonialsGenerator = () => {
    return {
        credits: (
            <>
                <a href="https://ui.aceternity.com/components/animated-testimonials" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Animated Testimonials</a> by <a href="https://ui.aceternity.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Aceternity UI</a>
                <br />
                Used photos:
                <br />
                Photo by <a href="https://unsplash.com/@ilyapavlov?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ilya Pavlov</a> on <a href="https://unsplash.com/photos/woman-standing-beside-lights-xE87C_OvVO4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Unsplash</a>
                <br />
                Photo by <a href="https://unsplash.com/@bavepictures?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Bave Pictures</a> on <a href="https://unsplash.com/photos/man-in-gray-crew-neck-t-shirt-standing-beside-white-wall-MbYgpI1D-cA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Unsplash</a>
                <br />
                Photo by <a href="https://unsplash.com/@seteph?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Allef Vinicius</a> on <a href="https://unsplash.com/photos/closed-eye-woman-wearing-brown-hat-YbzfTr0pwLE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Unsplash</a>
            </>
        )
    };
};

export const getCircularTestimonialsCode = (settings: Settings) => {
    const {
        nameColor, designationColor, quoteColor, arrowBg, arrowFg, arrowHoverBg,
        nameFontSize, designationFontSize, quoteFontSize, arrowSize,
        imageBorderRadius,
        quote1, name1, designation1, image1,
        quote2, name2, designation2, image2,
        quote3, name3, designation3, image3,
        autoplay,
    } = settings;

    const testimonials = [
        { quote: quote1, name: name1, designation: designation1, src: image1 },
        { quote: quote2, name: name2, designation: designation2, src: image2 },
        { quote: quote3, name: name3, designation: designation3, src: image3 },
    ];

    const html = `
    <div class="circular-testimonials-container">
        <div class="circular-testimonials-grid">
            <div class="circular-testimonials-image-container" id="image-container"></div>
            <div class="circular-testimonials-content">
                <div>
                    <h3 class="circular-testimonials-name" id="name"></h3>
                    <p class="circular-testimonials-designation" id="designation"></p>
                    <p class="circular-testimonials-quote" id="quote"></p>
                </div>
                <div class="circular-testimonials-arrow-buttons">
                    <button class="circular-testimonials-arrow-button prev-button" id="prev-button">
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                    <button class="circular-testimonials-arrow-button next-button" id="next-button">
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>`;

    const css = `
    .circular-testimonials-container {
        width: 100%;
        max-width: 56rem;
        padding: 2rem;
        font-family: sans-serif;
    }
    .circular-testimonials-grid {
        display: grid;
        gap: 5rem;
    }
    @media (min-width: 768px) {
      .circular-testimonials-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .circular-testimonials-image-container {
        position: relative;
        width: 100%;
        height: 24rem;
        perspective: 1000px;
    }
    .circular-testimonials-image {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: ${imageBorderRadius}px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        aspect-ratio: 1/1;
    }
    .circular-testimonials-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .circular-testimonials-name {
        font-size: ${nameFontSize}px;
        color: ${nameColor};
        font-weight: bold;
        margin-bottom: 0.25rem;
    }
    .circular-testimonials-designation {
        font-size: ${designationFontSize}px;
        color: ${designationColor};
        margin-bottom: 2rem;
    }
    .circular-testimonials-quote {
        font-size: ${quoteFontSize}px;
        color: ${quoteColor};
        line-height: 1.75;
    }
    .circular-testimonials-quote .word {
      display: inline-block;
    }
    .circular-testimonials-arrow-buttons {
        display: flex;
        gap: 1.5rem;
        padding-top: 3rem;
    }
    @media (min-width: 768px) {
      .circular-testimonials-arrow-buttons {
        padding-top: 0;
      }
    }
    .circular-testimonials-arrow-button {
        width: ${arrowSize}px;
        height: ${arrowSize}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s;
        border: none;
        background-color: ${arrowBg};
        color: ${arrowFg};
    }
    .circular-testimonials-arrow-button:hover {
        background-color: ${arrowHoverBg};
    }
    .circular-testimonials-arrow-button svg {
        width: ${arrowSize * 0.7}px;
        height: ${arrowSize * 0.7}px;
    }
    `;

    const js = `
        const testimonials = ${JSON.stringify(testimonials)};
        let activeIndex = 0;
        let autoplayInterval;
        const imageContainer = document.getElementById('image-container');
        const nameElement = document.getElementById('name');
        const designationElement = document.getElementById('designation');
        const quoteElement = document.getElementById('quote');
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');

        function calculateGap(width) {
            const minWidth = 1024;
            const maxWidth = 1456;
            const minGap = 60;
            const maxGap = 86;
            if (width <= minWidth) return minGap;
            if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
            return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
        }

        function updateTestimonial(direction, isInit = false) {
            activeIndex = (activeIndex + direction + testimonials.length) % testimonials.length;
            if (!imageContainer) return;

            const containerWidth = imageContainer.offsetWidth;
            const gap = calculateGap(containerWidth);
            const maxStickUp = gap * 0.8;

            testimonials.forEach((testimonial, index) => {
                let img = imageContainer.querySelector('[data-index="' + index + '"]');
                if (!img) {
                    img = document.createElement('img');
                    img.src = testimonial.src;
                    img.alt = testimonial.name;
                    img.classList.add('circular-testimonials-image');
                    img.dataset.index = index;
                    imageContainer.appendChild(img);
                }
                
                const offset = (index - activeIndex + testimonials.length) % testimonials.length;
                let zIndex = testimonials.length - Math.abs(offset);
                let opacity = 1;
                let scale = 1;
                let translateX = '0%';
                let translateY = '0%';
                let rotateY = 0;

                if (offset === 0) { // Active
                    zIndex = testimonials.length;
                    scale = 1;
                } else if (offset === 1 || offset === testimonials.length - 2) { // Right
                    zIndex = testimonials.length - 1;
                    scale = 0.85;
                    translateX = '20%';
                    translateY = '-' + (maxStickUp / img.offsetHeight * 100) + '%';
                    rotateY = -15;
                } else if (offset === testimonials.length - 1 || offset === - (testimonials.length - 2)) { // Left
                    zIndex = testimonials.length - 1;
                    scale = 0.85;
                    translateX = '-20%';
                    translateY = '-' + (maxStickUp / img.offsetHeight * 100) + '%';
                    rotateY = 15;
                } else { // Behind
                     translateX = '0%';
                     translateY = '0%';
                     rotateY = 0;
                     scale = 0.7;
                     zIndex = testimonials.length - offset;
                }


                gsap.to(img, {
                    zIndex: zIndex,
                    opacity: opacity,
                    scale: scale,
                    x: translateX,
                    y: translateY,
                    rotateY: rotateY,
                    duration: isInit ? 0 : 0.8,
                    ease: "power3.out"
                });
            });

            if(isInit) {
                 nameElement.textContent = testimonials[activeIndex].name;
                 designationElement.textContent = testimonials[activeIndex].designation;
                 quoteElement.innerHTML = testimonials[activeIndex].quote.split(' ').map(word => '<span class="word">' + word + '</span>').join(' ');
                 animateWords();
            } else {
                 gsap.to([nameElement, designationElement], {
                    opacity: 0, y: -20, duration: 0.3, ease: "power2.in", onComplete: () => {
                        nameElement.textContent = testimonials[activeIndex].name;
                        designationElement.textContent = testimonials[activeIndex].designation;
                        gsap.to([nameElement, designationElement], { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
                    }
                });
                gsap.to(quoteElement, {
                    opacity: 0, y: -20, duration: 0.3, ease: "power2.in", onComplete: () => {
                        quoteElement.innerHTML = testimonials[activeIndex].quote.split(' ').map(word => '<span class="word">' + word + '</span>').join(' ');
                        gsap.to(quoteElement, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
                        animateWords();
                    }
                });
            }
        }
        
        function animateWords() {
            if (!quoteElement) return;
            const words = quoteElement.querySelectorAll('.word');
            gsap.from(words, {
                opacity: 0,
                y: 10,
                stagger: 0.02,
                duration: 0.2,
                ease: "power2.out"
            });
        }

        function startAutoplay() {
            if (${autoplay}) {
                autoplayInterval = setInterval(() => updateTestimonial(1), 5000);
            }
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        prevButton.addEventListener('click', () => { updateTestimonial(-1); stopAutoplay(); });
        nextButton.addEventListener('click', () => { updateTestimonial(1); stopAutoplay(); });

        let resizeTimeout;
        window.addEventListener('resize', () => {
            updateTestimonial(0, true);
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateTestimonial(0, true);
            }, 1000);
        });
        
        // Initial setup
        updateTestimonial(0, true);
        startAutoplay();
    `;
    
    const fullCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Circular Testimonials</title>
    <style>
      ${css}
    </style>
</head>
<body>
    ${html}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script>
      (function() {
        // To prevent re-running script on editor updates
        if(window.hasCircularTestimonialScript) return;
        window.hasCircularTestimonialScript = true;
        
        ${js}
      })();
    </script>
</body>
</html>
  `;

    return { html, css, js, fullCode };
};
