import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCreditCard, FaTv, FaWifi, FaGamepad, FaFileInvoiceDollar, FaCog, FaHeadset, FaDownload, FaUpload, FaHistory, FaWhatsapp } from 'react-icons/fa';
import styled from 'styled-components';

const PortalContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-secondary);
  padding: 2rem 0;
`;

const PortalHeader = styled.div`
  background: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
`;

const WelcomeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

const UserDetails = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }
  
  p {
    color: var(--text-secondary);
  }
`;

const AccountStatus = styled.div`
  background: #dcfce7;
  color: #16a34a;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: 0.875rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ServiceIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.color || 'var(--primary-color)'};
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
`;

const ServiceInfo = styled.div`
  flex: 1;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
`;

const ServiceStatus = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.active ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.active ? '#16a34a' : '#dc2626'};
`;

const ServiceDetails = styled.div`
  margin-bottom: 1.5rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const DetailValue = styled.span`
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.875rem;
`;

const ServiceActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: white;
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
`;

const BillsSection = styled.div`
  background: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
  }
`;

const ViewAllButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-dark);
  }
`;

const BillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const BillCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: var(--shadow-sm);
  }
`;

const BillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const BillTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const BillAmount = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const BillDate = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const BillStatus = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => {
    if (props.status === 'paid') return '#dcfce7';
    if (props.status === 'pending') return '#fef3c7';
    return '#fee2e2';
  }};
  color: ${props => {
    if (props.status === 'paid') return '#16a34a';
    if (props.status === 'pending') return '#d97706';
    return '#dc2626';
  }};
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const QuickActionCard = styled(motion.div)`
  background: white;
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

const QuickActionIcon = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const QuickActionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const QuickActionDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const CustomerPortal = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const services = [
    {
      name: 'Broadband',
      icon: <FaWifi />,
      color: '#2563eb',
      status: 'Active',
      plan: 'Standard 100 Mbps',
      price: '₹799/month',
      usage: '45 GB used / Unlimited',
      dueDate: '15 Dec 2024'
    },
    {
      name: 'Cable TV',
      icon: <FaTv />,
      color: '#f59e0b',
      status: 'Active',
      plan: 'Premium Pack',
      price: '₹499/month',
      channels: '300+ Channels',
      dueDate: '15 Dec 2024'
    },
    {
      name: 'Genie+ OTT',
      icon: <FaTv />,
      color: '#10b981',
      status: 'Active',
      plan: 'Premium Pack',
      price: '₹399/month',
      apps: '20+ Apps',
      dueDate: '15 Dec 2024'
    },
    {
      name: 'Cloud Gaming',
      icon: <FaGamepad />,
      color: '#8b5cf6',
      status: 'Inactive',
      plan: 'Gamer Pack',
      price: '₹499/month',
      games: '100+ Games',
      dueDate: 'N/A'
    }
  ];

  const bills = [
    {
      title: 'Broadband Bill',
      amount: '₹799',
      date: 'Dec 2024',
      status: 'pending'
    },
    {
      title: 'Cable TV Bill',
      amount: '₹499',
      date: 'Dec 2024',
      status: 'pending'
    },
    {
      title: 'Genie+ Bill',
      amount: '₹399',
      date: 'Nov 2024',
      status: 'paid'
    },
    {
      title: 'Broadband Bill',
      amount: '₹799',
      date: 'Nov 2024',
      status: 'paid'
    }
  ];

  const quickActions = [
    {
      icon: <FaCreditCard />,
      title: 'Pay Bills',
      description: 'Pay your pending bills online'
    },
    {
      icon: <FaCog />,
      title: 'Manage Plans',
      description: 'Upgrade or change your plans'
    },
    {
      icon: <FaHeadset />,
      title: 'Get Support',
      description: 'Contact customer support'
    },
    {
      icon: <FaDownload />,
      title: 'Download Invoice',
      description: 'Download your latest invoices'
    }
  ];

  const handleQuickAction = (action) => {
    alert(`${action} functionality would be implemented here`);
  };

  return (
    <PortalContainer>
      <div className="container">
        <PortalHeader>
          <WelcomeSection>
            <UserInfo>
              <UserAvatar>
                {user?.name?.charAt(0) || 'U'}
              </UserAvatar>
              <UserDetails>
                <h2>Welcome back, {user?.name || 'User'}!</h2>
                <p>Customer ID: {user?.id || 'N/A'}</p>
              </UserDetails>
            </UserInfo>
            <AccountStatus>Account Active</AccountStatus>
          </WelcomeSection>
        </PortalHeader>

        <QuickActions>
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              onClick={() => handleQuickAction(action.title)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <QuickActionIcon>{action.icon}</QuickActionIcon>
              <QuickActionTitle>{action.title}</QuickActionTitle>
              <QuickActionDescription>{action.description}</QuickActionDescription>
            </QuickActionCard>
          ))}
        </QuickActions>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ServiceHeader>
                <ServiceIcon color={service.color}>
                  {service.icon}
                </ServiceIcon>
                <ServiceInfo>
                  <h3>{service.name}</h3>
                  <p>{service.plan}</p>
                </ServiceInfo>
                <ServiceStatus active={service.status === 'Active'}>
                  {service.status}
                </ServiceStatus>
              </ServiceHeader>

              <ServiceDetails>
                <DetailRow>
                  <DetailLabel>Plan</DetailLabel>
                  <DetailValue>{service.plan}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Price</DetailLabel>
                  <DetailValue>{service.price}</DetailValue>
                </DetailRow>
                {service.usage && (
                  <DetailRow>
                    <DetailLabel>Usage</DetailLabel>
                    <DetailValue>{service.usage}</DetailValue>
                  </DetailRow>
                )}
                {service.channels && (
                  <DetailRow>
                    <DetailLabel>Channels</DetailLabel>
                    <DetailValue>{service.channels}</DetailValue>
                  </DetailRow>
                )}
                {service.apps && (
                  <DetailRow>
                    <DetailLabel>Apps</DetailLabel>
                    <DetailValue>{service.apps}</DetailValue>
                  </DetailRow>
                )}
                {service.games && (
                  <DetailRow>
                    <DetailLabel>Games</DetailLabel>
                    <DetailValue>{service.games}</DetailValue>
                  </DetailRow>
                )}
                <DetailRow>
                  <DetailLabel>Due Date</DetailLabel>
                  <DetailValue>{service.dueDate}</DetailValue>
                </DetailRow>
              </ServiceDetails>

              <ServiceActions>
                <ActionButton>Manage</ActionButton>
                <ActionButton>Upgrade</ActionButton>
                <ActionButton>Support</ActionButton>
              </ServiceActions>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <BillsSection>
          <SectionHeader>
            <h3>Recent Bills</h3>
            <ViewAllButton>View All Bills</ViewAllButton>
          </SectionHeader>
          
          <BillsGrid>
            {bills.map((bill, index) => (
              <BillCard key={index}>
                <BillHeader>
                  <BillTitle>{bill.title}</BillTitle>
                  <BillAmount>{bill.amount}</BillAmount>
                </BillHeader>
                <BillDate>{bill.date}</BillDate>
                <BillStatus status={bill.status}>
                  {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                </BillStatus>
              </BillCard>
            ))}
          </BillsGrid>
        </BillsSection>
      </div>

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

    </PortalContainer>
  );
};

export default CustomerPortal; 