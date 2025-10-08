import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, LoadingAnimation } from '../components/index.js';
import { theme } from '../styles/theme.js';

const ReportPage = () => {
  const [activeTab, setActiveTab] = useState('hazard');
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    severity: 'medium',
    image: null,
    contact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const hazardTypes = [
    { id: 'pothole', label: '🕳️ Pothole', color: '#F59E0B' },
    { id: 'broken-road', label: '🚧 Broken Road', color: '#EF4444' },
    { id: 'fallen-tree', label: '🌳 Fallen Tree', color: '#10B981' },
    { id: 'damaged-sign', label: '🚦 Damaged Signage', color: '#8B5CF6' },
    { id: 'flooding', label: '🌊 Road Flooding', color: '#3B82F6' },
    { id: 'debris', label: '🪨 Road Debris', color: '#6B7280' }
  ];

  const violationTypes = [
    { id: 'no-helmet', label: '⛑️ No Helmet', color: '#EF4444' },
    { id: 'overspeeding', label: '⚡ Overspeeding', color: '#F59E0B' },
    { id: 'wrong-side', label: '↩️ Wrong Side Driving', color: '#DC2626' },
    { id: 'signal-violation', label: '🚦 Signal Violation', color: '#7C2D12' },
    { id: 'drunk-driving', label: '🍺 Drunk Driving', color: '#991B1B' },
    { id: 'phone-usage', label: '📱 Phone While Driving', color: '#92400E' }
  ];

  const severityLevels = [
    { id: 'low', label: 'Low', color: '#10B981', description: 'Minor inconvenience' },
    { id: 'medium', label: 'Medium', color: '#F59E0B', description: 'Moderate risk' },
    { id: 'high', label: 'High', color: '#EF4444', description: 'Immediate attention needed' },
    { id: 'critical', label: 'Critical', color: '#DC2626', description: 'Emergency response required' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        type: '',
        location: '',
        description: '',
        severity: 'medium',
        image: null,
        contact: ''
      });
    }, 3000);
  };

  const currentTypes = activeTab === 'hazard' ? hazardTypes : violationTypes;

  return (
    <div style={{
      minHeight: '100vh',
      padding: `${theme.spacing[8]} ${theme.spacing[6]}`,
      background: theme.colors.background.gradient,
    }}>
      <LoadingAnimation>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              textAlign: 'center', 
              marginBottom: theme.spacing[8] 
            }}
          >
            <h1 style={{
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
              background: theme.colors.primary.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: theme.spacing[4],
            }}>
              Report System
            </h1>
            <p style={{
              fontSize: theme.typography.fontSize.lg,
              color: theme.colors.text.secondary,
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Help make our roads safer by reporting hazards and violations. Your reports help authorities respond quickly and improve road conditions.
            </p>
          </motion.div>

          <Card variant="glass" size="full">
            {!submitted ? (
              <>
                {/* Tab Navigation */}
                <div style={{
                  display: 'flex',
                  marginBottom: theme.spacing[6],
                  borderRadius: theme.borderRadius.lg,
                  background: theme.colors.background.secondary,
                  padding: theme.spacing[1],
                }}>
                  {[
                    { id: 'hazard', label: '🚧 Report Hazard', desc: 'Road conditions & infrastructure' },
                    { id: 'violation', label: '⚠️ Report Violation', desc: 'Traffic rule violations' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        flex: 1,
                        padding: theme.spacing[4],
                        border: 'none',
                        borderRadius: theme.borderRadius.lg,
                        background: activeTab === tab.id 
                          ? theme.colors.primary.gradient 
                          : 'transparent',
                        color: activeTab === tab.id 
                          ? '#ffffff' 
                          : theme.colors.text.secondary,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontWeight: activeTab === tab.id 
                          ? theme.typography.fontWeight.bold 
                          : theme.typography.fontWeight.medium,
                      }}
                    >
                      <div style={{ fontSize: theme.typography.fontSize.lg }}>
                        {tab.label}
                      </div>
                      <div style={{ 
                        fontSize: theme.typography.fontSize.sm,
                        opacity: 0.8,
                        marginTop: theme.spacing[1]
                      }}>
                        {tab.desc}
                      </div>
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Type Selection */}
                  <div style={{ marginBottom: theme.spacing[6] }}>
                    <label style={{
                      display: 'block',
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing[3],
                    }}>
                      Select {activeTab === 'hazard' ? 'Hazard' : 'Violation'} Type
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: theme.spacing[3],
                    }}>
                      {currentTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleInputChange('type', type.id)}
                          style={{
                            padding: theme.spacing[4],
                            border: formData.type === type.id 
                              ? `2px solid ${type.color}` 
                              : `1px solid ${theme.colors.border.secondary}`,
                            borderRadius: theme.borderRadius.lg,
                            background: formData.type === type.id 
                              ? `${type.color}20` 
                              : theme.colors.background.card,
                            color: theme.colors.text.primary,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textAlign: 'left',
                          }}
                        >
                          <div style={{
                            fontSize: theme.typography.fontSize.lg,
                            fontWeight: theme.typography.fontWeight.medium,
                          }}>
                            {type.label}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Location Input */}
                  <div style={{ marginBottom: theme.spacing[6] }}>
                    <label style={{
                      display: 'block',
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing[3],
                    }}>
                      📍 Location Details
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter specific location, landmark, or coordinates"
                      required
                      style={{
                        width: '100%',
                        padding: theme.spacing[4],
                        border: `1px solid ${theme.colors.border.secondary}`,
                        borderRadius: theme.borderRadius.lg,
                        background: theme.colors.background.card,
                        color: theme.colors.text.primary,
                        fontSize: theme.typography.fontSize.base,
                        outline: 'none',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </div>

                  {/* Severity Level */}
                  <div style={{ marginBottom: theme.spacing[6] }}>
                    <label style={{
                      display: 'block',
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing[3],
                    }}>
                      ⚡ Severity Level
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: theme.spacing[3],
                    }}>
                      {severityLevels.map((level) => (
                        <motion.button
                          key={level.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          onClick={() => handleInputChange('severity', level.id)}
                          style={{
                            padding: theme.spacing[3],
                            border: formData.severity === level.id 
                              ? `2px solid ${level.color}` 
                              : `1px solid ${theme.colors.border.secondary}`,
                            borderRadius: theme.borderRadius.lg,
                            background: formData.severity === level.id 
                              ? `${level.color}20` 
                              : theme.colors.background.card,
                            color: theme.colors.text.primary,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textAlign: 'center',
                          }}
                        >
                          <div style={{
                            fontWeight: theme.typography.fontWeight.semibold,
                            color: formData.severity === level.id ? level.color : theme.colors.text.primary,
                          }}>
                            {level.label}
                          </div>
                          <div style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.secondary,
                            marginTop: theme.spacing[1],
                          }}>
                            {level.description}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ marginBottom: theme.spacing[6] }}>
                    <label style={{
                      display: 'block',
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing[3],
                    }}>
                      📝 Detailed Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Provide detailed information about the issue..."
                      required
                      rows={4}
                      style={{
                        width: '100%',
                        padding: theme.spacing[4],
                        border: `1px solid ${theme.colors.border.secondary}`,
                        borderRadius: theme.borderRadius.lg,
                        background: theme.colors.background.card,
                        color: theme.colors.text.primary,
                        fontSize: theme.typography.fontSize.base,
                        outline: 'none',
                        resize: 'vertical',
                        minHeight: '120px',
                      }}
                    />
                  </div>

                  {/* Contact Info */}
                  <div style={{ marginBottom: theme.spacing[6] }}>
                    <label style={{
                      display: 'block',
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing[3],
                    }}>
                      📞 Contact Information (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      placeholder="Phone number or email for follow-up"
                      style={{
                        width: '100%',
                        padding: theme.spacing[4],
                        border: `1px solid ${theme.colors.border.secondary}`,
                        borderRadius: theme.borderRadius.lg,
                        background: theme.colors.background.card,
                        color: theme.colors.text.primary,
                        fontSize: theme.typography.fontSize.base,
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting || !formData.type || !formData.location || !formData.description}
                    style={{
                      width: '100%',
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                    }}
                  >
                    {isSubmitting ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: theme.spacing[2] }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid transparent',
                          borderTop: '2px solid currentColor',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                        }} />
                        Submitting Report...
                      </div>
                    ) : (
                      `🚨 Submit ${activeTab === 'hazard' ? 'Hazard' : 'Violation'} Report`
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ 
                  textAlign: 'center',
                  padding: theme.spacing[8],
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: theme.spacing[4],
                }}>
                  ✅
                </div>
                <h2 style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.primary.main,
                  marginBottom: theme.spacing[3],
                }}>
                  Report Submitted Successfully!
                </h2>
                <p style={{
                  fontSize: theme.typography.fontSize.lg,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing[4],
                }}>
                  Thank you for making our roads safer. Your report has been forwarded to the relevant authorities.
                </p>
                <div style={{
                  background: theme.colors.primary.gradient,
                  padding: theme.spacing[4],
                  borderRadius: theme.borderRadius.lg,
                  color: '#ffffff',
                  fontWeight: theme.typography.fontWeight.medium,
                }}>
                  🆔 Report ID: SAFE-{Date.now().toString().slice(-6)}
                </div>
              </motion.div>
            )}
          </Card>
        </div>
      </LoadingAnimation>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ReportPage;
