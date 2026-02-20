import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, FileText, Info, MapPin, Navigation, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, LoadingAnimation } from '../components/index.js';
import { API_CONFIG } from '../constants/config.js';
import { flatCategory } from '../data/category.ts';
import { useLocation } from '../hooks/useLocation.js';
import { formatReportData, reportValidation } from '../validations/report.js';

const ReportPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportResult, setReportResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  // React Hook Form
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    defaultValues: {
      reportText: '',
      location: {
        lat: '',
        lng: '',
        address: ''
      }
    }
  });

  // Location Hook
  const {
    location,
    isDetecting,
    error: locationError,
    detectLocation: detectLocationHook,
    clearError: clearLocationError
  } = useLocation();

  // Watch form values
  const reportText = watch('reportText');

  // Auto-detect location on page load
  useEffect(() => {
    const autoDetectLocation = async () => {
      clearLocationError();
      const detectedLocation = await detectLocationHook();

      if (detectedLocation) {
        setValue('location.lat', detectedLocation.lat);
        setValue('location.lng', detectedLocation.lng);
        setValue('location.address', detectedLocation.address);
      }
    };

    autoDetectLocation();
  }, []);

  // Form submission
  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const reportData = formatReportData(formData);

      const response = await fetch(`${API_CONFIG.BASE_URL}/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reportData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit report');
      }

      if (data.success) {
        setReportResult(data.data.report);
        setSubmitted(true);

        // Reset form after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
          setReportResult(null);
          reset();
        }, 5000);
      }
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryInfo = (categoryKey) => {
    return flatCategory.find(cat => cat.key === categoryKey);
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: '#10B981',
      medium: '#F59E0B',
      high: '#EF4444',
      critical: '#DC2626'
    };
    return colors[severity] || '#6B7280';
  };

  return (
    <div className="min-h-screen py-8 px-6 bg-linear-to-b from-background-primary via-background-secondary to-background-tertiary">
      <LoadingAnimation>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold text-white">
                Report Safety Issue
              </h1>
            </div>
          </motion.div>

          <Card variant="glass" size="full">
            {!submitted ? (
              <>
                <form onSubmit={handleFormSubmit(onSubmit)}>
                  {/* Description / Report Text */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                      <FileText className="w-5 h-5" />
                      Describe the Issue
                    </label>
                    <textarea
                      {...register('reportText', reportValidation.reportText)}
                      placeholder="Describe what you observed... e.g., 'There is a large pothole on the main road near sector 5 which is causing accidents and damaging vehicles.' (Minimum 10 characters)"
                      rows={6}
                      className={`w-full p-4 border rounded-lg bg-background-card text-white text-base outline-none resize-vertical min-h-30 transition-all duration-300 focus:border-primary ${errors.reportText ? 'border-red-500' : 'border-white/10'
                        }`}
                    />
                    {errors.reportText && (
                      <p className="text-red-400 text-sm mt-2">{errors.reportText.message}</p>
                    )}
                    <div className="text-sm text-slate-400 mt-2">
                      {reportText?.length || 0}/1000 characters
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="mb-6 p-4 bg-background-secondary rounded-lg border border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-primary" />
                      <label className="block text-lg font-semibold text-white">
                        Location Information
                      </label>
                      {isDetecting && (
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Navigation className="w-4 h-4 animate-pulse" />
                          Detecting...
                        </div>
                      )}
                    </div>

                    {locationError && (
                      <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300">
                        {locationError}
                      </div>
                    )}

                    {/* Hidden fields for lat/lng - auto-populated, not shown to user */}
                    <input
                      type="hidden"
                      {...register('location.lat', reportValidation.location.lat)}
                    />
                    <input
                      type="hidden"
                      {...register('location.lng', reportValidation.location.lng)}
                    />

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Address / Landmark
                      </label>
                      <input
                        type="text"
                        {...register('location.address', reportValidation.location.address)}
                        placeholder="e.g., Sector 5, Rohini, New Delhi, Delhi 110085"
                        className={`w-full p-3 border rounded-lg bg-background-card text-white text-base outline-none transition-all duration-300 focus:border-primary ${errors.location?.address ? 'border-red-500' : 'border-white/10'
                          }`}
                      />
                      {errors.location?.address && (
                        <p className="text-red-400 text-xs mt-1">{errors.location.address.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Error Display */}
                  {apiError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <div>
                          <h3 className="text-white font-semibold mb-1">Error</h3>
                          <p className="text-sm text-red-300">{apiError}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-transparent border-t-current rounded-full animate-spin" />
                        Submitting & Analyzing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Submit Report
                      </div>
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
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-primary mb-3">
                  Report Submitted Successfully!
                </h2>
                <p className="text-lg text-slate-300 mb-6">
                  Thank you for making our roads safer. Your report has been analyzed and forwarded to the relevant authorities.
                </p>

                {reportResult && (
                  <div className="space-y-4 mb-6">
                    {/* Report ID */}
                    <div className="bg-background-secondary p-4 rounded-lg">
                      <div className="text-sm text-slate-400 mb-1">Report ID</div>
                      <div className="text-lg font-mono text-white">{reportResult._id}</div>
                    </div>

                    {/* AI Classification Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-background-secondary p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-1">Category</div>
                        <div className="text-lg font-semibold text-white capitalize">
                          {getCategoryInfo(reportResult.category.key)?.label || reportResult.category.key}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          Type: {reportResult.category.type}
                        </div>
                      </div>

                      <div className="bg-background-secondary p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-1">Severity</div>
                        <div
                          className="text-lg font-semibold capitalize"
                          style={{ color: getSeverityColor(reportResult.severity) }}
                        >
                          {reportResult.severity}
                        </div>
                      </div>

                      <div className="bg-background-secondary p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-1">AI Confidence</div>
                        <div className="text-lg font-semibold text-white">
                          {(reportResult.confidence * 100).toFixed(1)}%
                        </div>
                      </div>

                      <div className="bg-background-secondary p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-1">Status</div>
                        <div className="text-lg font-semibold capitalize" style={{
                          color: reportResult.status === 'pending' ? '#10B981' : '#F59E0B'
                        }}>
                          {reportResult.status}
                        </div>
                      </div>
                    </div>

                    {reportResult.needsReview && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-yellow-400" />
                          <div className="text-left">
                            <h3 className="text-white font-semibold mb-1">Under Review</h3>
                            <p className="text-sm text-slate-300">
                              The AI confidence was below threshold. Your report will be reviewed by a human moderator before processing.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="text-sm text-slate-400">
                  Redirecting in a moment...
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
