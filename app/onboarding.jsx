import React, { useRef } from "react";
import { Text, ImageBackground, StyleSheet, View, Dimensions, TouchableOpacity, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const pages = [
  {
    image: require("../assets/images/onboarding1.jpg"),
    title: "Welcome to Ezkiel Catering",
    subtitle: "Let's Make Every Moment Unforgettable",
    description: "Professional catering services for all your special occasions",
    color: "#FFB200",
  },
  {
    image: require("../assets/images/onboard2.png"),
    title: "Exceptional Service",
    subtitle: "We Serve with Heart, You Receive with Joy",
    description: "Experienced staff, exquisite cuisine, and perfect presentation",
    color: "#DA8D00",
  },
  {
    image: require("../assets/images/onboard3.png"),
    title: "Create Memories",
    subtitle: "Cooking Memories One Dish at a Time",
    description: "Custom menus tailored to your unique event and preferences",
    color: "#4a0d0d",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [fontsLoaded] = useFonts({ Poppins_400Regular });
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();

  const handleNext = async () => {
    if (currentPage < pages.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentPage + 1 });
    } else {
      await AsyncStorage.setItem('onboardingSeen', 'true');
      router.push("/(auth)/login");
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('onboardingSeen', 'true');
    router.push("/(auth)/login");
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentPage(viewableItems[0].index);
    }
  }).current;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentPage]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={pages}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <ImageBackground
            source={item.image}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            {/* Overlay for better text readability */}
            <View style={styles.overlay} />

            {/* Bottom content container */}
            <View style={styles.bottomContainer}>
              <View style={styles.contentCard}>
                {/* Title */}
                <Text style={styles.title}>{item.title}</Text>

                {/* Subtitle */}
                <Text style={styles.subtitle}>{item.subtitle}</Text>

                {/* Pagination dots */}
                <View style={styles.pagination}>
                  {pages.map((_, i) => {
                    const isActive = i === currentPage;
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => flatListRef.current.scrollToIndex({ index: i })}
                      >
                        <View
                          style={[
                            styles.dot,
                            {
                              backgroundColor: isActive ? "#DA8D00" : "#D1D1D1",
                              width: isActive ? 24 : 10,
                            },
                          ]}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Next/Get Started button */}
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                  <Text style={styles.nextButtonText}>
                    {currentPage === pages.length - 1 ? "Get Started" : "Next"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    opacity: 0.8,
  },
  imageBackground: {
    width,
    height,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 40,
    paddingBottom: 80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#3B141C",
    marginBottom: 12,
    fontFamily: "Poppins_400Regular",
  },
  subtitle: {
    fontSize: 20,
    color: "#666",
    marginBottom: 8,
    fontFamily: "Poppins_400Regular",
  },
  description: {
    fontSize: 16,
    color: "#888",
    marginBottom: 24,
    fontFamily: "Poppins_400Regular",
    lineHeight: 24,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  button: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFB200',
    borderRadius: 30,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '600',
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    transition: "all 0.3s ease",
  },
  nextButton: {
    backgroundColor: "#3B141C",
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: "50%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  nextButtonText: {
    color: "#DA8D00",
    fontSize: 20,
    fontWeight: "300",
    letterSpacing: 0.2,
    fontFamily: "Poppins_400Regular"
  },
});