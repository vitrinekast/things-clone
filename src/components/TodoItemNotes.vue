<template lang="html">
  <div class="">
    <editor-content :editor="editor" />
  </div>
</template>
<script >
// @ is an alias to /src
import { Editor, EditorContent } from 'tiptap'
import {
    BulletList,
    HardBreak,
    Heading,
    ListItem,
    OrderedList,
    Bold,
    Italic,
    Link,
    Strike,
    Underline,
    History,
    Placeholder
} from 'tiptap-extensions'
export default {
    components: {
        EditorContent
    },
    props: ['note'],
    data() {
        return {
            editor: null,
            html: false
        }
    },

    mounted() {
        this.html = this.note
        this.editor = new Editor({
            content: this.note,
            editable: this.editable,
            extensions: [
                new BulletList(),
                new HardBreak(),
                new Heading({ levels: [1, 2, 3] }),
                new ListItem(),
                new OrderedList(),
                new Bold(),
                new Italic(),
                new Link(),
                new Strike(),
                new Underline(),
                new History(),
                new Placeholder({
                    emptyClass: 'is-empty',
                    emptyNodeText: 'Write something …'
                }),
            ],
            placeholder: 'Some notes',
            onUpdate: ({ getHTML }) => {
                this.html = getHTML()
            },
            onBlur: () => {
                this.$emit('update', { note: this.html })
            }
        })
    },
    beforeDestroy() {
        this.editor.destroy()
    },
    watch: {
        placeholder(newValue) {
            this.editor.extensions.options.placeholder.emptyNodeText = newValue
        },
    },

    methods: {
        setEditable: function () {
            this.editor.setOptions({
                editable: true,
            })
        },
        submit: function () {
            this.$emit('update', { note: this.note })
        }
    }
}

</script>
