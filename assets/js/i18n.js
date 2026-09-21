/* =====================================================================
   Azzam Restaurant — UI Translations (ar / en / de)
   كل نصوص الواجهة هنا. أسماء الأصناف في بيانات القائمة (de/en/ar).
   ملاحظة: لا إيموجي في النصوص — الأيقونات SVG تُضاف من القالب نفسه.
   ===================================================================== */

const LANG_NAMES = { ar: "العربية", en: "English", de: "Deutsch" };
const LANG_CODES = { ar: "AR", en: "EN", de: "DE" };
const LANG_ORDER = ["ar", "en", "de"];

const I18N = {
  ar: {
    dir: "rtl",
    code: "ar",
    meta: {
      title: "مطعم عزّام – برلين نويكولن | Azzam Restaurant",
      description: "مطعم عزّام في برلين نيو كولن — أشهى المأكولات العربية: نباتي، نباتي صرف، مشاوي ولحوم. اطلب عبر واتساب."
    },
    nav: {
      home: "الرئيسية",
      menu: "القائمة",
      about: "من نحن",
      location: "الموقع",
      contact: "تواصل معنا",
      order: "اطلب الآن"
    },
    hero: {
      welcome: "أهلاً بكم في مطعم عزّام",
      tagline: "أشهى المأكولات العربية في قلب برلين نويكولن",
      sub: "أطباق نباتية • نباتية صرفة • مشاوي ولحوم — بإشراف الشيف حسّام عزّام",
      chef: "الشيف حسّام عزّام",
      ctaOrder: "اطلب عبر واتساب",
      ctaMenu: "تصفّح القائمة"
    },
    badges: {
      vegan: "نباتي صرف",
      veg: "نباتي",
      meat: "لحم",
      openNow: "مفتوح الآن",
      closedNow: "مغلق حالياً"
    },
    menu: {
      title: "قائمتنا",
      subtitle: "أشهى الأطباق العربية الأصيلة بأسعار في متناول الجميع",
      search: "ابحث عن طبق…",
      all: "الكل",
      add: "أضِف",
      added: "تمت الإضافة",
      // صيغ الجمع (Intl.PluralRules)
      items: { zero: "لا أصناف", one: "صنف واحد", two: "صنفان", few: "{n} أصناف", many: "{n} صنفاً", other: "{n} صنف" },
      veganOnly: "خيارات نباتية فقط",
      noResults: "لا توجد أطباق مطابقة لبحثك"
    },
    cart: {
      title: "سلّتك",
      empty: "سلّتك فارغة — أضِف أطباقك المفضلة",
      subtotal: "المجموع الفرعي",
      deliveryFee: "رسوم التوصيل",
      freeDelivery: "تحدَّد عند التأكيد",
      total: "الإجمالي (تقريبي)",
      checkout: "إتمام الطلب عبر واتساب",
      clear: "إفراغ السلة",
      remove: "إزالة",
      name: "الاسم",
      notes: "ملاحظات",
      pickOrderType: "اختر طريقة الاستلام",
      delivery: "توصيل",
      pickup: "استلام من المطعم"
    },
    checkout: {
      title: "إتمام الطلب",
      subtitle: "أكمل بياناتك وسيُرسل الطلب للمطعم عبر واتساب",
      fullName: "الاسم الكامل",
      fullNamePh: "مثال: أحمد محمد",
      phone: "رقم الهاتف",
      phonePh: "+49 170 1234567",
      city: "المدينة",
      cityPh: "برلين",
      district: "المنطقة (الحي)",
      districtPh: "مثال: Neukölln",
      address: "العنوان بالتفاصيل",
      addressPh: "اسم الشارع، رقم البناية، الطابق، رمز الجرس…",
      notes: "ملاحظات (اختياري)",
      notesPh: "بدون بصل، حار قليلاً، بدون ثوم…",
      submitDelivery: "إرسال طلب التوصيل عبر واتساب",
      submitPickup: "إرسال طلب الاستلام عبر واتساب",
      requiredHint: "جميع الحقول مطلوبة ما عدا الملاحظات",
      orderType: "نوع الطلب",
      total: "الإجمالي"
    },
    about: {
      title: "قصتنا",
      subtitle: "نكهة بلاد الشام في قلب نويكولن",
      p1: "مطعم عزّام مغروس في قلب منطقة نيو كولن الحيوية ببرلين، حيث تجتمع تقاليد الطهي الشامي مع كرم الضيافة العربية الأصيل.",
      p2: "من الحمص الكريمي والفلافل المقرمشة إلى المشاوي على الفحم، جميع أطباقنا تُحضّر يومياً بمكونات طازجة وبإتقان.",
      p3: "نقدّم خيارات تناسب الجميع: أطباق نباتية ونباتية صرفة ولحوم ومشاوي — بأسعار عادلة وكميّات تسرّ العين.",
      chef: "الشيف",
      chefName: "حسّام عزّام",
      features: [
        { title: "أصالة شامية", desc: "وصفات بيتية توارثناها جيلاً بعد جيل" },
        { title: "طازج يومياً", desc: "خضارنا ومكوناتنا تُختار كل صباح" },
        { title: "للجميع", desc: "نباتي، نباتي صرف، ولحوم — لكل زبون طبق" },
        { title: "أسعار عادلة", desc: "أشهى نكهة بأفضل سعر في برلين" }
      ]
    },
    location: {
      title: "موقعنا",
      subtitle: "سنكون سعداء باستقبالك",
      address: "العنوان",
      hours: "ساعات العمل",
      openDays: "يومياً",
      openTime: "08:00 – 00:00",
      phone: "الهاتف",
      directions: "احصل على الاتجاهات",
      openInMaps: "افتح في خرائط Google"
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "اتصل، راسلنا على واتساب، أو زورنا",
      whatsappBtn: "راسلنا على واتساب",
      callBtn: "اتصل بنا",
      instagramBtn: "تابعنا على إنستغرام"
    },
    footer: {
      tagline: "أشهى المأكولات العربية في برلين",
      quickLinks: "روابط سريعة",
      menu: "القائمة",
      contact: "تواصل",
      follow: "تابعنا",
      rights: "جميع الحقوق محفوظة",
      chef: "الشيف: حسّام عزّام"
    },
    cta: {
      title: "جائع؟ اطلب الآن!",
      sub: "جهّز طلبك من القائمة وسنصلك عبر واتساب خلال ثوانٍ — طازج وساخن دائماً"
    },
    toast: {
      cartAdded: "أُضيف إلى السلة",
      cartUpdated: "تم تحديث الكمية",
      cartRemoved: "أُزيل من السلة",
      cartCleared: "أُفرغت السلة",
      cartEmpty: "سلّتك فارغة",
      fillRequired: "يرجى تعبئة جميع الحقول المطلوبة",
      phoneInvalid: "يرجى إدخال رقم هاتف صحيح",
      orderSent: "تم فتح واتساب لإتمام طلبك"
    },
    wa: {
      greeting: "مرحباً مطعم عزّام، لدي استفسار.",
      orderTitle: "طلب جديد من موقع مطعم عزّام",
      type: "نوع الطلب",
      delivery: "توصيل",
      pickup: "استلام من المطعم",
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      city: "المدينة",
      district: "المنطقة",
      address: "العنوان بالتفاصيل",
      notes: "ملاحظات",
      total: "الإجمالي"
    },
    langLabel: "اللغة"
  },

  en: {
    dir: "ltr",
    code: "en",
    meta: {
      title: "Azzam Restaurant – Berlin Neukölln | Arabic Food, Vegan & Grill",
      description: "Azzam Restaurant in Berlin Neukölln — the tastiest Arabic food: vegan, vegetarian, grills & meat. Order via WhatsApp."
    },
    nav: {
      home: "Home",
      menu: "Menu",
      about: "About",
      location: "Location",
      contact: "Contact",
      order: "Order Now"
    },
    hero: {
      welcome: "Welcome to Azzam Restaurant",
      tagline: "The tastiest Arabic food in Berlin Neukölln",
      sub: "Vegan • Vegetarian • Meat & Grills — by Chef Hussam Azzam",
      chef: "Chef Hussam Azzam",
      ctaOrder: "Order on WhatsApp",
      ctaMenu: "View Menu"
    },
    badges: {
      vegan: "Vegan",
      veg: "Vegetarian",
      meat: "Meat",
      openNow: "Open now",
      closedNow: "Closed now"
    },
    menu: {
      title: "Our Menu",
      subtitle: "Authentic Arabic dishes at prices everyone can enjoy",
      search: "Search for a dish…",
      all: "All",
      add: "Add",
      added: "Added",
      items: { one: "{n} item", other: "{n} items" },
      veganOnly: "Vegan options only",
      noResults: "No dishes match your search"
    },
    cart: {
      title: "Your Cart",
      empty: "Your cart is empty — add your favourite dishes",
      subtotal: "Subtotal",
      deliveryFee: "Delivery fee",
      freeDelivery: "Confirmed with the restaurant",
      total: "Total (approx.)",
      checkout: "Checkout via WhatsApp",
      clear: "Clear cart",
      remove: "Remove",
      name: "Name",
      notes: "Notes",
      pickOrderType: "Choose order type",
      delivery: "Delivery",
      pickup: "Pickup"
    },
    checkout: {
      title: "Checkout",
      subtitle: "Complete your details and the order goes to the restaurant on WhatsApp",
      fullName: "Full name",
      fullNamePh: "e.g. Ahmed Mohammad",
      phone: "Phone number",
      phonePh: "+49 170 1234567",
      city: "City",
      cityPh: "Berlin",
      district: "District",
      districtPh: "e.g. Neukölln",
      address: "Full address details",
      addressPh: "Street, building number, floor, doorbell…",
      notes: "Notes (optional)",
      notesPh: "No onions, a little spicy, no garlic…",
      submitDelivery: "Send delivery order on WhatsApp",
      submitPickup: "Send pickup order on WhatsApp",
      requiredHint: "All fields required except notes",
      orderType: "Order type",
      total: "Total"
    },
    about: {
      title: "Our Story",
      subtitle: "Taste of the Levant in the heart of Neukölln",
      p1: "Azzam Restaurant is rooted in Berlin's vibrant Neukölln district, where Levantine cooking meets genuine Arab hospitality.",
      p2: "From creamy hummus and crispy falafel to charcoal grills, everything is prepared fresh daily with care.",
      p3: "We serve everyone: vegan, vegetarian, and meat lovers — fair prices and generous plates.",
      chef: "Chef",
      chefName: "Hussam Azzam",
      features: [
        { title: "Levantine roots", desc: "Home recipes passed down through generations" },
        { title: "Fresh daily", desc: "Ingredients picked every morning" },
        { title: "For everyone", desc: "Vegan, vegetarian & meat — a dish for each guest" },
        { title: "Fair prices", desc: "The best taste at the best price in Berlin" }
      ]
    },
    location: {
      title: "Find Us",
      subtitle: "We look forward to welcoming you",
      address: "Address",
      hours: "Opening hours",
      openDays: "Every day",
      openTime: "08:00 – 00:00",
      phone: "Phone",
      directions: "Get directions",
      openInMaps: "Open in Google Maps"
    },
    contact: {
      title: "Contact Us",
      subtitle: "Call, WhatsApp or drop by",
      whatsappBtn: "Message us on WhatsApp",
      callBtn: "Call us",
      instagramBtn: "Follow us on Instagram"
    },
    footer: {
      tagline: "The tastiest Arabic food in Berlin",
      quickLinks: "Quick links",
      menu: "Menu",
      contact: "Contact",
      follow: "Follow us",
      rights: "All rights reserved",
      chef: "Chef: Hussam Azzam"
    },
    cta: {
      title: "Hungry? Order now!",
      sub: "Build your order from the menu and reach us on WhatsApp in seconds — always fresh and hot"
    },
    toast: {
      cartAdded: "Added to cart",
      cartUpdated: "Quantity updated",
      cartRemoved: "Removed from cart",
      cartCleared: "Cart cleared",
      cartEmpty: "Your cart is empty",
      fillRequired: "Please fill in all required fields",
      phoneInvalid: "Please enter a valid phone number",
      orderSent: "WhatsApp opened to complete your order"
    },
    wa: {
      greeting: "Hello Azzam Restaurant, I have a question.",
      orderTitle: "New order from the Azzam Restaurant website",
      type: "Order type",
      delivery: "Delivery",
      pickup: "Pickup",
      name: "Full name",
      phone: "Phone",
      city: "City",
      district: "District",
      address: "Address details",
      notes: "Notes",
      total: "Total"
    },
    langLabel: "Language"
  },

  de: {
    dir: "ltr",
    code: "de",
    meta: {
      title: "Azzam Restaurant – Berlin Neukölln | Arabische Küche, Vegan & Grill",
      description: "Azzam Restaurant in Berlin Neukölln — das leckerste arabische Essen: vegan, vegetarisch, Grill & Fleisch. Bestellung per WhatsApp."
    },
    nav: {
      home: "Start",
      menu: "Speisekarte",
      about: "Über uns",
      location: "Standort",
      contact: "Kontakt",
      order: "Jetzt bestellen"
    },
    hero: {
      welcome: "Willkommen im Azzam Restaurant",
      tagline: "Das leckerste arabische Essen in Berlin Neukölln",
      sub: "Vegan • Vegetarisch • Fleisch & Grill — von Küchenchef Hussam Azzam",
      chef: "Küchenchef Hussam Azzam",
      ctaOrder: "Per WhatsApp bestellen",
      ctaMenu: "Speisekarte ansehen"
    },
    badges: {
      vegan: "Vegan",
      veg: "Vegetarisch",
      meat: "Fleisch",
      openNow: "Jetzt geöffnet",
      closedNow: "Derzeit geschlossen"
    },
    menu: {
      title: "Unsere Speisekarte",
      subtitle: "Authentische arabische Gerichte zu fairen Preisen",
      search: "Gericht suchen…",
      all: "Alle",
      add: "Hinzufügen",
      added: "Hinzugefügt",
      items: { one: "{n} Gericht", other: "{n} Gerichte" },
      veganOnly: "Nur vegane Optionen",
      noResults: "Keine Gerichte passen zu deiner Suche"
    },
    cart: {
      title: "Dein Warenkorb",
      empty: "Dein Warenkorb ist leer — füge deine Lieblingsgerichte hinzu",
      subtotal: "Zwischensumme",
      deliveryFee: "Liefergebühr",
      freeDelivery: "Wird bei Bestätigung festgelegt",
      total: "Gesamt (ca.)",
      checkout: "Bestellung per WhatsApp abschließen",
      clear: "Warenkorb leeren",
      remove: "Entfernen",
      name: "Name",
      notes: "Anmerkungen",
      pickOrderType: "Bestellart wählen",
      delivery: "Lieferung",
      pickup: "Abholung"
    },
    checkout: {
      title: "Bestellung abschließen",
      subtitle: "Fülle deine Daten aus — die Bestellung geht per WhatsApp an das Restaurant",
      fullName: "Vollständiger Name",
      fullNamePh: "z. B. Ahmed Mohammad",
      phone: "Telefonnummer",
      phonePh: "+49 170 1234567",
      city: "Stadt",
      cityPh: "Berlin",
      district: "Bezirk",
      districtPh: "z. B. Neukölln",
      address: "Vollständige Adresse",
      addressPh: "Straße, Hausnummer, Etage, Klingel…",
      notes: "Anmerkungen (optional)",
      notesPh: "Ohne Zwiebeln, etwas scharf, ohne Knoblauch…",
      submitDelivery: "Lieferbestellung per WhatsApp senden",
      submitPickup: "Abholbestellung per WhatsApp senden",
      requiredHint: "Alle Felder außer Anmerkungen sind Pflichtfelder",
      orderType: "Bestellart",
      total: "Gesamt"
    },
    about: {
      title: "Unsere Geschichte",
      subtitle: "Geschmack der Levante im Herzen von Neukölln",
      p1: "Das Azzam Restaurant liegt im lebendigen Neukölln, wo levantinische Küche auf echte arabische Gastfreundschaft trifft.",
      p2: "Von cremigem Hummus und knusprigen Falafel bis zu Grillgerichten — alles wird täglich frisch und mit Sorgfalt zubereitet.",
      p3: "Für alle etwas dabei: vegan, vegetarisch und Fleisch — faire Preise und großzügige Portionen.",
      chef: "Küchenchef",
      chefName: "Hussam Azzam",
      features: [
        { title: "Levantinische Wurzeln", desc: "Hausrezepte, über Generationen weitergegeben" },
        { title: "Täglich frisch", desc: "Zutaten werden jeden Morgen ausgewählt" },
        { title: "Für alle", desc: "Vegan, vegetarisch & Fleisch — für jeden Gast" },
        { title: "Faire Preise", desc: "Bester Geschmack zum besten Preis in Berlin" }
      ]
    },
    location: {
      title: "So findest du uns",
      subtitle: "Wir freuen uns auf deinen Besuch",
      address: "Adresse",
      hours: "Öffnungszeiten",
      openDays: "Täglich",
      openTime: "08:00 – 00:00 Uhr",
      phone: "Telefon",
      directions: "Route anzeigen",
      openInMaps: "In Google Maps öffnen"
    },
    contact: {
      title: "Kontakt",
      subtitle: "Ruf an, schreib uns auf WhatsApp oder komm vorbei",
      whatsappBtn: "Schreib uns auf WhatsApp",
      callBtn: "Ruf uns an",
      instagramBtn: "Folge uns auf Instagram"
    },
    footer: {
      tagline: "Das leckerste arabische Essen in Berlin",
      quickLinks: "Schnellzugriff",
      menu: "Speisekarte",
      contact: "Kontakt",
      follow: "Folge uns",
      rights: "Alle Rechte vorbehalten",
      chef: "Küchenchef: Hussam Azzam"
    },
    cta: {
      title: "Hungrig? Jetzt bestellen!",
      sub: "Stell deine Bestellung zusammen und erreiche uns in Sekunden per WhatsApp — immer frisch und heiß"
    },
    toast: {
      cartAdded: "Zum Warenkorb hinzugefügt",
      cartUpdated: "Menge aktualisiert",
      cartRemoved: "Aus dem Warenkorb entfernt",
      cartCleared: "Warenkorb geleert",
      cartEmpty: "Dein Warenkorb ist leer",
      fillRequired: "Bitte fülle alle Pflichtfelder aus",
      phoneInvalid: "Bitte gib eine gültige Telefonnummer ein",
      orderSent: "WhatsApp wurde geöffnet, um deine Bestellung abzuschließen"
    },
    wa: {
      greeting: "Hallo Azzam Restaurant, ich habe eine Frage.",
      orderTitle: "Neue Bestellung über die Website des Azzam Restaurants",
      type: "Bestellart",
      delivery: "Lieferung",
      pickup: "Abholung",
      name: "Vollständiger Name",
      phone: "Telefonnummer",
      city: "Stadt",
      district: "Bezirk",
      address: "Vollständige Adresse",
      notes: "Anmerkungen",
      total: "Gesamt"
    },
    langLabel: "Sprache"
  }
};
