import { Base, Private } from 'layouts-path'

import AddCategory from 'views-path/category/containers/add'

const Add = () => (
  <Base current='category-list' currentMenu='category'>
    <AddCategory />
  </Base>
)

export default Private(Add)
