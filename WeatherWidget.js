import React, { Component } from 'react';
import { NetInfo, Image, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import moment from 'moment';

class WeatherWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      icon: 'default',
      temp: '',
      precipChance: '',
      summary: 'Keine Verbindung zum Server',
      locationName: 'Aktuelles \nWetter',
    }
  }

  componentDidMount() {
    if (this.props.location){
      this.setState({locationName: this.props.location})
    }

    return fetch('https://api.darksky.net/forecast/' + this.props.api + '/' + this.props.lat + ',' + this.props.lng + '?lang=' + this.props.lang + '&units=si').then((response) => response.json()).then((responseJson) => {
      this.setState({summary: responseJson.currently.summary, temp: (Math.round(1 * responseJson.currently.temperature)/1) + '°C', icon: responseJson.currently.icon, precipChance: Math.round(responseJson.currently.precipProbability * 1000)/10, isLoading: false});
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
              <Text>{this.state.temp}</Text>
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  titleContainer:{
    flex: 1,

  },
  title:{
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  customTitle:{
    marginTop: 13,
    marginBottom: 13,
    marginRight: 5,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  summaryContainer: {
    flex: 1.5,
    flexDirection: 'row',
    marginTop: 12
  },
  summaryContainerLong: {
    flex: 1.5,
    flexDirection: 'row',
    marginTop: 5
  },
  summary: {
    marginLeft: 20,
    marginRight: 10
  },
  icon: {
    marginTop: -6
  },
  tempContainer: {
    flex: .5,
    flexDirection: 'column',
    marginTop: 12,
    marginRight: 15,
    alignItems: 'flex-end'
  },
  spinner: {
    flex: -1,
    marginTop: 12,
    marginBottom: 12
  }
});

export { WeatherWidget };
