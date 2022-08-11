<template>
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
            <ion-input v-model="searchQuery" placeholder="Search"></ion-input>
        </ion-item>
        <ion-item>
            <ion-button color="secondary" @click="submit()">Submit</ion-button>
        </ion-item>
        <ion-item
            v-for="option of filteredOptions" 
            :key="option"
            @click="toggleSelected(option)"
            :color="selectedOptions.includes(option) ? 'success' : ''">
            <ion-label>{{ option }}</ion-label>
        </ion-item>

    </ion-content>
</template>

<script lang="ts">
    import { IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, modalController} from '@ionic/vue';
    import { computed, ref, toRef, defineComponent } from 'vue';

    export default defineComponent({
        name: 'IonSearchMultiSelectModal',
        components: {
            IonButton,
            IonInput,
            IonContent,
            IonHeader,
            IonTitle,
            IonToolbar,
            IonItem,
            IonLabel,
        },
        props: {
            optionsProp: Array,
            selectedOptionsProp: Array,
            fieldNameProp: String,
        },

        setup(props: any) {
            let searchQuery = ref('');
            const options = toRef(props, 'optionsProp').value;
            let selectedOptions = ref(props.selectedOptionsProp);
            const fieldName = toRef(props, 'fieldNameProp').value;
            
            const searchOptions = (options: string[], value: string) => {
                if (!value) return options;

                return options.filter((option: string) => {
                    return (option.toLowerCase().includes(value));
                });
            }

            const filterOptions = () => {
                let filteredOptions = searchOptions(options, searchQuery.value);

                return filteredOptions;
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

            const toggleSelected = (option: string) => {
                if (selectedOptions.value.includes(option)) {
                    //selectedOptions.value = selectedOptions.value.filter((selectedOption: string) => {
                        //return (selectedOption != option);
                    //});
                    removeOption(option);
                } else {
                    selectedOptions.value.push(option);
                }
            }

            const submit = () => {
                return modalController.dismiss(selectedOptions.value, '');
            }

            return {
                filteredOptions: computed(() => {
                    return filterOptions();
                }),
                searchQuery,
                selectedOptions,
                fieldName,
                toggleSelected,
                submit,
            }
        }
    })
</script>