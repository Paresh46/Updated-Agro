import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Correct Swiper CSS Imports
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { ArrowDown, MapPin, Calendar, Leaf, Award, Heart, Star, Sparkles, TrendingUp, Shield } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

import Logo from '../Assets/583903df-eb46-4f94-b7b3-525d701ab3e2-removebg-preview.png';
import Product1 from '../Assets/istockphoto-2150007871-612x612.webp';
import Product2 from '../Assets/583903df-eb46-4f94-b7b3-525d701ab3e2-removebg-preview.png';
import Product3 from '../Assets/2035c611-a155-4fec-8af9-17473e85f2b0.jfif';
import Product4 from '../Assets/2035c611-a155-4fec-8af9-17473e85f2b0.jfif';

interface Product {
  name: string;
  description: string;
  image: string;
}

const Intro: React.FC = () => {
  const products: Product[] = [
    {
      name: 'Jaggery Blocks',
      description: 'Traditional solid jaggery blocks made from pure sugarcane',
      image: Product1,
    },
    {
      name: 'Jaggery Powder',
      description: 'Fine powdered jaggery perfect for cooking and baking',
      image: Product2,
    },
    {
      name: 'Coconut Jaggery Cubes',
      description: 'Delicious jaggery cubes infused with natural coconut flavor',
      image: Product3,
    },
    {
      name: 'Elaichi Jaggery Cubes',
      description: 'Aromatic cardamom-flavored jaggery cubes for a premium taste',
      image: Product1,
    },
    {
      name: 'Badishep Jaggery Cubes',
      description: 'Unique fennel-flavored jaggery cubes with digestive benefits',
      image: Product4,
    },
  ];

  const nextSectionRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    
    // GSAP Animations
    const tl = gsap.timeline();
    
    if (heroRef.current && titleRef.current && descriptionRef.current && ctaRef.current && imageRef.current) {
      // Initial setup
      gsap.set([titleRef.current, descriptionRef.current, ctaRef.current, imageRef.current], {
        opacity: 0,
        y: 50
      });
      
      // Animate elements in sequence
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.3")
      .to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.8");
    }
  }, []);

  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Typewriter effect for hero description
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Bringing back the tradition of healthy sweetness with organic, chemical-free jaggery products since 2023";
  
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Professional background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgNDUpIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjZjVmMGY2IiBmaWxsLW9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-30"></div>
      
      {/* Subtle floating elements */}
      <div className="absolute top-16 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-amber-100/40 to-orange-100/40 backdrop-blur-sm border border-white/30 animate-float shadow-sm"></div>
      <div className="absolute bottom-1/3 right-16 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100/40 to-green-100/40 backdrop-blur-sm border border-white/30 animate-float animation-delay-2000 shadow-sm"></div>
      <div className="absolute top-1/2 left-1/3 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-100/40 to-amber-100/40 backdrop-blur-sm border border-white/30 animate-float animation-delay-3000 shadow-sm"></div>
      
      {/* Professional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-amber-50/20"></div>
      
      {/* Hero Section */}
      <section ref={heroRef} className="flex-1 flex items-center justify-center px-6 py-16 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            {/* Professional badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-emerald-200/50 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-medium text-sm">100% Organic & Natural</span>
              </div>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            {/* Professional title with improved typography */}
            <div ref={titleRef} className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
                <span className="text-slate-900">Anand Agro</span>
                <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-red-500">
                  Industry
                </span>
              </h1>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-slate-600">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold">Premium Quality</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-slate-400 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold">Trusted Brand</span>
                </div>
              </div>
            </div>

            {/* Professional description */}
            <div ref={descriptionRef} className="h-28">
              <p className="text-xl text-slate-600 max-w-2xl leading-relaxed font-medium">
                {typedText}
                <span className="ml-1 inline-block w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 align-middle animate-pulse"></span>
              </p>
            </div>

            {/* Professional feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="group flex items-start gap-4 p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transform transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-lg mb-2">Traditional Methods</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Preserving authentic techniques for superior quality and authentic taste</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transform transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-lg mb-2">Est. 2023</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Committed to purity, sustainability, and excellence</p>
                </div>
              </div>
            </div>

            {/* Professional CTA buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToNextSection}
                className="group relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Our Products
                  <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>

              <a
                href="https://maps.app.goo.gl/tdQdTsaQmgrtfCws7?g_st=iw"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-4 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm"
              >
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-slate-800 font-semibold block">Nashik, Maharashtra</span>
                  <span className="text-slate-600 text-sm">Visit Our Location</span>
                </div>
              </a>
            </div>
          </div>

          {/* Premium Hero Image */}
          <div ref={imageRef} className="relative flex justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-[1.02] group">
              {/* Premium gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 z-10 rounded-3xl transition-all duration-700 group-hover:opacity-80"></div>
              <img
                src={Logo}
                alt="Natural Jaggery Products"
                className="w-full object-cover aspect-square transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
              
              {/* Premium organic badge */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              
              {/* Premium rating card */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border border-white/30 transform transition-all duration-300 group-hover:-translate-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-600 font-medium">Since</span>
                    <span className="font-bold text-slate-800 text-lg">15 Aug 2023</span>
                  </div>
                  <div className="flex ml-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Premium quality indicator */}
              <div className="absolute bottom-6 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform transition-all duration-300 group-hover:scale-105">
                Premium Quality
              </div>
            </div>
            
            {/* Enhanced floating elements */}
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-amber-200/40 to-orange-200/40 blur-lg animate-float animation-delay-1000 z-0"></div>
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-200/40 to-green-200/40 blur-lg animate-float animation-delay-1500 z-0"></div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-200/40 to-amber-200/40 blur-md animate-float animation-delay-2000 z-0"></div>
          </div>
        </div>
      </section>

      {/* Premium Product Carousel Section */}
      <section ref={nextSectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-white to-amber-50 relative z-10 overflow-hidden">
        {/* Premium decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-amber-200/20 to-orange-200/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-200/15 to-green-200/15 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-yellow-200/10 to-amber-200/10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-200/30 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-amber-700 font-semibold text-sm">Premium Collection</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 relative inline-block mb-6">
              Our Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-red-500">Jaggery Products</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Handcrafted with care using traditional methods for authentic flavor and purity. Each product is carefully selected and processed to maintain the highest quality standards.
            </p>
          </div>

          <Swiper
            effect={'coverflow'}
            grabCursor
            centeredSlides
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 8,
              stretch: -50,
              depth: 150,
              modifier: 1.2,
              slideShadows: true,
            }}
            pagination={{ 
              clickable: true,
              el: '.custom-pagination',
              bulletClass: 'custom-bullet',
              bulletActiveClass: 'custom-bullet-active'
            }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev'
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="mySwiper pb-20"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index} className="max-w-sm bg-gradient-to-b from-white to-slate-50 rounded-3xl shadow-xl overflow-hidden border border-white/20 transition-all duration-500 hover:shadow-2xl hover:z-10 hover:scale-105">
                <div className="relative group">
                  {/* Premium gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-orange-500/5 to-red-500/5 rounded-3xl transition-opacity duration-500 group-hover:opacity-40 z-10"></div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="p-8 relative z-20">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-slate-800">{product.name}</h3>
                      <button className="text-amber-600 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                        <Heart className="w-6 h-6" />
                      </button>
                    </div>
                    <p className="text-slate-600 mb-6 leading-relaxed">{product.description}</p>
                    <button className="w-full bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 hover:from-amber-700 hover:via-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold">
                      View Details
                      <ArrowDown className="w-4 h-4 transform rotate-90" />
                    </button>
                  </div>
                  
                  {/* Premium organic badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-bold px-3 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Leaf className="w-4 h-4" /> Organic
                  </div>
                  
                  {/* Premium quality indicator */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-2 rounded-full shadow-lg">
                    Premium
                  </div>
                </div>
              </SwiperSlide>
            ))}
            
            {/* Premium navigation */}
            <div className="custom-navigation flex justify-center gap-6 mt-12">
              <button className="custom-prev w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm shadow-xl flex items-center justify-center text-amber-600 hover:bg-amber-50 hover:scale-110 transition-all duration-300 border border-amber-200/30">
                <ArrowDown className="w-6 h-6 transform rotate-90" />
              </button>
              <div className="custom-pagination flex items-center gap-3"></div>
              <button className="custom-next w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm shadow-xl flex items-center justify-center text-amber-600 hover:bg-amber-50 hover:scale-110 transition-all duration-300 border border-amber-200/30">
                <ArrowDown className="w-6 h-6 transform -rotate-90" />
              </button>
            </div>
          </Swiper>
          
          {/* Premium certification badge */}
          <div className="mt-16 flex justify-center">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl py-4 px-8 inline-flex items-center gap-4 shadow-2xl transform transition-all duration-300 hover:scale-105 border border-emerald-400/30">
              <div className="flex items-center gap-2">
                <Leaf className="w-6 h-6 text-white animate-pulse" />
                <span className="text-white font-bold text-lg">Certified Organic Jaggery</span>
                <Leaf className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-white" />
                <span className="text-white/90 font-medium text-sm">FSSAI Approved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Animation Keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        /* Premium pagination styles */
        .custom-bullet {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e5e7eb, #d1d5db);
          margin: 0 6px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .custom-bullet:hover {
          transform: scale(1.2);
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
        }
        .custom-bullet-active {
          width: 40px;
          border-radius: 20px;
          background: linear-gradient(135deg, #f59e0b, #d97706, #b45309);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
          transform: scale(1.1);
        }
        
        /* Premium glassmorphism effects */
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* Premium hover effects */
        .premium-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .premium-hover:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Intro;