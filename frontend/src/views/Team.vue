<template>
    <v-container>
      <v-card outlined>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="myTeams"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>My Teams</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:no-data>
          <v-alert color="error" icon="mdi-alert">
            No data available in table
          </v-alert>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  export default {
    data: () => ({
      search: '',
      headers: [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Tag', value: 'tag' },
        { text: 'Riders', value: 'riders' },
        { text: 'Efforts', value: 'efforts' },
        { text: 'Owner', value: 'owner.name' },
        { text: 'Contact', value: 'contact', sortable: false }
      ],
      myTeams: [
        { name: 'DIRT', tag: 'DIRT', riders: 6074, efforts: 11663, owner: { name: 'Jason Sterny (DIRT OG)' }, contact: 'https://www.facebook.com/groups/ZWIFTDIRT' },
        { name: 'ZTPL Cycling Club', tag: 'ZTPL.CC', riders: 3972, efforts: 56509, owner: { name: 'Jacek Tarach' }, contact: 'https://www.facebook.com/ZwiftPolska' },
        { name: 'Team Italy', tag: 'Team Italy', riders: 3714, efforts: 32210, owner: { name: 'Andrea Anastasio [ITA]' }, contact: 'https://linktr.ee/TeamItalyECT' }
      ],
    }),
  }
  </script>
  
  <style>
  .orange.lighten-1 {
    background-color: #fb8c00 !important;
  }
  </style>