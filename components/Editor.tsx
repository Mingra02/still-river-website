"use client";
// @ts-ignore
import {
  BlockTypeSelect,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  InsertTable,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  Separator,
  StrikeThroughSupSubToggles,
  headingsPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  linkDialogPlugin,
  listsPlugin,
  tablePlugin,
  diffSourcePlugin,
  imagePlugin,
  quotePlugin,
  linkPlugin,
  codeBlockPlugin,
  markdownShortcutPlugin,
  CodeBlockNode,
  InsertCodeBlock,
  CodeToggle,
  CodeMirrorEditor,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  codeMirrorPlugin,
  thematicBreakPlugin,
  // @ts-ignore
} from "@mdxeditor/editor";
import { FC } from "react";

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
  return (
    <>
      <div className="dark mt-4 min-h-48 max-w-7xl rounded border border-white/10 bg-white/15 p-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-50">
        <MDXEditor
          contentEditableClassName="prose prose-invert dark dark-theme !max-w-none"
          ref={editorRef}
          markdown={markdown}
          plugins={[
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <DiffSourceToggleWrapper>
                    <UndoRedo />
                    <Separator />
                    <BoldItalicUnderlineToggles />
                    <Separator />
                    <StrikeThroughSupSubToggles />
                    <Separator />
                    <ListsToggle />
                    <Separator />
                    <BlockTypeSelect />
                    <Separator />
                    <CreateLink />
                    {/* <InsertImage /> */}
                    <Separator />
                    <InsertTable />
                    <InsertCodeBlock />
                  </DiffSourceToggleWrapper>
                </>
              ),
            }),
            linkPlugin(),
            linkDialogPlugin(),
            listsPlugin(),
            tablePlugin(),
            diffSourcePlugin(),
            // imagePlugin(),
            headingsPlugin(),
            quotePlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: "python" }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                js: "JavaScript",
                css: "CSS",
                txt: "text",
                tsx: "TypeScript",
                ts: "TypeScript",
                python: "Python",
              },
            }),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
          ]}
        />
      </div>
    </>
  );
};

export default Editor;
