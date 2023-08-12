<template>
  <ais-instant-search index-name="mk95" v-bind:search-client="searchClient">
    <ais-search-box />
    <ais-autocomplete>
      <template v-slot="{ currentRefinement, indices, refine }">
        <ul v-if="currentRefinement" v-for="index in indices" :key="index.indexId">
          <li>
            <h3>{{ index.indexName }}</h3>
            <ul>
              <li v-for="hit in index.hits" :key="hit.objectID">
                <ais-highlight attribute="title" :hit="hit" />
                <button
                  type="button"
                  @click="index.sendEvent('click', hit, 'Item Added')"
                >
                  Add to cart
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </template>
    </ais-autocomplete>
    <ais-hits
      :class-names="{
        'ais-Hits-list': 'hit-list',
      }"
    >
      <template v-slot:item="{ item }">
        <div>
          <ais-highlight attribute="title" :hit="item" highlightedTagName="mark" />
          <!-- <ais-highlight attribute="content" :hit="item" /> -->
        </div>
      </template>
    </ais-hits>
    <ais-powered-by />
  </ais-instant-search>
</template>
<script setup>
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/algolia-min.css";

const searchClient = algoliasearch("123W7B7ID7", "c7f206e03d73e858715b9188ae6c93a1");
</script>
<style lang="scss" src="./style.scss"></style>
