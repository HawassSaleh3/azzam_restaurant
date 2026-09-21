/* =====================================================================
   Azzam Restaurant — Site Configuration
   =====================================================================
   عدّل القيم هنا فقط لضبط الموقع (رقم الواتساب، العنوان، الروابط...).
   كل القيم معرّضة للعميل (هذا موقع ثابت ساكن) فلا تضع هنا أي أسرار.
   ===================================================================== */
window.APP_CONFIG = {
  business: {
    name: "Azzam Restaurant",
    nameAr: "مطعم عزّام",
    tagline: {
      de: "Das leckerste Arabische Essen",
      en: "The tastiest Arabic food",
      ar: "أشهى المأكولات العربية"
    }
  },

  chef: {
    name: "Hussam Azzam",
    ar: "حسّام عزّام"
  },

  phone: {
    display: "+49 30 60977541",
    tel: "+493060977541",
    // رقم الواتساب بالصيغة الدولية بدون "+" أو مسافات — عدّله لرقمك الفعلي:
    whatsapp: "493060977541"
  },

  location: {
    street: "Sonnenallee 54",
    zip: "12045",
    city: "Berlin",
    district: "Neukölln",
    country: "Deutschland"
  },

  hours: {
    open: "08:00",
    close: "00:00",
    daysDe: "Täglich",
    daysAr: "يومياً",
    daysEn: "Every day"
  },

  social: {
    instagram: "https://www.instagram.com/azzam_restaurant",
    instagramHandle: "@azzam_restaurant"
  },

  maps: {
    // تضمين خرائط Google بدون أي مفتاح API (نظام output=embed العام)
    embed:
      "https://www.google.com/maps?q=Azzam+Restaurant+Sonnenallee+54,+12045+Berlin&z=16&output=embed",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Azzam+Restaurant+Sonnenallee+54,+12045+Berlin",
    place:
      "https://www.google.com/maps/search/?api=1&query=Azzam+Restaurant+Sonnenallee+54+12045+Berlin"
  },

  order: {
    deliveryEnabled: true,
    pickupEnabled: true
  }
};
