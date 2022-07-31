<script>
  import Editor from "./lib/components/Editor.svelte"

  let html = "<h1 class='text-7xl p-6 animate-bounce'>Hello World</h1>"
  let css = ""
  let js = ""
  let cooldownTimer
  let sidebar
  let iframe

  let editorConHTML
  let editorConCSS
  let editorConJS

  let resizing = false
  let srcDoc

  $: {
    clearTimeout(cooldownTimer)
    cooldownTimer = setTimeout(async () => {
      srcDoc = `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <script src="https://cdn.tailwindcss.com"><\/script>  
        </head>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}<\/script>
      </html>`
    }, 320)
  }

  function handleEditorResize(editorType) {
    let container
    switch (editorType) {
      case "html":
        container = editorConHTML
        break
      case "css":
        container = editorConCSS
        break
      case "js":
        container = editorConJS
        break
    }
    resizing = true
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    function handleMouseMove(e) {
      if (
        editorType !== "html" &&
        e.clientY > 44 &&
        e.clientY < window.innerHeight - 44
      ) {
        container.style.top = e.clientY + "px"
        document.body.style.cursor = "row-resize"
      }
    }
    function handleMouseUp() {
      resizing = false
      document.body.style.cursor = "auto"
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }

  function handleSidebarResize() {
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
  <section bind:this={sidebar} class="sidebar flex w-[472px]">
    <div class="flex h-full flex-col w-full relative">
      <div
        class="flex flex-col absolute top-0 left-0 right-0 bottom-0"
        bind:this={editorConHTML}
      >
        <Editor
          title={"HTML"}
          lang={"xml"}
          bind:value={html}
          topbarMouseDown={handleEditorResize}
        />
      </div>
      <div
        class="flex absolute top-1/3 left-0 right-0 bottom-0"
        bind:this={editorConJS}
      >
        <Editor
          title={"JS"}
          lang={"javascript"}
          bind:value={js}
          topbarMouseDown={handleEditorResize}
        />
      </div>
      <div
        class="flex absolute top-2/3 left-0 right-0 bottom-0"
        bind:this={editorConCSS}
      >
        <Editor
          title={"CSS"}
          lang={"css"}
          bind:value={css}
          topbarMouseDown={handleEditorResize}
        />
      </div>
    </div>
    <div
      on:mousedown={handleSidebarResize}
      class="flex h-full w-[20px] cursor-col-resize border-white/20 border-x bg-[#22272E]"
    />
  </section>

  <section class="flex flex-1 relativ">
    {#if resizing}
      <div class="bg-transparent w-full h-full absolute left-0 top-0" />
    {/if}
    <iframe
      srcdoc={srcDoc}
      sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"
      bind:this={iframe}
      title="output"
      frameborder="0"
      width="100%"
      height="100%"
    />
  </section>
</main>
