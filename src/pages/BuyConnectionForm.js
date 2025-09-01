import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWifi, FaTv, FaArrowRight, FaCheckCircle, FaUser, FaHome, FaShieldAlt, FaClock } from 'react-icons/fa';
import './BuyConnectionForm.css';

const PLANS = [
  { id: 'student', name: 'Student Plan', speed: '15 Mbps', price: 199, tag: 'NEW', desc: 'Perfect for classes & light streaming', features: ['Unlimited Data', 'Free Installation', 'Priority Chat Support'] },
  { id: 'basic',   name: 'Basic',        speed: '50 Mbps', price: 499, tag: '',    desc: 'For everyday browsing & HD streaming', features: ['Unlimited Data', 'Free Installation', '24/7 Support'] },
  { id: 'std',     name: 'Standard',     speed: '100 Mbps',price: 799, tag: 'Popular', desc: 'Families, remote work, OTT', features: ['Unlimited Data', 'Free Installation', 'Free Router', 'Static IP'] },
  { id: 'premium', name: 'Premium',      speed: '500 Mbps',price: 1299,tag: '',    desc: 'Heavy streaming, downloads & gaming', features: ['Priority Support', 'Free Router', 'Static IP'] },
  { id: 'ultra',   name: 'Ultra',        speed: '1 Gbps',  price: 1999,tag: '',    desc: 'Power users & small offices', features: ['Dedicated BW', 'Priority Support', 'Free Router'] },
];

const AREAS = [
  { label: 'Katwa', value: 'Katwa', pincode: '713130', city: 'Bardhaman', state: 'West Bengal' },
  { label: 'Khajurdihi', value: 'Khajurdihi', pincode: '713150', city: 'Bardhaman', state: 'West Bengal' },
];

const STEPS = [
  { key: 'plan',    title: 'Choose Plan',    icon: <FaWifi /> },
  { key: 'details', title: 'Your Details',   icon: <FaUser /> },
  { key: 'address', title: 'Address',        icon: <FaHome /> },
  { key: 'otp',     title: 'Verify',         icon: <FaShieldAlt /> },
  { key: 'review',  title: 'Review & Pay',   icon: <FaClock /> },
];

const initialForm = {
  service: 'broadband',       // 'broadband' | 'cable'
  planId: 'student',          // default
  fullName: '',
  mobile: '',
  email: '',
  area: '',
  pincode: '',
  city: '',
  state: '',
  address1: '',
  address2: '',
  otp: '',
};

