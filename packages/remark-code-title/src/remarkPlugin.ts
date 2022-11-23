import { visit } from "unist-util-visit";
import type * as mdast from "mdast";
import type * as unified from "unified";

export const remarkCodeTitle: unified.Plugin<[], mdast.Root> = () => {
  return (tree) => {
    {
      visit(tree, "code", (node, index, parent) => {
        if (!node.meta) return;
        const [title] = node.meta.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? "";
        if (!title) {
          if (/\stitle/.test(node.meta))
            console.warn(
              `remark-code-title: title attribute is could not be parsed from meta string: ${node.meta}. Please use title="title" format.`
            );
          return;
        }

        const titleNode: mdast.HTML = {
          type: "html",
          value: `<div class="remark-code-title">${title}</div>`,
        };
        parent?.children.splice(index as number, 0, titleNode);
        return (index as number) + 2;
      });
    }
  }
};