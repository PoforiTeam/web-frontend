import {
  MDXEditor,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import React from "react";

const Editor = () => {
  return (
    <MDXEditor
      markdown={"# Hello from MDX Editor"}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
      ]}
      contentEditableClassName="mdx-editor"
      onChange={console.log}
    />
  );
};

export default Editor;
