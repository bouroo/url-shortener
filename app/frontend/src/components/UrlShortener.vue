<template>
  <div class="url-shortener">
    <Card>
      <template #title>URL Shortener</template>
      <template #content>
        <form @submit.prevent="shortenUrl">
          <InputText type="text" v-model="url" placeholder="Enter a long URL" />
          <div ref="turnstileContainer"></div>
          <Button type="submit" label="Shorten" />
        </form>
        <div v-if="shortenedUrl" class="shortened-url">
          <p>Shortened URL:</p>
          <a :href="shortenedUrl" target="_blank">{{ shortenedUrl }}</a>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

declare const turnstile: any;

const url = ref('')
const shortenedUrl = ref('')
const turnstileContainer = ref<HTMLElement | null>(null)
const token = ref('')

onMounted(() => {
  if (turnstileContainer.value) {
    turnstile.render(turnstileContainer.value, {
      sitekey: import.meta.env.VITE_TURNSTILE_SITEKEY, // Replace with your sitekey
      callback: (t: string) => {
        token.value = t
      },
    })
  }
})

const shortenUrl = async () => {
  if (!url.value) {
    return
  }

  let formattedUrl = url.value;
  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = `https://${formattedUrl}`;
  }

  if (!token.value) {
    alert('Please complete the CAPTCHA')
    return
  }

  const workerUrl = import.meta.env.VITE_WORKER_URL.endsWith('/') ? import.meta.env.VITE_WORKER_URL.slice(0, -1) : import.meta.env.VITE_WORKER_URL;

  const response = await fetch(`${workerUrl}/api/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: formattedUrl, token: token.value })
  })

  if (response.ok) {
    const data = await response.json()
    shortenedUrl.value = `${workerUrl}/${data.id}`
  } else {
    alert('Failed to shorten URL')
  }
}
</script>

<style scoped>
.url-shortener {
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.shortened-url {
  margin-top: 2rem;
  text-align: center;
  word-break: break-all;
}

form > :first-child {
  flex: 1 1 200px;
}

@media (min-width: 576px) {
  .url-shortener {
    padding: 2rem;
  }
}
</style>