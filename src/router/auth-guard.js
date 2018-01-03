import { store } from '../store'

export default (to, form, next) => {
  console.log(store.getters.user)
  if (store.getters.user) {
    next()
  } else {
    next()
  }
}
