export const generateWhatsAppLink = (
  phoneNumber: string,
  message: string
) => {
  // Remove any non-numeric characters from the phone number
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
