<script>
  // @ts-nocheck
  import "codemirror/lib/codemirror.css"
  import "codemirror/theme/nord.css"
  import "codemirror/mode/javascript/javascript"
  import "codemirror/mode/css/css"
  import "codemirror/mode/xml/xml"
  import CodeMirror from "codemirror"
  import { onMount } from "svelte"

  export let value
  export let lang
  export let title
  export let topbarMouseDown

  let textArea

  onMount(() => {
    const editor = CodeMirror.fromTextArea(textArea, {
      lineWrapping: true,
      mode: lang,
      smartIndent: true,
      lineNumbers: true,
      theme: "nord",
    })
    editor.focus()
    editor.on("change", () => {
      value = editor.getValue()
    })
    return () => {
      editor.toTextArea()
    }
  })
</script>

<div class="editor-container">
  <div class="top-bar" on:mousedown={topbarMouseDown(title)}>
    <span>{title}</span>
    <button>O/C</button>
  </div>

  <textarea bind:this={textArea} bind:value readonly />
</div>

<style>
  .editor-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    border: 1px solid #ff0;
    color: white;
    width: 100%;
    height: 100%;
  }
  .top-bar {
    padding: 10px 30px;
    background-color: #22272e;
    display: flex;
    justify-content: space-between;
  }
</style>
