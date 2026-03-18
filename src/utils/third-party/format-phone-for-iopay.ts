export function formatPhoneForIopay(phone: string): string {
  const clean = phone.replace(/\D/g, "");

  if (clean.length !== 11) {
    return phone;
  }

  return `(${clean.substring(0, 2)})${clean.substring(2, 7)}-${clean.substring(7)}`;
}
