import { Base, Private } from 'layouts-path'

import EditBlog from 'views-path/blog/containers/edit'

const Edit = () => (
  <Base current='blog' currentMenu='blog'>
    <EditBlog />
  </Base>
)

export default Private(Edit)
