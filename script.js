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

    // Map section IDs to Animate.css classes
    const sectionAnimations = {
        '#hero': 'animate__fadeIn',
        '#why-choose': 'animate__fadeInLeft',
        '#subjects': 'animate__fadeInUp',
        '#how-it-works': 'animate__fadeInRight',
        '#schedule': 'animate__fadeInUp',
        '#mentors': 'animate__fadeInLeft',
        '#resources': 'animate__fadeInRight',
        '#testimonials': 'animate__fadeInUp',
        '#registration': 'animate__fadeIn',
        '#contact': 'animate__fadeInUp'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Animate.css integration
                for (const [selector, animClass] of Object.entries(sectionAnimations)) {
                    if (entry.target.matches(selector)) {
                        entry.target.classList.add('animate__animated', animClass);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe sections for animation
    [
        '#hero', '#why-choose', '#subjects', '#how-it-works', '#schedule', '#mentors', '#resources', '#testimonials', '#registration', '#contact'
    ].forEach(id => {
        const el = document.querySelector(id);
        if (el) observer.observe(el);
    });
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

    // Scroll To Top Button
    const scrollToTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
      scrollToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Typing Text Effect in Hero Section (new version)
    const typedText = document.getElementById('typed-text');
    const messages = [
      "Don't be a blind follower, be a critical thinker.",
      "Master Math and Science with GotIt.Study",
      "Join Live Sessions. Learn Smart."
    ];
    let messageIndex = 0, charIndex = 0;

    function type() {
      if (!typedText) return;
      if (charIndex < messages[messageIndex].length) {
        typedText.textContent += messages[messageIndex].charAt(charIndex++);
        setTimeout(type, 60);
      } else {
        setTimeout(erase, 2000);
      }
    }
    function erase() {
      if (!typedText) return;
      if (charIndex > 0) {
        typedText.textContent = messages[messageIndex].substring(0, --charIndex);
        setTimeout(erase, 40);
      } else {
        messageIndex = (messageIndex + 1) % messages.length;
        setTimeout(type, 500);
      }
    }
    type();

    // Mobile Menu Toggle with scroll lock
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    if (hamburgerBtn && navMenu) {
      hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        body.classList.toggle('overflow-hidden', navMenu.classList.contains('show'));
      });
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('show');
          body.classList.remove('overflow-hidden');
        });
      });
    }
    // Add loading="lazy" to all images and iframes
    document.querySelectorAll('img,iframe').forEach(el => {
      el.setAttribute('loading', 'lazy');
    });

    // Dynamic Weekly Timetable
    const subjects = [
      {
        name: 'Physics', tag: 'physics', mentor: 'Shibila KP', icon: 'fa-atom', times: ['7:00-8:00 PM', '8:00-9:00 PM', '6:00-7:00 PM']
      },
      {
        name: 'Chemistry', tag: 'chemistry', mentor: 'Shibila KP', icon: 'fa-flask', times: ['7:00-8:00 PM', '8:00-9:00 PM', '6:00-7:00 PM']
      },
      {
        name: 'Biology', tag: 'biology', mentor: 'Basima Palayi', icon: 'fa-dna', times: ['7:00-8:00 PM', '8:00-9:00 PM', '6:00-7:00 PM']
      },
      {
        name: 'Math', tag: 'math', mentor: 'Rashida Palazhi', icon: 'fa-square-root-alt', times: ['8:00-9:00 PM', '9:00-10:00 PM', '7:00-8:00 PM']
      },
      {
        name: 'Algebra', tag: 'algebra', mentor: 'Rashida Palazhi', icon: 'fa-square-root-alt', times: ['8:00-9:00 PM', '9:00-10:00 PM', '7:00-8:00 PM']
      },
      {
        name: 'Geometry', tag: 'geometry', mentor: 'Rashida Palazhi', icon: 'fa-square-root-alt', times: ['8:00-9:00 PM', '9:00-10:00 PM', '7:00-8:00 PM']
      },
      {
        name: 'Trigonometry', tag: 'trigonometry', mentor: 'Rashida Palazhi', icon: 'fa-square-root-alt', times: ['8:00-9:00 PM', '9:00-10:00 PM', '7:00-8:00 PM']
      },
      {
        name: 'Calculus', tag: 'calculus', mentor: 'Rashida Palazhi', icon: 'fa-square-root-alt', times: ['8:00-9:00 PM', '9:00-10:00 PM', '7:00-8:00 PM']
      },
      {
        name: 'English', tag: 'english', mentor: 'Basima Palayi', icon: 'fa-language', times: ['9:00-10:00 PM', '8:00-9:00 PM', '7:00-8:00 PM']
      },
      {
        name: 'Arabic', tag: 'arabic', mentor: 'Basima Palayi', icon: 'fa-language', times: ['9:00-10:00 PM', '8:00-9:00 PM', '7:00-8:00 PM']
      },
      {
        name: 'Grammar', tag: 'grammar', mentor: 'Rashida Palazhi', icon: 'fa-language', times: ['9:00-10:00 PM', '8:00-9:00 PM', '7:00-8:00 PM']
      },
      {
        name: 'Literature', tag: 'literature', mentor: 'Basima Palayi', icon: 'fa-language', times: ['9:00-10:00 PM', '8:00-9:00 PM', '7:00-8:00 PM']
      },
      {
        name: 'Communication', tag: 'communication', mentor: 'Basima Palayi', icon: 'fa-language', times: ['9:00-10:00 PM', '8:00-9:00 PM', '7:00-8:00 PM']
      }
    ];
    function getRandom(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const dynamicCells = document.querySelectorAll('.dynamic-class');
    const shuffledSubjects = shuffle([...subjects]);
    dynamicCells.forEach((cell, idx) => {
      const subj = shuffledSubjects[idx % shuffledSubjects.length];
      const time = getRandom(subj.times);
      cell.innerHTML = `
        <div class="class-label"><i class="fas ${subj.icon}"></i> ${subj.name}</div>
        <div class="time-slot">${time}</div>
        <span class="subject-tag ${subj.tag}">${subj.name}</span>
        <div class="mentor">${subj.mentor}</div>
      `;
    });
}); 
