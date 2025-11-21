import Aintro from "../About/Component/Aintro"
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.08),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-emerald-200/50 rounded-full px-5 py-2 text-emerald-700 text-sm font-semibold shadow-sm">
              Our Story
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
              About Anand Agro
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Crafting premium, organic jaggery products with a commitment to purity,
              sustainability, and fair trade.
            </p>
          </div>
        </div>
      </section>

      {/* Intro component (kept) */}
      <Aintro />

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              To bring back the tradition of healthy sweetness by delivering organic,
              chemical-free jaggery products while empowering local sugarcane farmers
              through sustainable and fair sourcing.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-amber-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              To be a trusted global brand for natural sweeteners by blending
              traditional craftsmanship with modern, hygienic processes that
              preserve nutrition and taste.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Farmers Network', value: '120+' },
            { label: 'Years Experience', value: '2+' },
            { label: 'SKUs', value: '10+' },
            { label: 'Customer Satisfaction', value: '98%' }
          ].map((s, i) => (
            <div key={i} className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-100 p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-slate-900">{s.value}</div>
              <div className="mt-1 text-sm font-medium text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Our Values</h2>
          <p className="text-slate-600 max-w-2xl text-center mx-auto mt-3">
            The principles that guide our sourcing, processing, and packaging.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Purity First',
                desc: 'No chemicals, preservatives, or artificial additives—ever.'
              },
              {
                title: 'Farmer Empowerment',
                desc: 'Fair pricing, long-term partnerships, and sustainable practices.'
              },
              {
                title: 'Hygienic Processing',
                desc: 'Modern facilities with temperature-controlled crystallization.'
              },
              {
                title: 'Sustainable Future',
                desc: 'Zero-waste processing and eco-conscious packaging.'
              }
            ].map((v, i) => (
              <div key={i} className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Milestones</h2>
          <div className="mt-8 space-y-6">
            {[
              { year: '2023', text: 'Founded with a mission to make natural sweetness mainstream.' },
              { year: '2023', text: 'Set up hygienic processing with low-heat techniques.' },
              { year: '2024', text: 'Expanded farmer network and introduced new flavored SKUs.' }
            ].map((m, i) => (
              <div key={i} className="grid grid-cols-[auto_1fr] gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center font-bold shadow">
                  {m.year}
                </div>
                <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-100 shadow-sm">
                  <p className="text-slate-700">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section removed per request */}

      <Footer />
    </div>
  )
}

export default About;