import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { STRINGS } from '../constants/index.js';
import SpotlightEffect from '../components/SpotLightEffect.jsx';
import { LEGALLINKS, QUICKLINKS } from '../constants/routes.js';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='bg-secondary px-4 sm:px-8 md:px-16 py-6 mt-4 pt-12 relative overflow-hidden'
    >
      <SpotlightEffect />
      <div className='max-w-7xl mx-auto relative z-10'>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12'>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className='flex items-center gap-3 text-xl font-bold text-white mb-4'>
              <Shield size={28} />
              <span>{STRINGS.APP_NAME}</span>
            </div>
            <p className='text-gray-300 leading-relaxed mb-4'>
              {STRINGS.APP_DESCRIPTION}
            </p>
            <div className='flex gap-4'>
              {[Github, Twitter, Linkedin, Mail].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.2,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon
                    size={20}
                    className='text-gray-300 hover:text-violet-400 transition-colors duration-300 cursor-pointer'
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className='text-lg font-bold mb-4 text-white'>Quick Links</h3>
            <nav className='flex flex-col gap-2'>
              {QUICKLINKS.map((q, idx) => (
                <Link
                  key={idx}
                  to={q[1]}
                  className='text-gray-300 text-sm hover:text-violet-400 transition-colors duration-300 no-underline'
                >
                  {q[0]}
                </Link>
              ))}
            </nav>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className='text-lg font-bold mb-4 text-white'>Legal</h3>
            <nav className='flex flex-col gap-2'>
              {LEGALLINKS.map((q, idx) => (
                <Link
                  key={idx}
                  to={q[1]}
                  className='text-gray-300 text-sm hover:text-violet-400 transition-colors duration-300 no-underline'
                >
                  {q[0]}
                </Link>
              ))}
            </nav>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className='text-lg font-bold mb-4 text-white'>Contact</h3>
            <div className='text-gray-300 text-sm space-y-3'>
              <p>
                Email: support@safeindia.gov.in
              </p>
              <p>
                Phone: +91-11-1234-5678
              </p>
              <p>
                Address: New Delhi, India
              </p>
            </div>
          </motion.div>
        </div>


        <div className='border-t border-gray-800 my-8' />


        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='flex flex-col text-center items-center gap-4'
        >
          <p className='text-gray-400 text-sm flex items-center justify-center gap-2 flex-wrap'>
            © {currentYear} {STRINGS.APP_NAME}. Made with
            <motion.span
              className='text-red-500 inline-flex'
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={16} fill="currentColor" />
            </motion.span>
            for a safer India
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;