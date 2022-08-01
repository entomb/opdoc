import * as sanitizeHtml from 'sanitize-html'
import { minify as minifyHtml } from 'html-minifier-terser'
import { FnTransformer, FnTransformerFactory } from '../types'
import { generateOfContents, markdown } from './markdown'

export const wrapper: FnTransformerFactory<{ source: string }> = ({ source }) => async content => `<html class="dark [--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]">
<HEAD>
<meta charset="UTF-8">
<title>example?</title>
<script src="https://cdn.tailwindcss.com?plugins=typography"></script> 
<script>
tailwind.config = {
  darkMode: 'class', 
}
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/alohe/emojicloud/emojicloud.css" />
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
    border-bottom: none;
    border-left: 3px solid;
    margin-left: -3px;
    @apply text-slate-800 dark:text-slate-100 border-slate-800 dark:border-slate-100
  }

  #nav>ul>li>a.aActive {
    border-left: none;
    border-bottom: 3px solid;
    margin-left: 0;
    margin-bottom: -3px;
    @apply text-slate-800 dark:text-slate-100 border-slate-800 dark:border-slate-100
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
  ${DarkModeButton()}
  <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
    <div class="hidden scroll-smooth lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
    <nav id="nav" class="lg:text-sm lg:leading-6 relative">
         ${await markdown(generateOfContents(source, 3))}
      </nav>
    </div>
    <div class="lg:pl-[19.5rem]"> 
    <main class="max-w-3xl mx-auto relative z-20 pt-10 prose prose-md prose-slate dark:prose-invert"> 
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
:root {
  --theme-color: #42b983;
  --primary: #42b983;
  --primary-dark: #0e3a26;
  --primary-light: #bed3ca;
  --primary-lighter: #E6FFE9;
  --faded: #f8f8f8;
}

main h3+table thead>tr>th:first-child {
  text-align: center;
  min-width: 160px;
}

main h3+table tbody>tr>td:first-child {
  text-align: right;
  background-color: #FFF;
}

main h3+table tbody>tr:first-child>td:last-child {
  font-size: 1.1em;
}

main li>code,
main td>code {
  color: var(--primary) !important;
  border: 1px solid var(--primary-light);
  border-radius: 5px !important;
  font-size: .8em;
}

main h3+table th {
  background-color: var(--primary-light);
}

main h3+table tr>td:last-child {
  background-color: #FFF !important;
}

main h3+table tr>td:first-child {
  background-color: #CCC !important;
}
  

main h2 { 
  border-bottom: 2px solid #FFF; 
}

main h3 {
  margin-top: 3rem;
  border-bottom: 1px solid  #FFF;
  padding-top: 8px;
}

main em {
  border: 1px solid var(--primary-light);
  border-radius: 5px;
  padding: 3px 8px;
  margin: 2px 4px;
  color: var(--primary-dark);
  font-style: normal !important;
  display: inline-block;
  font-weight: bold;
  font-size: .9em;
}

main li>em {
  padding: 0px 8px;
}

main blockquote {
  background-color: var(--faded);
  margin: 1em 0;
  padding: 1px 24px 1px 30px;
}

main blockquote p {
  color: var(--primary-dark);
  font-weight: normal !important;
  font-size: 1.1em;
}

main p.tip {
  font-size: 1.1em;
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




const DarkModeButton = (): string => {
  return `<button
  id="theme-toggle"
  type="button"
  class="fixed m-5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5"
>
  <svg
    id="theme-toggle-dark-icon"
    class="w-5 h-5 hidden"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
    ></path>
  </svg>
  <svg
    id="theme-toggle-light-icon"
    class="w-5 h-5 hidden"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
</button>
<script>
if (
  localStorage.getItem('color-theme') === 'dark' ||
  (!('color-theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
(function(){
  var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
  
  // Change the icons inside the button based on previous settings
  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      themeToggleLightIcon.classList.remove('hidden');
  } else {
      themeToggleDarkIcon.classList.remove('hidden');
  }
  
  var themeToggleBtn = document.getElementById('theme-toggle');
  
  themeToggleBtn.addEventListener('click', function() {
  
      // toggle icons inside button
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');
  
      // if set via local storage previously
      if (localStorage.getItem('color-theme')) {
          if (localStorage.getItem('color-theme') === 'light') {
              document.documentElement.classList.add('dark');
              localStorage.setItem('color-theme', 'dark');
          } else {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('color-theme', 'light');
          }
  
      // if NOT set via local storage previously
      } else {
          if (document.documentElement.classList.contains('dark')) {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('color-theme', 'light');
          } else {
              document.documentElement.classList.add('dark');
              localStorage.setItem('color-theme', 'dark');
          }
      }
      
  });
})()
</script>

`
}