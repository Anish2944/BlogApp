import React, { useState } from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'
import conf from '../conf/conf'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };
  
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];


function RTE({name, control, label, defaultValue=""}) {

    const [value,setValue] = useState('');
    const handleChange = (content, delta, source, editor) => {
        setValue(content);
      };
  return (
    <div className='w-full bg-background'>
        {label && <label className='inline-block font-bold mb-1 pl-1'>{label}</label>}

        <Controller name={name || "content"} control={control} 
        render={({field: {onChange}}) => (
            // <Editor 
            //     initialValue={defaultValue}
            //     apiKey={conf.apikeytinymce}
            //     init={{branding: false, initialValue: defaultValue,
            //         height: 500,
            //         menubar: true,
            //         plugins: [
            //             'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            //             'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            //             'insertdatetime', 'media', 'table', 'help', 'wordcount'
            //           ],
            //           toolbar: 'undo redo | blocks | ' +
            //           'bold italic backcolor | alignleft aligncenter ' +
            //           'alignright alignjustify | bullist numlist outdent indent | ' +
            //           'removeformat | help',
            //           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
            //     }}
            //     onEditorChange={onChange}
            // />
            <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
      />
            
        )} />
    </div>
    )
}

export default RTE