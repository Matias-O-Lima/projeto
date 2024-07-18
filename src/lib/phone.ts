import {
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'libphonenumber-js';

function mphone(n?: string) {
    if (!n) return "+";
    if (isValidPhoneNumber("+" + n.replace(/\D/g, ""))) {
      const phoneNumber = parsePhoneNumber("+" + n.replace(/\D/g, ""));
      if (phoneNumber) {
        return phoneNumber.formatInternational();
      } else {
        return "+" + n.replace(/\D/g, "");
      }
    } else {
      return  "+" + n.replace(/\D/g, "");
    }
  }

export { mphone };