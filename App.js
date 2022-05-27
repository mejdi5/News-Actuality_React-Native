import React, { useState , useEffect} from "react";
import { FlatList, Linking, Image, View, Modal, SafeAreaView, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from 'axios'
import { format } from 'timeago.js';


const App = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tag, setTag] = useState(null);

  useEffect(() => {
      axios
      .get('https://newsapi.org/v2/top-headlines?country=fr&apiKey=d6dd977e39dd450da8e57382369a570f')
      .then(res => setData(res.data.articles))
      .catch(err => console.log(err.message))
  }, [])

if (!modalVisible) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Actuality</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => 
          <Item 
          key={index} 
          item={item}
          setModalVisible={setModalVisible}
          setTag={setTag}
        />}
      />
    </SafeAreaView>
  );
} else {
  return (
  <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
      >
          <View style={styles.modalView}>
            <Image source={{uri: tag.urlToImage && `${tag.urlToImage}`}} 
              style={styles.modalImage} 
            />
            <Text style={styles.modalText}>{tag.description}</Text>
            <Text>{tag.content}</Text>
            <Text onPress={() => Linking.openURL(tag.url)} style={{color: 'blue'}}>See more..</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible); setTag(null)}}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
  </Modal>
  )
}
};

const Item = ({ item, setModalVisible, setTag}) => {
  return (
    <TouchableOpacity 
    onPress={() => {setModalVisible(true); setTag(item)}} 
    style={[styles.item]}
    >
      <Image source={{uri: item.urlToImage ? `${item.urlToImage}` : 'https://www.alexdepannage.com/wp-content/themes/consultix/images/no-image-found-360x250.png'}} 
        style={styles.image} 
      />
      <View>
        <Text numberOfLines={1} style={[styles.title]}>{item.title}</Text>
        <Text numberOfLines={1} style={{fontWeight:'bold'}}>{item.source.name} {item.author && `(${item.author})`}</Text>
        <Text>{format(item.publishedAt)}</Text>
      </View>
    </TouchableOpacity>
  )};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'lightgreen'
  },
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue',
  },
  text: {
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    right: 15
  },
  title: {
    fontSize: 20,
    color: 'black'
  },
  image: {
    width: 60,
    height: 60,
    right: 10,
    borderRadius: 30
  },
  modalView: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalImage: {
    width: '100%',
    height: 200
  },
  button: {
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
  }
});

export default App;