// IMMEDIATE CONSOLE TEST
        console.log('🟢 JavaScript is running!');
        console.log('🟢 DOM readyState:', document.readyState);
        
        // Simple test - this should run immediately
        console.log('Script is running!');
        
        // Test if we can find the bento grid elements
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded!');
            
            const bentoGrid = document.querySelector('.bento-grid');
            const items = document.querySelectorAll('.bento-item');
            
            console.log('Bento grid found:', bentoGrid);
            console.log('Bento items found:', items.length);
            
            if (bentoGrid && items.length > 0) {
                // Add simple click test
                items.forEach((item, index) => {
                    item.addEventListener('click', () => {
                        console.log(`Clicked item ${index + 1}`);
                        bentoGrid.style.backgroundColor = '#f0f0f0';
                        setTimeout(() => {
                            bentoGrid.style.backgroundColor = '';
                        }, 1000);
                    });
                });
                
                // Set up the actual hover functionality
                setupBentoGridSwapping();
            }
        });
        
        function setupBentoGridSwapping() {
            console.log('Setting up Bento Grid swapping...');
            const bentoGrid = document.querySelector('.bento-grid');
            const item3 = document.querySelector('.bento-item-3'); // Safety Excellence
            const item5 = document.querySelector('.bento-item-5'); // Academic Partnerships
            
            console.log('Items found:', { item3, item5 });
            
            // Safety Excellence (item 3) hover - swaps size with Performance Excellence (item 6)
            if (item3) {
                item3.addEventListener('mouseenter', () => {
                    console.log('✅ Safety Excellence mouseenter - growing to medium size');
                    bentoGrid.classList.add('swap-3-6');
                });
                
                item3.addEventListener('mouseleave', () => {
                    console.log('✅ Safety Excellence mouseleave - returning to small size');
                    bentoGrid.classList.remove('swap-3-6');
                });
            }
            
            // Academic Partnerships (item 5) hover - swaps size with SOS Laboratory (item 2)
            if (item5) {
                item5.addEventListener('mouseenter', () => {
                    console.log('✅ Academic Partnerships mouseenter - growing to medium size');
                    bentoGrid.classList.add('swap-5-3');
                });
                
                item5.addEventListener('mouseleave', () => {
                    console.log('✅ Academic Partnerships mouseleave - returning to small size');
                    bentoGrid.classList.remove('swap-5-3');
                });
            }
            
            console.log('Bento Grid swapping setup complete!');
        }

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        
        function updateNavbar() {
            if (window.scrollY > 50) {
                navbar.classList.remove('at-top');
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
                navbar.classList.add('at-top');
            }
        }
        
        // Initial check
        updateNavbar();
        
        // Listen for scroll events
        window.addEventListener('scroll', updateNavbar);

        // Mobile Menu Toggle - with null checks
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuClose = document.getElementById('mobile-menu-close');

        if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
            mobileMenuBtn.addEventListener('click', () => {
                const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
                mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
                mobileMenu.setAttribute('aria-hidden', isExpanded);
                mobileMenu.classList.add('active');
                
                // Focus the close button for better accessibility
                setTimeout(() => mobileMenuClose.focus(), 100);
            });

            mobileMenuClose.addEventListener('click', () => {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileMenu.classList.remove('active');
                
                // Return focus to the menu button
                mobileMenuBtn.focus();
            });

            // Close mobile menu when clicking on links
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenu.setAttribute('aria-hidden', 'true');
                    mobileMenu.classList.remove('active');
                });
            });
            
            // Close menu with escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenu.setAttribute('aria-hidden', 'true');
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.focus();
                }
            });
        } else {
            console.log('⚠️ Mobile menu elements not found - skipping mobile menu setup');
        }

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

        // Counter Animation
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toLocaleString();
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
                    
                    // Animate counters when stats section is visible
                    if (entry.target.querySelector('.counter')) {
                        const counters = entry.target.querySelectorAll('.counter');
                        counters.forEach(counter => {
                            const target = parseInt(counter.textContent.replace(/,/g, ''));
                            counter.textContent = '0';
                            setTimeout(() => animateCounter(counter, target), 200);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animations
        document.querySelectorAll('.fade-in, section').forEach(el => {
            observer.observe(el);
        });

        // Back to top button
        const backToTopBtn = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

    

        // Form submission (placeholder) - only add if form exists
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            });
        }

        // Loading animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            initializeHeroVideo();
        });

        // Hero Video Management
        function initializeHeroVideo() {
            const video = document.getElementById('hero-video');
            const videoContainer = document.getElementById('hero-video-container');
            const heroContent = document.getElementById('hero-content');
            const floatingArrow = document.getElementById('floating-arrow');
            const imageBg = document.getElementById('hero-image-bg');

            console.log('Initializing hero video...');
            console.log('Video element:', video);
            console.log('Video container:', videoContainer);
            console.log('Image background:', imageBg);

            if (video) {
                // Set video playback speed to 2x
                video.playbackRate = 2.0;
                console.log('Video playback rate set to:', video.playbackRate);
                
                // Hide content initially while video plays
                heroContent.classList.add('hidden');
                floatingArrow.classList.add('hidden');

                // Add debug class to see if image loads
                imageBg.classList.add('debug-visible');
                console.log('Added debug-visible class to image background');

                // When video starts playing
                video.addEventListener('loadeddata', () => {
                    console.log('Video loaded and ready to play');
                });

                // When video ends
                video.addEventListener('ended', () => {
                    console.log('Video ended, transitioning to image');
                    console.log('Image background element before transition:', imageBg);
                    
                    // Remove debug class and add visible class
                    imageBg.classList.remove('debug-visible');
                    imageBg.classList.add('visible');
                    console.log('Added visible class to image background');
                    
                    // Fade out video container with explicit style
                    videoContainer.style.transition = 'opacity 1s ease-out';
                    videoContainer.style.opacity = '0';
                    console.log('Video container opacity set to 0');
                    
                    // After a short delay, show content
                    setTimeout(() => {
                        heroContent.classList.remove('hidden');
                        floatingArrow.classList.remove('hidden');
                        console.log('Hero content and arrow shown');
                        
                        // Remove video container from DOM to free memory
                        setTimeout(() => {
                            videoContainer.style.display = 'none';
                            console.log('Video container hidden');
                        }, 1500);
                    }, 800);
                });

                // Error handling
                video.addEventListener('error', (e) => {
                    console.error('Video error:', e);
                    // Fallback to image immediately
                    videoContainer.style.display = 'none';
                    imageBg.classList.remove('debug-visible');
                    imageBg.classList.add('visible');
                    heroContent.classList.remove('hidden');
                    floatingArrow.classList.remove('hidden');
                    console.log('Fallback to image due to video error');
                });

                // For mobile devices or autoplay restrictions
                video.addEventListener('pause', () => {
                    if (video.currentTime === 0) {
                        // Autoplay was blocked, show content immediately
                        console.log('Autoplay blocked, showing fallback');
                        videoContainer.style.display = 'none';
                        imageBg.classList.remove('debug-visible');
                        imageBg.classList.add('visible');
                        heroContent.classList.remove('hidden');
                        floatingArrow.classList.remove('hidden');
                    }
                });

                // If video fails to load after 3 seconds, show fallback
                setTimeout(() => {
                    if (video.readyState === 0) {
                        console.log('Video failed to load, showing fallback');
                        videoContainer.style.display = 'none';
                        imageBg.classList.remove('debug-visible');
                        imageBg.classList.add('visible');
                        heroContent.classList.remove('hidden');
                        floatingArrow.classList.remove('hidden');
                    }
                }, 3000);

                // Manual play attempt for better browser support
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log('Autoplay prevented:', error);
                        // Fallback to image
                        videoContainer.style.display = 'none';
                        imageBg.classList.remove('debug-visible');
                        imageBg.classList.add('visible');
                        heroContent.classList.remove('hidden');
                        floatingArrow.classList.remove('hidden');
                    });
                }
            } else {
                // If video element doesn't exist, show content immediately
                console.log('Video element not found, showing content');
                imageBg.classList.add('visible');
                heroContent.classList.remove('hidden');
                floatingArrow.classList.remove('hidden');
            }
        }

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('#home');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add CSS class for loaded state
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            body:not(.loaded) * {
                animation-play-state: paused !important;
            }
            
            .loaded * {
                animation-play-state: running !important;
            }
        `;
        document.head.appendChild(style);

        // Magic UI 3D Marquee Initialization
        function initMarquee() {
            const marquees = document.querySelectorAll('.marquee-vertical');
            
            marquees.forEach(marquee => {
                const duration = marquee.getAttribute('data-duration') || '20s';
                const isReverse = marquee.classList.contains('marquee-reverse');
                
                // Set animation duration
                marquee.style.animationDuration = duration;
                
                // Set animation direction
                if (isReverse) {
                    marquee.style.animationDirection = 'reverse';
                }
                
                // Pause on hover
                marquee.addEventListener('mouseenter', () => {
                    marquee.style.animationPlayState = 'paused';
                });
                
                marquee.addEventListener('mouseleave', () => {
                    marquee.style.animationPlayState = 'running';
                });
            });
        }

        // Initialize marquee when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initMarquee);
        } else {
            initMarquee();
        }

        // Timeline Scroll Animation
        function initTimelineAnimation() {
            console.log('🚀 Starting timeline animation initialization...');
            
            try {
                const timelineLine = document.getElementById('timeline-line');
                const timelineItems = document.querySelectorAll('.timeline-item');
                
                console.log('Timeline line element:', timelineLine);
                console.log('Timeline items found:', timelineItems.length);
                console.log('Timeline items array:', Array.from(timelineItems));
                
                if (!timelineLine) {
                    console.error('❌ Timeline line element not found!');
                    return;
                }
                
                if (timelineItems.length === 0) {
                    console.error('❌ No timeline items found!');
                    return;
                }

                console.log('✅ Timeline animation initialized with', timelineItems.length, 'items');

                // Create intersection observer for timeline line
                const lineObserver = new IntersectionObserver((entries) => {
                    console.log('📡 Line observer triggered with', entries.length, 'entries');
                    entries.forEach(entry => {
                        console.log('🔍 Timeline line intersection:', entry.isIntersecting, 'ratio:', entry.intersectionRatio);
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            console.log('✨ Timeline line made visible - classes:', entry.target.className);
                        }
                    });
                }, {
                    threshold: 0.05, // Much lower threshold for earlier activation
                    rootMargin: '100px 0px -50px 0px' // Larger top margin for earlier trigger
                });

                lineObserver.observe(timelineLine);
                console.log('👁️ Observing timeline line');

                // Create intersection observer for timeline items
                const itemObserver = new IntersectionObserver((entries) => {
                    console.log('📡 Item observer triggered with', entries.length, 'entries');
                    entries.forEach(entry => {
                        console.log('🔍 Timeline item intersection:', entry.isIntersecting, 'target:', entry.target);
                        if (entry.isIntersecting) {
                            // Add visible class immediately without delay for better timing
                            const index = Array.from(timelineItems).indexOf(entry.target);
                            console.log(`⏰ Making timeline item ${index + 1} visible immediately`);
                            entry.target.classList.add('visible');
                            console.log(`✨ Timeline item ${index + 1} made visible - classes:`, entry.target.className);
                        }
                    });
                }, {
                    threshold: 0.1, // Even lower threshold for earlier appearance
                    rootMargin: '150px 0px -30px 0px' // Much larger top margin for very early trigger
                });

                // Observe each timeline item
                timelineItems.forEach((item, index) => {
                    itemObserver.observe(item);
                    console.log(`👁️ Observing timeline item ${index + 1}:`, item);
                });
                
                console.log('🎯 Timeline animation setup complete!');
                
            } catch (error) {
                console.error('💥 Error in timeline initialization:', error);
            }
        }

        // Initialize timeline animation when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            console.log('📋 DOM loaded, initializing timeline...');
            console.log('🔍 Checking timeline elements existence...');
            
            // Check if timeline elements exist
            const timelineSection = document.getElementById('timeline');
            const timelineLine = document.getElementById('timeline-line');
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            console.log('Timeline section:', timelineSection);
            console.log('Timeline line:', timelineLine);
            console.log('Timeline items count:', timelineItems.length);
            
            if (timelineSection) {
                console.log('✅ Timeline section found');
            } else {
                console.error('❌ Timeline section NOT found');
            }
            
            initTimelineAnimation();
            
            // Add a manual test function to window for debugging
            window.testTimelineAnimation = function() {
                console.log('🧪 Testing timeline animation manually...');
                const timelineLine = document.getElementById('timeline-line');
                const timelineItems = document.querySelectorAll('.timeline-item');
                
                if (timelineLine) {
                    timelineLine.classList.add('visible');
                    console.log('✅ Timeline line made visible manually');
                } else {
                    console.error('❌ Timeline line not found for manual test');
                }
                
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                        console.log(`✅ Timeline item ${index + 1} made visible manually`);
                    }, index * 200);
                });
                
                if (timelineItems.length === 0) {
                    console.error('❌ No timeline items found for manual test');
                }
            };
            
            console.log('🛠️ Added window.testTimelineAnimation() for manual testing');
        });
        
        // Also try immediate initialization in case DOM is already loaded
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            console.log('DOM already loaded, initializing timeline...');
            initTimelineAnimation();
        }

        // Advanced Scroll Video System
        class ScrollVideo {
            constructor() {
                this.canvas = document.getElementById('scrollCanvas');
                this.ctx = this.canvas.getContext('2d');
                this.video = document.getElementById('hiddenVideo');
                this.progressBar = document.querySelector('.progress-bar');
                this.scrollSection = document.querySelector('.scroll-video-section');
                this.segmentDots = document.querySelectorAll('.segment-dot');
                this.textElements = document.querySelectorAll('.scroll-text');
                
                // Video segments configuration
                this.segments = [
                    // Hidden buffer
                    { id: -1, startPercent: 0, endPercent: 0, frameRate: 1, duration: 100, hidden: true },
                    // Visible segments
                    { id: 0, startPercent: 0, endPercent: 0.15, frameRate: 20, duration: 1200 },
                    { id: 1, startPercent: 0.15, endPercent: 0.63, frameRate: 30, duration: 2000 },
                    { id: 2, startPercent: 0.63, endPercent: 1.0, frameRate: 24, duration: 1500 },
                    // Hidden buffer
                    { id: 3, startPercent: 1.0, endPercent: 1.0, frameRate: 1, duration: 100, hidden: true }
                ];
                
                this.isVideoReady = false;
                this.segmentFrames = {};
                this.currentSegment = -1;
                this.isAnimating = false;
                this.lastScrollY = 0;
                this.completedSegments = new Set();
                
                this.init();
            }
            
            init() {
                this.setupCanvas();
                this.setupVideo();
                this.bindEvents();
            }
            
            setupCanvas() {
                const resizeCanvas = () => {
                    const rect = this.canvas.getBoundingClientRect();
                    this.canvas.width = rect.width;
                    this.canvas.height = rect.height;
                    this.ctx.imageSmoothingEnabled = true;
                };
                
                resizeCanvas();
                window.addEventListener('resize', resizeCanvas);
            }
            
            setupVideo() {
                this.video.addEventListener('loadedmetadata', () => {
                    this.preloadSegments();
                });
                this.video.load();
            }
            
            async preloadSegments() {
                for (const segment of this.segments) {
                    this.segmentFrames[segment.id] = [];
                    
                    const segmentStartTime = segment.startPercent * this.video.duration;
                    const segmentEndTime = segment.endPercent * this.video.duration;
                    const segmentDuration = segmentEndTime - segmentStartTime;
                    
                    if (segment.hidden && segmentDuration === 0) {
                        const frameCanvas = await this.captureFrame(segmentStartTime);
                        this.segmentFrames[segment.id].push(frameCanvas);
                    } else {
                        const frameCount = Math.floor(segmentDuration * segment.frameRate);
                        const frameInterval = frameCount > 0 ? segmentDuration / frameCount : 0;
                        
                        for (let i = 0; i < Math.max(1, frameCount); i++) {
                            const time = segmentStartTime + (i * frameInterval);
                            const frameCanvas = await this.captureFrame(time);
                            this.segmentFrames[segment.id].push(frameCanvas);
                            
                            if (i % 3 === 0) {
                                await new Promise(resolve => setTimeout(resolve, 1));
                            }
                        }
                    }
                }
                
                this.isVideoReady = true;
                this.currentSegment = -1;
                this.drawSegmentFrame(-1, 0);
                this.updateUI();
            }
            
            captureFrame(time) {
                return new Promise((resolve) => {
                    const tempCanvas = document.createElement('canvas');
                    const tempCtx = tempCanvas.getContext('2d');
                    
                    const onSeeked = () => {
                        tempCanvas.width = this.canvas.width;
                        tempCanvas.height = this.canvas.height;
                        
                        const videoAspect = this.video.videoWidth / this.video.videoHeight;
                        const canvasAspect = tempCanvas.width / tempCanvas.height;
                        
                        let drawWidth, drawHeight, drawX, drawY;
                        
                        if (videoAspect > canvasAspect) {
                            drawWidth = tempCanvas.width;
                            drawHeight = drawWidth / videoAspect;
                            drawX = 0;
                            drawY = (tempCanvas.height - drawHeight) / 2;
                        } else {
                            drawHeight = tempCanvas.height;
                            drawWidth = drawHeight * videoAspect;
                            drawX = (tempCanvas.width - drawWidth) / 2;
                            drawY = 0;
                        }
                        
                        tempCtx.drawImage(this.video, drawX, drawY, drawWidth, drawHeight);
                        this.video.removeEventListener('seeked', onSeeked);
                        resolve(tempCanvas);
                    };
                    
                    this.video.addEventListener('seeked', onSeeked);
                    this.video.currentTime = time;
                });
            }
            
            drawSegmentFrame(segmentId, frameIndex) {
                const frames = this.segmentFrames[segmentId];
                if (!frames || !frames[frameIndex]) return;
                
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(frames[frameIndex], 0, 0, this.canvas.width, this.canvas.height);
            }
            
            bindEvents() {
                const handleScroll = () => {
                    if (!this.isVideoReady || this.isAnimating) return;
                    
                    const currentScrollY = window.scrollY;
                    const scrollDelta = Math.abs(currentScrollY - this.lastScrollY);
                    
                    if (scrollDelta > 30) {
                        this.detectScrollDirection(currentScrollY);
                        this.lastScrollY = currentScrollY;
                    }
                };
                
                window.addEventListener('scroll', handleScroll, { passive: true });
                
                this.segmentDots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        if (!this.isAnimating && this.isVideoReady) {
                            this.playSegment(index);
                        }
                    });
                });
            }
            
            detectScrollDirection(currentScrollY) {
                const rect = this.scrollSection.getBoundingClientRect();
                const sectionHeight = rect.height - window.innerHeight;
                const scrollProgress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
                
                let targetSegment = -1;
                
                if (scrollProgress < 0.2) {
                    targetSegment = -1;
                } else if (scrollProgress < 0.4) {
                    targetSegment = 0;
                } else if (scrollProgress < 0.6) {
                    targetSegment = 1;
                } else if (scrollProgress < 0.8) {
                    targetSegment = 2;
                } else {
                    targetSegment = 3;
                }
                
                if (targetSegment !== this.currentSegment) {
                    const isScrollingDown = currentScrollY > this.lastScrollY;
                    const shouldReverse = !isScrollingDown && targetSegment < this.currentSegment;
                    this.playSegment(targetSegment, shouldReverse);
                }
            }
            
            playSegment(segmentId, reverse = false) {
                if (this.isAnimating || !this.segmentFrames[segmentId]) return;
                
                const segment = this.segments.find(s => s.id === segmentId);
                if (!segment) return;
                
                if (segment.hidden) {
                    this.currentSegment = segmentId;
                    this.drawSegmentFrame(segmentId, 0);
                    this.updateUI();
                    return;
                }
                
                this.isAnimating = true;
                this.currentSegment = segmentId;
                
                const frames = this.segmentFrames[segmentId];
                const frameInterval = segment.duration / frames.length;
                let frameIndex = reverse ? frames.length - 1 : 0;
                
                const animate = () => {
                    const hasMoreFrames = reverse ? frameIndex >= 0 : frameIndex < frames.length;
                    
                    if (hasMoreFrames) {
                        this.drawSegmentFrame(segmentId, frameIndex);
                        frameIndex = reverse ? frameIndex - 1 : frameIndex + 1;
                        setTimeout(animate, frameInterval);
                    } else {
                        this.isAnimating = false;
                        this.completedSegments.add(segmentId);
                        this.updateUI();
                    }
                };
                
                this.updateUI();
                animate();
            }
            
            updateUI() {
                this.segmentDots.forEach((dot, index) => {
                    dot.classList.remove('active', 'completed');
                    if (this.completedSegments.has(index)) {
                        dot.classList.add('completed');
                    } else if (index === this.currentSegment) {
                        dot.classList.add('active');
                    }
                });
                
                this.textElements.forEach((element, index) => {
                    element.classList.toggle('visible', index === this.currentSegment);
                });
                
                const visibleSegmentIndex = Math.max(0, Math.min(2, this.currentSegment));
                const progress = ((visibleSegmentIndex + 1) / 3) * 100;
                this.progressBar.style.width = `${progress}%`;
            }
        }

        // Initialize Advanced Scroll Video when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize the advanced scroll video system
            new ScrollVideo();
        });