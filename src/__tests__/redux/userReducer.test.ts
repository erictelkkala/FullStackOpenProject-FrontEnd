import { describe, expect, it } from 'vitest'

import { setUser, userReducer, UserState } from '../../redux/reducers/user'
import { setupStore } from '../../redux/store'

describe('UserReducer', () => {
  it('initial state is empty', () => {
    const state = userReducer(undefined, { type: 'unknown' })
    expect(state).toEqual({ user: '' })
  })

  it('setUser sets the user in the store', async () => {
    const store = setupStore()
    const dispatch = store.dispatch
    const user = 'testUser'

    dispatch(setUser(user))
    const state: UserState = store.getState().user
    expect(state.user).toEqual('testUser')
  })
})
