import { mdiFileOutline, mdiHomeOutline } from '@mdi/js'

export default [
  {
    title: 'Home',
    icon: mdiHomeOutline,
    to: 'home',
  },
  {
    title: 'Road',
    icon: '',
    to: 'race-road-page',
    children: [
      { title: "Road", url: "/Road" },
      { title: "Road Cup", url: "/RoadCup" },
      { title: "Road Cup Team", url: "/RoadCupTeam" },
    ]
  },
  {
    title: 'Cross',
    icon: '',
    to: 'race-cross-page',
    children: [

      { title: "Cross", url: "/Cross" },
      { title: "Cross Individual Cup", url: "/CrossCup" },
      { title: "Cross Team Cup", url: "/CrossCupTeam" },

    ]
  },
  {
    title: 'Track',
    icon: '',
    to: 'race-track-page',
    children: [

      { title: "Track Omnium", url: "/Track" },

    ]
  },
  {
    title: 'Result By Rider',
    icon: '',
    to: 'race-result-by-rider-page',
    children: [

      { title: "Result By Rider", url: "/ResultByRider" },
    ]
  },
  {
    title: 'MTB',
    icon: '',
    to: 'race-mtb-page',
    children: [

      { title: "MTB", url: "/MTB" },
    ]
  },
]
