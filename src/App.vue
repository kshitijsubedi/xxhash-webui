<script setup>
import { ref, onMounted, watch } from 'vue';
import xxhash from 'xxhash-wasm';

let hasher;
const EMPTYHASH = [46947589, 17241709254077376921];

const message = ref('');
const inputHash = ref(0);
const result = ref(false);
const hash = ref({ 32: EMPTYHASH[0], 64: EMPTYHASH[1] });

onMounted(() => {
  (async function () {
    // Initialize xxHash function
    hasher = await xxhash();
  })();
});

watch(message, async (newV) => {
  hash.value = { 32: hasher.h32(newV), 64: hasher.h64(newV) };
});

watch(inputHash, async (newV) => {
  result.value = newV == hash.value[32] || newV == hash.value[64];
});

function copyText(text) {
  navigator.clipboard.writeText(text).then((value) => {
    console.log('Copied!');
  });
}

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
      b-0
      p-8
      m-10
    "
  >
    <div class="avatar indicator">
      <span class="indicator-item badge badge-primary">v1.1</span>
      <h1
        class="
          font-extrabold
          text-transparent text-8xl
          bg-clip-text bg-gradient-to-r
          from-purple-400
          to-pink-600
        "
      >
        XXHASH
      </h1>
    </div>
    <div class="stats py-2">
      <div class="stat text-center">
        <div class="stat-title text-xl">
          <div class="badge badge-outline">32-bit Hash</div>
        </div>
        <button
          class="stat-value hover:text-stone-200"
          @click="copyText(hash[32])"
        >
          <span>{{ hash[32] }}</span>
        </button>
        <div class="stat-desc">Click to copy hash.</div>
      </div>
      <div class="stat text-center">
        <div class="stat-title text-xl">
          <div class="badge badge-outline">64-bit Hash</div>
        </div>
        <button
          class="stat-value hover:text-stone-200"
          @click="copyText(hash[64])"
        >
          <span>{{ hash[64] }}</span>
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
  <footer class="footer footer-center p-4 bg-base-300 gap-0 absolute bottom-0">
    <p>xxHash WebUI by Kshitij Subedi 2022.</p>
    <div class="flex">
      <a class="link link-info" href="https://github.com/Cyan4973/xxHash"
        >xxHash</a
      >
      <a class="link link-accent" href="https://github.com/jungomi/xxhash-wasm"
        >xxhash-wasm</a
      >
    </div>
  </footer>
</template>
