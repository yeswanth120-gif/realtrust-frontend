export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePhone(phone: string): boolean {
  const regex = /^[\d\s\-\+\(\)]{10,}$/;
  return regex.test(phone);
}

export function validateForm(data: {
  full_name?: string;
  email?: string;
  mobile?: string;
  city?: string;
  name?: string;
  designation?: string;
  description?: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (data.full_name && data.full_name.trim().length < 2) {
    errors.full_name = 'Name must be at least 2 characters';
  }

  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (data.mobile && !validatePhone(data.mobile)) {
    errors.mobile = 'Invalid phone number';
  }

  if (data.city && data.city.trim().length < 2) {
    errors.city = 'City must be at least 2 characters';
  }

  if (data.name && data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (data.designation && data.designation.trim().length < 2) {
    errors.designation = 'Designation must be at least 2 characters';
  }

  if (data.description && data.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
