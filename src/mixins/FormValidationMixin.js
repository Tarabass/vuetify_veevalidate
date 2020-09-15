import { required, email, max, min } from 'vee-validate/dist/rules'
import { extend, setInteractionMode } from 'vee-validate'

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
  methods: {
    submit () {
      this.$refs.observer.validate()
      console.log('submit from mixin')
    }
  }
}
