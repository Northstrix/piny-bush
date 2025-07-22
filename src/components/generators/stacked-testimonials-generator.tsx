
import React from 'react';

type Settings = Record<string, any>;

export const getStackedTestimonialsGenerator = () => {
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
                <br />
                Photo by <a href="https://unsplash.com/@carlosm2514?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Carlos Macías</a> on <a href="https://unsplash.com/photos/a-man-with-his-arms-crossed-standing-in-front-of-a-wall-qguOjA_fdkY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Unsplash</a>
                <br />
                Photo by <a href="https://unsplash.com/@alexandermassph?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Alexander Mass</a> on <a href="https://unsplash.com/photos/a-woman-laying-on-the-ground-next-to-a-street-xb5Boc3TA2g?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Unsplash</a>
            </>
        )
    };
};

export const getStackedTestimonialsCode = (settings: Settings) => {
    const {
        testimonials,
        nameColor, designationColor, quoteColor, arrowBg, arrowFg, arrowHoverBg,
        nameFontSize, designationFontSize, quoteFontSize, arrowSize,
        imageBorderRadius,
        autoplay,
    } = settings;

    const html = `
    <div class="stacked-testimonials-container">
        <div class="stacked-testimonials-grid">
            <div class="stacked-testimonials-image-container" id="image-container"></div>
            <div class="stacked-testimonials-content">
                <div>
                    <h3 class="stacked-testimonials-name" id="name"></h3>
                    <p class="stacked-testimonials-designation" id="designation"></p>
                    <p class="stacked-testimonials-quote" id="quote"></p>
                </div>
                <div class="stacked-testimonials-arrow-buttons">
                    <button class="stacked-testimonials-arrow-button prev-button" id="prev-button">
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                    <button class="stacked-testimonials-arrow-button next-button" id="next-button">
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>`;

    const css = `
    .stacked-testimonials-container {
        width: 100%;
        max-width: 56rem;
        padding: 2rem;
        font-family: sans-serif;
    }
    .stacked-testimonials-grid {
        display: grid;
        gap: 5rem;
    }
    @media (min-width: 768px) {
        .stacked-testimonials-grid {
            grid-template-columns: 1fr 1fr;
        }
    }
    .stacked-testimonials-image-container {
        position: relative;
        width: 100%;
        height: 24rem;
        perspective: 1000px;
    }
    .stacked-testimonials-image {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: ${imageBorderRadius}px;
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    .stacked-testimonials-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .stacked-testimonials-name {
        font-size: ${nameFontSize}px;
        font-weight: bold;
        color: ${nameColor};
        margin-bottom: 0.25rem;
    }
    .stacked-testimonials-designation {
        font-size: ${designationFontSize}px;
        color: ${designationColor};
        margin-bottom: 2rem;
    }
    .stacked-testimonials-quote {
        font-size: ${quoteFontSize}px;
        color: ${quoteColor};
        line-height: 1.75;
    }
    .stacked-testimonials-arrow-buttons {
        display: flex;
        gap: 1rem;
        padding-top: 3rem;
    }
    .stacked-testimonials-arrow-button {
        width: ${arrowSize}px;
        height: ${arrowSize}px;
        border-radius: 50%;
        background-color: ${arrowBg};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s;
        border: none;
    }
    .stacked-testimonials-arrow-button svg {
        width: ${arrowSize * 0.7}px;
        height: ${arrowSize * 0.7}px;
        fill: ${arrowFg};
        transition: transform 0.3s;
    }
    .stacked-testimonials-arrow-button:hover {
        background-color: ${arrowHoverBg};
    }
    .stacked-testimonials-arrow-button:hover svg {
      fill: #ffffff;
    }
    .prev-button:hover svg {
      transform: rotate(-12deg);
    }
    .next-button:hover svg {
      transform: rotate(12deg);
    }
    @media (min-width: 768px) {
      .stacked-testimonials-grid {
        grid-template-columns: 1fr 1fr;
      }
      .arrow-buttons {
        padding-top: 0;
      }
    }
    .word {
      display: inline-block;
    }
    `;

    const scriptTestimonials = testimonials.map((t: any) => ({
        quote: t.quote,
        name: t.name,
        designation: t.designation,
        src: t.image,
    }));

    const js = `
    const testimonials = ${JSON.stringify(scriptTestimonials)};
    if (!testimonials || testimonials.length === 0) return;
    
    let activeIndex = 0;
    const imageContainer = document.getElementById('image-container');
    const nameElement = document.getElementById('name');
    const designationElement = document.getElementById('designation');
    const quoteElement = document.getElementById('quote');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    
    function initTestimonials() {
        if (!imageContainer) return;
        imageContainer.innerHTML = '';
        testimonials.forEach((testimonial, index) => {
            const img = document.createElement('img');
            img.src = testimonial.src;
            img.alt = testimonial.name;
            img.classList.add('stacked-testimonials-image');
            img.dataset.index = index;
            img.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            imageContainer.appendChild(img);
        });
    }
    
    function transitionToIndex(nextIndex, isWrap = false, cb) {
        const allImages = imageContainer.querySelectorAll('.stacked-testimonials-image');
        const outgoingIndex = activeIndex;
        const incomingIndex = nextIndex;
    
        if (isWrap) {
            // Step 1: fade out other images except first and last
            allImages.forEach((img, idx) => {
                if (idx !== outgoingIndex && idx !== incomingIndex) {
                    img.style.transition = 'opacity 0.075s ease'; // faster fade out
                    img.style.opacity = '0';
                    img.style.pointerEvents = 'none';
                }
            });
    
            // Step 2: transition between last → first
            const outgoingImg = allImages[outgoingIndex];
            const incomingImg = allImages[incomingIndex];
    
            outgoingImg.style.opacity = '1';
            incomingImg.style.opacity = '0';
            incomingImg.style.zIndex = testimonials.length;
            outgoingImg.style.zIndex = testimonials.length - 1;
    
            setTimeout(() => {
                // Animate transition
                outgoingImg.style.opacity = '0';
                outgoingImg.style.transform = 'scale(0.93) translateY(10%)';
                incomingImg.style.opacity = '1';
                incomingImg.style.transform = 'scale(1) translateY(0%)';
            }, 75); // start after fading others
    
            setTimeout(() => {
                allImages.forEach((img, idx) => {
                    img.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
                    img.style.opacity = idx === activeIndex ? 1 : 0.7;
                    img.style.pointerEvents = '';
                });
                if (cb) cb();
            }, 300);
        } else {
            if (cb) cb(); // normal flow
        }
    }
    
    function updateTestimonial(direction) {
        const prevIndex = activeIndex;
        const nextIndex = (activeIndex + direction + testimonials.length) % testimonials.length;
    
        const isWrap = prevIndex === testimonials.length - 1 && nextIndex === 0;
        if (isWrap) {
            transitionToIndex(nextIndex, true, () => {
                activeIndex = nextIndex;
                applyStackStyles();
                updateContent();
            });
        } else {
            activeIndex = nextIndex;
            applyStackStyles();
            updateContent();
        }
    }
    
    function applyStackStyles() {
        const allImages = imageContainer.querySelectorAll('.stacked-testimonials-image');
        allImages.forEach((img, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            const zIndex = testimonials.length - absOffset;
            const opacity = index === activeIndex ? 1 : 0.7;
            const scale = 1 - (absOffset * 0.15);
            const translateY = offset === -1 ? '-20%' : (offset === 1 ? '20%' : '0%');
            const rotateY = offset === -1 ? '15deg' : (offset === 1 ? '-15deg' : '0deg');
    
            img.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            img.style.zIndex = zIndex;
            img.style.opacity = opacity;
            img.style.transform = \`translateY(\${translateY}) scale(\${scale}) rotateY(\${rotateY})\`;
            img.style.pointerEvents = '';
        });
    }
    
    function updateContent() {
        if (nameElement) nameElement.textContent = testimonials[activeIndex].name;
        if (designationElement) designationElement.textContent = testimonials[activeIndex].designation;
        if (quoteElement) {
            quoteElement.innerHTML = testimonials[activeIndex].quote
                .split(' ')
                .map(word => \`<span class="word">\${word}</span>\`)
                .join(' ');
            animateWords();
        }
    }
    
    function animateWords() {
        if (!quoteElement) return;
        const words = quoteElement.querySelectorAll('.word');
        words.forEach((word, index) => {
            word.style.opacity = '0';
            word.style.transform = 'translateY(10px)';
            word.style.filter = 'blur(10px)';
            setTimeout(() => {
                word.style.transition = 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out, filter 0.2s ease-in-out';
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
                word.style.filter = 'blur(0)';
            }, index * 20);
        });
    }
    
    function handleNext() { updateTestimonial(1); }
    function handlePrev() { updateTestimonial(-1); }
    
    if (prevButton) prevButton.addEventListener('click', handlePrev);
    if (nextButton) nextButton.addEventListener('click', handleNext);
    
    initTestimonials();
    applyStackStyles();
    updateContent();
    
    if (${autoplay}) {
        if (window.autoplayInterval) clearInterval(window.autoplayInterval);
        window.autoplayInterval = setInterval(handleNext, 5000);
        [prevButton, nextButton].forEach(button => {
            if (button) {
                button.addEventListener('click', () => {
                    clearInterval(window.autoplayInterval);
                });
            }
        });
    }
    `;
    

    const fullCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stacked Testimonials</title>
    <style>
        ${css}
    </style>
</head>
<body>
    ${html}
    <script>
      (function() {
        if(window.hasStackedScript && window.autoplayInterval) {
            clearInterval(window.autoplayInterval);
        }
        window.hasStackedScript = true;
        ${js}
      })();
    </script>
</body>
</html>`;

    return { html, css, js, fullCode };
};
