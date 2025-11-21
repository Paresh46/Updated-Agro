import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Leaf, 
  Shield, 
  Award, 
  Sparkles, 
  TrendingUp, 
  Heart,
  Star,
  CheckCircle
} from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ProductQuality: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const qualityRefs = useRef<(HTMLDivElement | null)[]>([]);
  const whyChooseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize professional GSAP animations
    if (qualityRefs.current.length && whyChooseRef.current) {
      // Animate quality cards with professional effects
      qualityRefs.current.forEach((el, i) => {
        if (el) {
          gsap.set(el, { opacity: 0, y: 80, scale: 0.9 });
          
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            },
            delay: i * 0.2
          });
          
          // Add hover animations
          el.addEventListener('mouseenter', () => {
            gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" });
          });
          
          el.addEventListener('mouseleave', () => {
            gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
          });
        }
      });

      // Animate why choose section with professional effects
      gsap.set(whyChooseRef.current, { opacity: 0, x: 100, scale: 0.95 });
      
      gsap.to(whyChooseRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: whyChooseRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  }, []);

  const qualityParameters = [
    { 
      icon: <Leaf className="w-8 h-8 text-emerald-600" />,
      title: '100% Natural & Chemical-Free',
      desc: 'Pure jaggery without additives or preservatives',
      gradient: 'from-emerald-500 to-green-600',
      bgColor: 'from-emerald-50 to-green-50'
    },
    { 
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Rich in Iron and Minerals',
      desc: 'Natural source of essential nutrients for better health',
      gradient: 'from-red-500 to-pink-600',
      bgColor: 'from-red-50 to-pink-50'
    },
    { 
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Hygienically Processed',
      desc: 'Manufactured in FDA-approved facilities',
      gradient: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    { 
      icon: <Award className="w-8 h-8 text-amber-600" />,
      title: 'Traditional Taste with Modern Packaging',
      desc: 'Authentic flavor with airtight preservation',
      gradient: 'from-amber-500 to-orange-600',
      bgColor: 'from-amber-50 to-orange-50'
    },
    { 
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: 'Long Shelf Life',
      desc: 'Stays fresh for up to 18 months',
      gradient: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50'
    },
    { 
      icon: <CheckCircle className="w-8 h-8 text-emerald-600" />,
      title: 'Certified Quality (FSSAI)',
      desc: 'Meets all food safety standards and regulations',
      gradient: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50'
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-24 px-6 md:px-8 bg-gradient-to-br from-slate-50 via-white to-amber-50 relative overflow-hidden"
    >
      {/* Professional background elements */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-amber-100/30 to-orange-100/30 blur-3xl"></div>
      <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-100/20 to-green-100/20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-yellow-100/15 to-amber-100/15 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-full px-6 py-3 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-amber-700 font-semibold text-sm">Premium Quality</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-red-500">Jaggery Quality</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Experience the finest quality jaggery products crafted with traditional methods and modern standards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Professional Quality Parameters Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {qualityParameters.map((item, index) => (
              <div 
                key={index}
                ref={el => { qualityRefs.current[index] = el; }}
                className={`group bg-gradient-to-br ${item.bgColor} backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-white/30 hover:scale-105`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`bg-gradient-to-br ${item.gradient} p-4 rounded-xl shadow-md mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-slate-800 group-hover:text-slate-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Why Choose Section */}
          <div 
            ref={whyChooseRef}
            className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white rounded-2xl p-8 lg:p-12 shadow-2xl border border-slate-700/50 relative overflow-hidden"
          >
            {/* Professional background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-red-500/5"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Why Choose Anand Agro?
                </h3>
              </div>
              
              <ul className="space-y-6">
                <li className="flex items-start group">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <strong className="text-amber-300 text-lg font-semibold">Trusted by Farmers:</strong>
                    <p className="mt-2 text-slate-300 leading-relaxed text-base">Direct sourcing from local sugarcane farmers ensuring fair trade and sustainable practices</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <strong className="text-amber-300 text-lg font-semibold">Modern Processing:</strong>
                    <p className="mt-2 text-slate-300 leading-relaxed text-base">State-of-the-art manufacturing with temperature-controlled crystallization for consistent quality</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <strong className="text-amber-300 text-lg font-semibold">Export Quality Standards:</strong>
                    <p className="mt-2 text-slate-300 leading-relaxed text-base">Compliance with international food safety and packaging regulations for global markets</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <strong className="text-amber-300 text-lg font-semibold">Purity Guarantee:</strong>
                    <p className="mt-2 text-slate-300 leading-relaxed text-base">Triple-filtered syrup for crystal-clear jaggery with authentic sweetness and natural flavor</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <strong className="text-amber-300 text-lg font-semibold">Sustainable Production:</strong>
                    <p className="mt-2 text-slate-300 leading-relaxed text-base">Zero-waste process utilizing byproducts for biofuel generation and environmental sustainability</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl border border-amber-500/20">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-xl flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="italic text-amber-200 text-lg leading-relaxed font-medium">
                      "Our jaggery preserves 98% of sugarcane's natural micronutrients through our patented low-heat processing technique"
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-amber-300 text-sm font-semibold">Premium Quality Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductQuality;
