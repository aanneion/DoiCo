export interface ValidationErrors {
  customerName?: string;
  phone?: string;
  address?: string;
  items?: string;
}

export function validateName(name: string): string | undefined {
  if (!name.trim()) {
    return "আপনার নাম লিখুন।";
  }
  if (name.trim().length < 2) {
    return "নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
  }
  return undefined;
}

export function validatePhone(phone: string): string | undefined {
  if (!phone.trim()) {
    return "মোবাইল নম্বর দিন।";
  }
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, "");
  // Bangladeshi phone: 01XXXXXXXXX (11 digits starting with 01)
  const phoneRegex = /^01[3-9]\d{8}$/;
  if (!phoneRegex.test(cleaned)) {
    return "সঠিক মোবাইল নম্বর দিন। (০১XXXXXXXXX)";
  }
  return undefined;
}

export function validateAddress(address: string): string | undefined {
  if (!address.trim()) {
    return "আপনার ঠিকানা লিখুন।";
  }
  if (address.trim().length < 10) {
    return "সম্পূর্ণ ঠিকানা লিখুন।";
  }
  return undefined;
}

export function validateOrder(
  name: string,
  phone: string,
  address: string,
  hasItems: boolean
): ValidationErrors {
  const errors: ValidationErrors = {};

  const nameError = validateName(name);
  if (nameError) errors.customerName = nameError;

  const phoneError = validatePhone(phone);
  if (phoneError) errors.phone = phoneError;

  const addressError = validateAddress(address);
  if (addressError) errors.address = addressError;

  if (!hasItems) {
    errors.items = "কমপক্ষে একটি পণ্য নির্বাচন করুন।";
  }

  return errors;
}
