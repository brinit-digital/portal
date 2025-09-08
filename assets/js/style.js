const phrases = [
      "Miss a Follow-Up",
      "Lose a Lead",
      "Delay a Response",
      "Forget a Meeting",
    ];

    const el = document.getElementById("changing-text");
    let i = 0; // phrase index
    let j = 0; // character index
    let currentPhrase = [];
    let isDeleting = false;
    let isEnd = false;

    function loop() {
      isEnd = false;
      el.innerHTML = currentPhrase.join("");

      if (i < phrases.length) {
        if (!isDeleting && j <= phrases[i].length) {
          currentPhrase.push(phrases[i][j]);
          j++;
          el.innerHTML = currentPhrase.join("");
        }

        if (isDeleting && j <= phrases[i].length) {
          currentPhrase.pop();
          j--;
          el.innerHTML = currentPhrase.join("");
        }

        if (j === phrases[i].length) {
          isEnd = true;
          isDeleting = true;
        }

        if (isDeleting && j === 0) {
          currentPhrase = [];
          isDeleting = false;
          i++;
          if (i === phrases.length) {
            i = 0;
          }
        }
      }
      const speedUp = Math.random() * (80 - 50) + 50;
      const normalSpeed = Math.random() * (200 - 100) + 100;
      const time = isEnd ? 1200 : isDeleting ? speedUp : normalSpeed;
      setTimeout(loop, time);
    }

    loop();

        document.addEventListener('DOMContentLoaded', () => {
            const sliderSection = document.getElementById('sliderSection');
            const slides = sliderSection.querySelectorAll('.slide');
            const indicatorsContainer = document.getElementById('indicators');
            let current = 0, isLocked = false, isInSliderView = false;

            /* --- Show only 3 indicators --- */
            const totalGroups = 3;
            for (let g = 0; g < totalGroups; g++) {
                const dot = document.createElement('div');
                dot.className = 'indicator';
                dot.addEventListener('click', () => {
                    const targetIndex = Math.floor((g / slides.length) * slides.length);
                    showSlide(g * Math.ceil(slides.length / totalGroups));
                });
                indicatorsContainer.appendChild(dot);
            }

            function updateIndicators() {
                const dots = indicatorsContainer.querySelectorAll('.indicator');
                dots.forEach(dot => dot.classList.remove('active'));
                const groupIndex = Math.floor(current / Math.ceil(slides.length / totalGroups));
                dots[groupIndex].classList.add('active');
            }

            function showSlide(index) {
                if (index < 0 || index >= slides.length) return;
                slides.forEach(s => s.classList.remove('active'));
                slides[index].classList.add('active');
                current = index; updateIndicators();
            }
            showSlide(0);

            /* --- Adjust IntersectionObserver for correct centering --- */
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.target === sliderSection) {
                        if (entry.isIntersecting) {
                            isInSliderView = true;
                            window.scrollTo({ top: sliderSection.offsetTop, behavior: 'smooth' });
                        } else {
                            isInSliderView = false;
                        }
                    }
                });
            }, { threshold: 0.8 }); // higher threshold for center lock
            io.observe(sliderSection);

            window.addEventListener('wheel', (e) => {
                if (!isInSliderView) return;
                e.preventDefault(); if (isLocked) return; isLocked = true;
                if (e.deltaY > 0) {
                    if (current < slides.length - 1) showSlide(current + 1);
                    else window.scrollTo({ top: sliderSection.offsetTop + sliderSection.offsetHeight, behavior: 'smooth' });
                } else {
                    if (current > 0) showSlide(current - 1);
                    else window.scrollTo({ top: sliderSection.offsetTop - window.innerHeight, behavior: 'smooth' });
                }
                setTimeout(() => { isLocked = false; }, 900);
            }, { passive: false });

            window.addEventListener('keydown', (e) => {
                if (!isInSliderView) return;
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (current < slides.length - 1) showSlide(current + 1);
                    else window.scrollTo({ top: sliderSection.offsetTop + sliderSection.offsetHeight, behavior: 'smooth' });
                }
                else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (current > 0) showSlide(current - 1);
                    else window.scrollTo({ top: sliderSection.offsetTop - window.innerHeight, behavior: 'smooth' });
                }
            });
        });

        // faq section
         const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
      item.querySelector(".faq-question").addEventListener("click", () => {
        item.classList.toggle("active");

        // Close other items
        faqItems.forEach(i => {
          if (i !== item) {
            i.classList.remove("active");
          }
        });
      });
    });

//    footer

// Wait for the footer to be loaded before running particle animation
function initParticlesWhenReady() {
  const container = document.querySelector('.particles');
  if (!container) {
    // Try again in 100ms if not found
    setTimeout(initParticlesWhenReady, 100);
    return;
  }
  const COUNT = Math.min(20, Math.round(window.innerWidth / 25));
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  function createParticles(n) {
    for (let i = 0; i < n; i++) {
      const el = document.createElement('div');
      el.className = 'particle';
      const size = rand(2, 6);
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${rand(0, 100)}%`;
      el.style.setProperty('--dur', `${rand(16, 24)}s`);
      el.style.setProperty('--start-top', '100%');
      el.style.setProperty('--end-top', '-10%');
      el.style.animationDelay = `${rand(0, 10)}s`;
      container.appendChild(el);
    }
  }
  createParticles(COUNT);
}
initParticlesWhenReady();

// about section
(function () {
  const container = document.querySelector('.about-bubbles');

  function createBubble() {
    const b = document.createElement('div');
    b.className = 'bubble';
    b.style.left = Math.random() * 100 + 'vw';
    b.style.animationDuration = (10 + Math.random() * 10) + 's';
    b.style.width = b.style.height = (2 + Math.random() * 5) + 'px';
    container.appendChild(b);

    setTimeout(() => b.remove(), 7000);
  }

  setInterval(createBubble, 300);
})();