<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <div class="input-wrapper">
      <input
        :id="id"
        :value="value | thousands"
        @change="onChange"
        @input="onInput"
        @keypress="onKeypress"
        @paste="onPaste"
        :class="{ error: error }"
        type="text"
      />
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    thousands(number) {
      if (!number) {
        return number
      } else {
        return Math.floor(number)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    }
  },
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    numberValidation: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    errorBorder() {
      return this.error ? { 'border-color': 'red' } : {}
    }
  },
  methods: {
    onKeypress(event) {
      if (this.numberValidation) {
        event = event || window.event
        const charCode = event.which ? event.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          event.preventDefault()
        } else {
          return true
        }
      }
    },
    onPaste(event) {
      if (this.numberValidation) {
        const value = (event.clipboardData || window.clipboardData).getData(
          'text'
        )
        const reg = new RegExp('^[0-9]+$')
        if (!reg.test(value)) {
          event.preventDefault()
        }
      }
    },
    onInput(event) {
      const value = event.target.value.replace(/,/g, '')
      this.$emit('onInput', value)
    },
    onChange(event) {
      const value = event.target.value.replace(/,/g, '')
      this.$emit('onChange', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  font-size: 16px;
  position: relative;
  width: fit-content;
  label {
    position: absolute;
    top: -25px;
    left: 0;
  }
  .input-wrapper {
    position: relative;
    &:before {
      content: '$';
      position: absolute;
      left: 8px;
      top: 8px;
    }
  }
  input {
    width: 80px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid $light-black;
    padding: 0 5px 0 20px;
    outline: none !important;
    &.error {
      border-color: red;
    }
  }
}
</style>
