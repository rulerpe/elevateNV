import { store } from '../store'

export default (to, form, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/login')
  }
}
