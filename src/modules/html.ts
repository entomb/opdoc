import * as sanitizeHtml from 'sanitize-html'
import { minify as minifyHtml } from 'html-minifier-terser'
import { FnTransformer, FnTransformerFactory } from '../types'
import { generateOfContents, markdown } from './markdown'

export const wrapper: FnTransformerFactory<{ source: string }> = ({ source }) => async content => `<html class="dark [--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]">
<HEAD>
<meta charset="UTF-8">
<title>example?</title>
<script src="https://cdn.tailwindcss.com"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-tomorrow.min.css" integrity="sha512-vswe+cgvic/XBoF1OcM/TeJ2FW0OofqAVdCZiEYkd6dwGXthvkSFWOoGGJgS2CW70VK5dQM5Oh+7ne47s74VTg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<style type="text/tailwindcss"> 
@layer components {
  #nav>ul>li>a {
    @apply mb-8 lg:mb-3 font-bold text-slate-900 dark:text-slate-200 
  }
  #nav>ul>li {
    @apply mb-4
  }
  #nav>ul ul { 
    @apply space-y-6 lg:space-y-2 border-l border-slate-100 text-slate-400 dark:border-slate-800
  }
  #nav ul ul a {
    @apply block border-l pl-4  -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300
  }

  #nav ul ul ul a {
    @apply pl-8 text-slate-500
  }

  #nav a.aActive {
    color: #FFF;
    border-bottom: none;
    border-left: 3px solid #FFF;
    margin-left: -3px;
  }

  #nav>ul>li>a.aActive {
    color: #FFF;
    border-left: none;
    border-bottom: 3px solid #FFF;
    margin-left: 0;
    margin-bottom: -3px;
  }

  h6:hover a,
  h5:hover a,
  h4:hover a,
  h3:hover a,
  h2:hover a,
  h1:hover a {
    display: inline-flex;
  }
}

@layer components {
  main pre {
    @apply m-2 mt-8 mb-8 p-2 max-h-[500px] overflow-auto rounded dark:ring-2 dark:ring-inset dark:ring-white/10 bg-slate-800
  }
}
  </style>
</HEAD>
<body class="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
<div class="overflow-hidden">
  <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
    <div class="hidden scroll-smooth lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
      <nav id="nav" class="lg:text-sm lg:leading-6 relative">
         ${await markdown(generateOfContents(source, 3))}
      </nav>
    </div>
    <div class="lg:pl-[19.5rem]"> 
    <main class="max-w-3xl mx-auto relative z-20 pt-10">
      ${content}
    </main>
    </div>
  </div>
</div>
<script type="text/javascript">
(function() {

  function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  
  const heads = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
  document.getElementById('nav').addEventListener('click', (ev) => {
    if(ev.target.tagName.toLowerCase() === 'a'){
      setTimeout(() => {
        const currentHead = document.querySelector('.aActive');
        if(currentHead) {
          currentHead.classList.remove('aActive');
        }
        ev.target.classList.add('aActive')

      }, 66)
    }
  })

  window.addEventListener('scroll', debounce(() => {
    try{
      const firstHead = heads.filter(h => h.getBoundingClientRect().top > -20).shift()
      const currentA = document.querySelector('#nav a[href="#'+firstHead.id+'"]')

      
      if(currentA){
        const currentHead = document.querySelector('.aActive');
        if(currentHead) {
          currentHead.classList.remove('aActive');
        }
        currentA.classList.add('aActive')
        // window.location.hash = '#' + firstHead.id


        const upperManagement = currentA.parentElement.parentElement.parentElement
        if(upperManagement.id==='nav'){
          currentA.scrollIntoView()
        }else{
          upperManagement.scrollIntoView()
        }

      } 
      console.log(currentA, '#nav a[href="'+firstHead.id+'"]')
    } catch(e){
      console.log(e)
    } 
  },33))
  window.dispatchEvent(new Event('scroll'))
})()
</script>


<style>
main {
  color-scheme: dark;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}
 
main .octicon {
  display: inline-block;
  fill: currentColor;
  vertical-align: text-bottom;
}
 
main h1:hover .anchor .octicon-link:before,
main h2:hover .anchor .octicon-link:before,
main h3:hover .anchor .octicon-link:before,
main h4:hover .anchor .octicon-link:before,
main h5:hover .anchor .octicon-link:before,
main h6:hover .anchor .octicon-link:before {
  width: 16px;
  height: 16px;
  content: ' ';
  display: inline-block;
  background-color: currentColor;
  -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
  mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
}
 
main details,
main figcaption,
main figure {
  display: block;
}
 
main summary {
  display: list-item;
}
 
main [hidden] {
  display: none !important;
}
 
main a {
  background-color: transparent;
  color: #58a6ff;
  text-decoration: none;
}
 
main a:active,
main a:hover {
  outline-width: 0;
}
 
main abbr[title] {
  border-bottom: none;
  text-decoration: underline dotted;
}
 
main b,
main strong {
  font-weight: 600;
}
 
main dfn {
  font-style: italic;
}
 
main h1 {
  margin: .67em 0;
  font-weight: 600;
  padding-bottom: .3em;
  font-size: 2em;
  border-bottom: 1px solid #21262d;
}
 
main mark {
  background-color: rgba(187,128,9,0.15);
  color: #c9d1d9;
}
 
main small {
  font-size: 90%;
}
 
main sub,
main sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
 
main sub {
  bottom: -0.25em;
}
 
main sup {
  top: -0.5em;
}
 
main img {
  border-style: none;
  max-width: 100%;
  box-sizing: content-box;
  background-color: #0d1117;
}
 
main code,
main kbd,
main pre,
main samp {
  font-family: monospace,monospace;
  font-size: 1em;
}
 
main figure {
  margin: 1em 40px;
}
 
main hr {
  box-sizing: content-box;
  overflow: hidden;
  background: transparent;
  border-bottom: 1px solid #21262d;
  height: .25em;
  padding: 0;
  margin: 24px 0;
  background-color: #30363d;
  border: 0;
}
 
main input {
  font: inherit;
  margin: 0;
  overflow: visible;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
 
main [type=button],
main [type=reset],
main [type=submit] {
  -webkit-appearance: button;
}
 
main [type=button]::-moz-focus-inner,
main [type=reset]::-moz-focus-inner,
main [type=submit]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
 
main [type=button]:-moz-focusring,
main [type=reset]:-moz-focusring,
main [type=submit]:-moz-focusring {
  outline: 1px dotted ButtonText;
}
 
main [type=checkbox],
main [type=radio] {
  box-sizing: border-box;
  padding: 0;
}
 
main [type=number]::-webkit-inner-spin-button,
main [type=number]::-webkit-outer-spin-button {
  height: auto;
}
 
main [type=search] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
 
main [type=search]::-webkit-search-cancel-button,
main [type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}
 
main ::-webkit-input-placeholder {
  color: inherit;
  opacity: .54;
}
 
main ::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
 
main a:hover {
  text-decoration: underline;
}
 
main hr::before {
  display: table;
  content: "";
}
 
main hr::after {
  display: table;
  clear: both;
  content: "";
}
 
main table {
  border-spacing: 0;
  border-collapse: collapse;
  display: block;
  width: max-content;
  max-width: 100%;
  overflow: auto;
}
 
main td,
main th {
  padding: 0;
}
 
main details summary {
  cursor: pointer;
}
 
main details:not([open])>*:not(summary) {
  display: none !important;
}
 
main kbd {
  display: inline-block;
  padding: 3px 5px;
  font: 11px ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
  line-height: 10px;
  color: #c9d1d9;
  vertical-align: middle;
  background-color: #161b22;
  border: solid 1px rgba(110,118,129,0.4);
  border-bottom-color: rgba(110,118,129,0.4);
  border-radius: 6px;
  box-shadow: inset 0 -1px 0 rgba(110,118,129,0.4);
}
 
main h1,
main h2,
main h3,
main h4,
main h5,
main h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}
 
main h2 {
  font-weight: 600;
  padding-bottom: .3em;
  font-size: 1.5em;
  border-bottom: 1px solid #21262d;
}
 
main h3 {
  font-weight: 600;
  font-size: 1.25em;
}
 
main h4 {
  font-weight: 600;
  font-size: 1em;
}
 
main h5 {
  font-weight: 600;
  font-size: .875em;
}
 
main h6 {
  font-weight: 600;
  font-size: .85em;
  color: #8b949e;
}
 
main p {
  margin-top: 0;
  margin-bottom: 10px;
}
 
main blockquote {
  margin: 0;
  padding: 0 1em;
  color: #8b949e;
  border-left: .25em solid #30363d;
}
 
main ul,
main ol {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 2em;
}
 
main ol ol,
main ul ol {
  list-style-type: lower-roman;
}
 
main ul ul ol,
main ul ol ol,
main ol ul ol,
main ol ol ol {
  list-style-type: lower-alpha;
}
 
main dd {
  margin-left: 0;
}
 
main tt,
main code {
  font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
  font-size: 12px;
}
 
main pre {
  margin-top: 0;
  margin-bottom: 0;
  font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
  font-size: 12px;
  word-wrap: normal;
}
 
main .octicon {
  display: inline-block;
  overflow: visible !important;
  vertical-align: text-bottom;
  fill: currentColor;
}
 
main ::placeholder {
  color: #484f58;
  opacity: 1;
}
 
main input::-webkit-outer-spin-button,
main input::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
}
 
main .pl-c {
  color: #8b949e;
}
 
main .pl-c1,
main .pl-s .pl-v {
  color: #79c0ff;
}
 
main .pl-e,
main .pl-en {
  color: #d2a8ff;
}
 
main .pl-smi,
main .pl-s .pl-s1 {
  color: #c9d1d9;
}
 
main .pl-ent {
  color: #7ee787;
}
 
main .pl-k {
  color: #ff7b72;
}
 
main .pl-s,
main .pl-pds,
main .pl-s .pl-pse .pl-s1,
main .pl-sr,
main .pl-sr .pl-cce,
main .pl-sr .pl-sre,
main .pl-sr .pl-sra {
  color: #a5d6ff;
}
 
main .pl-v,
main .pl-smw {
  color: #ffa657;
}
 
main .pl-bu {
  color: #f85149;
}
 
main .pl-ii {
  color: #f0f6fc;
  background-color: #8e1519;
}
 
main .pl-c2 {
  color: #f0f6fc;
  background-color: #b62324;
}
 
main .pl-sr .pl-cce {
  font-weight: bold;
  color: #7ee787;
}
 
main .pl-ml {
  color: #f2cc60;
}
 
main .pl-mh,
main .pl-mh .pl-en,
main .pl-ms {
  font-weight: bold;
  color: #1f6feb;
}
 
main .pl-mi {
  font-style: italic;
  color: #c9d1d9;
}
 
main .pl-mb {
  font-weight: bold;
  color: #c9d1d9;
}
 
main .pl-md {
  color: #ffdcd7;
  background-color: #67060c;
}
 
main .pl-mi1 {
  color: #aff5b4;
  background-color: #033a16;
}
 
main .pl-mc {
  color: #ffdfb6;
  background-color: #5a1e02;
}
 
main .pl-mi2 {
  color: #c9d1d9;
  background-color: #1158c7;
}
 
main .pl-mdr {
  font-weight: bold;
  color: #d2a8ff;
}
 
main .pl-ba {
  color: #8b949e;
}
 
main .pl-sg {
  color: #484f58;
}
 
main .pl-corl {
  text-decoration: underline;
  color: #a5d6ff;
}
 
main [data-catalyst] {
  display: block;
}
 
main g-emoji {
  font-family: "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 1em;
  font-style: normal !important;
  font-weight: 400;
  line-height: 1;
  vertical-align: -0.075em;
}
 
main g-emoji img {
  width: 1em;
  height: 1em;
}
 
main::before {
  display: table;
  content: "";
}
 
main::after {
  display: table;
  clear: both;
  content: "";
}
 
main>*:first-child {
  margin-top: 0 !important;
}
 
main>*:last-child {
  margin-bottom: 0 !important;
}
 
main a:not([href]) {
  color: inherit;
  text-decoration: none;
}
 
main .absent {
  color: #f85149;
}
 
main .anchor {
  float: left;
  padding-right: 4px;
  margin-left: -20px;
  line-height: 1;
}
 
main .anchor:focus {
  outline: none;
}
 
main p,
main blockquote,
main ul,
main ol,
main dl,
main table,
main pre,
main details {
  margin-top: 0;
  margin-bottom: 16px;
}
 
main blockquote>:first-child {
  margin-top: 0;
}
 
main blockquote>:last-child {
  margin-bottom: 0;
}
 
main sup>a::before {
  content: "[";
}
 
main sup>a::after {
  content: "]";
}
 
main h1 .octicon-link,
main h2 .octicon-link,
main h3 .octicon-link,
main h4 .octicon-link,
main h5 .octicon-link,
main h6 .octicon-link {
  color: #c9d1d9;
  vertical-align: middle;
  visibility: hidden;
}
 
main h1:hover .anchor,
main h2:hover .anchor,
main h3:hover .anchor,
main h4:hover .anchor,
main h5:hover .anchor,
main h6:hover .anchor {
  text-decoration: none;
}
 
main h1:hover .anchor .octicon-link,
main h2:hover .anchor .octicon-link,
main h3:hover .anchor .octicon-link,
main h4:hover .anchor .octicon-link,
main h5:hover .anchor .octicon-link,
main h6:hover .anchor .octicon-link {
  visibility: visible;
}
 
main h1 tt,
main h1 code,
main h2 tt,
main h2 code,
main h3 tt,
main h3 code,
main h4 tt,
main h4 code,
main h5 tt,
main h5 code,
main h6 tt,
main h6 code {
  padding: 0 .2em;
  font-size: inherit;
}
 
main ul.no-list,
main ol.no-list {
  padding: 0;
  list-style-type: none;
}
 
main ol[type="1"] {
  list-style-type: decimal;
}
 
main ol[type=a] {
  list-style-type: lower-alpha;
}
 
main ol[type=i] {
  list-style-type: lower-roman;
}
 
main div>ol:not([type]) {
  list-style-type: decimal;
}
 
main ul ul,
main ul ol,
main ol ol,
main ol ul {
  margin-top: 0;
  margin-bottom: 0;
}
 
main li>p {
  margin-top: 16px;
}
 
main li+li {
  margin-top: .25em;
}
 
main dl {
  padding: 0;
}
 
main dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: 600;
}
 
main dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}
 
main table th {
  font-weight: 600;
}
 
main table th,
main table td {
  padding: 6px 13px;
  border: 1px solid #30363d;
}
 
main table tr {
  background-color: #0d1117;
  border-top: 1px solid #21262d;
}
 
main table tr:nth-child(2n) {
  background-color: #161b22;
}
 
main table img {
  background-color: transparent;
}
 
main img[align=right] {
  padding-left: 20px;
}
 
main img[align=left] {
  padding-right: 20px;
}
 
main .emoji {
  max-width: none;
  vertical-align: text-top;
  background-color: transparent;
}
 
main span.frame {
  display: block;
  overflow: hidden;
}
 
main span.frame>span {
  display: block;
  float: left;
  width: auto;
  padding: 7px;
  margin: 13px 0 0;
  overflow: hidden;
  border: 1px solid #30363d;
}
 
main span.frame span img {
  display: block;
  float: left;
}
 
main span.frame span span {
  display: block;
  padding: 5px 0 0;
  clear: both;
  color: #c9d1d9;
}
 
main span.align-center {
  display: block;
  overflow: hidden;
  clear: both;
}
 
main span.align-center>span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: center;
}
 
main span.align-center span img {
  margin: 0 auto;
  text-align: center;
}
 
main span.align-right {
  display: block;
  overflow: hidden;
  clear: both;
}
 
main span.align-right>span {
  display: block;
  margin: 13px 0 0;
  overflow: hidden;
  text-align: right;
}
 
main span.align-right span img {
  margin: 0;
  text-align: right;
}
 
main span.float-left {
  display: block;
  float: left;
  margin-right: 13px;
  overflow: hidden;
}
 
main span.float-left span {
  margin: 13px 0 0;
}
 
main span.float-right {
  display: block;
  float: right;
  margin-left: 13px;
  overflow: hidden;
}
 
main span.float-right>span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: right;
}
 
main code,
main tt {
  padding: .2em .4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(110,118,129,0.4);
  border-radius: 6px;
}
 
main code br,
main tt br {
  display: none;
}
 
main del code {
  text-decoration: inherit;
}
 
main pre code {
  font-size: 100%;
}
 
main pre>code {
  padding: 0;
  margin: 0;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}
 
main .highlight {
  margin-bottom: 16px;
}
 
main .highlight pre {
  margin-bottom: 0;
  word-break: normal;
}
 
main .highlight pre,
main pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #161b22;
  border-radius: 6px;
}
 
main pre code,
main pre tt {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}
 
main .csv-data td,
main .csv-data th {
  padding: 5px;
  overflow: hidden;
  font-size: 12px;
  line-height: 1;
  text-align: left;
  white-space: nowrap;
}
 
main .csv-data .blob-num {
  padding: 10px 8px 9px;
  text-align: right;
  background: #0d1117;
  border: 0;
}
 
main .csv-data tr {
  border-top: 0;
}
 
main .csv-data th {
  font-weight: 600;
  background: #161b22;
  border-top: 0;
}
 
main .footnotes {
  font-size: 12px;
  color: #8b949e;
  border-top: 1px solid #30363d;
}
 
main .footnotes ol {
  padding-left: 16px;
}
 
main .footnotes li {
  position: relative;
}
 
main .footnotes li:target::before {
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -24px;
  pointer-events: none;
  content: "";
  border: 2px solid #1f6feb;
  border-radius: 6px;
}
 
main .footnotes li:target {
  color: #c9d1d9;
}
 
main .footnotes .data-footnote-backref g-emoji {
  font-family: monospace;
}
 
main .task-list-item {
  list-style-type: none;
}
 
main .task-list-item label {
  font-weight: 400;
}
 
main .task-list-item.enabled label {
  cursor: pointer;
}
 
main .task-list-item+.task-list-item {
  margin-top: 3px;
}
 
main .task-list-item .handle {
  display: none;
}
 
main .task-list-item-checkbox {
  margin: 0 .2em .25em -1.6em;
  vertical-align: middle;
}
 
main .contains-task-list:dir(rtl) .task-list-item-checkbox {
  margin: 0 -1.6em .25em .2em;
}
 
main ::-webkit-calendar-picker-indicator {
  filter: invert(50%);
}
</style>
</body>
</html>`

export const sanitize: FnTransformer = async content => sanitizeHtml(content)

export const minimize: FnTransformer = async content => minifyHtml(content, {
  minifyCSS: true,
  minifyJS: true,
  collapseWhitespace: true,
  conservativeCollapse: false,
  decodeEntities: true,
})
