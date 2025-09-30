import { motion } from 'framer-motion';
import { Card } from '../components/index.js';
import { theme } from '../styles/theme.js';

const ProfilePage = () => {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing[6],
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card variant="elevated" size="xl">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: theme.typography.fontSize['3xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing[4],
            }}>
              User Profile
            </h1>
            <p style={{
              fontSize: theme.typography.fontSize.lg,
              color: theme.colors.text.secondary,
            }}>
              Coming Soon - User profile management and settings
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
