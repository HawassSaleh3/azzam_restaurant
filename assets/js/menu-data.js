/* =====================================================================
   Azzam Restaurant — Menu Data
   كل صنف: اسم ألماني (ltr) + اسم عربي + سعر + نوع (نباتي/نباتي صرف/لحم)
   diet: "vegan" | "veg" | "meat"
   ===================================================================== */

const MENU_CATEGORIES = [
  { id: "teller", de: "Tellergerichte", ar: "أطباق رئيسية", img: "assets/img/grill.jpg" },
  { id: "fruehstueck", de: "Frühstück", ar: "الفطور", img: "assets/img/mezze.jpg" },
  { id: "manakisch", de: "Manakisch", ar: "مناقيش", img: "assets/img/manakish.jpg" },
  { id: "sandwich", de: "Sandwich", ar: "ساندويش", img: "assets/img/sandwich.jpg" }
];

const MENU_ITEMS = [
  /* ------------------------------ Tellergerichte ------------------------------ */
  { id: "t-kafta", cat: "teller", de: "Kafta", ar: "كفتة", price: 6.5, diet: "meat" },
  { id: "t-grillteller", cat: "teller", de: "Grillteller", ar: "مشاوي", price: 6.5, diet: "meat" },
  { id: "t-schisch", cat: "teller", de: "Schisch Tawuk", ar: "شيش طاووق", price: 6.5, diet: "meat" },
  { id: "t-schawarma", cat: "teller", de: "Schawarma", ar: "شاورما", price: 6.5, diet: "meat" },
  { id: "t-hommus-fleisch", cat: "teller", de: "Hommus Fleisch", ar: "حمص بلحمة", price: 6.5, diet: "meat" },
  { id: "t-schawarma-hummus", cat: "teller", de: "Schawarma Hummus", ar: "شاورما حمص", price: 5.5, diet: "meat" },
  { id: "t-kubbe", cat: "teller", de: "Kubbe", ar: "كبة", price: 5.0, diet: "meat" },
  { id: "t-haehnchenleber", cat: "teller", de: "Hähnchenleber", ar: "سودة دجاج", price: 5.5, diet: "meat" },
  { id: "t-sucuk", cat: "teller", de: "Sucuk", ar: "سجق", price: 5.5, diet: "meat" },

  /* ------------------------------ Frühstück ------------------------------ */
  { id: "f-hommus", cat: "fruehstueck", de: "Hommus", ar: "حمص", price: 4.0, diet: "vegan" },
  { id: "f-mussabaha", cat: "fruehstueck", de: "Mussabaha", ar: "مسبحة", price: 4.0, diet: "vegan" },
  { id: "f-fatta", cat: "fruehstueck", de: "Fatta", ar: "فتة", price: 5.0, diet: "veg" },
  { id: "f-foul", cat: "fruehstueck", de: "Foul", ar: "فول", price: 4.0, diet: "vegan" },
  { id: "f-baba-ganouj", cat: "fruehstueck", de: "Baba Ganouj", ar: "بابا غنوج", price: 4.0, diet: "vegan" },
  { id: "f-labne", cat: "fruehstueck", de: "Labne", ar: "لبنة", price: 4.0, diet: "veg" },
  { id: "f-omellett", cat: "fruehstueck", de: "Omellett", ar: "بيض مقلي", price: 5.0, diet: "veg" },
  { id: "f-linsensuppe", cat: "fruehstueck", de: "Linsensuppe", ar: "شوربة عدس", price: 4.0, diet: "vegan" },
  { id: "f-service-teller", cat: "fruehstueck", de: "Service Teller", ar: "صحن سيرفيس", price: 1.0, diet: "veg" },
  { id: "f-tabule", cat: "fruehstueck", de: "Tabule", ar: "تبولة", price: 4.0, diet: "vegan" },

  /* ------------------------------ Manakisch ------------------------------ */
  { id: "m-thymian-kaese", cat: "manakisch", de: "Thymian & Käse", ar: "زعتر وجبنة", price: 1.0, diet: "veg" },
  { id: "m-thymian", cat: "manakisch", de: "Thymian", ar: "زعتر", price: 1.3, diet: "vegan" },
  { id: "m-kaese", cat: "manakisch", de: "Käse", ar: "جبنة", price: 1.3, diet: "veg" },
  { id: "m-fleisch", cat: "manakisch", de: "Fleisch", ar: "لحمة", price: 1.3, diet: "meat" },
  { id: "m-sucuk", cat: "manakisch", de: "Sucuk", ar: "سجق", price: 1.5, diet: "meat" },
  { id: "m-labne-salami", cat: "manakisch", de: "Labne Salami", ar: "سلامي", price: 1.5, diet: "meat" },
  { id: "m-tomate-zwiebeln", cat: "manakisch", de: "Tomate & Zwiebeln", ar: "بندورة وبصل", price: 1.5, diet: "vegan" },
  { id: "m-spinat", cat: "manakisch", de: "Spinat", ar: "سبانخ", price: 1.0, diet: "vegan" },
  { id: "m-sfiha", cat: "manakisch", de: "Sfiha", ar: "درزينة بعلبكية", price: 5.0, diet: "meat" },

  /* ------------------------------ Sandwich ------------------------------ */
  { id: "s-falafel", cat: "sandwich", de: "Falafel", ar: "فلافل", price: 2.0, diet: "vegan" },
  { id: "s-hallumi", cat: "sandwich", de: "Hallumi", ar: "حلومي", price: 2.0, diet: "veg" },
  { id: "s-falafel-hallumi", cat: "sandwich", de: "Falafel Hallumi", ar: "فلافل حلومي", price: 3.0, diet: "veg" },
  { id: "s-makali", cat: "sandwich", de: "Makali", ar: "مقالي", price: 2.5, diet: "vegan" },
  { id: "s-schawarma", cat: "sandwich", de: "Schawarma", ar: "شاورما", price: 2.5, diet: "meat" },
  { id: "s-sucuk", cat: "sandwich", de: "Sucuk", ar: "سجق", price: 3.0, diet: "meat" },
  { id: "s-leber", cat: "sandwich", de: "Leber", ar: "سودة", price: 3.0, diet: "meat" },
  { id: "s-schich-tawouk", cat: "sandwich", de: "Schich Tawouk", ar: "شيش طاووق", price: 3.0, diet: "meat" },
  { id: "s-kafta", cat: "sandwich", de: "Kafta", ar: "كفتة", price: 3.0, diet: "meat" }
];
