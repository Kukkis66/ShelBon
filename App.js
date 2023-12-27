import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Main from './components/Main';
import SettingsScreen from './components/Settings';
import DevicesScreen from './components/DeviceScreen';
import * as FileSystem from 'expo-file-system';



const Tab = createBottomTabNavigator();

export default function App() {
  const [data, setData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [devices, setDevices] = useState([]);
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');

  
  useEffect(() => {
    fetchData();
    loadDevices();
  }, []);

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
      const newDevice = { id: Date.now().toString(), name: deviceName, type: deviceType };
      setDevices([...devices, newDevice]);
      setDeviceName('');
    setDeviceType('');
      saveDevices(); // Save devices after adding a new one
    }
  };
  
  const handleName = (event) => {
    setDeviceName(event);

  };

  const handleType = (event) => {
    setDeviceType(event);

  };

  
  


  const fetchData = async (deviceName) => {
    try {
      const response = await axios.get(`http://sheldonapi.ddns.net/api/${deviceName}`);
      
      
      setData(response.data);
      transformToDaily(response.data);
    } catch (error) {
      console.error('something went wrong: ', error);
      
    }
  };

  handleDevicePress = (device) => {
    const deviceName = device.name;
    fetchData(deviceName)
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
        };
      }
  
      tdailyData[dayKey].totalWatts += entry.watts_during_time_interval;
      tdailyData[dayKey].totalPrice += entry.price_during_time_interval;
    });
    const dataArray = Object.values(tdailyData)
    setDailyData(dataArray);
    
  };
  
  
  
  



  


  



  

 

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
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
          headerStyle: {
            backgroundColor: "#F0E5DA",
            
          },
          headerTitleStyle: {
            color: '#E85A4F',
           
          },
          })}
           >
            <Tab.Screen
  name="Home"
  options={{ title: 'Sheldon' }}
>
  {(props) => <Main {...props} dailyData={dailyData} data={data} devices={devices} handleDevicePress={handleDevicePress} />}
</Tab.Screen>

<Tab.Screen
  name="Devices"
>
  {(props) => (
    <DevicesScreen
      {...props}
      deviceName={deviceName}
      deviceType={deviceType}
      
      devices={devices}
      handleName={handleName}
      handleType={handleType}
      addDevice={addDevice}
    />
  )}
</Tab.Screen>
          
          <Tab.Screen name="Settings" component={SettingsScreen} />
          
        </Tab.Navigator>
        
      </SafeAreaView>
    </NavigationContainer>
  );
}

