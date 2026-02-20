import { useState, useCallback } from 'react';
import { getFullLocation } from '../services/geocoding';

/**
 * Custom hook for location detection and management
 * @returns {Object} Location state and methods
 */
export const useLocation = () => {
    const [location, setLocation] = useState({
        lat: '',
        lng: '',
        address: ''
    });
    const [isDetecting, setIsDetecting] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Detect current location using GPS and reverse geocoding
     */
    const detectLocation = useCallback(async () => {
        setIsDetecting(true);
        setError(null);

        try {
            const result = await getFullLocation();

            if (result.success) {
                setLocation({
                    lat: result.location.lat,
                    lng: result.location.lng,
                    address: result.location.address
                });
                return result.location;
            } else {
                setError(result.error);
                return null;
            }
        } catch (err) {
            const errorMessage = err.message || 'Failed to detect location';
            setError(errorMessage);
            return null;
        } finally {
            setIsDetecting(false);
        }
    }, []);

    /**
     * Manually set location
     */
    const setManualLocation = useCallback((lat, lng, address) => {
        setLocation({ lat, lng, address });
        setError(null);
    }, []);

    /**
     * Update specific location field
     */
    const updateLocationField = useCallback((field, value) => {
        setLocation(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    /**
     * Clear location data
     */
    const clearLocation = useCallback(() => {
        setLocation({ lat: '', lng: '', address: '' });
        setError(null);
    }, []);

    /**
     * Clear error
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        location,
        isDetecting,
        error,
        detectLocation,
        setManualLocation,
        updateLocationField,
        clearLocation,
        clearError
    };
};
