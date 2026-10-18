/**
 * BhumiSathi AI Chatbot Engine (ChatGPT-style Intelligent Assistant)
 * Specialized in Bangladesh Land Law, Deed Verification, E-Mutation, 
 * Khatian Records, Due Diligence & Pre-Purchase Security.
 */

export const INITIAL_GREETING = {
  bn: {
    title: "স্বাগতম! আমি ভূমিসাথী এআই সহকারী 🤖",
    text: "আমি বাংলাদেশ সরকারের ভূমি সেবা, আইন ও নিরাপত্তা সংক্রান্ত একটি বিশেষায়িত ইন্টেলিজেন্ট এআই। জমি কেনা-বেচা, দলিল যাচাই, জালিয়াতি শনাক্তকরণ, ই-নামজারি ওয়ার্কফ্লো বা খতিয়ান সংক্রান্ত যেকোনো প্রশ্ন আমাকে করতে পারেন। নিচে কিছু জরুরি প্রশ্ন বেছে নিতে পারেন অথবা সরাসরি লিখুন:",
  },
  en: {
    title: "Welcome! I am BhumiSathi AI Assistant 🤖",
    text: "I am an intelligent AI specialized in Bangladesh land administration, deed verification, fraud prevention, e-mutation, and property law. Ask me anything or select from the prompt suggestions below:",
  }
};

export const QUICK_PROMPTS = [
  {
    id: "fake_deed",
    icon: "📜",
    labelBn: "দলিল জাল কিনা কীভাবে চিনব?",
    labelEn: "How to detect a fake deed?",
    query: "জাল দলিল চেনার উপায় এবং বালাম যাচাই কীভাবে করব?"
  },
  {
    id: "mutation_steps",
    icon: "✍️",
    labelBn: "ই-নামজারি আবেদন ও সরকারি ফি",
    labelEn: "E-Namjari steps & official fee",
    query: "ই-নামজারি করতে কী কী কাগজপত্র লাগে এবং সরকারি ফি কত?"
  },
  {
    id: "pre_purchase",
    icon: "🔍",
    labelBn: "জমি কেনার আগে করণীয় চেকলিস্ট",
    labelEn: "Pre-purchase land checklist",
    query: "জমি কেনার বায়না বা চুক্তির পূর্বে কী কী কাগজপত্র যাচাই করা আবশ্যক?"
  },
  {
    id: "khatian_types",
    icon: "📑",
    labelBn: "CS, SA, RS ও BS খতিয়ান কী?",
    labelEn: "What are CS, SA, RS & BS Khatians?",
    query: "সিএস, এসএ, আরএস ও বিএস খতিয়ানের পার্থক্য ও গুরুত্ব কী?"
  },
  {
    id: "land_measure",
    icon: "📐",
    labelBn: "শতাংশ, কাঠা ও বিঘার পরিমাপ",
    labelEn: "Land measurement units",
    query: "জমি পরিমাপের হিসাব: ১ শতাংশ, কাঠা, বিঘা ও একরে কত স্কয়ার ফিট?"
  },
  {
    id: "fraud_prevention",
    icon: "⚠️",
    labelBn: "এক জমি একাধিকবার বিক্রি রোধ",
    labelEn: "Prevent duplicate parcel sale",
    query: "একই জমি একাধিক ব্যক্তির কাছে বিক্রি প্রতিরোধে এই প্ল্যাটফর্ম কীভাবে কাজ করে?"
  }
];

