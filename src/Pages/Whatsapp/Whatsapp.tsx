import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import WhatsappIcon from "../Whatsapp/Assets/download-removebg-preview (1).png";

const WhatsApp = () => {
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  const pulseRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const phoneNumber = "7820893712";
  const message = "Hello! I'd like to get more information.";

  useEffect(() => {
    const button = buttonRef.current;
    const tooltip = tooltipRef.current;
    const pulse = pulseRef.current;
    const container = containerRef.current;

    // Master timeline
    const masterTL = gsap.timeline({ paused: true });

    // Pulse animation
    const pulseTL = gsap.timeline({ repeat: -1, yoyo: true });
    pulseTL.to(pulse, {
      scale: 1.3,
      opacity: 0.3,
      duration: 1.5,
      ease: "sine.inOut"
    });

    // Hover animations
    masterTL
      .to(button, {
        scale: 1.15,
        rotation: 360,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, 0)
      .to(tooltip, {
        opacity: 1,
        y: -8,
        duration: 0.4,
        ease: "power2.out"
      }, 0)
      .to(container, {
        y: -5,
        duration: 0.4,
        ease: "power2.out"
      }, 0);

    const handleMouseEnter = () => {
      setIsHovered(true);
      masterTL.play();
      pulseTL.pause();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      masterTL.reverse();
      pulseTL.play();
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    // Initial animation
    gsap.from(container, {
      scale: 0,
      rotation: -180,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
      delay: 1
    });

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      pulseTL.kill();
    };
  }, []);

  const handleClick = () => {
    // Click animation sequence
    const clickTL = gsap.timeline();
    clickTL
      .to(buttonRef.current, {
        scale: 0.8,
        rotation: "-=15",
        duration: 0.1,
        ease: "power2.in"
      })
      .to(buttonRef.current, {
        scale: 1.2,
        rotation: "+=30",
        duration: 0.3,
        ease: "power2.out"
      })
      .to(buttonRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.2,
        ease: "power2.inOut"
      });

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  return (
    <div ref={containerRef} className="fixed bottom-8 right-8 z-50 transform origin-center">
      {/* Animated Background Pulse */}
      <div
        ref={pulseRef}
        className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl opacity-20"
      ></div>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute bottom-full right-0 mb-4 opacity-0 transform translate-y-4"
      >
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white text-sm px-4 py-3 rounded-2xl shadow-2xl border border-gray-700 min-w-max backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-semibold text-white">Need help?</span>
              <span className="text-green-400 text-xs font-medium">Click to chat on WhatsApp</span>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute top-full right-4 -mt-2 border-8 border-transparent border-t-gray-800"></div>
        </div>
      </div>

      {/* Main WhatsApp Button */}
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-5 rounded-2xl shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300/50 focus:ring-opacity-50 transform group"
        aria-label="Contact us on WhatsApp"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>

        {/* Icon container */}
        <div className="relative flex items-center justify-center">
          <img
            src={WhatsappIcon}
            alt="WhatsApp"
            className="w-8 h-8 filter brightness-0 invert drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Online status indicator */}
        <div className="absolute -top-1 -right-1">
          <div className="relative">
            <div className="w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-green-400/30 blur-md group-hover:bg-green-400/50 transition-all duration-300 -z-10"></div>
      </button>

      {/* Floating label */}
      <div className={`absolute -bottom-10 right-0 left-0 text-center transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-80 -translate-y-1'}`}>
        <span className="text-xs font-semibold text-gray-700 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
          Message Us
        </span>
      </div>
    </div>
  );
};

export default WhatsApp;