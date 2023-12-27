import React from 'react';
import { View, Button, Switch, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native'
import { useEffect, useState } from 'react';
import SwitchButtons from './SwitchButtons';





const Barchart = ({dailyData}) => {

const [showWatts, setShowWatts] = useState(false);
const [chartData, setChartData] = useState([])
const [currentWeek, setCurrentWeek] = useState(0); // State to track the current week
const daysOfWeekStartingFromMonday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const fetchDataForWeek = async (week) => {
    try {
      // Assume data is an array of entries with a timestamp field indicating the week
      const filteredData = dailyData.filter(entry => {const weekNumber = getWeekNumber(entry.date); return weekNumber === week;});
    
      // Update the data state or perform any other necessary actions with the filtered data
      setChartData(filteredData);
    } catch (error) {
      console.error('Error fetching data for the week:', error);
    }
  };
  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchDataForWeek(currentWeek);
    

  }, [currentWeek, dailyData]);

  useEffect(() => {
    setCurrentWeek(currentWeekNumber)
  
    
  }, [])
  
  const currentWeekNumber = () => {
    const thisWeek = getWeekNumber(new Date());
    
    return thisWeek
}

// Function to get the index of a day

const getIndexForDay = (day) => {
  const startingIndex = 1; // Monday is at index 1
  const index = (daysOfWeekStartingFromMonday.indexOf(day) + startingIndex) % daysOfWeekStartingFromMonday.length;
  return index;
};

// Function to get the price for a day
const getDataForDay = (day) => {
  const matchingEntry = chartData.find(entry => entry.day === getIndexForDay(day));
  
  return matchingEntry
      ? {
          totalPrice: matchingEntry.totalPrice.toFixed(2),
          totalWatts: (matchingEntry.totalWatts/1000).toFixed(1),
        }
      : { totalPrice: 0, totalWatts: 0 }
};


const data =
    {
    labels: daysOfWeekStartingFromMonday,
    datasets: [
      {
        data: daysOfWeekStartingFromMonday.map((day) => (showWatts ? getDataForDay(day).totalWatts : getDataForDay(day).totalPrice)),
        
      },
    ],
  };


const toggleSwitch = (event) => {
    setShowWatts(event)
}


const deviceWidth = Dimensions.get('window').width


const getWeekNumber = (timestamp) => {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  
    return weekNumber;
  };
  
const handleWeekChange = (increment) => {
    
    setCurrentWeek((prevWeek) => prevWeek + increment);
    
  };

    return (
        
      <View style={{ justifyContent: 'center', alignSelf: 'center'}}>
        <SwitchButtons showWatts={showWatts} toggleSwitch={toggleSwitch}/>
        <BarChart
          data={data}
          width={deviceWidth - 40}
          height={300}
          yAxisSuffix={showWatts ? ' kWh' : ' €'}
          yAxisInterval={2}
          segments={5}
          showValuesOnTopOfBars={true}
          
          chartConfig={{
            backgroundColor: '#F3EFEF',
            backgroundGradientFrom: '#F3EFEF',
            backgroundGradientTo: '#D2E9F5',
            decimalPlaces: showWatts ? 1 : 2,
            fillShadowGradientTo: '#6E798C',
            fillShadowGradient: '#6E798C',
            color: (opacity = 1) => `rgba(232, 90, 79, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(110, 121, 140, ${opacity})`,
            strokeWidth: 1,
            barPercentage: 0.8,
            barRadius: 1,
            
            
            propsForHorizontalLabels: {
                x: 65,
            },
            
            style: {
              borderRadius: 10,
              
            },
          }}
          style={{
            
            borderRadius: 10,
            
            marginVertical: 20,
            
           
            
            
          }}
          fromZero={true} 
          
        
        />
        <View style={styles.weekArrowsContainer}>
        <TouchableOpacity onPress={() => handleWeekChange(-1)}>
          <Text style={styles.arrow}>{' < '}</Text>
        </TouchableOpacity>
        <Text style={styles.currentWeekIndicator}>Week {currentWeek}</Text>
        {currentWeek < currentWeekNumber() ? (
        <TouchableOpacity onPress={() => handleWeekChange(1)}>
        <Text style={styles.arrow}>{' > '}</Text>
        </TouchableOpacity>
            ) : (
        <View >
        <Text style={styles.nonPressableArrow}>{' > '}</Text>
        </View>
        )}
       
      </View>
      </View>
      
    );
  };

  const styles = StyleSheet.create({
    weekArrowsContainer: {
    
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      
    },
    arrow: {
      fontSize: 25,
      marginHorizontal: 20,
      fontWeight: 'bold',
      backgroundColor: '#f1f1f1',  
        
        color: '#E85A4F',
      
      padding: 10,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#ccc',
      
    alignSelf: 'center', 
    },
    currentWeekIndicator: {
      fontSize: 25,
      fontWeight: 'bold',
      padding: 10,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#ccc',
      backgroundColor: '#f1f1f1', 
      
      color: '#6E798C',
        
    },
    nonPressableArrow: {
        fontSize: 25,
      marginHorizontal: 20,
      fontWeight: 'bold',
      backgroundColor: '#f1f1f1', 
      
      color: '#6E798C',
      
      padding: 10,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#ccc',
      
    alignSelf: 'center',
    }
  });
  
export default Barchart;
  