import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export const TakePhoto = ({ navigation }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const cameraRef = useRef(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [capturedPhoto, setCapturedPhoto] = useState(null)
    const [open, setOpen] = useState(false)
    const [duration, setDuration] = useState(10000)
    const focused = useIsFocused()

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    async function takePicture() {
        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync();
            setCapturedPhoto(data.uri)
        }
    }
    let changeType = () => {
        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
    }
    if (hasCameraPermission === undefined ) {
        return <Text>Requestion permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted.</Text>
    }
    
   if (focused) {
        if (capturedPhoto) {
            let sharePhoto = () => {
                shareAsync(capturedPhoto).then(() => {
                    setCapturedPhoto(undefined);
                });
            };

            let savePhoto = () => {
                MediaLibrary.saveToLibraryAsync(capturedPhoto).then(() => {
                    setCapturedPhoto(undefined);
                });
            };

            return (
                <SafeAreaView style={styles.container}>
                    <Image
                        style={styles.video}
                        source={{ uri: capturedPhoto }}
                        resizeMode='contain'
                    />
                    <View style={styles.shareButtons}>
                        {/* <Button title="Share" onPress={sharePhoto} />
                        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
                        <Button title="Discard" onPress={() => setCapturedPhoto(undefined)} /> */}
                        <TouchableOpacity style={{ margin: 10 }} onPress={sharePhoto}>
                            <MaterialCommunityIcons
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                name="instagram"
                                size={45}
                                color="black"
                            />
                        </TouchableOpacity>
                        {hasMediaLibraryPermission ?
                            <TouchableOpacity style={{ margin: 10 }} onPress={savePhoto}>
                                <MaterialCommunityIcons
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    name="briefcase-download-outline"
                                    size={45}
                                    color="black"
                                />
                            </TouchableOpacity>
                            : undefined}
                        <TouchableOpacity style={{ margin: 10 }} onPress={() => setCapturedPhoto(undefined)}>
                            <MaterialCommunityIcons
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                name="camera-outline"
                                size={45}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            );
        }

        return (
            <Camera style={styles.container} ref={cameraRef} type={type}>

                <View style={styles.cameraView} >
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={changeType}
                        >
                            <MaterialCommunityIcons

                                name="camera-front-variant"
                                size={24}
                                color="yellow"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                            <TouchableOpacity style={styles.button} onPress={takePicture}>
                                <MaterialCommunityIcons
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    name="camera"
                                    size={24}
                                    color="yellow"
                                />
                            </TouchableOpacity>
                    </View>
                    {/* <Button title={isRecording ? "Stop Recording" : "Record Video"} onPress={isRecording ? stopRecording : recordVideo} /> */}
                </View>
            </Camera>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    buttonContainer: {
        backgroundColor: "#fff",
        alignSelf: "flex-end"
    },
    video: {
        flex: 1,
        alignSelf: "stretch"
    },
    cameraView: {
        display: 'flex',
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }, shareButtons: {
        display: 'flex',
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        bottom: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        margin: 20,
        borderRadius: 50,
        width: 50,
        height: 50
    }
})
