import { useState, useCallback } from 'react';
import { getFullLocation } from '../services/geocoding';
import { useLocationStore } from '../stores/locationStore';

export const useLocation = () => {
    const { getFreshLocation, saveLocation, clearCache, getCacheAgeSeconds } =
        useLocationStore();

    const [location, setLocation] = useState(() => {
        const cached = getFreshLocation();
        return cached
            ? { lat: cached.lat, lng: cached.lng, address: cached.address }
            : { lat: '', lng: '', address: '' };
    });

    const [isDetecting, setIsDetecting] = useState(false);
    const [isCached, setIsCached] = useState(() => !!getFreshLocation());
    const [error, setError] = useState(null);

    const detectLocation = useCallback(async (forceRefresh = false) => {
        if (!forceRefresh) {
            const cached = getFreshLocation();
            if (cached) {
                setLocation({ lat: cached.lat, lng: cached.lng, address: cached.address });
                setIsCached(true);
                setError(null);
                return cached;
            }
        }

        setIsDetecting(true);
        setIsCached(false);
        setError(null);

        try {
            const result = await getFullLocation();

            if (result.success) {
                const { lat, lng, address } = result.location;
                saveLocation(lat, lng, address);
                setLocation({ lat, lng, address });
                setIsCached(false);
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
    }, [getFreshLocation, saveLocation]);

    const setManualLocation = useCallback((lat, lng, address) => {
        saveLocation(lat, lng, address);
        setLocation({ lat, lng, address });
        setIsCached(false);
        setError(null);
    }, [saveLocation]);

    const updateLocationField = useCallback((field, value) => {
        setLocation(prev => ({ ...prev, [field]: value }));
    }, []);

    const clearLocation = useCallback(() => {
        clearCache();
        setLocation({ lat: '', lng: '', address: '' });
        setIsCached(false);
        setError(null);
    }, [clearCache]);

    const clearError = useCallback(() => setError(null), []);

    return {
        location,
        isDetecting,
        isCached,
        cacheAgeSeconds: getCacheAgeSeconds(),
        error,
        detectLocation,
        setManualLocation,
        updateLocationField,
        clearLocation,
        clearError,
    };
};
