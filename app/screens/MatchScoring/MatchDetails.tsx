import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp } from '@react-navigation/native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageBackground } from 'react-native';

const MatchDetails = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [overs, setOvers] = useState('');
    const [oversPerBowler, setOversPerBowler] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [ballType, setBallType] = useState('tennis');

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleNext = () => {
        // Handle navigation to the next screen and pass the match details
        navigation.navigate('TossResult');
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/images/mainscreen.png')}
                style={styles.background}>
            <View style={styles.square}>
            <Text style={styles.title}>Enter Match Details</Text>
            <TextInput
                style={styles.input}
                placeholder="Overs"
                keyboardType="numeric"
                value={overs}
                onChangeText={setOvers}
            />
            <TextInput
                style={styles.input}
                placeholder="Overs per bowler"
                keyboardType="numeric"
                value={oversPerBowler}
                onChangeText={setOversPerBowler}
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />
    
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Ball Type:</Text>
                <Picker
                    selectedValue={ballType}
                    style={styles.picker}
                    onValueChange={(itemValue) => setBallType(itemValue)}
                >
                    <Picker.Item label="Tennis" value="tennis" />
                    <Picker.Item label="Leather" value="leather" />
                    <Picker.Item label="Other" value="other" />
    
                </Picker>
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Player per side :</Text>
                <Picker
                    selectedValue={ballType}
                    style={styles.picker}
                    onValueChange={(itemValue) => setBallType(itemValue)}
                >
                    <Picker.Item label="07" value="seven" />
                    <Picker.Item label="11" value="eleven" />
    
                </Picker>
            </View>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                <Text style={styles.datePickerText}>{date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
           
           <TouchableOpacity 
      style={styles.nextButton} 
      onPress={() => navigation.navigate('TeamRegistration', { teamName1: '', teamName2: '' })}
    >
      <Text style={styles.nextButtonText}>NEXT</Text>
    </TouchableOpacity>
         </View>
        </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex : 1,
        width: '100%',
        resizeMode: 'contain',
        justifyContent:'center',
      },
      container: {
        flex: 1,                 
        justifyContent: 'center', 
        alignItems: 'center',
        alignContent : 'center' ,
      },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20,
        //color: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        //backgroundColor: '#eee',
        width: '92%',
        borderRadius : 10,

    },
    datePickerButton: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        //backgroundColor: '#eee',
        width: '92%',
        borderRadius : 10,
    },
    datePickerText: {
        color: '#000',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        width: '92%',
        borderRadius : 20,
        color:'white',
        
    },
    pickerLabel: {
        fontSize: 18,
        marginRight: 10,
        color:'#fff',
        //bold
        fontWeight: 'bold',
        
    },
    square: {
        width: 350, 
        height: 600, 
        backgroundColor : 'white',
        justifyContent: 'center',   
        alignItems: 'center',  
        alignSelf: 'center',
        borderRadius: 20,   
      },
    picker: {
        flex: 1,
         backgroundColor: '#eee',
    },
    nextButton: {
        backgroundColor: 'black',
        padding: 10,
        paddingBottom: 10,
        marginBottom: 5,
        borderRadius: 10,
        width: '95%',
    
        
        alignItems: 'center',
        alignSelf: 'center',
    
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MatchDetails;
