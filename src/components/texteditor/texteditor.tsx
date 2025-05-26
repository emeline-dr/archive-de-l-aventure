import { useEditor, EditorContent } from "@tiptap/react";

import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from '@tiptap/starter-kit';
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";

export function TiptapEditor({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Underline,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Écrivez votre commentaire…",
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;


  return (
    <div className="border border-secondary rounded-md mx-auto">
      {/* Toolbar */}
      <div className="flex gap-[8px] p-[8px] bg-primary flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "font-bold bg-gray-200 px-2 rounded"
              : "px-2"
          }
        >
          <span className="cursor-pointer">B</span>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "italic bg-gray-200 px-2 rounded"
              : "px-2"
          }
        >
          <span className="cursor-pointer">I</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline")
              ? "underline bg-gray-200 px-2 rounded"
              : "px-2"
          }
        >
          <span className="cursor-pointer">U</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList") ? "bg-gray-200 px-2 rounded" : "px-2"
          }
        >
          <span className="cursor-pointer">• List</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList") ? "bg-gray-200 px-2 rounded" : "px-2"
          }
        >
          <span className="cursor-pointer">1. List</span>
        </button>
        <button
          onClick={() => editor.chain().focus().setSuperscript().run()}
          className={
            editor.isActive("superscript") ? "bg-gray-200 px-2 rounded" : "px-2"
          }
        >
          <span className="cursor-pointer">
            x<sup>2</sup>
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().setSubscript().run()}
          className={
            editor.isActive("subscript") ? "bg-gray-200 px-2 rounded" : "px-2"
          }
        >
          <span className="cursor-pointer">
            x<sub>2</sub>
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" })
              ? "bg-gray-200 px-2 rounded"
              : "px-2"
          }
        >
          <span className="cursor-pointer">⬅</span>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "bg-gray-200 px-2 rounded"
              : "px-2"
          }
        >
          <span className="cursor-pointer">⬍</span>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" })
              ? "bg-gray-200 px-2 rounded"
              : "px-2"
          }
        >
          <span className="cursor-pointer">➡</span>
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={
            editor.isActive("link") ? "bg-gray-200 px-2 rounded" : "px-2"
          }
        >
          <span className="cursor-pointer">🔗</span>
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="px-2"
        >
          <span className="cursor-pointer">❌🔗</span>
        </button>
      </div>
      <EditorContent className="p-[16px] prose max-w-none" editor={editor} />
    </div>
  );
}
