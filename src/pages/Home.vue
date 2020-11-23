<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title color="light">Listado de Películas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <Table />
    </ion-content>
    <ion-footer>
      <ion-toolbar class="ion-text-center" color="primary">
        <ion-button fill="clear" color="light" @click="seeRepository">
          Repositorio
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Table from '@/components/Table.vue';

@Component({
  components: {
    Table,
  },
})
export default class Home extends Vue {
  private seeRepository() {
    window.location.href = 'https://github.com/jjlmoya/it-vue-ionic-fit';
  }
}
</script>