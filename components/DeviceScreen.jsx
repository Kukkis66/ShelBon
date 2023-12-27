import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';


const DevicesScreen = (props) => {
    
  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name} - {item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Device Name:</Text>
        <TextInput
          style={styles.input}
          value={props.deviceName}
          placeholder="Shelly1/Olohuone"
          onChangeText={(text) => props.handleName(text)}
        />
        <Text style={styles.label}>Device IP-Address:</Text>
        <TextInput
          style={styles.input}
          value={props.deviceType}
          placeholder="192.168.0.1"
          onChangeText={(text) => props.handleType(text)}
        />
        <Button title="Add Device" onPress={props.addDevice} color="#E85A4F" />
      </View>
      <FlatList
        data={props.devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});

export default DevicesScreen;
