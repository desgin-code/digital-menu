import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      loading: "Loading...",
      loadingText: "Please wait while we fetch the hotel details.",
      welcomeTo: "Welcome to",
      exploreMenu: "Explore our menu or share your thoughts with us.",
      digitalMenu: "Digital Menu",
      digitalMenuText: "Browse and order your favorite dishes effortlessly.",
      feedback: "Feedback",
      feedbackText: "Share your thoughts and help us improve your stay.",
      hotelNotFound: "Hotel Not Found",
      hotelNotFoundText:
        "The hotel you are trying to access does not exist or is unavailable.",
      language: "Language",
      allRightsReserved: "All Rights Reserved",

      bannerDescription:"Discover delicious flavors, fresh dishes, and unforgettable dining experiences.",
      loginToContinue: "Log in to continue",
    },
  },
  hi: {
    translation: {
      loading: "लोड हो रहा है...",
      loadingText: "कृपया प्रतीक्षा करें जबकि हम होटल विवरण ला रहे हैं।",
      welcomeTo: "स्वागत है",
      exploreMenu: "हमारे मेनू का अन्वेषण करें या हमें अपनी राय साझा करें।",
      digitalMenu: "डिजिटल मेनू",
      digitalMenuText: "अपने पसंदीदा व्यंजनों को आसानी से ब्राउज़ और ऑर्डर करें।",
      feedback: "प्रतिपुष्टि",
      feedbackText: "अपनी राय साझा करें और अपने प्रवास को बेहतर बनाने में मदद करें।",
      hotelNotFound: "होटल नहीं मिला",
      hotelNotFoundText:
        "आप जिस होटल तक पहुँचने का प्रयास कर रहे हैं वह उपलब्ध नहीं है।",
      language: "भाषा",
      allRightsReserved: "सर्वाधिकार सुरक्षित",

       bannerDescription:"स्वादिष्ट व्यंजन, ताज़ा भोजन और अविस्मरणीय खाने का अनुभव खोजें।",
       loginToContinue: "जारी रखने के लिए लॉगिन करें",
    }
  },
  sw: {
    translation: {
      loading: "Inapakia...",
      loadingText: "Tafadhali subiri wakati tunapopakua maelezo ya hoteli.",
      welcomeTo: "Karibu",
      exploreMenu: "Chunguza menyu yetu au shiriki maoni yako nasi.",
      digitalMenu: "Menyu ya Kidijitali",
      digitalMenuText: "Pitia na agiza vyakula unavyopenda kwa urahisi.",
      feedback: "Maoni",
      feedbackText: "Shiriki maoni yako na utusaidie kuboresha huduma.",
      hotelNotFound: "Hoteli Haikupatikana",
      hotelNotFoundText:
        "Hoteli unayojaribu kufikia haipo au haipatikani.",
      language: "Lugha",
      allRightsReserved: "Haki Zote Zimehifadhiwa",

     bannerDescription:"Gundua ladha tamu, vyakula vya freshi, na uzoefu wa kula usiosahaulika.",
     loginToContinue: "Ingia ili Kuendelea",
    },
  },
  ar: {
    translation: {
      loading: "جار التحميل...",
      loadingText: "يرجى الانتظار أثناء جلب تفاصيل الفندق.",
      welcomeTo: "مرحبًا بك في",
      exploreMenu: "استكشف قائمتنا أو شارك أفكارك معنا.",
      digitalMenu: "القائمة الرقمية",
      digitalMenuText: "تصفح واطلب أطباقك المفضلة بسهولة.",
      feedback: "التعليقات",
      feedbackText: "شارك أفكارك وساعدنا في تحسين إقامتك.",
      hotelNotFound: "الفندق غير موجود",
      hotelNotFoundText:
        "الفندق الذي تحاول الوصول إليه غير موجود أو غير متاح.",
      language: "اللغة",
      allRightsReserved: "جميع الحقوق محفوظة",

       bannerDescription:"اكتشف النكهات اللذيذة والأطباق الطازجة وتجارب تناول الطعام التي لا تُنسى.",
       loginToContinue: "تسجيل الدخول للمتابعة",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
