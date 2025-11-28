// src/pages/Home.js
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaWifi,
  FaTv,
  FaStar,
  FaPlay,
  FaArrowRight,
  FaChevronRight,
  FaGraduationCap,
  FaPhone,
  FaGamepad,
  FaUsers,
  FaShieldAlt,
  FaHeadset,
  FaWhatsapp,
  FaCreditCard,
  FaPlus,
  FaArrowUp,
  FaSearch
} from "react-icons/fa";
import styled, { createGlobalStyle } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";

/* ---------------------------- Helper ---------------------------- */
const renderStars = (count = 5) => {
  const items = [];
  for (let i = 0; i < 5; i++) {
    items.push(
      <FaStar key={i} style={{ opacity: i < count ? 1 : 0.25, marginRight: 4 }} />
    );
  }
  return <div style={{ display: "inline-flex" }}>{items}</div>;
};

/* ---------------------- Swiper GTPL Theme --------------------- */
const SwiperThemeStyles = createGlobalStyle`
  :root {
    --swiper-theme-color: #f59e0b;
    --swiper-navigation-color: #f59e0b;
    --swiper-pagination-color: #f59e0b;
  }

  .swiper-pagination-bullet {
    width: 10px; height: 10px;
    background: rgba(245, 158, 11, 0.35);
    opacity: 1;
    transition: transform .2s ease, background .2s ease;
  }
  .swiper-pagination-bullet:hover { transform: scale(1.15); }
  .swiper-pagination-bullet-active { background: #f59e0b; transform: scale(1.25); }

  .swiper-button-next, .swiper-button-prev {
    width: 44px; height: 44px; border-radius: 999px;
    background: rgba(245, 158, 11, .12);
    backdrop-filter: blur(2px);
    transition: background .2s ease, transform .2s ease, box-shadow .2s ease;
  }
  .swiper-button-next:hover, .swiper-button-prev:hover {
    background: rgba(245, 158, 11, .22);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(245, 158, 11, .25);
  }
  .swiper-button-next::after, .swiper-button-prev::after { font-size: 16px; font-weight: 900; }

  @media (max-width: 640px) {
    .swiper-button-next, .swiper-button-prev { width: 38px; height: 38px; }
    .swiper-button-next::after, .swiper-button-prev::after { font-size: 14px; }
  }
`;

/* ----------------------------- Styles --------------------------- */
const PageWrap = styled.div`
  --primary-color: #0056b3;
  --primary-dark: #004494;
  --secondary-color: #ff9900;
  --text-primary: #ffffff;
  --text-secondary: #cfcfcf;
  --card: #111111;
  --border: #222222;
  --hover-glow: rgba(0, 86, 179, 0.2);
  --success: #10b981;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.6);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.7);
  background: #000000;
  color: var(--text-primary);
`;

/* ====== HERO SLIDER (changeable top photos) ====== */
const HeroWrap = styled.section`
  position: relative;
  height: min(78vh, 760px);
  min-height: 440px;
  color: #ffffff;
  border-bottom: 1px solid var(--border);
`;

const HeroSlide = styled.div`
  width: 100%; height: 100%;
  background:
    linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)),
    url(${({ $img }) => `"${$img}"`}) center/cover no-repeat;
  position: relative;
`;

const HeroContent = styled.div`
  position: absolute; inset: 0; display: grid; place-items: center; text-align: center;
  padding: 0 16px;
`;

const HeroInner = styled.div`
  max-width: 900px;
  padding: 2rem;
  
  h1 {
    font-size: clamp(32px, 5vw, 64px);
    margin-bottom: 1rem; line-height: 1.1;
    text-shadow: 0 2px 8px rgba(0,0,0,.6);
    letter-spacing: .5px;
    font-weight: 800;
    color: #ffffff;
  }
  p {
    font-size: clamp(16px, 2.3vw, 22px);
    margin-bottom: 2rem; color: #fff;
    text-shadow: 0 1px 4px rgba(0,0,0,.6);
    font-weight: 500;
  }

  .cta-group{
    display:flex;
    gap: 1rem;
    align-items:center;
    justify-content:center;
    flex-wrap: wrap;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--secondary-color); color: #000;
  padding: 1rem 2rem; border-radius: 50px; font-weight: 800;
  letter-spacing: .5px; transition: all .25s ease;
  box-shadow: 0 8px 24px rgba(245,158,11,.45);
  border: none;
  font-size: 1.1rem;
  &:hover { background: #e68a00; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(245,158,11,.6); }
`;

