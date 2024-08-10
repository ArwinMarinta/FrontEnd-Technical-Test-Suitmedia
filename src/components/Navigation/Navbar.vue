<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import Logo from "../../assets/suitmedia-logo.png";
import { Header } from "../../data/header";
import { useRoute } from "vue-router";
import HamburgerIcon from "../../assets/hamburger.svg";

const router = useRoute();

const showHeader = ref<boolean>(true);
const lastScrollPosition = ref<number>(0);

const openSidebar = ref<boolean>(false);

const handleScroll = () => {
  const currentScrollPosition = window.scrollY;
  if (currentScrollPosition > lastScrollPosition.value) {
    showHeader.value = false;
    openSidebar.value = false; // Scroll ke bawah, sembunyikan header
  } else {
    showHeader.value = true; // Scroll ke atas, tampilkan header
    openSidebar.value = false;
  }
  lastScrollPosition.value = currentScrollPosition;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const toggleSidebar = () => {
  openSidebar.value = !openSidebar.value;
};
</script>

<template>
  <main
    :class="[
      'w-full fixed top-0 z-[99999] flex justify-center py-4 bg-orange transition-transform duration-300 ease-in-out',
      showHeader ? ' bg-orange ' : '-translate-y-full',
    ]"
  >
    <div class="container flex flex-row justify-between">
      <div class="w-full">
        <RouterLink to="/"> <img :src="Logo" alt="suitmedia" class="h-10" /></RouterLink>

        <!-- <h1 class="text-white font-bold text-4xl">SUITMEDIA</h1> -->
      </div>
      <div></div>
      <div class="hidden md:flex flex-row items-center gap-4 w-full justify-end">
        <div v-for="(item, index) in Header" :key="index">
          <RouterLink
            :to="item.url"
            :class="[
              `font-medium text-white text-base`,
              { 'underline underline-offset-8 decoration-4': item.url === router.path },
            ]"
            >{{ item.name }}</RouterLink
          >
        </div>
      </div>
      <div class="md:hidden flex justify-center items-center">
        <button @click="toggleSidebar" class="flex justify-center items-center">
          <img :src="HamburgerIcon" />
        </button>
      </div>
      <!-- Sidebar -->
      <div
        :class="[
          'lg:hidden w-full h-full bg-orange opacity-95 fixed right-0 left-0 top-0  bg-DARK03 z-[99999]  px-8 py-3 shadow-md transition-transform duration-300 ease-in-out',
          openSidebar ? ' transform translate-x-0' : '  transform translate-x-full',
        ]"
      >
        <div class="flex flex-col h-full">
          <div
            class="flex flex-row justify-between items-center text-white font-bold text-xl"
          >
            <span>Suitmedia</span>
            <button @click="toggleSidebar">
              <img :src="HamburgerIcon" alt="close" class="text-3xl font-bold" />
            </button>
          </div>
          <div class="flex flex-col mt-6 gap-5 justify-center items-center">
            <div v-for="(item, index) in Header" :key="index">
              <RouterLink
                :to="item.url"
                :class="[
                  `font-medium text-white text-base`,
                  {
                    'underline underline-offset-8 decoration-4': item.url === router.path,
                  },
                ]"
                >{{ item.name }}</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
