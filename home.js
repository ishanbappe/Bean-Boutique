let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Auto-advance slides (optional)
let slideInterval = setInterval(() => plusSlides(1), 5000);

// Pause on hover
document.querySelector('.slideshow-container').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

document.querySelector('.slideshow-container').addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => plusSlides(1), 5000);
});
// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const loginModal = document.getElementById('loginModal');
    const signinModal = document.getElementById('signinModal');
    
    // Get the login button (you'll need to add this to your HTML)
    const loginBtn = document.querySelector('.login-btn'); // Add a login button with class 'login-btn'
    
    // When the user clicks the login button, open the login modal
    if (loginBtn) {
        loginBtn.onclick = function() {
            loginModal.style.display = 'block';
        };
    }
    
    // Add "New user? Sign in" link to login form
    const loginForm = document.getElementById('loginForm');
    const signInLink = document.createElement('p');
    signInLink.innerHTML = 'New user? <a href="#" id="switchToSignIn">Sign in</a>';
    signInLink.style.textAlign = 'center';
    signInLink.style.marginTop = '15px';
    loginForm.appendChild(signInLink);
    
    // Switch to sign-in modal when link is clicked
    document.getElementById('switchToSignIn').addEventListener('click', function(e) {
        e.preventDefault();
        closeLoginModal();
        signinModal.style.display = 'block';
    });
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === signinModal) {
            signinModal.style.display = 'none';
        }
    };
});

// Close login modal
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Close signin modal
function closeModal() {
    document.getElementById('signinModal').style.display = 'none';
}

// Login form handling
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('login-password').value;
    
    // Here you would typically send this data to a server for validation
    console.log('Login attempt with:', { username, password });
    
    // Simulate successful login
    alert('Login successful! (This is a demo)');
    
    // Close the modal
    closeLoginModal();
    
    // Clear the form
    this.reset();
});

// Sign-in form handling
function handleSignIn(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('signin-password').value;
    const errorElement = document.getElementById('signInError');
    
    // Basic validation
    if (!email || !password) {
        errorElement.textContent = 'Please fill in all fields.';
        errorElement.style.display = 'block';
        return false;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorElement.textContent = 'Please enter a valid email address.';
        errorElement.style.display = 'block';
        return false;
    }
    
    // Password length validation
    if (password.length < 6) {
        errorElement.textContent = 'Password must be at least 6 characters long.';
        errorElement.style.display = 'block';
        return false;
    }
    
    // Simulate successful sign-in
    console.log('Sign-in attempt with:', { email, password });
    alert('Account created successfully! (This is a demo)');
    
    // Close the modal
    closeModal();
    
    // Clear the form and hide error message
    document.getElementById('signInForm').reset();
    errorElement.style.display = 'none';
    
    return false;
}
;
document.head.appendChild(style);

// search 

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    // Create suggestions container
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    searchForm.appendChild(suggestionsContainer);
    
    // Handle form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSearch();
    });
    
    // Handle live input
    searchInput.addEventListener('input', function() {
        showSuggestions(this.value);
    });
    
    // Handle keyboard navigation
    searchInput.addEventListener('keydown', function(e) {
        const activeSuggestion = document.querySelector('.suggestion-item.active');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = activeSuggestion ? activeSuggestion.nextElementSibling : 
                          document.querySelector('.suggestion-item');
            if (next) {
                if (activeSuggestion) activeSuggestion.classList.remove('active');
                next.classList.add('active');
                searchInput.value = next.textContent;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = activeSuggestion ? activeSuggestion.previousElementSibling : null;
            if (prev) {
                activeSuggestion.classList.remove('active');
                prev.classList.add('active');
                searchInput.value = prev.textContent;
            }
        } else if (e.key === 'Enter' && activeSuggestion) {
            e.preventDefault();
            searchInput.value = activeSuggestion.textContent;
            handleSearch();
        }
    });
    
    // Click outside to close suggestions
    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    function handleSearch() {
        const query = searchInput.value.trim();
        
        if (!query) {
            showError("Please enter a search term");
            return;
        }
        
        // Add to search history (if not already there)
        if (!searchHistory.includes(query)) {
            searchHistory.unshift(query);
            // Keep only last 5 searches
            if (searchHistory.length > 5) searchHistory.pop();
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
        
        // Here you would typically send the search to your backend
        // For now we'll simulate a search result
        console.log("Searching for:", query);
        alert(`Searching for: ${query}\n\n(In a real app, this would show search results)`);
        
        // Clear input and hide suggestions
        searchInput.value = '';
        suggestionsContainer.style.display = 'none';
    }
    
    function showSuggestions(query) {
        if (!query) {
            // Show recent searches when input is empty
            showRecentSearches();
            return;
        }
        
        // In a real app, you would fetch these from your backend API
        // For demo, we'll use mock data
        const mockSuggestions = [
            `${query} tutorial`,
            `${query} examples`,
            `best ${query} practices`,
            `how to use ${query}`,
            `${query} documentation`
        ];
        
        // Combine with history matches
        const historyMatches = searchHistory.filter(item => 
            item.toLowerCase().includes(query.toLowerCase()));
        
        const allSuggestions = [...new Set([...historyMatches, ...mockSuggestions])].slice(0, 5);
        
        renderSuggestions(allSuggestions);
    }
    
    function showRecentSearches() {
        if (searchHistory.length > 0) {
            renderSuggestions(searchHistory, 'Recent searches');
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }
    
    function renderSuggestions(items, title = 'Suggestions') {
        suggestionsContainer.innerHTML = '';
        
        if (items.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        const titleElement = document.createElement('div');
        titleElement.className = 'suggestion-title';
        titleElement.textContent = title;
        suggestionsContainer.appendChild(titleElement);
        
        items.forEach(item => {
            const suggestion = document.createElement('div');
            suggestion.className = 'suggestion-item';
            suggestion.textContent = item;
            
            suggestion.addEventListener('click', function() {
                searchInput.value = item;
                handleSearch();
            });
            
            suggestion.addEventListener('mouseover', function() {
                document.querySelectorAll('.suggestion-item').forEach(el => 
                    el.classList.remove('active'));
                this.classList.add('active');
            });
            
            suggestionsContainer.appendChild(suggestion);
        });
        
        suggestionsContainer.style.display = 'block';
    }
    
    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'search-error';
        errorElement.textContent = message;
        
        // Remove previous error if exists
        const existingError = document.querySelector('.search-error');
        if (existingError) existingError.remove();
        
        searchForm.appendChild(errorElement);
        
        // Remove error after 3 seconds
        setTimeout(() => {
            errorElement.remove();
        }, 3000);
    }
});

// Add CSS for search components
const searchStyle = document.createElement('style');
searchStyle.textContent = `
.search-container {
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
}

#searchForm {
    display: flex;
    position: relative;
}

#searchInput {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    font-size: 16px;
}

#searchForm button {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}

#searchForm button:hover {
    background-color: #45a049;
}

.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    z-index: 100;
    display: none;
}

.suggestion-title {
    padding: 8px 15px;
    font-weight: bold;
    color: #666;
    border-bottom: 1px solid #eee;
}

.suggestion-item {
    padding: 10px 15px;
    cursor: pointer;
}

.suggestion-item:hover, .suggestion-item.active {
    background-color: #f5f5f5;
}

.search-error {
    position: absolute;
    top: 100%;
    left: 0;
    color: #d32f2f;
    background-color: #fde7e7;
    padding: 5px 10px;
    border-radius: 4px;
    margin-top: 5px;
    font-size: 14px;
    animation: fadeIn 0.3s;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
`;
document.head.appendChild(searchStyle);