const CallButton = styled.a`
  display: inline-flex; align-items: center; gap: 8px;
  background: white; color: var(--primary-color);
  padding: 1rem 2rem; border-radius: 50px; font-weight: 800;
  letter-spacing: .5px; transition: all .25s ease;
  box-shadow: 0 8px 20px rgba(0,0,0,.2);
  border: none;
  text-decoration: none;
  font-size: 1.1rem;
  &:hover{
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(0,0,0,.3);
  }
`;

/* ====== QUICK ACTIONS BAR ====== */
const QuickActionsBar = styled.div`
  background: #111111;
  padding: 2rem;
  position: relative;
  z-index: 10;
  margin-top: -60px;
  width: 90%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.8);
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  border: 1px solid #222222;

  @media (max-width: 768px) {
    width: 95%;
    margin-top: -30px;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const QuickActionItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    color: var(--primary-color);
  }

  .icon-circle {
    width: 64px;
    height: 64px;
    background: rgba(0, 86, 179, 0.15);
    color: #0056b3;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 86, 179, 0.3);
  }

  &:hover .icon-circle {
    background: var(--primary-color);
    color: #ffffff;
    box-shadow: 0 8px 20px rgba(0, 86, 179, 0.5);
  }

  span {
    font-weight: 700;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

/* Sections */
const Section = styled.section`
  padding: 5rem 1rem;
  background: transparent;
`;

const Container = styled.div`
  max-width: 1200px; margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center; margin-bottom: 3rem;
  h2 { color: var(--text-primary); font-size: 2.25rem; margin-bottom: .6rem; }
  p { color: var(--text-secondary); max-width: 700px; margin: 0 auto; }
`;

/* Services */
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ServiceCard = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px; overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  &:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: var(--secondary-color); }
  .service-image { height: 200px; display: grid; place-items: center; font-size: 4rem; color: #fff; border-bottom: 1px solid var(--border); }
  .service-content {
    padding: 1.5rem;
    h3 { color: var(--secondary-color); margin-bottom: .5rem; font-size: 1.5rem; }
    p { color: var(--text-secondary); margin-bottom: 1.5rem; }
  }
`;

const TextLinkButton = styled(Link)`
  display: inline-flex; align-items: center; gap: 6px;
  font-weight: 800; color: var(--secondary-color); text-decoration: none;
  transition: transform .15s ease, opacity .15s ease;
  &:hover { opacity: .9; transform: translateX(2px); }
`;

/* Features */
const FeaturesSection = styled.section`
  padding: 5rem 1rem; background: transparent;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.1rem;
`;

const FeatureCard = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px; padding: 1.25rem;
  text-align: center; box-shadow: var(--shadow-md);
`;

const FeatureIcon = styled.div`
  font-size: 2rem; margin-bottom: .5rem; color: var(--secondary-color);
`;

const FeatureTitle = styled.h4`
  font-size: 1.15rem; font-weight: 800; margin-bottom: .35rem; color: var(--text-primary);
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary); line-height: 1.6;
`;

/* Plans */
const PlansSection = styled.section`
  padding: 5rem 1rem; background: transparent;
`;

const PlanGrid = styled.div`
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.1rem;
`;

const PlanCard = styled(motion.div)`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px; box-shadow: var(--shadow-md);
  padding: 1.25rem 1.25rem 1.5rem; display: flex; flex-direction: column; gap: .6rem;
  transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
  &:hover { transform: translateY(-2px); border-color: var(--secondary-color); box-shadow: var(--shadow-lg); }
`;

const PlanHeader = styled.div`
  display: flex; align-items: center; gap: 10px; margin-bottom: .25rem;
  h3 { margin: 0; font-size: 1.1rem; color: var(--text-primary); }
  .tag { font-size: .75rem; padding: 4px 8px; border-radius: 999px; background: rgba(16,185,129,.12); color: var(--success); font-weight: 800; }
`;

const Price = styled.div`
  font-size: 1.75rem; font-weight: 900; color: var(--text-primary);
  small { font-size: .9rem; color: var(--text-secondary); font-weight: 600; }
`;

const PlanList = styled.ul`
  margin: .25rem 0 .75rem; padding-left: 1rem; color: var(--text-secondary);
  li { margin: .2rem 0; }
