import * as sanitizeHtml from 'sanitize-html'
import { minify as minifyHtml } from 'html-minifier-terser'
import { FnTransformer, FnTransformerFactory } from '../types'
import { generateOfContents, markdown } from './markdown'

export const wrapper: FnTransformerFactory<{ source: string }> = ({ source }) => async content => `<html class="dark [--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]">
<HEAD>
<meta charset="UTF-8">
<title>example?</title>
<script src="https://cdn.tailwindcss.com"></script>
<style type="text/tailwindcss"> 
@layer components {
  #nav>ul>li>a {
    @apply mb-8 lg:mb-3 font-bold text-slate-900 dark:text-slate-200 
  }
  #nav>ul {
    @apply mb-8
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


  h6:hover a,
  h5:hover a,
  h4:hover a,
  h3:hover a,
  h2:hover a,
  h1:hover a {
    display: inline-flex;
  }
}
  </style>
</HEAD>
<body class="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
<div class="overflow-hidden">
  <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
    <div class="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
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
