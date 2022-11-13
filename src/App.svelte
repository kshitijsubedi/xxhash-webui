<script>
  import xxhash from "xxhash-wasm";
  import { onMount } from "svelte";

  const EMPTYHASH = [46947589, BigInt(17241709254077376921)];
  const SURPRISE = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  let hasher = null;
  let message = "";
  let inputHash = null;
  let result = false;
  let hash = { 32: EMPTYHASH[0], 64: EMPTYHASH[1] };

  onMount(async () => {
    hasher = await xxhash();
  });

  $: genHash(message);
  $: check(inputHash);

  function genHash(value) {
    if (hasher) {
      hash = { 32: hasher.h32(value), 64: hasher.h64(value) };
    }
  }

  function check(value) {
    result = value == hash[32] || value == hash[64];
  }

  function copyText(text) {
    navigator.clipboard.writeText(text).then((value) => {
      console.log("Copied!");
    });
  }

  function pasteText() {
    navigator.clipboard.readText().then((value) => {
      message = value;
    });
  }

  function pasteHash() {
    navigator.clipboard.readText().then((value) => {
      inputHash = BigInt(value);
    });
  }
</script>

<div
  class="
      content
      container
      flex flex-col
      items-center
      justify-self-center
      place-content-center
      mx-auto
      lg:w-1/2
      2xl:w-1/3
      b-0
      p-4
    "
>
  <div class="avatar indicator">
    <a
      href={SURPRISE}
      target="_blank"
      rel="noopener noreferrer"
      class="
          indicator-item
          badge
          bg-blue-500
          animate-pulse
          shadow-xl shadow-blue-500
          border-transparent
        ">BETA</a
    >
    <h1
      class="
          font-extrabold
          text-transparent text-6xl
          lg:text-8xl
          bg-clip-text bg-gradient-to-r
          from-purple-400
          to-pink-500
        "
    >
      XXHASH
    </h1>
  </div>
  <div class="stats py-2 stats-vertical lg:stats-horizontal">
    <div class="stat text-center">
      <div class="stat-title text-xl">
        <div class="badge badge-outline">32-bit Hash</div>
      </div>
      <button
        class="stat-value hover:text-info-content text-2xl lg:text-4xl"
        on:click={() => copyText(hash[32])}
      >
        <span>{hash[32]}</span>
      </button>
      <div class="stat-desc">Click to copy hash.</div>
    </div>
    <div class="stat text-center">
      <div class="stat-title text-xl">
        <div class="badge badge-outline">64-bit Hash</div>
      </div>
      <button
        class="stat-value hover:text-info-content text-2xl lg:text-4xl"
        on:click={() => copyText(hash[64])}
      >
        <span>{BigInt(hash[64])}</span>
      </button>
      <div class="stat-desc">Click to copy hash.</div>
    </div>
  </div>
  <div class="form-control w-full">
    <div class="text-center input-group input-group-vertical">
      <textarea
        class="textarea textarea-bordered h-48"
        bind:value={message}
        placeholder="Add text here."
      />
      <button class="btn glass" on:click={pasteText}>
        Paste from clipboard
      </button>
    </div>
  </div>

  <!-- Comparision yeha bata suru -->
  <div class="divider my-6">🡣 Comparison 🡣</div>
  <div
    class="card w-full
        {result
      ? 'bg-success text-success-content'
      : 'bg-neutral text-neutral-content'}"
  >
    <div class="card-body items-center text-center">
      <h2 class="card-title">Enter Hash!</h2>
      <input
        class="input input-bordered text-neutral-content w-full"
        type="number"
        bind:value={inputHash}
        placeholder="0"
      />
      <button
        class="btn btn-xs btn-accent text-accent-content"
        on:click={pasteHash}
      >
        Paste
      </button>
    </div>
  </div>
</div>

<!-- Footer starts here -->
<footer class="footer ft footer-center p-2 bg-base-300 gap-0">
  <span
    class="
        text-sm text-gray-500
        sm:text-center
        dark:text-gray-400
        inline-flex
      "
    >xxHash Generator by
    <a
      href="https://github.com/kshitijsubedi"
      class="link font-bold decoration-dashed decoration-sky-500"
      >Kshitij Subedi</a
    >
    2022 🇳🇵
  </span>
  <ul
    class="
        flex flex-wrap
        items-center
        mt-3
        text-sm text-gray-500
        dark:text-gray-400
        sm:mt-0
      "
  >
    <li>
      <a
        href="https://github.com/Cyan4973/xxHash"
        class="mr-4 link hover:underline md:mr-6 decoration-lime-700"
      >
        Cyan4973/xxHash</a
      >
    </li>
    <li>
      <a
        href="https://github.com/jungomi/xxhash-wasm"
        class="mr-4 link hover:underline md:mr-6 decoration-lime-700"
      >
        xxhash-wasm</a
      >
    </li>
  </ul>
</footer>
