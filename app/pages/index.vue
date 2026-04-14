<template>
  <Hero
    :background-image="heroImage"
    title="CODE : RED"
    subtitle="Newquay's No1 Drum & Bass Nights"
  />
  <div class="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
    <PageTitle title="Welcome to Code Red" />
  </div>
  <NextEvent :title="nextEventTitle" :paragraphs="nextEventParagraphs" />
</template>

<script setup lang="ts">
useHead({ title: "Home" });

const heroImage =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80";

const nextEventTitle = "Next Event";

const nextEventParagraphs = [
  "Welcome to Code Red, Newquay's No1 Drum & Bass Nights. We're a community-driven event that celebrates the best in Drum & Bass music.",
  "We're a community-driven event that celebrates the best in Drum & Bass music.",
  "We're a community-driven event that celebrates the best in Drum & Bass music.",
];

</script>
