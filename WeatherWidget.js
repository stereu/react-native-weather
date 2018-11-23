import React, { Component } from 'react';
import { NetInfo, Image, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import moment from 'moment';
import WeatherIcon from 'react-icons-weather';

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
            .then((responseJson) => {(responseJson.success === 1) ? this.setState({summary: responseJson.data.forecast, temp: (Math.round(1 * responseJson.data.temp)/1) + '°C', icon: responseJson.data.icon, isLoading: false}) : this.setState({summary: 'Bewölkt', icon: 'partly-cloudy-day', isLoading: false});
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
                    <WeatherIcon name="darksky" iconId={this.state.icon} flip="horizontal" rotate="90" />
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
        tintColor: 'black'
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
