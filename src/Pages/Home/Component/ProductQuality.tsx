import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Leaf,
  Shield,
  Award,
  TrendingUp,
  Heart,
  CheckCircle,
  Star
} from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ProductQuality: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef1 = useRef<HTMLDivElement>(null);
  const bgRef2 = useRef<HTMLDivElement>(null);
  const bgRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        }
      });

      // Cards Stagger Animation
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      // Animated Background Elements
      gsap.to(bgRef1.current, {
        x: 100,
        y: -50,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(bgRef2.current, {
        x: -80,
        y: 60,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(bgRef3.current, {
        x: 50,
        y: -80,
        scale: 1.2,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const qualityParameters = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: '100% Natural',
      desc: 'Pure jaggery without additives or preservatives.',
      id: 'natural'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Rich in Iron',
      desc: 'Natural source of essential nutrients for health.',
      id: 'iron'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Hygienic Process',
      desc: 'Manufactured in FDA-approved facilities.',
      id: 'hygiene'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Traditional Taste',
      desc: 'Authentic flavor with airtight preservation.',
      id: 'taste'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Long Shelf Life',
      desc: 'Stays fresh for up to 18 months.',
      id: 'shelf'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Certified Quality',
      desc: 'Meets all food safety standards (FSSAI).',
      id: 'certified'
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-12 bg-[#FBF8F3] text-[#0f2f24] relative overflow-hidden"
    >
      {/* Animated Background Gradients */}
      <div ref={bgRef1} className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div ref={bgRef2} className="absolute bottom-32 left-20 w-80 h-80 bg-gradient-to-br from-emerald-200/20 to-green-200/15 rounded-full blur-3xl pointer-events-none"></div>
      <div ref={bgRef3} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-100/20 to-yellow-100/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Centered Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600">Our Promise</span>
            <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
          </div>

          <h2 className="text-4xl md:text-5xl font-playfair font-medium mb-6 leading-tight">
            Uncompromising <span className="italic text-amber-600">Quality</span>
          </h2>

          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8 rounded-full opacity-20"></div>

          <p className="text-[#0f2f24]/70 text-lg leading-relaxed font-light">
            We adhere to the strictest standards of purity and hygiene, ensuring that every grain of jaggery brings you the authentic taste of nature.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {qualityParameters.map((item, index) => (
            <div
              key={item.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="group flex flex-col items-center text-center p-8 rounded-2xl hover:bg-[#F3EFE7]/30 transition-colors duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-[#F3EFE7] flex items-center justify-center mb-6 text-amber-600 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>

              <h3 className="text-xl font-playfair font-medium mb-3 text-[#0f2f24]">
                {item.title}
              </h3>

              <p className="text-[#0f2f24]/60 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductQuality;
