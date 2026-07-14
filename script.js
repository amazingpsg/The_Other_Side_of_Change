document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dots = document.querySelectorAll(".dot");
    
    let currentSlide = 0;
    const totalSlides = dots.length;

    // 슬라이드 이동 함수
    function goToSlide(index) {
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}vw)`;
        
        dots.forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    // 다음 버튼 클릭
    nextBtn.addEventListener("click", () => {
        goToSlide(currentSlide + 1);
    });

    // 이전 버튼 클릭
    prevBtn.addEventListener("click", () => {
        goToSlide(currentSlide - 1);
    });

    // 도트 클릭 리스너
    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const slideIndex = parseInt(e.target.getAttribute("data-slide"));
            goToSlide(slideIndex);
        });
    });

    // 키보드 제어 지원
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            goToSlide(currentSlide + 1);
        } else if (e.key === "ArrowLeft") {
            goToSlide(currentSlide - 1);
        }
    });

    // 모바일 터치 스와이프(Touch Swipe) 제어 추가
    let startX = 0;
    let endX = 0;

    slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50; // 스와이프 판정 최소 픽셀
        if (startX - endX > threshold) {
            goToSlide(currentSlide + 1); // 왼쪽 스와이프 -> 다음 슬라이드
        } else if (endX - startX > threshold) {
            goToSlide(currentSlide - 1); // 오른쪽 스와이프 -> 이전 슬라이드
        }
    }

    // 초기 상태 로드
    goToSlide(0);
});
