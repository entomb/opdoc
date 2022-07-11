import {FnTransformer} from '../types'

export const wrapper: FnTransformer = async content => `<html>
<HEAD>
<title>example?</title>
</HEAD>
<body>
  ${content}
</body>
</html>`
