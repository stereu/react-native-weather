import React, { Component } from 'react';
import { NetInfo, Image, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

class WeatherWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            icon: 'default',
            temp: '',
            summary: 'Keine Verbindung zum Server',
            locationName: 'Waschwetter:',
        }
    }

    componentDidMount() {

        return fetch('http://api.83metoo.de/v0/jwt/weather/' + this.props.lng + '/' + this.props.lat)
            .then((response) => response.json())
            .then((responseJson) => {(responseJson.success == 1) ? this.setState({summary: responseJson.data.forecast, temp: (Math.round(1 * responseJson.data.temp)/1) + '°C', icon: responseJson.data.icon, isLoading: false}) : this.setState({summary: 'Bewölkt', icon: 'partly-cloudy-day', isLoading: false});
        }).catch((error) => {
            console.error(error);
            this.setState({isLoading: false});
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.spinner}>
                    <ActivityIndicator size={'small'}/>
                </View>
            )
        }

        const icons = {
            'partly-cloudy-day': require('./weather-icons/partly-cloudy-day.png'),
            'partly-cloudy-night': require('./weather-icons/partly-cloudy-night.png'),
            'clear-day': require('./weather-icons/clear-day.png'),
            'clear-night': require('./weather-icons/clear-night.png'),
            'rain': require('./weather-icons/rain.png'),
            'snow': require('./weather-icons/snow.png'),
            'sleet': require('./weather-icons/sleet.png'),
            'wind': require('./weather-icons/wind.png'),
            'fog': require('./weather-icons/fog.png'),
            'cloudy': require('./weather-icons/cloudy.png'),
            'hail': require('./weather-icons/hail.png'),
            'thunderstorm': require('./weather-icons/thunderstorm.png'),
            'tornado': require('./weather-icons/tornado.png'),
            'meteor-shower': require('./weather-icons/meteor-shower.png'),
            'default': require('./weather-icons/default.png')
        }

        function getIcon(icon){
            return icons[icon];
        }

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, (this.props.location && this.props.location.length <= 13) && styles.customTitle]}>{this.state.locationName}</Text>
                </View>
                <View style={[styles.summaryContainer, (this.state.summary.length >= 20) && styles.summaryContainerLong]}>
                    <Text style={styles.summary}>{this.state.summary}</Text>
                    <Image style={styles.icon} source={ getIcon(this.state.icon) } />
                </View>
                <View style={styles.tempContainer}>
                    <Text style={styles.temp}>{this.state.temp}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    titleContainer:{
        flex: 1,
    },
    title:{
        marginLeft: 10,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    customTitle:{
        marginLeft: 10,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    summaryContainer: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    summaryContainerLong: {
        flex: 1.5,
        flexDirection: 'row'
    },
    summary: {
        marginLeft: 20,
        marginRight: 10,
        color: 'black'
    },
    icon: {
        tintColor: 'black',
        width: 25,
        height: 25
    },
    temp: {
        color: 'black'
    },
    tempContainer: {
        flex: .5,
        flexDirection: 'column',
        marginRight: 10,
        alignItems: 'flex-end'
    },
    spinner: {
        flex: -1,
    }
});

export { WeatherWidget };
