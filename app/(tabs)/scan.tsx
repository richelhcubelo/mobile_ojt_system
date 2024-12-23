import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import {
  useForegroundPermissions,
  getCurrentPositionAsync,
} from "expo-location";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [locationPermission, requestLocationPermission] =
    useForegroundPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  const handleRequestPermission = async () => {
    const { status } = await requestPermission();
    if (status === "granted") {
      // Permission granted
      console.log("Camera permission granted");
    } else {
      // Permission denied
      console.log("Camera permission denied");
    }
  };
  const handleRequestLocation = async () => {
    const { status } = await requestLocationPermission();
    if (status === "granted") {
      const location = await getCurrentPositionAsync({});
      console.log("User Location:", location);
    } else {
      console.log("Location permission denied");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>QR Code Scanner</Text>
      <View style={{ gap: 20 }}>
        <Pressable
          onPress={async () => {
            await handleRequestPermission();
            await handleRequestLocation();
          }}
        >
          <Text style={styles.buttonStyle}>Request Permissions</Text>
        </Pressable>
        <Link href="/scanner/scan1" asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text
              style={[
                styles.buttonStyle,
                { opacity: !isPermissionGranted ? 0.5 : 1 },
              ]}
            >
              Scan Code
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-around",
    paddingVertical: 80,
  },
  title: {
    color: "black",
    fontSize: 40,
  },
  buttonStyle: {
    color: "#0E7AFE",
    fontSize: 20,
    textAlign: "center",
  },
});
