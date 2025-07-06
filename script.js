document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript loaded successfully!');
    
    // Sticky Navigation and Logo
    const stickyNav = document.getElementById('stickyNav');
    const stickyLogo = document.getElementById('stickyLogo');
    const mainLogo = document.getElementById('mainLogo');

    console.log('Elements found:', { stickyNav, stickyLogo, mainLogo });

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        console.log('Scroll position:', scrollTop);
        
        // Show sticky navigation after hero section
        if (scrollTop > 100) {
            console.log('Adding show class to navigation');
            stickyNav.classList.add('show');
            stickyLogo.classList.add('show');
        } else {
            console.log('Removing show class from navigation');
            stickyNav.classList.remove('show');
            stickyLogo.classList.remove('show');
        }
    });

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

    // Interactive Schedule Table
    const scheduleCells = document.querySelectorAll('.schedule-table-real td.clickable');
    scheduleCells.forEach(cell => {
        cell.addEventListener('click', function() {
            const timeSlot = this.querySelector('.time-slot').textContent;
            const subject = this.querySelector('.subject-tag').textContent;
            const mentor = this.querySelector('.mentor').textContent;
            showClassDetails(timeSlot, subject, mentor);
        });
    });

    // Schedule Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const scheduleRows = document.querySelectorAll('.schedule-table-real tbody tr[data-subject]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter schedule rows
            scheduleRows.forEach(row => {
                if (filter === 'all' || row.getAttribute('data-subject') === filter) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // Class Details Modal
    function showClassDetails(time, subject, mentor) {
        const modal = document.createElement('div');
        modal.className = 'class-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>${subject} Class</h3>
                <div class="class-info">
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <span>Time: ${time}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-user"></i>
                        <span>Mentor: ${mentor}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-users"></i>
                        <span>Max Students: 15</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-video"></i>
                        <span>Platform: Zoom/Google Meet</span>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="joinClass('${subject}', '${time}')">
                        <i class="fas fa-play"></i> Join Class
                    </button>
                    <button class="btn-secondary" onclick="addToCalendar('${subject}', '${time}')">
                        <i class="fas fa-calendar-plus"></i> Add to Calendar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Animated Counter for Statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate counters in hero statistics
                if (entry.target.classList.contains('stat-item')) {
                    const counter = entry.target.querySelector('.stat-number');
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .step, .mentor-card, .testimonial-card, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // Interactive Progress Tracking
    function initializeProgressTracking() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    // Study Timer Functionality
    function initializeStudyTimer() {
        const timerButton = document.querySelector('.timer-button');
        if (timerButton) {
            timerButton.addEventListener('click', function() {
                showStudyTimer();
            });
        }
    }

    function showStudyTimer() {
        const modal = document.createElement('div');
        modal.className = 'timer-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Study Timer</h3>
                <div class="timer-display">
                    <div class="time">25:00</div>
                    <div class="timer-controls">
                        <button class="timer-btn" data-time="25">25 min</button>
                        <button class="timer-btn" data-time="45">45 min</button>
                        <button class="timer-btn" data-time="60">60 min</button>
                    </div>
                    <div class="timer-actions">
                        <button class="btn-primary start-timer">Start</button>
                        <button class="btn-secondary pause-timer" style="display: none;">Pause</button>
                        <button class="btn-danger reset-timer">Reset</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Timer functionality
        let timeLeft = 25 * 60; // 25 minutes in seconds
        let timerInterval;
        let isRunning = false;
        
        const timeDisplay = modal.querySelector('.time');
        const startBtn = modal.querySelector('.start-timer');
        const pauseBtn = modal.querySelector('.pause-timer');
        const resetBtn = modal.querySelector('.reset-timer');
        const timerBtns = modal.querySelectorAll('.timer-btn');
        
        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        function startTimer() {
            if (!isRunning) {
                isRunning = true;
                startBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';
                timerInterval = setInterval(() => {
                    timeLeft--;
                    updateDisplay();
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        alert('Study session completed!');
                        resetTimer();
                    }
                }, 1000);
            }
        }
        
        function pauseTimer() {
            if (isRunning) {
                isRunning = false;
                clearInterval(timerInterval);
                startBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
            }
        }
        
        function resetTimer() {
            clearInterval(timerInterval);
            isRunning = false;
            timeLeft = 25 * 60;
            updateDisplay();
            startBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
        }
        
        // Event listeners
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        
        timerBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const time = parseInt(this.getAttribute('data-time'));
                timeLeft = time * 60;
                updateDisplay();
                resetTimer();
            });
        });
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Dark Mode Toggle
    function initializeDarkMode() {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        console.log('Dark mode toggle found:', darkModeToggle);
        
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function() {
                console.log('Dark mode toggle clicked!');
                document.body.classList.toggle('dark-mode');
                const icon = this.querySelector('i');
                if (document.body.classList.contains('dark-mode')) {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            });
        }
    }

    // Initialize all functions
    initializeProgressTracking();
    initializeStudyTimer();
    initializeDarkMode();

    // Global functions for modal actions
    window.joinClass = function(subject, time) {
        alert(`Joining ${subject} class at ${time}`);
        // Add your join class logic here
    };

    window.addToCalendar = function(subject, time) {
        alert(`Adding ${subject} class at ${time} to calendar`);
        // Add your calendar integration logic here
    };
}); 
