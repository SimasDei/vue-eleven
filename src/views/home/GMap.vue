<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>
<script>
import firebase from 'firebase';
import db from '@/firebase/init';

export default {
  name: 'GMap',
  data() {
    return {
      lat: 21.303074,
      lng: -157.857442,
    };
  },
  mounted() {
    const user = firebase.auth().currentUser;
    console.log(user);
    /**
     * @todo - Check browser's geolocation compatibility
     */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          db.collection('users')
            .where('user_id', '==', user.uid)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                db.collection('users')
                  .doc(doc.id)
                  .update({
                    geolocation: {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    },
                  });
              });
            })
            .then(() => {
              this.renderMap();
            });

          this.renderMap();
        },
        (error) => {
          // eslint-disable-next-line
          console.log(error)
          this.renderMap();
        },
        {
          maximumAge: 1000 * 60 * 60,
          timeout: 3000,
        },
      );
    } else {
      this.renderMap();
    }
  },
  methods: {
    renderMap() {
      // eslint-disable-next-line
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: this.lat,
          lng: this.lng,
        },
        zoom: 15,
        maxZoom: 18,
        minZoom: 3,
        streetViewControl: false,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
          {
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#242f3e' }],
          },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }],
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }],
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }],
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }],
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
