<template>
  <div class="museum-listings">
    <h1 class="museum-listings__title">{{ pageName }}</h1>
    <ul class="museum-listings__list">
      <li
        v-for="(highlight, index) in displayedData"
        :key="index"
      >
        <museum-highlight
          :highlight="highlight"
          :extras="shallowRenderExtras"
        />
        <component
          :is="badgeComponent"
          class="museum-listings__badge"
        >
        </component>
      </li>
    </ul>
  </div>
</template>

<script>

import MuseumHighlight from "./MuseumHighlight.vue";
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: "MuseumListings",
  components: {
    MuseumHighlight
  },
  props: {
    pageName: {
      type: String,
      required: true
    },
    badgeComponent: {
      type: String,
      required: true
    },
    shallowRenderExtras: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      spaceHighlights: [
        {
          date: "2020-04-20 12:20:00",
          description: "Asteroids are minor planets, especially of the inner Solar System. Larger asteroids have also been called planetoids.",
          id: 1,
          image: "",
          name: "Asteroids"
        },
        {
          date: "2020-05-20 15:50:00",
          description: "A comet is an icy, small Solar System body that, when passing close to the Sun, warms and begins to release gases, a process called outgassing.",
          id: 9,
          image: "",
          name: "Comets"
        },
        {
          date: "2020-05-01 9:22:00",
          description: "The term planet is ancient, with ties to history, astrology, science, mythology, and religion.",
          id: 7,
          image: "",
          name: "Planets",
          news: {
            date: "2020-08-18 18:00:00",
            title: "Attend our talk about Jupiter with Dr. Hogarth"
          }
        },
        {
          date: "2020-07-05 4:10:00",
          description: "A meteor shower is a celestial event in which a number of meteors are observed to radiate, or originate, from one point in the night sky.",
          id: 12,
          image: "",
          name: "Meteor showers",
          news: {
            title: "The Lyrids will peak at on April 21-22 2021, at night"
          }
        },
        {
          date: "2020-07-05 4:10:00",
          description: "A meteor shower is a celestial event in which a number of meteors are observed to radiate, or originate, from one point in the night sky.",
          id: 12,
          image: "",
          name: "Meteor showers",
          news: [
            {
              title: "The Lyrids will peak at on April 21-22 2021, at night"
            },
            {
              date: "2020-08-18 18:00:00",
              title: "Attend our talk about Jupiter with Dr. Hogarth"
            }
          ],
          Species: "Dinosaur Dinosaurus",
          Location: "Africa"
        }
      ],
      spacePartners: {
        832: {
          date: "2020-06-01 11:45:00",
          description: "The Mauna Kea Observatories (MKO) are a number of independent astronomical research facilities and large telescope observatories that are located at the summit of Mauna Kea on the Big Island of Hawaiʻi, United States.",
          image: "",
          name: "Mauna Kea Observatories",
          news: [
            {
              title: "The Lyrids will peak at on April 21-22 2021, at night"
            },
            {
              date: "2020-08-18 18:00:00",
              title: "Attend our talk about Jupiter with Dr. Hogarth"
            }
          ]
        }
      },
      sortNewestFirst: true
    }
  },
  computed: {
    revivedAndMergedData() {
      // Don't know when data arrives so this goes in a proxy or promise
      const highlights = cloneDeep(this.spaceHighlights);
      for (const key in this.spacePartners) {
        const newHighlight = cloneDeep(this.spacePartners[key]);
        newHighlight.isFromPartner = true;
        highlights.push(newHighlight);
      }
      highlights.forEach((el, index) => {
        // I would prefer to do this in JSON.parse() after download
        const str = el.date.length === 18 ? "T0" : "T";
        // Convert from an ISO string
        highlights[index].date = new Date(el.date.replace(/\s/g, str));
      });
      return highlights;
    },
    displayedData() {
      const ord = this.sortNewestFirst ? -1 : 1;
      const compare = (a, b) => ord * (a.date.getTime() - b.date.getTime());
      const highlights = cloneDeep(this.revivedAndMergedData);
      highlights.sort(compare).forEach(el => {
        el.date = el.date.toLocaleString("en-GB", { dateStyle: "medium" });
      });
      return highlights;
    }
  }
}
</script>

<style lang="scss" scoped>
.museum-listings {
  max-width: 90%;
  margin: 50px auto 0;

  &__title {
    font-family: Avenir;
    font-size: 60px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 30px 0;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-auto-rows: 1fr;

    list-style: none;
    padding: 0;
    grid-gap: 50px;

    li {
      position: relative;
    }
  }

  &__badge {
    position: absolute;
    top: 0%;
    right: 0%;
    height: 100px;
    height: 100px;
    object-fit: contain;

    transform: translate3D(30%, -40%, 0);
  }
}
</style>
