import { mdiFileOutline, mdiHomeOutline, mdiClipboardCheck } from '@mdi/js'

export default [
  {
    title: 'Profile',
    icon: mdiHomeOutline,
    to: 'home',
  },
  {
    title: 'Friends',
    icon: mdiHomeOutline,
    to: 'home',
  },
  {
    title: 'Teams',
    icon: mdiHomeOutline,
    to: 'home',
  },
  {
    title: 'Leagues',
    icon: mdiHomeOutline,
    to: 'home',
  },
  {
    title: 'Series',
    icon: mdiHomeOutline,
    to: 'home',
  },
  {
    title: 'Segments',
    icon: mdiHomeOutline,
    to: 'home',
  },
  
  {
    title: 'Rankings',
    icon: '',
    to: 'results',
    children: [
      { title: "Road", to: "Road" },
    ]
  },
  {
    title: 'Forum',
    icon: mdiHomeOutline,
    to: 'home',
  },
]
