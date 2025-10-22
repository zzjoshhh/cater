import { StatusBar } from "expo-status-bar"; 
import { SafeAreaView } from "react-native-safe-area-context"; 
import { StyleSheet, View, Text } from "react-native"; 
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import DateTimePicker from "@react-native-community/datetimepicker"; 
import { useState } from "react"; 
import { TouchableOpacity } from "react-native"; 
import { useRouter } from "expo-router"; 
import { Platform } from "react-native"; 

export default function ReservationScreen() { 
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [showPicker, setShowPicker] = useState(Platform.OS === "ios"); 
  const router = useRouter();

  const handleChange = (_: any, date?: Date) => { 
    if (Platform.OS === "android") { setShowPicker(false); 

    } 
    if (date) setSelectedDate(date); }; 
    const openPicker = () => { 
      if (Platform.OS === "android") { setShowPicker(true); 

      } 
    }; 
    
    return ( 
    <SafeAreaView style={styles.container}> 
      <StatusBar style="light" /> 
      
      {/* Top Bar */} 
      <View style={styles.topBar}> 
        <MaterialCommunityIcons name="calendar-check" size={22} color="#fff" /> 
        <Text style={styles.reservationTitle}>Make Reservation</Text> 
        </View> 
        {
        /* Calendar Section */} 
        <View style={styles.calendarWrapper}> 
          <Text style={styles.selectedDateText}> Select Your Celebration Date: </Text> 
          <Text style={styles.dateDisplay}> {selectedDate.toLocaleDateString()} </Text> 
          
          {/* Android button trigger */} 
          {Platform.OS === "android" && ( 
            <TouchableOpacity style={styles.openButton} onPress={openPicker}> 
            <Text style={styles.openButtonText}>Open Calendar</Text> 
            </TouchableOpacity> 
            )} 
            
            {/* DateTime Picker */} 
            {showPicker && ( 
              <DateTimePicker value={selectedDate} mode="date" 
              display={Platform.OS === "ios" ? "spinner" : "calendar"} 
              onChange={handleChange} minimumDate={new Date()} accentColor="#DA8D00" /> 
            )} 
            {/* Next Button */} 
            <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/reservation/occasion")} > 
              <Text style={styles.nextText}>Next</Text> 
              </TouchableOpacity> 
              </View> 
              </SafeAreaView> 
              ); 
            } 
            
            const styles = StyleSheet.create({ 
              container: { 
                flex: 1, 
                backgroundColor: "#3B141C", 
              }, topBar: { 
                flexDirection: "row", 
                alignItems: "center", 
                justifyContent: "center", 
                paddingVertical: 40, 
                gap: 8, 
              }, 
              reservationTitle: { 
                color: "#FFB200", 
                fontWeight: "bold", 
                fontSize: 20, 
              }, 
              calendarWrapper: { 
                  flex: 1, 
                  backgroundColor: "#fff", 
                  borderTopLeftRadius: 30, 
                  borderTopRightRadius: 30, 
                  padding: 24, 
                  alignItems: "center", 
                }, 
                selectedDateText: { 
                  color: "#4a0d0d", 
                  fontSize: 16, 
                  fontWeight: "500", 
                  marginBottom: 6, 
                }, 
                dateDisplay: { 
                  color: "#DA8D00", 
                  fontWeight: "bold", 
                  fontSize: 20, 
                  marginBottom: 10, 
                }, 
                openButton: { 
                  backgroundColor: "#DA8D00", 
                  paddingVertical: 10, 
                  paddingHorizontal: 20, 
                  borderRadius: 10, 
                  marginBottom: 20, 
                }, 
                openButtonText: { 
                  color: "#fff", 
                  fontWeight: "bold", 
                  fontSize: 16, }, 
                nextButton: {
                   backgroundColor: "#DA8D00", 
                   padding: 12, 
                   alignSelf: "flex-end", 
                   borderRadius: 16, 
                   marginTop: 18, 
                   width: 130, 
                  },
                  nextText: { 
                    fontFamily: "Poppins_400Regular", 
                    color: "#fff", 
                    textAlign: "center", 
                    fontSize: 22, 
                    fontWeight: "bold", 
                  }, 
                }
              );