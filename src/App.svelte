<script>
  import Editor from "./lib/components/Editor.svelte"

  let html = "<h1 class='text-white font-mono text-7xl'>Hello World</h1>"
  let css = ""
  let js = "document.body.style.background = '#263238'"
  let cooldownTimer
  let sidebar
  let iframe

  let resizer
  let resizing = false

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

  function handleMouseDown() {
    resizing = true
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    function handleMouseMove(e) {
      if (e.clientX > 300) {
        sidebar.style.width = e.clientX + "px"
        document.body.style.cursor = "col-resize"
      }
    }
    function handleMouseUp() {
      resizing = false
      document.body.style.cursor = "auto"
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }
</script>

<main class="w-screen h-screen flex">
  <section bind:this={sidebar} class="sidebar flex w-[472px] bg-[#22272E]">
    <div class="flex flex-col w-full space-y-4 ">
      <Editor title={"HTML"} lang={"xml"} bind:value={html} />
      <Editor title={"CSS"} lang={"css"} bind:value={css} />
      <Editor title={"JS"} lang={"javascript"} bind:value={js} />
    </div>
    <div
      bind:this={resizer}
      on:mousedown={handleMouseDown}
      class="flex h-full w-[20px] cursor-col-resize border-white/20 border-x"
    />
  </section>

  <section class="flex flex-1 relativ">
    {#if resizing}
      <div class="bg-transparent w-full h-full absolute left-0 top-0" />
    {/if}
    <iframe
      bind:this={iframe}
      title="output"
      frameborder="0"
      width="100%"
      height="100%"
    />
  </section>
</main>
