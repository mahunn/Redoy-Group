import { useState, useEffect } from 'react';
import { 
  Building, 
  ShoppingBag, 
  Box, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Calendar, 
  ChevronRight, 
  Shield, 
  ArrowRight, 
  Layers, 
  Activity, 
  Clock,
  Menu,
  X,
  Sun,
  Moon,
  Eye,
  ChevronLeft,
  Download,
  Truck,
  Anchor,
  AlertCircle
} from 'lucide-react';
import FloatingElement from './components/FloatingElement';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Knitting Floor Operations",
    category: "garments",
    src: "/assets/Screenshot 2026-06-24 222138.png",
    description: "Multi-line circular knitting machinery producing premium knit fabrics in Fatullah, Narayanganj."
  },
  {
    id: 2,
    title: "Apparel Stitching & Assembly",
    category: "garments",
    src: "/assets/Screenshot 2026-06-24 222518.png",
    description: "Automated sewing lines equipped with Juki and Pegasus machinery for high-output casual wear."
  },
  {
    id: 3,
    title: "Garment Ironing & Finishing",
    category: "garments",
    src: "/assets/Screenshot 2026-06-24 222329.png",
    description: "Vacuum ironing tables and steam press units ensuring crisp, retail-ready garments."
  },
  {
    id: 4,
    title: "Apparel Quality Assurance",
    category: "garments",
    src: "/assets/Screenshot 2026-06-24 222215.png",
    description: "In-line and end-of-line quality control checkpoints verifying dimensions and stitching integrity."
  },
  {
    id: 5,
    title: "Extruder Film Blown Plant",
    category: "polythene",
    src: "/assets/Screenshot 2026-06-24 222539.png",
    description: "Multi-layer co-extrusion blown film tower generating uniform thickness industrial plastic rolls."
  },
  {
    id: 6,
    title: "Finished Poly Stretch Film",
    category: "polythene",
    src: "/assets/polythene-packaging/ea032d1b-69ef-46b8-acc0-4f4ed3fe6ebc.jpg",
    description: "Heavy-duty LLDPE packaging rolls stacked and prepared for logistics wrapping shipments."
  },
  {
    id: 7,
    title: "Custom Printed Factory Polybags",
    category: "polythene",
    src: "/assets/polythene-packaging/49807084-d662-4e2e-b4e8-ea63f9b2484c.jpg",
    description: "Warning message printed garment polybags tailored for international retail packaging compliance."
  },
  {
    id: 8,
    title: "LDPE Recycled Eco Polymer",
    category: "polythene",
    src: "/assets/polythene-packaging/673d26ed-dc4a-4635-b5cb-18cd4dd468f6.jpg",
    description: "Green-infused recyclable polythene sheets offering standard puncture resistance."
  },
  {
    id: 9,
    title: "Carton Flute Corrugator Line",
    category: "cartons",
    src: "/assets/cardboard-packaging/02c33d02-b80b-4521-b4ec-302729b5aaf6.jpg",
    description: "Heavy corrugating machine laminating linerboards into 3-Ply, 5-Ply, and 7-Ply corrugated boards."
  },
  {
    id: 10,
    title: "Custom Corrugated Shipping Box",
    category: "cartons",
    src: "/assets/Screenshot 2026-06-24 222313.png",
    description: "Finished high-strength export carton boxes, ready for clothing and industrial freight logistics."
  },
  {
    id: 11,
    title: "Flexo Folder Gluer Slotter",
    category: "cartons",
    src: "/assets/Screenshot 2026-06-24 222358.png",
    description: "High-speed flexographic printer scoring, slotting, and gluing paper sheets into boxes."
  },
  {
    id: 12,
    title: "Die-Cutting Assembly Floor",
    category: "cartons",
    src: "/assets/Screenshot 2026-06-24 222407.png",
    description: "Automated die-cut machinery crafting custom tuck-top boxes and corrugated inserts."
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('garments');
  const [rfqSubmitStatus, setRfqSubmitStatus] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    quantity: '',
    productType: 'Polo Shirt',
    specs: ''
  });

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Gallery states
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Gallery methods
  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const slideNext = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
  };

  const slidePrev = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
  };

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') slideNext();
      if (e.key === 'ArrowLeft') slidePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Mobile Menu Body Scroll Lock
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const getParsedQuantity = () => {
    // Extract numbers from quantity string (e.g. "20,000 Pcs" -> 20000)
    const matches = formData.quantity.match(/[\d,]+/);
    if (!matches) return 0;
    return parseInt(matches[0].replace(/,/g, ''), 10) || 0;
  };

  const calculateLeadTime = () => {
    const quantity = getParsedQuantity();
    if (quantity <= 0) return null;

    let dailyOutput = 80000;
    let setupDays = 3;
    let unit = "pcs";

    if (activeTab === 'garments') {
      dailyOutput = 80000;
      setupDays = 3;
      unit = "Pcs";
    } else if (activeTab === 'polythene') {
      dailyOutput = 35; // Tons
      setupDays = 2;
      unit = "Metric Tons";
    } else if (activeTab === 'box') {
      dailyOutput = 50000;
      setupDays = 2;
      unit = "Units";
    }

    const rawProductionDays = Math.ceil(quantity / dailyOutput);
    const totalDays = setupDays + rawProductionDays;
    
    // Raw material estimates
    let rawMaterialLabel = "Fabric Weight";
    let rawMaterialAmount = "";
    if (activeTab === 'garments') {
      // average 250g fabric per piece (Polo)
      rawMaterialAmount = `${((quantity * 0.25) / 1000).toLocaleString(undefined, {maximumFractionDigits: 1})} Tons Combed Yarn`;
    } else if (activeTab === 'polythene') {
      rawMaterialLabel = "Polymer Resin Feed";
      rawMaterialAmount = `${(quantity * 1.05).toLocaleString(undefined, {maximumFractionDigits: 1})} Tons raw LLDPE`;
    } else if (activeTab === 'box') {
      rawMaterialLabel = "Paperboard Fluting Feed";
      // average 400g per unit carton
      rawMaterialAmount = `${((quantity * 0.4) / 1000).toLocaleString(undefined, {maximumFractionDigits: 1})} Tons Kraft Paper`;
    }

    // Shipping date window
    const baseDate = new Date();
    // Add production days + transit to port (4 days)
    baseDate.setDate(baseDate.getDate() + totalDays + 4);
    const shippingDateString = baseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return {
      setupDays,
      productionDays: rawProductionDays,
      totalDays,
      rawMaterialLabel,
      rawMaterialAmount,
      shippingDateString,
      portStatus: "Chittagong Port FOB",
      capacityPercent: Math.min(100, Math.round((quantity / (dailyOutput * 30)) * 100))
    };
  };

  const estimation = calculateLeadTime();

  // Scroll Header Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Inquiry Type Shift
  useEffect(() => {
    if (activeTab === 'garments') {
      setFormData(prev => ({ ...prev, productType: 'Polo Shirt' }));
    } else if (activeTab === 'polythene') {
      setFormData(prev => ({ ...prev, productType: 'LLDPE Packaging Rolls' }));
    } else {
      setFormData(prev => ({ ...prev, productType: 'Double-Wall Carton Box' }));
    }
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid B2B email address';
    }
    
    if (!formData.company.trim()) errors.company = 'Company name is required';
    if (!formData.quantity.trim()) errors.quantity = 'Quantity / weight is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getMoqInfo = () => {
    if (activeTab === 'garments') return "Minimum Order Quantity (MOQ): 5,000 Pieces";
    if (activeTab === 'polythene') return "Minimum Order Quantity (MOQ): 1 Metric Ton";
    return "Minimum Order Quantity (MOQ): 10,000 Units";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setRfqSubmitStatus('sending');
    setTimeout(() => {
      setRfqSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        quantity: '',
        productType: activeTab === 'garments' ? 'Polo Shirt' : activeTab === 'polythene' ? 'LLDPE Packaging Rolls' : 'Double-Wall Carton Box',
        specs: ''
      });
      setFormErrors({});
    }, 1500);
  };

  return (
    <div className="app-container">
      {/* Background grids */}
      <div className="mesh-bg"></div>

      {/* Navigation Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`} id="site-header">
        <a href="#home" className="logo-container" id="nav-logo" onClick={() => setMobileMenuOpen(false)}>
          <img src="/assets/logo/logo.jpg" alt="Redoy Group Logo" className="logo-img" />
          <div className="logo-text">REDOY <span>GROUP</span></div>
        </a>
        
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><a href="#home" className="nav-link" id="nav-link-home">Home</a></li>
            <li><a href="#garments" className="nav-link" id="nav-link-garments">Garments</a></li>
            <li><a href="#polythene" className="nav-link" id="nav-link-polythene">Polythene Packaging</a></li>
            <li><a href="#box" className="nav-link" id="nav-link-box">Box Packaging</a></li>
            <li><a href="#heritage" className="nav-link" id="nav-link-heritage">Compliance & Heritage</a></li>
            <li><a href="#gallery" className="nav-link" id="nav-link-gallery">Factory Tour</a></li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            id="theme-toggle-btn"
            className="theme-toggle-btn"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme color"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-heading)',
              transition: 'var(--transition-fast)'
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <a href="#rfq" className="nav-btn desktop-only" id="nav-btn-rfq">Request Quote</a>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-menu-toggle" 
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} id="mobile-nav-drawer">
          <ul className="mobile-nav-links">
            <li><a href="#home" className="mobile-nav-link" id="mobile-link-home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#garments" className="mobile-nav-link" id="mobile-link-garments" onClick={() => setMobileMenuOpen(false)}>Garments</a></li>
            <li><a href="#polythene" className="mobile-nav-link" id="mobile-link-polythene" onClick={() => setMobileMenuOpen(false)}>Polythene Packaging</a></li>
            <li><a href="#box" className="mobile-nav-link" id="mobile-link-box" onClick={() => setMobileMenuOpen(false)}>Box Packaging</a></li>
            <li><a href="#heritage" className="mobile-nav-link" id="mobile-link-heritage" onClick={() => setMobileMenuOpen(false)}>Compliance & Heritage</a></li>
            <li><a href="#gallery" className="mobile-nav-link" id="mobile-link-gallery" onClick={() => setMobileMenuOpen(false)}>Factory Tour</a></li>
            <li style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button
                id="mobile-theme-toggle-btn"
                className="btn btn-outline"
                onClick={() => {
                  setTheme(theme === 'light' ? 'dark' : 'light');
                  setMobileMenuOpen(false);
                }}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {theme === 'light' ? (
                  <span style={{ display: 'flex', alignItems: 'center' }}><Moon size={16} style={{ marginRight: '8px' }} /> Dark Theme</span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center' }}><Sun size={16} style={{ marginRight: '8px' }} /> Light Theme</span>
                )}
              </button>
              <a href="#rfq" className="btn btn-primary" id="mobile-btn-rfq" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileMenuOpen(false)}>
                Request Quote
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="section bg-light-sec" style={{ paddingTop: '160px', minHeight: 'auto', paddingBottom: '80px' }}>
        <div className="container">
          <div className="grid-2">
            <div>
              <span className="badge">Narayanganj, Bangladesh</span>
              <h1 className="title-lg text-gradient" style={{ color: 'var(--text-heading)', fontWeight: 800, background: 'none', WebkitTextFillColor: 'initial' }}>
                Industrial Manufacturing Powerhouse
              </h1>
              <p style={{ fontSize: '1.15rem', marginBottom: '32px', color: 'var(--text-muted)' }}>
                Partnering with global retail and logistics brands. Redoy Group delivers high-capacity manufacturing excellence in ready-made garments, extruded industrial polythene, and corrugated carton box packaging.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="#garments" className="btn btn-primary">Explore Verticals <ChevronRight size={16} /></a>
                <a href="#rfq" className="btn btn-outline">Send B2B RFQ</a>
              </div>
            </div>
            
            <div style={{ position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
              <img 
                src="/assets/Screenshot 2026-06-24 222138.png" 
                alt="Redoy Group Factory Overview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(15,23,42,0.95), transparent)', color: 'white' }}>
                <h4 style={{ color: 'white', marginBottom: '4px', fontSize: '1.2rem' }}>State-Of-The-Art Factory floor</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Advanced automated machinery ensuring quality & speed.</p>
              </div>
            </div>
          </div>

          {/* Stats Counter Grid */}
          <div className="grid-3 corporate-card" style={{ marginTop: '80px', padding: '0', display: 'grid' }}>
            <div className="stat-box">
              <div className="stat-num">80,000+</div>
              <div className="stat-label">Daily Garment Output</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">35+ Tons</div>
              <div className="stat-label">Daily Polythene Capacity</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">50,000+</div>
              <div className="stat-label">Daily Carton Packaging Units</div>
            </div>
          </div>
        </div>
      </section>

      {/* Garments Section (Flagship Manufacturing) */}
      <section id="garments" className="section bg-white" style={{ position: 'relative' }}>
        {/* Antigravity floating shirt element */}
        <FloatingElement 
          src="/assets/isolated/shirt.png" 
          speed={-0.12} 
          top="15%" 
          right="8%" 
          width="240px" 
          className="micro-drift-up" 
        />

        <div className="container">
          <div className="section-header">
            <span className="bordered-title">FLAGSHIP VERTICAL</span>
            <h2 className="section-title">Ready-Made Garments</h2>
          </div>

          <div className="grid-2">
            <div className="corporate-card">
              <span className="badge badge-secondary" style={{ color: 'var(--primary)', background: 'var(--primary-light)' }}>
                <Layers size={14} style={{ marginRight: '4px' }} /> Knitting & Stitching Unit
              </span>
              <p style={{ marginBottom: '20px', fontSize: '1.05rem' }}>
                Redoy Group's apparel wing manufactures high-quality casual wear, active wear, and knit products for top-tier international brands. Operating out of Narayanganj, our sewing floor features computer-aided design and automatic fabric spreading machinery.
              </p>
              
              <table className="capacity-table">
                <tbody>
                  <tr>
                    <td className="label-cell">Monthly Production</td>
                    <td>2,400,000 Pcs</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Key Products</td>
                    <td>T-Shirts, Polo Shirts, Active wear, Hoodies</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Worker Force</td>
                    <td>1,200+ Trained Operators</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Machinery</td>
                    <td>Pegasus, Juki, Brother sewing units</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: '24px' }}>
                <a href="#rfq" onClick={() => setActiveTab('garments')} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                  Inquire For Apparel <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </a>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ height: '280px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 8px 16px rgba(0,0,0,0.03)' }}>
                <img 
                  src="/assets/Screenshot 2026-06-24 222518.png" 
                  alt="Garments sewing line" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="grid-2" style={{ gap: '20px' }}>
                <div style={{ height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src="/assets/Screenshot 2026-06-24 222215.png" alt="Garments QC" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src="/assets/Screenshot 2026-06-24 222329.png" alt="Apparel iron floor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Polythene Packaging Section */}
      <section id="polythene" className="section bg-light-sec" style={{ position: 'relative' }}>
        {/* Antigravity floating polyroll element */}
        <FloatingElement 
          src="/assets/isolated/polyroll.png" 
          speed={0.08} 
          top="20%" 
          left="6%" 
          width="260px" 
          className="micro-drift-down" 
        />

        <div className="container">
          <div className="section-header">
            <span className="bordered-title" style={{ color: 'var(--secondary)' }}>PACKAGING SOLUTIONS</span>
            <h2 className="section-title">Polythene Packaging</h2>
          </div>

          <div className="grid-2">
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <img 
                  src="/assets/Screenshot 2026-06-24 222539.png" 
                  alt="Polythene Extruder Machine" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                {/* Loop of small pictures for polythene */}
                <div style={{ width: '100px', height: '100px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src="/assets/polythene-packaging/49807084-d662-4e2e-b4e8-ea63f9b2484c.jpg" alt="Poly bag 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ width: '100px', height: '100px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src="/assets/polythene-packaging/673d26ed-dc4a-4635-b5cb-18cd4dd468f6.jpg" alt="Poly bag 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ width: '100px', height: '100px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src="/assets/polythene-packaging/ea032d1b-69ef-46b8-acc0-4f4ed3fe6ebc.jpg" alt="Poly rolls" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>

            <div className="corporate-card" style={{ borderTop: '4px solid var(--secondary)' }}>
              <span className="badge badge-secondary" style={{ color: 'var(--secondary)', background: 'var(--secondary-light)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <Activity size={14} style={{ marginRight: '4px' }} /> LDPE & LLDPE Manufacturing
              </span>
              <p style={{ marginBottom: '20px', fontSize: '1.05rem' }}>
                We engineer premium, heavy-duty industrial polythene sheets, wrapping films, and retail plastic carrier bags. Our state-of-the-art Narayanganj plant utilizes multi-layer blown film extruders to guarantee robust tear strength and exceptional thickness control.
              </p>
              
              <table className="capacity-table">
                <tbody>
                  <tr>
                    <td className="label-cell">Monthly Production</td>
                    <td>1,000+ Metric Tons</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Products Offered</td>
                    <td>Stretch Film, Shrink Wraps, Heavy Duty Bags, Printed Polybags</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Material Grades</td>
                    <td>LDPE, LLDPE, HDPE (Virgin & Recycled Eco-blend)</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Quality Specs</td>
                    <td>Thicknesses from 10 to 150 microns; high puncture resistance</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: '24px' }}>
                <a href="#rfq" onClick={() => setActiveTab('polythene')} className="btn btn-primary" style={{ background: 'var(--secondary)', borderColor: 'var(--secondary)', padding: '10px 20px', fontSize: '0.85rem' }}>
                  Inquire For Polythene <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corrugated Box & Carton Packaging Section */}
      <section id="box" className="section bg-white" style={{ position: 'relative' }}>
        {/* Antigravity floating cardboardbox element */}
        <FloatingElement 
          src="/assets/isolated/cardboardbox.png" 
          speed={-0.1} 
          top="15%" 
          right="8%" 
          width="240px" 
          className="micro-drift-up" 
        />

        <div className="container">
          <div className="section-header">
            <span className="bordered-title" style={{ color: 'var(--accent)' }}>HEAVY PACKAGING</span>
            <h2 className="section-title">Corrugated Box & Carton Packaging</h2>
          </div>

          <div className="grid-2">
            <div className="corporate-card" style={{ borderTop: '4px solid var(--accent)' }}>
              <span className="badge badge-secondary" style={{ color: 'var(--accent)', background: 'var(--accent-light)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <Box size={14} style={{ marginRight: '4px' }} /> Carton Manufacturing Division
              </span>
              <p style={{ marginBottom: '20px', fontSize: '1.05rem' }}>
                Specializing in robust, heavy-duty corrugated board and customized paper carton packaging solutions. Designed to meet international freight and logistics standards, our cartons provide high compression strength and structural durability.
              </p>
              
              <table className="capacity-table">
                <tbody>
                  <tr>
                    <td className="label-cell">Monthly Production</td>
                    <td>1,500,000 Units</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Corrugation Types</td>
                    <td>3-Ply, 5-Ply, 7-Ply Heavy Duty Carton Boxes</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Customizations</td>
                    <td>Flexographic Multi-Color Logo Printing, Custom Die-Cuts</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Applications</td>
                    <td>RMG Export Cartons, Food Packaging, General Logistics Shipping</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: '24px' }}>
                <a href="#rfq" onClick={() => setActiveTab('box')} className="btn btn-primary" style={{ background: 'var(--accent)', borderColor: 'var(--accent)', padding: '10px 20px', fontSize: '0.85rem' }}>
                  Inquire For Carton Packaging <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </a>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
                <img 
                  src="/assets/cardboard-packaging/02c33d02-b80b-4521-b4ec-302729b5aaf6.jpg" 
                  alt="Automatic Carton Board machine" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src="/assets/Screenshot 2026-06-24 222313.png" alt="Carton Box stacks" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ width: '100px', height: '100px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src="/assets/Screenshot 2026-06-24 222407.png" alt="Carton machine floor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage & Compliance Section (Urmi-inspired layout) */}
      <section id="heritage" className="section bg-light-sec">
        <div className="container">
          <div className="section-header">
            <span className="bordered-title">TRUST & SUSTAINABILITY</span>
            <h2 className="section-title">Our Heritage & B2B Compliance</h2>
          </div>

          <div className="grid-2">
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'var(--text-heading)' }}>
                Commitment to Narayanganj's Industrial Future
              </h3>
              <p style={{ marginBottom: '24px' }}>
                Narayanganj has historically been the economic powerhouse and "Dundee of Bangladesh." Redoy Group is proud to continue this legacy, combining standard manufacturing capacities with modern green compliance standards. All our manufacturing factories are regularly audited by internationally recognized bodies to ensure structural safety, fair wages, and environmental responsibility.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="corporate-card" style={{ padding: '20px' }}>
                  <Shield size={28} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>100% Compliant</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Regular BSCI, OEKO-TEX, and ACCORD audited facilities.</p>
                </div>
                <div className="corporate-card" style={{ padding: '20px' }}>
                  <Activity size={28} style={{ color: 'var(--secondary)', marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Eco-friendly Blends</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Using recyclable polythene polymers & FSC certified paperboards.</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--text-heading)' }}>
                Manufacturing Milestones
              </h3>
              
              <div className="timeline-container">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-year">1998</div>
                  <div className="timeline-title">Apparel Factory Launch</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Established our garments wing in Fatullah, Narayanganj with 100 sewing lines.</p>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-year">2009</div>
                  <div className="timeline-title">Packaging Expansion</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Inaugurated LDPE polythene extrusion facilities supplying regional logistics hubs.</p>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-year">2018</div>
                  <div className="timeline-title">Carton Plant Automation</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Installed automatic high-speed corrugated paperboard corrugators and flexo printer slotters.</p>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-year">2026</div>
                  <div className="timeline-title">Eco-Packaging & B2B Portals</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Transitioning to bio-degradable polymer blends and digital RFQ systems for worldwide partners.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Tour Gallery Section */}
      <section id="gallery" className="section bg-light-sec">
        <div className="container">
          <div className="section-header">
            <span className="bordered-title">FACTORY TOUR</span>
            <h2 className="section-title">Operations & Products Showcase</h2>
          </div>

          {/* Filter Categories */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {['all', 'garments', 'polythene', 'cartons'].map((cat) => (
              <button
                key={cat}
                id={`gallery-filter-${cat}`}
                onClick={() => setGalleryFilter(cat)}
                className={`btn ${galleryFilter === cat ? 'btn-primary' : 'btn-outline'}`}
                style={{
                  textTransform: 'capitalize',
                  padding: '8px 20px',
                  fontSize: '0.9rem',
                  background: galleryFilter === cat ? (cat === 'polythene' ? 'var(--secondary)' : cat === 'cartons' ? 'var(--accent)' : 'var(--primary)') : 'transparent',
                  borderColor: galleryFilter === cat ? (cat === 'polythene' ? 'var(--secondary)' : cat === 'cartons' ? 'var(--accent)' : 'var(--primary)') : 'var(--border-color)',
                  color: galleryFilter === cat ? 'white' : 'var(--text-main)'
                }}
              >
                {cat === 'cartons' ? 'Carton Packaging' : cat === 'polythene' ? 'Polythene Packaging' : cat === 'all' ? 'All Operations' : 'Garments'}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {GALLERY_ITEMS.filter(item => galleryFilter === 'all' || item.category === galleryFilter).map((item) => {
              const globalIndex = GALLERY_ITEMS.findIndex(g => g.id === item.id);
              return (
                <div
                  key={item.id}
                  className="gallery-card corporate-card"
                  style={{ padding: '0', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                  onClick={() => openLightbox(globalIndex)}
                >
                  <div className="gallery-img-container" style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={item.src}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      className="gallery-thumb-img"
                    />
                    <div className="gallery-overlay">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                        <Eye size={18} /> View Operations
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <span className="badge" style={{
                      fontSize: '0.75rem',
                      marginBottom: '8px',
                      background: item.category === 'garments' ? 'var(--primary-light)' : item.category === 'polythene' ? 'var(--secondary-light)' : 'var(--accent-light)',
                      color: item.category === 'garments' ? 'var(--primary-dark)' : item.category === 'polythene' ? 'var(--secondary)' : 'var(--accent)',
                    }}>
                      {item.category === 'garments' ? 'Garments' : item.category === 'polythene' ? 'Polythene' : 'Carton Box'}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', margin: '4px 0 8px 0', color: 'var(--text-heading)' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fullscreen Lightbox */}
        {lightboxIndex !== null && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="lightbox-close"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Main Lightbox Content */}
            <div className="lightbox-content-wrapper" onClick={(e) => e.stopPropagation()}>
              {/* Prev Button */}
              <button
                onClick={(e) => slidePrev(e)}
                className="lightbox-nav-btn"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Lightbox Image Container */}
              <div className="lightbox-img-holder">
                <img
                  src={GALLERY_ITEMS[lightboxIndex].src}
                  alt={GALLERY_ITEMS[lightboxIndex].title}
                  className="lightbox-main-img"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => slideNext(e)}
                className="lightbox-nav-btn"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Description Card */}
            <div className="lightbox-desc-card" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ color: 'white', marginBottom: '8px', fontSize: '1.25rem' }}>
                {GALLERY_ITEMS[lightboxIndex].title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {GALLERY_ITEMS[lightboxIndex].description}
              </p>
              <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                Image {lightboxIndex + 1} of {GALLERY_ITEMS.length} • Category: <span style={{ textTransform: 'capitalize' }}>{GALLERY_ITEMS[lightboxIndex].category}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Interactive B2B RFQ inquiry Form */}
      <section id="rfq" className="section bg-white">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="section-header">
            <span className="bordered-title">GET A CUSTOM QUOTE</span>
            <h2 className="section-title">Submit B2B RFQ Inquiry</h2>
          </div>

          <div className="rfq-grid">
            {/* Form Column */}
            <div className="corporate-card" style={{ padding: '32px' }} id="rfq-form-card">
              <div className="rfq-tabs">
                <button 
                  id="rfq-tab-garments"
                  className={`rfq-tab ${activeTab === 'garments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('garments')}
                >
                  Garments RFQ
                </button>
                <button 
                  id="rfq-tab-polythene"
                  className={`rfq-tab ${activeTab === 'polythene' ? 'active' : ''}`}
                  onClick={() => setActiveTab('polythene')}
                  style={{ activeColor: 'var(--secondary)' }}
                >
                  Polythene RFQ
                </button>
                <button 
                  id="rfq-tab-box"
                  className={`rfq-tab ${activeTab === 'box' ? 'active' : ''}`}
                  onClick={() => setActiveTab('box')}
                >
                  Carton Box RFQ
                </button>
              </div>

              <div className="rfq-moq-banner" style={{
                background: activeTab === 'garments' ? 'var(--primary-light)' : activeTab === 'polythene' ? 'var(--secondary-light)' : 'var(--accent-light)',
                color: activeTab === 'garments' ? 'var(--primary-dark)' : activeTab === 'polythene' ? 'var(--secondary)' : 'var(--accent)',
                padding: '12px 16px',
                borderRadius: '6px',
                marginBottom: '24px',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'var(--transition-fast)'
              }}>
                <Clock size={16} />
                <span>{getMoqInfo()}</span>
              </div>

              {rfqSubmitStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }} id="rfq-success-container">
                  <CheckCircle size={64} style={{ color: 'var(--secondary)', marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>RFQ Submitted Successfully</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                    Thank you for your request. Our B2B sales desk at Narayanganj will review your requirements and reach out within 24 business hours.
                  </p>
                  <button id="rfq-reset-btn" className="btn btn-outline" onClick={() => setRfqSubmitStatus(null)}>
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="rfq-form">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label htmlFor="rfq-input-name">Full Name</label>
                      <input 
                        type="text" 
                        id="rfq-input-name"
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`form-input ${formErrors.name ? 'input-error' : ''}`} 
                        placeholder="e.g. John Doe" 
                        required 
                      />
                      {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="rfq-input-email">B2B Contact Email</label>
                      <input 
                        type="email" 
                        id="rfq-input-email"
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-input ${formErrors.email ? 'input-error' : ''}`} 
                        placeholder="corporate@brand.com" 
                        required 
                      />
                      {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
                    <div className="form-group">
                      <label htmlFor="rfq-input-company">Company Name</label>
                      <input 
                        type="text" 
                        id="rfq-input-company"
                        name="company" 
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`form-input ${formErrors.company ? 'input-error' : ''}`} 
                        placeholder="e.g. Retail Brand Ltd" 
                        required 
                      />
                      {formErrors.company && <span className="error-message">{formErrors.company}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="rfq-input-quantity">Estimated Quantity Needed</label>
                      <input 
                        type="text" 
                        id="rfq-input-quantity"
                        name="quantity" 
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className={`form-input ${formErrors.quantity ? 'input-error' : ''}`} 
                        placeholder={activeTab === 'polythene' ? 'e.g. 5' : 'e.g. 20,000'} 
                        required 
                      />
                      {formErrors.quantity && <span className="error-message">{formErrors.quantity}</span>}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '16px' }}>
                    <label htmlFor="rfq-input-productType">Product Type / Grade</label>
                    <select 
                      id="rfq-input-productType"
                      name="productType" 
                      value={formData.productType}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      {activeTab === 'garments' && (
                        <>
                          <option value="Polo Shirt">Polo Shirt (100% Combed Cotton)</option>
                          <option value="Basic T-Shirt">Basic T-Shirt (Knit Fabric)</option>
                          <option value="Hoodie">Premium Fleece Hoodie</option>
                          <option value="Sportswear">Athletic Active Wear</option>
                        </>
                      )}
                      {activeTab === 'polythene' && (
                        <>
                          <option value="LLDPE Packaging Rolls">LLDPE Stretch Wrapping Rolls</option>
                          <option value="Printed Factory Bags">Custom Printed Factory Polybags</option>
                          <option value="LDPE Shrink Film">Industrial LDPE Shrink Film</option>
                        </>
                      )}
                      {activeTab === 'box' && (
                        <>
                          <option value="Double-Wall Carton Box">5-Ply Double-Wall Shipping Carton</option>
                          <option value="Triple-Wall Box">7-Ply Triple-Wall Heavy Freight Box</option>
                          <option value="Die-Cut Retail Box">3-Ply Die-Cut Retail Product Box</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginTop: '16px' }}>
                    <label htmlFor="rfq-input-specs">Additional Specifications (Dimensions, printing colors, grammage, etc.)</label>
                    <textarea 
                      id="rfq-input-specs"
                      name="specs" 
                      value={formData.specs}
                      onChange={handleInputChange}
                      rows="4" 
                      className="form-input" 
                      placeholder="Enter custom dimensions, thickness in microns, ply strength or specific design requests..."
                    ></textarea>
                  </div>

                  <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <button 
                      type="submit" 
                      id="rfq-submit-btn"
                      className="btn btn-primary" 
                      disabled={rfqSubmitStatus === 'sending'}
                      style={{ 
                        width: '100%', 
                        justifyContent: 'center', 
                        background: activeTab === 'polythene' ? 'var(--secondary)' : activeTab === 'box' ? 'var(--accent)' : 'var(--primary)' 
                      }}
                    >
                      {rfqSubmitStatus === 'sending' ? (
                        <span className="spinner-container">
                          <span className="spinner"></span>
                          Processing Inquiry...
                        </span>
                      ) : 'Submit Request for Quotation'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Production Estimator Column */}
            <div 
              className="corporate-card production-estimator-card" 
              style={{ 
                padding: '32px', 
                borderTop: activeTab === 'polythene' ? '4px solid var(--secondary)' : activeTab === 'box' ? '4px solid var(--accent)' : '4px solid var(--primary)',
                position: 'sticky',
                top: '100px'
              }} 
              id="rfq-estimator-card"
            >
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={20} style={{ color: activeTab === 'polythene' ? 'var(--secondary)' : activeTab === 'box' ? 'var(--accent)' : 'var(--primary)' }} />
                B2B Production Estimator
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
                Real-time capacity logistics and materials allocation model for Fatullah factory output.
              </p>

              {estimation ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Timeline progress */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text-heading)' }}>Est. Production Duration</span>
                      <span style={{ color: activeTab === 'polythene' ? 'var(--secondary)' : activeTab === 'box' ? 'var(--accent)' : 'var(--primary)', fontWeight: 700 }}>
                        {estimation.totalDays} Days
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${Math.min(100, (estimation.productionDays / estimation.totalDays) * 100)}%`,
                        height: '100%',
                        background: activeTab === 'polythene' ? 'var(--secondary)' : activeTab === 'box' ? 'var(--accent)' : 'var(--primary)',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>

                  {/* Estimation metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>SETUP & WARMUP</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '4px' }}>{estimation.setupDays} Days</div>
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>RUN ESTIMATION</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '4px' }}>{estimation.productionDays} {estimation.productionDays === 1 ? 'Day' : 'Days'}</div>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{estimation.rawMaterialLabel}</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{estimation.rawMaterialAmount}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>QC Audit Standard</span>
                      <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>AQL 1.5 Compliance</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>FOB Port Loading</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{estimation.shippingDateString}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Logistics Terms</span>
                      <span className="badge" style={{
                        background: 'var(--primary-light)',
                        color: 'var(--primary-dark)',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {estimation.portStatus}
                      </span>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(16, 126, 182, 0.04)', border: '1px solid var(--primary-light)', padding: '12px', borderRadius: '6px', display: 'flex', gap: '10px', alignItems: 'start' }} className="estimator-note-box">
                    <Truck size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                      Calculated using daily capacities from Narayanganj floor logs. Custom printing slots or plates may add 2 days.
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', border: '2px dashed var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }} className="estimator-empty-state">
                  <AlertCircle size={36} style={{ color: 'var(--text-light)' }} />
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.4 }}>
                    Specify estimated quantity in the B2B form to load real-time manufacturing and shipping schedules.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Footer (Deep Navy Style) */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo-container" style={{ color: 'white', marginBottom: '20px' }}>
              <img src="/assets/logo/logo.jpg" alt="Logo" className="logo-img" style={{ border: 'none' }} />
              <div className="logo-text" style={{ color: 'white' }}>REDOY <span style={{ color: 'var(--primary)' }}>GROUP</span></div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>
              Narayanganj's trusted partner for high-volume textile apparel and heavy industrial packaging solutions. Delivering quality since 1998.
            </p>
            <div style={{ display: 'flex', gap: '16px', color: '#64748b' }}>
              <Clock size={16} /> <span style={{ fontSize: '0.8rem' }}>Factory Hours: Sat - Thu (8:00 AM - 5:00 PM)</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>B2B Verticals</h4>
            <ul className="footer-links">
              <li><a href="#garments" className="footer-link">Apparel & Garments</a></li>
              <li><a href="#polythene" className="footer-link">Polythene Packaging</a></li>
              <li><a href="#box" className="footer-link">Corrugated Cartons</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Compliance</h4>
            <ul className="footer-links">
              <li><a href="#heritage" className="footer-link">BSCI Standards</a></li>
              <li><a href="#heritage" className="footer-link">Accord Structural Safety</a></li>
              <li><a href="#heritage" className="footer-link">Eco Polymers</a></li>
              <li><a href="#heritage" className="footer-link">OEKO-TEX Certified</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Headquarters</h4>
            <ul className="footer-links" style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>Fatullah Industrial Area,<br />Narayanganj, Dhaka,<br />Bangladesh</span>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--primary)' }} />
                <span>info@redoygroup.com</span>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'var(--primary)' }} />
                <span>+880-2-764XXXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Redoy Group. All rights reserved. Registered Factory in Narayanganj.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#home" className="footer-link">Privacy Policy</a>
            <a href="#home" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
