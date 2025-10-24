import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { LinearGradient } from "expo-linear-gradient";
import * as Asset from "expo-asset";

const { width, height } = Dimensions.get("window");

const pages = [
  {
    image: require("../assets/images/onboarding1.jpg"),
    title: "Book with us today",
    subtitle: "Let's Make Every",
    description: "Moment Unforgettable",
  },
  {
    image: require("../assets/images/onboard2.png"),
    title: "",
    subtitle: "We Serve with Heart",
    description: "You Receive with Joy.",
  },
  {
    image: require("../assets/images/onboard3.png"),
    title: "",
    subtitle: "Cooking Memories One",
    description: "Dish at a time.",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold });

  useEffect(() => {
    pages.forEach((page) => Asset.Asset.fromModule(page.image).downloadAsync());
  }, []);

  const handleNext = async () => {
    if (currentPage < pages.length - 1) {
      scrollViewRef.current.scrollTo({ x: width * (currentPage + 1), animated: true });
    } else {
      await AsyncStorage.setItem("onboardingSeen", "true");
      router.push("/(auth)/login");
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem("onboardingSeen", "true");
    router.push("/(auth)/login");
  };

  const handleScrollEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentPage(index);
  };

  if (!fontsLoaded) return null;

  return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />

      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Smooth Scroll View */}
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {pages.map((item, index) => (
          <ImageBackground
            key={index}
            source={item.image}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            {/* Soft gradient overlay */}
            <LinearGradient
              colors={["rgba(0,0,0,0.2)", "rgba(58,12,12,0.85)"]}
              style={styles.gradient}
            />

            {/* Content */}
            <View style={styles.bottomContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </ImageBackground>
        ))}
      </Animated.ScrollView>

      <View style={styles.pagination}>
        {pages.map((_, i) => {
          const opacity = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const scale = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  opacity,
                  transform: [{ scale }],
                },
              ]}
            />
          );
        })}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.nextButton}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>
          {currentPage === pages.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: 'transparent',
   },
  imageBackground: {
    width,
    height: height + StatusBar.currentHeight,
    justifyContent: "flex-end",
    backgroundColor: 'transparent',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  skipButton: {
    position: "absolute",
    top: 30,
    right: 25,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  skipText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  bottomContainer: {
    paddingHorizontal: 30,
    paddingBottom: 120,
    width: "100%",
  },
  title: {
    fontSize: 30, 
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: "#FFB200",
    textAlign: "left",
    fontFamily: "Poppins_400Regular",
    marginBottom: 8,
  },
  description: {
    fontSize: 24,
    color: "#f1f1f1",
    textAlign: "left",
    fontFamily: "Poppins_400Regular",
    marginBottom: 8,
  },
  pagination: {
    position: "absolute",
    bottom: 100,
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFB200",
  },
  nextButton: {
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
    backgroundColor: "#FFB200",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 25,
  },
  nextButtonText: {
    color: "#3B141C",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
});
