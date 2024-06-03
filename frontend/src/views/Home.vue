<template>
     <div>
      <v-row class="ma-0 pa-0">
        <v-col class="ma-0 pa-0">
          <v-card rounded elevation="0">
            <v-tabs  v-model="tab" >
            <v-tab v-for="item in tabs" :key="item">{{ item }}</v-tab>
          </v-tabs>
          </v-card>
        </v-col>
        <v-col  class="text-left ma-0 pa-0 mr-4">
          <v-select  rounded dense
          width="50px"
            v-model="timezone"
            :items="timezones"
            label="Timezone"
          ></v-select>
        </v-col>
      </v-row>
      <!-- <v-text-field v-model="search" label="Search" class="mt-3"></v-text-field> -->
      <v-data-table
        :headers="headers"
        :items="events"
        class="mt-3"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn color="primary" :to="{name: 'results'}" dense small> View Result</v-btn>
        </template>
      </v-data-table>
     </div>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    tabs: ['Events', 'History', 'Riders', 'Help', 'FAQ'],
    timezone: 'America/North Dakota/Center',
    timezones: ['America/North Dakota/Center', 'Europe/London', 'Asia/Tokyo'],
    search: '',
    headers: [
      { text: 'Time', value: 'time' },
      { text: 'Event', value: 'event' },
      { text: 'Participants', value: 'participants' },
      { text: 'Route', value: 'route' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    events: [
      { time: '21:45', event: 'Sunday Race Club - Women Qualifier Race 1', participants: 77, route: 'Beach Island Loop' },
      { time: '23:40', event: 'Sunday Race Club - Men Qualifier Race 1', participants: 18, route: 'The Big Ring' },
    ],
  }),
  methods: {
    viewDetails(item) {
      console.log('View details for', item);
    },
  },
};
</script>

<style>
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>
