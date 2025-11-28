// src/pages/Broadband.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaArrowRight, FaDownload, FaUpload, FaInfinity, FaStar, FaWhatsapp } from 'react-icons/fa';
import styled from 'styled-components';

/* ====================== THEME WRAPPER ====================== */
const Page = styled.div`
  --primary-color: #0056b3;
  --primary-dark: #004494;
  --text-primary: #ffffff;
  --text-secondary: #cfcfcf;
  --accent-color: #ff9900;

  --page-bg: #000000;
  --card: #111111;
  --card-2: #0a0a0a;
  --border-color: #222222;

  --radius-md: 10px;
  --radius-lg: 16px;

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.6);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.7);

  background: var(--page-bg);
  color: var(--text-primary);
`;

/* ========================= HERO ========================= */
const HeroSection = styled.section`
  position: relative;
  background:
    radial-gradient(1200px 500px at 50% -20%, rgba(21, 58, 113, 0.2), transparent 60%),
    linear-gradient(180deg, #153a71, #10294c);
  color: #ffffff;
  padding: 6rem 1rem 4rem;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  margin-bottom: .8rem;
  letter-spacing: .2px;
  text-shadow: 0 2px 10px rgba(0,0,0,.5);
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: .95;
  max-width: 760px;
  margin: 0 auto;
  color: #e5e7eb;
`;

/* ======================= ACTIONS ======================== */
const ActionButtonsSection = styled.section`
  padding: 2.5rem 1rem 3rem;
  background: transparent;
  border-bottom: 1px solid var(--border-color);
`;

const ActionsHeader = styled.div`
  text-align: center;
  .section-title { font-size: 1.75rem; font-weight: 900; margin: 0 0 .35rem; }
  .section-subtitle { color: var(--text-secondary); margin: 0; }
`;

const ActionButtonsContainer = styled.div`
  display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  background: ${p => p.primary ? 'var(--primary-color)' : 'transparent'};
  color: ${p => p.primary ? '#fff' : 'var(--primary-color)'};
  border: 2px solid var(--primary-color);
  padding: .9rem 1.4rem;
  border-radius: var(--radius-md);
  font-weight: 800;
  letter-spacing: .2px;
  min-width: 210px;
  cursor: pointer;
  transition: all .25s ease;
  display: inline-flex; align-items: center; justify-content: center; gap: .6rem;
  box-shadow: ${p => p.primary ? '0 8px 24px rgba(255,102,0,.35)' : 'none'};

  &:hover {
    background: var(--primary-dark);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(255,102,0,.45);
  }
`;

/* ========================= PLANS ======================== */
const PlansSection = styled.section`
  padding: 3.5rem 1rem 4rem;
`;

const PlansHeader = styled.div`
  text-align: center;
  .section-title { font-size: 1.9rem; font-weight: 900; margin: 0 0 .4rem; }
  .section-subtitle { color: var(--text-secondary); margin: 0; }
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
  margin-top: 2rem;
`;

const PlanCard = styled(motion.div)`
  background: ${p => p.featured ? 'linear-gradient(180deg, rgba(255,102,0,.08), rgba(255,102,0,.03))' : 'var(--card)'};
  border: 1px solid ${p => p.featured ? 'rgba(255,102,0,.45)' : 'var(--border-color)'};
  border-radius: var(--radius-lg);
  padding: 1.6rem 1.25rem 1.25rem;
  box-shadow: var(--shadow-md);
  position: relative;
  transition: all .25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color);
  color: white;
  padding: .45rem .85rem;
  border-radius: 999px;
  font-size: .8rem;
  font-weight: 900;
  letter-spacing: .3px;
  box-shadow: 0 10px 26px rgba(255,102,0,.4);
`;

const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: 1.25rem;
`;

const PlanName = styled.h3`
  font-size: 1.2rem;
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: .35rem;
`;

const PlanSpeed = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: .25rem;
  text-shadow: 0 2px 12px rgba(255,102,0,.18);
`;

