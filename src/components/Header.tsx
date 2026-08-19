import React, { useState, useEffect } from 'react';
import { Menu, X, Plus } from 'lucide-react';

// Custom Solid Government-Portal Style Icons
export const NavHomeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

export const NavServicesIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2L1 7l11 5 11-5-11-5zM1 12l11 5 11-5-2.02-.92L12 15.08 3.02 11.08 1 12zm0 5l11 5 11-5-2.02-.92L12 20.08 3.02 16.08 1 17z" />
  </svg>
);

export const NavProfileIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export const NavFeedbackIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h2v2H7V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9z" />
  </svg>
);

export const NavMailIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

export const NavLogoutIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
);

export const NavHelpIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
  </svg>
);

export const NavGlobeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
  </svg>
);

export interface HeaderProps {
  onHomeClick: () => void;
  onNewChat: () => void;
  onOpenModal: (modal: 'help' | 'contact' | 'logout') => void;
  onSelectQuerySuggestion: (query: string) => void;
  languageHindi: boolean;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onHomeClick,
  onNewChat,
  onOpenModal,
  onSelectQuerySuggestion,
  languageHindi,
  onToggleLanguage
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState<boolean>(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState<boolean>(false);
  const [mobileFeedbackOpen, setMobileFeedbackOpen] = useState<boolean>(false);

  // Dynamic state/region detection via IP API worker using user's real IP
  const [userState, setUserState] = useState<string>('Delhi');
  const [userIp, setUserIp] = useState<string>('');
  const [isStateLoading, setIsStateLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUserRealIpAndRegion = async () => {
      try {
        let realIp = '';

        // Step 1: Detect user's actual real IP
        try {
          const ipifyRes = await fetch('https://api.ipify.org?format=json');
          if (ipifyRes.ok) {
            const ipData = await ipifyRes.json();
            if (ipData?.ip) {
              realIp = ipData.ip;
            }
          }
        } catch {
          // If ipify fails, try alternative IP provider
          try {
            const altIpRes = await fetch('https://icanhazip.com');
            if (altIpRes.ok) {
              const textIp = (await altIpRes.text()).trim();
              if (textIp) realIp = textIp;
            }
          } catch {
            // Proceed to direct region fetch without explicit IP param
          }
        }

        // Step 2: Call the worker API with user's real IP if found, otherwise direct region
        const apiUrl = realIp
          ? `https://ipapi.blueorbitdevs.workers.dev/?ip=${encodeURIComponent(realIp)}&region`
          : 'https://ipapi.blueorbitdevs.workers.dev/?region';

        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          if (isMounted && data) {
            if (data.region) {
              setUserState(data.region);
            }
            if (data.ip) {
              setUserIp(data.ip);
            } else if (realIp) {
              setUserIp(realIp);
            }
          }
        } else {
          // Direct fallback to worker ?region
          const fallbackRes = await fetch('https://ipapi.blueorbitdevs.workers.dev/?region');
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            if (isMounted && fallbackData?.region) {
              setUserState(fallbackData.region);
              if (fallbackData.ip) setUserIp(fallbackData.ip);
            }
          }
        }
      } catch (err) {
        console.warn('Error fetching region for user real IP:', err);
      } finally {
        if (isMounted) setIsStateLoading(false);
      }
    };

    fetchUserRealIpAndRegion();

