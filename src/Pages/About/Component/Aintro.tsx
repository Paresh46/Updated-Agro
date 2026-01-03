import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ArrowRight, Star, Sparkles, Award, TrendingUp } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Aintro: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sliderSectionRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const bg3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero fade-up animations on load
      const tl = gsap.timeline();

      tl.from(headlineRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
        .from(sublineRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8")
        .from(ctaRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6");

      // Animated Background Gradients - Smooth floating movement
      gsap.to(bg1Ref.current, {
        x: 80,
        y: -60,
        scale: 1.1,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(bg2Ref.current, {
        x: -70,
        y: 50,
        scale: 0.95,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(bg3Ref.current, {
        x: 40,
        y: -40,
        rotation: 45,
        scale: 1.15,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // ScrollTrigger animation for slider section
      gsap.from(sliderSectionRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sliderSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: "The finest organic jaggery we've ever sourced. Our international clients love the authentic quality.",
      author: "Sarah Johnson",
      role: "Head of Procurement, NaturalLife UK",
      rating: 5
    },
    {
      quote: "Exceptional purity and taste. Anand Agro's commitment to sustainability sets them apart.",
      author: "Michael Chen",
      role: "CEO, GreenTrade International",
      rating: 5
    },
    {
      quote: "A trusted partner for premium jaggery. Their consistent quality makes our supply chain reliable.",
      author: "Emma Williams",
      role: "Sourcing Director, OrganicFirst USA",
      rating: 5
    },
    {
      quote: "Outstanding product quality and professional service. Perfect for our health-conscious market.",
      author: "David Martinez",
      role: "Import Manager, HealthyChoice Europe",
      rating: 5
    }
  ];

  const features = [
    { icon: Star, label: "Premium Quality", value: "100%" },
    { icon: Award, label: "Export Grade", value: "Certified" },
    { icon: TrendingUp, label: "Years Experience", value: "25+" }
  ];

  return (
    <div ref={heroRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 relative overflow-hidden">

      {/* Subtle animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div ref={bg1Ref} className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/10 rounded-full blur-3xl"></div>
        <div ref={bg2Ref} className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-emerald-200/15 to-green-200/10 rounded-full blur-3xl"></div>
        <div ref={bg3Ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-200/10 to-indigo-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto w-full">

          {/* Centered Hero Content */}
          <div className="text-center max-w-5xl mx-auto space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold tracking-wide text-amber-700 uppercase">Premium Organic Jaggery</span>
            </div>

            {/* Headline */}
            <h1 ref={headlineRef} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-900">
              Crafting Nature's <br />
              <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">Finest Sweetness</span>
            </h1>

            {/* Subheadline */}
            <p ref={sublineRef} className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-light">
              Experience the pinnacle of organic purity. Handcrafted using traditional methods,
              trusted by premium brands across the globe.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3">
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 rounded-full font-semibold text-lg shadow hover:shadow-lg transition-all duration-300 hover:bg-white">
                Learn More
              </button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-6 justify-center items-center pt-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200/50 shadow-sm hover:shadow-md transition-all"
                >
                  <feature.icon className="w-5 h-5 text-amber-600" />
                  <div className="text-left">
                    <div className="text-xs text-slate-500 uppercase tracking-wider">{feature.label}</div>
                    <div className="text-sm font-bold text-slate-800">{feature.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Swiper Slider Section */}
      <section ref={sliderSectionRef} className="relative z-10 px-6 md:px-12 py-24 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-full shadow-sm mb-6">
              <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span className="text-sm font-semibold tracking-wide text-amber-700 uppercase">Trusted Globally</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What Our Partners Say
            </h2>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
              Hear from international businesses who trust our premium organic jaggery.
            </p>
          </div>

          {/* Swiper Testimonial Slider */}
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            loop={true}
            className="premium-testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-500 h-full flex flex-col">

                  {/* Star Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-700 text-lg leading-relaxed mb-8 flex-grow font-light italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="border-t border-slate-200/50 pt-6">
                    <div className="font-semibold text-slate-900 text-lg">{testimonial.author}</div>
                    <div className="text-sm text-slate-500 mt-1">{testimonial.role}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Add custom Swiper styles */}
      <style>{`
        .premium-testimonial-swiper .swiper-button-next,
        .premium-testimonial-swiper .swiper-button-prev {
          color: #d97706;
          background: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .premium-testimonial-swiper .swiper-button-next:hover,
        .premium-testimonial-swiper .swiper-button-prev:hover {
          background: #d97706;
          color: white;
          transform: scale(1.1);
        }

        .premium-testimonial-swiper .swiper-button-next::after,
        .premium-testimonial-swiper .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }

        .premium-testimonial-swiper .swiper-pagination-bullet {
          background: #d97706;
          opacity: 0.3;
          width: 12px;
          height: 12px;
        }

        .premium-testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 32px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default Aintro;