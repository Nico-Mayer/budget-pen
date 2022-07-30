<script>
  import Editor from "./lib/components/Editor.svelte"
</script>

<main>
  <section class="pain top-pain">
    <Editor mode={"htmlmixed"} />
    <Editor mode={"css"} />
    <Editor mode={"javascript"} />
  </section>
  <section class="pain">
    <iframe
      title="output"
      sandbox="allow-scripts"
      frameborder="0"
      width="100%"
      height="100%"
    />
  </section>
</main>
