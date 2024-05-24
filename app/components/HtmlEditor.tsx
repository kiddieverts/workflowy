import React, { useEffect, useState } from 'react';

type HtmlEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

const HtmlEditor: React.FC<HtmlEditorProps> = ({ value, onChange }) => {
  const [ReactQuill, setReactQuill] = useState<typeof ReactQuill | null>(null);

  useEffect(() => {
    (async () => {
      const { default: RQ } = await import('react-quill');
      setReactQuill(() => RQ);
    })();
  }, []);

  const handleChange = (html: string) => {
    onChange(html);
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header', 'font',
    'list', 'bullet',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'script', 'color', 'background',
    'align',
    'link', 'image', 'video'
  ];

  return (
    <div>
      {ReactQuill ? (
        <ReactQuill
          className="hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
      ) : (
        <p>Loading editor...</p>
      )}
    </div>
  );
};

export default HtmlEditor;
