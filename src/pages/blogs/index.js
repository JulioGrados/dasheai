import { Base, Private } from 'layouts-path'

import ListBlogs from 'views-path/blog/containers/list'

const Blogs = () => (
  <Base current='blog' currentMenu='blog'>
    <ListBlogs />
  </Base>
)

export default Private(Blogs)
