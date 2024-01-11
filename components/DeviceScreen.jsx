import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


const DevicesScreen = (props) => {
    
    const [selectedDevice, setSelectedDevice] = useState(null);

    const renderItem = ({ item }) => (
      <View style={styles.items}>
        <Text style={styles.item}>{item.name} - {item.ip}</Text>
        <TouchableOpacity onPress={() => setSelectedDevice(item)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  
    const handleDelete = () => {
      if (selectedDevice) {
        props.deleteDevice(selectedDevice.id);
        setSelectedDevice(null);
      }
    };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Device Name:</Text>
        <TextInput
          style={styles.input}
          value={props.deviceName}
          placeholder="Shelly1/Lightning"
          onChangeText={(text) => props.handleName(text)}
        />
        <Text style={styles.label}>Device IP-Address:</Text>
        <TextInput
          style={styles.input}
          value={props.deviceType}
  
          placeholder="192.168.0.1"
          onChangeText={(text) => props.handleType(text)}
        />
        <Button style={styles.button} title="Add Device" onPress={props.addDevice} color='tomato' />
      </View>
      <FlatList
        data={props.devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal isVisible={selectedDevice !== null}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Are you sure you want to delete {selectedDevice?.name}?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => setSelectedDevice(null)}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={[ styles.modalDeleteButton]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F1E9'
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item:{
    fontSize: 20,
  },
  
  deleteButton:{
    fontSize: 20,
    padding: 10,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#ccc',
      backgroundColor: '#f1f1f1',
      color: 'black',
  },
  // Modal styles
  modalContainer: {
    backgroundColor: '#F4F1E9',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  modalText: {
    marginBottom: 20,
    fontSize: 20,
    
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    fontSize: 20,
    padding: 10,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#ccc',
      backgroundColor: '#ccc',
      
    color: 'white', // Change the color as desired
    marginEnd: 10,
  },
  modalDeleteButton: {
    fontSize: 20,
    padding: 10,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#FF474D',
      backgroundColor: '#FF474D',
      color: 'white'
  }

});

export default DevicesScreen;
