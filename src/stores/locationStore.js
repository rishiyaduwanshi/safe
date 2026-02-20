import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const LOCATION_TTL_MS = 10 * 60 * 1000;

export const useLocationStore = create(
    persist(
        (set, get) => ({
            lat: null,
            lng: null,
            address: null,
            cachedAt: null,

            saveLocation: (lat, lng, address) =>
                set({ lat, lng, address, cachedAt: Date.now() }),

            clearCache: () =>
                set({ lat: null, lng: null, address: null, cachedAt: null }),

            getFreshLocation: () => {
                const { lat, lng, address, cachedAt } = get();
                if (!lat || !lng || !address || !cachedAt) return null;
                if (Date.now() - cachedAt > LOCATION_TTL_MS) return null;
                return { lat, lng, address };
            },

            getCacheAgeSeconds: () => {
                const { cachedAt } = get();
                if (!cachedAt) return 0;
                return Math.floor((Date.now() - cachedAt) / 1000);
            },
        }),
        {
            name: 'safe-location-cache',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                lat: state.lat,
                lng: state.lng,
                address: state.address,
                cachedAt: state.cachedAt,
            }),
        }
    )
);
