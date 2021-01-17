// jshint esversion: 6

import { createApp } from "vue";
import App from "./App.vue";
import MuseumListings from "./components/MuseumListings.vue";
import SpaceBadge from "./components/SpaceBadge.vue";

const app = createApp(App);
app.component("museum-listings", MuseumListings);
app.component("space-badge", SpaceBadge);

app.mount("#app");
