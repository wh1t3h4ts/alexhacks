// Starlex WiFi Billing System - Main JavaScript
// Handles form validation, plan selection, countdown timers, and UI interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializePlanSelection();
    initializeFormValidation();
    initializeCountdownTimer();
    initializeThemeToggle();
    initializeMobileMenu();
});

// Plan Selection Functionality
function initializePlanSelection() {
    const planCards = document.querySelectorAll('.plan-card');
    const selectedPlanInput = document.getElementById('selectedPlan');

    planCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            planCards.forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            this.classList.add('selected');

            // Update hidden input
            const planId = this.dataset.planId;
            if (selectedPlanInput) {
                selectedPlanInput.value = planId;
            }

            // Update proceed button
            updateProceedButton(planId);
        });
    });
}

function updateProceedButton(planId) {
    const proceedBtn = document.getElementById('proceedBtn');
    if (proceedBtn && planId) {
        proceedBtn.disabled = false;
        proceedBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        proceedBtn.classList.add('hover:bg-indigo-600');
    }
}

// Form Validation
function initializeFormValidation() {
    const phoneInput = document.getElementById('phone');
    const paymentForm = document.getElementById('paymentForm');

    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            validatePhoneNumber(this);
        });
    }

    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            if (!validatePaymentForm()) {
                e.preventDefault();
            }
        });
    }
}

function validatePhoneNumber(input) {
    const phone = input.value.replace(/\s+/g, '');
    const phoneRegex = /^(\+254|254|0)[17]\d{8}$/;

    if (phoneRegex.test(phone)) {
        input.classList.remove('border-red-500');
        input.classList.add('border-green-500');
        return true;
    } else {
        input.classList.remove('border-green-500');
        input.classList.add('border-red-500');
        return false;
    }
}

function validatePaymentForm() {
    const phone = document.getElementById('phone');
    const selectedPlan = document.getElementById('selectedPlan');
    let isValid = true;

    // Validate phone number
    if (phone && !validatePhoneNumber(phone)) {
        showError('Please enter a valid Kenyan phone number');
        isValid = false;
    }

    // Validate plan selection
    if (selectedPlan && !selectedPlan.value) {
        showError('Please select a plan');
        isValid = false;
    }

    return isValid;
}

function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message bg-red-600 text-white p-3 rounded-lg mb-4';
    errorDiv.textContent = message;

    const form = document.getElementById('paymentForm') || document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(errorDiv, form);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
}

// Countdown Timer for Success Page
function initializeCountdownTimer() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    let timeLeft = 30; // 30 seconds

    const timer = setInterval(() => {
        countdownElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            // Auto-redirect or show message
            showRedirectMessage();
        }
        timeLeft--;
    }, 1000);
}

function showRedirectMessage() {
    const redirectMsg = document.getElementById('redirectMessage');
    if (redirectMsg) {
        redirectMsg.classList.remove('hidden');
    }
}

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme);

    themeToggle.addEventListener('click', function() {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

function setTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);

    // Update toggle button icon
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('svg');
        if (theme === 'dark') {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
        } else {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
        }
    }
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarNav = document.getElementById('navbarNav');

    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', function() {
            navbarNav.classList.toggle('mobile-menu');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarNav.contains(e.target)) {
                navbarNav.classList.remove('mobile-menu');
            }
        });

        // Close menu when clicking on a link
        navbarNav.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                navbarNav.classList.remove('mobile-menu');
            }
        });
    }
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES'
    }).format(amount);
}

function showLoading(button) {
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;

    return function() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form auto-submit prevention for demo
document.addEventListener('submit', function(e) {
    const form = e.target;
    if (form.classList.contains('demo-form')) {
        e.preventDefault();
        showToast('This is a demo form. In production, this would process the payment.');
    }
});
