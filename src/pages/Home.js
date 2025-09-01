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

/* ---------------------- Swiper Orange Theme --------------------- */
const SwiperThemeStyles = createGlobalStyle`
  :root {
    --swiper-theme-color: #ff6600;
    --swiper-navigation-color: #ff6600;
    --swiper-pagination-color: #ff6600;
  }

  .swiper-pagination-bullet {
    width: 10px; height: 10px;
    background: rgba(255, 102, 0, 0.35);
    opacity: 1;
    transition: transform .2s ease, background .2s ease;
  }
  .swiper-pagination-bullet:hover { transform: scale(1.15); }
  .swiper-pagination-bullet-active { background: #ff6600; transform: scale(1.25); }

  .swiper-button-next, .swiper-button-prev {
    width: 44px; height: 44px; border-radius: 999px;
    background: rgba(255,102,0,.12);
    backdrop-filter: blur(2px);
    transition: background .2s ease, transform .2s ease, box-shadow .2s ease;
  }
  .swiper-button-next:hover, .swiper-button-prev:hover {
    background: rgba(255,102,0,.22);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(255,102,0,.25);
  }
  .swiper-button-next::after, .swiper-button-prev::after { font-size: 16px; font-weight: 900; }

  @media (max-width: 640px) {
    .swiper-button-next, .swiper-button-prev { width: 38px; height: 38px; }
    .swiper-button-next::after, .swiper-button-prev::after { font-size: 14px; }
  }
`;

/* ----------------------------- Styles --------------------------- */
const PageWrap = styled.div`
  --primary-color: var(--primary-color, #ff6600);
  --primary-dark: var(--primary-dark, #e65c00);
  --text-primary: var(--text-primary, #ffffff);
  --text-secondary: var(--text-secondary, #cfcfcf);
  --card: var(--bg-card, #111111);
  --border: var(--border, #222222);
  --hover-glow: var(--hover-glow, rgba(255,102,0,.1));
  --success: #10b981;
  --shadow-sm: var(--shadow-sm, 0 2px 10px rgba(0,0,0,.35));
  --shadow-md: var(--shadow-md, 0 6px 22px rgba(0,0,0,.45));
  --shadow-lg: var(--shadow-lg, 0 12px 40px rgba(0,0,0,.6));
`;

/* ====== HERO SLIDER (changeable top photos) ====== */
const HeroWrap = styled.section`
  position: relative;
  height: min(78vh, 760px);
  min-height: 440px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border);
`;

const HeroSlide = styled.div`
  width: 100%; height: 100%;
  background:
    linear-gradient(rgba(0,0,0,.82), rgba(0,0,0,.78)),
    url(${({ $img }) => `"${$img}"`}) center/cover no-repeat;
  position: relative;
`;

const HeroContent = styled.div`
  position: absolute; inset: 0; display: grid; place-items: center; text-align: center;
  padding: 0 16px;
`;

const HeroInner = styled.div`
  max-width: 900px;
  padding: 1.25rem;
  background: rgba(0,0,0,.38);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: 0 14px 40px rgba(0,0,0,.45);

  h1 {
    font-size: clamp(32px, 5vw, 56px);
    margin-bottom: 0.9rem; line-height: 1.1;
    text-shadow: 0 2px 8px rgba(0,0,0,.6);
    letter-spacing: .2px;
  }
  p {
    font-size: clamp(16px, 2.3vw, 20px);
    margin-bottom: 1.2rem; color: #e9e9e9;
    text-shadow: 0 1px 4px rgba(0,0,0,.6);
  }

  .cta-group{
    display:flex;
    flex-direction:column;
    gap:.75rem;
    align-items:center;
    justify-content:center;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--primary-color); color: #fff;
  padding: .9rem 1.6rem; border-radius: 10px; font-weight: 800;
  letter-spacing: .2px; transition: all .25s ease;
  box-shadow: 0 8px 24px rgba(255,102,0,.45);
  border: 1px solid rgba(255,255,255,.08);
  &:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 12px 30px rgba(255,102,0,.6); }
`;

/* 👇 NEW: Phone button shown on hero */
const CallButton = styled.a`
  display: inline-flex; align-items: center; gap: 8px;
  background: #0b1727; color: var(--primary-color);
  padding: .75rem 1.25rem; border-radius: 10px; font-weight: 900;
  letter-spacing: .2px; transition: all .25s ease;
  box-shadow: 0 8px 20px rgba(0,0,0,.35);
  border: 1px solid rgba(255,255,255,.08);
  text-decoration: none;
  &:hover{
    background: var(--primary-dark);
    color:#fff;
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(255,102,0,.45);
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
  gap: 1.25rem;
`;

