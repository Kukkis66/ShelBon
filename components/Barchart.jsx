import React from 'react';
import { View, Button, Switch } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native'
import { useState } from 'react';
import SwitchButtons from './SwitchButtons';





const Barchart = ({dailyData}) => {
// console.log(dailyData)
const [showWatts, setShowWatts] = useState(false)
const daysOfWeekStartingFromMonday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Function to get the index of a day
const getIndexForDay = (day) => {
  const startingIndex = 1; // Monday is at index 1
  const index = (daysOfWeekStartingFromMonday.indexOf(day) + startingIndex) % daysOfWeekStartingFromMonday.length;
  return index;
};

// Function to get the price for a day
const getDataForDay = (day) => {
  const matchingEntry = dailyData.find(entry => entry.day === getIndexForDay(day));
  
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
  

    return (
        
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
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
        
      </View>
      
    );
  };

  
  
export default Barchart;
  