import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

function RTE({name, control, label, defaultValue=""}) {
    
  return (
    <div className='w-full'>
        {label && <label className='inline-block font-bold mb-1 pl-1'>{label}</label>}

        <Controller name={name || "content"} control={control} 
        render={({field: {onChange}}) => (
            <Editor 
                initialValue={defaultValue}
                apiKey='12hdilq8441r1h35iwn8y727djh97xyz3y46w3eqj7rl2x7r'
                init={{branding: false, initialValue: defaultValue,
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                }}
                onEditorChange={onChange}
            />
        )} />
    </div>
    )
}

export default RTE