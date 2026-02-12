import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, LoadingAnimation } from '../components/index.js';

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
    <div className="min-h-screen py-8 px-6 bg-gradient-to-b from-background-primary via-background-secondary to-background-tertiary">
      <LoadingAnimation>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold bg-linear-to-r from-primary via-primary-light to-tertiary bg-clip-text text-transparent mb-4">
              Report System
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Help make our roads safer by reporting hazards and violations. Your reports help authorities respond quickly and improve road conditions.
            </p>
          </motion.div>

          <Card variant="glass" size="full">
            {!submitted ? (
              <>
                {/* Tab Navigation */}
                <div className="flex mb-6 rounded-lg bg-background-secondary p-1">
                  {[
                    { id: 'hazard', label: '🚧 Report Hazard', desc: 'Road conditions & infrastructure' },
                    { id: 'violation', label: '⚠️ Report Violation', desc: 'Traffic rule violations' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 p-4 border-none rounded-lg cursor-pointer transition-all duration-300 ${activeTab === tab.id
                          ? 'bg-linear-to-r from-primary via-primary-light to-tertiary text-white font-bold'
                          : 'bg-transparent text-slate-300 font-medium'
                        }`}
                    >
                      <div className="text-lg">
                        {tab.label}
                      </div>
                      <div className="text-sm opacity-80 mt-1">
                        {tab.desc}
                      </div>
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Type Selection */}
                  <div className="mb-6">
                    <label className="block text-lg font-semibold text-white mb-3">
                      Select {activeTab === 'hazard' ? 'Hazard' : 'Violation'} Type
                    </label>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
                      {currentTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleInputChange('type', type.id)}
                          className={`p-4 rounded-lg bg-background-card text-white cursor-pointer transition-all duration-300 text-left ${formData.type === type.id ? 'border-2' : 'border'
                            } border-white/10`}
                          style={{
                            borderColor: formData.type === type.id ? type.color : undefined,
                            background: formData.type === type.id ? `${type.color}20` : undefined
                          }}
                        >
                          <div className="text-lg font-medium">
                            {type.label}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Location Input */}
                  <div className="mb-6">
                    <label className="block text-lg font-semibold text-white mb-3">
                      📍 Location Details
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter specific location, landmark, or coordinates"
                      required
                      className="w-full p-4 border border-white/10 rounded-lg bg-background-card text-white text-base outline-none transition-all duration-300 focus:border-primary"
                    />
                  </div>

                  {/* Severity Level */}
                  <div className="mb-6">
                    <label className="block text-lg font-semibold text-white mb-3">
                      ⚡ Severity Level
                    </label>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
                      {severityLevels.map((level) => (
                        <motion.button
                          key={level.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          onClick={() => handleInputChange('severity', level.id)}
                          className={`p-3 rounded-lg text-white cursor-pointer transition-all duration-300 text-center ${formData.severity === level.id ? 'border-2' : 'border'
                            } border-white/10`}
                          style={{
                            borderColor: formData.severity === level.id ? level.color : undefined,
                            background: formData.severity === level.id ? `${level.color}20` : '#1e293b'
                          }}
                        >
                          <div
                            className="font-semibold"
                            style={{
                              color: formData.severity === level.id ? level.color : 'white'
                            }}
                          >
                            {level.label}
                          </div>
                          <div className="text-sm text-slate-300 mt-1">
                            {level.description}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <label className="block text-lg font-semibold text-white mb-3">
                      📝 Detailed Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Provide detailed information about the issue..."
                      required
                      rows={4}
                      className="w-full p-4 border border-white/10 rounded-lg bg-background-card text-white text-base outline-none resize-vertical min-h-30"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="mb-6">
                    <label className="block text-lg font-semibold text-white mb-3">
                      📞 Contact Information (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      placeholder="Phone number or email for follow-up"
                      className="w-full p-4 border border-white/10 rounded-lg bg-background-card text-white text-base outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting || !formData.type || !formData.location || !formData.description}
                    className="w-full text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-transparent border-t-current rounded-full animate-spin" />
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
                className="text-center p-8"
              >
                <div className="text-6xl mb-4">
                  ✅
                </div>
                <h2 className="text-2xl font-bold text-primary mb-3">
                  Report Submitted Successfully!
                </h2>
                <p className="text-lg text-slate-300 mb-4">
                  Thank you for making our roads safer. Your report has been forwarded to the relevant authorities.
                </p>
                <div className="bg-linear-to-r from-primary via-primary-light to-tertiary p-4 rounded-lg text-white font-medium">
                  🆔 Report ID: SAFE-{Date.now().toString().slice(-6)}
                </div>
              </motion.div>
            )}
          </Card>
        </div>
      </LoadingAnimation>
    </div>
  );
};

export default ReportPage;
