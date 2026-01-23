<script setup lang="ts">
import { ref } from 'vue'
import {
  Form,
  type FormResolverOptions,
  type FormSubmitEvent,
} from '@primevue/forms'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useAirportData } from '../composables/useAirportData'

const { fetchAllData, loading } = useAirportData()

const initialValues = ref({
  airportCode: '',
})

type FieldError = {
  type: string
  message: string
}
function resolver({ values }: FormResolverOptions) {
  const errors = { airportCode: [] as FieldError[] }
  const code = values.airportCode?.trim() || ''

  if (!code) {
    errors.airportCode.push({
      type: 'required',
      message: 'Airport code is required',
    })
  } else if (code.length < 3 || code.length > 4) {
    errors.airportCode.push({
      type: 'length',
      message: 'Airport codes are 3-4 characters long',
    })
  } else if (!/^[A-Za-z0-9]+$/.test(code)) {
    errors.airportCode.push({
      type: 'format',
      message: 'Airport codes can only contain letters and numbers',
    })
  }

  return {
    values,
    errors,
  }
}

async function onFormSubmit(e: FormSubmitEvent) {
  const { valid, values } = e
  if (!valid) return

  const airportCode = values.airportCode.trim().toUpperCase()
  if (airportCode.length < 3 || airportCode.length > 4) return

  await fetchAllData(airportCode)
}
</script>

<template>
  <Form
    v-slot="$form"
    :initial-values="initialValues"
    :resolver="resolver"
    @submit="onFormSubmit"
  >
    <div class="form-row">
      <div class="form-field">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            name="airportCode"
            type="text"
            placeholder="Airport code"
            autocomplete="off"
          />
        </IconField>
        <Message
          v-if="$form.airportCode?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.airportCode.error?.message }}
        </Message>
      </div>
      <Button
        type="submit"
        label="Submit"
        class="submit-button"
        :disabled="($form.airportCode?.value?.trim().length ?? 0) < 3 || ($form.airportCode?.value?.trim().length ?? 0) > 4 || loading"
        :loading="loading"
      />
    </div>
  </Form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.submit-button {
  width: 100%;
}

@media (min-width: 480px) {
  .form-row {
    flex-direction: row;
    align-items: flex-start;
    max-width: none;
  }

  .submit-button {
    width: auto;
  }
}
</style>
