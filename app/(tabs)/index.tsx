import {Image, StyleSheet, Text, Platform, Animated, View, Button} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ScrollView = Animated.ScrollView;
import {rgbaColor} from "react-native-reanimated/lib/typescript/Colors";
import ImagePicker from "react-native-image-picker"
import {MEDIA_TYPES} from "expo-asset/plugin/build/utils";
import {Camera, useCameraDevice, useCameraPermission} from "react-native-vision-camera";


export default function HomeScreen() {
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back')

    requestPermission()
    return (
        <ScrollView>
            <Text style={{
              paddingStart: 30,
              paddingTop: 100,
              fontSize: 36,
            }}>
              Velkommen tilbage!
            </Text>
            <View>
                ({(hasPermission && device) ? (
                            <Camera
                              style={StyleSheet.absoluteFill}
                              device={device}
                              isActive={true}
                            />
                ) : (
                    <Text>
                        Det er en kold verden
                    </Text>
                )
                })
            </View>
        </ScrollView>

);
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
