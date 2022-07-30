<script>
  import Editor from "./lib/components/Editor.svelte"

  let html = "<h1>Hello World</h1>"
  let css = ""
  let js = "document.body.style.background = '#263238'"
  let cooldownTimer
  let iframe

  $: {
    clearTimeout(cooldownTimer)
    cooldownTimer = setTimeout(async () => {
      let output = iframe.contentWindow.document
      output.open()
      output.write(
        `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"><\/script>  
        </head>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}<\/script>
      </html>`
      )
      output.close()
    }, 320)
  }
</script>

<main class="w-screen h-screen flex">
  <section class="flex flex-col w-[410px] space-y-4 bg-[#22272E]">
    <Editor title={"HTML"} lang={"xml"} bind:value={html} />
    <Editor title={"CSS"} lang={"css"} bind:value={css} />
    <Editor title={"JS"} lang={"javascript"} bind:value={js} />
  </section>
  <section class="flex flex-1">
    <iframe
      bind:this={iframe}
      title="output"
      frameborder="0"
      width="100%"
      height="100%"
    />
  </section>
</main>
