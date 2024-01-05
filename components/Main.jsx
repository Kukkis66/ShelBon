import React, { useState } from 'react';
import {  Text, StyleSheet, View, ScrollView } from 'react-native';
import DeviceButton from './DeviceButton';
import Barchart from './Barchart';

const styles = StyleSheet.create({
  container: {
    
    flexGrow: 1,
    flex: 1,
    
    backgroundColor: '#F4F1E9', // Set a transparent background
    
    },
    separator: {
      height: 10,
    },
  item: {
    backgroundColor: '#f1f1f1', // Background color
    
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    
    
  
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    },
  time: {
    fontSize: 20,
    textAlign: 'center',
    color: '#6E798C',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 70,
  }
 
});



const Main = ({ dailyData, devices, handleDevicePress, fixed }) => {
  const [activeDevice, setActiveDevice] = useState(null);
  
  const handleButtonPress = (deviceName) => {
    setActiveDevice(deviceName.name === activeDevice ? null : deviceName.name);
    
  };
  
  
  return (
    
    <View style={styles.container}>
      <Barchart dailyData={dailyData} activeDevice={activeDevice} fixed={fixed}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
      {devices.map((deviceName) => (
        <DeviceButton key={deviceName.id} deviceName={deviceName} onPress={handleDevicePress} isActive={deviceName.name === activeDevice} onButtonPress={handleButtonPress} />
      ))}
      
      </ScrollView>
        
    </View>
    
  );
};

export default Main;