    return () => {
      isMounted = false;
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      {/* 1. TOP GOVERNMENT HEADER — SMOOTH TRICOLOR WITH REAL IMAGE ASSETS */}
      <header
        className="relative w-full h-auto min-h-[64px] sm:min-h-[76px] md:h-[102px] flex items-center border-b border-[#123F78] shadow-sm select-none overflow-hidden py-1 sm:py-1.5 md:py-0"
        style={{
          background:
            'linear-gradient(to bottom, #FF9933 0%, #FFA84D 10%, #FFFFFF 28%, #FFFFFF 72%, #5DB852 90%, #138808 100%)'
        }}
      >
        <div className="max-w-[1240px] mx-auto w-full px-2 sm:px-4 md:px-6 flex items-center justify-between h-full gap-1.5 xs:gap-2 sm:gap-4">
          {/* LEFT: Ashoka Stambh Emblem & Government of India */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            <img
              src="/assets/images/ashoka-stambh.png"
              alt="State Emblem of India"
              className="h-[44px] xs:h-[48px] sm:h-[64px] md:h-[92px] w-auto object-contain drop-shadow-xs"
            />
            <div className="hidden md:flex flex-col leading-tight text-left">
              <span className="text-[14px] font-bold text-[#111111] font-['Noto_Sans_Devanagari'] tracking-tight whitespace-nowrap">
                भारतीय आई सेवा
              </span>
              <span className="text-[11px] font-bold text-[#222222] tracking-tight whitespace-nowrap">
                Government of India
              </span>
            </div>
          </div>

          {/* CENTER: Prominent Bharatiya AI Seva Heading */}
          <div className="flex flex-col items-center justify-center text-center px-0.5 xs:px-1 sm:px-2 flex-1 min-w-0">
            <h1 className="text-[12px] xs:text-[14px] sm:text-[20px] md:text-[29px] font-extrabold text-[#111111] leading-tight tracking-tight font-['Noto_Sans_Devanagari'] drop-shadow-xs whitespace-nowrap">
              भारतीय एआई सेवा
            </h1>
            <p className="text-[8px] xs:text-[10px] sm:text-[13px] md:text-[20px] font-extrabold text-[#111111] tracking-wide xs:tracking-wider mt-0.5 leading-none drop-shadow-xs whitespace-nowrap">
              BHARATIYA AI SEVA
            </p>
          </div>

          {/* RIGHT: India Gate + SarkariGPT + Ashoka Chakra */}
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 flex-shrink-0 h-full">
            {/* India Gate Image (Desktop only) */}
            <div className="hidden md:flex items-end self-end h-full">
              <img
                src="/assets/images/india-gate.png"
                alt="India Gate Monument"
                className="h-[86px] w-auto object-contain object-bottom drop-shadow-xs"
              />
            </div>

            {/* SarkariGPT Branding */}
            <div className="text-[13px] xs:text-[16px] sm:text-[22px] md:text-[32px] font-black tracking-tight text-[#174A86] font-sans leading-none whitespace-nowrap">
              Sarkari<span className="text-[#174A86]">GPT</span>
            </div>

            {/* Ashoka Chakra Image */}
            <div className="flex items-center justify-center">
              <img
                src="/assets/images/ashoka-chakra.png"
                alt="Ashoka Chakra"
                className="h-[26px] w-[26px] xs:h-[30px] xs:w-[30px] sm:h-[40px] sm:w-[40px] md:h-[54px] md:w-[54px] object-contain drop-shadow-xs"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 2. NAVIGATION BAR */}
      {/* 2A. DESKTOP NAVIGATION BAR (>= md / 768px: EXACT DESKTOP SPEC) */}
      <nav className="hidden md:flex bg-[#174A86] h-[40px] items-center text-white text-[13px] px-4 sm:px-6 border-b border-[#123F78] shadow-md select-none sticky top-0 z-30">
        <div className="max-w-[1024px] xl:max-w-[1200px] mx-auto w-full flex items-center justify-between">
          {/* Left Nav Menu */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onHomeClick}
              className="flex items-center gap-1.5 cursor-pointer hover:underline font-medium text-white transition-colors"
            >
              <NavHomeIcon className="w-4 h-4" />
              <span>Home</span>
            </button>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'services' ? null : 'services');
                }}
                className="flex items-center gap-1.5 cursor-pointer hover:underline font-medium text-white transition-colors"
              >
                <NavServicesIcon className="w-4 h-4" />
                <span>Services ▾</span>
              </button>

              {activeDropdown === 'services' && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 top-full mt-1 w-56 bg-white text-gray-800 rounded shadow-lg border border-gray-200 py-1.5 z-40 text-xs font-normal"
                >
                  <div className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    National Portals (राष्ट्रीय सेवाएँ)
                  </div>
                  <button
                    onClick={() => {
                      onSelectQuerySuggestion('Check UIDAI Aadhaar seeding and link status');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-600"></span>
                    Aadhaar Seva (यूआईडीएআই)
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuerySuggestion('Verify PAN card linking with Income Tax Department');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Income Tax PAN Portal
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuerySuggestion('Explain GST return filing due dates and circulars');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                    GST Suvidha Kendra
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuerySuggestion('How to access DigiLocker certificates and Marksheets?');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center gap-2 border-t border-gray-100 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                    DigiLocker Integration
                  </button>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'profile' ? null : 'profile');
                }}
                className="flex items-center gap-1.5 cursor-pointer hover:underline font-medium text-white transition-colors"
              >
                <NavProfileIcon className="w-4 h-4" />
                <span>Profile ▾</span>
              </button>

              {activeDropdown === 'profile' && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 top-full mt-1 w-52 bg-white text-gray-800 rounded shadow-lg border border-gray-200 py-1.5 z-40 text-xs font-normal"
                >
                  <div className="px-3 py-1.5 border-b border-gray-100 bg-gray-50">
                    <p className="font-bold text-gray-900">श्री अजय कुमार</p>
                    <p className="text-[10px] text-gray-500">Citizen ID: CIT-IN-889124</p>
                  </div>
                  <div className="px-3 py-2 text-[11px] text-gray-600">
                    <div>State: {userState}</div>
                    <div>Category: General Public</div>
                    <div className="text-green-700 font-semibold mt-1">✓ e-KYC Verified</div>
                  </div>
                </div>
              )}
            </div>

            {/* Feedback Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'feedback' ? null : 'feedback');
                }}
                className="flex items-center gap-1.5 cursor-pointer hover:underline font-medium text-white transition-colors"
              >
                <NavFeedbackIcon className="w-4 h-4" />
                <span>Feedback ▾</span>
              </button>

              {activeDropdown === 'feedback' && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 top-full mt-1 w-64 bg-white text-gray-800 rounded shadow-lg border border-gray-200 p-3 z-40 text-xs"
                >
                  <p className="font-bold text-gray-800 mb-1">नागरिक प्रतिक्रिया (Citizen Feedback)</p>
                  <p className="text-gray-600 text-[11px] mb-2">Rate AI assistant response accuracy:</p>
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => {
                        alert('धन्यवाद! Your positive feedback has been registered under e-Governance ratings.');
                        setActiveDropdown(null);
                      }}
                      className="flex-1 bg-green-700 text-white py-1 rounded text-center hover:bg-green-800 cursor-pointer"
                    >
                      संतुष्ट (Satisfied)
                    </button>
                    <button
                      onClick={() => {
                        alert('Your feedback has been logged for quality improvement.');
                        setActiveDropdown(null);
                      }}
                      className="flex-1 bg-gray-600 text-white py-1 rounded text-center hover:bg-gray-700 cursor-pointer"
                    >
                      सुझाव (Suggestion)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Us */}
            <button
              onClick={() => onOpenModal('contact')}
              className="flex items-center gap-1.5 cursor-pointer hover:underline font-medium text-white transition-colors"
            >
              <NavMailIcon className="w-4 h-4" />
              <span>Contact Us</span>
            </button>
          </div>

          {/* Right Nav Menu */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => onOpenModal('logout')}
              className="flex items-center gap-1.5 cursor-pointer hover:underline font-medium text-white transition-colors"
            >
              <NavLogoutIcon className="w-4 h-4" />
              <span>Logout</span>
            </button>

            <button
              onClick={() => onOpenModal('help')}
              className="flex items-center gap-1.5 cursor-pointer hover:underline font-medium text-white transition-colors"
            >
              <NavHelpIcon className="w-4 h-4" />
              <span>Help</span>
            </button>

            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 cursor-pointer hover:underline font-semibold text-white transition-colors"
              title="Toggle Language (हिंदी / English)"
            >
              <NavGlobeIcon className="w-4 h-4" />
              <span>{languageHindi ? 'English' : 'Hindi'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2B. MOBILE NAVIGATION BAR (< md / 768px: RESPONSIVE WITH DRAWER) */}
      <div className="md:hidden bg-[#174A86] border-b border-[#123F78] shadow-md sticky top-0 z-30 select-none">
        <div className="h-[42px] px-3 flex items-center justify-between text-white text-xs">
          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-1.5 bg-[#123F78] hover:bg-[#0E3260] px-2.5 py-1 rounded text-white font-medium cursor-pointer transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>मेनू (Menu)</span>
          </button>

          {/* Quick Actions for Mobile */}
          <div className="flex items-center gap-3">
            <button
              onClick={onHomeClick}
              className="flex items-center gap-1 text-white hover:text-blue-200 cursor-pointer p-1"
              title="Home"
            >
              <NavHomeIcon className="w-4 h-4" />
              <span className="hidden xs:inline text-[11px]">Home</span>
            </button>

            <button
              onClick={() => onOpenModal('help')}
              className="flex items-center gap-1 text-white hover:text-blue-200 cursor-pointer p-1"
              title="Help"
            >
              <NavHelpIcon className="w-4 h-4" />
              <span className="hidden xs:inline text-[11px]">Help</span>
            </button>

            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1 bg-[#123F78] hover:bg-[#0E3260] px-2 py-1 rounded text-[11px] font-bold text-white cursor-pointer transition-colors"
              title="Toggle Language"
            >
              <NavGlobeIcon className="w-3.5 h-3.5" />
              <span>{languageHindi ? 'ENG' : 'हिंदी'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu Drawer */}
        {mobileMenuOpen && (
          <div className="bg-[#123F78] border-t border-[#1a5598] p-3 text-white text-xs flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
            {/* New Chat in Drawer */}
            <button
              onClick={() => {
                onNewChat();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 py-2 px-3 bg-[#2E8B35] hover:bg-[#25732b] rounded text-left font-bold cursor-pointer text-white shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Chat (नया संवाद शुरू करें)</span>
            </button>

            {/* Home */}
            <button
              onClick={() => {
                onHomeClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 py-2 px-3 bg-white/10 hover:bg-white/20 rounded text-left font-semibold cursor-pointer"
            >
              <NavHomeIcon className="w-4 h-4" />
              <span>Home (मुख्य पृष्ठ)</span>
            </button>

            {/* Services (Accordion) */}
            <div className="bg-white/5 rounded overflow-hidden">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between py-2 px-3 hover:bg-white/10 text-left font-semibold cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <NavServicesIcon className="w-4 h-4" />
                  <span>Services (सेवाएँ)</span>
                </div>
                <span>{mobileServicesOpen ? '▲' : '▼'}</span>
              </button>
              {mobileServicesOpen && (
                <div className="bg-white/10 p-2 flex flex-col gap-1 text-[11px]">
                  <button
                    onClick={() => {
                      onSelectQuerySuggestion('Check UIDAI Aadhaar seeding and link status');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left py-1.5 px-2 hover:bg-white/10 rounded cursor-pointer"
                  >
                    • Aadhaar Seva (ইউআইडीएআই)
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuerySuggestion('Verify PAN card linking with Income Tax Department');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left py-1.5 px-2 hover:bg-white/10 rounded cursor-pointer"
                  >
                    • Income Tax PAN Portal
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuerySuggestion('Explain GST return filing due dates and circulars');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left py-1.5 px-2 hover:bg-white/10 rounded cursor-pointer"
                  >
                    • GST Suvidha Kendra
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuerySuggestion('How to access DigiLocker certificates and Marksheets?');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left py-1.5 px-2 hover:bg-white/10 rounded cursor-pointer"
                  >
                    • DigiLocker Integration
                  </button>
                </div>
              )}
            </div>

            {/* Profile (Accordion) */}
            <div className="bg-white/5 rounded overflow-hidden">
              <button
                onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                className="w-full flex items-center justify-between py-2 px-3 hover:bg-white/10 text-left font-semibold cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <NavProfileIcon className="w-4 h-4" />
                  <span>Profile (নাगरिक विवरण)</span>
                </div>
                <span>{mobileProfileOpen ? '▲' : '▼'}</span>
              </button>
              {mobileProfileOpen && (
                <div className="bg-white/10 p-2.5 text-[11px] flex flex-col gap-1">
                  <div className="font-bold">श्री अजय कुमार</div>
                  <div className="opacity-80">Citizen ID: CIT-IN-889124</div>
                  <div>State: {userState}</div>
                  <div className="text-green-300 font-semibold">✓ e-KYC Verified ({userState})</div>
                </div>
              )}
            </div>

            {/* Feedback (Accordion) */}
            <div className="bg-white/5 rounded overflow-hidden">
              <button
                onClick={() => setMobileFeedbackOpen(!mobileFeedbackOpen)}
                className="w-full flex items-center justify-between py-2 px-3 hover:bg-white/10 text-left font-semibold cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <NavFeedbackIcon className="w-4 h-4" />
                  <span>Feedback (प्रतिक्रिया)</span>
                </div>
                <span>{mobileFeedbackOpen ? '▲' : '▼'}</span>
              </button>
              {mobileFeedbackOpen && (
                <div className="bg-white/10 p-2.5 flex gap-2">
                  <button
                    onClick={() => {
                      alert('धन्यवाद! Your feedback has been registered.');
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 bg-green-700 py-1.5 rounded text-center font-bold cursor-pointer"
                  >
                    संतुष्ट (Satisfied)
                  </button>
                  <button
                    onClick={() => {
                      alert('Your feedback has been logged.');
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 bg-gray-600 py-1.5 rounded text-center font-bold cursor-pointer"
                  >
                    सुझाव (Suggestion)
                  </button>
                </div>
              )}
            </div>

            {/* Contact Us */}
            <button
              onClick={() => {
                onOpenModal('contact');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 py-2 px-3 bg-white/10 hover:bg-white/20 rounded text-left font-semibold cursor-pointer"
            >
              <NavMailIcon className="w-4 h-4" />
              <span>Contact Us (संपर्क करें)</span>
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                onOpenModal('logout');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 py-2 px-3 bg-red-900/60 hover:bg-red-900 rounded text-left font-semibold cursor-pointer"
            >
              <NavLogoutIcon className="w-4 h-4" />
              <span>Logout (लॉगआउट)</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. WELCOME ROW */}
      <div className="h-auto py-2 md:h-[48px] md:py-0 flex flex-col md:flex-row items-center justify-between px-3 sm:px-6 border-b bg-white text-xs md:text-sm font-bold text-black shadow-xs gap-0.5 md:gap-0 text-center md:text-left">
        <div className="max-w-[1024px] xl:max-w-[1200px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-0.5 md:gap-0">
          <span className="font-['Noto_Sans_Devanagari',Arial,sans-serif] leading-tight">
            स्वागतम् (Welcome): SarkariGPT - Citizen AI Assistant (नागरिक एआई सहायक)
          </span>
          <span className="text-[11px] md:text-sm text-gray-700 md:text-black">
            Shri/Smt. Citizen (नागरिक)
          </span>
        </div>
      </div>
    </>
  );
};
