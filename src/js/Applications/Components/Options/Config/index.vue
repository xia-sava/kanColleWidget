<template>
  <div class="columns">
    <switch-config v-if="config.type == 'switch'" v-bind:config="config" />
    <select-config v-else-if="config.type == 'select'" v-bind:config="config" />
    <number-config v-else-if="config.type == 'number'" :config="config" />
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

import SwitchConfig from "./switch-config.vue";
import SelectConfig from "./select-config.vue";
import NumberConfig from "./number-config.vue";

import Config from "../../../Models/Config";

@Component({
  components: {
    "switch-config": SwitchConfig,
    "select-config": SelectConfig,
    "number-config": NumberConfig,
  }
})
export default class ConfigView extends Vue {

  @Prop({type: Config})
  private config: Config<any>;

}
</script>

