const NOMINATIM_API_BASE = 'https://nominatim.openstreetmap.org';

export const reverseGeocode = async (latitude, longitude) => {
    try {
        const url = `${NOMINATIM_API_BASE}/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'SAFE-India-App/1.0'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch address from OpenStreetMap');
        }

        const data = await response.json();

        if (!data || data.error) {
            throw new Error(data.error || 'No results found');
        }

        const address = data.address || {};
        const addressParts = [
            address.house_number,
            address.road || address.street,
            address.suburb || address.neighbourhood,
            address.village || address.town || address.city,
            address.state_district || address.county,
            address.state,
            address.postcode
        ].filter(Boolean);

        const formattedAddress = data.display_name || addressParts.join(', ');

        return {
            success: true,
            address: formattedAddress,
            data: {
                city: address.city || address.town || address.village || '',
                state: address.state || '',
                country: address.country || '',
                countryCode: address.country_code?.toUpperCase() || '',
                postcode: address.postcode || '',
                district: address.state_district || address.county || '',
                locality: address.suburb || address.neighbourhood || '',
                road: address.road || address.street || '',
                formatted_address: data.display_name,
                latitude: parseFloat(data.lat),
                longitude: parseFloat(data.lon),
                fullAddress: address
            }
        };
    } catch (error) {
        console.error('OpenStreetMap reverse geocoding error:', error);
        return {
            success: false,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            error: error.message
        };
    }
};

export const getCurrentPosition = (options = {}) => {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve({
                success: false,
                error: 'Geolocation is not supported by your browser'
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    success: true,
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    }
                });
            },
            (error) => {
                let errorMessage = 'Unable to retrieve location';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location access denied. Please enable location permissions.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                }

                resolve({
                    success: false,
                    error: errorMessage
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
                ...options
            }
        );
    });
};

export const getFullLocation = async (options = {}) => {
    const positionResult = await getCurrentPosition(options);

    if (!positionResult.success) {
        return {
            success: false,
            error: positionResult.error
        };
    }

    const { latitude, longitude } = positionResult.coords;

    const geocodeResult = await reverseGeocode(latitude, longitude);

    return {
        success: true,
        location: {
            lat: parseFloat(latitude.toFixed(6)),
            lng: parseFloat(longitude.toFixed(6)),
            address: geocodeResult.address,
            data: geocodeResult.data
        }
    };
};
