'use client';

import { useState, useEffect, useRef } from 'react';

const GREEN = '#0d6b43';

/* ─── Icons ─── */
function Icon({ type, size = 24, color = 'currentColor', strokeWidth = 1.8 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    shield: <><path d="M12 3 20 6v5c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    factory: <><path d="M2 20h20"/><path d="M4 20V8l8 4V8l8 4v8"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></>,
    cog: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    leaf: <><path d="M20 4C11 4 5 8.2 5 14c0 3.4 2.4 6 5.7 6C16.7 20 20 13.9 20 4Z"/><path d="M4 20c3-5 6.4-8.3 11-10"/></>,
    arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    checkBadge: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    close: <><path d="M6 6l12 12"/><path d="M18 6 6 18"/></>,
    truck: <><path d="M3 6h11v10H3z"/><path d="M14 9h4l3 3v4h-7z"/><path d="M6.5 19.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17.5 19.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></>,
    car: <><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 12 10s-6.7.6-8.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><path d="m5 10 1.5-4.5h11L19 10"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="17.5" cy="16.5" r="2.5"/></>,
    chip: <><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><path d="M9 9h6v6H9z"/><path d="M9 4v-2"/><path d="M15 4v-2"/><path d="M9 22v-2"/><path d="M15 22v-2"/><path d="M20 9h2"/><path d="M20 14h2"/><path d="M2 9h2"/><path d="M2 14h2"/></>,
    pill: <><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></>,
    heavy: <><path d="M2 20h20"/><path d="M5 20V8l5 4V8l5 4v8"/></>,
    ship: <><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 3.25-2 6-2s3.5 2 6 2c1.3 0 1.9-.5 2.5-1"/><path d="M19.38 12a11.4 11.4 0 0 0-14.76 0"/><path d="M19 18H5l-1-6h16z"/><path d="M10 12V6l4 3z"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></>,
    mail: <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
  };
  return <svg {...common}>{paths[type]}</svg>;
}

/* ─── Scroll Reveal Hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, numericTarget, duration]);

  const displayValue = target.includes('+') ? `${count.toLocaleString()}+` : target.includes(',') ? count.toLocaleString() : `${count}`;

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

/* ─── Data ─── */
const products = [
  { title: 'Wooden Pallets', description: 'Built to perform. Designed to last.' },
  { title: 'Wooden Crates & Boxes', description: 'Maximum protection for valuable cargo.' },
  { title: 'Pulp Packaging', description: 'Eco-friendly. Versatile. Protective.' },
  { title: 'Angle L Board', description: 'Stronger edges. Safer shipments.' },
  { title: 'Clamp-Lock Solutions', description: 'Smart design. Maximum efficiency.' },
  { title: 'Custom Packaging Solutions', description: 'Tailored to your product, your industry, your needs.' }
];

const industries = [
  { icon: 'car', label: 'Automotive' },
  { icon: 'cog', label: 'Industrial Machinery' },
  { icon: 'chip', label: 'Electronics' },
  { icon: 'pill', label: 'Pharmaceuticals' },
  { icon: 'leaf', label: 'Agriculture' },
  { icon: 'heavy', label: 'Heavy Engineering' },
  { icon: 'truck', label: 'Logistics & Warehousing' },
  { icon: 'ship', label: 'Export & Shipping' }
];

const locations = [
  ['Faridabad', 'Haryana'],
  ['Meerut', 'Uttar Pradesh'],
  ['Pune', 'Maharashtra'],
  ['Jaipur', 'Rajasthan']
];