const ServiceCard = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px; overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  &:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: var(--primary-color); }
  .service-image { height: 180px; display: grid; place-items: center; font-size: 3rem; color: #fff; border-bottom: 1px solid var(--border); }
  .service-content {
    padding: 1.25rem 1.25rem 1.5rem;
    h3 { color: var(--primary-color); margin-bottom: .4rem; }
    p { color: var(--text-secondary); margin-bottom: 1rem; }
  }
`;

const TextLinkButton = styled(Link)`
  display: inline-flex; align-items: center; gap: 6px;
  font-weight: 800; color: var(--primary-color); text-decoration: none;
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
  font-size: 2rem; margin-bottom: .5rem; color: var(--primary-color);
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
  &:hover { transform: translateY(-2px); border-color: var(--primary-color); box-shadow: var(--shadow-lg); }
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

const PlanButton = styled(Link)`
  margin-top: auto; display: inline-flex; align-items: center; gap: 8px;
  background: var(--primary-color); color: #fff; padding: .6rem 1rem;
  border-radius: 10px; font-weight: 800; letter-spacing: .2px;
  box-shadow: 0 6px 18px rgba(255,102,0,.25);
  &:hover { background: var(--primary-dark); }
`;

/* Testimonials / CTA Section */
const AnnouncementSection = styled.section`
  padding: 3rem 1rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: #0b1727;
`;

const AnnouncementContent = styled.div`
  text-align: center; max-width: 700px; margin: 0 auto;
`;

const AnnouncementTitle = styled.h2`
  font-size: 2rem; font-weight: 900; margin-bottom: .75rem; color: #0b1727;
`;

const AnnouncementText = styled.p`
  font-size: 1.125rem; opacity: .95; margin-bottom: 1.25rem; color: #0b1727;
`;

const CTAButton = styled(Link)`
  display: inline-flex; align-items: center; gap: 8px;
  background: #0b1727; color: var(--primary-color);
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
    bgColor: "linear-gradient(135deg, #ff7a1a 0%, #ff6600 100%)",
    link: "/broadband",
  },
  {
    title: "Digital Cable TV",
    description: "Crystal clear picture quality with 500+ channels and HD content.",
    icon: <FaTv />,
    bgColor: "linear-gradient(135deg, #ffb81a 0%, #ff7a1a 100%)",
    link: "/cable-tv",
  },
];

const featureList = [
  { icon: <FaStar />, title: "24/7 Support", description: "Round-the-clock customer support with AI chatbot and live agents" },
  { icon: <FaWifi />, title: "99.9% Uptime", description: "Reliable service with guaranteed uptime and quick issue resolution" },
  { icon: <FaPlay />, title: "Instant Activation", description: "Get your services activated within minutes of purchase" },
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
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=100",
      title: "Welcome to SPEEDLINK",
      subtitle: "Ultra-fast broadband and crystal-clear digital TV",
      cta: "View Plans",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=100",
      title: "Streaming Without Limits",
      subtitle: "Buffer-free movies, shows, and sports in HD/4K",
      cta: "Explore Plans",
    },
    {
      image:
        "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=100",
      title: "Gaming-Grade Speeds",
      subtitle: "Low latency plans for competitive gaming",
      cta: "See Offers",
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
                      <PrimaryButton to="#plans" onClick={scrollToPlans}>
                        {s.cta || "View Plans"} <FaArrowRight />
                      </PrimaryButton>
                      {/* Phone button in hero */}
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

      {/* Services */}
      <Section>
        <Container>
          <SectionHeader>
            <h2>Our Services</h2>
            <p>Choose from our range of high-quality services designed for your entertainment needs</p>
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
              <PlanButton to="/broadband">Get This Plan <FaArrowRight /></PlanButton>
            </PlanCard>

            {/* Standard Home */}
            <PlanCard
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              whileHover={{ scale: 1.015 }}
            >
              <PlanHeader>
                <FaWifi style={{ color: "var(--primary-color)", fontSize: 22 }} />
                <h3>Standard Home</h3>
              </PlanHeader>
              <Price>₹399 <small>/ month</small></Price>
              <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>40 Mbps • Unlimited Data</div>
              <PlanList>
                <li>Ideal for families & HD streaming</li>
                <li>Free router on annual plan</li>
                <li>99.9% uptime SLA</li>
              </PlanList>
              <PlanButton to="/broadband">Choose Plan <FaArrowRight /></PlanButton>
            </PlanCard>

            {/* Turbo */}
            <PlanCard
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              whileHover={{ scale: 1.015 }}
            >
              <PlanHeader>
                <FaWifi style={{ color: "#ffb81a", fontSize: 22 }} />
                <h3>Turbo</h3>
              </PlanHeader>
              <Price>₹749 <small>/ month</small></Price>
              <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>150 Mbps • Unlimited Data</div>
              <PlanList>
                <li>Gaming, 4K streaming, heavy downloads</li>
                <li>Low latency routing</li>
                <li>Free installation</li>
              </PlanList>
              <PlanButton to="/broadband">Go Turbo <FaArrowRight /></PlanButton>
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
            <p>Don’t just take our word for it — hear from our satisfied customers</p>
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
                    “{t.quote}”
                  </p>
                  <p style={{ fontWeight: 800, color: "var(--primary-color)" }}>— {t.author}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section>
        <Container style={{ textAlign: "center" }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: ".75rem" }}>Ready to Get Started?</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
            Join thousands of satisfied customers enjoying our premium services
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <PrimaryButton as="a" href="tel:+916295932396" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaPhone /> Call Now: +91 62959 32396
            </PrimaryButton>
          </div>
        </Container>
      </Section>
    </PageWrap>
  );
};

export default Home;
