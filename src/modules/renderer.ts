import { Renderer } from "marked"
import { slug } from "./helpers"

const heading: Renderer['heading'] = (text, level) => {
  const escapedText = slug(text)

  const classname = () => {
    switch (level) {
      case 1: return "text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200"
      default:
        return "text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200"
    }
  };

  return `<h${level} class="${classname()}" id="#${escapedText}">
  ${text}
  <a href="#${escapedText}" class="absolute -ml-10 flex items-center opacity-0 border-0 group-hover:opacity-100" aria-label="Anchor">
    <div class="w-6 h-6 text-slate-400 ring-1 ring-slate-900/5 rounded-md shadow-sm flex items-center justify-center hover:ring-slate-900/10 hover:shadow hover:text-slate-700 dark:bg-slate-700 dark:text-slate-300 dark:shadow-none dark:ring-0"><svg width="12" height="12" fill="none" aria-hidden="true"><path d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg></div>
  </a>
</h${level}>`


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
}




export const renderer: Partial<Renderer> = {
  heading,
}