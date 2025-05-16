import React, { useState, useEffect } from 'react';
import { CreditCard, Shield, Users, Car, Check } from 'lucide-react';
import './UpgradePlan.css';

const UpgradePlan = () => {
  const [currentPlan, setCurrentPlan] = useState('Basic');
  const [selectedPlan, setSelectedPlan] = useState('Basic');

  useEffect(() => {
    // Load current plan from session
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && session.user) {
      setCurrentPlan(session.user.subscription || 'Basic');
      setSelectedPlan(session.user.subscription || 'Basic');
    }
  }, []);

  const plans = [
    {
      name: 'Basic',
      price: '₹0',
      features: [
        'Basic ride booking',
        'Standard support',
        'Limited pool options'
      ]
    },
    {
      name: 'Premium',
      price: '₹299/month',
      features: [
        'Priority booking',
        '24/7 support',
        'Unlimited pool options',
        'Women safety features',
        'Ride sharing with trusted contacts'
      ]
    },
    {
      name: 'Business',
      price: '₹499/month',
      features: [
        'All Premium features',
        'Dedicated account manager',
        'Corporate billing',
        'Team management',
        'Advanced analytics'
      ]
    }
  ];

  const handleUpgrade = () => {
    if (selectedPlan === currentPlan) return;

    // Update user's subscription in localStorage
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && session.user) {
      session.user.subscription = selectedPlan;
      localStorage.setItem('session', JSON.stringify(session));

      // Update users array
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(u => u.email === session.user.email);
      if (userIndex !== -1) {
        users[userIndex].subscription = selectedPlan;
        localStorage.setItem('users', JSON.stringify(users));
      }

      setCurrentPlan(selectedPlan);
      alert('Plan upgraded successfully!');
    }
  };

  return (
    <div className="upgrade-container">
      <div className="upgrade-header">
        <h1>Upgrade Your Plan</h1>
        <p>Choose the plan that best suits your needs</p>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`plan-card ${selectedPlan === plan.name ? 'selected' : ''}`}
            onClick={() => setSelectedPlan(plan.name)}
          >
            <div className="plan-header">
              <h2>{plan.name}</h2>
              <p className="price">{plan.price}</p>
              {currentPlan === plan.name && (
                <span className="current-plan">Current Plan</span>
              )}
            </div>

            <ul className="features-list">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <Check size={16} />
                  {feature}
                </li>
              ))}
            </ul>

            {selectedPlan === plan.name && plan.name !== currentPlan && (
              <button className="upgrade-btn" onClick={handleUpgrade}>
                Upgrade to {plan.name}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="plan-comparison">
        <h2>Plan Comparison</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              {plans.map(plan => (
                <th key={plan.name}>{plan.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic ride booking</td>
              {plans.map(plan => (
                <td key={plan.name}>
                  <Check size={16} />
                </td>
              ))}
            </tr>
            <tr>
              <td>Priority booking</td>
              {plans.map(plan => (
                <td key={plan.name}>
                  {plan.name !== 'Basic' && <Check size={16} />}
                </td>
              ))}
            </tr>
            <tr>
              <td>24/7 support</td>
              {plans.map(plan => (
                <td key={plan.name}>
                  {plan.name !== 'Basic' && <Check size={16} />}
                </td>
              ))}
            </tr>
            <tr>
              <td>Women safety features</td>
              {plans.map(plan => (
                <td key={plan.name}>
                  {plan.name !== 'Basic' && <Check size={16} />}
                </td>
              ))}
            </tr>
            <tr>
              <td>Dedicated account manager</td>
              {plans.map(plan => (
                <td key={plan.name}>
                  {plan.name === 'Business' && <Check size={16} />}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpgradePlan; 