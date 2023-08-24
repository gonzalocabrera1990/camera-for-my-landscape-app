// The following packages need to be installed using the following commands:
// expo install expo-camera
// expo install expo-media-library
// expo install expo-sharing
// expo install expo-av

import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Appi() {
    let cameraRef = useRef();

    const focused = useIsFocused()
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState();
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [duration, setDuration] = useState(0)
    
    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMicrophonePermission(microphonePermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
        return <Text>Requestion permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted.</Text>
    }

    let recordVideo = () => {
        setIsRecording(true);
        let startTiming = Date.now()
        let options = {
            quality: "1080p",
            maxDuration: 60,
            mute: false
        };

        cameraRef.current.recordAsync(options).then((recordedVideo) => {
            let endTiming = Date.now()
            let durationTime = endTiming - startTiming
            setDuration(durationTime)
            setVideo(recordedVideo);
            setIsRecording(false);
            console.log('durationTime', durationTime);
        });
    };

    let stopRecording = () => {
        setIsRecording(false);
        cameraRef.current.stopRecording();
    };
    let changeType = () => {
        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
    }

    if (focused) {
        if (video) {
            let shareVideo = () => {
                shareAsync(video.uri).then(() => {
                    setVideo(undefined);
                });
            };

            let saveVideo = () => {
                MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
                    setVideo(undefined);
                });
            };

            return (
                <SafeAreaView style={styles.container}>
                    <Video
                        style={styles.video}
                        source={{ uri: video.uri }}
                        useNativeControls
                        resizeMode='contain'
                        isLooping
                    />
                    <View style={styles.shareButtons}>
                        {/* <Button title="Share" onPress={shareVideo} />
                        {hasMediaLibraryPermission ? <Button title="Save" onPress={saveVideo} /> : undefined}
                        <Button title="Discard" onPress={() => setVideo(undefined)} /> */}
                        <TouchableOpacity style={{ margin: 10 }} onPress={shareVideo}>
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
                            <TouchableOpacity style={{ margin: 10 }} onPress={saveVideo}>
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
                        <TouchableOpacity style={{ margin: 10 }} onPress={() => setVideo(undefined)}>
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
                        {isRecording ?
                            <TouchableOpacity style={styles.button} onPress={stopRecording}>
                                <MaterialCommunityIcons
                                    name="stop"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.button} onPress={recordVideo}>
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
                        }
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
