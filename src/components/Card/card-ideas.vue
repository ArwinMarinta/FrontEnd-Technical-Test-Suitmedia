<script lang="ts" setup>
// import { ideas } from "@/types/ideas";
import Image from "../../assets/card2.webp";
import { formatDate } from "../../utils/format";
import { ref } from "vue";

const props = defineProps<{ item: any }>();

const imageUrl = ref(props.item.small_image[0]?.url || Image);

const handleImageError = () => {
  imageUrl.value = Image;
};
</script>

<template>
  <div class="flex flex-col rounded-lg shadow-md h-full cursor-pointer">
    <div class="w-full">
      <img
        :src="imageUrl"
        @error="handleImageError"
        loading="lazy"
        class="rounded-t-lg w-full"
        alt="..."
      />
    </div>

    <div class="flex flex-col px-6 py-6">
      <span class="font-sans text-gray-500">{{ formatDate(item.created_at) }}</span>
      <h1 class="font-semibold text-xl line-clamp-3 text-pretty">{{ item.title }}</h1>
    </div>
  </div>
</template>
