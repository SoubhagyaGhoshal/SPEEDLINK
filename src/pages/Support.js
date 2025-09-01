// src/pages/Support.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaHeadset, FaRobot, FaPhone, FaEnvelope, FaComments,
  FaSearch, FaChevronDown, FaChevronUp, FaClock, FaMapMarkerAlt
} from 'react-icons/fa';
import styled from 'styled-components';

/* ====================== THEME WRAPPER ====================== */
const Page = styled.div`
  /* SPEEDLINK dark + orange palette (fallbacks if not injected globally) */
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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

/* ========================= HERO ========================= */
const HeroSection = styled.section`
  position: relative;
  background:
    radial-gradient(1200px 500px at 50% -20%, rgba(255,102,0,.12), transparent 60%),
    linear-gradient(180deg, rgba(0,0,0,.85), rgba(0,0,0,.85));
  color: var(--text-primary);
  padding: 6rem 1rem 4rem;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0,0,0,.5);
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: .95;
  max-width: 760px;
  margin: 0 auto;
  color: var(--text-secondary);
`;

/* ======================== SUPPORT CARDS ======================== */
const SupportWrap = styled.section`
  padding: 3.5rem 0 4rem;
  border-bottom: 1px solid var(--border-color);
`;

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const SupportCard = styled(motion.div)`
  background: var(--card);
  border-radius: var(--radius-lg);
  padding: 1.6rem 1.25rem;
  box-shadow: var(--shadow-md);
  text-align: center;
  border: 1px solid var(--border-color);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
  }
`;

const SupportIcon = styled.div`
  font-size: 2.25rem;
  color: var(--primary-color);
  margin-bottom: .75rem;
`;

const SupportTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 900;
  margin-bottom: .5rem;
`;

const SupportDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const SupportButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: .85rem 1.1rem;
  border-radius: var(--radius-md);
  font-weight: 900;
  letter-spacing: .2px;
  cursor: pointer;
  transition: all .25s ease;
  box-shadow: 0 8px 24px rgba(255,102,0,.35);
  display: inline-flex; align-items: center; gap: .5rem;

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(255,102,0,.5);
  }
`;

/* ========================= CHATBOT ========================= */
const ChatbotSection = styled.section`
  padding: 3.5rem 0 4rem;
`;

const ChatbotContainer = styled.div`
  max-width: 680px;
  margin: 0 auto;
  background: var(--card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
`;

const ChatbotHeader = styled.div`
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  padding: 1.25rem 1rem;
  display: flex; align-items: center; gap: .8rem;
  h3 { margin: 0; font-size: 1.1rem; font-weight: 900; }
  small { opacity: .95; }
`;

const ChatbotBody = styled.div`
  padding: 1.25rem 1rem;
  min-height: 360px;
  max-height: 480px;
  overflow-y: auto;
  background: #0f1216;
`;

const ChatMessage = styled.div`
  margin-bottom: .8rem;
  display: flex;
`;

const ChatBubble = styled.div`
  background: ${p => p.isUser ? 'var(--primary-color)' : 'var(--card-2)'};
  color: ${p => p.isUser ? '#fff' : 'var(--text-primary)'};
  padding: .7rem .9rem;
  border-radius: var(--radius-md);
  max-width: 80%;
  box-shadow: var(--shadow-sm);
`;

const ChatInput = styled.div`
  padding: .9rem;
  border-top: 1px solid var(--border-color);
  display: flex; gap: .6rem;
  background: var(--card);
`;

const Input = styled.input`
  flex: 1;
  padding: .8rem .9rem;
  background: #0f1216;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(255,102,0,.15);
  }
`;

const SendButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: .85rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 900;
  letter-spacing: .2px;
  box-shadow: 0 8px 24px rgba(255,102,0,.35);
  transition: all .25s ease;

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(255,102,0,.5);
  }
`;

