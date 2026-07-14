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

    // 데스크탑 마우스 휠 스크롤 연동 추가
    let isWheeling = false;
    window.addEventListener("wheel", (e) => {
        // 카드 내부에 스크롤이 동작 중일 때는 슬라이드 전환을 양보하여 스크롤 흐름 유지
        const activeCard = document.querySelector(".slide-content");
        if (e.target.closest(".info-card")) {
            const card = e.target.closest(".info-card");
            // 카드 내용이 세로로 넘치고 카드가 스크롤 중일 때는 휠을 가로채지 않음
            if (card.scrollHeight > card.clientHeight) {
                const isScrollingDown = e.deltaY > 0;
                const isAtBottom = card.scrollHeight - card.scrollTop <= card.clientHeight + 1;
                const isAtTop = card.scrollTop === 0;
                
                if (isScrollingDown && !isAtBottom) return;
                if (!isScrollingDown && !isAtTop) return;
            }
        }

        if (isWheeling) return;
        isWheeling = true;
        setTimeout(() => { isWheeling = false; }, 900); // 0.9초 휠 딜레이 (디바운스)
        
        if (e.deltaY > 0) {
            goToSlide(currentSlide + 1);
        } else if (e.deltaY < 0) {
            goToSlide(currentSlide - 1);
        }
    }, { passive: true });

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
