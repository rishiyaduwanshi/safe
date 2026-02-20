import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AlertTriangle, Bike, Calendar, CheckCircle,
  Clock, CreditCard, FileText, Landmark, Mail, MapPin,
  Phone, PhoneCall, RefreshCw, Search, Shield, TrendingUp,
  User, X, XCircle,
} from 'lucide-react';
import { Card, LoadingAnimation, SpotlightEffect } from '../components/index.js';
import { licenseApi, profileApi } from '../constants/services.js';
import { useAuth } from '../contexts/AuthContext.jsx';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DL_REGEX = /^[A-Z]{2}[-\s]?\d{2}[-\s]?\d{4}[-\s]?\d{7}$/i;
const SAFETY_DATA = { currentScore: 850, maxScore: 1000, improvementFromLastMonth: 15 };
const getScoreColor = (s) => s >= 900 ? '#10B981' : s >= 750 ? '#F59E0B' : s >= 500 ? '#3B82F6' : '#EF4444';
const getScoreGrade = (s) => {
  if (s >= 900) return { grade: 'A+', color: '#10B981' };
  if (s >= 800) return { grade: 'A', color: '#10B981' };
  if (s >= 700) return { grade: 'B+', color: '#F59E0B' };
  if (s >= 600) return { grade: 'B', color: '#F59E0B' };
  if (s >= 500) return { grade: 'C', color: '#3B82F6' };
  return { grade: 'D', color: '#EF4444' };
};
const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ background: '#1e293b', borderColor: '#334155' }}>
    <div className="text-primary"><Icon size={20} /></div>
    <div className="flex-1">
      <div className="text-sm text-slate-400 mb-1">{label}</div>
      <div className="text-base text-white font-medium">{value}</div>
    </div>
  </div>
);