`;

const PlanButton = styled.a`
  margin-top: auto; display: inline-flex; align-items: center; gap: 8px;
  background: var(--secondary-color); color: #000; padding: .6rem 1rem;
  border-radius: 10px; font-weight: 800; letter-spacing: .2px;
  box-shadow: 0 6px 18px rgba(245,158,11,.25);
  text-decoration: none;
  cursor: pointer;
  &:hover { background: #e68a00; color: #000; text-decoration: none; }
`;

/* Testimonials / CTA Section */
const CTAButton = styled(Link)`
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--secondary-color); color: #000;
  padding: .75rem 1.25rem; border-radius: 999px; font-weight: 900;
  letter-spacing: .3px; transition: transform .2s ease, box-shadow .2s ease;
  box-shadow: var(--shadow-md);
  &:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
`;

/* ------------------------------ Data ----------------------------- */
const services = [
  {
    title: "High-Speed Broadband",
    description: "Lightning-fast internet speeds for seamless streaming, gaming, and browsing.",
    icon: <FaWifi />,
    bgColor: "linear-gradient(135deg, #153a71 0%, #1e4a8a 100%)",
    link: "/broadband",
  },
  {
    title: "Digital Cable TV",
    description: "Crystal clear picture quality with 500+ channels and HD content.",
    icon: <FaTv />,
    bgColor: "linear-gradient(135deg, #f59e0b 0%, #e68a00 100%)",
    link: "/cable-tv",
  }
];

const featureList = [
  { icon: <FaHeadset />, title: "24/7 Support", description: "Round-the-clock customer support with AI chatbot and live agents" },
  { icon: <FaWifi />, title: "99.9% Uptime", description: "Reliable service with guaranteed uptime and quick issue resolution" },
  { icon: <FaPlay />, title: "Instant Activation", description: "Get your services activated within minutes of purchase" },
  { icon: <FaShieldAlt />, title: "Secure & Safe", description: "Enterprise-grade security for all your digital needs" },
  { icon: <FaUsers />, title: "Family Plans", description: "Special packages designed for families and multiple users" },
  { icon: <FaStar />, title: "Premium Quality", description: "Best-in-class infrastructure and customer experience" },
];

const testimonials = [
  { quote: "The best internet service I've ever used. Super reliable and fast!", author: "Rahul Sharma", rating: 5 },
  { quote: "Excellent customer service and great channel selection. Highly recommended!", author: "Priya Patel", rating: 5 },
  { quote: "Affordable plans with premium quality service. Very satisfied!", author: "Amit Kumar", rating: 4 },
];

/* ---------------------------- Component -------------------------- */
const Home = () => {
  const plansRef = useRef(null);

  const scrollToPlans = (e) => {
    e?.preventDefault?.();
    const el = document.getElementById("popular-plans");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ======= Change hero photos here (add/remove URLs) ======= */
  const heroSlides = [
    {
      image: "/assets/slider/slide1.png",
      title: "Ultra-Fast Fiber Broadband",
      subtitle: "Experience lightning speed internet with our advanced fiber optic network",
      cta: "View Plans",
    },
    {
      image: "/assets/slider/slide2.png",
      title: "Entertainment for Everyone",
      subtitle: "Enjoy 500+ channels and 4K content with your family",
      cta: "Explore TV",
    },
    {
      image: "/assets/slider/slide3.png",
      title: "Lag-Free Gaming",
      subtitle: "Dominate the game with low latency and high-speed connection",
      cta: "Gaming Plans",
    },
    {
      image: "/assets/slider/slide4.png",
      title: "Seamless Work from Home",
      subtitle: "Reliable connectivity for all your video calls and large file transfers",
      cta: "Business Plans",
    },
    {
      image: "/assets/slider/slide5.png",
      title: "Next-Gen Digital TV",
      subtitle: "Upgrade to our smart set-top box for a premium viewing experience",
      cta: "Get Box",
    },
    {
      image: "/assets/slider/slide6.png",
      title: "Connected Everywhere",
      subtitle: "Stay connected with our robust network infrastructure",
      cta: "Check Coverage",
    },
  ];

  return (
    <PageWrap>
      <SwiperThemeStyles />

      {/* ===== HERO SLIDER ===== */}
      <HeroWrap>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          loop
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          speed={700}
          style={{ height: "100%" }}
        >
          {heroSlides.map((s, i) => (
            <SwiperSlide key={i}>
              <HeroSlide $img={s.image}>
                <HeroContent>
                  <HeroInner>
                    <h1>{s.title}</h1>
                    {s.subtitle && <p>{s.subtitle}</p>}
                    <div className="cta-group">
                      <PrimaryButton onClick={scrollToPlans}>
                        {s.cta} <FaChevronRight />
                      </PrimaryButton>
                      <CallButton href="tel:+916295932396">
                        <FaPhone /> +91 62959 32396
                      </CallButton>
                    </div>
                  </HeroInner>
                </HeroContent>
              </HeroSlide>
            </SwiperSlide>
          ))}
        </Swiper>
      </HeroWrap>

      {/* ===== QUICK ACTIONS BAR ===== */}
      <QuickActionsBar>
        <QuickActionItem to="/enquire">
          <div className="icon-circle"><FaCreditCard /></div>
          <span>Quick Pay</span>
        </QuickActionItem>
        <QuickActionItem to="/buy-connection-form">
          <div className="icon-circle"><FaPlus /></div>
          <span>New Connection</span>
        </QuickActionItem>
        <QuickActionItem to="/broadband">
          <div className="icon-circle"><FaArrowUp /></div>
          <span>Upgrade Plan</span>
        </QuickActionItem>
        <QuickActionItem to="/support">
          <div className="icon-circle"><FaSearch /></div>
          <span>Track Order</span>
        </QuickActionItem>
      </QuickActionsBar>

      {/* Services */}
      <Section>
        <Container>
          <SectionHeader>
            <h2>Our Services</h2>
            <p>Choose from our range of high-quality services designed for your entertainment and connectivity needs</p>
          </SectionHeader>

          <ServicesGrid>
            {services.map((s, i) => (
              <ServiceCard key={i}>
                <div className="service-image" style={{ background: s.bgColor }}>{s.icon}</div>
                <div className="service-content">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <TextLinkButton to={s.link}>
                    Learn more <FaChevronRight />
                  </TextLinkButton>
                </div>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </Section>

      {/* Popular Plans */}
      <PlansSection id="popular-plans" ref={plansRef}>
        <Container>
          <SectionHeader>
            <h2>Popular Plans</h2>
            <p>Simple, fair pricing crafted for students, homes, and power users</p>
          </SectionHeader>

          <PlanGrid>
            {/* Student Plan */}
            <PlanCard
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              whileHover={{ scale: 1.015 }}
            >
              <PlanHeader>
                <FaGraduationCap style={{ color: "var(--success)", fontSize: 22 }} />
                <h3>Student Plan</h3>
                <span className="tag">NEW</span>
              </PlanHeader>
              <Price>₹199 <small>/ month</small></Price>
              <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>15 Mbps • Unlimited Data</div>
              <PlanList>
                <li>Perfect for classes, research & light streaming</li>
                <li>Free installation in launch areas</li>
                <li>24/7 priority chat support</li>
              </PlanList>
              <PlanButton href="tel:+916295932396">Call Us <FaArrowRight /></PlanButton>
            </PlanCard>

            {/* Standard Home */}
            <PlanCard
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              whileHover={{ scale: 1.015 }}
            >
              <PlanHeader>
                <FaWifi style={{ color: "var(--secondary-color)", fontSize: 22 }} />
                <h3>Standard Home</h3>
              </PlanHeader>
              <Price>₹399 <small>/ month</small></Price>
              <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>40 Mbps • Unlimited Data</div>
              <PlanList>
                <li>Ideal for families & HD streaming</li>
                <li>Free router on annual plan</li>
                <li>99.9% uptime SLA</li>
              </PlanList>
              <PlanButton href="tel:+916295932396">Call Us <FaArrowRight /></PlanButton>
            </PlanCard>

            {/* Turbo */}
            <PlanCard
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              whileHover={{ scale: 1.015 }}
            >
              <PlanHeader>
                <FaWifi style={{ color: "#fbbf24", fontSize: 22 }} />
                <h3>Turbo</h3>
              </PlanHeader>
              <Price>₹749 <small>/ month</small></Price>
              <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>150 Mbps • Unlimited Data</div>
              <PlanList>
                <li>Gaming, 4K streaming, heavy downloads</li>
                <li>Low latency routing</li>
                <li>Free installation</li>
              </PlanList>
              <PlanButton href="tel:+916295932396">Call Us <FaArrowRight /></PlanButton>
            </PlanCard>
          </PlanGrid>
        </Container>
      </PlansSection>

      {/* TV Plans Section */}
      <PlansSection style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <Container>
          <SectionHeader>
            <h2>TV Entertainment Plans</h2>
            <p>Choose from our premium cable TV packages with regional content and HD channels</p>
          </SectionHeader>

          <PlanGrid>
            {/* Basic TV */}
            <PlanCard
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              whileHover={{ scale: 1.015 }}
            >
              <PlanHeader>
                <FaTv style={{ color: "var(--secondary-color)", fontSize: 22 }} />
                <h3>Basic TV</h3>
              </PlanHeader>
              <Price>₹200 <small>/ month</small></Price>
              <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>150+ Channels • SD Quality</div>
              <PlanList>
                <li>Essential entertainment channels</li>
                <li>News, sports & movies</li>
                <li>Free installation</li>
                <li>24/7 customer support</li>
              </PlanList>
              <PlanButton href="tel:+916295932396">Call Us <FaArrowRight /></PlanButton>
            </PlanCard>

            {/* Bengali Prime */}
            <PlanCard
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              whileHover={{ scale: 1.015 }}
            >
              <PlanHeader>
                <FaTv style={{ color: "#10b981", fontSize: 22 }} />
                <h3>Bengali Prime</h3>
                <span className="tag" style={{ background: "rgba(16,185,129,.12)", color: "#10b981" }}>MOST POPULAR</span>
              </PlanHeader>
              <Price>₹225 <small>/ month</small></Price>
              <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>300+ Channels • HD Quality</div>
              <PlanList>
                <li>Premium Bengali content & regional channels</li>
                <li>HD & 4K streaming capabilities</li>
                <li>Exclusive Bengali movies & shows</li>
                <li>Priority Bengali customer support</li>
                <li>Free HD set-top box</li>
              </PlanList>
              <PlanButton href="tel:+916295932396">Call Us <FaArrowRight /></PlanButton>
            </PlanCard>

            {/* Premium HD */}
            <PlanCard
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              whileHover={{ scale: 1.015 }}
            >
              <PlanHeader>
                <FaTv style={{ color: "#8b5cf6", fontSize: 22 }} />
                <h3>Premium HD</h3>
                <span className="tag" style={{ background: "rgba(139,92,246,.12)", color: "#8b5cf6" }}>PREMIUM</span>
              </PlanHeader>
              <Price>₹799 <small>/ month</small></Price>
              <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>500+ Channels • Full HD</div>
              <PlanList>
                <li>All channels in HD quality</li>
                <li>International content & movies</li>
                <li>Premium sports packages</li>
                <li>4K Ultra HD channels</li>
                <li>Free premium set-top box</li>
              </PlanList>
              <PlanButton href="tel:+916295932396">Call Us <FaArrowRight /></PlanButton>
            </PlanCard>
          </PlanGrid>
        </Container>
      </PlansSection>

      {/* Why Choose SPEEDLINK */}
      <FeaturesSection>
        <Container>
          <SectionHeader>
            <h2>Why Choose SPEEDLINK?</h2>
            <p>We deliver a premium digital entertainment experience with industry-leading reliability</p>
          </SectionHeader>
          <FeaturesGrid>
            {featureList.map((f, i) => (
              <FeatureCard key={i}>
                <FeatureIcon>{f.icon}</FeatureIcon>
                <FeatureTitle>{f.title}</FeatureTitle>
                <FeatureDescription>{f.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      {/* Testimonials */}
      <Section>
        <Container>
          <SectionHeader>
            <h2>What Our Customers Say</h2>
            <p>Don't just take our word for it — hear from our satisfied customers</p>
          </SectionHeader>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px" }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    padding: "2rem",
                    borderRadius: 12,
                    boxShadow: "var(--shadow-md)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ marginBottom: ".75rem", minHeight: 24 }}>{renderStars(t.rating)}</div>
                  <p style={{ fontSize: "1.15rem", fontStyle: "italic", marginBottom: "1rem", color: "var(--text-secondary)" }}>
                    "{t.quote}"
                  </p>
                  <p style={{ fontWeight: 800, color: "var(--secondary-color)" }}>— {t.author}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Ready to Get Started?
            </h2>
            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Join thousands of satisfied customers enjoying lightning-fast internet and crystal-clear TV
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <CTAButton href="tel:+916295932396">
                <FaPhone /> Call Us Now
              </CTAButton>
              <CTAButton
                href="https://wa.me/916295932396"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#25D366' }}
              >
                <FaWhatsapp /> WhatsApp
              </CTAButton>
            </div>
          </div>
        </Container>
      </Section>

      {/* Floating WhatsApp Button */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        background: '#25D366',
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textDecoration: 'none'
      }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 12px 35px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.4)';
        }}
        onClick={() => window.open('https://wa.me/916295932396', '_blank')}
      >
        <FaWhatsapp />
      </div>
    </PageWrap>
  );
};

export default Home;
