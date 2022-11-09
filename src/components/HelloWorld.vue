<script setup>
import { ref, onMounted, watch } from 'vue';
import xxhash from 'xxhash-wasm';
import { useClipboard, usePermission } from '@vueuse/core';

let hasher;
const EMPTYHASH = 46947589;
const message = ref('');
const hash = ref(EMPTYHASH);
const inputHash = ref(0);
const result = ref(false);

const { text, isSupported, copy, copied } = useClipboard();
const permissionRead = usePermission('clipboard-read');
const permissionWrite = usePermission('clipboard-write');

onMounted(() => {
  (async function () {
    // Initialize xxHash function
    hasher = await xxhash();
  })();
});

watch(message, async (newV) => {
  hash.value = hasher.h32(newV);
});

watch(inputHash, async (newV) => {
  result.value = newV == hash.value;
});

defineProps({
  msg: String,
});

function pasteText() {
  navigator.clipboard.readText().then((value) => {
    message.value = value;
  });
}

function pasteHash() {
  navigator.clipboard.readText().then((value) => {
    inputHash.value = Number(value);
  });
}
</script>

<template>
  <div
    class="
      container
      flex flex-col
      items-center
      justify-self-center
      place-content-center
      mx-auto
      w-1/2
      shadow
      p-8
      m-10
    "
  >
    <div class="avatar indicator">
      <span class="indicator-item badge badge-primary">v1.0</span>
      <h1
        class="
          font-extrabold
          text-transparent text-8xl
          bg-clip-text bg-gradient-to-r
          from-purple-400
          to-pink-600
        "
      >
        {{ msg }}
      </h1>
    </div>
    <div class="stats shadow">
      <div class="stat text-center">
        <div class="stat-title text-xl">Generated Hash</div>
        <button class="stat-value hover:text-stone-200" @click="copy(hash)">
          <span v-if="!copied">{{ hash }}</span> <span v-else>Copied!</span>
        </button>
        <div class="stat-desc">Click to copy hash.</div>
      </div>
    </div>
    <div class="input-area text-center">
      <textarea
        class="textarea textarea-bordered w-full h-60"
        v-model="message"
        placeholder="Add text here."
      ></textarea>
      <button class="btn glass btn-wide my-5" @click="pasteText">Paste</button>
    </div>
    <div class="divider">Comparison</div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Enter Hash</span>
      </label>
      <div class="indicator">
        <span v-if="result" class="indicator-item badge badge-accent"
          >Match</span
        >
        <span v-else class="indicator-item badge badge-error">Incorrect</span>
        <label class="input-group">
          <input class="input input-bordered" v-model="inputHash" />
          <button @click="pasteHash" class="btn btn-">paste</button>
        </label>
      </div>
    </div>
  </div>
  <footer
    class="
      footer
      absolute
      bottom-0
      footer-center
      p-4
      bg-base-300
      text-base-content
    "
  >
    <div>
      <p>xxHash Generator - Demo app by Kshitij Subedi</p>
    </div>
  </footer>
</template>
