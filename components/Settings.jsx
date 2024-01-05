// SettingsScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput,  Button, StyleSheet, Switch } from 'react-native';

const SettingsScreen = ({handleFixedPrice, saveFixedPrice, fixedMultiplayer, getFixedPrice}) => {
  const [input1, setInput1] = useState('');
  
  const [checkbox1, setCheckbox1] = useState(false);
  

  const handleSaveSettings = () => {
    saveFixedPrice(input1)
    console.log(input1)
    handleFixedPrice(checkbox1)
    getFixedPrice()
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="€"
            value={input1}
            onChangeText={(text) => setInput1(text)}
          />
        </View>
        <Text>{fixedMultiplayer}</Text>
        <Switch
          value={checkbox1}
          onValueChange={() => setCheckbox1(!checkbox1)}
          style={styles.checkbox}
        />
      </View>
      <Button title="Save Settings" onPress={handleSaveSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    marginRight: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: 50,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  checkbox: {
    margin: 8,
  },
});

export default SettingsScreen;
