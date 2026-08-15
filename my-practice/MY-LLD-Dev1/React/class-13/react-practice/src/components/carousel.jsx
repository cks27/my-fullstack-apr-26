import { useState, useEffect, useRef, useCallback } from 'react';
import './carousel.css';

const Carousel = ({ 
  slides = [], 
  autoPlayInterval = 5000, 
  infinite = true 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Navigate to previous slide
  const handlePrev = useCallback(() => {
    setProgress(0);
    setActiveIndex((prev) => (prev === 0 ? (infinite ? slides.length - 1 : prev) : prev - 1));
  }, [infinite, slides.length]);

  // Navigate to next slide
  const handleNext = useCallback(() => {
    setProgress(0);
    setActiveIndex((prev) => (prev === slides.length - 1 ? (infinite ? 0 : prev) : prev + 1));
  }, [infinite, slides.length]);

  // Autoplay progress bar tick logic
  useEffect(() => {
    if (!isPlaying || isHovered || slides.length <= 1) {
      return;
    }

    const tickRate = 30; // Update progress bar every 30ms for smooth movement
    const increment = (tickRate / autoPlayInterval) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, tickRate);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, activeIndex, autoPlayInterval, slides.length, handleNext]);

  // Jump to specific slide
  const goToSlide = useCallback((index) => {
    setProgress(0);
    setActiveIndex(index);
  }, []);

  // Keyboard accessibility helper
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (container) {
        container.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [slides.length, handlePrev, handleNext]);

  // Get current horizontal position (Mouse or Touch)
  const getPositionX = (e) => {
    return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  };

  // Drag start handler
  const handleDragStart = (e) => {
    isDragging.current = true;
    startX.current = getPositionX(e);
    
    // Disable CSS transition during manual drag to make movement instantaneous
    if (innerRef.current) {
      innerRef.current.style.transition = 'none';
    }
    
    // Reset/Pause progress on click/touch drag
    setProgress(0);
  };

  // Drag move handler
  const handleDragMove = (e) => {
    if (!isDragging.current || !innerRef.current || !containerRef.current) return;
    
    const currentX = getPositionX(e);
    const diffX = currentX - startX.current;
    const containerWidth = containerRef.current.offsetWidth;
    
    // Base position is the horizontal translation of current active slide
    const baseTranslate = -activeIndex * containerWidth;
    let translate = baseTranslate + diffX;
    
    // Add custom elastic resistance at container edges if not infinite
    if (!infinite) {
      if (activeIndex === 0 && diffX > 0) {
        translate = baseTranslate + diffX * 0.3;
      } else if (activeIndex === slides.length - 1 && diffX < 0) {
        translate = baseTranslate + diffX * 0.3;
      }
    }
    
    innerRef.current.style.transform = `translateX(${translate}px)`;
  };

  // Drag end handler
  const handleDragEnd = () => {
    if (!isDragging.current || !innerRef.current || !containerRef.current) return;
    isDragging.current = false;
    
    // Restore smooth cubic-bezier transitions for snapping back or sliding forward
    innerRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    
    const containerWidth = containerRef.current.offsetWidth;
    const finalTranslate = innerRef.current.style.transform;
    
    // ExtracttranslateX value in pixels
    const match = finalTranslate.match(/translateX\(([-\d.]+)px\)/);
    if (!match) return;
    
    const currentTrans = parseFloat(match[1]);
    const baseTranslate = -activeIndex * containerWidth;
    const dragDistance = currentTrans - baseTranslate;
    
    const threshold = containerWidth * 0.15; // Requires sliding at least 15% of width
    
    if (dragDistance < -threshold && (infinite || activeIndex < slides.length - 1)) {
      handleNext();
    } else if (dragDistance > threshold && (infinite || activeIndex > 0)) {
      handlePrev();
    } else {
      // Snap back to the current active slide
      innerRef.current.style.transform = `translateX(${baseTranslate}px)`;
    }
  };

  // Keep index translation in sync on activeIndex changes
  useEffect(() => {
    if (innerRef.current && containerRef.current && !isDragging.current) {
      const containerWidth = containerRef.current.offsetWidth;
      innerRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      innerRef.current.style.transform = `translateX(${-activeIndex * containerWidth}px)`;
    }
  }, [activeIndex]);

  // Keep correct translations when screen is resized
  useEffect(() => {
    const handleResize = () => {
      if (innerRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        innerRef.current.style.transition = 'none';
        innerRef.current.style.transform = `translateX(${-activeIndex * containerWidth}px)`;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex]);

  if (!slides || slides.length === 0) {
    return <div className="carousel-empty">No slides provided</div>;
  }

  return (
    <div 
      className="carousel-container" 
      ref={containerRef}
      tabIndex="0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isDragging.current) handleDragEnd();
      }}
      // Mouse dragging support
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      // Touch swipe support
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Autoplay Progress Line */}
      {isPlaying && (
        <div className="carousel-progress-bar-container">
          <div 
            className="carousel-progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Autoplay Toggle Controls */}
      <button 
        className="carousel-play-pause-btn"
        onClick={(e) => {
          e.stopPropagation(); // Avoid triggering any background focus action
          setIsPlaying(!isPlaying);
        }}
        title={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Slide elements */}
      <div className="carousel-inner" ref={innerRef}>
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`carousel-slide ${index === activeIndex ? 'active' : ''}`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              draggable="false" 
            />
            <div className="carousel-caption">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Previous control chevron */}
      <button 
        className="carousel-btn prev" 
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Previous Slide"
      >
        <svg viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Next control chevron */}
      <button 
        className="carousel-btn next" 
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next Slide"
      >
        <svg viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation dot indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