const PlanPrice = styled.div`
  margin-bottom: .2rem;
`;

const PlanPriceAmount = styled.span`
  display: inline-flex; align-items: baseline; gap: .3rem;
  font-size: 2.1rem; font-weight: 900; color: #fff;
  text-shadow: 0 2px 12px rgba(0,0,0,.45);
  &::before { content: "₹"; font-size: 1.1rem; font-weight: 900; color: var(--primary-color); }
`;

const PricePer = styled.small`
  color: var(--text-secondary);
  font-weight: 700;
  margin-left: .35rem;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  margin: 1rem 0 1.25rem;
  padding-left: 0;
`;

const PlanFeature = styled.li`
  display: flex; align-items: center; gap: .5rem;
  margin-bottom: .65rem;
  color: var(--text-secondary);
  svg { color: var(--primary-color); flex-shrink: 0; }
`;

const BuyButton = styled.a`
  width: 100%;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: .95rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 900;
  letter-spacing: .2px;
  font-size: 1rem;
  cursor: pointer;
  transition: all .25s ease;
  box-shadow: 0 8px 24px rgba(255,102,0,.35);
  text-decoration: none;
  display: block;
  text-align: center;

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(255,102,0,.5);
    color: white;
    text-decoration: none;
  }
`;

/* ======================== FEATURES ======================= */
const FeaturesSection = styled.section`
  padding: 3.5rem 1rem 4rem;
  border-top: 1px solid var(--border-color);
`;

const FeaturesHeader = styled.div`
  text-align: center;
  .section-title { font-size: 1.9rem; font-weight: 900; margin: 0 0 .35rem; }
  .section-subtitle { color: var(--text-secondary); margin: 0; }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  background: var(--card-2);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  text-align: center;
  padding: 1.6rem 1.25rem;
  box-shadow: var(--shadow-md);
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: .6rem;
`;

const FeatureTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 900;
  margin-bottom: .35rem;
  color: var(--text-primary);
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
`;

/* ======================= COVERAGE ======================= */
const CoverageSection = styled.section`
  padding: 3.5rem 1rem 4rem;
  border-top: 1px solid var(--border-color);
`;

const CoverageHeader = styled.div`
  text-align: center;
  .section-title { font-size: 1.9rem; font-weight: 900; margin: 0 0 .35rem; }
  .section-subtitle { color: var(--text-secondary); margin: 0; }
`;

const CoverageForm = styled.div`
  max-width: 520px;
  margin: 1.75rem auto 0;
  background: var(--card);
  border: 1px solid var(--border-color);
  padding: 1.6rem 1.25rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
`;

const FormGroup = styled.div`
  margin-bottom: 1.1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: .45rem;
  font-weight: 800;
  color: var(--text-primary);
`;

const FormInput = styled.input`
  width: 100%;
  padding: .8rem .9rem;
  background: #ffffff;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(21, 58, 113, 0.15);
  }
`;

const CheckButton = styled.button`
  width: 100%;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: .95rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 900;
  letter-spacing: .2px;
  font-size: 1rem;
  cursor: pointer;
  transition: all .25s ease;
  box-shadow: 0 8px 24px rgba(255,102,0,.35);

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(255,102,0,.5);
  }
