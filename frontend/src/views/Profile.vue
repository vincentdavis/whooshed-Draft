<template>
    <div>
        <v-row class="ma-0 pa-0">
            <v-col cols="10" class="ma-0 pa-0">
                <v-tabs v-model="tab">
                    <v-tab v-for="item in tabs" :key="item">{{ item }}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <v-card class="pa-4">
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-avatar>
                                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                                    </v-avatar>

                                    <h4>Level <v-chip color="primary" small>1</v-chip></h4>
                                    <a href="#">Refresh profile</a>
                                    <p>Race Ranking<br>600.00 pts in 305;455th</p>
                                    <v-btn small color="primary" class="mb-2">Info</v-btn>
                                    <p>Category (Pace Group)<br>E 0 races</p>
                                    <v-btn small  color="primary" class="mb-2">Info</v-btn>
                                </v-col>
                                <v-col cols="12" sm="6">
                                
                                    <p>Points: <br>Country: <br>Team: <br>zFTP : ---  <br>Weight : 80kg<br>Age Under 23</p>
                                </v-col>

                            </v-row>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="ma-2">
                            <center>Under Development ...</center>
                        </div>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="ma-2">
                            <center>Under Development ...</center>
                        </div>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="ma-2">
                            <center>Under Development ...</center>
                        </div>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="ma-2">
                            <center>Under Development ...</center>
                        </div>
                    </v-tab-item>
                </v-tabs-items>

            </v-col>
        </v-row>


    </div>
</template>

<script>
export default {
    data: () => ({
        tab: null,
        tabs: ['<Profile name>', 'Signups', 'Power', 'Activities', 'Analysis (0)'],
        subTab: 0,
        subTabs: ['Nemesis', 'Victims', 'Common', 'Expand', '+Team'],
    }),
};
</script>

<style>
.v-application {
    font-family: 'Roboto', sans-serif;
}
</style>