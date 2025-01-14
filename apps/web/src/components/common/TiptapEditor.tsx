import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Quote, Redo, Undo } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TipTapEditorProps {
  description: string;
  onChange: (richText: string) => void;
  isDisabled?: boolean;
}

const TipTapEditor = ({ description, onChange, isDisabled = false }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if(isDisabled) return;
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
      editable: ()=>!isDisabled,
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={`min-h-96 rounded-lg border ${isDisabled ? 'opacity-60' : ''}`}>
      <div className="bg-background flex items-center gap-2 border-b p-2">
        <Button
          disabled={isDisabled}
          variant={editor.isActive("bold") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          disabled={isDisabled}
          variant={editor.isActive("italic") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          disabled={isDisabled}
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="h-8 w-8 p-0">
          <List className="h-4 w-4" />
        </Button>
        <Button
          disabled={isDisabled}
          variant={editor.isActive("orderedList") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="h-8 w-8 p-0">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          disabled={isDisabled}
          variant={editor.isActive("blockquote") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="h-8 w-8 p-0">
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          disabled={isDisabled}
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          className="h-8 w-8 p-0">
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          disabled={isDisabled}
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          className="h-8 w-8 p-0">
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent 
        editor={editor} 
        className={`prose h-full max-w-none p-4 ${isDisabled ? 'blur-[0.3px] pointer-events-none' : ''}`} 
      />
    </div>
  );
};

export default TipTapEditor;