/* ========================= CONTACT ========================= */
const ContactSection = styled.section`
  padding: 3.5rem 0 4rem;
  border-top: 1px solid var(--border-color);
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const ContactCard = styled.div`
  text-align: center;
  padding: 1.6rem 1.25rem;
  background: var(--card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
  }
`;

const ContactIcon = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: .6rem;
`;

const ContactTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 900;
  margin-bottom: .35rem;
`;

const ContactInfo = styled.p`
  color: var(--text-secondary);
  margin: 0;
`;

/* ========================= FAQ ========================= */
const FAQSection = styled.section`
  padding: 3.5rem 0 4rem;
  background: transparent;
  border-top: 1px solid var(--border-color);
`;

const FAQContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const SearchSection = styled.div`
  margin-bottom: 1.25rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: #0f1216;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(255,102,0,.15);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: .9rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
`;

const FAQItem = styled.div`
  background: var(--card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  margin-bottom: .9rem;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`;

const FAQQuestion = styled.div`
  padding: 1.1rem 1rem;
  cursor: pointer;
  display: flex; justify-content: space-between; align-items: center;
  font-weight: 900; color: var(--text-primary);
  transition: background-color .2s ease;
  &:hover { background: #0f1216; }
`;

const FAQAnswer = styled.div`
  padding: 0 1rem 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  display: ${p => (p.isOpen ? 'block' : 'none')};
`;

/* ========================= PAGE ========================= */
const Support = () => {
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    { question: "How do I check my broadband speed?",
      answer: "Visit our Speed Test page. For accurate results, connect via LAN, close downloads/streams, and pause other devices." },
    { question: "What should I do if my internet is slow?",
      answer: "Restart the router, check cables, disconnect heavy-usage devices, then contact 24/7 support if needed." },
    { question: "How can I upgrade my plan?",
      answer: "Upgrade via your customer portal or call support. Changes usually activate within 24 hours." },
    { question: "What payment methods do you accept?",
      answer: "Cards, UPI, net banking, and wallets (Paytm, PhonePe, GPay). Payments also available in the SPEEDLINK app." },
    { question: "How do I report a service outage?",
      answer: "Report via the app/portal or call our hotline. We’ll post real-time restoration updates." },
    { question: "Can I use my own router?",
      answer: "Yes. For best performance, we recommend our pre-configured router. BYO routers are supported." },
    { question: "What is the installation process?",
      answer: "Technician visit, ONT/router setup, and testing. Typical duration: 1–2 hours." },
    { question: "How do I cancel my subscription?",
      answer: "Cancel in the portal or by calling support. Early termination fees may apply per plan terms." }
  ];

  const filteredFAQs = faqs.filter(f =>
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { text: chatInput, isUser: true };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Simulated AI response
    setTimeout(() => {
      const aiMsg = {
        text: "Thanks! A specialist will follow up soon. For urgent help, call our 24/7 line: 1800-123-4567.",
        isUser: false
      };
      setChatMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  const toggleFAQ = (i) => setOpenFAQ(openFAQ === i ? null : i);

  return (
    <Page>
      {/* HERO */}
      <HeroSection>
        <Container>
          <HeroTitle>24/7 Customer Support</HeroTitle>
          <HeroSubtitle>
            We’re here to help—anytime. Get instant answers via AI Assistant, live chat, or our dedicated phone support.
          </HeroSubtitle>
        </Container>
      </HeroSection>

      {/* SUPPORT OPTIONS */}
      <SupportWrap>
        <Container>
          <h2 className="section-title" style={{ textAlign: 'center', fontWeight: 900 }}>How Can We Help You?</h2>

          <SupportGrid>
            <SupportCard initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
              <SupportIcon><FaRobot /></SupportIcon>
              <SupportTitle>AI Chatbot</SupportTitle>
              <SupportDescription>Instant answers to common questions with our intelligent assistant.</SupportDescription>
              <SupportButton onClick={() => document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Chat <FaComments />
              </SupportButton>
            </SupportCard>

            <SupportCard initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: .05 }}>
              <SupportIcon><FaPhone /></SupportIcon>
              <SupportTitle>24/7 Phone Support</SupportTitle>
              <SupportDescription>Speak directly with an expert anytime, day or night.</SupportDescription>
              <SupportButton as="a" href="tel:18001234567">
                Call Now <FaPhone />
              </SupportButton>
            </SupportCard>

            <SupportCard initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: .1 }}>
              <SupportIcon><FaHeadset /></SupportIcon>
              <SupportTitle>Live Chat</SupportTitle>
              <SupportDescription>Chat with our agents in real-time for immediate assistance.</SupportDescription>
              <SupportButton onClick={() => document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Chat <FaComments />
              </SupportButton>
            </SupportCard>
          </SupportGrid>
        </Container>
      </SupportWrap>

      {/* CHATBOT */}
      <ChatbotSection id="chatbot">
        <Container>
          <h2 className="section-title" style={{ textAlign: 'center', fontWeight: 900 }}>AI Assistant</h2>
          <ChatbotContainer>
            <ChatbotHeader>
              <FaRobot />
              <div>
                <h3>SPEEDLINK AI Assistant</h3>
                <small>Online • Available 24/7</small>
              </div>
            </ChatbotHeader>

            <ChatbotBody>
              {chatMessages.map((m, i) => (
                <ChatMessage key={i} style={{ justifyContent: m.isUser ? 'flex-end' : 'flex-start' }}>
                  <ChatBubble isUser={m.isUser}>{m.text}</ChatBubble>
                </ChatMessage>
              ))}
            </ChatbotBody>

            <ChatInput>
              <Input
                type="text"
                placeholder="Type your message…"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <SendButton onClick={handleSendMessage}>Send</SendButton>
            </ChatInput>
          </ChatbotContainer>
        </Container>
      </ChatbotSection>

      {/* CONTACT */}
      <ContactSection>
        <Container>
          <h2 className="section-title" style={{ textAlign: 'center', fontWeight: 900 }}>Contact Information</h2>

          <ContactGrid>
            <ContactCard>
              <ContactIcon><FaPhone /></ContactIcon>
              <ContactTitle>24/7 Support Line</ContactTitle>
              <ContactInfo>+91 6295932396</ContactInfo>
            </ContactCard>

            <ContactCard>
              <ContactIcon><FaEnvelope /></ContactIcon>
              <ContactTitle>Email Support</ContactTitle>
              <ContactInfo>
                <a href="mailto:soubhagyag73@gmail.com" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                  soubhagyag73@gmail.com
                </a>
              </ContactInfo>
            </ContactCard>

            <ContactCard>
              <ContactIcon><FaClock /></ContactIcon>
              <ContactTitle>Service Hours</ContactTitle>
              <ContactInfo>Always On • 24/7</ContactInfo>
            </ContactCard>

            <ContactCard>
              <ContactIcon><FaMapMarkerAlt /></ContactIcon>
              <ContactTitle>Service Centers</ContactTitle>
              <ContactInfo>Find the nearest center from your portal</ContactInfo>
            </ContactCard>
          </ContactGrid>
        </Container>
      </ContactSection>

      {/* FAQ */}
      <FAQSection>
        <Container>
          <h2 className="section-title" style={{ textAlign: 'center', fontWeight: 900 }}>Frequently Asked Questions</h2>
          <FAQContainer>
            <SearchSection>
              <SearchIcon><FaSearch /></SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search FAQs…"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </SearchSection>

            {filteredFAQs.map((faq, i) => (
              <FAQItem key={i}>
                <FAQQuestion onClick={() => toggleFAQ(i)}>
                  {faq.question}
                  {openFAQ === i ? <FaChevronUp /> : <FaChevronDown />}
                </FAQQuestion>
                <FAQAnswer isOpen={openFAQ === i}>{faq.answer}</FAQAnswer>
              </FAQItem>
            ))}
          </FAQContainer>
        </Container>
      </FAQSection>
    </Page>
  );
};

export default Support;
