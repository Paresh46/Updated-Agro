import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Play } from 'lucide-react';

// Assets
import Logo from '../Assets/583903df-eb46-4f94-b7b3-525d701ab3e2-removebg-preview.png';
import Product1 from '../Assets/istockphoto-2150007871-612x612.webp';

gsap.registerPlugin(ScrollTrigger);

const Intro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial Reveal
      tl.to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power4.inOut"
      })
        .from(imageRef.current, {
          scale: 1.5,
          duration: 2,
          ease: "power2.out"
        }, "-=1.2")
        .from(textRef.current?.querySelectorAll('.reveal-text') || [], {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=1.5");

      // Parallax Effect on Mouse Move
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(imageRef.current, {
          x: x,
          y: y,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#0f2f24] text-[#F3EFE7] overflow-hidden flex flex-col lg:flex-row">

      {/* Loading Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-[#F3EFE7] z-50 origin-bottom"></div>

      {/* Left Content Section */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-20 py-20">
        <div ref={textRef} className="space-y-10 max-w-xl">

          {/* Badge */}
          <div className="reveal-text inline-flex items-center gap-3 border border-[#F3EFE7]/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Est. 2023</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-6xl lg:text-8xl leading-[0.9] tracking-tight">
            <div className="overflow-hidden"><span className="reveal-text block">Cultivating</span></div>
            <div className="overflow-hidden"><span className="reveal-text block text-transparent bg-clip-text bg-gradient-to-r from-[#F3EFE7] to-[#F3EFE7]/60">Nature's</span></div>
            <div className="overflow-hidden"><span className="reveal-text block italic font-light">Finest.</span></div>
          </h1>

          {/* Description */}
          <p className="reveal-text text-lg text-[#F3EFE7]/70 leading-relaxed font-light max-w-md border-l border-[#F3EFE7]/20 pl-6">
            Anand Agro represents the pinnacle of organic purity. We bridge the gap between ancient agricultural wisdom and modern sustainable practices.
          </p>

          {/* CTA Buttons */}
          <div className="reveal-text flex flex-wrap gap-6 pt-4">
            <button
              onClick={() => navigate('/products')}
              className="group relative px-8 py-4 bg-[#F3EFE7] text-[#0f2f24] rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                Explore Products <ArrowRight size={16} />
              </span>
            </button>

            <button className="group flex items-center gap-4 text-[#F3EFE7] hover:text-amber-400 transition-colors">
              <div className="w-12 h-12 rounded-full border border-[#F3EFE7]/30 flex items-center justify-center group-hover:border-amber-400/50 transition-colors">
                <Play size={16} fill="currentColor" />
              </div>
              <span className="text-sm font-medium tracking-wide uppercase">Watch Our Story</span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="reveal-text pt-12 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0f2f24] bg-[#F3EFE7] overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
              <p className="text-xs text-[#F3EFE7]/60 uppercase tracking-wider">Trusted by 10k+ Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen overflow-hidden">
        <div ref={imageRef} className="absolute inset-0">
          <img
            src={Product1}
            alt="Organic Jaggery"
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0f2f24] opacity-90 lg:opacity-50"></div>
        </div>

        {/* Floating Glass Card */}
        <div className="absolute bottom-10 right-10 lg:bottom-20 lg:right-20 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-xs transform hover:-translate-y-2 transition-transform duration-500">
          <img src={Logo} alt="Logo" className="w-12 h-12 mb-4 drop-shadow-lg" />
          <h3 className="text-xl font-serif mb-2">Premium Quality</h3>
          <p className="text-sm text-[#F3EFE7]/80 leading-relaxed">
            Sourced directly from certified organic farms in Maharashtra.
          </p>
        </div>
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </div>
  );
};

export default Intro;