export default function BuyConnectionForm() {
  const navigate = useNavigate();

  const [stepIdx, setStepIdx] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const plan = useMemo(() => PLANS.find(p => p.id === form.planId), [form.planId]);
  const total = useMemo(() => plan ? plan.price : 0, [plan]);

  // sync area-derived geo
  useEffect(() => {
    if (!form.area) {
      setForm(prev => ({ ...prev, pincode: '', city: '', state: '' }));
      return;
    }
    const area = AREAS.find(a => a.value === form.area);
    if (area) {
      setForm(prev => ({ ...prev, pincode: area.pincode, city: area.city, state: area.state }));
    }
  }, [form.area]);

  // helpers
  const update = (name, value) => setForm(prev => ({ ...prev, [name]: value }));

  // validations per step
  const stepValid = useMemo(() => {
    switch (STEPS[stepIdx].key) {
      case 'plan':
        return !!form.planId && !!form.service;
      case 'details': {
        const phoneOk = /^[0-9]{10}$/.test(form.mobile);
        const nameOk  = form.fullName.trim().length >= 3;
        const emailOk = !form.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
        return phoneOk && nameOk && emailOk;
      }
      case 'address':
        return !!form.area && !!form.pincode && !!form.city && !!form.state && form.address1.trim().length >= 4;
      case 'otp':
        return otpSent && /^[0-9]{4,6}$/.test(form.otp);
      case 'review':
        return true;
      default: return false;
    }
  }, [form, stepIdx, otpSent]);

  const goNext = async () => {
    if (!stepValid) return;

    if (STEPS[stepIdx].key === 'details' && !otpSent) {
      // auto-send OTP when leaving details step
      await sendOtp();
    }

    setStepIdx(i => Math.min(i + 1, STEPS.length - 1));
  };

  const goBack = () => setStepIdx(i => Math.max(i - 1, 0));

  const sendOtp = async () => {
    if (!/^[0-9]{10}$/.test(form.mobile)) return;
    try {
      setSending(true);
      await new Promise(r => setTimeout(r, 700));
      setOtpSent(true);
      alert('OTP sent to your mobile number.');
    } finally {
      setSending(false);
    }
  };

  const submitOrder = async () => {
    if (!stepValid) return;
    try {
      setSubmitting(true);
      await new Promise(r => setTimeout(r, 1000));
      alert('🎉 Order submitted! Our team will contact you shortly.');
      // reset
      setForm(initialForm);
      setOtpSent(false);
      setStepIdx(0);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bk-page">
      {/* ===== Dark hero / front section ===== */}
      <div className="bk-hero">
        <div className="bk-hero-inner">
          <button className="bk-back" onClick={() => navigate('/broadband')}>
            ← Back to Broadband
          </button>

          <h1 className="bk-hero-title">Buy a New Connection</h1>
          <p className="bk-hero-sub">
            Fill in your details to get started with high-speed broadband
          </p>

          <div className="bk-note">
            <strong>Service Available Areas:</strong>
            <span>
              &nbsp;Currently we provide services in <b>Katwa (713130)</b> and <b>Khajurdihi (713150)</b> only.
            </span>
          </div>
        </div>
      </div>

      {/* ===== Wizard container ===== */}
      <div className="bk-container">
        {/* Left: steps */}
        <div className="bk-main">
          {/* Stepper */}
          <div className="bk-stepper">
            {STEPS.map((s, i) => (
              <div key={s.key} className={`bk-step ${i === stepIdx ? 'active' : ''} ${i < stepIdx ? 'done' : ''}`}>
                <span className="bk-step-icon">{s.icon}</span>
                <span className="bk-step-title">{s.title}</span>
                {i < STEPS.length - 1 && <span className="bk-step-line" />}
              </div>
            ))}
          </div>

          {/* Panels */}
          <div className="bk-panel">
            {STEPS[stepIdx].key === 'plan' && (
              <PlanStep form={form} update={update} />
            )}
            {STEPS[stepIdx].key === 'details' && (
              <DetailsStep form={form} update={update} sending={sending} otpSent={otpSent} sendOtp={sendOtp} />
            )}
            {STEPS[stepIdx].key === 'address' && (
              <AddressStep form={form} update={update} />
            )}
            {STEPS[stepIdx].key === 'otp' && (
              <OtpStep form={form} update={update} otpSent={otpSent} sendOtp={sendOtp} sending={sending} />
            )}
            {STEPS[stepIdx].key === 'review' && (
              <ReviewStep form={form} plan={plan} total={total} />
            )}

            {/* Nav buttons */}
            <div className="bk-nav">
              {stepIdx > 0 && (
                <button className="btn ghost" onClick={goBack}>
                  Back
                </button>
              )}
              {STEPS[stepIdx].key !== 'review' ? (
                <button className="btn primary" onClick={goNext} disabled={!stepValid}>
                  Continue <FaArrowRight />
                </button>
              ) : (
                <button className="btn primary" onClick={submitOrder} disabled={!stepValid || submitting}>
                  {submitting ? 'Submitting…' : 'Confirm & Pay'} <FaCheckCircle />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: summary */}
        <aside className="bk-summary">
          <OrderSummary form={form} plan={plan} total={total} />
        </aside>
      </div>
    </div>
  );
}

/* ===== Sub-components ===== */

function PlanStep({ form, update }) {
  return (
    <>
      <h2 className="bk-h2">Service Details</h2>

      <div className="bk-service-toggle">
        <button
          className={`toggle ${form.service === 'broadband' ? 'active' : ''}`}
          onClick={() => update('service', 'broadband')}
        >
          <FaWifi /> Broadband
        </button>
        <button
          className={`toggle ${form.service === 'cable' ? 'active' : ''}`}
          onClick={() => update('service', 'cable')}
        >
          <FaTv /> Cable TV
        </button>
      </div>

      <div className="bk-plans">
        {PLANS.map(p => (
          <button
            key={p.id}
            className={`plan-card ${form.planId === p.id ? 'selected' : ''}`}
            onClick={() => update('planId', p.id)}
          >
            {p.tag && <span className="badge">{p.tag}</span>}
            <div className="plan-title">{p.name}</div>
            <div className="plan-speed">{p.speed}</div>
            <div className="plan-price">₹{p.price} <small>/month</small></div>
            <div className="plan-desc">{p.desc}</div>
            <ul className="plan-features">
              {p.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </button>
        ))}
      </div>
    </>
  );
}

function DetailsStep({ form, update, sending, otpSent, sendOtp }) {
  return (
    <>
      <h2 className="bk-h2">Your Details</h2>

      <div className="bk-grid">
        <div className="field">
          <label>Full Name*</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={e => update('fullName', e.target.value)}
          />
          <small className="hint">e.g., Rahul Sharma</small>
        </div>

        <div className="field">
          <label>Mobile Number*</label>
          <input
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={form.mobile}
            maxLength={10}
            onChange={e => update('mobile', e.target.value.replace(/\D/g, ''))}
          />
        </div>

        <div className="field">
          <label>Email (optional)</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => update('email', e.target.value)}
          />
        </div>
      </div>

      <div className="otp-hint">
        We’ll send an OTP to verify your mobile number.
        <button className="btn link" onClick={sendOtp} disabled={sending || !/^[0-9]{10}$/.test(form.mobile)}>
          {otpSent ? 'Resend OTP' : 'Send OTP'}
        </button>
      </div>
    </>
  );
}

function AddressStep({ form, update }) {
  return (
    <>
      <h2 className="bk-h2">Installation Address</h2>

      <div className="bk-grid">
        <div className="field">
          <label>Area*</label>
          <select value={form.area} onChange={e => update('area', e.target.value)}>
            <option value="">Select Area</option>
            {AREAS.map(a => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Pincode*</label>
          <input type="text" value={form.pincode} readOnly placeholder="Select Pincode" />
        </div>

        <div className="field">
          <label>City*</label>
          <input type="text" value={form.city} readOnly placeholder="Enter your city" />
        </div>

        <div className="field">
          <label>State*</label>
          <input type="text" value={form.state} readOnly placeholder="Enter your state" />
        </div>

        <div className="field col-2">
          <label>Address Line 1*</label>
          <input
            type="text"
            placeholder="House / Flat / Building"
            value={form.address1}
            onChange={e => update('address1', e.target.value)}
          />
        </div>

        <div className="field col-2">
          <label>Address Line 2</label>
          <input
            type="text"
            placeholder="Landmark / Street"
            value={form.address2}
            onChange={e => update('address2', e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

function OtpStep({ form, update, otpSent, sendOtp, sending }) {
  return (
    <>
      <h2 className="bk-h2">Verify Mobile Number</h2>
      <p className="muted">Enter the OTP we sent to <strong>{form.mobile || 'your number'}</strong>.</p>

      <div className="field otp">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter 4-6 digit OTP"
          maxLength={6}
          value={form.otp}
          onChange={e => update('otp', e.target.value.replace(/\D/g, ''))}
        />
        <button className="btn ghost" onClick={sendOtp} disabled={sending || !/^[0-9]{10}$/.test(form.mobile)}>
          {otpSent ? 'Resend OTP' : 'Send OTP'}
        </button>
      </div>

      <p className="muted">Didn’t receive the OTP? Check network, or try again in a minute.</p>
    </>
  );
}

function ReviewStep({ form, plan, total }) {
  return (
    <>
      <h2 className="bk-h2">Review & Pay</h2>
      <div className="review">
        <div>
          <div className="review-title">Selected Plan</div>
          <div className="review-row">
            <span>{plan?.name} ({plan?.speed})</span>
            <span>₹{plan?.price}/mo</span>
          </div>
        </div>

        <div>
          <div className="review-title">Customer</div>
          <div className="review-col">
            <span>{form.fullName}</span>
            <span>{form.mobile}{form.email ? ` • ${form.email}` : ''}</span>
          </div>
        </div>

        <div>
          <div className="review-title">Address</div>
          <div className="review-col">
            <span>{form.address1}{form.address2 ? `, ${form.address2}` : ''}</span>
            <span>{form.area}, {form.city} - {form.pincode}</span>
            <span>{form.state}</span>
          </div>
        </div>

        <div className="review-total">
          <div>Total Due (monthly)</div>
          <div className="price">₹{total}</div>
        </div>
      </div>
    </>
  );
}

function OrderSummary({ form, plan, total }) {
  return (
    <div className="summary-card">
      <div className="summary-header">Order Summary</div>
      <div className="summary-row">
        <span>Service</span>
        <span className="value">{form.service === 'cable' ? 'Cable TV' : 'Broadband'}</span>
      </div>
      <div className="summary-row">
        <span>Plan</span>
        <span className="value">{plan?.name}</span>
      </div>
      <div className="summary-row">
        <span>Speed</span>
        <span className="value">{plan?.speed}</span>
      </div>
      <div className="summary-row">
        <span>Monthly</span>
        <span className="value">₹{plan?.price}</span>
      </div>

      <div className="summary-divider" />

      <div className="summary-total">
        <span>Total</span>
        <span className="value price">₹{total}</span>
      </div>

      <ul className="summary-bullets">
        <li>Free installation in launch areas</li>
        <li>No hidden charges</li>
        <li>24/7 support</li>
      </ul>
    </div>
  );
}
