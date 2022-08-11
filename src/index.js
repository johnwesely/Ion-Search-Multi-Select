import IonSearchMultiSelect from './IonSearchMultiSelect.vue';
import IonSearchMultiSelectModal from './IonSearchMultiSelectModal.vue'

export default {
    install(Vue, options) {
        Vue.component('ion-search-multi-select', IonSearchMultiSelect);
        Vue.component('ion-search-multi-select-modal', IonSearchMultiSelectModal);
    }
};
