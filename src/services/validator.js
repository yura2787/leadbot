const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Please enter your name.' };
  }

  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return { valid: false, error: 'Name is too short. Please enter at least 2 characters.' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'Name is too long. Please keep it under 50 characters.' };
  }

  if (!/^[a-zA-Zа-яА-ЯїЇіІєЄґҐ'\s-]+$/.test(trimmed)) {
    return { valid: false, error: 'Name can only contain letters, spaces and hyphens.' };
  }

  return { valid: true, value: trimmed };
};

const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Please enter a phone number.' };
  }

  const cleaned = phone.replace(/[\s()-]/g, '');

  if (!/^\+?\d{10,15}$/.test(cleaned)) {
    return { valid: false, error: 'Invalid phone number. Please enter a valid number (10–15 digits).' };
  }

  return { valid: true, value: cleaned };
};

module.exports = { validateName, validatePhone };
