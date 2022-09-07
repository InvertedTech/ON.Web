export default function ({ redirect, store }) {
  const isOwner = store.getters['auth/isOwner']
  if (!isOwner) {
    redirect({ name: 'login' })
  }
}