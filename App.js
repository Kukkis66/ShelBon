import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Main from './components/Main';
import SettingsScreen from './components/Settings';
import DevicesScreen from './components/DeviceScreen';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

export default function App() {
  const [data, setData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [devices, setDevices] = useState([]);
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [fixedMultiplayer, setFixedMultiplayer] = useState(0);
  const [fixed, setFixed] = useState(false);
  
  
  useEffect(() => {
    fetchData();
    loadDevices();
    getFixedPrice();
    
  }, []);

  useEffect(() => {
    if (devices.length > 0) {
      saveDevices();
    }
  }, [devices]);
  
  const loadDevices = async () => {
    try {
      const path = FileSystem.documentDirectory + 'settings.json';
      const fileExists = await FileSystem.getInfoAsync(path);
      
      if (fileExists.exists) {
        const content = await FileSystem.readAsStringAsync(path);
        const parsedDevices = JSON.parse(content);
        setDevices(parsedDevices);
      } else {
        // Create an empty settings.json file if it doesn't exist
        await FileSystem.writeAsStringAsync(path, '[]', { encoding: FileSystem.EncodingType.UTF8 });
      }
    } catch (error) {
      console.error('Error loading devices:', error);
    }
  };

  const saveDevices = async () => {
    try {
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + 'settings.json',
        JSON.stringify(devices),
        { encoding: FileSystem.EncodingType.UTF8 }
      );
    } catch (error) {
      console.error('Error saving devices:', error);
    }
  };
  
  const addDevice = () => {
    if (deviceName && deviceType) {
      const newDevice = { id: Date.now().toString(), name: deviceName, ip: deviceType };
      
      
      const updateEndpoint = 'http://sheldonapi.ddns.net/api/settings';
  
      
      axios.put(updateEndpoint, { shellies: [...devices, newDevice] })
        .then(response => {
          
          console.log(response.data);
          setDevices(prevDevices => [...prevDevices, newDevice]);
        })
        .then(() => {
          setDeviceName('');
          setDeviceType('');
        })
        
        .catch(error => {
          
          console.error('Error updating settings:', error.message);
        });
  
      
      
    }
  };

  
  
  const handleName = (event) => {
    setDeviceName(event);

  };

  const handleType = (event) => {
    setDeviceType(event);

  };

  const handleFixedPrice = (event) => {
    setFixed(event)
    
    console.log("fixed", fixed)
    console.log("price", fixedMultiplayer)
  }
  


  const fetchData = async (deviceId) => {
    try {
      const response = await axios.get(`http://sheldonapi.ddns.net/api/device/${deviceId}`);
      
      
      setData(response.data);
      transformToDaily(response.data);
    } catch (error) {
      error.log('something went wrong: ', error.message);
      
    }
  };

  handleDevicePress = (device) => {
    const deviceId = device.id;
    console.log(device)
    fetchData(deviceId)
  }
  
  
  
  const transformToDaily = (data) => {
    const tdailyData = {};
  
    data.forEach((entry) => {
      const date = new Date(entry.time);
      const dayKey = date.toISOString().split('T')[0];
      const weekDay = date.getDay(); // 0 (Sunday) through 6 (Saturday)
      
      if (!tdailyData[dayKey]) {
        tdailyData[dayKey] = {
          date: dayKey,
          day: weekDay,
          totalWatts: 0,
          totalPrice: 0,
          fixedPrice: 0,
        };
      }
      
      tdailyData[dayKey].totalWatts += entry.watts_during_time_interval;
      tdailyData[dayKey].totalPrice += entry.price_during_time_interval;
      tdailyData[dayKey].fixedPrice += ((entry.watts_during_time_interval/1000)*fixedMultiplayer);
    });
    const dataArray = Object.values(tdailyData)
    setDailyData(dataArray);
    console.log(dataArray)
  };
  
  
  
  



  

  const deleteDevice = (deviceId) => {
    
    const deleteEndpoint = `http://sheldonapi.ddns.net/api/settings/device/${deviceId}`;
    const updatedDevices = devices.filter((device) => device.id !== deviceId);
    
    // Make a DELETE request to delete the device
    axios.delete(deleteEndpoint)
      .then(response => {
       console.log(response.data)
       
      })
      .catch(error => {
        
        console.error('Error deleting device:', error.message);
      });
      setDevices(updatedDevices);
      saveDevices();

  };
  

  const saveFixedPrice = async (price) => {
    try {
      await AsyncStorage.setItem('fixedPrice', price);
    } catch (error) {
      console.error('Error saving fixed price:', error);
    }
  };

  
  const getFixedPrice = async () => {
    try {
      const value = await AsyncStorage.getItem('fixedPrice');
      setFixedMultiplayer(value)
    } catch (error) {
      console.error('Error getting fixed price:', error);
      return '';
    }
  };
 

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#F0E5DA" barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-analytics'
                : 'ios-analytics';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            }
           else if (route.name === 'Devices') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: '#E85A4F',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: 70,
            paddingHorizontal: 5,
            paddingBottom: 10,
            backgroundColor: '#AED9E0',
            position: 'absolute',
            borderTopWidth: 0,
            
          },
          headerTitle: fixed ? 'FixedPrice' : 'SpotPrice',
          
          headerStyle: {
            backgroundColor: "#F0E5DA",
            
          },
          headerTitleStyle: {
            color: '#E85A4F',
            fontSize: 25,
           
          },
          })}
           >
            <Tab.Screen
  name="Home"
  
>
  {(props) => 
    <Main 
    {...props} 
    dailyData={dailyData} 
    data={data} 
    devices={devices} 
    handleDevicePress={handleDevicePress}
    fixed={fixed}
    />
    }
</Tab.Screen>

<Tab.Screen
  name="Devices"
>
  {(props) => (
    <DevicesScreen
      {...props}
      deviceName={deviceName}
      deviceType={deviceType}
      deleteDevice={deleteDevice}
      devices={devices}
      handleName={handleName}
      handleType={handleType}
      addDevice={addDevice}
    />
  )}
</Tab.Screen>
          
          <Tab.Screen name="Settings">
            {(props) => (
    <SettingsScreen
      {...props}
      handleFixedPrice={handleFixedPrice}
      saveFixedPrice={saveFixedPrice}
      fixedMultiplayer={fixedMultiplayer}
      getFixedPrice={getFixedPrice}
    />
  )}
      </Tab.Screen>    
        </Tab.Navigator>
        
      </SafeAreaView>
    </NavigationContainer>
  );
}

