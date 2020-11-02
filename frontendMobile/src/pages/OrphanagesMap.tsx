import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import mapMarker from '../images/map-marker.png'
import { useNavigation , useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';
interface Orphanage {
  id: number
  name:string 
  latitude: number
  longitude: number
}


const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  useFocusEffect(() => {
    api.get('/orphanages').then(response => setOrphanages(response.data))
  })


  const {navigate} = useNavigation()
  const handleNavegateToOrphanageDetails = (id:number) => {
  
    navigate('OrphanagesDetails', { id })
  }

  const handleNavigateToCreateOrphanages = () => {
    navigate('SelectMapPosition')
  }
  return (
    <View>
      <MapView 
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: -27.2892052,
        longitude: -49.6401892,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008
      }}
      >
        {
          orphanages.map(orphanage => (
            <Marker 
            key={orphanage.id}
            icon={mapMarker}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
            calloutAnchor={{
              x:2.7,
              y:0.8,
            }}
          >
            <Callout tooltip onPress={() => {handleNavegateToOrphanageDetails(orphanage.id)}}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
  
          </Marker>
          ))
        }

      </MapView>

      <View style={styles.footer}> 
          <Text style={styles.footerText}>{orphanages.length} Orfanatos encontrados</Text>

          <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanages}>
            <Feather name="plus" size={20} color="#fff"/>
          </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312e38',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  map:{
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  calloutContainer: {
    width:160,
    height:46,
    paddingHorizontal:16,
    backgroundColor: 'rgba(255, 255, 255,0.8)',
    justifyContent:'center',


  },
  calloutText:{
    color: '#0089a5',
    fontSize:14,
    fontFamily: 'Nunito_700Bold'
  },
  footer:{
    position:'absolute',
    left:24,
    right:24,
    bottom:32,

    backgroundColor:'#fff',
    borderRadius:20,
    height: 56,
    paddingLeft: 24,

    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',

    elevation: 3
  },
  footerText:{
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold'

  },


  createOrphanageButton:{
    height:56,
    width:56,

    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent:'center',
    alignItems: 'center'
  }
});



export default OrphanagesMap;
