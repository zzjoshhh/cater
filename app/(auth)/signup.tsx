import React from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, ScrollView, View, TextInput, Image, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

export default function SignupScreen() {

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');

    const [passwordIsVisible, setPasswordIsVisible] = React.useState<boolean>(false);
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
            }}>

                <View style={styles.curveBackground}>
                     <Image
                        source={require("../../assets/images/ellipse-5.png")}
                        style={styles.curveImage}
                        resizeMode="contain"
                      />
                </View>

                <View style={styles.imageContainer}>
                    <Image 
                    source={require("../../assets/images/chef.png")}
                    style={styles.chefImage}
                    resizeMode="contain"
                    >
                    </Image>
                </View>

                <View style={styles.content}>
                        <Text style={styles.title}>Create Account</Text>
                                      <TouchableOpacity style={styles.loginButton}>
                                          <Text style={styles.loginText}>Already have an account? </Text>
                                          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                                              <Text style={styles.loginButtonHighlight}>Sign in</Text>
                                          </TouchableOpacity>
                                      </TouchableOpacity>
                    
                    <View style={styles.inputContainer}>
                        <View style={styles.icon}>
                            <Feather name="mail" size={22} color="#000" />
                        </View>
                        <TextInput style={styles.input} placeholder="Email or phone number" onChangeText={setEmail} value={email} />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <View style={styles.icon}>
                            <Feather name="lock" size={22} color="#000" />
                        </View>
                        <TextInput style={styles.input} placeholder="Password" secureTextEntry={!passwordIsVisible} onChangeText={setPassword} value={password} />
                        <TouchableOpacity style={styles.passwordVisibleButton} onPress={() => setPasswordIsVisible(!passwordIsVisible)}>
                            <Feather name={passwordIsVisible ? "eye" : "eye-off"} size={20} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.icon}>
                            <Feather name="lock" size={22} color="#000"/>
                            </View>
                                <TextInput style={styles.input} placeholder="Re-enter password" secureTextEntry={!passwordIsVisible} onChangeText={setConfirmPassword} value={confirmPassword}/>
                                <TouchableOpacity style={styles.passwordVisibleButton} onPress={() => setPasswordIsVisible(!passwordIsVisible)}>
                                    <Feather name={passwordIsVisible ? "eye" : "eye-off"} size={20} color="#000" />
                                </TouchableOpacity>
                            </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.icon}>
                            <Feather name="home" size={22} color="#000" />
                        </View>
                        <TextInput style={styles.input} placeholder="Address"></TextInput>
                    </View>

                    <TouchableOpacity style={styles.signupButton}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.orContainer}>
                        <View style={styles.orLine} />
                        <Text style={styles.orText}>or</Text>
                        <View style={styles.orLine} />
                    </View>

                    <TouchableOpacity style={styles.googleButton}>
                        <Image 
                        source={require("../../assets/images/google-icon.png")}
                        style={styles.socialIcon}
                        />
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.facebookButton}>
                        <Image source={require("../../assets/images/Facebook_Logo_Primary.png")}
                        style={styles.socialIcon}
                        />
                        <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBE7E8",
        position: "relative",
    },
    curveBackground: {
        position: "absolute",
        top: -120,
        left: -195,
        width: 459,
        height: 450,
        borderRadius: 234.5,
        overflow: "hidden",
    },
    curveImage: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        position: "absolute",
        top: 10,
        left: 130,
        right: 20,
        zIndex: 2,
    },
    chefImage: {
        width: 250,
        height: 250,
    },
    content: {
        paddingHorizontal: 30,
        marginTop: 225,
        zIndex: 2,
    },
    title: {
        fontSize: 40,
        fontWeight: "800",
        marginBottom: 0,
        fontFamily: "Poppins_400Regular",
    },
    loginButton: {
        flexDirection: "row",
        marginBottom: 2,
        alignSelf: "flex-start",
    },
    loginText: {
        fontFamily: "Poppins",
        fontSize: 20,
    },
    loginButtonHighlight: {
        color: "#DA8D00",
        fontSize: 16,
        fontWeight: "600",
    },
    inputContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        position: "relative",
    },
    icon: {
        marginRight: 15,
    },
    input: {
        borderBottomWidth: 1.5,
        borderBottomColor: "#eee",
        fontSize: 16,
        flex: 1,
    },
    passwordVisibleButton: {
        position: "absolute",
        right: 0,
    },
    signupButton: {
        backgroundColor: "#DA8D00",
        padding: 12,
        alignSelf: "flex-end",
        borderRadius: 16,
        marginTop: 6,
        width: 130,
    },
    signupText: {
        fontFamily: "Poppins_400Regular",
        color: "#fff",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        marginBottom: 12,
    },
    orLine: {
        height: 1,
        backgroundColor: "#797878",
        flex: 1,
    },
    orText: {
        color: "#797878",
        marginRight: 18,
        marginLeft: 18,
        fontSize: 16,
    },
    googleButton: {
        backgroundColor: "#3B141C",
        padding: 14,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    googleButtonText: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 16,
    },
    socialIcon: {
        width: 20.03,
        height: 20.44,
        position: "absolute",
        left: 14,
    },
    facebookButton: {
        backgroundColor: "#3B141C",
        padding: 14,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginTop: 12,
    },
    facebookButtonText: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 16,
    }
});