const ProfilePage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState('violations');
  const [safetyScore, setSafetyScore] = useState(0);
  const [dlInput, setDlInput] = useState('');
  const [dlError, setDlError] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [showLookupForm, setShowLookupForm] = useState(false);

  // ─── Animated safety score counter ────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      let current = 0;
      const step = SAFETY_DATA.currentScore / 60;
      const interval = setInterval(() => {
        current += step;
        if (current >= SAFETY_DATA.currentScore) { setSafetyScore(SAFETY_DATA.currentScore); clearInterval(interval); }
        else { setSafetyScore(Math.floor(current)); }
      }, 30);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  // ─── Fetch saved profile from DB ──────────────────────────────────────────
  const { data: profileRes, isLoading: profileLoading } = useQuery({
    queryKey: ['my-profile'],
    queryFn: () => profileApi.getMyProfile(),
    staleTime: 1000 * 60 * 10,
  });
  const savedProfile = profileRes?.data?.profile ?? null;

  // ─── Lookup mutation (preview only — does NOT save) ────────────────────────
  const lookupMutation = useMutation({
    mutationFn: ({ dlNumber }) => licenseApi.lookup({ dlNumber }),
    onSuccess: (res) => setPreviewData(res.data),
    onError: (err) => setDlError(err?.message ?? 'Failed to fetch. Please try again.'),
  });

  // ─── Save mutation (persists to DB and links profileId to user) ────────────
  const saveMutation = useMutation({
    mutationFn: (data) => profileApi.save(data),
    onSuccess: () => {
      setPreviewData(null);
      setDlInput('');
      setShowLookupForm(false);
      queryClient.invalidateQueries({ queryKey: ['my-profile'] });
    },
  });

  const handleLookup = (e) => {
    e.preventDefault();
    const trimmed = dlInput.trim();
    if (!trimmed) return;
    if (!DL_REGEX.test(trimmed)) {
      setDlError('Invalid DL format. Expected: HR-0619850123456 (State code + RTO + Year + 7-digit serial)');
      return;
    }
    setDlError(null);
    lookupMutation.mutate({ dlNumber: trimmed });
  };

  const handleRefetch = () => {
    setPreviewData(null); setDlInput(''); setDlError(null);
    setShowLookupForm(true);
    lookupMutation.reset(); saveMutation.reset();
  };

  const displayName = savedProfile?.name ?? user?.name ?? 'Driver';
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-background-primary via-background-secondary to-background-tertiary">
        <LoadingAnimation>
          <Card variant="glass" size="lg">
            <div className="text-center p-8">
              <div className="w-15 h-15 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-5" />
              <h2 className="text-white text-xl mb-2">Loading Your Profile...</h2>
              <p className="text-slate-300 text-base">Fetching your safety data and statistics</p>
            </div>
          </Card>
        </LoadingAnimation>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6 bg-linear-to-b from-background-primary via-background-secondary to-background-tertiary">
      <SpotlightEffect />
      <LoadingAnimation>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card variant="glass" size="full">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="relative">
                  <div
                    className="w-30 h-30 rounded-full bg-linear-to-br from-primary via-primary-light to-tertiary flex items-center justify-center text-4xl font-bold text-white"
                    style={{ border: '4px solid #6366F1' }}
                  >
                    {initials}
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 text-white px-2 py-1 rounded-full text-sm font-bold border-2"
                    style={{ background: getScoreGrade(SAFETY_DATA.currentScore).color, borderColor: '#1e293b' }}
                  >
                    {getScoreGrade(SAFETY_DATA.currentScore).grade}
                  </div>
                </div>

                <div className="flex-1 min-w-75">
                  <h1 className="text-3xl font-bold text-white mb-2">{displayName}</h1>
                  <p className="text-lg text-slate-300 mb-4">
                    {savedProfile
                      ? `License: ${savedProfile.licenseNumber} • ${savedProfile.vehicleType}`
                      : user?.email ?? ''}
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    {savedProfile && (
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold" style={{ background: '#10B98120', color: '#10B981' }}>
                        <Shield size={14} /> Verified Driver
                      </div>
                    )}
                    {savedProfile?.state && (
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold" style={{ background: '#6366F120', color: '#6366F1' }}>
                        <MapPin size={14} /> {savedProfile.state}, India
                      </div>
                    )}
                    {!savedProfile && (
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold" style={{ background: '#F59E0B20', color: '#F59E0B' }}>
                        <AlertTriangle size={14} /> Verify your DL to submit reports
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center min-w-50">
                  <div className="relative w-37.5 h-37.5 mx-auto">
                    <svg width="150" height="150" className="-rotate-90">
                      <circle cx="75" cy="75" r="65" stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="transparent" />
                      <circle
                        cx="75" cy="75" r="65" stroke={getScoreColor(safetyScore)}
                        strokeWidth="10" fill="transparent" strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 65}`}
                        strokeDashoffset={`${2 * Math.PI * 65 * (1 - safetyScore / SAFETY_DATA.maxScore)}`}
                        className="transition-all duration-2000 ease-in-out"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="text-2xl font-bold" style={{ color: getScoreColor(safetyScore) }}>{safetyScore}</div>
                      <div className="text-sm text-slate-300">Safety Score</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1 text-sm font-medium" style={{ color: '#10B981' }}>
                    <TrendingUp size={14} /> +{SAFETY_DATA.improvementFromLastMonth} this month
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tabs */}
          <div className="flex mb-6 rounded-xl bg-background-secondary p-2 flex-wrap gap-2">
            {[
              { id: 'violations', label: 'Violations', icon: AlertTriangle },
              { id: 'personal', label: 'Personal Info', icon: User },
            ].map((tab) => (
              <button
                key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-30 flex items-center justify-center gap-2 p-3 border-none rounded-lg cursor-pointer transition-all duration-300 text-base ${activeTab === tab.id
                  ? 'bg-linear-to-r from-primary via-primary-light to-tertiary text-white font-bold'
                  : 'bg-transparent text-slate-300 font-medium'
                  }`}
              >
                <tab.icon size={16} />{tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* ── Violations Tab ── */}
              {activeTab === 'violations' && (
                <Card variant="glass" size="full">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                    <AlertTriangle size={20} className="text-amber-400" /> Violation History
                  </h3>
                  <div className="text-center py-12">
                    <CheckCircle size={48} className="text-emerald-400 mx-auto mb-4" />
                    <p className="text-white font-semibold text-lg mb-1">No violations recorded</p>
                    <p className="text-slate-400 text-sm">
                      Violation history will be available once traffic authority integration is live.
                    </p>
                  </div>
                </Card>
              )}

              {/* ── Personal Info Tab ── */}
              {activeTab === 'personal' && (
                <>
                  {/* Saved profile → show data */}
                  {savedProfile && !previewData && !showLookupForm && (
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6">
                      <Card variant="glass" size="full">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                            <User size={20} /> Personal Information
                          </h3>
                          <button onClick={handleRefetch} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-1 rounded border border-slate-600 transition-colors">
                            <RefreshCw size={12} /> Re-fetch
                          </button>
                        </div>
                        <div className="flex flex-col gap-4">
                          {[
                            { label: 'Full Name', value: savedProfile.name, icon: User },
                            { label: 'Driver ID', value: savedProfile.driverId, icon: CreditCard },
                            { label: 'Phone', value: savedProfile.phone, icon: Phone },
                            { label: 'Email', value: savedProfile.email, icon: Mail },
                            { label: 'Address', value: savedProfile.address, icon: MapPin },
                            { label: 'Emergency Contact', value: `${savedProfile.emergencyContact.name} — ${savedProfile.emergencyContact.phone}`, icon: PhoneCall },
                          ].map((item) => <InfoRow key={item.label} {...item} />)}
                        </div>
                      </Card>

                      <Card variant="glass" size="full">
                        <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
                          <FileText size={20} /> License Information
                        </h3>
                        <div className="flex flex-col gap-4">
                          {[
                            { label: 'License Number', value: savedProfile.licenseNumber, icon: FileText },
                            { label: 'Vehicle Type', value: savedProfile.vehicleType, icon: Bike },
                            { label: 'Issue Date', value: savedProfile.issueDate, icon: Calendar },
                            { label: 'Expiry Date', value: savedProfile.expiryDate, icon: Clock },
                          ].map((item) => <InfoRow key={item.label} {...item} />)}
                        </div>
                        <div
                          className="mt-6 p-4 rounded-lg border"
                          style={{
                            background: savedProfile.status === 'Valid' ? '#10B98110' : '#EF444410',
                            borderColor: savedProfile.status === 'Valid' ? '#10B98130' : '#EF444430',
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {savedProfile.status === 'Valid'
                              ? <CheckCircle size={22} style={{ color: '#10B981' }} />
                              : <XCircle size={22} style={{ color: '#EF4444' }} />}
                            <div className="font-bold text-base" style={{ color: savedProfile.status === 'Valid' ? '#10B981' : '#EF4444' }}>
                              License Status: {savedProfile.status}
                            </div>
                          </div>
                          <p className="text-slate-400 text-sm">
                            {savedProfile.status === 'Valid'
                              ? `Your license is valid and expires on ${savedProfile.expiryDate}.`
                              : `Your license expired on ${savedProfile.expiryDate}. Please renew at your nearest RTO.`}
                          </p>
                        </div>
                      </Card>
                    </div>
                  )}

                  {/* Preview → confirm before saving to DB */}
                  {previewData && (
                    <Card variant="glass" size="full">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                          <Search size={20} /> Preview — confirm before saving
                        </h3>
                        <button onClick={handleRefetch} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-1 rounded border border-slate-600 transition-colors">
                          <X size={12} /> Cancel
                        </button>
                      </div>
                      <p className="text-slate-400 text-sm mb-6">
                        Data fetched from Sarathi Parivahan. Click <strong className="text-white">Confirm & Save</strong> to link this license to your account.
                      </p>
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-4 mb-6">
                        {[
                          { label: 'Full Name', value: previewData.name, icon: User },
                          { label: 'Driver ID', value: previewData.driverId, icon: CreditCard },
                          { label: 'License Number', value: previewData.licenseNumber, icon: FileText },
                          { label: 'Vehicle Type', value: previewData.vehicleType, icon: Bike },
                          { label: 'Phone', value: previewData.phone, icon: Phone },
                          { label: 'Address', value: previewData.address, icon: MapPin },
                          { label: 'Issue Date', value: previewData.issueDate, icon: Calendar },
                          { label: 'Expiry Date', value: previewData.expiryDate, icon: Clock },
                          { label: 'Emergency Contact', value: `${previewData.emergencyContact.name} — ${previewData.emergencyContact.phone}`, icon: PhoneCall },
                        ].map((item) => <InfoRow key={item.label} {...item} />)}
                      </div>
                      {saveMutation.isError && (
                        <div className="flex items-center gap-2 p-3 rounded-lg text-sm mb-4" style={{ background: '#EF444420', color: '#EF4444', border: '1px solid #EF444440' }}>
                          <AlertTriangle size={14} /> {saveMutation.error?.message ?? 'Failed to save. Please try again.'}
                        </div>
                      )}
                      <button
                        onClick={() => saveMutation.mutate(previewData)}
                        disabled={saveMutation.isPending}
                        className="w-full py-3 rounded-lg font-bold text-white text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: 'linear-gradient(to right, #10B981, #059669)' }}
                      >
                        {saveMutation.isPending
                          ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving to your account...</span>
                          : <span className="flex items-center justify-center gap-2"><CheckCircle size={16} /> Confirm &amp; Save License</span>}
                      </button>
                    </Card>
                  )}

                  {/* No profile, no preview → DL lookup form */}
                  {(!savedProfile || showLookupForm) && !previewData && (
                    <Card variant="glass" size="full">
                      <div className="max-w-lg mx-auto py-8 text-center">
                        <Landmark size={48} className="text-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Verify Your Driving License</h3>
                        <p className="text-slate-400 mb-2 text-base">
                          Fetch your details from the
                          <span className="text-indigo-400 font-medium"> Sarathi Parivahan database</span>.
                          This is required before you can submit any road hazard reports.
                        </p>
                        <p className="text-slate-500 text-sm mb-8">
                          Your account name <span className="text-slate-300 font-medium">({user?.name})</span> will be used automatically for verification.
                        </p>
                        <form onSubmit={handleLookup} className="flex flex-col gap-4 text-left">
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Driving License Number</label>
                            <input
                              type="text" value={dlInput}
                              onChange={(e) => { setDlInput(e.target.value); setDlError(null); }}
                              placeholder="e.g. HR0620110012345 or HR-06-2011-0012345"
                              className="w-full px-4 py-3 rounded-lg text-white text-base outline-none focus:ring-2 focus:ring-indigo-500"
                              style={{ background: '#1e293b', border: '1px solid #334155' }}
                              disabled={lookupMutation.isPending}
                            />
                            <p className="text-xs text-slate-500 mt-1">Format: 2-letter state code + RTO code + year + 7-digit serial</p>
                          </div>
                          {(dlError || lookupMutation.isError) && (
                            <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ background: '#EF444420', color: '#EF4444', border: '1px solid #EF444440' }}>
                              <AlertTriangle size={14} /> {dlError ?? lookupMutation.error?.message ?? 'Something went wrong'}
                            </div>
                          )}
                          <button
                            type="submit" disabled={lookupMutation.isPending || !dlInput.trim()}
                            className="w-full py-3 rounded-lg font-bold text-white text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ background: 'linear-gradient(to right, #6366F1, #8B5CF6, #06B6D4)' }}
                          >
                            {lookupMutation.isPending
                              ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Fetching from Sarathi Parivahan...</span>
                              : <span className="flex items-center justify-center gap-2"><Search size={16} /> Fetch License Details</span>}
                          </button>
                        </form>
                      </div>
                    </Card>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </LoadingAnimation>
    </div>
  );
};

export default ProfilePage;

