import CycAxios from '@/plugins/axios.js'
import get_years from '@/data/get_years.json'
import eventData from '@/data/aca_event.json'; // Assuming you've stored the JSON data in a file named 'events.json'
import aca_resultset from '@/data/aca_resultset.json'; // Assuming you've stored the JSON data in a file named 'events.json'
import aca_result from '@/data/aca_result.json'; // Assuming you've stored the JSON data in a file named 'events.json'
import aca_user from '@/data/aca_user.json'; // Assuming you've stored the JSON data in a file named 'user.json'

export const helpermixin = {
  data() {
    return {
      Years: [],
      SelectedYear: null,
      Events: [],
      EventLoader: false,
      EventSelected: null,
      EventResult: [],
      EventResultLoader: false,
      GroupSelcted: null,
      Groups: [],
      GroupLoader: false,
      summaryBy: 0,
      pagination_results: {},
      headers: [
        { text: "CATEGORY", value: "eventracegroupid.abbreviation" },
        { text: "STARTERS	", value: "STARTERS" },
        { text: "FINISHERS", value: "FINISHERS" },
        { text: "Details", value: "DEtails" },
      ],
      RaceByCate: [
        { text: "CATEGORY", value: "eventracegroupid.abbreviation" },
        { text: "STARTERS	", value: "STARTERS	" },
        { text: "FINISHERS", value: "FINISHERS" },
        { text: "Details", value: "DEtails" },

      ],
      RaceByCateWithGroup: [
        { text: "Place", value: "place" },
        { text: "TIME", value: "time" },
        { text: "CATEGORY", value: "eventracegroupid.mincategory" },
        { text: "FIRST NAME", value: "racerid.firstname" },
        { text: "Last NAME", value: "racerid.lastname" },
        // { text: "TEAM", value: "" },
        { text: "CITY", value: "racerid.city" },
        // { text: "DETAILS", value: "" },

      ],
      RaceByCity: [
        { text: "Home City", value: "CATEGORY" },
        { text: "FINISHERS	", value: "STARTERS	" },
      ],
      RaceByTeam: [
        { text: "TEAM", value: "CATEGORY" },
        { text: "FINISHERS", value: "STARTERS" },
      ],
      ResultSearch: "",
    };
  },

  watch: {
    summaryBy(value) {
      value;
      this.getHeaders();
    },
    // EventSelected(value) {

    //   this.GroupLoader = true;
    //   CycAxios.get(`/AcaEvent/${value}/get_groups/?fields=id,name,starters`).then(
    //     (data) => {
    //         this.GroupSelcted = 0
    //       this.GroupLoader = false;
    //       this.Groups = data.data;
    //       this.Groups.push({ name: "Event Summary", id: -1 });
    //       this.GroupSelcted = -1;
    //       this.EventResult = [];
    //       this.EventResult = { results: this.Groups };
    //     }
    //   );
    // },
    EventSelected(value) {
      this.GroupLoader = true;
      // Filter result sets based on the selected event ID
      this.Groups = aca_resultset.aca_resultset.filter(resultSet => resultSet.eventId === value);
      // Add "Event Summary" option
      this.Groups.push({ name: "Event Summary", id: -1 });
      this.GroupLoader = false;
      this.GroupSelcted = -1;
      this.EventResult = { results: this.Groups };
    },
    // GroupSelcted(value) {

    //   this.EventResult = [];
    //   if (value == -1) {
    //     console.log(value);
    //     this.EventResult = { results: this.Groups };
    //     this.headers = [
    //       { text: "CATEGORY", value: "name" },
    //       { text: "STARTERS	", value: "starters" },
    //       { text: "FINISHERS", value: "starters" },
    //     ];
    //   }
    //   else{
    //     this.EventResultLoader = true;
    //     CycAxios.get("/AcaResultNoPage/?resultsetid="+value).then(
    //         (data) => {
    //           this.EventResultLoader = false;
    //           this.EventResult = {results: data.data};
    //           this.headers= this.RaceByCateWithGroup
    //         }
    //       );  
    //   }
    // },
    GroupSelcted(value) {
      this.EventResult = [];
      if (value == -1) {
        console.log(value);
        this.EventResult = { results: this.Groups };
        this.headers = [
          { text: "CATEGORY", value: "name" },
          { text: "STARTERS", value: "starters" },
          { text: "FINISHERS", value: "starters" },
        ];
      } else {
        const filteredResults = aca_result.aca_result.filter(result => result.resultSetId === value);
        this.EventResult = { results: this.mapUserDetails(filteredResults) };
        this.headers = [
          { text: "Place", value: "rsPlace" },
          { text: "TIME", value: "time" },
          { text: "CATEGORY", value: "eventRaceGroupId" },
          { text: "FIRST NAME", value: "firstName" },
          { text: "Last NAME", value: "lastName" },
          { text: "CITY", value: "city" },
        ];
      }
    },


    // Other methods...

    // SelectedYear(value) {
    //   this.EventLoader = true;
    //   CycAxios.get("/AcaEventNoPage/?eventdatetime__year=" + value+"&fields=id,name,eventdatetime_format,eventcity").then(
    //     (data) => {
    //       this.EventLoader = false;
    //       this.Events = data.data;
    //     }
    //   );
    // },
    SelectedYear(value) {
      // Filter events based on the selected year
      this.EventLoader = true;
      this.Events = eventData.aca_event.filter(event => {
        const eventYear = new Date(event.eventdatetime).getFullYear();
        return eventYear.toString() === value.toString();
      });
      this.EventLoader = false;
    },
  },
  methods: {
    mapUserDetails(results) {
      return results.map(result => {
        const user = aca_user.aca_user.find(u => u.id === result.racerId);
        return {
          ...result,
          firstName: user ? user.firstName : "",
          lastName: user ? user.lastName : "",
          city: user ? user.city : "",
        };
      });
    },
    getHeaders() {
      if (this.summaryBy == 0) {
        this.headers = this.RaceByCate;
      } else if (this.summaryBy == 1) {
        this.headers = this.RaceByCity;
      } else if (this.summaryBy == 2) {
        this.headers = this.RaceByTeam;
      }
    },
    getYear() {
      this.Years = get_years;
      // CycAxios.get("/AcaEvent/get_years/").then((data) => {
      //   this.Years = data.data;
      // });
    },
  },
};
