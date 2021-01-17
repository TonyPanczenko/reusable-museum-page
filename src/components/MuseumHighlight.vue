<template>
  <article :class="articleClassObj">
    <h2 class="museum-highlight__title">{{ highlight.name }}</h2>
    <img
      :src="imageURL"
      :alt="`Highlight image for the subject of ${highlight.name}`"
      class="museum-highlight__image"
    >
    <p class="museum-highlight__date">{{ highlight.date }}</p>
    <p class="museum-highlight__desc">{{ highlight.description }}</p>
    <ul
      v-if="extras && extraInfoList.length"
      class="museum-highlight__extras"
    >
      <li
        v-for="key in extraInfoList"
        :key="key"
      >
        <h3>{{ key }}</h3>
        <p>{{ highlight[key] }}</p>
      </li>
    </ul>
    <ul v-if="highlight.news" :class="newsClassObj">
      <li v-for="(news, index) in displayedNewsArr" :key="index">
        <p>{{ news.date }}</p>
        <p>{{ news.title }}</p>
      </li>
    </ul>
  </article>
</template>

<script>

import cloneDeep from 'lodash/cloneDeep';

export default {
  name: "MuseumHighlight",
  props: {
    highlight: Object,
    extras: Boolean
  },
  data () {
    return {
      templatedInfoList: ["date", "description", "id", "image", "name", "news", "isFromPartner"],
      defaultImgURL: "https://cdn.pixabay.com/photo/2018/08/15/11/57/galaxy-3607885__340.jpg"
    }
  },
  computed: {
    extraInfoList() {
      // This "smart" component will try to shallow-render extra info that hasn't been templated
      return Object.keys(this.highlight)
        .filter(key => !this.templatedInfoList.includes(key));
    },
    imageURL() {
      return this.highlight.image === "" ? this.defaultImgURL : this.highlight.image;
    },
    newsArr() {
      // More than one news possible?
      if (Array.isArray(this.highlight.news)) {
        return this.highlight.news;
      } else if (typeof this.highlight.news === "object") {
        return [this.highlight.news];
      } else {
        return null;
      }
    },
    displayedNewsArr() {
      const displayedNewsArr = cloneDeep(this.newsArr);
      displayedNewsArr.forEach(el => {
        if (el.date) {
          const str = el.date.length === 18 ? "T0" : "T";
          el.date = new Date(el.date.replace(/\s/g, str));
          el.date = el.date.toLocaleString("en-GB", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          });
        }
      });
      return displayedNewsArr;
    },
    articleClassObj() {
      return [this.highlight.isFromPartner ? "museum-highlight--partner" : "museum-highlight"];
    },
    newsClassObj() {
      return [this.highlight.isFromPartner ? "museum-highlight__news--partner" : "museum-highlight__news"];
    }
  }
}
</script>

<style lang="scss" scoped>
$article-color-accent--museum:          rgba(71, 2, 158, 0.8);
$article-color-accent--partner:         rgb(75, 185, 246);

.museum-highlight {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  padding-bottom: 50px;
  border: 2px solid #ccc;
  box-shadow: 0 7px 30px -10px rgba(150,170,180,0.7);
  border-bottom: 6px solid $article-color-accent--museum;

  &__image {
    order: -1;
    object-fit: cover;

    margin: -2px;
  }

  &__date, &__desc, &__extras {
    margin: 20px 25px 0;
  }

  &__title {
    position: absolute;
    top: 280px;
    width: calc(100% + 4px);

    margin: 0 -2px;
    padding: 10px 25px;
    background-color: rgba(#fff, 0.4);
  }

  &__date {
    position: absolute;
    bottom: 10px;
    right: 0px;

    color: #888;
  }

  &__desc {
    font-size: 20px;
    padding-bottom: 25px;
    border-bottom: 1px solid #ccc;
  }

  &__extras {
    list-style: none;
    padding: 0;

    li, h3, p, span {
      margin: 5px 10px 5px 0px;
      font-size: 16px;
    }

    h3, p {
      display: inline;
    }
  }

  &__news {
    list-style: none;
    padding: 0;
    margin-top: 10px;

    li {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
    }

    p {
      margin: 8px 23px 0px 0px;
      padding: 5px;
    }

    p:first-child {
      padding-left: 27px;
      margin-left: -2px;

      background-color: $article-color-accent--museum;
      color: #fff;
    }

    &--partner {
      @extend .museum-highlight__news;

      p:first-child {
        background-color: $article-color-accent--partner;
      }
    }
  }

  &--partner {
    @extend .museum-highlight;

    border-bottom: 5px solid $article-color-accent--partner;
  }
}



</style>
