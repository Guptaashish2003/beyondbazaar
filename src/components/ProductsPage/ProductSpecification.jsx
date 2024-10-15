'use client'
import React from 'react'
import {
    BubbleMenu,
    EditorContent,
    FloatingMenu,
    useEditor,
  } from '@tiptap/react'
  import Link from '@tiptap/extension-link'
  import StarterKit from '@tiptap/starter-kit'
  import Image from '@tiptap/extension-image'
  import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
  import { FaBold,FaItalic,FaImage,FaHeading,FaYoutube,FaCode,FaListOl,FaListUl  } from "react-icons/fa";
  import { AiOutlineMergeCells } from "react-icons/ai";
  import { BiLink } from "react-icons/bi";
  import { MdTitle } from "react-icons/md";
  import { FaQuoteLeft,FaTable,FaTableList } from "react-icons/fa6";
  import { PiCodeBlockFill,PiSquareSplitHorizontalFill } from "react-icons/pi";
  import { GrTableAdd } from "react-icons/gr";
  import { RiInsertColumnRight,RiDeleteColumn,RiDeleteRow,RiInsertRowBottom } from "react-icons/ri";
  import { FcDeleteDatabase } from "react-icons/fc";


const ProductSpecification = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        autoLink: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableCell,
      TableHeader,
      TableRow,

    ],
    content: '<p>Hello World! 🌎️</p>',
  })
  if(!editor) return null;
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }
  const addImage = () => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  };
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width:  640,
        height:  480,
      })
    }
  }
  const iconClass =  "text-white hover:text-gray-200"
  const isActive = "text-green-200"
  const menuStyle = "bg-[#333] flex gap-x-3 text text-xl px-3 py-2 rounded-md"
  const floatIcon = "bg-[#333] p-2 rounded-full justify-center items-center"
  const toolBarIconsTable = [
    {onclick:()=>editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    isActive:iconClass,
    icon:<GrTableAdd />},
  {onclick:()=>editor.chain().focus().addColumnAfter().run(),
    isActive:iconClass,
    icon:<RiInsertColumnRight />},
  {onclick:()=>editor.chain().focus().deleteColumn().run(),
    isActive:iconClass,
    icon:<RiDeleteColumn />},
  {onclick:()=>editor.chain().focus().addRowAfter().run(),
    isActive:iconClass,
    icon:<RiInsertRowBottom />},
  {onclick:()=>editor.chain().focus().deleteRow().run(),
    isActive:iconClass,
    icon:<RiDeleteRow />},
  {onclick:()=>editor.chain().focus().deleteTable().run(),
    isActive:iconClass,
    icon:<FcDeleteDatabase />},
  {onclick:()=>editor.chain().focus().mergeCells().run(),
    isActive:iconClass,
    icon:<AiOutlineMergeCells />},
  {onclick:()=>editor.chain().focus().splitCell().run(),
    isActive:iconClass,
    icon:<PiSquareSplitHorizontalFill />},
  {onclick:()=>editor.chain().focus().toggleHeaderColumn().run(),
    isActive:iconClass,
    icon:<FaTable />},
  {onclick:()=>editor.chain().focus().toggleHeaderRow().run(),
    isActive:iconClass,
    icon:<FaTableList />},
  ]
  const selectOptions = [
    {onclick:()=>editor.chain().focus().toggleBold().run(),
    isActive:editor.isActive('bold') ? isActive : iconClass,
    icon:<FaBold   />},
    {onclick:()=>editor.chain().focus().toggleItalic().run(),
    isActive:editor.isActive('italic') ? isActive : iconClass,
    icon:<FaItalic  />},
    {onclick:()=>setLink(),
    isActive:editor.isActive('link') ? isActive : iconClass,
    icon:<BiLink />},
  ]



  return (
    <div className='mx-auto w-3/4 mt-32 '>
    <span className='bg-[#333] text-2xl flex justify-center gap-x-4 px-4 py-2  rounded-t-md max-sm:overflow-scroll max-sm:px-6'>
        <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleCode()
                .run()
            }
            className={editor.isActive('code') ? isActive : iconClass}
        >
            <FaCode />
        </button>

        <span className='border-x-1'></span>
        {/* table  */}
        {toolBarIconsTable.map((val,index)=>  
        <button
            key={index + 1}
            onClick={() => val.onclick()}
            className={val.isActive }
        >
            {val.icon}
        </button>)}

    </span>

    {/* selectOptions */}
  {editor && <BubbleMenu className={menuStyle} tippyOptions={{ duration: 100 }} editor={editor}>
    {selectOptions.map((val,index)=>  
          <button
              key={index + 1}
              onClick={() => val.onclick()}
              className={val.isActive }
          >
              {val.icon}
          </button>)}
    <span className='border-r-1'></span>
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      className={editor.isActive('heading', { level: 2 }) ? isActive : iconClass}
    >
      <FaHeading />
    </button>
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      className={editor.isActive('heading', { level: 3 }) ? isActive : iconClass}
    >
      <MdTitle />
    </button>
    <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? isActive : iconClass}
    >
        <FaQuoteLeft />
    </button>
  </BubbleMenu>}

  {editor && <FloatingMenu className="flex gap-x-2" tippyOptions={{ duration: 100 }} editor={editor}>
    <button onClick={addImage} className={`${iconClass} ${floatIcon} `}>
        <FaImage />
    </button>
    <button id="add" className={`${iconClass} ${floatIcon} `} onClick={addYoutubeVideo}>
        <FaYoutube />
    </button>
    <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${iconClass} ${floatIcon} `}
    >
        <PiCodeBlockFill />
    </button>

  </FloatingMenu>}

  <EditorContent editor={editor} />
  
  <button onClick={()=>{
    const data = JSON.stringify(editor.getHTML())
    // console.log(data)
    // console.log(editor.getJSON())
    // console.log(editor.getText())
    }}>
    get code
  </button>
  </div>
  )
}
export default ProductSpecification