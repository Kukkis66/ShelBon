import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SwitchButtons = ({ showWatts, toggleSwitch }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, showWatts ? styles.activeButton : styles.inactiveButton]}
        onPress={() => toggleSwitch(true)}
      >
        <Text style={[styles.buttonText, showWatts ? styles.activeButton : styles.inactiveButton]}>kWh</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, !showWatts ? styles.activeButton : styles.inactiveButton]}
        onPress={() => toggleSwitch(false)}
      >
        <Text style={[styles.buttonText, !showWatts ? styles.activeButton : styles.inactiveButton]}>Euro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '93%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#AED9E0',
    borderRadius:4,
  },
  activeButton: {
    backgroundColor: '#AED9E0', 
    fontSize: 25,
    color: '#E85A4F',
    
  },
  inactiveButton: {
    backgroundColor: '#f1f1f1', 
    fontSize: 25,
    color: '#6E798C',
    
  }
 
});

export default SwitchButtons;