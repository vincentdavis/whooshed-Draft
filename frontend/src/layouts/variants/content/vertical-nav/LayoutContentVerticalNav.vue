<template>
  <layout-content-vertical-nav :nav-menu-items="navMenuItems">
    <slot></slot>

    <!-- Slot: Navbar -->
    <template #navbar="{ isVerticalNavMenuActive, toggleVerticalNavMenuActive }">
      <div
        class="navbar-content-container"
        :class="{'expanded-search': shallShowFullSearch}"
      >
        <!-- Left Content: Search -->
        <div class="d-flex align-center">
          <v-icon
            v-if="$vuetify.breakpoint.mdAndDown"
            class="me-3"
            @click="toggleVerticalNavMenuActive"
          >
            {{ icons.mdiMenu }}
          </v-icon>
          <app-bar-search
            :shall-show-full-search.sync="shallShowFullSearch"
            :data="search_data"
            :filter="searchFilterFunc"
            :search-query.sync="appBarSearchQuery"
            @update:shallShowFullSearch="handleShallShowFullSearchUpdate(isVerticalNavMenuActive, toggleVerticalNavMenuActive)"
          ></app-bar-search>
        </div>

        <!-- Right Content: I18n, Light/Dark, Notification & User Dropdown -->
        <div class="d-flex align-center right-row">
          <!-- <app-bar-user-menu></app-bar-user-menu> -->
        </div>
      </div>
    </template>

    <!-- Slot: Footer -->
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
          href=""
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
  </layout-content-vertical-nav>
</template>

<script>
import LayoutContentVerticalNav from '@/@core/layouts/variants/content/vertical-nav/LayoutContentVerticalNav.vue'
import navMenuItems from '@/navigation/vertical'

// App Bar Components
import AppBarSearch from '@core/layouts/components/app-bar/AppBarSearch.vue'
import AppBarUserMenu from '@/components/AppBarUserMenu.vue'

import { mdiMenu, mdiHeartOutline, mdiFacebook , mdiEmail, mdiTwitter } from '@mdi/js'

import { getVuetify } from '@core/utils'

// Search Data
import appBarSearchData from '@/assets/app-bar-search-data'

import { ref, watch } from '@vue/composition-api'
import CycAxios from '@/plugins/axios.js'


export default {
  components: {
    LayoutContentVerticalNav,

    // App Bar Components
    AppBarSearch,
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
    const $vuetify = getVuetify()

    // Search
    const appBarSearchQuery = ref('')
    const shallShowFullSearch = ref(false)
    const maxItemsInGroup = 5
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

    // NOTE: Update search function according to your usage
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

    // ? Handles case where in <lg vertical nav menu is open and search is triggered using hotkey then searchbox is hidden behind vertical nav menu overlaty
    const handleShallShowFullSearchUpdate = (isVerticalNavMenuActive, toggleVerticalNavMenuActive) => {
      if ($vuetify.breakpoint.mdAndDown && isVerticalNavMenuActive) {
        toggleVerticalNavMenuActive()
      }
    }

    return {
      navMenuItems,
      handleShallShowFullSearchUpdate,

      // Search
      appBarSearchQuery,
      shallShowFullSearch,
      appBarSearchData,
      searchFilterFunc,

      icons: {
        mdiMenu,
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
.navbar-content-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  position: relative;
}

// ? Handle bg of autocomplete for blured appBar
.v-app-bar.bg-blur {
  .expanded-search {
    ::v-deep .app-bar-autocomplete-box div[role='combobox'] {
      background-color: transparent;
    }

    > .d-flex > button.v-icon {
      display: none;
    }

    // ===

    & > .right-row {
      visibility: hidden;
      opacity: 0;
    }

    ::v-deep .app-bar-search-toggler {
      visibility: hidden;
    }
  }
}
</style>
