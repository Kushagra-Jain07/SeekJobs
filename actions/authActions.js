import * as firebase from "firebase"

export const loggedIn = (userId, token, name, image) => {
    return async dispatch => {
        dispatch({
            type: "LOGGED IN",
            userId: userId,
            token: token,
            name: name,
            image: image
        })
    }
}



export const loggedOut = () => {
    return async dispatch => {
        firebase.auth().signOut()
            .then(() => {
                dispatch({
                    type: "LOGGED IN",
                    userId: undefined,
                    token: undefined,
                    name: undefined,
                    image: undefined
                })
            })
    }
}