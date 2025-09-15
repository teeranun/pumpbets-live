// pumpbets.live - Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize timer and betting variables at the top
    let timeRemaining = 300; // 5 minutes in seconds
    let totalBetAmount = 0; // Total amount bet in current round
    let maxBetAmount = 0; // Maximum amount for this round (randomized each reset)
    let viewerCount = 1000; // Starting viewer count
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(84, 213, 146, 0.2)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Simulate live betting data updates
    function updateBettingData() {
        const oddsElements = document.querySelectorAll('.odds');
        const betButtons = document.querySelectorAll('.bet-btn');
        const stakeElements = document.querySelectorAll('.stake');
        
        console.log('updateBettingData called');
        console.log('Odds elements found:', oddsElements.length);
        console.log('Stake elements found:', stakeElements.length);
        
        
        // Generate complementary odds for YES/NO betting
        let yesPayout, noPayout;
        
        if (oddsElements.length >= 2) {
            // Generate a payout ratio between 0.2x and 1.8x for YES
            yesPayout = 0.2 + Math.random() * 1.6;
            
            // Calculate NO payout as the inverse (so total payout = 2x total bets)
            noPayout = 2 - yesPayout;
            
            // Fix floating point precision issues for 1.0x values
            if (Math.abs(yesPayout - 1.0) < 0.01) {
                yesPayout = 1.0;
            }
            if (Math.abs(noPayout - 1.0) < 0.01) {
                noPayout = 1.0;
            }
            
            // Apply to YES and NO options
            oddsElements[0].textContent = yesPayout.toFixed(1) + 'x';
            oddsElements[1].textContent = noPayout.toFixed(1) + 'x';
            
            
            // Update button text with random bet amounts
            const betAmounts = [10, 25, 50, 100, 250, 500, 1000];
            const randomAmount = betAmounts[Math.floor(Math.random() * betAmounts.length)];
            
            betButtons[0].textContent = `Bet ${randomAmount} $TOKEN`;
            betButtons[1].textContent = `Bet ${randomAmount} $TOKEN`;
            
            // Color based on actual payout values (above 1x = green, at/below 1x = red)
            const yesOption = oddsElements[0].closest('.bet-option');
            const noOption = oddsElements[1].closest('.bet-option');
            
            // Use the displayed values for color logic to avoid floating point issues
            const yesDisplayValue = parseFloat(oddsElements[0].textContent);
            const noDisplayValue = parseFloat(oddsElements[1].textContent);
            
            if (yesDisplayValue >= 1.0) {
                oddsElements[0].style.color = '#54d592'; // Green for YES (profitable or break-even)
                yesOption.style.borderColor = '#54d592'; // Green border for YES
            } else {
                oddsElements[0].style.color = '#ef4444'; // Red for YES (losing money)
                yesOption.style.borderColor = '#ef4444'; // Red border for YES
            }
            
            if (noDisplayValue >= 1.0) {
                oddsElements[1].style.color = '#54d592'; // Green for NO (profitable or break-even)
                noOption.style.borderColor = '#54d592'; // Green border for NO
            } else {
                oddsElements[1].style.color = '#ef4444'; // Red for NO (losing money)
                noOption.style.borderColor = '#ef4444'; // Red border for NO
            }
        } else {
            // Fallback for single odds elements
            oddsElements.forEach(odds => {
                const currentOdds = parseFloat(odds.textContent);
                const variation = (Math.random() - 0.5) * 1.6;
                const newOdds = Math.max(1.1, Math.min(10.0, currentOdds + variation));
                odds.textContent = newOdds.toFixed(1) + 'x';
            });
        }
        
        // Note: Betting amounts are now updated independently every second
    }

    // Update betting data every 1.5 seconds (more frequent)
    setInterval(updateBettingData, 1500);
    
    // Also run once immediately
    updateBettingData();
    
    // Countdown timer functionality
    
    function updateTimer() {
        const timerElement = document.querySelector('.bet-timer span');
        const viewerElement = document.querySelector('.viewer-count');
        
        if (timerElement) {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            timerElement.textContent = `${timeString} remaining`;
            
            // Update viewer count based on timer progress
            if (viewerElement) {
                const progress = (300 - timeRemaining) / 300; // 0 to 1
                viewerCount = Math.floor(1000 + (progress * 4000)); // 1000 to 5000
                viewerElement.textContent = `${(viewerCount / 1000).toFixed(1)}K viewers`;
            }
            
            timeRemaining--;
            
            // Reset to 5 minutes when it reaches 0
            if (timeRemaining < 0) {
                timeRemaining = 300;
                // Reset betting amounts and viewer count for new round
                totalBetAmount = 0;
                maxBetAmount = Math.floor(Math.random() * 100001); // Random max between 0-$100,000
                viewerCount = 1000; // Reset viewer count
            }
        }
    }
    
    // Initialize maxBetAmount on first load
    maxBetAmount = Math.floor(Math.random() * 100001);
    
    function updateBettingAmounts() {
        const stakeElements = document.querySelectorAll('.stake');
        const totalPotElement = document.querySelector('.total-pot');
        
        if (stakeElements.length >= 2) {
            // Only update if we're in a valid betting period (not at 0:00)
            if (timeRemaining > 0) {
                // Calculate how much of the 5-minute window has passed
                const progress = (300 - timeRemaining) / 300; // 0 to 1
                
                // Gradually increase total amount based on progress (no randomness)
                totalBetAmount = Math.floor(maxBetAmount * progress);
                
                // Split between YES and NO based on current odds (using our proven math)
                const oddsElements = document.querySelectorAll('.odds');
                if (oddsElements.length >= 2) {
                    const yesDisplayValue = parseFloat(oddsElements[0].textContent);
                    const noDisplayValue = parseFloat(oddsElements[1].textContent);
                    
                    let yesAmount, noAmount;
                    
                    // Use the same logic we perfected earlier
                    if (Math.abs(yesDisplayValue - noDisplayValue) < 0.1) {
                        // Equal odds = equal betting
                        yesAmount = Math.floor(totalBetAmount / 2);
                        noAmount = totalBetAmount - yesAmount;
                    } else {
                        // Distribute based on inverse odds so expected payout is equal
                        // Higher odds = less betting, lower odds = more betting
                        const yesRatio = noDisplayValue / (yesDisplayValue + noDisplayValue);
                        const noRatio = yesDisplayValue / (yesDisplayValue + noDisplayValue);
                        
                        yesAmount = Math.floor(totalBetAmount * yesRatio);
                        noAmount = totalBetAmount - yesAmount;
                    }
                    
                    // Apply to YES and NO stakes
                    stakeElements[0].textContent = '$' + yesAmount.toLocaleString();
                    stakeElements[1].textContent = '$' + noAmount.toLocaleString();
                    
                    // Update total pot display
                    if (totalPotElement) {
                        const totalPot = yesAmount + noAmount;
                        totalPotElement.textContent = `Total Pot: $${totalPot.toLocaleString()}`;
                    }
                }
            } else {
                // When timer is at 0:00, show $0 for both sides
                stakeElements[0].textContent = '$0';
                stakeElements[1].textContent = '$0';
                
                // Update total pot to $0
                if (totalPotElement) {
                    totalPotElement.textContent = 'Total Pot: $0';
                }
            }
        }
    }
    
    // Update timer every second
    setInterval(updateTimer, 1000);
    
    // Update betting amounts every second for smooth growth
    setInterval(updateBettingAmounts, 1000);
    
    // Run timer and betting amounts immediately
    updateTimer();
    updateBettingAmounts();

    console.log('🎲 pumpbets.live landing page loaded successfully!');
});