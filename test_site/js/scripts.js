/**
 * Test Website - Main JavaScript File
 */

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initContactForm();
});

/**
 * Initialize the contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    
    if (contactForm && sendMessageBtn) {
        sendMessageBtn.addEventListener('click', function(event) {
            try {
                // Get the modal element
                const successModalElement = document.getElementById('successModal');
                
                if (!successModalElement) {
                    console.error('Success modal element not found');
                    alert('Your message has been sent successfully!');
                    contactForm.reset();
                    return;
                }
                
                if (typeof bootstrap === 'undefined') {
                    console.error('Bootstrap is not loaded');
                    alert('Your message has been sent successfully!');
                    contactForm.reset();
                    return;
                }
                
                const successModal = new bootstrap.Modal(successModalElement);
                
                // Show the modal
                successModal.show();
            } catch (error) {
                console.error('Error showing modal:', error);
                alert('Your message has been sent successfully!');
            }
            
            // Reset the form
            contactForm.reset();
        });
    }
}
