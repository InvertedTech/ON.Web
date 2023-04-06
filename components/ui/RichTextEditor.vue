<template>
  <div>
    <label v-if="label" class="text-gray-300 mb-2" :for="inputId">{{ label }}</label>
    <client-only>
      <div v-if="editor" class="flex items-center border border-grayscale-500 bg-primary py-1 px-3 rounded-t-lg">
        <ui-editor-icon-btn icon="undo" class="mx-1" :disabled="!editor.can().chain().focus().undo().run()" @click="editor.chain().focus().undo().run()" />
        <ui-editor-icon-btn icon="redo" class="mx-1" :disabled="!editor.can().chain().focus().redo().run()" @click="editor.chain().focus().redo().run()" />

        <div class="h-7 w-px bg-grayscale-500 mx-4" />

        <ui-editor-icon-btn icon="format_bold" class="mx-1" :disabled="!editor.can().chain().focus().toggleBold().run()" :active="editor.isActive('bold')" @click="editor.chain().focus().toggleBold().run()" />
        <ui-editor-icon-btn icon="format_italic" class="mx-1" :disabled="!editor.can().chain().focus().toggleItalic().run()" :active="editor.isActive('italic')" @click="editor.chain().focus().toggleItalic().run()" />
        <ui-editor-icon-btn icon="strikethrough_s" class="mx-1" :disabled="!editor.can().chain().focus().toggleStrike().run()" :active="editor.isActive('strike')" @click="editor.chain().focus().toggleStrike().run()" />
        <ui-editor-icon-btn icon="code" class="mx-1" :disabled="!editor.can().chain().focus().toggleCode().run()" :active="editor.isActive('code')" @click="editor.chain().focus().toggleCode().run()" />

        <div class="h-7 w-px bg-grayscale-500 mx-4" />

        <ui-editor-icon-btn icon="format_list_bulleted" class="mx-1" :disabled="!editor.can().chain().focus().toggleBulletList().run()" :active="editor.isActive('bulletList')" @click="editor.chain().focus().toggleBulletList().run()" />
        <ui-editor-icon-btn icon="format_list_numbered" class="mx-1" :disabled="!editor.can().chain().focus().toggleOrderedList().run()" :active="editor.isActive('orderedList')" @click="editor.chain().focus().toggleOrderedList().run()" />
        <!-- <button @click="editor.chain().focus().unsetAllMarks().run()">clear marks</button>
        <button @click="editor.chain().focus().clearNodes().run()">clear nodes</button>
        <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">paragraph</button>
        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">h1</button>
        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">h2</button>
        <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">h3</button>
        <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">h4</button>
        <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">h5</button>
        <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">h6</button>
        <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">bullet list</button>
        <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">ordered list</button>
        <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">code block</button>
        <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">blockquote</button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">horizontal rule</button>
        <button @click="editor.chain().focus().setHardBreak().run()">hard break</button> -->
      </div>
      <div class="min-h-[120px] w-full cursor-text p-4 border-b border-x border-grayscale-500 bg-primary rounded-b-lg" @click="setFocus">
        <div @click.stop.prevent>
          <editor-content :editor="editor" />
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  props: {
    value: String,
    label: String,
    name: String
  },
  components: {
    EditorContent
  },
  data() {
    return {
      editor: null
    }
  },
  watch: {
    value(value) {
      const isSame = this.editor.getHTML() === value
      if (isSame) {
        return
      }
      this.editor.commands.setContent(value, false)
    }
  },
  computed: {
    inputId() {
      return this.name || String(Math.floor(Math.random() * 100000))
    }
  },
  methods: {
    setFocus() {
      if (this.editor) {
        this.editor.commands.focus('end')
      }
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [StarterKit],
      editorProps: {
        attributes: {
          class: 'prose prose-invert focus:outline-none max-w-3xl'
        }
      },
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      }
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style>
div.ProseMirror:focus-visible {
  outline: none !important;
}
</style>