<script lang="ts" setup>
import axios from "axios";
import Banner from "../../assets/banner.png";
import { ref } from "vue";
import CardIdeas from "../../components/Card/card-ideas.vue";
import { onMounted, watch } from "vue";
import { FwbPagination } from "flowbite-vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const page = ref<number>(10);
const sort = ref<string>("published_at");
const currentPage = ref<number>(1);
const totalPage = ref<number>(5);

const ideas = ref<any[]>([]);

const fetchIdeas = async () => {
  try {
    const response = await axios.get(
      `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${currentPage.value}&page[size]=${page.value}&append[]=small_image&append[]=medium_image&sort=${sort.value}`
    );
    ideas.value = response.data.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

const queryParams = () => {
  router.push({
    path: "/ideas",
    query: {
      "page[number]": currentPage.value,
      "page[size]": page.value,
      "append[]": ["small_image", "medium_image"],
      sort: sort.value,
    },
  });
};

const totalPages = (page: number) => {
  if (page === 10 || page === 20 || page === 50) {
    totalPage.value = Math.ceil(274 / page);
  }
};

onMounted(() => {
  fetchIdeas();
  const query = route.query;
  if (query["page[number]"]) currentPage.value = Number(query["page[number]"]);
  if (query["page[size]"]) page.value = Number(query["page[size]"]);
  if (query.sort) sort.value = String(query.sort);
});

watch([page, sort, currentPage], () => {
  queryParams();
  fetchIdeas();
  totalPages(page.value);
});
</script>

<template>
  <main class="flex justify-center items-center w-full flex-col">
    <section class="relative w-full mt-16 lg:mt-0">
      <div>
        <img :src="Banner" loading="lazy" alt="banner" class="w-full h-full" />
      </div>
      <div class="absolute inset-0 z-30 text-white flex justify-center">
        <div
          class="container flex flex-col h-full justify-center items-center inset-0 z-10"
        >
          <h1 class="font-normal lg:text-8xl md:text-6xl text-3xl">Ideas</h1>
          <span class="font-normal md:text-lg text-sm"
            >Where all our greet things begin</span
          >
        </div>
      </div>

      <div
        class="absolute sm:hidden bottom-0 right-0 bg-white h-32 w-full"
        style="clip-path: polygon(50% 100%, 100% 100%, 300% 0, 0% 100%)"
      ></div>
      <div
        class="absolute hidden sm:block lg:hidden bottom-0 right-0 bg-white h-32 w-full"
        style="clip-path: polygon(50% 100%, 100% 100%, 200% 0, 0% 100%)"
      ></div>
      <div
        class="absolute hidden xl:block bottom-0 right-0 left-0 bg-white h-36 w-full"
        style="clip-path: polygon(50% 100%, 100% 100%, 100% 0, 0% 100%)"
      ></div>
    </section>
    <section class="container flex flex-col font-sans py-8">
      <div class="flex lg:flex-row flex-col justify-between items-center font-medium">
        <div class="w-full text-center lg:text-start">
          <span>Showing 1 - {{ page }} of 100</span>
        </div>
        <div
          class="flex sm:flex-row flex-col gap-6 justify-center items-center lg:justify-end w-full mt-6 lg:mt-0"
        >
          <div class="flex flex-row items-center">
            <label class="">Show per page:</label>
            <form class="ml-2">
              <select
                v-model="page"
                id="page"
                class="bg-gray-50 border w-24 border-gray-300 text-gray-900 text-sm rounded-full focus:ring-orange focus:border-orange block py-2 px-3"
              >
                <option :value="page" hidden>{{ page }}</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </form>
          </div>
          <div class="flex flex-row items-center">
            <label>Sort by: </label>
            <form class="ml-2">
              <select
                v-model="sort"
                id="sort"
                class="bg-gray-50 border w-28 border-gray-300 text-gray-900 text-sm rounded-full focus:ring-orange focus:border-orange block py-2 px-3"
              >
                <option :value="sort" hidden>
                  {{ sort === "published_at" ? "Newest" : "longest" }}
                </option>
                <option value="published_at">Newest</option>
                <option value="-published_at">longest</option>
              </select>
            </form>
          </div>
        </div>
      </div>
      <div
        class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 py-10"
      >
        <div v-for="(item, index) in ideas" :key="index">
          <CardIdeas :item="item" />
        </div>
      </div>
    </section>
    <section class="pb-14">
      <fwb-pagination
        v-model="currentPage"
        :total-pages="totalPage"
        previous-label="<<"
        next-label=">>"
      ></fwb-pagination>
    </section>
  </main>
</template>