// Rich Domain Knowledge Base
const KNOWLEDGE_BASE = [
  // 1. Fake Deed / Deed Verification
  {
    keywords: ["জাল দলিল", "নকল দলিল", "দলিল যাচাই", "বালাম", "সাব রেজিস্ট্রি", "fake deed", "deed verify", "verify deed", "balam", "দলিল আসল"],
    responseBn: `### 🔍 জাল দলিল চেনার প্রধান উপায় ও সাব-রেজিস্ট্রি বালাম যাচাই

একটি দলিল আসল না জাল তা নিশ্চিত হতে নিচের সুনির্দিষ্ট ধাপগুলো অনুসরণ করুন:

1. **সাব-রেজিস্ট্রি অফিসে বালাম বই তলাশি (Search):**
   * প্রতিটি দলিলের একটি বালাম ভলিউম নম্বর ও পৃষ্ঠার রেকর্ড থাকে। সংশ্লিষ্ট উপজেলা/থানা সাব-রেজিস্ট্রি অফিসে তল্লাশি ফি জমা দিয়ে বালাম বইয়ের সাথে দলিলের নকল মিলিয়ে নিন।
   
2. **দলিলের পেছনের স্ট্যাম্প ও তারিখ বিশ্লেষণ:**
   * নন-জুডিশিয়াল স্ট্যাম্পটি কোন ভেন্ডারের কাছ থেকে কত তারিখে কেনা হয়েছিল তা পরীক্ষা করুন। স্ট্যাম্প বিক্রির তারিখ যদি দলিল সম্পাদনের তারিখের পরের হয়, তবে তা নিশ্চিত জাল।

3. **মালিকানা স্বত্বের ধারাবাহিকতা (Chain of Title):**
   * বিক্রেতা কিভাবে জমির মালিক হলেন— ক্রয়সূত্রে, নাকি ওয়ারিশসূত্রে, নাকি হেবা সূত্রে? বিগত **২৫ বছরের বায়া দলিল** ও মূল দলিলের ধারাবাহিকতা যাচাই করুন।

4. **দাগে অতিরিক্ত জমির অংশ বিক্রি (Over-selling):**
   * বিক্রেতার উক্ত খতিয়ানে ও দাগে মোট কতটুকু অংশের স্বত্ব রয়েছে তা দেখুন। খতিয়ানের অংশের বেশি বিক্রি করা প্রতারণামূলক অপরাধ।

💡 **ভূমিসাথী টিপ:** আমাদের **"দলিল ও বালাম যাচাই"** ফিচারে দলিল নম্বর ও দাগ প্রদান করে আপনি তাৎক্ষণিক অ্যালগরিদম ভিত্তিক স্বত্ব পরীক্ষা করতে পারেন।`,
    responseEn: `### 🔍 How to Identify Fake Deeds & Verify Registry Balam Books

To ascertain whether a land deed is genuine or fraudulent, follow these definitive steps:

1. **Sub-Registry Office Volume Inspection (Search):**
   * Every registered deed is transcribed into the official Sub-Registry Balam book. Apply for a certified search with the registration year, deed number, and volume number.

2. **Stamp Vendor Date Audit:**
   * Scrutinize the date of purchase on the non-judicial stamps against the deed execution date. If the stamp was purchased after the purported execution date, it is conclusively fabricated.

3. **Chain of Title Continuity (25 Years):**
   * Verify how the current transferor acquired title (purchase, inheritance, gift/heba). Cross-reference all supporting predecessor deeds (Baya deeds).

4. **Plot Share Reconciliation:**
   * Compare the seller's mutated share in the khatian against the area being transferred to prevent over-allocation.

💡 **BhumiSathi Tip:** Use our **Deed Verification Tool** to cross-examine submitted records against demo registry balam indices instantly.`,
    action: { tab: "deed-verify", labelBn: "দলিল যাচাই পেজে যান ↗", labelEn: "Open Deed Verification ↗" }
  },

  // 2. E-Mutation & Namjari
  {
    keywords: ["নামজারি", "খারিজ", "মিউটেশন", "জমাভাগ", "mutation", "e-namjari", "namjari", "ফি", "ডিসিআর", "dcr", "ac land", "এসি ল্যান্ড"],
    responseBn: `### ✍️ স্মার্ট ই-নামজারি (Mutation) প্রক্রিয়া ও সরকারি ফি কাঠামো

জমি ক্রয়ের পর নিজস্ব নামে নামজারি বা রেকর্ড সংশোধন করা বাধ্যতামূলক। বর্তমান ডিজিটাল নামজারি নির্দেশিকা নিচে দেওয়া হলো:

#### 📋 প্রয়োজনীয় কাগজপত্র:
1. মূল রেজিস্ট্রেশন দলিল ও সার্টিফাইড বায়া দলিল।
2. পিঠ বা পূর্ববর্তী খতিয়ানের কপি (সিএস/এসএ/আরএস/বিএস)।
3. হাল সনের ভূমি উন্নয়ন কর (খাজনা) পরিশোধের দাখিলা।
4. আবেদনকারীর জাতীয় পরিচয়পত্র (NID) ও ছবি।
5. ওয়ারিশসূত্রে হলে উপযুক্ত ওয়ারিশ কায়েম সনদ ও বণ্টননামা।

#### 💰 সরকারি নির্ধারিত ফি (মোট ১১৭০/- টাকা):
* **কোর্ট ফি (আবেদন ফি):** ২০ টাকা
* **নোটিশ জারি ফি:** ৫০ টাকা
* **রেকর্ড সংশোধন ও খতিয়ান ফি:** ১,০০০ টাকা
* **ডিসিআর (DCR) ফি:** ১০০ টাকা
*(অনলাইনে নামজারি ব্যতীত কোনো অতিরিক্ত নগদ লেনদেন সম্পূর্ণ অবৈধ)*

#### ⏱️ নিষ্পত্তির সময়সীমা:
* সাধারণ আবেদনের ক্ষেত্রে সর্বোচ্চ **২৮ কার্যদিবস**। এসি ল্যান্ড (AC Land) ও তহশিলদার তদন্তের পর নামজারি খতিয়ান ও কিউআর কোডযুক্ত ডিসিআর প্রদান করা হয়।

💡 **ভূমিসাথী সুবিধা:** আমাদের পোর্টালে **"স্মার্ট ই-নামজারি"** মডিউলে আপনি ঘরে বসেই আবেদন খসড়া সংরক্ষণ ও লাইভ ট্র্যাকিং করতে পারেন।`,
    responseEn: `### ✍️ Smart E-Namjari (Mutation) Workflow & Official Fee Structure

Mutating the record of rights into your name upon land acquisition is a legal prerequisite under Bangladesh Land Reform regulations:

#### 📋 Required Documentation:
1. Registered title deed and supporting antecedent (baya) deeds.
2. Certified copies of predecessor Khatians (CS, SA, RS, or BS).
3. Up-to-date Land Development Tax (Khajna) payment receipt.
4. National Identity Card (NID) and passport-sized photograph.
5. In inheritance cases, a certified succession certificate and partition deed.

#### 💰 Statutory Official Fees (Total: BDT 1,170):
* **Application / Court Fee:** BDT 20
* **Notice Service Fee:** BDT 50
* **Record Correction & Khatian Fee:** BDT 1,000
* **DCR (Duplicate Carbon Receipt) Fee:** BDT 100

#### ⏱️ Standard Processing Timeline:
* Standard citizen applications are resolved within **28 working days** under the Assistant Commissioner (Land) jurisdiction with a QR-verifiable e-Khatian.

💡 **BhumiSathi Feature:** Try our **Smart E-Mutation** module to test guided filing, draft saving, and real-time status tracking.`,
    action: { tab: "mutation", labelBn: "নামজারি মডিউলে যান ↗", labelEn: "Open Mutation Module ↗" }
  },

  // 3. Pre-Purchase Due Diligence
  {
    keywords: ["কেনার আগে", "জমি কেনা", "বায়না", "বায়নাপত্র", "সতর্কতা", "due diligence", "pre-purchase", "buying land", "বায়না দলিল", "ঝুঁকি"],
    responseBn: `### 🛡️ জমি ক্রয়ের পূর্বে নাগরিক স্বত্ব ঝুঁকি যাচাই চেকলিস্ট (Pre-Purchase Checklist)

জমি কেনার পূর্বে এক মুহূর্তের অসতর্কতা আজীবনের দুর্ভোগ ডেকে আনতে পারে। বায়না বা চূড়ান্ত চুক্তির পূর্বে অবশ্যই নিম্নোক্ত বিষয়গুলো নিশ্চিত করুন:

1. **সরজমিনে বাস্তব দখল যাচাই (Physical Possession):**
   * শুধু কাগজ দেখে জমি কিনবেন না। সরেজমিনে গিয়ে দেখুন জমিতে বিক্রেতার বাস্তব দখল আছে কিনা, নাকি অন্য কেউ দখল করে আছে বা কোনো সীমানা বিরোধ রয়েছে।

2. **২৫ বছরের ধারাবাহিক বায়া দলিল:**
   * বর্তমান বিক্রেতার কাছে জমিটি আসার পেছনের ২৫ বছরের পূর্ববর্তী দলিলের লিঙ্ক বা চেইন সুরক্ষিত আছে কিনা মিলিয়ে নিন।

3. **ভূমি উন্নয়ন কর (খাজনা) হালনাগাদ:**
   * বিক্রেতার নামে সর্বশেষ বাংলা ১৪৩১-১৪৩২ সনের ভূমি উন্নয়ন কর পরিশোধ করা আছে কিনা দাখিলা যাচাই করুন।

4. **আদালতের নিষেধাজ্ঞা ও ব্যাংকে দায়বদ্ধতা (Injunction/Mortgage):**
   * জমিটি কোনো ব্যাংক বা আর্থিক প্রতিষ্ঠানে বন্ধক রাখা আছে কিনা এবং কোনো দেওয়ানি আদালতে মামলা বিচারাধীন রয়েছে কিনা তা স্থানীয় রেকর্ড তলাশ করুন।

5. **সরকারি খাস, ওয়াকফ বা অধিগ্রহণ (Acquisition Flag):**
   * জমিটি সরকারের কোনো উন্নয়ন প্রকল্পের আওতায় অধিগ্রহণ নোটিশভুক্ত কিনা অথবা অর্পিত/পরিত্যক্ত সম্পত্তি কিনা তা নিশ্চিত হন।

💡 **ভূমিসাথী সমাধান:** আমাদের **"প্রাক-ক্রয় স্বত্ব ঝুঁকি যাচাই"** টুলে প্লট আইডি দিলে সিস্টেম ০-১০০ স্কেলে তাৎক্ষণিক রিস্ক স্কোর ও নিরাপত্তা বিশ্লেষণ প্রদান করে।`,
    responseEn: `### 🛡️ Citizen Due Diligence: Pre-Purchase Land Verification Checklist

Avoid costly land disputes by completing these mandatory due diligence verifications prior to entering an agreement:

1. **Physical On-Ground Possession Audit:**
   * Never rely solely on paper titles. Inspect the physical site to confirm the seller is in undisputed, continuous physical possession with clear boundary demarcations.

2. **25-Year Unbroken Title Chain:**
   * Audit all antecedent (baya) deeds over the preceding 25 years to ensure uninterrupted title transmission without missing heirs or invalid transfers.

3. **Current Land Development Tax (Khajna):**
   * Verify the seller possesses the current year's digital tax payment receipt (Dakhila).

4. **Litigation & Encumbrance Clearance:**
   * Ensure the parcel is not encumbered by bank mortgages, court injunctions, or lis pendens (pending civil suits).

5. **Government Acquisition & Vested Property:**
   * Check that the parcel is not listed under government acquisition gazettes, khas land, or enemy/vested property registries.

💡 **BhumiSathi Solution:** Use our **Pre-Purchase Due Diligence** tool to calculate a transparent 0-100 Risk Index for any plot.`,
    action: { tab: "due-diligence", labelBn: "ঝুঁকি যাচাই পেজে যান ↗", labelEn: "Run Due Diligence ↗" }
  },

  // 4. Khatians: CS, SA, RS, BS
  {
    keywords: ["খতিয়ান", "পর্চা", "সিএস", "এসএ", "আরএস", "বিএস", "সিটি জরিপ", "khatian", "porcha", "cs", "sa", "rs", "bs", "রেকর্ড"],
    responseBn: `### 📑 বিভিন্ন প্রকার খতিয়ান ও পর্চার পরিচয় (CS, SA, RS, BS)

বাংলাদেশে ভূমির মালিকানা ও সীমানা নির্ধারণের জন্য বিভিন্ন সময়ে পরিচালিত জরিপসমূহের খতিয়ান পরিচিতি:

| খতিয়ান জরিপের নাম | সময়কাল | প্রধান বৈশিষ্ট্য ও গুরুত্ব |
| :--- | :--- | :--- |
| **১. সিএস (CS - Cadastral Survey)** | ১৮৮৮ - ১৯৪০ | বাংলাদেশের ভূমির প্রথম প্রাতিষ্ঠানিক জরিপ। একে ভিত্তি খতিয়ান বা আদি রেকর্ড বলা হয়। |
| **২. এসএ (SA - State Acquisition)** | ১৯৫৬ - ১৯৬৩ | জমিদারী প্রথা বিলুপ্তির পর প্রস্তুতকৃত খতিয়ান। প্রজাস্বত্ব নির্ধারণে গুরুত্বপূর্ণ। |
| **৩. আরএস (RS - Revisional Survey)** | ১৯৬৬ - ১৯৮০ | সিএস ও এসএ জরিপের ভুলভ্রান্তি দূর করে মাঠপর্যায়ে প্রস্তুতকৃত অত্যন্ত বিশ্বাসযোগ্য রেকর্ড। |
| **৪. বিএস / সিটি জরিপ (BS / City Survey)** | ১৯৯৮ - বর্তমান | আধুনিক ডিজিটাল ক্যাডাস্ট্রাল জরিপ। বর্তমানে নামজারি ও হস্তান্তরে এই খতিয়ানই প্রধান মানদণ্ড। |

⚠️ **জরুরি সতর্কতা:** কোনো জমি কেনার সময় সিএস থেকে শুরু করে আরএস ও বিএস খতিয়ানে নাম ও দাগের ধারাবাহিক মিল থাকা আবশ্যক। মাঝখানে কোনো খতিয়ান বাদ পড়লে মালিকানা প্রশ্নের মুখে পড়তে পারে।`,
    responseEn: `### 📑 Understanding Bangladesh Land Survey Khatians (CS, SA, RS, BS)

Khatians (Records of Rights) chronicle parcel ownership and boundary evolution across distinct historical surveys:

1. **CS (Cadastral Survey) [1888 – 1940]:**
   * The foundational, historic baseline survey of undivided Bengal. Often regarded as the ultimate root of title in judicial proceedings.

2. **SA (State Acquisition Survey) [1956 – 1963]:**
   * Established immediately after the abolition of the Zamindari system under the State Acquisition and Tenancy Act of 1950.

3. **RS (Revisional Survey) [1966 – 1980]:**
   * A thorough field re-survey rectifying SA discrepancies, held in high judicial esteem for evidentiary reliability.

4. **BS / City Survey [1998 – Present]:**
   * The contemporary cadastral survey. Currently utilized for daily administrative approvals, deed registrations, and mutation filings.

⚠️ **Key Principle:** The title chain must reconcile uninterruptedly across CS ➔ SA ➔ RS ➔ BS. A broken link indicates an unrecorded transaction or conflicting ownership.`,
    action: { tab: "properties", labelBn: "খতিয়ান রেজিস্টার দেখুন ↗", labelEn: "View Khatian Register ↗" }
  },

  // 5. Land Measurement & Conversions
  {
    keywords: ["পরিমাপ", "হিসাব", "শতাংশ", "কাঠা", "বিঘা", "একর", "শতক", "স্কয়ার ফিট", "বর্গফুট", "measurement", "shotok", "katha", "bigha", "acre"],
    responseBn: `### 📐 ভূমি পরিমাপ ও রূপান্তরের নির্ভরযোগ্য সূত্রাবলী

বাংলাদেশে প্রচলিত ভূমি পরিমাপের প্রমিত পরিমাপ একক ও কনভার্সন টেবিল:

* **১ শতাংশ (শতক / ডেসিমাল):**
  * = **৪৩৫.৬ বর্গফুট** (Square Feet)
  * = ৪৮.৪ বর্গগজ (Square Yards)
  * = ৪০.৪৮ বর্গমিটার (Square Meters)

* **১ কাঠা:**
  * = **১.৬৫ শতাংশ** (শতক)
  * = **৭২০ বর্গফুট**
  * = ৮০ বর্গগজ

* **১ বিঘা:**
  * = **২০ কাঠা**
  * = **৩৩ শতাংশ** (শতক)
  * = ১৪,৪০০ বর্গফুট

* **১ একর:**
  * = **১০০ শতাংশ** (শতক)
  * = ৩ বিঘা ৮ ছটাক
  * = **৪৩,৫৬০ বর্গফুট**

* **১ হেক্টর:**
  * = **২.৪৭ একর** (প্রায় ২৪৭ শতাংশ)

💡 **পরিমাপের সোনালী নিয়ম:** জমি ত্রিকোণাকার বা আঁকাবাঁকা হলে তা আয়তাকার ও ত্রিভুজ খণ্ডে ভাগ করে **হেরনের সূত্র** (Heron's Formula) প্রয়োগ করে নিখুঁত ক্ষেত্রফল বের করা হয়।`,
    responseEn: `### 📐 Standard Bangladesh Land Measurement & Area Conversion Matrix

Standard conversion parameters used by Bangladesh Department of Land Records & Surveys:

* **1 Shotok / Decimal (শতাংশ):**
  * = **435.6 Square Feet (sq ft)**
  * = 48.4 Square Yards
  * = 40.48 Square Meters

* **1 Katha (কাঠা):**
  * = **1.65 Shotok**
  * = **720 Square Feet**
  * = 80 Square Yards

* **1 Bigha (বিঘা):**
  * = **20 Kathas**
  * = **33 Shotok (Decimals)**
  * = 14,400 Square Feet

* **1 Acre (একর):**
  * = **100 Shotok**
  * = 3 Bighas, 8 Chhataks
  * = **43,560 Square Feet**

* **1 Hectare:**
  * = **2.47 Acres** (~247 Shotok)`,
  },

  // 6. Duplicate Parcel Sales / Prevention Algorithm
  {
    keywords: ["একাধিকবার বিক্রি", "এক জমি দুইবার", "জালিয়াতি রোধ", "ডুপ্লিকেট", "duplicate", "multiple sales", "প্ল্যাটফর্ম কীভাবে কাজ করে", "algorithm", "বাইনারি সার্চ"],
    responseBn: `### ⚠️ এক জমি একাধিকবার বিক্রির জালিয়াতি প্রতিরোধ প্রযুক্তি

বাংলাদেশে অন্যতম সাধারণ ভূমি প্রতারণা হলো একই দাগের জমি একাধিক ব্যক্তির কাছে গোপনে বিক্রি করে দেওয়া। ভূমিসাথী প্ল্যাটফর্ম এটি কীভাবে প্রতিহত করে:

1. **সাব-রেজিস্ট্রি বালাম ইনডেক্সিং:**
   * প্রতিটি দলিলের দাগ ও মৌজা রেকর্ড উচ্চ-দক্ষতার বাইনারি ইন্ডেক্সে সংরক্ষণ করা হয়।

2. **মালিকানার ক্রম ও হিস্যা মিলকরণ:**
   * কোনো প্লটের জন্য নতুন দলিল যাচাই করা হলে সিস্টেম স্বয়ংক্রিয়ভাবে পূর্ববর্তী সকল বিক্রির রেকর্ড স্ক্যান করে।

3. **অস্বাভাবিক ফ্লিপিং ও ডুপ্লিকেট ফ্ল্যাগ:**
   * একই দাগের জমি যদি মাত্র কয়েক মাসের ব্যবধানে একাধিকবার হাতবদল হয় অথবা মোট দাগের পরিমাণের চেয়ে বেশি জমি বিক্রি দেখানো হয়, সিস্টেম তৎক্ষণাৎ **"লাল ঝুঁকি (High Risk Anomaly)"** হিসেবে রিপোর্ট তৈরি করে।

4. **O(log N) বাইনারি সার্চ প্রযুক্তি:**
   * লক্ষ লক্ষ বালাম রেকর্ডের মধ্যেও আমাদের অ্যালগরিদম মাত্র কয়েক মিলি-সেকেন্ডে শতভাগ নির্ভুল ফলাফল খুঁজে বের করে।`,
    responseEn: `### ⚠️ How BhumiSathi Prevents Duplicate Land Sales & Parcel Fraud

Double-selling identical parcels to separate unsuspecting buyers is a major vector of fraud. BhumiSathi mitigates this via automated algorithmic screening:

1. **Sub-Registry Balam Indexing:**
   * Plots and deeds are indexed using high-efficiency binary search architectures with instant O(log N) retrieval.

2. **Cumulative Allocation Tracking:**
   * When a deed is examined, the engine reconciles all previously recorded transfers on that exact Mouza and Dag number.

3. **Anomaly & Rapid-Flipping Detection:**
   * If a parcel is traded multiple times within brief succession or aggregate sold area exceeds the Khatian ceiling, an automatic **High Risk Anomaly Alert** is flagged.`,
    action: { tab: "dashboard", labelBn: "ড্যাশবোর্ডে পরিসংখ্যান দেখুন ↗", labelEn: "View Analytics Dashboard ↗" }
  },

  // 7. Power of Attorney / Am-Moktarnama
  {
    keywords: ["পাওয়ার অব অ্যাটর্নি", "আমমোক্তারনামা", "আম মোক্তারনামা", "power of attorney", "poa"],
    responseBn: `### 📜 পাওয়ার অব অ্যাটর্নি (আমমোক্তারনামা) সংক্রান্ত আইনি সতর্কতা

পাওয়ার অব অ্যাটর্নি আইন ২০১৫ অনুযায়ী জমি কেনা-বেচার ক্ষেত্রে যা জানা জরুরি:

1. **রেজিস্ট্রেশন বাধ্যতামূলক:**
   * জমি হস্তান্তরের ক্ষমতাপ্রাপ্ত আমমোক্তারনামা অবশ্যই সাব-রেজিস্ট্রি অফিসে রেজিস্ট্রিকৃত হতে হবে। নন-জুডিশিয়াল স্ট্যাম্পে নোটারি করা সাধারণ চুক্তি দিয়ে জমি বিক্রি সম্পূর্ণ অবৈধ।

2. **মূল মালিকের জীবিত থাকা:**
   * আমমোক্তারনামাদাতা (Principal) মারা গেলে আমমোক্তারনামা স্বয়ংক্রিয়ভাবে বাতিল হয়ে যায়। জমি ক্রয়ের সময় মূল মালিক জীবিত আছেন কিনা তা যাচাই করুন।

3. **প্রত্যাহার নোটিশ তলাশি:**
   * মূল মালিক পূর্বেই আমমোক্তারনামা বাতিল বা প্রত্যাহার (Revocation) করেছেন কিনা সাব-রেজিস্ট্রি অফিস থেকে নিশ্চিত হন।

4. **আর্থিক লেনদেন রসিদ:**
   * বিক্রয়ের টাকা কার ব্যাংক একাউন্টে যাচ্ছে (মূল মালিক নাকি আমমোক্তারগ্রহীতা) তা দলিলে পরিষ্কারভাবে উল্লেখ রাখা নিরাপদ।`,
    responseEn: `### 📜 Legal Safeguards on Power of Attorney (Am-Moktarnama)

Under the Power of Attorney Act 2015 in Bangladesh:

1. **Mandatory Sub-Registry Registration:**
   * Any Power of Attorney authorizing land transfer must be formally registered before a Sub-Registrar. Notarized plain stamp agreements are null and void for property alienation.

2. **Status of Principal:**
   * A power of attorney automatically terminates upon the death of the principal grantor. Confirm the grantor is living.

3. **Revocation Search:**
   * Conduct a search at the registering office to verify whether a Deed of Revocation was previously filed by the owner.`,
  },

  // 8. Inheritance & Heba Deed
  {
    keywords: ["হেবা", "হেবা দলিল", "দান", "ওয়ারিশ", "বণ্টননামা", "heba", "gift deed", "inheritance", "partition deed"],
    responseBn: `### 🎁 হেবা দলিল ও ওয়ারিশি বণ্টননামার সঠিক নিয়ম

#### হেবা দলিল (মুসলিম আইনে দান):
* হেবা দলিল শুধুমাত্র রক্তের সম্পর্কের নিকটাত্মীয়দের মধ্যে করা যায়।
* **অনুমোদিত ৮টি সম্পর্ক:** স্বামী-স্ত্রী, পিতা-মাতা ও সন্তান, দাদা-দাদী ও নাতি-নাতনি, আপন ভাই-বোন।
* হেবা দলিলে সরকার নামমাত্র প্রতীকী রেজিস্ট্রেশন ফি (প্রায় ১০০-১০০০ টাকা) ধার্য করে থাকে।
* হেবা ঘোষণার পর দখল হস্তান্তর অপরিহার্য শর্ত।

#### ওয়ারিশি বণ্টননামা (Partition Deed):
* পিতা বা পূর্বপুরুষের মৃত্যুর পর ওয়ারিশদের মধ্যে জমি সমভাবে ভাগ করে **আপস বণ্টননামা দলিল রেজিস্ট্রি** করা বাধ্যতামূলক।
* বণ্টননামা ব্যতিরেকে কোনো একজন ওয়ারিশ নির্দিষ্ট দাগ উল্লেখ করে জমি বিক্রি করলে ক্রেতা আইনি ঝুঁকিতে পড়েন।`,
    responseEn: `### 🎁 Heba Bil Ewaj (Gift) & Partition Deed Essentials

#### Heba (Islamic Gift Deed):
* Recognized between close blood relatives across 8 statutory categories: spouses, parents & children, grandparents & grandchildren, and full siblings.
* Carries nominal government registration duties compared to commercial conveyance deeds.

#### Registered Partition Deed (বণ্টননামা):
* Following inheritance, co-heirs must execute a registered amicable partition deed demarcating precise plot boundaries before alienating individual shares.`,
  },

  // 9. Greetings & Introduction
  {
    keywords: ["হাই", "হ্যালো", "কেমন আছো", "কেমন আছেন", "সালাম", "assalamu alaikum", "hello", "hi", "hey", "তুমি কে", "আপনার পরিচয়", "who are you", "what can you do"],
    responseBn: `ওয়ালাইকুম আসসালাম! আমি **ভূমিসাথী এআই সহকারী (BhumiSathi AI)**। 

আমি বাংলাদেশ সরকারের আধুনিক ভূমি ব্যবস্থাপনা, নাগরিক সুরক্ষা ও আইনি জটিলতা নিরসনে বিশেষভাবে প্রশিক্ষিত।

আমি আপনাকে নিচের বিষয়গুলোতে সাহায্য করতে পারি:
* 📄 **দলিল ও বালাম যাচাই:** দলিল আসল না নকল তা যাচাই করার কৌশল।
* ✍️ **ই-নামজারি ওয়ার্কফ্লো:** অনলাইনে নামজারি আবেদন, কাগজপত্র ও সরকারি ফি।
* 🛡️ **প্রাক-ক্রয় স্বত্ব ঝুঁকি:** জমি কেনার পূর্বে আইনি ও বাস্তব চেকলিস্ট।
* 📑 **খতিয়ান পরিচিতি:** সিএস, এসএ, আরএস ও বিএস রেকর্ডের তুলনা।
* 📐 **ভূমি পরিমাপ ক্যালকুলেশন:** শতক, কাঠা, বিঘা ও একরের রূপান্তর।

আপনার কী ধরনের তথ্য বা পরামর্শ প্রয়োজন? নিচে লিখুন!`,
    responseEn: `Hello and welcome! I am **BhumiSathi AI Assistant**, an intelligent advisory assistant tailored for Bangladesh land administration, real estate due diligence, and registry analytics.

Here is how I can assist you:
* 📄 **Deed Verification:** Methods to detect fraudulent or forged title deeds.
* ✍️ **E-Namjari Guidance:** Document requirements, statutory fees, and filing workflow.
* 🛡️ **Due Diligence:** Pre-purchase security audits and risk factors.
* 📑 **Khatian Evolution:** Interpreting CS, SA, RS, and modern BS records.
* 📐 **Land Measurement:** Conversions across Shotok, Katha, Bigha, and Acres.

How may I assist your land queries today?`,
  },

  // 10. Thanks / Appreciation
  {
    keywords: ["ধন্যবাদ", "থ্যাংকস", "thank you", "thanks", "অনেক ভালো", "সুন্দর", "great", "good job"],
    responseBn: `আপনাকেও আন্তরিক ধন্যবাদ! ভূমিসাথী সর্বদা দেশের সাধারণ নাগরিকদের নিরাপদ ও স্বচ্ছ ভূমি সেবা নিশ্চিত করতে প্রস্তুত। 

ভূমি বিষয়ক অন্য যেকোনো প্রশ্ন থাকলে নির্দ্বিধায় জিজ্ঞেস করতে পারেন। আপনার দিনটি শুভ হোক! 🌿`,
    responseEn: `You are very welcome! BhumiSathi is dedicated to bringing transparency, safety, and modern AI intelligence to every citizen. 

Feel free to ask if you have any other questions regarding land administration or verification! 🌿`,
  }
];

