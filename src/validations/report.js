export const reportValidation = {
    reportText: {
        required: 'Please describe the issue',
        minLength: {
            value: 10,
            message: 'Description must be at least 10 characters'
        },
        maxLength: {
            value: 1000,
            message: 'Description cannot exceed 1000 characters'
        }
    },
    location: {
        lat: {
            required: 'Latitude is required',
            validate: (value) => {
                const num = parseFloat(value);
                if (isNaN(num)) return 'Latitude must be a number';
                if (num < -90 || num > 90) return 'Latitude must be between -90 and 90';
                return true;
            }
        },
        lng: {
            required: 'Longitude is required',
            validate: (value) => {
                const num = parseFloat(value);
                if (isNaN(num)) return 'Longitude must be a number';
                if (num < -180 || num > 180) return 'Longitude must be between -180 and 180';
                return true;
            }
        },
        address: {
            required: 'Address is required',
            minLength: {
                value: 3,
                message: 'Address must be at least 3 characters'
            }
        }
    }
};

export const formatReportData = (formData) => {
    return {
        reportText: formData.reportText.trim(),
        location: {
            lat: parseFloat(formData.location.lat),
            lng: parseFloat(formData.location.lng),
            address: formData.location.address.trim()
        }
    };
};
