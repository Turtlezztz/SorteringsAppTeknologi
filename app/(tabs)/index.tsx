import {StyleSheet, Text, Animated, View} from 'react-native';

import ScrollView = Animated.ScrollView;
import {Camera, useCameraDevice, useCameraPermission} from "react-native-vision-camera";
import CamaraView from "@/components/CamaraView";


export default function HomeScreen() {
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back')

    if(!hasPermission) {
        requestPermission()
    }
    console.log(device);
    console.log(hasPermission)

    return (
        <ScrollView>
            <Text style={{
              paddingStart: 30,
              paddingTop: 100,
              fontSize: 36,
            }}>
              Velkommen tilbage!
            </Text>
            <CamaraView />
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
