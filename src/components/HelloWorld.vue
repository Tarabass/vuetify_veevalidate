<template>
  <ValidationObserver ref="observer" v-slot="{ /* validate, reset */ }">
    <form style="width: 300px; margin: 50px auto 0">
      <ValidationProvider v-slot="{ errors }" name="Terminal" rules="min:3|unique" mode="aggressive" :debounce="500">
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

      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </ValidationObserver>
</template>

<script>
import { required, email, max, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('min', {
  ...min,
  message: '{_field_} must be greater than {length} characters'
})

extend('unique', {
  async validate (value) {
    if (value === '') return true

    const response = await fetch('./api/terminals.json', {})
    const data = await response.json()

    return Boolean(data.terminals.indexOf(value) < 0)
  },
  message: 'The {_field_} field must be unique'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
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
    submit () {
      this.$refs.observer.validate()
    },
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
