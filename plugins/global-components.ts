import { defineNuxtPlugin } from "#app";
import type { DefineComponent } from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "~/assets/styles/vselect.css"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("v-select", vSelect  as unknown as DefineComponent)
})