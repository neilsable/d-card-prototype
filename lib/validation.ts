export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidName(name: string) {
  const n = name.trim();
  if (n.length < 2) return false;
  if (!/[A-Za-z]/.test(n)) return false;
  return true;
}

export function isUnder2MB(file: File) {
  return file.size <= 2 * 1024 * 1024;
}
