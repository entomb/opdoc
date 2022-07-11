import * as sanitizeHtml from 'sanitize-html'
import {FnTransformer} from '../types'

export const wrapper: FnTransformer = async content => `<html>
<HEAD>
<title>example?</title>
</HEAD>
<body>
  ${content}
</body>
</html>`

export const sanitize: FnTransformer = async content => sanitizeHtml(content)