/* ─── India Map ─── */
function IndiaMap() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pins = [
    { id: 'meerut',    top: '29%', left: 'calc(48% - 50px)', label: 'Meerut',    labelPos: 'right' },
    { id: 'faridabad', top: '32%', left: 'calc(47% - 50px)', label: 'Faridabad', labelPos: 'right' },
    { id: 'jaipur',    top: '40%', left: 'calc(39% - 50px)', label: 'Jaipur',    labelPos: 'left' },
    { id: 'pune',      top: '61%', left: 'calc(34% - 50px)', label: 'Pune',      labelPos: 'right' },
  ];

  return (
    <div className={`india-map-container ${visible ? 'map-visible' : ''}`} ref={ref}>
      <img src="/images/india-map.png" alt="Map of India" className="india-map-img" draggable="false" />
      {pins.map((pin, i) => (
        <div key={pin.id} className={`map-pin-wrap pin-anim-${i}`} style={{ top: pin.top, left: pin.left }}>
          <span className="pin-pulse-ring" />
          <span className="pin-pulse-ring ring-2" />
          <span className="pin-dot" />
          <span className="pin-dot-core" />
          <span className="pin-marker"><Icon type="pin" size={12} color="#fff" strokeWidth={2.5} /></span>
          <span className={`pin-label ${pin.labelPos}`}>{pin.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [heroRef, heroVisible] = useReveal(0.1);
  const [statsRef, statsVisible] = useReveal(0.2);
  const [aboutRef, aboutVisible] = useReveal(0.15);
  const [productsRef, productsVisible] = useReveal(0.1);
  const [industriesRef, industriesVisible] = useReveal(0.1);
  const [sustainabilityRef, sustainabilityVisible] = useReveal(0.15);
  const [locationsRef, locationsVisible] = useReveal(0.1);
  const [contactRef, contactVisible] = useReveal(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      {/* ─── Nav ─── */}
      <header className={`nav-wrap ${scrolled ? 'nav-scrolled' : ''}`}>
        <nav className="nav container">
          <a className="logo" href="#home" onClick={closeMenu}>
            <img src="/images/logo.png" alt="ApexViora" style={{ height: '40px', width: 'auto' }} />
          </a>
          <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon type={menuOpen ? 'close' : 'menu'} />
          </button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {['Home', 'About', 'Products', 'Industries', 'Sustainability', 'Locations', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
            ))}
            <a className="btn btn-green nav-cta" href="#contact" onClick={closeMenu}>Request a Quote <Icon type="arrow" size={17} /></a>
          </div>
        </nav>
      </header>

      {/* ─── Hero ─── */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-media" style={{ backgroundImage: "url('/images/hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label="Hero warehouse image" />
        <div className="hero-overlay" />
        <div className={`container hero-content ${heroVisible ? 'reveal' : ''}`}>
          <p className="eyebrow anim-fade-up" style={{ '--delay': '0.1s' }}>PACKAGING SOLUTIONS FOR A STRONGER TOMORROW</p>
          <h1 className="anim-fade-up" style={{ '--delay': '0.25s' }}>Crafting Packaging.<br /><span>Shaping a Sustainable Future.</span></h1>
          <p className="hero-copy anim-fade-up" style={{ '--delay': '0.4s' }}>Premium, innovative and sustainable packaging solutions<br className="desktop" /> engineered around your product and supply chain.</p>
          <div className="hero-actions anim-fade-up" style={{ '--delay': '0.55s' }}>
            <a className="btn btn-green" href="#contact">Request a Quote <Icon type="arrow" size={17} /></a>
            <a className="btn btn-outline" href="#products">Explore Our Products</a>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="stats" ref={statsRef}>
        <div className={`container stats-grid ${statsVisible ? 'reveal' : ''}`}>
          <div className="stat anim-fade-up" style={{ '--delay': '0s' }}>
            <div className="stat-icon"><Icon type="checkBadge" size={32} /></div>
            <strong><AnimatedCounter target="15+" /></strong><span>Years of Packaging<br/>Experience</span>
          </div>
          <div className="stat anim-fade-up" style={{ '--delay': '0.1s' }}>
            <div className="stat-icon"><Icon type="factory" size={32} /></div>
            <strong><AnimatedCounter target="4" /></strong><span>Manufacturing<br/>Locations</span>
          </div>
          <div className="stat anim-fade-up" style={{ '--delay': '0.2s' }}>
            <div className="stat-icon"><Icon type="globe" size={32} /></div>
            <strong className="stat-text">Manufacturer &<br/>Exporter</strong>
          </div>
          <div className="stat anim-fade-up" style={{ '--delay': '0.3s' }}>
            <div className="stat-icon"><Icon type="cog" size={32} /></div>
            <strong className="stat-text">Custom<br/>Engineered<br/>Solutions</strong>
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section id="about" className="about section-white" ref={aboutRef}>
        <div className={`container about-grid ${aboutVisible ? 'reveal' : ''}`}>
          <div className="about-image anim-slide-right" style={{ backgroundImage: "url('/images/about.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="image-badge"><strong>15+</strong><span>Years of trusted<br />packaging expertise</span></div>
          </div>
          <div className="about-content anim-slide-left">
            <p className="eyebrow dark">ABOUT APEXVIORA</p>
            <h2>Committed to quality.<br /><span>Built for your supply chain.</span></h2>
            <p>ApexViora Pack Ventures LLP is a manufacturer and exporter of premium, innovative and sustainable packaging solutions. Our focus is practical protection — safer handling, stronger loads, better transit performance and packaging designed around your product and supply-chain requirements.</p>
            <div className="checks">
              <CheckItem icon="shield" title="Quality Materials" text="Sourced responsibly and built to last." />
              <CheckItem icon="cog" title="Customized Solutions" text="Designed around your product." />
              <CheckItem icon="leaf" title="Sustainable Approach" text="Fibre-based and reusable options." />
              <CheckItem icon="truck" title="Reliable Delivery" text="Supporting your supply chain." />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Products ─── */}
      <section id="products" className="products section-beige" ref={productsRef}>
        <div className={`container ${productsVisible ? 'reveal' : ''}`}>
          <div className="section-heading-row anim-fade-up" style={{ '--delay': '0s' }}>
            <div>
              <p className="eyebrow dark">OUR PRODUCTS</p>
              <h2>Complete Packaging Solutions</h2>
              <p className="subtitle">From wood to pulp, paper to custom designs — ApexViora delivers reliable, sustainable and application-specific packaging for every industry.</p>
            </div>
            <a className="text-link" href="#products">View All Products <Icon type="arrow" size={16} /></a>
          </div>
          <div className="product-grid">
            {products.map((product, i) => (
              <article className={`product-card anim-fade-up`} key={product.title} style={{ '--delay': `${i * 0.1}s` }}>
                <div className="product-image" style={{ backgroundImage: `url('/images/product_${i+1}.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="product-body">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <a href="#contact" className="text-link green-link">Learn More <Icon type="arrow" size={15} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Industries ─── */}
      <section id="industries" className="industries section-dark-green" ref={industriesRef}>
        <div className={`container ${industriesVisible ? 'reveal' : ''}`}>
          <div className="section-heading-row anim-fade-up" style={{ '--delay': '0s' }}>
            <div>
              <p className="eyebrow">INDUSTRIES WE SERVE</p>
              <h2>Trusted Across Diverse Industries</h2>
              <p className="subtitle">We design and manufacture packaging solutions for a wide range of industries, helping businesses move their products safely across the world.</p>
            </div>
            <a className="text-link" href="#industries">View All Industries <Icon type="arrow" size={16} /></a>
          </div>
          <div className="industries-grid">
            {industries.map((ind, i) => (
              <div className={`industry-card anim-fade-up`} key={ind.label} style={{ '--delay': `${0.2 + i * 0.1}s` }}>
                <div className="industry-icon"><Icon type={ind.icon} size={28} /></div>
                <span>{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sustainability ─── */}
      <section id="sustainability" className="sustainability section-white" ref={sustainabilityRef}>
        <div className={`container sustainability-grid ${sustainabilityVisible ? 'reveal' : ''}`}>
          <div className="sustainability-content anim-slide-right">
            <p className="eyebrow dark">SUSTAINABILITY</p>
            <h2>Packaging. People. Planet.</h2>
            <p>Responsible material choices for a more efficient supply chain.</p>
            <p className="sub-p">We focus on reusable formats, durable wood packaging and fibre-based alternatives that reduce environmental impact while maintaining strong protection for your products.</p>
            <a className="btn btn-green" href="#contact">Our Sustainability Approach <Icon type="arrow" size={17} /></a>
          </div>
          <div className="sustainability-cards anim-slide-left">
            <div className="sus-card">
              <div className="sus-img" style={{ backgroundImage: "url('/images/sus_1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="sus-body">
                <strong>Wood</strong>
                <p>Durable, reusable and export-ready packaging.</p>
              </div>
            </div>
            <div className="sus-card">
              <div className="sus-img" style={{ backgroundImage: "url('/images/sus_2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="sus-body">
                <strong>Pulp</strong>
                <p>Fibre-based protective packaging options.</p>
              </div>
            </div>
            <div className="sus-card">
              <div className="sus-img" style={{ backgroundImage: "url('/images/sus_3.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="sus-body">
                <strong>Paper</strong>
                <p>Edge protection and load-stabilizing solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Locations ─── */}
      <section id="locations" className="locations section-beige" ref={locationsRef}>
        <div className={`container locations-grid ${locationsVisible ? 'reveal' : ''}`}>
          <div className="location-copy">
            <p className="eyebrow dark anim-fade-up" style={{ '--delay': '0s' }}>OUR LOCATIONS</p>
            <h2 className="anim-fade-up" style={{ '--delay': '0.1s' }}>Four manufacturing hubs.<br /><span>One national network.</span></h2>
            <p className="anim-fade-up" style={{ '--delay': '0.2s' }}>Strategically located across India to serve you better with faster turnaround times and reliable supply.</p>
            <div className="location-cards">
              {locations.map(([city, state], i) => (
                <div className={`location-card anim-fade-up`} key={city} style={{ '--delay': `${0.3 + i * 0.1}s` }}>
                  <div className="location-card-icon">
                    <Icon type="pin" size={22} />
                  </div>
                  <div><strong>{city}</strong><small>{state}</small></div>
                </div>
              ))}
            </div>
          </div>
          <IndiaMap />
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="contact section-dark-img" ref={contactRef}>
        <div className="contact-overlay" />
        <div className={`container contact-grid ${contactVisible ? 'reveal' : ''}`}>
          <div className="contact-intro anim-slide-right">
            <p className="eyebrow">GET IN TOUCH</p>
            <h2>Let's Build a Stronger,<br /><span>Greener Tomorrow Together.</span></h2>
            <p>Tell us about your requirements and our team will get back to you with a customised solution.</p>
            
            <form className="mobile-contact-form">
              <div className="form-group">
                <label>First Name <span>*</span></label>
                <input type="text" className="form-control" placeholder="Enter your first name" />
              </div>
              <div className="form-group">
                <label>Last Name <span>*</span></label>
                <input type="text" className="form-control" placeholder="Enter your last name" />
              </div>
              <div className="form-group">
                <label>Company Name <span>*</span></label>
                <input type="text" className="form-control" placeholder="Your company name" />
              </div>
              <div className="form-group">
                <label>Email Address <span>*</span></label>
                <input type="email" className="form-control" placeholder="you@company.com" />
              </div>
              <div className="form-group">
                <label>Phone Number <span>*</span></label>
                <input type="tel" className="form-control" placeholder="+91 98739 35865" />
              </div>
              <div className="form-group">
                <label>Product Interest <span>*</span></label>
                <div className="checkbox-group">
                  <label className="checkbox-item"><input type="checkbox" /> Wooden Pallets</label>
                  <label className="checkbox-item"><input type="checkbox" /> Wooden Crates & Boxes</label>
                  <label className="checkbox-item"><input type="checkbox" /> Pulp Packaging</label>
                  <label className="checkbox-item"><input type="checkbox" /> Angle L Board</label>
                  <label className="checkbox-item"><input type="checkbox" /> Clamp-Lock Solutions</label>
                  <label className="checkbox-item"><input type="checkbox" /> Custom Packaging</label>
                </div>
              </div>
              <div className="form-group">
                <label>Message <span>*</span></label>
                <textarea className="form-control" placeholder="Tell us about your requirements..." rows={3}></textarea>
              </div>
              <button type="button" className="btn btn-green btn-large form-submit-btn">Submit Request <Icon type="arrow" size={17} /></button>
            </form>
          </div>
          <div className="contact-info anim-slide-left desktop-only">
            <a className="btn btn-green btn-large" href="#contact">Request a Quote <Icon type="arrow" size={17} /></a>
            <div className="contact-details">
              <a href="tel:+919873935865"><Icon type="phone" size={18}/> +91 98739 35865 | +91 96505 77900</a>
              <a href="mailto:apexviorapv@gmail.com"><Icon type="mail" size={18}/> apexviorapv@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer section-dark">
        <div className="container footer-top">
          <div className="footer-brand">
            <a className="logo" href="#home">
              <img src="/images/logo.png" alt="ApexViora" style={{ height: '40px', width: 'auto' }} />
            </a>
            <p className="footer-tagline mobile-only">Packaging Solutions for a Stronger Tomorrow</p>
            
            <div className="footer-details-mobile mobile-only">
              <a href="tel:+919873935865"><Icon type="phone" size={16}/> +91 98739 35865 | +91 96505 77900</a>
              <a href="mailto:apexviorapv@gmail.com"><Icon type="mail" size={16}/> apexviorapv@gmail.com</a>
              <p><Icon type="pin" size={16}/> <span>Office No. 103, Second Floor, NIT-3,<br/>Faridabad, Haryana - 121001<br/>(Opp. Chimni Bai Dharamshala)</span></p>
            </div>
          </div>
          <div className="footer-links">
            {['Home', 'About', 'Products', 'Industries', 'Sustainability', 'Locations', 'Contact'].map((item) => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}
          </div>
          <div className="socials"><a href="#contact">in</a><a href="#contact">f</a><a href="#contact">◎</a></div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 ApexViora Pack Ventures LLP. All rights reserved.</span>
          <div><a href="#home">Privacy Policy</a><span>|</span><a href="#home">Terms of Service</a></div>
        </div>
      </footer>
    </main>
  );
}

/* ─── Sub-components ─── */
function CheckItem({ icon, title, text }) {
  return (
    <div className="check-item">
      <div className="icon-box"><Icon type={icon} size={20} /></div>
      <div><strong>{title}</strong><p>{text}</p></div>
    </div>
  );
}
