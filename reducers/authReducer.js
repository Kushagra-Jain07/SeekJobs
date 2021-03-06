
export default (state = {}, action) => {
    switch (action.type) {
        case "LOGGED IN":
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                name: action.name,
                image: action.name
            }

        default:
            return state
    }
}