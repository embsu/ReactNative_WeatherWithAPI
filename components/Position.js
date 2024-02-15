import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as Location from 'expo-location';
import Weather from './Weather';
import { useState, useEffect } from 'react';

export default function Position(props) { //propsina saadaan kaupungin nimi App.js:stä

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('Retrieving location...')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            console.log(status)

            try {
                if (status !== 'granted') {
                    setMessage('Location not permitted.')

                } else {
                    const position = await Location.getCurrentPositionAsync({ accurancy: Location.Accuracy.High })
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('Location retrieved: ')
                }
            } catch (error) {
                setMessage('Error retrieving location')
                console.log(error)
            }
            setIsLoading(false)
        })()
    }, [])

    return (
        <View style={styles.kokohelahoito}>
            <Text style={styles.coords}>{latitude.toFixed(3)}, {longitude.toFixed(3)}</Text>
            <Text style={styles.message}>{message}{props.city}</Text>
            {isLoading === false &&
                <Weather latitude={latitude} longitude={longitude} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    kokohelahoito: {
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 20,
        padding: 20,
        width: '80%',
        height: '50%',
        borderWidth: 3,
        borderColor: '#3D5A80'

    },
    coords: {
        fontSize: 18,
        textAlign: 'center',
        margin: 20
    },
    message: {
        fontSize: 18,
        textAlign: 'center'
    }
})

