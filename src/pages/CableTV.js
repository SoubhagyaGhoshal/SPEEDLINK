// src/pages/CableTV.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaTv, FaCheck, FaArrowRight, FaStar, FaVideo, FaCircle, FaWhatsapp } from 'react-icons/fa';
import styled from 'styled-components';

/* ====================== THEME WRAPPER ====================== */
const Page = styled.div`
  --primary-color: var(--primary-color, #ff6600);
  --primary-dark: var(--primary-dark, #e65c00);
  --text-primary: var(--text-primary, #ffffff);
  --text-secondary: var(--text-secondary, #cfcfcf);
  --accent-color: var(--accent-color, #ff6600);

  --page-bg: #0b0f14;
  --card: #111315;
  --card-2: #12161a;
  --border-color: #22272b;

  --radius-md: 10px;
  --radius-lg: 16px;

  --shadow-sm: 0 2px 10px rgba(0,0,0,.35);
  --shadow-md: 0 6px 22px rgba(0,0,0,.45);
  --shadow-lg: 0 12px 40px rgba(0,0,0,.6);

  background: var(--page-bg);
  color: var(--text-primary);
`;

/* ========================= HERO ========================= */
const HeroSection = styled.section`
  position: relative;
  background:
    radial-gradient(1200px 500px at 50% -20%, rgba(255,102,0,.12), transparent 60%),
    linear-gradient(180deg, rgba(0,0,0,.85), rgba(0,0,0,.85));
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
  letter-spacing: .2px;
  margin: 0 0 0.75rem;
  color: var(--text-primary);
  text-shadow: 0 2px 10px rgba(0,0,0,.5);
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 760px;
  margin: 0 auto;
`;

/* ======================== FILTERS ======================= */
const FiltersSection = styled.section`
  padding: 1.5rem 1rem 2rem;
  background: transparent;
  border-bottom: 1px solid var(--border-color);
`;

const FilterContainer = styled.div`
  display: flex; gap: .75rem; flex-wrap: wrap; justify-content: center;
`;

const FilterButton = styled.button`
  padding: .55rem 1rem;
  border: 1px solid var(--border-color);
  background: ${p => p.active ? 'var(--primary-color)' : 'var(--card)'};
  color: ${p => p.active ? '#fff' : 'var(--text-secondary)'};
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all .25s ease;
  font-size: .9rem;
  &:hover { border-color: var(--primary-color); color: #fff; }
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
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1.25rem;
  margin-top: 2rem;
`;

const PlanCard = styled(motion.div)`
  background: ${p => p.featured ? 'linear-gradient(180deg, rgba(255,102,0,.08), rgba(255,102,0,.03))' : 'var(--card)'};
  border: 1px solid ${p => p.featured ? 'rgba(255,102,0,.45)' : 'var(--border-color)'};
  border-radius: var(--radius-lg);
  padding: 1.4rem 1.25rem 1.25rem;
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
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: var(--primary-color);
  color: #fff;
  padding: .45rem .85rem;
  border-radius: 999px;
  font-size: .8rem;
  font-weight: 900;
  letter-spacing: .3px;
  box-shadow: 0 10px 26px rgba(255,102,0,.4);
`;

const PlanHeader = styled.div`
  text-align: center; margin-bottom: 1.1rem;
`;

const PlanName = styled.h3`
  font-size: 1.2rem; font-weight: 900; color: var(--text-primary); margin: 0 0 .25rem;
`;

const PlanChannels = styled.div`
  font-size: 1rem; color: var(--text-secondary); margin-bottom: .35rem;
  display: inline-flex; gap: .5rem; align-items: center;
`;

const PlanPrice = styled.div`
  margin-top: .25rem;
`;

const PlanPriceAmount = styled.span`
  display: inline-flex; align-items: baseline; gap: .3rem;
  font-size: 2.2rem; font-weight: 900; color: #fff;
  text-shadow: 0 2px 12px rgba(0,0,0,.45);
  &::before { content: "₹"; font-size: 1.2rem; font-weight: 900; color: var(--primary-color); }
`;

const PricePer = styled.small`
  color: var(--text-secondary);
  font-weight: 700;
  margin-left: .35rem;
`;

const ChannelList = styled.div`
  margin: .9rem 0 1.25rem;
`;

