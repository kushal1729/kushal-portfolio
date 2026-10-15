import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

export type Heading = { id: string; text: string };

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const textOf = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
};

/* Gives every top-level <h2> in a post body an id, and returns the list of
   them, so the post can carry a table of contents and linkable sections
   without the posts having to author ids by hand. */
export function outline(body: ReactNode) {
  const headings: Heading[] = [];
  const root = isValidElement<{ children?: ReactNode }>(body)
    ? body.props.children
    : body;

  const content = Children.map(root, (child) => {
    if (!isValidElement<{ children?: ReactNode; id?: string }>(child) || child.type !== "h2") {
      return child;
    }
    const text = textOf(child.props.children);
    const id = slugify(text);
    headings.push({ id, text });
    return cloneElement(child as ReactElement<{ id?: string }>, { id });
  });

  return { content, headings };
}
