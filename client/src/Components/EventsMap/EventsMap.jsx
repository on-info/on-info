import React, {Component} from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

class NewsAside extends Component {
    state = { coordinates: null };
    geocode(ymaps) {
        ymaps.geocode(this.props.location.state.detail)
          .then(result => this.setState({ coordinates: result.geoObjects.get(0).geometry.getCoordinates() }))
      }
    render() {
        return (
            <div >
                <YMaps onApiAvaliable={ymaps => this.geocode(ymaps)}>
                   {this.state.coordinates? 
                        <Map 
                            state= {{
                                center: [this.state.coordinates[0], this.state.coordinates[1]], 
                                zoom: 15}
                            }
                        >
                            {!this.state.coordinates ? null :
                                <Placemark 
                                    geometry = {{ coordinates : this.state.coordinates}} 
                                    properties={{
                                        hintContent : this.props.location.state.detail,
                                        balloonContent : this.props.location.state.detail
                                }}/>
                            }
                        </Map>:
                     null}   
                </YMaps>
            </div>
        ) 
    }
}

export default NewsAside;