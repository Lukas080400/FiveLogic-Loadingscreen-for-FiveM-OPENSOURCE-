document.addEventListener('DOMContentLoaded', function() {
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    let cursorX = 0, cursorY = 0;
    let innerX = 0, innerY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        cursorOuter.style.transform = `translate(${cursorX - 15}px, ${cursorY - 15}px)`;
        requestAnimationFrame(updateCursor);
    });

    function updateCursor() {
        const dx = cursorX - innerX;
        const dy = cursorY - innerY;
        innerX += dx * 0.2;
        innerY += dy * 0.2;
        cursorInner.style.transform = `translate(${innerX - 2.5}px, ${innerY - 2.5}px)`;
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            requestAnimationFrame(updateCursor);
        }
    }

    let progress = 0;
    function updateLoadingProgress() {
        if (progress < 100) {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            const progressBar = document.querySelector('.progress-fill');
            const percentageText = document.getElementById('percentage');
            
            progressBar.style.width = `${progress}%`;
            percentageText.textContent = Math.floor(progress);
        }
    }

    document.querySelectorAll('.social-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursorOuter.style.transform = 'scale(1.5)';
            playHoverSound();
        });

        card.addEventListener('mouseleave', () => {
            cursorOuter.style.transform = 'scale(1)';
        });

        card.addEventListener('click', async (e) => {
            e.preventDefault();
            playClickSound();
            
            const link = card.getAttribute('data-link');
            await navigator.clipboard.writeText(link);
            
            const alert = card.querySelector('.copy-alert');
            alert.style.opacity = '1';
            alert.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                alert.style.opacity = '0';
                alert.style.transform = 'translateY(10px)';
            }, 2000);
        });
    });

    function playHoverSound() {
        const hoverSound = document.getElementById('hoverSound');
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
    }

    function playClickSound() {
        const clickSound = document.getElementById('clickSound');
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }

    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.volume = 0.1;
    
    function tryPlayMusic() {
        backgroundMusic.play().catch(() => {
            document.addEventListener('click', () => {
                backgroundMusic.play().catch(() => {});
            }, { once: true });
        });
    }
    
    tryPlayMusic();

    setInterval(updateLoadingProgress, 500);

    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: '#00fff2' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 3 },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00fff2',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2
                }
            }
        });
    }
});