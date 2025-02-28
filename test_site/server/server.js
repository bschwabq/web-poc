/**
 * Simple Node.js server for the test website
 * Handles contact form submissions and serves static files
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..'))); // Serve static files from parent directory

// API Routes
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide name, email, and message' 
            });
        }
        
        // In a real app, you would store this in a database
        // For this test site, we'll save to a JSON file
        const contactData = {
            id: Date.now(),
            name,
            email,
            subject: subject || 'No Subject',
            message,
            date: new Date().toISOString()
        };
        
        // Create data directory if it doesn't exist
        const dataDir = path.join(__dirname, 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }
        
        // Read existing contacts, if any
        let contacts = [];
        const contactsFile = path.join(dataDir, 'contacts.json');
        
        if (fs.existsSync(contactsFile)) {
            const data = fs.readFileSync(contactsFile);
            contacts = JSON.parse(data);
        }
        
        // Add new contact
        contacts.push(contactData);
        
        // Save updated contacts
        fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
        
        // Send success response
        res.status(200).json({
            success: true,
            message: 'Contact form submitted successfully',
            data: contactData
        });
        
        console.log(`New contact form submission from ${name} (${email})`);
    } catch (error) {
        console.error('Error handling contact form submission:', error);
        res.status(500).json({
            success: false,
            message: 'Server error processing your request'
        });
    }
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

// Handle all other routes - serve index.html
app.get('*', (req, res) => {
    // Check if the requested path exists
    const requestedPath = path.join(__dirname, '..', req.path);
    
    if (fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()) {
        // If the file exists, serve it
        res.sendFile(requestedPath);
    } else {
        // If the URL path matches one of our pages, serve that page
        const pages = ['/about.html', '/gallery.html', '/blog.html', '/contact.html'];
        
        if (pages.includes(req.path)) {
            res.sendFile(path.join(__dirname, '..', req.path));
        } else if (req.path === '/') {
            // Serve index.html for the root path
            res.sendFile(path.join(__dirname, '..', 'index.html'));
        } else {
            // Otherwise, serve the 404 page
            res.status(404).sendFile(path.join(__dirname, '..', '404.html'));
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
});
