// SettingsScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput,  Button, StyleSheet, Switch } from 'react-native';

const SettingsScreen = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  const handleSaveSettings = () => {
    // Handle saving settings logic here
    console.log('Settings saved:', { input1, input2, checkbox1, checkbox2 });
  };

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Input 1"
        value={input1}
        onChangeText={(text) => setInput1(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Input 2"
        value={input2}
        onChangeText={(text) => setInput2(text)}
      />

      <View style={styles.checkboxContainer}>
        <Switch
          value={checkbox1}
          onValueChange={() => setCheckbox1(!checkbox1)}
          style={styles.checkbox}
        />
        <Text>Checkbox 1</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Switch
          value={checkbox2}
          onValueChange={() => setCheckbox2(!checkbox2)}
          style={styles.checkbox}
        />
        <Text>Checkbox 2</Text>
      </View>

      <Button title="Save Settings" onPress={handleSaveSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: 200,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  checkbox: {
    margin: 8,
  },
});

export default SettingsScreen;
