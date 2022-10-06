<template>
    <div>
        <span v-if="span">
            <h4 style="font-size: 1rem">
                {{ fieldName }}
            </h4>
            <span v-for="selectedOption in selectedOptions" :key="selectedOption" style="position: relative">
                <ion-button
                    class="multi-select-button"
                    size="small"
                    @click="removeOption(selectedOption)">
                    {{ selectedOption }}
                </ion-button>
                <!-- <IonIcon :icon="closeCircleOutline" style="position: absolute; top: 1rem; right: 1rem"/> -->
            </span>
        </span>
        <div v-else>
            <h2>{{ fieldName }} </h2>
            <div v-for="selectedOption in selectedOptions" :key="selectedOption" style="position: relative">
                <ion-button
                    class="multi-select-button"
                    size="small"
                    @click="removeOption(selectedOption)">
                    {{ selectedOption }}
                </ion-button>
                <!-- <IonIcon :icon="closeCircleOutline" style="position: absolute; top: 1rem; right: 1rem"/> -->
            </div>
        </div>
        <ion-button color="secondary" @click="openModal" :size="span ? 'small' : ''">
            Add More
        </ion-button>
    </div>
    <ion-modal :is-open="isOpen" @did-dismiss="closeModal">
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    {{ fieldName }} 
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item>
                <span v-if="selectedOptions">
                    <ion-button 
                        size="small"
                        @click="toggleSelected(selectedOption)"
                        v-for="selectedOption of selectedOptions" 
                        :key="selectedOption">
                        {{ selectedOption }}
                    </ion-button>
                </span>
            </ion-item>
            <ion-item>
                <ion-label>
                    Search
                </ion-label>
                <ion-input 
                    v-model="searchQuery"
                    placeholder="Search"
                    @keyup="filterOptions()"
                ></ion-input>
            </ion-item>
            <ion-item>
                <ion-button color="secondary" @click="closeModal">Submit</ion-button>
            </ion-item>
            <ion-item
                v-for="option of filteredOptions" 
                :key="option"
                @click="toggleSelected(option)"
                :color="selectedOptions.includes(option) ? 'success' : ''">
                <ion-label>{{ option }}</ion-label>
            </ion-item>
        </ion-content>
    </ion-modal>
</template>

<script>
import { defineComponent, toRef, ref } from "vue";
import { 
    IonModal,
    IonButton,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
} from '@ionic/vue';
import { closeCircleOutline } from "ionicons/icons";
import { useModelWrapper } from "../modelWrapper";
import { computed } from "@vue/reactivity";

export default defineComponent({
    name: 'IonSearchMultiSelect',
    components: {
        IonModal,
        IonButton,
        IonInput,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonItem,
        IonLabel
    },
    props: {
        optionsProp: Array,
        modelValue: Array,
        fieldNameProp: String,
        spanProp: Boolean
    },
    setup(props, { emit }) {
        const options = toRef(props, 'optionsProp').value;
        let selectedOptions = useModelWrapper(props, emit, 'modelValue');
        const fieldName = toRef(props, 'fieldNameProp').value;
        const span = toRef(props, 'spanProp').value ?? false;
        let isOpen = ref(false);
        let searchQuery = ref('');
        let filteredOptions = ref(options);

        const closeModal = () => {
            isOpen.value = false;
        }

        const openModal = () => {
            isOpen.value = true;
        }

        const searchOptions = (options, value) => {
            if (!value) return options;

            return options.filter((option) => {
                return (option.toLowerCase().includes(value));
            });
        }

        const filterOptions = () => {
            filteredOptions.value = searchOptions(options, searchQuery.value);
        }

        const removeOption = (optionToRemove) => {
            let i = 0, j = 0;

            while (i < selectedOptions.value.length) {
                const option = selectedOptions.value[i];
                if (option != optionToRemove) selectedOptions.value[j++] = option;
                i++;
            }

            selectedOptions.value.length = j;
        }

        const toggleSelected = (option) => {
            if (selectedOptions.value.includes(option)) {
                removeOption(option);
            } else {
                selectedOptions.value.push(option);
            }
        }

        return {
            searchQuery,
            filteredOptions,
            options,
            selectedOptions,
            fieldName,
            span,
            isOpen,

            openModal,
            closeModal,
            removeOption,
            toggleSelected,
            filterOptions,

            closeCircleOutline
        };
    }
});
</script>