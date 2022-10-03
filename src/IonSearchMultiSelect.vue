<template>
    <div>
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
        <ion-button color="secondary" @click="openModal()">
            Add More
        </ion-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRef, ref } from "vue";
import { modalController, IonButton } from '@ionic/vue';
import { closeCircleOutline } from "ionicons/icons";
import IonSearchMultiSelectModal from './IonSearchMultiSelectModal.vue';
import { useModelWrapper } from "./modelWrapper";

export default defineComponent({
    name: 'IonSearchMultiSelect',
    components: {
        IonButton,
    },
    props: {
        optionsProp: Array,
        fieldNameProp: String,
        modelValue: Array,
    },
    setup(props: any, { emit }) {
        const options = toRef(props, 'optionsProp').value;
        let selectedOptions = useModelWrapper(props, emit, 'modelValue');
        const fieldName = toRef(props, 'fieldNameProp').value;

        const openModal = async () => {
            const modal = await modalController.create({
                component: IonSearchMultiSelectModal,
                componentProps: { 
                    optionsProp: options,
                    selectedOptionsProp: selectedOptions.value,
                    fieldNameProp: fieldName,
                }
            });

            modal.present();

            const { data } = await modal.onWillDismiss();

            if (data) selectedOptions.value = data;
        }

        const removeOption = (optionToRemove: string) => {
            let i = 0, j = 0;

            while (i < selectedOptions.value.length) {
                const option = selectedOptions.value[i];
                if (option != optionToRemove) selectedOptions.value[j++] = option;
                i++;
            }

            selectedOptions.value.length = j;
        }

        return {
            options,
            selectedOptions,
            fieldName,

            openModal,
            removeOption,

            closeCircleOutline
        };
    }
});
</script>