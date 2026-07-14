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
            index = totalSlides - 1; // 처음 슬라이드에서 이전 누르면 마지막으로
        } else if (index >= totalSlides) {
            index = 0; // 마지막 슬라이드에서 다음 누르면 처음으로
        }
        
        currentSlide = index;
        
        // 가로 슬라이딩 모션 적용
        slider.style.transform = `translateX(-${currentSlide * 100}vw)`;
        
        // 인디케이터 도트 갱신
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

    // 초기 상태 로드
    goToSlide(0);
});
