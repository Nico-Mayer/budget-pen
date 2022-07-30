<script>
  import Editor from "./lib/components/Editor.svelte"
  import { onMount } from "svelte"

  let html = "<h1>Hello World</h1>"
  let css = "body { color: red; }"
  let js = "document.body.style.background = 'blue'"
  let srcDoc = ``
  let cooldownTimer
  let iframe

  $: {
    clearTimeout(cooldownTimer)
    cooldownTimer = setTimeout(async () => {
      srcDoc = `
      <html>
        <body>${html}</body>
        <style>${css}</style>
      <script>${js}<\/script>
  </html>`
    }, 320)
  }
</script>

<main class="w-screen h-screen">
  <section class="pane top-pane flex w-full space-x-4">
    <Editor title={"HTML"} lang={"xml"} bind:value={html} />
    <Editor title={"CSS"} lang={"css"} bind:value={css} />
    <Editor title={"JS"} lang={"javascript"} bind:value={js} />
  </section>
  <section class="pane">
    <iframe
      bind:this={iframe}
      {srcDoc}
      title="output"
      sandbox="allow-scripts"
      frameborder="0"
      width="100%"
      height="100%"
    />
  </section>
</main>

<style>
  .pane {
    height: 50%;
    background-color: white;
  }
</style>
