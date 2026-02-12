import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, LoadingAnimation, SpotlightEffect } from '../components/index.js';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [safetyScore, setSafetyScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const userData = {
    name: "Saksham Agarwal",
    id: "DL-1420110012345",
    licenseNumber: "HR-0619850123456",
    issueDate: "15-March-2020",
    expiryDate: "14-March-2040",
    vehicleType: "Two Wheeler",
    phone: "+91 98765 43210",
    email: "Sakshamagarwal@email.com",
    address: "LPU, Phagwara, Punjab 144411",
    emergencyContact: "Saksham Agarwal - +91 98765 43211"
  };

  const safetyData = {
    currentScore: 850,
    maxScore: 1000,
    rank: "A+",
    percentile: 92,
    improvementFromLastMonth: 15,
    totalDistance: "12,450 km",
    safeTrips: 245,
    violationFreeStreak: 45
  };

  const violationHistory = [
    {
      id: 1,
      type: "Overspeeding",
      date: "2024-09-15",
      location: "GT Road, Jalandhar",
      fine: "₹1,000",
      points: -50,
      status: "Paid",
      severity: "Medium"
    },
    {
      id: 2,
      type: "No Helmet",
      date: "2024-08-22",
      location: "Model Town, Ludhiana",
      fine: "₹500",
      points: -30,
      status: "Appealed",
      severity: "Low"
    },
    {
      id: 3,
      type: "Signal Violation",
      date: "2024-07-10",
      location: "Civil Lines, Phagwara",
      fine: "₹2,000",
      points: -75,
      status: "Paid",
      severity: "High"
    }
  ];

  const achievements = [
    {
      title: "Safe Driver",
      description: "30 days without violations",
      icon: "🏆",
      earned: true,
      date: "2024-09-01"
    },
    {
      title: "Eco Warrior",
      description: "Reported 10+ road hazards",
      icon: "🌱",
      earned: true,
      date: "2024-08-15"
    },
    {
      title: "Speed Control Master",
      description: "Maintained speed limits for 60 days",
      icon: "⚡",
      earned: false,
      progress: 75
    },
    {
      title: "Safety Ambassador",
      description: "Score above 900 for 90 days",
      icon: "🎯",
      earned: false,
      progress: 45
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "trip",
      message: "Completed safe trip: Home to LPU",
      timestamp: "2 hours ago",
      points: "+5"
    },
    {
      id: 2,
      type: "report",
      message: "Reported pothole on GT Road",
      timestamp: "1 day ago",
      points: "+10"
    },
    {
      id: 3,
      type: "violation",
      message: "Speed limit exceeded on NH44",
      timestamp: "3 days ago",
      points: "-25"
    },
    {
      id: 4,
      type: "achievement",
      message: "Earned 'Safe Driver' badge",
      timestamp: "1 week ago",
      points: "+50"
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 900) return '#10B981';
    if (score >= 750) return '#F59E0B';
    if (score >= 500) return '#3B82F6';
    return '#EF4444';
  };

  const getScoreGrade = (score) => {
    if (score >= 900) return { grade: 'A+', color: '#10B981' };
    if (score >= 800) return { grade: 'A', color: '#10B981' };
    if (score >= 700) return { grade: 'B+', color: '#F59E0B' };
    if (score >= 600) return { grade: 'B', color: '#F59E0B' };
    if (score >= 500) return { grade: 'C', color: '#3B82F6' };
    return { grade: 'D', color: '#EF4444' };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    const scoreTimer = setTimeout(() => {
      const animateScore = () => {
        let current = 0;
        const increment = safetyData.currentScore / 60;
        const scoreInterval = setInterval(() => {
          current += increment;
          if (current >= safetyData.currentScore) {
            setSafetyScore(safetyData.currentScore);
            clearInterval(scoreInterval);
          } else {
            setSafetyScore(Math.floor(current));
          }
        }, 30);
      };
      animateScore();
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(scoreTimer);
    };
  }, [safetyData.currentScore]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background-primary via-background-secondary to-background-tertiary">
        <LoadingAnimation>
          <Card variant="glass" size="lg">
            <div className="text-center p-8">
              <div className="w-15 h-15 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-5" />
              <h2 className="text-white text-xl mb-2">
                Loading Your Profile...
              </h2>
              <p className="text-slate-300 text-base">
                Fetching your safety data and statistics
              </p>
            </div>
          </Card>
        </LoadingAnimation>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6 bg-gradient-to-b from-background-primary via-background-secondary to-background-tertiary">
      <SpotlightEffect />
      <LoadingAnimation>
        <div className="max-w-screen-xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card variant="glass" size="full">
              <div className="flex items-center gap-6 flex-wrap">
                {/* Profile Avatar */}
                <div className="relative">
                  <div
                    className="w-30 h-30 rounded-full bg-gradient-to-br from-primary via-primary-light to-tertiary flex items-center justify-center text-4xl font-bold text-white"
                    style={{ border: '4px solid #6366F1' }}
                  >
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 text-white px-2 py-1 rounded-full text-sm font-bold border-2"
                    style={{
                      background: getScoreGrade(safetyData.currentScore).color,
                      borderColor: '#1e293b'
                    }}
                  >
                    {getScoreGrade(safetyData.currentScore).grade}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 min-w-[300px]">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {userData.name}
                  </h1>
                  <p className="text-lg text-slate-300 mb-4">
                    License: {userData.licenseNumber} • {userData.vehicleType}
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <div className="px-3 py-2 rounded-lg text-sm font-semibold" style={{ background: '#10B98120', color: '#10B981' }}>
                      🛡️ Verified Driver
                    </div>
                    <div className="px-3 py-2 rounded-lg text-sm font-semibold" style={{ background: '#6366F120', color: '#6366F1' }}>
                      📍 Punjab, India
                    </div>
                  </div>
                </div>

                {/* Safety Score */}
                <div className="text-center min-w-[200px]">
                  <div className="relative w-[150px] h-[150px] mx-auto">
                    <svg width="150" height="150" className="-rotate-90">
                      <circle
                        cx="75"
                        cy="75"
                        r="65"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="75"
                        cy="75"
                        r="65"
                        stroke={getScoreColor(safetyScore)}
                        strokeWidth="10"
                        fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 65}`}
                        strokeDashoffset={`${2 * Math.PI * 65 * (1 - safetyScore / safetyData.maxScore)}`}
                        className="transition-all duration-2000 ease-in-out"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <div
                        className="text-2xl font-bold"
                        style={{ color: getScoreColor(safetyScore) }}
                      >
                        {safetyScore}
                      </div>
                      <div className="text-sm text-slate-300">
                        Safety Score
                      </div>
                    </div>
                  </div>
                  {safetyData.improvementFromLastMonth > 0 && (
                    <div className="mt-2 text-sm font-medium" style={{ color: '#10B981' }}>
                      ↗️ +{safetyData.improvementFromLastMonth} this month
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex mb-6 rounded-xl bg-background-secondary p-2 flex-wrap gap-2">
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'violations', label: '⚠️ Violations', icon: '⚠️' },
              { id: 'achievements', label: '🏆 Achievements', icon: '🏆' },
              { id: 'personal', label: '👤 Personal Info', icon: '👤' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] p-3 border-none rounded-lg cursor-pointer transition-all duration-300 text-base ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary via-primary-light to-tertiary text-white font-bold'
                    : 'bg-transparent text-slate-300 font-medium'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                  {/* Statistics Cards */}
                  {[
                    { title: 'Total Distance', value: safetyData.totalDistance, icon: '🛣️', color: '#3B82F6' },
                    { title: 'Safe Trips', value: safetyData.safeTrips, icon: '✅', color: '#10B981' },
                    { title: 'Current Rank', value: `${safetyData.rank} (Top ${safetyData.percentile}%)`, icon: '🎖️', color: '#F59E0B' },
                    { title: 'Violation-Free Streak', value: `${safetyData.violationFreeStreak} days`, icon: '🔥', color: '#EF4444' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card variant="elevated" size="full">
                        <div className="text-center p-4">
                          <div className="text-[2.5rem] mb-3">
                            {stat.icon}
                          </div>
                          <h3 className="text-xl font-bold mb-2" style={{ color: stat.color }}>
                            {stat.value}
                          </h3>
                          <p className="text-base text-slate-400">
                            {stat.title}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}

                  {/* Recent Activity */}
                  <div className="col-[1/-1]">
                    <Card variant="glass" size="full">
                      <h3 className="text-xl font-bold text-white mb-4">
                        📱 Recent Activity
                      </h3>
                      <div className="flex flex-col gap-3">
                        {recentActivity.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center justify-between p-3 rounded-lg border"
                            style={{ background: '#1e293b', borderColor: '#334155' }}
                          >
                            <div className="flex-1">
                              <p className="text-white text-base mb-1">
                                {activity.message}
                              </p>
                              <p className="text-slate-400 text-sm">
                                {activity.timestamp}
                              </p>
                            </div>
                            <div
                              className="px-2 py-1 rounded-lg text-sm font-semibold"
                              style={{
                                background: activity.points.startsWith('+')
                                  ? '#10B98120'
                                  : '#EF444420',
                                color: activity.points.startsWith('+')
                                  ? '#10B981'
                                  : '#EF4444'
                              }}
                            >
                              {activity.points}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 'violations' && (
                <Card variant="glass" size="full">
                  <h3 className="text-xl font-bold text-white mb-6">
                    ⚠️ Violation History
                  </h3>
                  <div className="flex flex-col gap-4">
                    {violationHistory.map((violation) => (
                      <div
                        key={violation.id}
                        className="p-4 rounded-lg border"
                        style={{ background: '#1e293b', borderColor: '#334155' }}
                      >
                        <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-1">
                              {violation.type}
                            </h4>
                            <p className="text-slate-400 text-base">
                              📍 {violation.location} • 📅 {violation.date}
                            </p>
                          </div>
                          <div className="flex gap-2 items-center">
                            <div
                              className="px-2 py-1 rounded-lg text-sm font-medium"
                              style={{
                                background: violation.severity === 'High'
                                  ? '#EF444420'
                                  : violation.severity === 'Medium'
                                    ? '#F59E0B20'
                                    : '#3B82F620',
                                color: violation.severity === 'High'
                                  ? '#EF4444'
                                  : violation.severity === 'Medium'
                                    ? '#F59E0B'
                                    : '#3B82F6'
                              }}
                            >
                              {violation.severity}
                            </div>
                            <div
                              className="px-2 py-1 rounded-lg text-sm font-medium"
                              style={{
                                background: violation.status === 'Paid'
                                  ? '#10B98120'
                                  : '#F59E0B20',
                                color: violation.status === 'Paid'
                                  ? '#10B981'
                                  : '#F59E0B'
                              }}
                            >
                              {violation.status}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <div className="text-white text-lg font-semibold">
                            Fine: {violation.fine}
                          </div>
                          <div className="text-base font-medium" style={{ color: '#EF4444' }}>
                            Points: {violation.points}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {activeTab === 'achievements' && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card variant={achievement.earned ? "elevated" : "outlined"} size="full">
                        <div
                          className="p-4 text-center relative"
                          style={{ opacity: achievement.earned ? 1 : 0.7 }}
                        >
                          <div
                            className="text-[3rem] mb-3"
                            style={{ filter: achievement.earned ? 'none' : 'grayscale(1)' }}
                          >
                            {achievement.icon}
                          </div>
                          <h4
                            className="text-lg font-bold mb-2"
                            style={{ color: achievement.earned ? '#ffffff' : '#94a3b8' }}
                          >
                            {achievement.title}
                          </h4>
                          <p className="text-slate-400 text-base mb-3">
                            {achievement.description}
                          </p>
                          {achievement.earned ? (
                            <div className="text-sm font-medium" style={{ color: '#10B981' }}>
                              ✅ Earned on {achievement.date}
                            </div>
                          ) : (
                            <div>
                              <div className="bg-slate-700 rounded-full h-2 mb-2 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-primary via-primary-light to-tertiary h-full rounded-full transition-all duration-1000 ease-in-out"
                                  style={{ width: `${achievement.progress}%` }}
                                />
                              </div>
                              <div className="text-slate-400 text-sm">
                                {achievement.progress}% complete
                              </div>
                            </div>
                          )}
                          {achievement.earned && (
                            <div
                              className="absolute top-2 right-2 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                              style={{ background: '#10B981' }}
                            >
                              ✓
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'personal' && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6">
                  <Card variant="glass" size="full">
                    <h3 className="text-xl font-bold text-white mb-4">
                      👤 Personal Information
                    </h3>
                    <div className="flex flex-col gap-4">
                      {[
                        { label: 'Full Name', value: userData.name, icon: '👤' },
                        { label: 'Driver ID', value: userData.id, icon: '🆔' },
                        { label: 'Phone', value: userData.phone, icon: '📞' },
                        { label: 'Email', value: userData.email, icon: '📧' },
                        { label: 'Address', value: userData.address, icon: '📍' },
                        { label: 'Emergency Contact', value: userData.emergencyContact, icon: '🚨' }
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-3 p-3 rounded-lg border"
                          style={{ background: '#1e293b', borderColor: '#334155' }}
                        >
                          <div className="text-2xl">{item.icon}</div>
                          <div className="flex-1">
                            <div className="text-sm text-slate-400 mb-1">
                              {item.label}
                            </div>
                            <div className="text-base text-white font-medium">
                              {item.value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card variant="glass" size="full">
                    <h3 className="text-xl font-bold text-white mb-4">
                      📄 License Information
                    </h3>
                    <div className="flex flex-col gap-4">
                      {[
                        { label: 'License Number', value: userData.licenseNumber, icon: '📋' },
                        { label: 'Vehicle Type', value: userData.vehicleType, icon: '🏍️' },
                        { label: 'Issue Date', value: userData.issueDate, icon: '📅' },
                        { label: 'Expiry Date', value: userData.expiryDate, icon: '⏰' }
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-3 p-3 rounded-lg border"
                          style={{ background: '#1e293b', borderColor: '#334155' }}
                        >
                          <div className="text-2xl">{item.icon}</div>
                          <div className="flex-1">
                            <div className="text-sm text-slate-400 mb-1">
                              {item.label}
                            </div>
                            <div className="text-base text-white font-medium">
                              {item.value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      className="mt-6 p-4 rounded-lg border"
                      style={{ background: '#10B98110', borderColor: '#10B98130' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-2xl">✅</div>
                        <div className="font-bold text-base" style={{ color: '#10B981' }}>
                          License Status: Valid
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm">
                        Your driving license is currently valid and will expire on {userData.expiryDate}.
                        You'll receive a reminder 60 days before expiry.
                      </p>
                    </div>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </LoadingAnimation>
    </div>
  );
};

export default ProfilePage;
