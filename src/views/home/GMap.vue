<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>
<script>
export default {
  name: 'GMap',
  data() {
    return {
      lat: 54.703929,
      lng: 25.276668,
    };
  },
  mounted() {
    this.renderMap();
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
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false,
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
