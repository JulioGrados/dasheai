import { Base, Private } from 'layouts-path'

import ListCategories from 'views-path/category/containers/list'

const Categories = () => (
  <Base current='category-list' currentMenu='courses'>
    <ListCategories />
  </Base>
)

export default Private(Categories)
