import { Renderer, Lexer, marked } from "marked"
import { slug } from "./helpers"
import { emojify } from 'node-emoji'




const heading: Renderer['heading'] = (text, level) => {
  const classname = () => {
    switch (level) {
      case 1: return "mt-8 mb-2 text-3xl sm:text-4xl font-extrabold"
      case 2: return "mt-4 mb-2 text-2xl sm:text-3xl font-extrabold"
      case 3: return "mt-2 mb-2 text-xl sm:text-2xl font-bold"
      default:
        return "mt-8 mb-2 text-lg sm:text-xl font-bold"
    }
  };

  return `${level === 1 ? `</article><article data-for="${slug(text)}">` : ''}<h${level} class="${classname()} text-slate-900 tracking-tight dark:text-slate-200" id="${slug(text)}">
  ${text} <a href="#${slug(text)}" class="ml-2 inline-flex hidden" aria-label="Anchor">&#128279;</a>
</h${level}>`
}

const strong: Renderer['strong'] = (text) => {
  return `<b class="font-bold">${text}</b>`
}

export const emoji = {
  name: 'emoji',
  level: 'inline',                         // This is an inline-level tokenizer
  start(src: string): number { return src.indexOf(':'); }, // Hint to Marked.js to stop and check for a match
  tokenizer(src: string, tokens: any): any {
    const rule = /^:(\w+):/;               // Regex for the complete token, anchor to string start
    const match = rule.exec(src);
    if (match) {
      return {                             // Token to generate
        type: 'emoji',                     // Should match "name" above
        raw: match[0],                     // Text to consume from the source
        emoji: match[1]                    // Additional custom properties
      };
    }
  },
  renderer(token: any): string {
    return `<span class="ec ec-${token.emoji}"></span>`;
  }
};


export const dangerquote = {
  name: 'dangerquote',
  level: 'inline',
  start(src: string): number { return src.indexOf('!>'); },
  tokenizer(src: string, tokens: any): any {
    const rule = /^( {0,3}!> ?(paragraph|[^\n]*)(?:\n|$))+/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'dangerquote',
        raw: "   " + match[1],
        text: "   " + match[2],
      };
    }
  },
  renderer(token: any): string {
    return `<blockquote class="danger">${marked.parse(token.text)}</blockquote>`;
  }
};

export const infoquote = {
  name: 'infoquote',
  level: 'inline',
  start(src: string): number { return src.indexOf('?>'); },
  tokenizer(src: string, tokens: any): any {
    const rule = /^( {0,3}\?> ?(paragraph|[^\n]*)(?:\n|$))+/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'infoquote',
        raw: "   " + match[1],
        text: "   " + match[2],
      };
    }
  },
  renderer(token: any): string {
    return `<blockquote class="info">${marked.parse(token.text)}</blockquote>`;
  }
};


export const renderer: Partial<Renderer> = {
  heading,
  strong: (text) => `<b class="font-bold">${text}</b>`,
  // text: (text) => `<p class="mt-4 mb-4 font-md">${text}</b>`
}






  // constructor(options?: MarkedOptions);
  // options: MarkedOptions;
  // code(this: Renderer | RendererThis, code: string, language: string | undefined, isEscaped: boolean): string | T;
  // blockquote(this: Renderer | RendererThis, quote: string): string | T;
  // html(this: Renderer | RendererThis, html: string): string | T;
  // heading(
  //     this: Renderer | RendererThis,
  //     text: string,
  //     level: 1 | 2 | 3 | 4 | 5 | 6,
  //     raw: string,
  //     slugger: Slugger,
  // ): string | T;
  // hr(this: Renderer | RendererThis): string | T;
  // list(this: Renderer | RendererThis, body: string, ordered: boolean, start: number): string | T;
  // listitem(this: Renderer | RendererThis, text: string, task: boolean, checked: boolean): string | T;
  // checkbox(this: Renderer | RendererThis, checked: boolean): string | T;
  // paragraph(this: Renderer | RendererThis, text: string): string | T;
  // table(this: Renderer | RendererThis, header: string, body: string): string | T;
  // tablerow(this: Renderer | RendererThis, content: string): string | T;
  // tablecell(
  //     this: Renderer | RendererThis,
  //     content: string,
  //     flags: {
  //         header: boolean;
  //         align: 'center' | 'left' | 'right' | null;
  //     },
  // ): string | T;
  // strong(this: Renderer | RendererThis, text: string): string | T;
  // em(this: Renderer | RendererThis, text: string): string | T;
  // codespan(this: Renderer | RendererThis, code: string): string | T;
  // br(this: Renderer | RendererThis): string | T;
  // del(this: Renderer | RendererThis, text: string): string | T;
  // link(this: Renderer | RendererThis, href: string | null, title: string | null, text: string): string | T;
  // image(this: Renderer | RendererThis, href: string | null, title: string | null, text: string): string | T;
  // text(this: Renderer | RendererThis, text: string): string | T;