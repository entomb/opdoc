import {marked, Renderer } from 'marked'
import {FnTransformer, FnTransformerFactory, TokenHeading} from '../types'
import { slug } from './helpers'

// Override render functions
const tocLink = (text:string):string => `- [${text}](#${slug(text)})`
const renderer: Partial<Renderer> = {
  heading(text: string, level: 1|2|3|4|5|6) {
    const escapedText = slug(text)

    return `<h${level}>
  <a name="${escapedText}" class="anchor" href="#${escapedText}">
    <span class="header-link">#!</span>
  </a>
  ${text}
</h${level}>`
  },
}


export const generateOfContents = (source: string, depth: number):string => {
  return (marked
    .lexer(source)
    .filter(t => t.type === 'heading') as TokenHeading[])
    .filter(h => h.depth <= depth)
    .map((heading) => new Array(heading.depth-1).fill("  ").concat(tocLink(heading.text)).join(""))
    .join("\n")
}


marked.use({renderer})
marked.setOptions({
  gfm: true,
  smartypants: false,
  // renderer: new marked.Renderer(),
  // highlight: function(code, lang) {
  //   const hljs = require('highlight.js');
  //   const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  //   return hljs.highlight(code, { language }).value;
  // },
  // smartLists: true,
  // xhtml: false
})

export const markdown: FnTransformer = async source => {
  return marked.parse(source)
}

export const tableOfContents: FnTransformerFactory<{
  finder: string, 
  depth: 1 | 2 | 3 | 4 | 5 | 6
}> = ({finder, depth}) => async source => {
  return source.replace(finder, generateOfContents(source, depth))
}




//export const tableOfContents: FnTransformer = async source => TOC.process(source)
