<template>
        <quill-editor
                class="ql-editor"
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
        </quill-editor>
</template>

<script>
    import hljs from 'highlight.js'
    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    const toolbarOptions =  [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ]

    //七牛云上传域名: http(s)://upload-z2.qiniup.com
    //七牛云的AK: eiHzK04yfyyh-EymPKICBT-WFpanee7HXxXoDG78
    //七牛云的SK: 0kHNdQYXaD1cpgERUam2kbNuQpJbPZaHYR4OtU49
    export default {
        name: "Editor",
        components: {
            quillEditor
        },
        created() {
            this.editorOption.modules.syntax = {
                highlight: text => hljs.highlightAuto(text).value
            }
        },
        mounted() {

        },
        data() {
            return {
                content: "",
                editorOption: {
                    placeholder: '请输入文本...',
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                        },
                    },
                },
                uploadUrl: "",
                qiniuForm: {
                    
                }
            }
        },
        methods: {
            onEditorReady(editor) { // 准备编辑器

            },
            onEditorBlur() {
            }, // 失去焦点事件
            onEditorFocus() {
            }, // 获得焦点事件
            onEditorChange({quill, html, text}) {
                // 内容改变事件
                console.log(html)
                this.content = html
            },
            // 上传图片前
            beforeUpload(res, file) {
            },
            // 上传图片成功
            uploadSuccess(res, file) {
            },
            // 上传图片失败
            uploadError(res, file) {
            }

        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        }
    }
</script>

<style scoped>
    .ql-editor{
        height:800px;
    }
</style>