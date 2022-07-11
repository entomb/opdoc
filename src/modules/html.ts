import * as sanitizeHtml from 'sanitize-html'
import { minify as minifyHtml } from 'html-minifier-terser'

import { FnTransformer } from '../types'

export const wrapper: FnTransformer = async content => `<html>
<HEAD>
<title>example?</title>
</HEAD>
<body>
  ${content}
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
