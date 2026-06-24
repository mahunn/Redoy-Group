"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
import FloatingElement from '@/components/FloatingElement';
import extruderBanner from '@/assets/extruder-banner.jpg';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  src: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
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
    src: "/assets/polythene-factory.png",
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
    src: "/assets/isolated/cardboardbox.png",
    description: "Finished high-strength export carton boxes, ready for clothing and industrial freight logistics."
  },
  {
    id: 11,
    title: "Flexo Folder Gluer Slotter",
    category: "cartons",
    src: "/assets/cardboard-factory.png",
    description: "High-speed flexographic printer scoring, slotting, and gluing paper sheets into boxes."
  },
  {
    id: 12,
    title: "Co-extruded Film Packaging Rolls",
    category: "polythene",
    src: "/assets/polythene-packaging/c275686f-fd96-4977-b272-9444cfbd6490.jpg",
    description: "High-clarity polymer film rolls wound on heavy cores, ready for industrial automatic wrapping machines."
  }
];

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  quantity?: string;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'garments' | 'polythene' | 'box'>('garments');
  const [rfqSubmitStatus, setRfqSubmitStatus] = useState<null | 'sending' | 'success'>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    quantity: '',
    productType: 'Polo Shirt',
    specs: ''
  });

  // Theme states
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Gallery states
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Mounted effect to prevent SSR issues
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  // Theme effect
  useEffect(() => {
    if (!mounted) return;
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Gallery filtering
  const filteredGallery = galleryFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === galleryFilter);

  // Lightbox navigation
  const openLightbox = (id: number) => {
    const idx = GALLERY_ITEMS.findIndex(item => item.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const slideNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev === null ? 0 : prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
  };

  const slidePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev === null ? 0 : prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  const getParsedQuantity = () => {
    const matches = formData.quantity.match(/[\d,]+/);
    if (!matches) return 0;
    return parseInt(matches[0].replace(/,/g, ''), 10) || 0;
  };

  const calculateLeadTime = () => {
    const quantity = getParsedQuantity();
    if (quantity <= 0) return null;

    let dailyOutput = 80000;
    let setupDays = 3;

    if (activeTab === 'garments') {
      dailyOutput = 80000;
      setupDays = 3;
    } else if (activeTab === 'polythene') {
      dailyOutput = 35; // Tons
      setupDays = 2;
    } else if (activeTab === 'box') {
      dailyOutput = 50000;
      setupDays = 2;
    }

    const rawProductionDays = Math.ceil(quantity / dailyOutput);
    const totalDays = setupDays + rawProductionDays;
    
    let rawMaterialLabel = "Fabric Weight";
    let rawMaterialAmount = "";
    if (activeTab === 'garments') {
      rawMaterialAmount = `${((quantity * 0.25) / 1000).toLocaleString(undefined, {maximumFractionDigits: 1})} Tons Combed Yarn`;
    } else if (activeTab === 'polythene') {
      rawMaterialLabel = "Polymer Resin Feed";
      rawMaterialAmount = `${(quantity * 1.05).toLocaleString(undefined, {maximumFractionDigits: 1})} Tons raw LLDPE`;
    } else if (activeTab === 'box') {
      rawMaterialLabel = "Paperboard Fluting Feed";
      rawMaterialAmount = `${((quantity * 0.4) / 1000).toLocaleString(undefined, {maximumFractionDigits: 1})} Tons Kraft Paper`;
    }

    const baseDate = new Date();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: FormErrors = {};
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

  const handleSubmit = (e: React.FormEvent) => {
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
    <div className="relative min-h-screen overflow-x-hidden w-full bg-bg-primary text-text-main transition-colors duration-300">
      {/* Background grids */}
      <div className="mesh-bg"></div>

      {/* Navigation Header */}
      <header className={`fixed left-[5%] right-[5%] h-20 bg-white/75 dark:bg-bg-primary/70 backdrop-blur-md border border-border-color/80 rounded-xl z-50 flex items-center justify-between px-6 md:px-10 shadow-sm transition-all duration-300 ${scrolled ? 'h-[70px] top-[10px] bg-white/85 dark:bg-bg-primary/85 shadow-md' : 'top-5'}`} id="site-header">
        <a href="#home" className="flex items-center gap-3 no-underline text-text-heading font-display text-lg md:text-xl font-extrabold uppercase tracking-tight" id="nav-logo" onClick={() => setMobileMenuOpen(false)}>
          <img src="/assets/logo/logo.jpg" alt="Redoy Group Logo" className="h-10 md:h-12 w-10 md:w-12 object-cover rounded-md border border-border-color" />
          <div>REDOY <span className="text-primary">GROUP</span></div>
        </a>
        
        <nav className="hidden lg:block">
          <ul className="flex gap-7 list-none">
            <li><a href="#home" className="text-text-muted hover:text-text-heading font-semibold text-sm transition-colors duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full" id="nav-link-home">Home</a></li>
            <li><a href="#garments" className="text-text-muted hover:text-text-heading font-semibold text-sm transition-colors duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full" id="nav-link-garments">Garments</a></li>
            <li><a href="#polythene" className="text-text-muted hover:text-text-heading font-semibold text-sm transition-colors duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full" id="nav-link-polythene">Polythene Packaging</a></li>
            <li><a href="#box" className="text-text-muted hover:text-text-heading font-semibold text-sm transition-colors duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full" id="nav-link-box">Box Packaging</a></li>
            <li><a href="#heritage" className="text-text-muted hover:text-text-heading font-semibold text-sm transition-colors duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full" id="nav-link-heritage">Compliance</a></li>
            <li><a href="#gallery" className="text-text-muted hover:text-text-heading font-semibold text-sm transition-colors duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full" id="nav-link-gallery">Factory Tour</a></li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button
            id="theme-toggle-btn"
            className="theme-toggle-btn w-[38px] h-[38px] rounded-full border border-border-color flex items-center justify-center cursor-pointer text-text-heading hover:bg-bg-secondary transition-colors duration-200"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme color"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <a href="#rfq" className="hidden sm:inline-block bg-primary hover:bg-primary-dark text-white font-semibold text-xs py-2.5 px-5 rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-[1px]" id="nav-btn-rfq">Request Quote</a>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="lg:hidden p-2 text-text-heading hover:bg-bg-secondary rounded-md transition-colors" 
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Drawer (Moved outside of header to prevent positioning bugs) */}
      <div className={`fixed inset-0 bg-bg-primary z-[90] flex flex-col justify-center px-10 transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`} id="mobile-nav-drawer">
        <ul className="flex flex-col gap-6 list-none text-center">
          <li><a href="#home" className="text-xl font-bold text-text-heading py-2 block" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
          <li><a href="#garments" className="text-xl font-bold text-text-heading py-2 block" onClick={() => setMobileMenuOpen(false)}>Garments</a></li>
          <li><a href="#polythene" className="text-xl font-bold text-text-heading py-2 block" onClick={() => setMobileMenuOpen(false)}>Polythene Packaging</a></li>
          <li><a href="#box" className="text-xl font-bold text-text-heading py-2 block" onClick={() => setMobileMenuOpen(false)}>Box Packaging</a></li>
          <li><a href="#heritage" className="text-xl font-bold text-text-heading py-2 block" onClick={() => setMobileMenuOpen(false)}>Compliance & Heritage</a></li>
          <li><a href="#gallery" className="text-xl font-bold text-text-heading py-2 block" onClick={() => setMobileMenuOpen(false)}>Factory Tour</a></li>
          <li className="mt-8 flex flex-col gap-4">
            <button
              id="mobile-theme-toggle-btn"
              className="border border-border-color hover:bg-bg-secondary text-text-heading font-semibold py-3 px-6 rounded-md transition-all flex items-center justify-center gap-2"
              onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light');
                setMobileMenuOpen(false);
              }}
            >
              {theme === 'light' ? (
                <>
                  <Moon size={16} /> Dark Theme
                </>
              ) : (
                <>
                  <Sun size={16} /> Light Theme
                </>
              )}
            </button>
            <a href="#rfq" className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md transition-all text-center" onClick={() => setMobileMenuOpen(false)}>
              Request Quote
            </a>
          </li>
        </ul>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen pt-40 pb-20 border-b border-border-color overflow-hidden flex flex-col justify-center">
        <Image
          src={extruderBanner}
          alt="Factory machinery floor background"
          fill
          priority
          placeholder="blur"
          className="object-cover -z-10"
        />
        {/* Dynamic theme gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/96 via-bg-primary/78 to-bg-primary/20 max-md:bg-gradient-to-b max-md:from-bg-primary/95 max-md:via-bg-primary/80 max-md:to-bg-primary/45 -z-10" />

        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary-light dark:bg-primary-light/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">Narayanganj, Bangladesh</span>
              <h1 className="text-4xl md:text-5xl font-extrabold font-display leading-tight tracking-tight text-text-heading mb-6 drop-shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
                Industrial Manufacturing Powerhouse
              </h1>
              <p className="text-lg text-text-muted mb-8 leading-relaxed">
                Partnering with global retail and logistics brands. Redoy Group delivers high-capacity manufacturing excellence in ready-made garments, extruded industrial polythene, and corrugated carton box packaging.
              </p>
              <div className="flex gap-4 max-sm:flex-col max-sm:w-full">
                <a href="#garments" className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-[1px] transition-all duration-200 flex items-center justify-center gap-2 max-sm:w-full">
                  Explore Verticals <ChevronRight size={16} />
                </a>
                <a href="#rfq" className="border border-border-color/85 text-text-heading font-semibold py-3 px-6 rounded-md hover:bg-bg-secondary hover:-translate-y-[1px] transition-all duration-200 flex items-center justify-center gap-2 max-sm:w-full">
                  Send B2B RFQ
                </a>
              </div>
            </div>
            
            <div className="bg-white/45 dark:bg-slate-800/45 backdrop-blur-md border border-white/35 dark:border-white/5 rounded-2xl p-8 shadow-sm max-w-[480px] lg:ml-auto hover:-translate-y-1 hover:shadow-md hover:border-white/50 transition-all duration-500 max-lg:mx-auto max-lg:w-full">
              <h3 className="text-lg font-bold font-display mb-5 flex items-center gap-2 text-text-heading">
                <Shield size={20} className="text-primary" />
                B2B Partner Standards
              </h3>
              <ul className="list-none flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="block text-sm text-text-heading">100% Export Oriented</strong>
                    <span className="text-xs text-text-muted">Supplying garments and packaging to global retail and logistics brands.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="block text-sm text-text-heading">Audited Compliance</strong>
                    <span className="text-xs text-text-muted">Regularly audited facilities following BSCI, ACCORD, and OEKO-TEX safety systems.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="block text-sm text-text-heading">High-Volume Output</strong>
                    <span className="text-xs text-text-muted">Equipped with automated sewing lines and high-capacity blown film towers.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Stats Counter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-bg-primary border border-border-color rounded-lg p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-500 flex flex-col relative" id="stat-card-garments">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-primary bg-primary-light dark:bg-primary-light/10">
                <ShoppingBag size={24} />
              </div>
              <div className="font-display text-4xl font-extrabold leading-none mb-2 text-primary">80,000+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">Daily Garment Output</div>
            </div>
            <div className="bg-bg-primary border border-border-color rounded-lg p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-500 flex flex-col relative" id="stat-card-polythene">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-secondary bg-secondary-light dark:bg-secondary-light/10">
                <Activity size={24} />
              </div>
              <div className="font-display text-4xl font-extrabold leading-none mb-2 text-secondary">35+ Tons</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">Daily Polythene Capacity</div>
            </div>
            <div className="bg-bg-primary border border-border-color rounded-lg p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-500 flex flex-col relative" id="stat-card-cartons">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-accent bg-accent-light dark:bg-accent-light/10">
                <Box size={24} />
              </div>
              <div className="font-display text-4xl font-extrabold leading-none mb-2 text-accent">50,000+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">Daily Carton Packaging Units</div>
            </div>
          </div>

          {/* Animated Scroll Down Indicator */}
          <div className="flex justify-center mt-[60px]">
            <a href="#garments" aria-label="Scroll down to B2B verticals" className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center p-1.5 cursor-pointer">
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full mouse-wheel-dot-anim"></span>
            </a>
          </div>
        </div>
      </section>

      {/* Garments Section (Flagship Manufacturing) */}
      <section id="garments" className="relative py-20 border-b border-border-color overflow-hidden bg-bg-primary">
        {/* Antigravity floating shirt element */}
        <FloatingElement 
          src="/assets/isolated/shirt.png" 
          speed={-0.12} 
          top="15%" 
          right="8%" 
          width="240px" 
          className="micro-drift-up max-lg:hidden" 
        />

        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center mb-16">
            <span className="font-display text-sm font-bold tracking-widest text-primary uppercase after:block after:w-10 after:h-0.5 after:bg-primary after:mx-auto after:mt-2">FLAGSHIP VERTICAL</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display leading-tight tracking-tight text-text-heading mt-3">Ready-Made Garments</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-bg-primary border border-border-color rounded-lg p-8 shadow-sm">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 bg-primary-light dark:bg-primary-light/10 text-primary">
                <Layers size={14} /> Knitting & Stitching Unit
              </span>
              <p className="mb-6 leading-relaxed">
                Redoy Group's apparel wing manufactures high-quality casual wear, active wear, and knit products for top-tier international brands. Operating out of Narayanganj, our sewing floor features computer-aided design and automatic fabric spreading machinery.
              </p>
              
              <table className="w-full border-collapse mt-6 text-sm">
                <tbody>
                  <tr>
                    <td className="py-3 border-b border-border-color font-semibold text-text-heading w-[40%]">Monthly Production</td>
                    <td className="py-3 border-b border-border-color">2,400,000 Pcs</td>
                  </tr>
                  <tr>
                    <td className="py-3 border-b border-border-color font-semibold text-text-heading">Key Products</td>
                    <td className="py-3 border-b border-border-color">T-Shirts, Polo Shirts, Active wear, Hoodies</td>
                  </tr>
                  <tr>
                    <td className="py-3 border-b border-border-color font-semibold text-text-heading">Worker Force</td>
                    <td className="py-3 border-b border-border-color">1,200+ Trained Operators</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-text-heading">Machinery</td>
                    <td className="py-3">Pegasus, Juki, Brother sewing units</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-8">
                <a href="#rfq" onClick={() => setActiveTab('garments')} className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-[1px] transition-all duration-200 inline-flex items-center gap-2 text-xs">
                  Inquire For Apparel <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="h-[280px] rounded-lg overflow-hidden border border-border-color shadow-sm relative">
                <img 
                  src="/assets/Screenshot 2026-06-24 222518.png" 
                  alt="Garments sewing line" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-[140px] rounded-lg overflow-hidden border border-border-color relative">
                  <img src="/assets/Screenshot 2026-06-24 222215.png" alt="Garments QC" className="w-full h-full object-cover" />
                </div>
                <div className="h-[140px] rounded-lg overflow-hidden border border-border-color relative">
                  <img src="/assets/Screenshot 2026-06-24 222329.png" alt="Apparel iron floor" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Polythene Packaging Section */}
      <section id="polythene" className="relative py-20 border-b border-border-color overflow-hidden bg-bg-secondary">
        {/* Antigravity floating polyroll element */}
        <FloatingElement 
          src="/assets/isolated/polyroll.png" 
          speed={0.08} 
          top="20%" 
          left="6%" 
          width="260px" 
          className="micro-drift-down max-lg:hidden" 
        />

        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center mb-16">
            <span className="font-display text-sm font-bold tracking-widest text-secondary uppercase after:block after:w-10 after:h-0.5 after:bg-secondary after:mx-auto after:mt-2">PACKAGING SOLUTIONS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display leading-tight tracking-tight text-text-heading mt-3">Polythene Packaging</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="grid grid-cols-1 gap-6 max-lg:order-2">
              <div className="h-[300px] rounded-lg overflow-hidden border border-border-color shadow-sm relative">
                <img 
                  src="/assets/polythene-factory.png" 
                  alt="Polythene Extruder Machine Floor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                <div className="w-[90px] h-[90px] rounded-md overflow-hidden border border-border-color shadow-sm relative">
                  <img src="/assets/polythene-packaging/ea032d1b-69ef-46b8-acc0-4f4ed3fe6ebc.jpg" alt="Poly rolls" className="w-full h-full object-cover" />
                </div>
                <div className="w-[90px] h-[90px] rounded-md overflow-hidden border border-border-color shadow-sm relative">
                  <img src="/assets/polythene-packaging/49807084-d662-4e2e-b4e8-ea63f9b2484c.jpg" alt="Printed polybags" className="w-full h-full object-cover" />
                </div>
                <div className="w-[90px] h-[90px] rounded-md overflow-hidden border border-border-color shadow-sm relative">
                  <img src="/assets/polythene-packaging/673d26ed-dc4a-4635-b5cb-18cd4dd468f6.jpg" alt="LDPE eco sheet" className="w-full h-full object-cover" />
                </div>
                <div className="w-[90px] h-[90px] rounded-md overflow-hidden border border-border-color shadow-sm relative">
                  <img src="/assets/polythene-packaging/c275686f-fd96-4977-b272-9444cfbd6490.jpg" alt="Poly rolls 2" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="bg-bg-primary border border-border-color rounded-lg p-8 shadow-sm border-t-4 border-t-secondary max-lg:order-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 bg-secondary-light dark:bg-secondary-light/10 text-secondary">
                <Activity size={14} /> LDPE & LLDPE Manufacturing
              </span>
              <p className="mb-6 leading-relaxed">
                We engineer premium, heavy-duty industrial polythene sheets, wrapping films, and retail plastic carrier bags. Our state-of-the-art Narayanganj plant utilizes multi-layer blown film extruders to guarantee robust tear strength and exceptional thickness control.
              </p>
              
              <table className="w-full border-collapse mt-6 text-sm">
                <tbody>
                  <tr>
                    <td className="py-3 border-b border-border-color font-semibold text-text-heading w-[40%]">Monthly Production</td>
                    <td className="py-3 border-b border-border-color">1,000+ Metric Tons</td>
                  </tr>
                  <tr>
                    <td className="py-3 border-b border-border-color font-semibold text-text-heading">Products Offered</td>
                    <td className="py-3 border-b border-border-color">Stretch Film, Shrink Wraps, Heavy Duty Bags, Printed Polybags</td>
                  </tr>
                  <tr>
                    <td className="py-3 border-b border-border-color font-semibold text-text-heading">Material Grades</td>
                    <td className="py-3 border-b border-border-color">LDPE, LLDPE, HDPE (Virgin & Recycled Eco-blend)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-text-heading">Quality Specs</td>
                    <td className="py-3">Thicknesses from 10 to 150 microns; high puncture resistance</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-8">
                <a href="#rfq" onClick={() => setActiveTab('polythene')} className="bg-secondary hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-md shadow-md shadow-secondary/15 hover:shadow-lg hover:shadow-secondary/25 hover:-translate-y-[1px] transition-all duration-200 inline-flex items-center gap-2 text-xs">
                  Inquire For Polythene <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corrugated Box & Carton Packaging Section */}
      <section id="box" className="relative py-20 border-b border-border-color overflow-hidden bg-bg-primary">
        {/* Antigravity floating cardboardbox element */}
        <FloatingElement 
          src="/assets/isolated/cardboardbox.png" 
          speed={-0.1} 
          top="15%" 
          right="8%" 
          width="240px" 
          className="micro-drift-up max-lg:hidden" 
        />

        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center mb-16">
            <span className="font-display text-sm font-bold tracking-widest text-accent uppercase after:block after:w-10 after:h-0.5 after:bg-accent after:mx-auto after:mt-2">HEAVY PACKAGING</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display leading-tight tracking-tight text-text-heading mt-3">Corrugated Box & Carton Packaging</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-bg-primary border border-border-color rounded-lg p-8 shadow-sm border-t-4 border-t-accent">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 bg-accent-light dark:bg-accent-light/10 text-accent">
                <Box size={14} /> Carton Manufacturing Division
              </span>
              <p className="mb-6 leading-relaxed">
                Specializing in robust, heavy-duty corrugated board and customized paper carton packaging solutions. Designed to meet international freight and logistics standards, our cartons provide high compression strength and structural durability.
              </p>
              
              <table className="w-full border-collapse mt-6 text-sm">
                <tbody>
                  <tr>
                    <td className="py-3 border-b border-border-color font-semibold text-text-heading w-[40%]">Monthly Production</td>
                    <td className="py-3 border-b border-border-color">1,500,000 Units</td>
                  </tr>
                  <tr>
                    <td className="py-3 border-b border-border-color font-semibold text-text-heading">Corrugation Types</td>
                    <td className="py-3 border-b border-border-color">3-Ply, 5-Ply, 7-Ply Heavy Duty Carton Boxes</td>
                  </tr>
                  <tr>
                    <td className="py-3 border-b border-border-color font-semibold text-text-heading">Customizations</td>
                    <td className="py-3 border-b border-border-color">Flexographic Multi-Color Logo Printing, Custom Die-Cuts</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-text-heading">Applications</td>
                    <td className="py-3">RMG Export Cartons, Food Packaging, General Logistics Shipping</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-8">
                <a href="#rfq" onClick={() => setActiveTab('box')} className="bg-accent hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-md shadow-md shadow-accent/15 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-[1px] transition-all duration-200 inline-flex items-center gap-2 text-xs">
                  Inquire For Carton Packaging <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="h-[300px] rounded-lg overflow-hidden border border-border-color shadow-sm relative">
                <img 
                  src="/assets/cardboard-factory.png" 
                  alt="Automatic Carton Board machine floor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4 justify-center">
                <div className="w-[120px] h-[120px] rounded-md overflow-hidden border border-border-color shadow-sm relative">
                  <img src="/assets/cardboard-packaging/02c33d02-b80b-4521-b4ec-302729b5aaf6.jpg" alt="Carton Corrugator Line" className="w-full h-full object-cover" />
                </div>
                <div className="w-[120px] h-[120px] rounded-md overflow-hidden border border-border-color shadow-sm relative bg-bg-secondary p-2">
                  <img src="/assets/isolated/cardboardbox.png" alt="Finished Carton Box" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage & Compliance Section */}
      <section id="heritage" className="relative py-20 border-b border-border-color overflow-hidden bg-bg-secondary">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center mb-16">
            <span className="font-display text-sm font-bold tracking-widest text-primary uppercase after:block after:w-10 after:h-0.5 after:bg-primary after:mx-auto after:mt-2">TRUST & SUSTAINABILITY</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display leading-tight tracking-tight text-text-heading mt-3">Our Heritage & B2B Compliance</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold font-display text-text-heading mb-5">
                Commitment to Narayanganj's Industrial Future
              </h3>
              <p className="mb-6 leading-relaxed">
                Narayanganj has historically been the economic powerhouse and "Dundee of Bangladesh." Redoy Group is proud to continue this legacy, combining standard manufacturing capacities with modern green compliance standards. All our manufacturing factories are regularly audited by internationally recognized bodies to ensure structural safety, fair wages, and environmental responsibility.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-bg-primary border border-border-color rounded-lg p-6 shadow-sm">
                  <Shield size={28} className="text-primary mb-3" />
                  <h4 className="text-base font-bold text-text-heading mb-1.5">100% Compliant</h4>
                  <p className="text-xs text-text-muted leading-relaxed">Regular BSCI, OEKO-TEX, and ACCORD audited facilities.</p>
                </div>
                <div className="bg-bg-primary border border-border-color rounded-lg p-6 shadow-sm">
                  <Activity size={28} className="text-secondary mb-3" />
                  <h4 className="text-base font-bold text-text-heading mb-1.5">Eco-friendly Blends</h4>
                  <p className="text-xs text-text-muted leading-relaxed">Using recyclable polythene polymers & FSC certified paperboards.</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-xl font-bold font-display text-text-heading mb-6">
                Manufacturing Milestones
              </h3>
              
              <div className="relative pl-8 border-l-2 border-border-color ml-4">
                <div className="relative mb-8">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-bg-primary border-3 border-primary"></div>
                  <div className="bg-bg-primary border border-border-color rounded-lg p-6 border-l-3 border-l-primary shadow-sm">
                    <div className="font-display text-lg font-extrabold text-primary mb-1">1998</div>
                    <div className="text-sm font-bold text-text-heading mb-1.5">Apparel Factory Launch</div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Established our garments wing in Fatullah, Narayanganj with 100 sewing lines.
                    </p>
                  </div>
                </div>
                
                <div className="relative mb-8">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-bg-primary border-3 border-secondary"></div>
                  <div className="bg-bg-primary border border-border-color rounded-lg p-6 border-l-3 border-l-secondary shadow-sm">
                    <div className="font-display text-lg font-extrabold text-secondary mb-1">2009</div>
                    <div className="text-sm font-bold text-text-heading mb-1.5">Packaging Expansion</div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Inaugurated LDPE polythene extrusion facilities supplying regional logistics hubs.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-bg-primary border-3 border-accent"></div>
                  <div className="bg-bg-primary border border-border-color rounded-lg p-6 border-l-3 border-l-accent shadow-sm">
                    <div className="font-display text-lg font-extrabold text-accent mb-1">2018</div>
                    <div className="text-sm font-bold text-text-heading mb-1.5">Carton Plant Automation</div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Installed automatic high-speed corrugated paperboard corrugators and flexo printer slotters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Tour Gallery */}
      <section id="gallery" className="relative py-20 border-b border-border-color overflow-hidden bg-bg-primary">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center mb-16">
            <span className="font-display text-sm font-bold tracking-widest text-primary uppercase after:block after:w-10 after:h-0.5 after:bg-primary after:mx-auto after:mt-2">VISUAL OVERVIEW</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display leading-tight tracking-tight text-text-heading mt-3">Interactive Factory Tour</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 justify-center mb-12 flex-wrap">
            <button 
              className={`px-5 py-2 rounded-md font-semibold text-xs transition-all duration-200 border border-border-color cursor-pointer ${galleryFilter === 'all' ? 'bg-primary text-white shadow-md shadow-primary/15' : 'bg-bg-secondary text-text-muted hover:text-text-heading hover:bg-bg-tertiary'}`}
              onClick={() => setGalleryFilter('all')}
            >
              All Operations
            </button>
            <button 
              className={`px-5 py-2 rounded-md font-semibold text-xs transition-all duration-200 border border-border-color cursor-pointer ${galleryFilter === 'garments' ? 'bg-primary text-white shadow-md shadow-primary/15' : 'bg-bg-secondary text-text-muted hover:text-text-heading hover:bg-bg-tertiary'}`}
              onClick={() => setGalleryFilter('garments')}
            >
              Garments Floor
            </button>
            <button 
              className={`px-5 py-2 rounded-md font-semibold text-xs transition-all duration-200 border border-border-color cursor-pointer ${galleryFilter === 'polythene' ? 'bg-primary text-white shadow-md shadow-primary/15' : 'bg-bg-secondary text-text-muted hover:text-text-heading hover:bg-bg-tertiary'}`}
              onClick={() => setGalleryFilter('polythene')}
            >
              Polythene Extrusion
            </button>
            <button 
              className={`px-5 py-2 rounded-md font-semibold text-xs transition-all duration-200 border border-border-color cursor-pointer ${galleryFilter === 'cartons' ? 'bg-primary text-white shadow-md shadow-primary/15' : 'bg-bg-secondary text-text-muted hover:text-text-heading hover:bg-bg-tertiary'}`}
              onClick={() => setGalleryFilter('cartons')}
            >
              Carton Packaging
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                className="group bg-bg-primary border border-border-color rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => openLightbox(item.id)}
              >
                <div className="relative h-[220px] overflow-hidden w-full">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="text-white" size={32} />
                  </div>
                </div>
                <div className="p-5 flex-grow">
                  <h4 className="text-base font-bold text-text-heading mb-2">{item.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-md" onClick={closeLightbox}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={closeLightbox}>
            <X size={36} />
          </button>
          
          <button className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer" onClick={slidePrev}>
            <ChevronLeft size={28} />
          </button>
          
          <button className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer" onClick={slideNext}>
            <ChevronRight size={28} />
          </button>

          <div className="max-w-[900px] w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="max-h-[70vh] max-w-full overflow-hidden rounded-lg border border-white/10 bg-black/50 relative flex items-center justify-center">
              <img 
                src={GALLERY_ITEMS[lightboxIndex].src} 
                alt={GALLERY_ITEMS[lightboxIndex].title} 
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>
            <div className="text-center mt-5 text-white max-w-[600px] px-4">
              <h4 className="text-lg font-bold mb-2">{GALLERY_ITEMS[lightboxIndex].title}</h4>
              <p className="text-xs text-white/70 leading-relaxed">{GALLERY_ITEMS[lightboxIndex].description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Lead-Time Estimator & RFQ Form */}
      <section id="rfq" className="relative py-20 bg-bg-secondary border-b border-border-color overflow-hidden">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center mb-16">
            <span className="font-display text-sm font-bold tracking-widest text-primary uppercase after:block after:w-10 after:h-0.5 after:bg-primary after:mx-auto after:mt-2">B2B INQUIRY</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display leading-tight tracking-tight text-text-heading mt-3">Interactive RFQ & Logistics Estimator</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* RFQ Form */}
            <div className="lg:col-span-7 bg-bg-primary border border-border-color rounded-2xl p-8 shadow-sm">
              <div className="flex border-b border-border-color mb-8 justify-center gap-4">
                <button 
                  className={`pb-3 px-4 font-display font-bold text-sm cursor-pointer relative transition-all duration-200 ${activeTab === 'garments' ? 'text-primary after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-primary' : 'text-text-muted hover:text-text-heading'}`}
                  onClick={() => setActiveTab('garments')}
                >
                  Garments Unit
                </button>
                <button 
                  className={`pb-3 px-4 font-display font-bold text-sm cursor-pointer relative transition-all duration-200 ${activeTab === 'polythene' ? 'text-secondary after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-secondary' : 'text-text-muted hover:text-text-heading'}`}
                  onClick={() => setActiveTab('polythene')}
                >
                  Polythene Plant
                </button>
                <button 
                  className={`pb-3 px-4 font-display font-bold text-sm cursor-pointer relative transition-all duration-200 ${activeTab === 'box' ? 'text-accent after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-accent' : 'text-text-muted hover:text-text-heading'}`}
                  onClick={() => setActiveTab('box')}
                >
                  Carton Plant
                </button>
              </div>

              {rfqSubmitStatus === 'success' ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl p-8 text-center">
                  <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-text-heading mb-2">Inquiry Submitted Successfully</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Thank you for contacting Redoy Group. Our B2B commercial department in Narayanganj will evaluate your specifications and email you a detailed FOB price proposal within 24 working hours.
                  </p>
                  <button onClick={() => setRfqSubmitStatus(null)} className="mt-6 bg-primary hover:bg-primary-dark text-white text-xs font-semibold py-2.5 px-5 rounded-md cursor-pointer transition-colors duration-200">
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="rfq-input-name" className="text-xs font-semibold text-text-heading">Full Name</label>
                      <input 
                        type="text" 
                        id="rfq-input-name"
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-bg-secondary text-text-main focus:outline-none focus:border-primary focus:bg-bg-primary focus:ring-3 focus:ring-primary/10 transition-all duration-200 ${formErrors.name ? 'border-red-500' : 'border-border-color'}`} 
                        placeholder="Your full name" 
                        required 
                      />
                      {formErrors.name && <span className="text-red-500 text-xs">{formErrors.name}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="rfq-input-email" className="text-xs font-semibold text-text-heading">B2B Business Email</label>
                      <input 
                        type="email" 
                        id="rfq-input-email"
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-bg-secondary text-text-main focus:outline-none focus:border-primary focus:bg-bg-primary focus:ring-3 focus:ring-primary/10 transition-all duration-200 ${formErrors.email ? 'border-red-500' : 'border-border-color'}`} 
                        placeholder="name@company.com" 
                        required 
                      />
                      {formErrors.email && <span className="text-red-500 text-xs">{formErrors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="rfq-input-company" className="text-xs font-semibold text-text-heading">Company Name</label>
                      <input 
                        type="text" 
                        id="rfq-input-company"
                        name="company" 
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-bg-secondary text-text-main focus:outline-none focus:border-primary focus:bg-bg-primary focus:ring-3 focus:ring-primary/10 transition-all duration-200 ${formErrors.company ? 'border-red-500' : 'border-border-color'}`} 
                        placeholder="e.g. Retail Brand Ltd" 
                        required 
                      />
                      {formErrors.company && <span className="text-red-500 text-xs">{formErrors.company}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="rfq-input-quantity">
                        {activeTab === 'polythene' ? 'Quantity Needed (Metric Tons)' : 'Quantity Needed (Pieces/Units)'}
                      </label>
                      <input 
                        type="text" 
                        id="rfq-input-quantity"
                        name="quantity" 
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border text-sm bg-bg-secondary text-text-main focus:outline-none focus:border-primary focus:bg-bg-primary focus:ring-3 focus:ring-primary/10 transition-all duration-200 ${formErrors.quantity ? 'border-red-500' : 'border-border-color'}`} 
                        placeholder={activeTab === 'polythene' ? 'e.g. 5' : 'e.g. 20,000'} 
                        required 
                      />
                      {formErrors.quantity && <span className="text-red-500 text-xs">{formErrors.quantity}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="rfq-input-productType" className="text-xs font-semibold text-text-heading">Product Type / Grade</label>
                    <select 
                      id="rfq-input-productType"
                      name="productType" 
                      value={formData.productType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border-color text-sm bg-bg-secondary text-text-main focus:outline-none focus:border-primary focus:bg-bg-primary focus:ring-3 focus:ring-primary/10 transition-all duration-200"
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

                  <div className="flex flex-col gap-2">
                    <label htmlFor="rfq-input-specs" className="text-xs font-semibold text-text-heading">Additional Specifications (Dimensions, printing, ply weight, etc.)</label>
                    <textarea 
                      id="rfq-input-specs"
                      name="specs" 
                      value={formData.specs}
                      onChange={handleInputChange}
                      rows={4} 
                      className="w-full px-4 py-3 rounded-lg border border-border-color text-sm bg-bg-secondary text-text-main focus:outline-none focus:border-primary focus:bg-bg-primary focus:ring-3 focus:ring-primary/10 transition-all duration-200" 
                      placeholder="Enter custom dimensions, thickness in microns, ply strength or specific design requests..."
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    <button 
                      type="submit" 
                      id="rfq-submit-btn"
                      className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-[1px] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
                      disabled={rfqSubmitStatus === 'sending'}
                      style={{ 
                        background: activeTab === 'polythene' ? 'var(--secondary)' : activeTab === 'box' ? 'var(--accent)' : 'var(--primary)' 
                      }}
                    >
                      {rfqSubmitStatus === 'sending' ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          Processing Inquiry...
                        </span>
                      ) : 'Submit Request for Quotation'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Estimator Panel */}
            <div className="lg:col-span-5 bg-bg-tertiary border border-border-color rounded-2xl p-8 lg:sticky lg:top-32 text-left">
              <h3 className="text-lg font-bold font-display text-text-heading mb-4 flex items-center gap-2 border-b border-border-color pb-3">
                <Truck className="text-primary" size={20} />
                FOB Chittagong Schedule
              </h3>
              
              {!estimation ? (
                <div className="py-12 text-center text-text-muted flex flex-col items-center gap-2">
                  <AlertCircle size={32} className="opacity-40" />
                  <p className="text-xs">Enter a valid quantity on the form to calculate your production timeline and raw material load schedules.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs text-text-muted uppercase tracking-wider font-semibold block mb-1">Estimated Production Time</span>
                    <div className="text-3xl font-extrabold text-primary font-display flex items-baseline gap-1">
                      {estimation.totalDays} <span className="text-sm font-semibold text-text-heading">Working Days</span>
                    </div>
                    <div className="text-xs text-text-muted mt-1.5 flex gap-4">
                      <span>Setup: {estimation.setupDays} days</span>
                      <span>Run: {estimation.productionDays} days</span>
                    </div>
                  </div>

                  <div className="border-t border-border-color pt-4">
                    <span className="text-xs text-text-muted uppercase tracking-wider font-semibold block mb-1">{estimation.rawMaterialLabel}</span>
                    <div className="text-lg font-bold text-text-heading">{estimation.rawMaterialAmount}</div>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">Estimated basic feed requirement to secure yarn/resin supply chain lines in Narayanganj.</p>
                  </div>

                  <div className="border-t border-border-color pt-4">
                    <span className="text-xs text-text-muted uppercase tracking-wider font-semibold block mb-1">Target Cargo Loading Date</span>
                    <div className="text-lg font-bold text-text-heading flex items-center gap-1.5">
                      <Calendar size={18} className="text-primary" />
                      {estimation.shippingDateString}
                    </div>
                    <p className="text-xs text-text-muted mt-1.5 leading-relaxed">Assumes FOB shipping port standards, transit to Chittagong Port, customs clearing ready.</p>
                  </div>

                  <div className="border-t border-border-color pt-4">
                    <div className="flex justify-between text-xs font-semibold text-text-heading mb-1.5">
                      <span>Monthly Plant Capacity Share</span>
                      <span>{estimation.capacityPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-border-color rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${estimation.capacityPercent}%`,
                          backgroundColor: activeTab === 'polythene' ? 'var(--secondary)' : activeTab === 'box' ? 'var(--accent)' : 'var(--primary)' 
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-bg-primary/50 border border-border-color/80 rounded-lg p-4 flex gap-3 items-start">
                    <Anchor className="text-primary flex-shrink-0 mt-0.5" size={16} />
                    <div>
                      <strong className="block text-xs text-text-heading font-semibold">Logistics Anchor Status</strong>
                      <span className="text-[11px] text-text-muted leading-relaxed">FOB Chittagong Port clearing is integrated. Customized CIF sea-freight options are negotiable.</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-border-color text-[11px] text-text-muted leading-relaxed flex items-start gap-2">
                <Shield size={14} className="flex-shrink-0 mt-0.5 text-primary" />
                <span>{getMoqInfo()}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="bg-bg-dark-accent text-slate-300 py-16 border-t border-white/5">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="logo-container text-white mb-5 flex items-center gap-3">
                <img src="/assets/logo/logo.jpg" alt="Logo" className="h-10 w-10 object-cover rounded-md border-0" />
                <div className="logo-text text-white font-display text-lg font-extrabold uppercase">REDOY <span className="text-primary">GROUP</span></div>
              </div>
              <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                Narayanganj's trusted partner for high-volume textile apparel and heavy industrial packaging solutions. Delivering quality since 1998.
              </p>
              <div className="flex gap-2 items-center text-slate-500 text-xs">
                <Clock size={16} /> <span>Factory Hours: Sat - Thu (8:00 AM - 5:00 PM)</span>
              </div>
            </div>

            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">B2B Verticals</h4>
              <ul className="list-none flex flex-col gap-3">
                <li><a href="#garments" className="text-sm text-slate-400 hover:text-white transition-colors duration-150">Apparel & Garments</a></li>
                <li><a href="#polythene" className="text-sm text-slate-400 hover:text-white transition-colors duration-150">Polythene Packaging</a></li>
                <li><a href="#box" className="text-sm text-slate-400 hover:text-white transition-colors duration-150">Corrugated Cartons</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Compliance</h4>
              <ul className="list-none flex flex-col gap-3">
                <li><a href="#heritage" className="text-sm text-slate-400 hover:text-white transition-colors duration-150">BSCI Standards</a></li>
                <li><a href="#heritage" className="text-sm text-slate-400 hover:text-white transition-colors duration-150">Accord Structural Safety</a></li>
                <li><a href="#heritage" className="text-sm text-slate-400 hover:text-white transition-colors duration-150">Eco Polymers</a></li>
                <li><a href="#heritage" className="text-sm text-slate-400 hover:text-white transition-colors duration-150">OEKO-TEX Certified</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Contact Headquarters</h4>
              <ul className="list-none flex flex-col gap-4 text-sm text-slate-400">
                <li className="flex gap-2 items-start">
                  <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>Fatullah Industrial Area,<br />Narayanganj, Dhaka,<br />Bangladesh</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Mail size={16} className="text-primary" />
                  <span>info@redoygroup.com</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Phone size={16} className="text-primary" />
                  <span>+880-2-764XXXX</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-xs text-slate-500 flex justify-between max-sm:flex-col gap-4">
            <div>© {new Date().getFullYear()} Redoy Group. All rights reserved. Registered Factory in Narayanganj.</div>
            <div className="flex gap-6">
              <a href="#home" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#home" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
