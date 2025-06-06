// Enhanced form submission with email functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
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

    // Handle Basic plan form submission
    const basicForm = document.getElementById('basic-form');
    if (basicForm) {
        basicForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                tier: 'Basic Plan - $29.99',
                name: document.getElementById('basic-name').value,
                email: document.getElementById('basic-email').value,
                business: document.getElementById('basic-business').value,
                description: document.getElementById('basic-description').value,
                colors: document.getElementById('basic-colors').value,
                content: document.getElementById('basic-content').value
            };
            
            // Send email with order details
            sendOrderEmail(formData);
        });
    }

    // Handle Premium plan form submission
    const premiumForm = document.getElementById('premium-form');
    if (premiumForm) {
        premiumForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                tier: 'Premium Plan - $99.99',
                name: document.getElementById('premium-name').value,
                email: document.getElementById('premium-email').value,
                business: document.getElementById('premium-business').value,
                description: document.getElementById('premium-description').value,
                image1Location: document.getElementById('image1-location').value,
                image2Location: document.getElementById('image2-location').value,
                image3Location: document.getElementById('image3-location').value,
                image4Location: document.getElementById('image4-location').value,
                image5Location: document.getElementById('image5-location').value,
                logoUpload: document.getElementById('logo-upload').files[0] ? document.getElementById('logo-upload').files[0].name : 'No logo uploaded',
                fontStyle: document.getElementById('font-style').value,
                overallStyle: document.getElementById('overall-style').value,
                contentText: document.getElementById('content-text').value
            };
            
            // Send email with order details
            sendOrderEmail(formData);
        });
    }

    // Function to send order email
    function sendOrderEmail(orderData) {
        // Create email content
        let emailContent = `NEW WEBSITE ORDER RECEIVED\n\n`;
        emailContent += `TIER PURCHASED: ${orderData.tier}\n\n`;
        emailContent += `CUSTOMER INFORMATION:\n`;
        emailContent += `Name: ${orderData.name}\n`;
        emailContent += `Email: ${orderData.email}\n`;
        emailContent += `Business/Project Name: ${orderData.business}\n\n`;
        emailContent += `WEBSITE SPECIFICATIONS:\n`;
        emailContent += `Description: ${orderData.description}\n`;
        
        if (orderData.tier.includes('Basic')) {
            emailContent += `Preferred Colors: ${orderData.colors}\n`;
            emailContent += `Content Details: ${orderData.content}\n`;
        } else {
            emailContent += `Image 1 Location: ${orderData.image1Location}\n`;
            emailContent += `Image 2 Location: ${orderData.image2Location}\n`;
            emailContent += `Image 3 Location: ${orderData.image3Location}\n`;
            emailContent += `Image 4 Location: ${orderData.image4Location}\n`;
            emailContent += `Image 5 Location: ${orderData.image5Location}\n`;
            emailContent += `Logo Upload: ${orderData.logoUpload}\n`;
            emailContent += `Font Style: ${orderData.fontStyle}\n`;
            emailContent += `Overall Style: ${orderData.overallStyle}\n`;
            emailContent += `Content Text: ${orderData.contentText}\n`;
        }
        
        emailContent += `\nOrder submitted at: ${new Date().toLocaleString()}\n`;
        
        // Send email using EmailJS or similar service
        // For now, we'll use a simple mailto link as a fallback
        const subject = encodeURIComponent(`New ${orderData.tier} Order from ${orderData.name}`);
        const body = encodeURIComponent(emailContent);
        const mailtoLink = `mailto:admin@oneclicksitebuilder.com?subject=${subject}&body=${body}`;
        
        // Try to send via EmailJS first (requires EmailJS setup)
        if (typeof emailjs !== 'undefined') {
            emailjs.send('service_id', 'template_id', {
                to_email: 'admin@oneclicksitebuilder.com',
                subject: `New ${orderData.tier} Order from ${orderData.name}`,
                message: emailContent
            }).then(function(response) {
                showSuccessMessage('Order submitted successfully! You will receive a confirmation email shortly.');
            }, function(error) {
                // Fallback to mailto
                window.location.href = mailtoLink;
                showSuccessMessage('Order details prepared. Please send the email that just opened.');
            });
        } else {
            // Fallback to mailto
            window.location.href = mailtoLink;
            showSuccessMessage('Order details prepared. Please send the email that just opened.');
        }
    }

    // Function to show success message
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        successDiv.textContent = message;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Tech badge animations
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.5}s`;
    });
});


// Plan selection function
function selectPlan(planType) {
    if (planType === 'basic') {
        window.location.href = 'basic.html';
    } else if (planType === 'premium') {
        window.location.href = 'premium.html';
    }
}

