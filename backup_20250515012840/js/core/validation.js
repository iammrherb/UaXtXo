// Form validation utilities
const Validation = {
    rules: {
        required: (value) => value !== null && value !== undefined && value !== '',
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        number: (value) => !isNaN(value) && isFinite(value),
        min: (value, min) => parseFloat(value) >= min,
        max: (value, max) => parseFloat(value) <= max,
        minLength: (value, length) => value.length >= length,
        maxLength: (value, length) => value.length <= length
    },
    
    validate(value, rules) {
        const errors = [];
        
        for (const [rule, param] of Object.entries(rules)) {
            if (rule === 'required' && param && !this.rules.required(value)) {
                errors.push('This field is required');
            }
            if (rule === 'email' && param && !this.rules.email(value)) {
                errors.push('Please enter a valid email address');
            }
            if (rule === 'number' && param && !this.rules.number(value)) {
                errors.push('Please enter a valid number');
            }
            if (rule === 'min' && !this.rules.min(value, param)) {
                errors.push(`Value must be at least ${param}`);
            }
            if (rule === 'max' && !this.rules.max(value, param)) {
                errors.push(`Value must be at most ${param}`);
            }
        }
        
        return errors;
    },
    
    validateForm(formElement) {
        const errors = {};
        const inputs = formElement.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            const rules = input.dataset.validate ? JSON.parse(input.dataset.validate) : {};
            const fieldErrors = this.validate(input.value, rules);
            
            if (fieldErrors.length > 0) {
                errors[input.name || input.id] = fieldErrors;
            }
        });
        
        return errors;
    }
};

window.Validation = Validation;
