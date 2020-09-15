<template>
  <ValidationObserver ref="observer" v-slot="{ /* validate, reset */dirty, handleSubmit }">
    <v-form @submit.prevent="handleSubmit(submit)" style="width: 300px; margin: 50px auto 0">
      <ValidationProvider v-slot="{ errors }" name="Terminal" rules="required|min:3|unique" mode="aggressive" :debounce="500">
        <v-text-field
          v-model="terminal"
          :error-messages="errors"
          label="Terminal"
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:10">
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="select" rules="required">
        <v-select
          v-model="select"
          :items="items"
          :error-messages="errors"
          label="Select"
          data-vv-name="select"
          required
        ></v-select>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors/*, valid*/ }" rules="required" name="checkbox">
        <v-checkbox
          v-model="checkbox"
          :error-messages="errors"
          value="1"
          label="Option"
          type="checkbox"
          required
        ></v-checkbox>
      </ValidationProvider>
      <v-btn type="submit" class="mr-4">submit</v-btn>
      <v-btn @click="clear" :disabled="!dirty">clear</v-btn>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import FormValidationMixin from '@/mixins/FormValidationMixin.js'

export default {
  mixins: [
    FormValidationMixin
  ],
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    terminal: '',
    name: '',
    email: '',
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: null
  }),

  methods: {
    // submit () {
    //   this.$refs.observer.validate()
    //   console.log('submit from form')
    // },
    clear () {
      this.terminal = ''
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = null
      this.$refs.observer.reset()
    }
  }
}
</script>
