// FAQ answers may link an apartment name to its listing with `[text](home:<apartment id>)`.
const LINK = /\[([^\]]+)\]\(home:([a-z0-9-]+)\)/g;

/** Answer split into plain strings and `{ text, homeId }` links, for rendering. */
export function answerParts(answer) {
  const parts = [];
  let last = 0;
  for (const m of answer.matchAll(LINK)) {
    if (m.index > last) parts.push(answer.slice(last, m.index));
    parts.push({ text: m[1], homeId: m[2] });
    last = m.index + m[0].length;
  }
  if (last < answer.length) parts.push(answer.slice(last));
  return parts;
}

/** Answer without link markup, for structured data. */
export const answerText = (answer) => answer.replace(LINK, '$1');

/** Element id of an apartment card; `/#casa-<id>` opens that apartment's details. */
export const homeAnchor = (id) => `casa-${id}`;
