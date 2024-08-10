<script lang="ts" setup>
import { ideas } from "@/types/ideas";

defineProps<{ item: ideas }>();
</script>

<template>
  <div class="flex flex-col rounded-lg shadow-md h-full cursor-pointer">
    <div class="w-full">
      <img :src="item.image" loading="lazy" class="rounded-t-lg w-full" alt="..." />
    </div>
    <div class="flex flex-col px-6 py-6">
      <span class="font-sans text-gray-500">{{ item.date }}</span>
      <h1 class="font-semibold text-xl line-clamp-3">{{ item.title }}</h1>
    </div>
  </div>
</template>
