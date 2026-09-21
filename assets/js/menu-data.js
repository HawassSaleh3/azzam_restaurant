/* =====================================================================
   Azzam Restaurant — Menu Data
   لكل صنف اسم بلغة ألماني (de) + عربي (ar) + إنجليزي (en) + سعر + نوع
   diet: "vegan" | "veg" | "meat"
   ===================================================================== */

const MENU_CATEGORIES = [
  { id: "teller", de: "Tellergerichte", en: "Main Dishes", ar: "أطباق رئيسية", img: "assets/img/grill.jpg" },
  { id: "fruehstueck", de: "Frühstück", en: "Breakfast", ar: "الفطور", img: "assets/img/mezze.jpg" },
  { id: "manakisch", de: "Manakisch", en: "Manakish", ar: "مناقيش", img: "assets/img/manakish.jpg" },
  { id: "sandwich", de: "Sandwich", en: "Sandwiches", ar: "ساندويش", img: "assets/img/sandwich.jpg" }
];

const MENU_ITEMS = [
  /* ------------------------------ Tellergerichte ------------------------------ */
  { id: "t-kafta", cat: "teller", de: "Kafta", en: "Kafta", ar: "كفتة", price: 6.5, diet: "meat" },
  { id: "t-grillteller", cat: "teller", de: "Grillteller", en: "Mixed Grill", ar: "مشاوي", price: 6.5, diet: "meat" },
  { id: "t-schisch", cat: "teller", de: "Schisch Tawuk", en: "Shish Tawook", ar: "شيش طاووق", price: 6.5, diet: "meat" },
  { id: "t-schawarma", cat: "teller", de: "Schawarma", en: "Shawarma", ar: "شاورما", price: 6.5, diet: "meat" },
  { id: "t-hommus-fleisch", cat: "teller", de: "Hommus Fleisch", en: "Hummus with Meat", ar: "حمص بلحمة", price: 6.5, diet: "meat" },
  { id: "t-schawarma-hummus", cat: "teller", de: "Schawarma Hummus", en: "Shawarma Hummus", ar: "شاورما حمص", price: 5.5, diet: "meat" },
  { id: "t-kubbe", cat: "teller", de: "Kubbe", en: "Kibbeh", ar: "كبة", price: 5.0, diet: "meat" },
  { id: "t-haehnchenleber", cat: "teller", de: "Hähnchenleber", en: "Chicken Liver", ar: "سودة دجاج", price: 5.5, diet: "meat" },
  { id: "t-sucuk", cat: "teller", de: "Sucuk", en: "Sucuk", ar: "سجق", price: 5.5, diet: "meat" },

  /* ------------------------------ Frühstück ------------------------------ */
  { id: "f-hommus", cat: "fruehstueck", de: "Hommus", en: "Hummus", ar: "حمص", price: 4.0, diet: "vegan" },
  { id: "f-mussabaha", cat: "fruehstueck", de: "Mussabaha", en: "Msabbaha", ar: "مسبحة", price: 4.0, diet: "vegan" },
  { id: "f-fatta", cat: "fruehstueck", de: "Fatta", en: "Fatta", ar: "فتة", price: 5.0, diet: "veg" },
  { id: "f-foul", cat: "fruehstueck", de: "Foul", en: "Foul", ar: "فول", price: 4.0, diet: "vegan" },
  { id: "f-baba-ganouj", cat: "fruehstueck", de: "Baba Ganouj", en: "Baba Ghanoush", ar: "بابا غنوج", price: 4.0, diet: "vegan" },
  { id: "f-labne", cat: "fruehstueck", de: "Labne", en: "Labneh", ar: "لبنة", price: 4.0, diet: "veg" },
  { id: "f-omellett", cat: "fruehstueck", de: "Omellett", en: "Omelet", ar: "بيض مقلي", price: 5.0, diet: "veg" },
  { id: "f-linsensuppe", cat: "fruehstueck", de: "Linsensuppe", en: "Lentil Soup", ar: "شوربة عدس", price: 4.0, diet: "vegan" },
  { id: "f-service-teller", cat: "fruehstueck", de: "Service Teller", en: "Service Plate", ar: "صحن سيرفيس", price: 1.0, diet: "veg" },
  { id: "f-tabule", cat: "fruehstueck", de: "Tabule", en: "Tabbouleh", ar: "تبولة", price: 4.0, diet: "vegan" },

  /* ------------------------------ Manakisch ------------------------------ */
  { id: "m-thymian-kaese", cat: "manakisch", de: "Thymian & Käse", en: "Zaatar & Cheese", ar: "زعتر وجبنة", price: 1.0, diet: "veg" },
  { id: "m-thymian", cat: "manakisch", de: "Thymian", en: "Zaatar", ar: "زعتر", price: 1.3, diet: "vegan" },
  { id: "m-kaese", cat: "manakisch", de: "Käse", en: "Cheese", ar: "جبنة", price: 1.3, diet: "veg" },
  { id: "m-fleisch", cat: "manakisch", de: "Fleisch", en: "Meat", ar: "لحمة", price: 1.3, diet: "meat" },
  { id: "m-sucuk", cat: "manakisch", de: "Sucuk", en: "Sucuk", ar: "سجق", price: 1.5, diet: "meat" },
  { id: "m-labne-salami", cat: "manakisch", de: "Labne Salami", en: "Labneh Salami", ar: "سلامي", price: 1.5, diet: "meat" },
  { id: "m-tomate-zwiebeln", cat: "manakisch", de: "Tomate & Zwiebeln", en: "Tomato & Onion", ar: "بندورة وبصل", price: 1.5, diet: "vegan" },
  { id: "m-spinat", cat: "manakisch", de: "Spinat", en: "Spinach", ar: "سبانخ", price: 1.0, diet: "vegan" },
  { id: "m-sfiha", cat: "manakisch", de: "Sfiha", en: "Sfiha (Baalbek)", ar: "درزينة بعلبكية", price: 5.0, diet: "meat" },

  /* ------------------------------ Sandwich ------------------------------ */
  { id: "s-falafel", cat: "sandwich", de: "Falafel", en: "Falafel", ar: "فلافل", price: 2.0, diet: "vegan" },
  { id: "s-hallumi", cat: "sandwich", de: "Hallumi", en: "Halloumi", ar: "حلومي", price: 2.0, diet: "veg" },
  { id: "s-falafel-hallumi", cat: "sandwich", de: "Falafel Hallumi", en: "Falafel Halloumi", ar: "فلافل حلومي", price: 3.0, diet: "veg" },
  { id: "s-makali", cat: "sandwich", de: "Makali", en: "Makali", ar: "مقالي", price: 2.5, diet: "vegan" },
  { id: "s-schawarma", cat: "sandwich", de: "Schawarma", en: "Shawarma", ar: "شاورما", price: 2.5, diet: "meat" },
  { id: "s-sucuk", cat: "sandwich", de: "Sucuk", en: "Sucuk", ar: "سجق", price: 3.0, diet: "meat" },
  { id: "s-leber", cat: "sandwich", de: "Leber", en: "Liver", ar: "سودة", price: 3.0, diet: "meat" },
  { id: "s-schich-tawouk", cat: "sandwich", de: "Schich Tawouk", en: "Shish Tawook", ar: "شيش طاووق", price: 3.0, diet: "meat" },
  { id: "s-kafta", cat: "sandwich", de: "Kafta", en: "Kafta", ar: "كفتة", price: 3.0, diet: "meat" }
];
