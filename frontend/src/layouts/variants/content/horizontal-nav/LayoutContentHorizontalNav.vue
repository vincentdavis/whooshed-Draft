<template>
  <layout-content-horizontal-nav :nav-menu-items="navMenuItems">
    <!-- Default Slot -->
    <slot></slot>

    <!-- Navbar -->
    <template #navbar>
      <div
        class="navbar-content-container"
        :class="{'expanded-search': shallShowFullSearch}"
      >
        <!-- Left Content: Search -->
        <div class="d-flex align-center">
          <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.mdAndDown"
          ></v-app-bar-nav-icon>
          <router-link
            to="/"
            class="d-flex align-center text-decoration-none"
          >
            <v-img
              :src="appLogo"
              max-height="100px"
              max-width="110px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>
            
          </router-link>
        </div>

        <!-- Right Content: I18n, Light/Dark, Notification & User Dropdown -->
        <div class="d-flex align-center">
          <app-bar-search
            :shall-show-full-search.sync="shallShowFullSearch"
            :data="search_data"
            :filter="searchFilterFunc"
            :search-query.sync="appBarSearchQuery"
            class="me-4"
          ></app-bar-search>
          <app-bar-theme-switcher></app-bar-theme-switcher>
          <!-- <app-bar-user-menu class="ms-2"></app-bar-user-menu> -->
        </div>
      </div>
      <v-overlay
        :value="$store.state.app.shallContentShowOverlay"
        z-index="5"
        absolute
        class="system-bar-overlay"
      ></v-overlay>
    </template>

    <!-- Slot: footer -->
    <template #footer>
      <div class="d-flex justify-space-between">
        <span>COPYRIGHT &copy; {{ new Date().getFullYear() }} MyWoosh, All rights Reserved</span>
        <div class="d-flex align-center">
          <span>Get connected with us on social networks!</span>
          
          <a href="mailto:" class="text-decoration-none"
          ><v-icon small color="primary" class="ml-5">{{icons.mdiEmail}}</v-icon></a
        >
        <a
          target="__blank__"
          href="/"
          class="text-decoration-none"
          ><v-icon small color="primary" class="ml-5">{{icons.mdiFacebook}}</v-icon></a
        >
        <a
          target="__blank__"
          href=""
          class="text-decoration-none"
          ><v-icon small color="primary" class="ml-5">{{icons.mdiTwitter}}</v-icon></a
        >
        </div>
      </div>
    </template>

    <!-- App Content -->
    <template #v-app-content>
      <app-customizer class="d-none d-md-block"></app-customizer>
    </template>
  </layout-content-horizontal-nav>
</template>

<script>
import LayoutContentHorizontalNav from '@core/layouts/variants/content/horizontal-nav/LayoutContentHorizontalNav.vue'
import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
import navMenuItems from '@/navigation/horizontal'

// App Bar Components
import AppBarSearch from '@core/layouts/components/app-bar/AppBarSearch.vue'
import AppBarThemeSwitcher from '@core/layouts/components/app-bar/AppBarThemeSwitcher.vue'
import AppBarUserMenu from '@/components/AppBarUserMenu.vue'

// Search Data
import appBarSearchData from '@/assets/app-bar-search-data'

import { ref, watch } from '@vue/composition-api'

import themeConfig from '@themeConfig'
import { mdiHeartOutline, mdiFacebook , mdiEmail, mdiTwitter} from '@mdi/js'
import CycAxios from '@/plugins/axios.js'

export default {
  components: {
    LayoutContentHorizontalNav,
    AppCustomizer,

    // App Bar Components
    AppBarSearch,
    AppBarThemeSwitcher,
    AppBarUserMenu,
  },
  data(){
    return{
      search_data : [
        { header: 'Pages' },
        { title: "Road",icon: '', to: "Road" },
        { title: "Road Cup",icon: '', to: "RoadCup" },
        { title: "Road Cup Team",icon: '', to: "RoadCupTeam" },
        { title: "Cross",icon: '', to: "Cross" },
        { title: "Cross Individual Cup",icon: '', to: "CrossCup" },
        { title: "Cross Team Cup",icon: '', to: "CrossCupTeam" },
        { title: "Track Omnium",icon: '', to: "Track" },
        { title: "Result By Rider",icon: '', to: "ResultByRider" },
        { title: "MTB",icon: '', to: "MTB" },
        
      ]
    }
  },
  mounted(){
    this.get_search_result()
  },
  methods:{
    get_search_result() {
      CycAxios.get('/AcaEventNoPage/?fields=name,id,eventdatetime')
        .then(data => {
          for (var result of data.data){
            this.search_data.push({ title: result.name,icon: '', to: {name:"Road", query: { year: new Date(result.eventdatetime).getFullYear(), event: result.id }} })
          }
        })
        .catch(err => {
        })
    },
  },
  setup() {
    // Search
    const appBarSearchQuery = ref('')
    const shallShowFullSearch = ref(false)
    const maxItemsInGroup = 5
    const results = ref([])
    const totalItemsInGroup = ref({
      pages: 0,
      files: 0,
      contacts: 0,
    })
    watch(appBarSearchQuery, () => {
      totalItemsInGroup.value = {
        pages: 0,
        files: 0,
        contacts: 0,
      }
    })

    const searchFilterFunc = (item, queryText, itemText) => {
      if (item.header || item.divider) return true

      const itemGroup = (() => {
        if (item.to !== undefined) return 'pages'
        if (item.size !== undefined) return 'files'
        if (item.email !== undefined) return 'contacts'

        return null
      })()

      const isMatched = itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1

      if (isMatched) {
        if (itemGroup === 'pages') totalItemsInGroup.value.pages += 1
        else if (itemGroup === 'files') totalItemsInGroup.value.files += 1
        else if (itemGroup === 'contacts') totalItemsInGroup.value.contacts += 1
      }

      return appBarSearchQuery.value && isMatched && totalItemsInGroup.value[itemGroup] <= maxItemsInGroup
    }

    return {
      navMenuItems,

      // Search
      appBarSearchQuery,
      shallShowFullSearch,
      appBarSearchData,
      searchFilterFunc,

      // App Config
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,

      // Icons
      icons: {
        mdiHeartOutline,
        mdiFacebook,
        mdiEmail,
        mdiTwitter
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.navbar-content-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  position: relative;
}
</style>
