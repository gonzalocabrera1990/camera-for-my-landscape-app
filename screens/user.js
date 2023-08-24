import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  Pressable,
  Modal,
  RefreshControl
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import userImage from '../assets/1899.png'


export const Userpage = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadWallType, setLoadWallType] = useState("")
  const [colors, setColors] = useState(['white', 'yellow', 'grey']);
  const [dataModal, setDataModal] = useState({
    deleteModal: false,
    isOpen: false,
    messageModal: ''
  })
  const [dataModalCamera, setDataModalCamera] = useState({
    isOpen: false,
    launchType: ''
  })
  var myVideos = [];
  const imagesWall = [
    "https://i.blogs.es/a092f0/breaking-bad/1366_2000.jpeg",
    "https://www.latercera.com/resizer/un8UWex_D3oTPBDny9xxs3QIGe8=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/4MCJQY5QJRDD3PVWNTM3ELOV3E.jpg",
    "https://static.wikia.nocookie.net/breakingbad/images/b/b1/BB_101_S.jpg/revision/latest?cb=20170418193804"]


  const openGaleryWall = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: true
    });
    myVideos.length = 0;
    setLoadWallType(type)
    console.log('miimagen', result);
    if (type === "story") {
      let files = !result.assets[0] ? null : result.assets[0].type;
      if (files === "image") handleWallimg(result.assets[0])
      if (files === "video") Wallvid(result.assets[0])
    } else if (type === "video") {
      Wallvid(result.assets[0])
    } else if (type === "image") {
      handleWallimg(result.assets[0]);
      console.log('miimg', result.assets[0]);
    }
  }
  const photosWall = imagesWall.map((img, Index) => {
    return (
      <View key={Index} style={styles.imgWall}>
        <TouchableHighlight>
          <Image
            style={styles.imgWall}
            source={{ uri: img }}
          />
        </TouchableHighlight>
      </View>
    )
  });
  const usuario = () => {
    return (
      <View >
        <View style={styles.user}>
          <TouchableHighlight >
            <Image
              style={styles.imgProfile}
              source={userImage}
            />
          </TouchableHighlight>
          <View style={styles.userInfo}>
            <Text>
              Walter White
            </Text>
            <Text>"Say my name"</Text>
            <View style={styles.follows}>
              <TouchableHighlight>
                <Text>Followers 100.000.000</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => props.navigation.navigate('Following')}>
                <Text>Following 3</Text>
              </TouchableHighlight>
            </View>
            <MaterialIcons
              name="settings"
              size={21}
              color={'black'}
            />
          </View>
        </View>
        <View style={styles.buttonContent}>
          <>
            <TouchableHighlight
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                backgroundColor: '#288818',
                borderRadius: 50,
              }}
              // onPress={() => openGaleryWall('imagen')}
              onPress={() =>
                setDataModalCamera(() => ({
                  isOpen: true,
                  launchType: 'image'
                }))
              }
            >
              <MaterialCommunityIcons
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // width: 50,
                  // height: 50,
                  // backgroundColor: '#288818',
                  // borderRadius: 50,
                }}
                name="camera"
                size={24}
                color="black"
              />
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                backgroundColor: '#288818',
                borderRadius: 50,
              }}
              // onPress={() => openGaleryWall('video')}
              onPress={() =>
                setDataModalCamera(() => ({
                  isOpen: true,
                  launchType: 'video'
                }))
              }
            >
              <MaterialCommunityIcons
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                }}
                name="video-vintage"
                size={24}
                color="black"
              />
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                backgroundColor: '#288818',
                borderRadius: 50,
              }}
              // onPress={() => openGaleryWall('story')}
              onPress={() =>
                setDataModalCamera(() => ({
                  isOpen: true,
                  launchType: 'story'
                }))
              }
            >
              <MaterialIcons
                name="camera"
                size={24}
                color="white"
              />
            </TouchableHighlight>
          </>

        </View>
        <View View style={styles.imageWallContent}>{photosWall}</View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={dataModalCamera.isOpen && dataModalCamera.launchType === 'image'}
            onRequestClose={() => {
              setDataModalCamera((prevState) => ({
                ...prevState,
                isOpen: false
              }))
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setDataModalCamera((prevState) => ({
                      ...prevState,
                      isOpen: false
                    }))
                    props.navigation.navigate('Appi', {
                      screen: 'CameraPhoto'
                    })
                  }}
                >
                  <Text style={styles.textStyle}>Camera</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    openGaleryWall(dataModalCamera.launchType)
                    setDataModalCamera((prevState) => ({
                      ...prevState,
                      isOpen: false
                    }))
                  }
                  }
                >
                  <Text style={styles.textStyle}>Library</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={dataModalCamera.isOpen && dataModalCamera.launchType === 'video'}
            onRequestClose={() => {
              setDataModalCamera((prevState) => ({
                ...prevState,
                isOpen: false
              }))
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setDataModalCamera((prevState) => ({
                      ...prevState,
                      isOpen: false
                    }))
                    props.navigation.navigate(`Appi`, {
                      screen: 'Camera'
                    })
                  }}
                >
                  <Text style={styles.textStyle}>Camera</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    openGaleryWall(dataModalCamera.launchType)
                    setDataModalCamera((prevState) => ({
                      ...prevState,
                      isOpen: false
                    }))
                  }
                  }
                >
                  <Text style={styles.textStyle}>Library</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={dataModalCamera.isOpen && dataModalCamera.launchType === 'story'}
            onRequestClose={() => {
              setDataModalCamera((prevState) => ({
                ...prevState,
                isOpen: false
              }))
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setDataModalCamera((prevState) => ({
                        ...prevState,
                        isOpen: false
                      }))
                      props.navigation.navigate('Appi', {
                        screen: 'CameraPhoto'
                      })
                    }}
                  >
                    <Text style={styles.textStyle}>Camera Photo</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setDataModalCamera((prevState) => ({
                        ...prevState,
                        isOpen: false
                      }))
                      props.navigation.navigate('Appi', {
                        screen: 'Camera'
                      })
                    }}
                  >
                    <Text style={styles.textStyle}>Camera Video</Text>
                  </Pressable>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    openGaleryWall(dataModalCamera.launchType)
                    setDataModalCamera((prevState) => ({
                      ...prevState,
                      isOpen: false
                    }))
                  }
                  }
                >
                  <Text style={styles.textStyle}>Library</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  };

  return (
    <ScrollView ><View>{usuario()}</View></ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
  },
  imgProfile: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  userInfo: {
    paddingTop: 30,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  follows: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
  },
  formItems: {
    backgroundColor: '#fff',
    color: '#aaa',
    height: 50,
  },
  tab: {
    width: 155,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#fff',
    borderBottomColor: '#aaa',
    borderWidth: 1,
  },
  tabImage: {
    borderRightColor: '#aaa',
  },
  tabVideo: {
    borderLeftColor: '#aaa',
  },
  imageWallContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 'auto',
    width: Dimensions.get('window').width
  },
  imgWall: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
  },
  vidWall: {
    width: 105,
    height: 105,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  //MODAL
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    zIndex: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center", display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  pairOfButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});