/**
 * Intelligent Fallback Generator for Unmatched Queries
 */
function generateContextualResponse(query, lang = 'bn') {
  const q = query.toLowerCase();
  
  // Tax / Khajna context
  if (q.includes("খাজনা") || q.includes("ট্যাক্স") || q.includes("tax") || q.includes("ldt") || q.includes("কর")) {
    if (lang === 'bn') {
      return `### 🌾 ভূমি উন্নয়ন কর (খাজনা) পরিশোধের নিয়মাবলী

বর্তমানে ভূমি মন্ত্রণালয়ের **ldtax.gov.bd** পোর্টাল বা মোবাইল অ্যাপের মাধ্যমে শতভাগ ডিজিটাল পদ্ধতিতে ভূমি উন্নয়ন কর পরিশোধ করা যায়:

1. **নাগরিক নিবন্ধন:** NID ও মোবাইল নম্বর দিয়ে নাগরিক একাউন্ট খুলুন।
2. **খতিয়ান যুক্তকরণ:** আপনার নামজারি খতিয়ান নম্বর ও দাগ যুক্ত করে হোল্ডিং এন্ট্রি দিন।
3. **অনলাইনে পেমেন্ট:** বিকাশ, নগদ বা কার্ডের মাধ্যমে কর পরিশোধ করে কিউআরযুক্ত ডিজিটাল ই-দাখিলা প্রিন্ট করুন।

⚠️ মনে রাখবেন, হাল সন পর্যন্ত খাজনা পরিশোধ না থাকলে জমি বিক্রি বা নামজারি করা সম্ভব নয়।`;
    }
  }

  // Registration fee context
  if (q.includes("রেজিস্ট্রি ফি") || q.includes("খরচ") || q.includes("cost") || q.includes("registration fee")) {
    if (lang === 'bn') {
      return `### 💰 জমি রেজিস্ট্রেশন ফি ও খরচের সাধারণ হিসাব (বাংলাদেশ)

জমি কেনার সময় দলিল রেজিস্ট্রিতে সরকারি ফি সাধারণত বাজারমূল্য বা সরকার নির্ধারিত মৌজা মূল্যের নির্দিষ্ট শতাংশ হারে নির্ধারিত হয়:

* **রেজিস্ট্রেশন ফি:** ১%
* **স্ট্যাম্প শুল্ক:** ১.৫%
* **স্থানীয় সরকার কর (উপজেলা/পৌর/সিটি কর্পোরেশন):** ২% থেকে ৩%
* **উৎস কর (৫৩এইচ ধারা):** এলাকাভেদে নির্দিষ্ট হারে প্রযোজ্য
* **হলফনামা ও এন-ফি:** ৩০০-৪০০ টাকা

💡 সঠিক খরচের জন্য সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিসের রেট চার্ট ও মৌজা মূল্য তালিকা দেখে নেওয়া উত্তম।`;
    }
  }

  // General fallback structured guidance
  if (lang === 'bn') {
    return `### 💡 আপনার প্রশ্নের বিষয়ে ভূমিসাথী এআই নির্দেশনা

আপনার প্রশ্নটি ভূমি প্রশাসনের জন্য অত্যন্ত গুরুত্বপূর্ণ। ভূমি আইন ও নাগরিক অধিকারের আলোকে নিচে ৩টি জরুরি নির্দেশিকা তুলে ধরা হলো:

1. **দালিলিক প্রমাণাদি সংরক্ষণ:** 
   * ভূমির যেকোনো দাবির ভিত্তি হলো দলিল, খতিয়ান ও হাল খাজনা রসিদ। যে কোনো পদক্ষেপে মূল নথিপত্র সুরক্ষিত রাখুন।
   
2. **ভূমি অফিস ও সাব-রেজিস্ট্রির আনুষ্ঠানিক রেকর্ড:**
   * মৌখিক কথার ওপর ভিত্তি করে কোনো সিদ্ধান্ত নেবেন না। ইউনিয়ন ভূমি অফিস (তহশিল অফিস) বা উপজেলা ভূমি অফিসে রেকর্ডপত্র মিলিয়ে দেখুন।

3. **আইনি বিরোধ এড়ানোর উপায়:**
   * সীমানা বা স্বত্ব নিয়ে বিরোধ তৈরি হলে দ্রুত আমিন বা সার্ভেয়ার দ্বারা ডিজিটাল পরিমাপ করুন এবং প্রয়োজনবোধে বিজ্ঞ দেওয়ানি আইনজীবীর পরামর্শ নিন।

👉 **পরামর্শ:** আপনি চাইলে আরও সুনির্দিষ্ট তথ্য (যেমন: দলিল নম্বর, নামজারি ফি, সিএস/আরএস খতিয়ান, বা পরিমাপের হিসাব) লিখে প্রশ্ন করতে পারেন।`;
  } else {
    return `### 💡 BhumiSathi AI Guidance for Your Inquiry

Regarding your specific query on land and real estate regulation:

1. **Documentary Evidence:** 
   * Always maintain certified copies of title deeds, updated khatians, and digital land tax receipts. Oral arrangements bear no judicial validity in property disputes.
   
2. **Official Verification:** 
   * Cross-examine records at the local Upazila Land Office (AC Land) or Sub-Registry office before making contractual commitments.

3. **Preventive Recourse:** 
   * If facing boundary or title ambiguities, commission a certified cadastral survey and consult a registered civil property attorney.

👉 **Tip:** You can ask more specific questions such as "How to verify a deed?", "E-Mutation steps", or "Land measurement formulas".`;
  }
}

/**
 * Main query function
 * Returns { answer: string, action?: { tab: string, labelBn: string, labelEn: string } }
 */
export function askLandAI(userQuery, lang = 'bn') {
  if (!userQuery || !userQuery.trim()) {
    return {
      answer: lang === 'bn' 
        ? "অনুগ্রহ করে ভূমি বা দলিল সংক্রান্ত আপনার সুনির্দিষ্ট প্রশ্নটি লিখুন।" 
        : "Please enter your specific question regarding land or deed administration."
    };
  }

  const normalized = userQuery.toLowerCase().trim();

  // Score matches
  let bestMatch = null;
  let highestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        score += kw.length; // weight longer matches higher
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && highestScore > 0) {
    return {
      answer: lang === 'bn' ? bestMatch.responseBn : (bestMatch.responseEn || bestMatch.responseBn),
      action: bestMatch.action || null
    };
  }

  // Fallback to contextual generator
  return {
    answer: generateContextualResponse(userQuery, lang),
    action: null
  };
}
