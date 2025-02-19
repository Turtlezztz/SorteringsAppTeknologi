"use client";

import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import {analyzeImage} from "@/lib/api/AnalyzePhoto";

const CameraComponent: React.FC = () => {
    const cameraRef = useRef<Camera>(null);
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice("back");

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission]);

    const takePicture = async () => {
        if (cameraRef.current == null) {
            console.error("Camera ref is null");
            return;
        }
        try {
            const photo = await cameraRef.current.takePhoto();
            console.log("Photo file:", photo);

            console.log("Result: " + await analyzeImage(photo));
            // Handle the photo result as needed
        } catch (error) {
            console.error("Error taking photo:", error);
        }
    };

    if (!device) {
        return (
            <View style={styles.container}>
                <Text style={styles.infoText}>Ingen kameraenhed fundet</Text>
            </View>
        );
    }

    return (
        <View style={styles.cameraContainer}>
            {hasPermission ? (
                <>
                    <Camera
                        ref={cameraRef}
                        style={StyleSheet.absoluteFill}
                        device={device}
                        isActive={true}
                        photo={true}
                    />
                    <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                        <Text style={styles.buttonText}>Tag billede</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.infoText}>Ingen adgang til kamera</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        width: "100%",
        height: 500, // Adjust height as needed
        backgroundColor: "#000",
        position: "relative",
    },
    captureButton: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#000",
    },
    buttonText: {
        color: "#000",
        fontSize: 16,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    infoText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
});

export default CameraComponent;