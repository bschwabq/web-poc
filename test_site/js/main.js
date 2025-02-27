/**
 * Main JavaScript file for the test website
 * Contains interactive functionality
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Gallery modal functionality
    setupGalleryModals();
    
    // Blog search functionality
    const blogSearchInput = document.getElementById('blogSearch');
    if (blogSearchInput) {
        blogSearchInput.addEventListener('input', handleBlogSearch);
    }
    
    // Add fade-in animation to elements with data-animate attribute
    animateElements();
});

/**
 * Handles contact form submission
 * @param {Event} event - The form submission event
 */
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formDataObj = {};
    
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });
    
    // Client-side validation
    if (!validateForm(formDataObj)) {
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    
    // Send form data to server
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObj)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Show success message
        form.reset();
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success mt-3';
        successAlert.textContent = 'Thank you for your message! We will get back to you soon.';
        form.appendChild(successAlert);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successAlert.remove();
        }, 5000);
    })
    .catch(error => {
        console.error('Error:', error);
        // Show error message
        const errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-danger mt-3';
        errorAlert.textContent = 'There was an error sending your message. Please try again later.';
        form.appendChild(errorAlert);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorAlert.remove();
        }, 5000);
    })
    .finally(() => {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    });
}

/**
 * Validates form data
 * @param {Object} formData - The form data object
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(formData) {
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    
    // Validate name (required)
    if (!formData.name || formData.name.trim() === '') {
        const nameInput = document.getElementById('name');
        nameInput.classList.add('is-invalid');
        
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = 'Please enter your name';
        
        nameInput.parentNode.appendChild(feedback);
        isValid = false;
    }
    
    // Validate email (required and format)
    if (!formData.email || formData.email.trim() === '') {
        const emailInput = document.getElementById('email');
        emailInput.classList.add('is-invalid');
        
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = 'Please enter your email address';
        
        emailInput.parentNode.appendChild(feedback);
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        const emailInput = document.getElementById('email');
        emailInput.classList.add('is-invalid');
        
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = 'Please enter a valid email address';
        
        emailInput.parentNode.appendChild(feedback);
        isValid = false;
    }
    
    // Validate message (required)
    if (!formData.message || formData.message.trim() === '') {
        const messageInput = document.getElementById('message');
        messageInput.classList.add('is-invalid');
        
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = 'Please enter your message';
        
        messageInput.parentNode.appendChild(feedback);
        isValid = false;
    }
    
    return isValid;
}

/**
 * Sets up gallery modal functionality
 */
function setupGalleryModals() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            const imgAlt = item.querySelector('img').getAttribute('alt');
            
            // Create modal if it doesn't exist
            let galleryModal = document.getElementById('galleryModal');
            
            if (!galleryModal) {
                const modalHTML = `
                    <div class="modal fade" id="galleryModal" tabindex="-1" aria-labelledby="galleryModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="galleryModalLabel">Image Preview</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body text-center">
                                    <img src="" class="img-fluid" id="galleryModalImage" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.insertAdjacentHTML('beforeend', modalHTML);
                galleryModal = document.getElementById('galleryModal');
            }
            
            // Update modal content
            const modalImage = document.getElementById('galleryModalImage');
            modalImage.setAttribute('src', imgSrc);
            modalImage.setAttribute('alt', imgAlt);
            
            // Show modal
            const bsGalleryModal = new bootstrap.Modal(galleryModal);
            bsGalleryModal.show();
        });
    });
}

/**
 * Handles blog search functionality
 * @param {Event} event - The input event
 */
function handleBlogSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        const title = post.querySelector('.blog-post-title').textContent.toLowerCase();
        const content = post.querySelector('.blog-post-excerpt').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

/**
 * Adds fade-in animation to elements with data-animate attribute
 */
function animateElements() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}
