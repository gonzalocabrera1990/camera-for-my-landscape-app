import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions, StatusBar
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Follows = ({ navigation }) => {

    state = { follow: [
        {
            firstname: 'Jesse',
            lastname: 'Pinkman',
            imagen: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/08/breaking-bad-jesse-pinkman-aaron-paul-3114486.jpg?tf=3840x'
        },{
            firstname: 'Skyler',
            lastname: 'White',
            imagen: 'https://images.mubicdn.net/images/cast_member/166436/cache-170032-1473158372/image-w856.jpg?size=800x'
        },{
            firstname: 'Walter',
            lastname: 'White Jr.',
            imagen: 'https://es.web.img2.acsta.net/medias/nmedia/18/74/20/02/19243665.jpg'
        }
    ] }
    const { follow } = this.state;
  let mapFollow = follow.map((user, index) => {
      return (
        <View style={styles.followsContent} key={index} >
          <TouchableOpacity
            style={styles.followsContent}
            >
            <Image
              style={styles.imgProfile}
              source={{ uri: user.imagen }}
            />
            <Text>
              <Text style={styles.author}>{user.firstname}</Text>
            </Text>
            <Text>
              <Text style={styles.author}>{user.lastname}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      );
    })

  return (
    <View>
        <StatusBar/>
      <View style={styles.arrowBack}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={35}
          color={'green'}
          onPress={() => navigation.goBack()}
        />
      </View>
        <View style={styles.followContainer} >
            {mapFollow}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  arrowBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  activityIndicator: {
    marginTop: 15,
  },
  followContainer: {
    marginTop: 30,
  },
  followsContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
  },
  imgProfile: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  author: {
    fontSize: 20,
    marginRight: 10,
    color: 'black',
  },
});
