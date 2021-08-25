export const quillConfig = {
  // toolbar: '.toolbar',
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }, { header: 3 }],   // custom button values
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
      [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
      [{ direction: 'rtl' }],                         // text direction

      [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video'],
    ],
  },
  blotFormatter: {

  }
}
