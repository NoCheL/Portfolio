document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ナビゲーション制御 (スクロール・ハンバーガー・ロック) ---
    const nav = document.getElementById('mainNav'); 
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // A. スクロール検知：ナビゲーションの背景変化
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // B. ハンバーガーメニュー開閉
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // スマホ時のみスクロールをロック
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // リンクをクリックしたらメニューを閉じる
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // --- 2. 画像スライドショー (フェード切り替え) ---
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function showNextSlide() {
        if (slides.length <= 1) return;
        
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    }

    if (slides.length > 1) {
        setInterval(showNextSlide, 6000);
    }

    // --- 3. 梅の落下演出 ---
    const PLUM_SVG_CONTENT = `
    <svg viewBox="60 110 90 90" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="m 106.1775,111.74615 c -9.946158,4e-5 -18.328225,7.4225 -19.531626,17.29559 -9.761871,-1.90657 -19.411427,3.7717 -22.484932,13.23123 -3.067906,9.4621 1.408501,19.72563 10.430371,23.91482 -4.836575,8.69218 -2.425145,19.6269 5.618778,25.47855 8.051011,5.84157 19.195437,4.75574 25.967409,-2.53008 6.77197,7.28582 17.9164,8.37165 25.96741,2.53008 8.04392,-5.85165 10.45535,-16.78637 5.61877,-25.47855 9.02187,-4.18918 13.49828,-14.45272 10.43038,-23.91482 -3.07351,-9.45953 -12.72307,-15.1378 -22.48494,-13.23123 -1.2034,-9.87309 -9.58546,-17.29555 -19.53162,-17.29559 z" />
        <g transform="translate(0.37, 2.22)">
          <path d="M 105.4,154.2 V 139.9" /><path d="m 105.1,154.0 13.6,-4.4" /><path d="m 105.2,153.7 8.4,11.5" /><path d="m 105.6,153.7 -8.4,11.5" /><path d="m 105.7,154.0 -13.6,-4.4" />
        </g>
        <circle cx="105.9" cy="143.7" r="2.1" /><circle cx="117.8" cy="152.3" r="2.1" /><circle cx="113.2" cy="166.4" r="2.1" /><circle cx="98.5" cy="166.4" r="2.1" /><circle cx="94.0" cy="152.3" r="2.1" />
      </g>
    </svg>`;

    function createPlum() {
        const container = document.querySelector('.plum-blossoms-container');
        if (!container || document.hidden) return;

        const wrapper = document.createElement('div');
        wrapper.classList.add('plum-svg');
        wrapper.innerHTML = PLUM_SVG_CONTENT;

        const size = Math.random() * 30 + 20;
        const startX = Math.random() * 100;
        const duration = Math.random() * 8 + 10;
        const opacity = Math.random() * 0.3 + 0.1;

        Object.assign(wrapper.style, {
            width: `${size}px`, height: `${size}px`,
            left: `${startX}%`,
            opacity: opacity,
            animationName: 'fall-and-sway',
            animationDuration: `${duration}s`,
            animationTimingFunction: 'linear'
        });

        container.appendChild(wrapper);
        setTimeout(() => wrapper.remove(), duration * 1000);
    }

    for(let i = 0; i < 10; i++) { setTimeout(createPlum, i * 400); }
    setInterval(createPlum, 1200);
});
