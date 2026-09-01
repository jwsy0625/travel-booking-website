// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Booking form submission
const bookingForm = document.querySelector('.booking-form');
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        checkIn: document.getElementById('checkin').value,
        checkOut: document.getElementById('checkout').value,
        guests: document.getElementById('guests').value,
        room: document.getElementById('room').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };
    
    // Validate dates
    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
        alert('Check-out date must be after check-in date');
        return;
    }
    
    console.log('Reservation submitted:', formData);
    alert(`예약이 접수되었습니다!\n\n체크인: ${formData.checkIn}\n체크아웃: ${formData.checkOut}\n게스트: ${formData.guests}명\n방 타입: ${formData.room}`);
    
    // Reset form
    bookingForm.reset();
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll('.feature-card, .room-card, .notice-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Set minimum check-out date when check-in is selected
const checkInInput = document.getElementById('checkin');
const checkOutInput = document.getElementById('checkout');

checkInInput.addEventListener('change', function() {
    const checkInDate = new Date(this.value);
    checkInDate.setDate(checkInDate.getDate() + 1);
    
    const minCheckOut = checkInDate.toISOString().split('T')[0];
    checkOutInput.min = minCheckOut;
});

// Set today as minimum check-in date
const today = new Date().toISOString().split('T')[0];
checkInInput.min = today;

// Button interactions
document.querySelector('.btn-accommodation').addEventListener('click', function() {
    document.querySelector('#booking').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Room type pricing
const roomPrices = {
    deluxe: 450000,
    premium: 320000,
    standard: 200000
};

// Login button
document.querySelector('.btn-login').addEventListener('click', function() {
    alert('로그인 페이지로 이동합니다.');
    // window.location.href = '/login';
});

// Register button
document.querySelector('.btn-register').addEventListener('click', function() {
    alert('회원가입 페이지로 이동합니다.');
    // window.location.href = '/register';
});

// Calculate total price (optional enhancement)
function calculateTotalPrice() {
    const checkInDate = new Date(document.getElementById('checkin').value);
    const checkOutDate = new Date(document.getElementById('checkout').value);
    const roomType = document.getElementById('room').value;
    
    if (checkInDate && checkOutDate && roomType) {
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        const pricePerNight = roomPrices[roomType] || 0;
        const totalPrice = nights * pricePerNight;
        
        console.log(`Total: ${totalPrice.toLocaleString()}원 (${nights}박)`);
    }
}

document.getElementById('checkin').addEventListener('change', calculateTotalPrice);
document.getElementById('checkout').addEventListener('change', calculateTotalPrice);
document.getElementById('room').addEventListener('change', calculateTotalPrice);

// Lazy load images (if added in future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('Travel Booking Website - Script Loaded');
