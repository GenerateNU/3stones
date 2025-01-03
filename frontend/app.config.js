import 'dotenv/config';

export default {
  expo: {
    name: "3stones",
    slug: "frontend",
    version: "0.1.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.generate.3stones"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/images/favicon.png"
    },
    extra: {
      googleApiKey: process.env.GOOGLE_API_KEY,
      eas: {
        projectId: "27b7d706-8b3c-45f8-ba59-ae05df33c4de"
      }
    },
    plugins: ["expo-font"]
  }
};
