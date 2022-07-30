<script>
  // @ts-nocheck
  import "codemirror/lib/codemirror.css"
  import "codemirror/theme/material.css"
  import "codemirror/mode/javascript/javascript"
  import "codemirror/mode/css/css"
  import "codemirror/mode/xml/xml"
  import CodeMirror from "codemirror"
  import { onMount } from "svelte"

  export let value
  export let lang
  export let title

  let textArea

  onMount(() => {
    const editor = CodeMirror.fromTextArea(textArea, {
      lineWrapping: true,
      mode: lang,
      smartIndent: true,
      lineNumbers: true,
      theme: "material",
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
  <div class="top-bar">
    <span>{title}</span>
    <button>O/C</button>
  </div>

  <textarea bind:this={textArea} bind:value readonly />
</div>

<style>
  .editor-container {
    display: flex;
    flex-direction: column;
    background-color: #22272e;
    color: white;
    flex-grow: 1;
    flex-basis: 0;
    border-radius: 1rem;
    overflow: hidden;
  }
  .top-bar {
    padding: 10px 30px;
    display: flex;
    justify-content: space-between;
  }
</style>
