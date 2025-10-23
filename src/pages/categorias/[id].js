import { Base, Private } from 'layouts-path'

import EditCategory from 'views-path/category/containers/edit'

const Edit = () => (
  <Base current='category-list' currentMenu='category'>
    <EditCategory />
  </Base>
)

export default Private(Edit)
