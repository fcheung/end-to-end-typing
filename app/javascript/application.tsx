import { createRoot } from 'react-dom/client'
import { GetUsersResponse } from './generated_types/users'
import Users from './components/users'
// Entry point for the build script in your package.json

document.addEventListener('DOMContentLoaded', () => {
  const usersContainer = document.querySelector("[data-component='users']")
  if (usersContainer) {
    const propsData = (usersContainer as HTMLElement).dataset.props
    if (propsData) {
      const data = JSON.parse(propsData) as GetUsersResponse
      const root = createRoot(usersContainer)
      root.render(<Users {...data} />)
    }
  }
})
