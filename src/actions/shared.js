import { getInitialData } from '../utils/api'
import { receiveTweets } from '../actions/tweets'
import { receiveUsers } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'

// we need to export a function that follows the redux thunk pattern
// because we need to make an async dispatch and get some data back

const AUTHED_ID = 'tylermcginnis'


export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, tweets  }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveTweets(tweets))

                dispatch(setAuthedUser(AUTHED_ID))
            })
    }
}

