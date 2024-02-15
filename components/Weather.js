import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';


const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL,
}

export default function Weather(props) { //saa latituden ja longituden propsina Position.js:stä
    const [temp, setTemp] = useState(0)
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')
    const [city, setCity] = useState('')
    const [feelsLike, setFeelsLike] = useState('')

    useEffect(() => {
        console.log(props.latitude, props.longitude)
        const url = api.url + //eli urlin perään seuraavat:
        'lat=' + props.latitude +
        '&lon=' + props.longitude +
        '&units=metric' +
        '&appid=' + api.key

        fetch(url)
        .then(res => res.json())
        .then((json) => {
            console.log(json)
            setTemp(json.main.temp)
            setDescription(json.weather[0].description)
            setIcon(api.icons + json.weather[0].icon + '@2x.png')
            setCity(json.name)
            // console.log(city)
            setFeelsLike(json.main.feels_like)
        })
        .catch((error) => {
            console.log('Error retrieving weather')
            console.log(error)
        })
    },[])

  return (
    <View>
        {/*alla oleva tulostaa kaupungin nimen, joka on saatu json.name:sta*/}
        <Text style={styles.citytxt}>{city}</Text> 
      <Text style={styles.temp}>{temp}°C</Text>
        <Text>Feels like: {feelsLike}°C</Text>
      <View style={styles.picNdesc}>
      {icon &&
        <Image source={{uri: icon}} style={styles.pic} />
        }
        <Text>{description}</Text>
        </View>

    </View>
  );
};

const styles = {
    citytxt: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        
    },
    temp: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20
    },
    picNdesc: {
    
        justifyContent: 'center',
        alignItems: 'center'
    },
    pic: {
        width: 100,
        height: 100
    }
}


