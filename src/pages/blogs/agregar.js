import { Base, Private } from 'layouts-path'

import AddBlog from 'views-path/blog/containers/add'

const Add = () => (
  <Base current='blog' currentMenu='blog'>
    <AddBlog />
  </Base>
)

export default Private(Add)
