// 네비게이션 활성화
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.room-card, .notice-item, .prologue-text').forEach(el => {
    observer.observe(el);
});

// 예약 폼 처리
function handleBooking(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const roomType = document.getElementById('roomType').value;
    const guests = document.getElementById('guests').value;
    
    const messageDiv = document.getElementById('bookingMessage');
    
    // 간단한 유효성 검사
    if (!name || !email || !phone || !checkIn || !checkOut || !roomType || !guests) {
        messageDiv.textContent = '모든 필수 항목을 입력해주세요.';
        messageDiv.classList.remove('success');
        messageDiv.classList.add('error');
        return;
    }
    
    // 체크인과 체크아웃 날짜 비교
    if (new Date(checkIn) >= new Date(checkOut)) {
        messageDiv.textContent = '체크아웃 날짜가 체크인 날짜보다 이후여야 합니다.';
        messageDiv.classList.remove('success');
        messageDiv.classList.add('error');
        return;
    }
    
    // 성공 메시지
    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const roomPrices = {
        standard: 150000,
        deluxe: 250000,
        suite: 400000
    };
    const totalPrice = roomPrices[roomType] * days;
    
    messageDiv.innerHTML = `
        <strong>예약이 신청되었습니다!</strong><br>
        <small>${name}님께서 ${checkIn}부터 ${checkOut}까지 ${days}박 예약을 신청하셨습니다. (총 ₩${totalPrice.toLocaleString()})<br>
        곧 ${email}로 확인 메일을 보내드리겠습니다.</small>
    `;
    messageDiv.classList.remove('error');
    messageDiv.classList.add('success');
    
    // 폼 초기화
    document.querySelector('.booking-form').reset();
    
    // 3초 후 메시지 숨기기
    setTimeout(() => {
        messageDiv.classList.remove('success');
    }, 5000);
}

// 날짜 입력 필드의 최소 날짜 설정 (오늘 이후)
window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').setAttribute('min', today);
    document.getElementById('checkOut').setAttribute('min', today);
});

// 부드러운 스크롤 (구형 브라우저 지원)
if (!document.documentElement.style.scrollBehavior) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 페이지 로드 애니메이션
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});