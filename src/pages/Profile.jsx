import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, LoadingAnimation } from '../components/index.js';
import { theme } from '../styles/theme.js';

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
    if (score >= 900) return theme.colors.success.main;
    if (score >= 750) return theme.colors.warning.main;
    if (score >= 500) return theme.colors.info.main;
    return theme.colors.error.main;
  };

  const getScoreGrade = (score) => {
    if (score >= 900) return { grade: 'A+', color: theme.colors.success.main };
    if (score >= 800) return { grade: 'A', color: theme.colors.success.main };
    if (score >= 700) return { grade: 'B+', color: theme.colors.warning.main };
    if (score >= 600) return { grade: 'B', color: theme.colors.warning.main };
    if (score >= 500) return { grade: 'C', color: theme.colors.info.main };
    return { grade: 'D', color: theme.colors.error.main };
  };

  useEffect(() => {
    // Simulate loading and score animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

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
  }, []);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.background.gradient,
      }}>
        <LoadingAnimation>
          <Card variant="glass" size="lg">
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              <div style={{
                width: '60px',
                height: '60px',
                border: `3px solid ${theme.colors.primary.main}`,
                borderTop: '3px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px auto',
              }} />
              <h2 style={{
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.xl,
                marginBottom: theme.spacing[2],
              }}>
                Loading Your Profile...
              </h2>
              <p style={{
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.base,
              }}>
                Fetching your safety data and statistics
              </p>
            </div>
          </Card>
        </LoadingAnimation>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: `${theme.spacing[8]} ${theme.spacing[6]}`,
      background: theme.colors.background.gradient,
    }}>
      <LoadingAnimation>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              marginBottom: theme.spacing[8] 
            }}
          >
            <Card variant="glass" size="full">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[6],
                flexWrap: 'wrap',
              }}>
                {/* Profile Avatar */}
                <div style={{
                  position: 'relative',
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: theme.colors.primary.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: theme.typography.fontSize['4xl'],
                    fontWeight: theme.typography.fontWeight.bold,
                    color: '#ffffff',
                    border: `4px solid ${theme.colors.primary.main}`,
                  }}>
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-5px',
                    right: '-5px',
                    background: getScoreGrade(safetyData.currentScore).color,
                    color: '#ffffff',
                    padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                    borderRadius: theme.borderRadius.full,
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.bold,
                    border: `2px solid ${theme.colors.background.card}`,
                  }}>
                    {getScoreGrade(safetyData.currentScore).grade}
                  </div>
                </div>

                {/* Profile Info */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <h1 style={{
                    fontSize: theme.typography.fontSize['3xl'],
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text.primary,
                    marginBottom: theme.spacing[2],
                  }}>
                    {userData.name}
                  </h1>
                  <p style={{
                    fontSize: theme.typography.fontSize.lg,
                    color: theme.colors.text.secondary,
                    marginBottom: theme.spacing[4],
                  }}>
                    License: {userData.licenseNumber} • {userData.vehicleType}
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: theme.spacing[4],
                    flexWrap: 'wrap',
                  }}>
                    <div style={{
                      background: theme.colors.success.main + '20',
                      padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                      borderRadius: theme.borderRadius.lg,
                      color: theme.colors.success.main,
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.semibold,
                    }}>
                      🛡️ Verified Driver
                    </div>
                    <div style={{
                      background: theme.colors.primary.main + '20',
                      padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                      borderRadius: theme.borderRadius.lg,
                      color: theme.colors.primary.main,
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.semibold,
                    }}>
                      📍 Punjab, India
                    </div>
                  </div>
                </div>

                {/* Safety Score */}
                <div style={{
                  textAlign: 'center',
                  minWidth: '200px',
                }}>
                  <div style={{
                    position: 'relative',
                    width: '150px',
                    height: '150px',
                    margin: '0 auto',
                  }}>
                    <svg width="150" height="150" style={{ transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="75"
                        cy="75"
                        r="65"
                        stroke={theme.colors.border.secondary}
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
                        style={{ transition: 'stroke-dashoffset 2s ease-in-out' }}
                      />
                    </svg>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                    }}>
                      <div style={{
                        fontSize: theme.typography.fontSize['2xl'],
                        fontWeight: theme.typography.fontWeight.bold,
                        color: getScoreColor(safetyScore),
                      }}>
                        {safetyScore}
                      </div>
                      <div style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}>
                        Safety Score
                      </div>
                    </div>
                  </div>
                  {safetyData.improvementFromLastMonth > 0 && (
                    <div style={{
                      marginTop: theme.spacing[2],
                      color: theme.colors.success.main,
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.medium,
                    }}>
                      ↗️ +{safetyData.improvementFromLastMonth} this month
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            marginBottom: theme.spacing[6],
            borderRadius: theme.borderRadius.xl,
            background: theme.colors.background.secondary,
            padding: theme.spacing[2],
            flexWrap: 'wrap',
            gap: theme.spacing[2],
          }}>
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'violations', label: '⚠️ Violations', icon: '⚠️' },
              { id: 'achievements', label: '🏆 Achievements', icon: '🏆' },
              { id: 'personal', label: '👤 Personal Info', icon: '👤' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  minWidth: '120px',
                  padding: theme.spacing[3],
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
                  fontSize: theme.typography.fontSize.base,
                }}
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
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: theme.spacing[6],
                }}>
                  {/* Statistics Cards */}
                  {[
                    { title: 'Total Distance', value: safetyData.totalDistance, icon: '🛣️', color: theme.colors.info.main },
                    { title: 'Safe Trips', value: safetyData.safeTrips, icon: '✅', color: theme.colors.success.main },
                    { title: 'Current Rank', value: `${safetyData.rank} (Top ${safetyData.percentile}%)`, icon: '🎖️', color: theme.colors.warning.main },
                    { title: 'Violation-Free Streak', value: `${safetyData.violationFreeStreak} days`, icon: '🔥', color: theme.colors.error.main }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card variant="elevated" size="full">
                        <div style={{ textAlign: 'center', padding: theme.spacing[4] }}>
                          <div style={{
                            fontSize: '2.5rem',
                            marginBottom: theme.spacing[3],
                          }}>
                            {stat.icon}
                          </div>
                          <h3 style={{
                            fontSize: theme.typography.fontSize.xl,
                            fontWeight: theme.typography.fontWeight.bold,
                            color: stat.color,
                            marginBottom: theme.spacing[2],
                          }}>
                            {stat.value}
                          </h3>
                          <p style={{
                            fontSize: theme.typography.fontSize.base,
                            color: theme.colors.text.secondary,
                          }}>
                            {stat.title}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}

                  {/* Recent Activity */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Card variant="glass" size="full">
                      <h3 style={{
                        fontSize: theme.typography.fontSize.xl,
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.text.primary,
                        marginBottom: theme.spacing[4],
                      }}>
                        📱 Recent Activity
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
                        {recentActivity.map((activity) => (
                          <div
                            key={activity.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: theme.spacing[3],
                              background: theme.colors.background.card,
                              borderRadius: theme.borderRadius.lg,
                              border: `1px solid ${theme.colors.border.secondary}`,
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <p style={{
                                color: theme.colors.text.primary,
                                fontSize: theme.typography.fontSize.base,
                                marginBottom: theme.spacing[1],
                              }}>
                                {activity.message}
                              </p>
                              <p style={{
                                color: theme.colors.text.secondary,
                                fontSize: theme.typography.fontSize.sm,
                              }}>
                                {activity.timestamp}
                              </p>
                            </div>
                            <div style={{
                              padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                              borderRadius: theme.borderRadius.lg,
                              background: activity.points.startsWith('+') 
                                ? theme.colors.success.main + '20'
                                : theme.colors.error.main + '20',
                              color: activity.points.startsWith('+') 
                                ? theme.colors.success.main
                                : theme.colors.error.main,
                              fontSize: theme.typography.fontSize.sm,
                              fontWeight: theme.typography.fontWeight.semibold,
                            }}>
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
                  <h3 style={{
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text.primary,
                    marginBottom: theme.spacing[6],
                  }}>
                    ⚠️ Violation History
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
                    {violationHistory.map((violation) => (
                      <div
                        key={violation.id}
                        style={{
                          padding: theme.spacing[4],
                          background: theme.colors.background.card,
                          borderRadius: theme.borderRadius.lg,
                          border: `1px solid ${theme.colors.border.secondary}`,
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: theme.spacing[3],
                          flexWrap: 'wrap',
                          gap: theme.spacing[2],
                        }}>
                          <div>
                            <h4 style={{
                              fontSize: theme.typography.fontSize.lg,
                              fontWeight: theme.typography.fontWeight.semibold,
                              color: theme.colors.text.primary,
                              marginBottom: theme.spacing[1],
                            }}>
                              {violation.type}
                            </h4>
                            <p style={{
                              color: theme.colors.text.secondary,
                              fontSize: theme.typography.fontSize.base,
                            }}>
                              📍 {violation.location} • 📅 {violation.date}
                            </p>
                          </div>
                          <div style={{
                            display: 'flex',
                            gap: theme.spacing[2],
                            alignItems: 'center',
                          }}>
                            <div style={{
                              padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                              borderRadius: theme.borderRadius.lg,
                              background: violation.severity === 'High' 
                                ? theme.colors.error.main + '20'
                                : violation.severity === 'Medium'
                                ? theme.colors.warning.main + '20'
                                : theme.colors.info.main + '20',
                              color: violation.severity === 'High' 
                                ? theme.colors.error.main
                                : violation.severity === 'Medium'
                                ? theme.colors.warning.main
                                : theme.colors.info.main,
                              fontSize: theme.typography.fontSize.sm,
                              fontWeight: theme.typography.fontWeight.medium,
                            }}>
                              {violation.severity}
                            </div>
                            <div style={{
                              padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                              borderRadius: theme.borderRadius.lg,
                              background: violation.status === 'Paid' 
                                ? theme.colors.success.main + '20'
                                : theme.colors.warning.main + '20',
                              color: violation.status === 'Paid' 
                                ? theme.colors.success.main
                                : theme.colors.warning.main,
                              fontSize: theme.typography.fontSize.sm,
                              fontWeight: theme.typography.fontWeight.medium,
                            }}>
                              {violation.status}
                            </div>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: theme.spacing[2],
                        }}>
                          <div style={{
                            color: theme.colors.text.primary,
                            fontSize: theme.typography.fontSize.lg,
                            fontWeight: theme.typography.fontWeight.semibold,
                          }}>
                            Fine: {violation.fine}
                          </div>
                          <div style={{
                            color: theme.colors.error.main,
                            fontSize: theme.typography.fontSize.base,
                            fontWeight: theme.typography.fontWeight.medium,
                          }}>
                            Points: {violation.points}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {activeTab === 'achievements' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: theme.spacing[4],
                }}>
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card variant={achievement.earned ? "elevated" : "outlined"} size="full">
                        <div style={{
                          padding: theme.spacing[4],
                          textAlign: 'center',
                          position: 'relative',
                          opacity: achievement.earned ? 1 : 0.7,
                        }}>
                          <div style={{
                            fontSize: '3rem',
                            marginBottom: theme.spacing[3],
                            filter: achievement.earned ? 'none' : 'grayscale(1)',
                          }}>
                            {achievement.icon}
                          </div>
                          <h4 style={{
                            fontSize: theme.typography.fontSize.lg,
                            fontWeight: theme.typography.fontWeight.bold,
                            color: achievement.earned 
                              ? theme.colors.text.primary 
                              : theme.colors.text.secondary,
                            marginBottom: theme.spacing[2],
                          }}>
                            {achievement.title}
                          </h4>
                          <p style={{
                            color: theme.colors.text.secondary,
                            fontSize: theme.typography.fontSize.base,
                            marginBottom: theme.spacing[3],
                          }}>
                            {achievement.description}
                          </p>
                          {achievement.earned ? (
                            <div style={{
                              color: theme.colors.success.main,
                              fontSize: theme.typography.fontSize.sm,
                              fontWeight: theme.typography.fontWeight.medium,
                            }}>
                              ✅ Earned on {achievement.date}
                            </div>
                          ) : (
                            <div>
                              <div style={{
                                background: theme.colors.background.secondary,
                                borderRadius: theme.borderRadius.full,
                                height: '8px',
                                marginBottom: theme.spacing[2],
                                overflow: 'hidden',
                              }}>
                                <div style={{
                                  background: theme.colors.primary.gradient,
                                  height: '100%',
                                  width: `${achievement.progress}%`,
                                  borderRadius: theme.borderRadius.full,
                                  transition: 'width 1s ease-in-out',
                                }} />
                              </div>
                              <div style={{
                                color: theme.colors.text.secondary,
                                fontSize: theme.typography.fontSize.sm,
                              }}>
                                {achievement.progress}% complete
                              </div>
                            </div>
                          )}
                          {achievement.earned && (
                            <div style={{
                              position: 'absolute',
                              top: theme.spacing[2],
                              right: theme.spacing[2],
                              background: theme.colors.success.main,
                              color: '#ffffff',
                              borderRadius: theme.borderRadius.full,
                              width: '24px',
                              height: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                            }}>
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
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                  gap: theme.spacing[6],
                }}>
                  <Card variant="glass" size="full">
                    <h3 style={{
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing[4],
                    }}>
                      👤 Personal Information
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
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
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing[3],
                            padding: theme.spacing[3],
                            background: theme.colors.background.card,
                            borderRadius: theme.borderRadius.lg,
                            border: `1px solid ${theme.colors.border.secondary}`,
                          }}
                        >
                          <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.colors.text.secondary,
                              marginBottom: theme.spacing[1],
                            }}>
                              {item.label}
                            </div>
                            <div style={{
                              fontSize: theme.typography.fontSize.base,
                              color: theme.colors.text.primary,
                              fontWeight: theme.typography.fontWeight.medium,
                            }}>
                              {item.value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card variant="glass" size="full">
                    <h3 style={{
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing[4],
                    }}>
                      📄 License Information
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
                      {[
                        { label: 'License Number', value: userData.licenseNumber, icon: '📋' },
                        { label: 'Vehicle Type', value: userData.vehicleType, icon: '🏍️' },
                        { label: 'Issue Date', value: userData.issueDate, icon: '📅' },
                        { label: 'Expiry Date', value: userData.expiryDate, icon: '⏰' }
                      ].map((item) => (
                        <div
                          key={item.label}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing[3],
                            padding: theme.spacing[3],
                            background: theme.colors.background.card,
                            borderRadius: theme.borderRadius.lg,
                            border: `1px solid ${theme.colors.border.secondary}`,
                          }}
                        >
                          <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.colors.text.secondary,
                              marginBottom: theme.spacing[1],
                            }}>
                              {item.label}
                            </div>
                            <div style={{
                              fontSize: theme.typography.fontSize.base,
                              color: theme.colors.text.primary,
                              fontWeight: theme.typography.fontWeight.medium,
                            }}>
                              {item.value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      marginTop: theme.spacing[6],
                      padding: theme.spacing[4],
                      background: theme.colors.success.main + '10',
                      borderRadius: theme.borderRadius.lg,
                      border: `1px solid ${theme.colors.success.main}30`,
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing[2],
                        marginBottom: theme.spacing[2],
                      }}>
                        <div style={{ fontSize: '1.5rem' }}>✅</div>
                        <div style={{
                          color: theme.colors.success.main,
                          fontWeight: theme.typography.fontWeight.bold,
                          fontSize: theme.typography.fontSize.base,
                        }}>
                          License Status: Valid
                        </div>
                      </div>
                      <p style={{
                        color: theme.colors.text.secondary,
                        fontSize: theme.typography.fontSize.sm,
                      }}>
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

export default ProfilePage;