const ChannelCategory = styled.div`
  margin-bottom: 1rem;
`;

const CategoryTitle = styled.h4`
  font-size: .95rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 .5rem;
`;

const ChannelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: .45rem .75rem;
`;

const ChannelItem = styled.div`
  display: inline-flex; align-items: center; gap: .35rem;
  font-size: .9rem; color: var(--text-secondary);
  svg { color: var(--primary-color); font-size: .7rem; }
`;

const BuyButton = styled.a`
  width: 100%;
  background: var(--primary-color);
  color: #fff;
  border: 0;
  padding: .9rem 1rem;
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
    color: #fff;
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

/* ========================= PAGE ========================= */
const CableTV = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const plans = [
    {
      name: 'BENGALI PRIME',
      channels: 47, // 3 + 7 + 37
      price: 225,
      duration: 'month',
      featured: true,
      quality: 'SD',
      region: 'all',
      categories: {
        'IN10 Value Pack (3)': ['EPIC TV', 'GUBBARE', 'ISHARA TV'],
        'WBD Life SD (7)': [
          'EUROSPORT',
          'POGO',
          'CARTOON NETWORK',
          'DISCOVERY KIDS',
          'DISCOVERY CHANNEL',
          'ANIMAL PLANET',
          'TLC'
        ],
        'A-La-Carte (37)': [
          'STAR JALSHA',
          'ZEE BANGLA',
          'COLORS BANGLA',
          'SONY AATH',
          'JALSHA MOVIES',
          'ZEE BANGLA CINEMA',
          'COLORS BANGLA CINEMA',
          'NEWS18 BANGLA',
          'ZEE 24 GHANTA',
          'STAR PLUS',
          'COLORS',
          'STAR BHARAT',
          'ZOOM',
          'STAR GOLD',
          'COLORS CINEPLEX',
          'ZEE BHARAT',
          'CNBC AWAZ',
          'ZEE BUSINESS',
          'MTV',
          'STAR SPORTS 1 HINDI',
          'SONY SPORTS TEN 3 HINDI',
          'NICK',
          'SONIC',
          'NICK JR',
          'THE HISTORY CHANNEL',
          'CNN NEWS18',
          'INDIA TODAY',
          'NDTV 24X7',
          'CNBC TV18',
          'NEWS18 ASSAM/NORTH EAST',
          'NEWS18 BIHAR/JHARKHAND',
          'SALAAM TV',
          'ETV BALBHARAT SD',
          'STAR SPORTS 2 HINDI',
          'FOOD XP',
          'SONY MAX 1',
          'STAR SPORTS KHEL'
        ]
      }
    },
    {
      name: 'Premium Pack',
      channels: '300+',
      price: 499,
      duration: 'month',
      featured: false,
      quality: 'HD',
      region: 'all',
      categories: {
        'News': ['NDTV', 'CNN', 'BBC', 'Times Now', 'Republic TV'],
        'Entertainment': ['Colors', 'Sony', 'Zee TV', 'Star Plus', 'Colors HD'],
        'Movies': ['Movies Now', 'Zee Cinema', 'Sony Max', 'Star Movies'],
        'Sports': ['Star Sports', 'Sony Six', 'ESPN', 'Star Sports HD'],
        'Kids': ['Cartoon Network', 'Pogo', 'Nickelodeon'],
        'Music': ['MTV', 'VH1', '9XM']
      }
    },
    {
      name: 'Regional Pack',
      channels: '200+',
      price: 399,
      duration: 'month',
      featured: false,
      quality: 'HD',
      region: 'regional',
      categories: {
        'Regional News': ['ABP News', 'News18', 'TV9'],
        'Regional Entertainment': ['Sun TV', 'Gemini TV', 'Maa TV'],
        'Movies': ['Movies Now', 'Zee Cinema', 'Regional Movies'],
        'Sports': ['Star Sports', 'Sony Six'],
        'News': ['NDTV', 'CNN', 'BBC']
      }
    },
    {
      name: 'Ultra HD Pack',
      channels: '500+',
      price: 799,
      duration: 'month',
      featured: false,
      quality: '4K',
      region: 'all',
      categories: {
        'News': ['NDTV', 'CNN', 'BBC', 'Times Now', 'Republic TV'],
        'Entertainment': ['Colors', 'Sony', 'Zee TV', 'Star Plus', 'Colors HD'],
        'Movies': ['Movies Now', 'Zee Cinema', 'Sony Max', 'Star Movies', '4K Movies'],
        'Sports': ['Star Sports', 'Sony Six', 'ESPN', 'Star Sports HD'],
        'Kids': ['Cartoon Network', 'Pogo', 'Nickelodeon'],
        'Music': ['MTV', 'VH1', '9XM'],
        'Documentary': ['Discovery', 'Nat Geo', 'History']
      }
    }
  ];

  const features = [
    { icon: <FaVideo />, title: 'HD & 4K Quality', description: 'Crystal clear viewing for movies, sports, and shows.' },
    { icon: <FaTv />,    title: '500+ Channels',   description: 'Regional + international lineups for every taste.' },
    { icon: <FaStar />,  title: 'Premium Content', description: 'Add premium genres any time — fully flexible.' },
    { icon: <FaCheck />, title: 'Quick Setup',     description: 'Fast activation in serviceable areas.' }
  ];

  const filters = [
    { id: 'all', label: 'All Packs' },
    { id: 'hd', label: 'HD Quality' },
    { id: 'sd', label: 'SD Quality' },
    { id: 'regional', label: 'Regional' }
  ];

  const filteredPlans = plans.filter(plan => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'hd' && plan.quality === 'HD') return true;
    if (activeFilter === 'regional' && plan.region === 'regional') return true;
    return false;
  });

  const renderQualityIcon = (quality) => {
    switch (quality) {
      case 'HD':  return <FaVideo style={{ color: '#10b981' }} title="HD" />;
      case '4K':  return <FaVideo style={{ color: '#8b5cf6' }} title="4K" />;
      default:    return <FaCircle style={{ color: '#6b7280' }} title="SD" />;
    }
  };

  return (
    <Page>
      {/* HERO */}
      <HeroSection>
        <Container>
          <HeroTitle>500+ Channels at Your Fingertips</HeroTitle>
          <HeroSubtitle>
            Enjoy premium entertainment with HD quality channels, regional content,
            and exclusive programming across all genres from <b>SPEEDLINK</b>.
          </HeroSubtitle>
        </Container>
      </HeroSection>

      {/* FILTERS */}
      <FiltersSection>
        <Container>
          <FilterContainer>
            {filters.map(filter => (
              <FilterButton
                key={filter.id}
                active={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </FilterButton>
            ))}
          </FilterContainer>
        </Container>
      </FiltersSection>

      {/* PLANS */}
      <PlansSection>
        <Container>
          <PlansHeader>
            <h2 className="section-title">Choose Your Channel Pack</h2>
            <p className="section-subtitle">
              Select from our range of channel packs designed for every viewer
            </p>
          </PlansHeader>

          <PlansGrid>
            {filteredPlans.map((plan, index) => (
              <PlanCard
                key={index}
                featured={plan.featured}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                {plan.featured && <FeaturedBadge>Most Popular</FeaturedBadge>}

                <PlanHeader>
                  <PlanName>{plan.name}</PlanName>
                  <PlanChannels>
                    {typeof plan.channels === 'number' ? `${plan.channels}` : plan.channels} Channels {renderQualityIcon(plan.quality)}
                  </PlanChannels>
                  <PlanPrice>
                    <PlanPriceAmount>{plan.price}</PlanPriceAmount>
                    <PricePer>/ {plan.duration}</PricePer>
                  </PlanPrice>
                </PlanHeader>

                <ChannelList>
                  {Object.entries(plan.categories).map(([category, channels]) => (
                    <ChannelCategory key={category}>
                      <CategoryTitle>{category}</CategoryTitle>
                      <ChannelGrid>
                        {channels.map((channel, i2) => (
                          <ChannelItem key={i2}>
                            <FaCheck />
                            {channel}
                          </ChannelItem>
                        ))}
                      </ChannelGrid>
                    </ChannelCategory>
                  ))}
                </ChannelList>

                <BuyButton
                  aria-label={`Call us for ${plan.name} plan - ₹${plan.price} per ${plan.duration}`}
                  href="tel:+916295932396"
                >
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
            <h2 className="section-title">Why Choose Our Cable TV?</h2>
            <p className="section-subtitle">Built for clarity, choice, and control.</p>
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

export default CableTV;
