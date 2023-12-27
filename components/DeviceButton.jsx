// DeviceButton.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DeviceButton = ({ deviceName, onPress, isActive, onButtonPress }) => {
    
    


    return (
        <View style={styles.container}>
        {isActive ? (
          <View style={[styles.button, styles.activeButton]}>
            <Text style={[styles.activeButton]}>{deviceName.name}</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.inactiveButton]}
            onPress={() => {
              onPress(deviceName);
              onButtonPress(deviceName);
            }}
          >
            <Text style={[styles.inactiveButton]}>{deviceName.name}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        
      
        
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      
    
      
      
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#ccc',
      width: '92%', 
    alignSelf: 'center', 
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
  
  export default DeviceButton;