`;

/* ========================= PAGE ========================= */
const Broadband = () => {
  const [pincode, setPincode] = useState('');
  const navigate = useNavigate();

  const plans = [
    // NEW: Student plan at ₹199
    {
      name: 'Student',
      speed: '15 Mbps',
      price: 199,
      duration: 'month',
      features: [
        'Unlimited Data',
        'Free Installation in launch areas',
        '24/7 Priority Chat Support',
        'Perfect for classes & research'
      ],
      featured: true,
      badge: 'Student Special'
    },
    {
      name: 'Basic',
      speed: '50 Mbps',
      price: 499,
      duration: 'month',
      features: ['Unlimited Data', 'Free Installation', '24/7 Support', 'No Hidden Charges'],
      featured: false
    },
    {
      name: 'Standard',
      speed: '100 Mbps',
      price: 799,
      duration: 'month',
      features: ['Unlimited Data', 'Free Installation', '24/7 Support', 'No Hidden Charges', 'Free Router', 'Static IP'],
      featured: true
    },
    {
      name: 'Premium',
      speed: '500 Mbps',
      price: 1299,
      duration: 'month',
      features: ['Unlimited Data', 'Free Installation', '24/7 Priority Support', 'No Hidden Charges', 'Free Router', 'Static IP', 'Gaming Optimized'],
      featured: false
    },
    {
      name: 'Ultra',
      speed: '1 Gbps',
      price: 1999,
      duration: 'month',
      features: ['Unlimited Data', 'Free Installation', '24/7 Priority Support', 'No Hidden Charges', 'Free Router', 'Static IP', 'Gaming Optimized', 'Dedicated Bandwidth'],
      featured: false
    }
  ];

  const features = [
    { icon: <FaDownload />, title: 'High-Speed Downloads', description: 'Download large files, movies, and games in seconds' },
    { icon: <FaUpload />, title: 'Fast Upload Speeds', description: 'Perfect for video calls, streaming, and cloud backups' },
    { icon: <FaInfinity />, title: 'Unlimited Data', description: 'No data caps or throttling — use as much as you need' },
    { icon: <FaStar />, title: 'Premium Support', description: '24/7 customer support with a dedicated technical team' }
  ];

  const handleCheckCoverage = () => {
    if (pincode && /^\d{6}$/.test(pincode)) {
      alert(`Checking coverage for pincode: ${pincode}`);
    } else {
      alert('Please enter a valid 6-digit pincode');
    }
  };

  return (
    <Page>
      {/* HERO */}
      <HeroSection>
        <Container>
          <HeroTitle>High-Speed Broadband Plans</HeroTitle>
          <HeroSubtitle>
            Experience lightning-fast internet with speeds up to 1Gbps. Perfect for streaming, gaming, and work from home.
          </HeroSubtitle>
        </Container>
      </HeroSection>
      {/* PLANS */}
      <PlansSection className="plans-section-anchor">
        <Container>
          <PlansHeader>
            <h2 className="section-title">Choose Your Plan</h2>
            <p className="section-subtitle">All plans include unlimited data, free installation, and 24/7 support</p>
          </PlansHeader>

          <PlansGrid>
            {plans.map((plan, index) => (
              <PlanCard
                key={index}
                featured={plan.featured}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                {(plan.badge || plan.featured) && (
                  <FeaturedBadge>{plan.badge || 'Most Popular'}</FeaturedBadge>
                )}

                <PlanHeader>
                  <PlanName>{plan.name}</PlanName>
                  <PlanSpeed>{plan.speed}</PlanSpeed>
                  <PlanPrice>
                    <PlanPriceAmount>{plan.price}</PlanPriceAmount>
                    <PricePer>/ {plan.duration}</PricePer>
                  </PlanPrice>
                </PlanHeader>

                <PlanFeatures>
                  {plan.features.map((feature, i) => (
                    <PlanFeature key={i}>
                      <FaCheck />
                      {feature}
                    </PlanFeature>
                  ))}
                </PlanFeatures>

                <BuyButton href="tel:+916295932396">
                  Call Us <FaArrowRight />
                </BuyButton>
              </PlanCard>
            ))}
          </PlansGrid>
        </Container>
      </PlansSection>

      {/* FEATURES */}
      <FeaturesSection>
        <Container>
          <FeaturesHeader>
            <h2 className="section-title">Why Choose Our Broadband?</h2>
            <p className="section-subtitle">Speed, reliability, and support — without compromises.</p>
          </FeaturesHeader>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

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

    </Page>
  );
};

export default Broadband;
