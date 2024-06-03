<template>
  <v-container>

    <!-- Tabs for different sections -->
    <v-tabs vertical>
      <v-tab>Results</v-tab>
      <v-tab>Unfiltered</v-tab>
      <v-tab>Sprints & KOMs</v-tab>
      <v-tab>Primes</v-tab>
      <v-tab>Power Curve</v-tab>
      <v-tab>LIVE</v-tab>

      <v-tab-item>
        <!-- Results Section -->
        <v-card flat>
          <v-card-title>Sunday Race Club - Women Qualifier Race 1</v-card-title>
          <v-card-text>
            <div>2024-06-02 13:40 GST | Elevation: 492 |  Distance: 45 KM</div>
          </v-card-text>

          <v-data-table :headers="headers" :items="results" class="elevation-1" :search="search">
            <template v-slot:top>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </template>
            <template v-slot:item.rank="{ item }">
              <span :class="getRankClass(item.rank)">{{ item.rank }}</span>
            </template>
            <template v-slot:no-data>
              <v-alert  icon="mdi-alert">
                No data available
              </v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
// Import chart component based on what you decide to use
import ApexChart from 'vue-apexcharts'

export default {
  components: {
    ApexChart
  },
  data: () => ({
    search: '',
    headers: [
      { text: 'Rank', value: 'rank' },
      { text: 'Rider', value: 'rider' },
      { text: 'Time', value: 'time' },
      { text: 'Team', value: 'team' },
      { text: 'Finish at', value: 'finish' },
      // Add other headers as needed
    ],
    results: [
      // Populate with your data
      {rank:'1',  rider: 'Michał Kamiński', time: '01:03:58.516', team: 'COALITION ALFAJOR	', finish: '+00:00:00.000'},
      {rank:'2', rider: 'Mickael Plantureux', time: '01:04:08.311', team: 'Individual	', finish: '+00:00:09.795'},
      {rank:'3', rider: 'Zach Nehr	', time: '01:04:14.078', team: 'Individual	', finish: '+00:00:15.562'},
    ],
  }),
  methods: {
    getRankClass(rank) {
      if (rank === '1') return 'rank-first';
      else if (rank === '2') return 'rank-second';
      else if (rank === '3') return 'rank-third';
      return 'rank-other'; // For ranks other than 1, 2, 3
    }
  }
}
</script>

<style scoped>
.blue-grey.darken-1 {
  background-color: #546e7a !important;
}
.rank-first {
  color: gold;
  font-size: 24px;
  font-weight: bold;
}

.rank-second {
  color: silver;
  font-size: 22px;
  font-weight: bold;
}

.rank-third {
  color: #cd7f32; /* Bronze color */
  font-size: 20px;
  font-weight: bold;
}

.rank-other {
  color: black;
  font-size: 18px; /* Normal font size for other ranks */
}

</style>