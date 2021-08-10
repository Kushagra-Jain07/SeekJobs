import * as firebase from "firebase"
import { validateAll } from "indicative/validator"
import JobModel from "../model/jobModel"

export const postJob = (data) => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId

        const rules = {
            description: "required|min:5",
            address: "required|min:5",
            salary: "required",
            phone: "required|min:10"
        }

        const messages = {
            required: (field) => `*${field} is required`,
            'description.min': '*description is too short',
            'address.min': '*address is too short',
            'phone.min': '*phone no. is too short'
        }

        try {

            await validateAll(data, rules, messages)

            const token = await firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
                return idToken
            })

            const response = await fetch(`https://seekjobs-6c23d.firebaseio.com/allJobs.json?auth=${token}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ownerId: userId,
                    description: data.description,
                    address: data.address,
                    salary: data.salary,
                    phone: data.phone
                })
            })

            if (!response.ok) {
                throw new Error("Something went wrong while posting job")
            }

            const resData = response.json()

            dispatch({
                type: "CREATED_JOB_SUCCESS",
                jobCreated: true,
                jobData: {
                    id: resData.name,
                    description: data.description,
                    address: data.address,
                    salary: data.salary,
                    phone: data.phone,
                    ownerId: userId
                }
            })

        } catch (errors) {
            const formattedErrors = {}
            errors.forEach(error => formattedErrors[error.field] = error.message)

            dispatch({
                type: "CREATE_JOB_FAILED",
                descriptionErrorMessage: formattedErrors.description,
                addressErrorMessage: formattedErrors.address,
                salaryErrorMessage: formattedErrors.salary,
                phoneErrorMessage: formattedErrors.phone
            })
        }
    }
}

export const clearErrorMessage = () => {
    return async dispatch => {
        dispatch({
            type: "CLEAR_ERROR_MESSAGE",
            descriptionErrorMessage: undefined,
            addressErrorMessage: undefined,
            salaryErrorMessage: undefined,
            phoneErrorMessage: undefined,
            jobCreated: false,
            jobUpdated: false
        })
    }
}

export const fetchAllJobs = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId

        try {
            const response = await fetch(`https://seekjobs-6c23d.firebaseio.com/allJobs.json`)

            const resData = await response.json()

            const loadedJobs = []

            for (const key in resData) {
                loadedJobs.push(new JobModel(key, resData[key].ownerId, resData[key].description, resData[key].address, resData[key].salary, resData[key].phone))
            }

            dispatch({
                type: "SET_JOBS",
                allJobs: loadedJobs,
                userOwnJobs: loadedJobs.filter(job => job.ownerId == userId)
            })

        } catch (error) {

        }
    }
}

export const deleteJob = (jobId) => {
    return async (dispatch) => {

        const token = await firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
            return idToken
        })

        await fetch(`https://seekjobs-6c23d.firebaseio.com/allJobs/${jobId}.json?auth=${token}`, {
            method: "DELETE"
        })

        dispatch({
            type: "DELETE_JOB",
            jobId: jobId
        })
    }
}

export const updateJob = (jobId, data) => {
    return async (dispatch) => {

        const rules = {
            description: "required|min:5",
            address: "required|min:5",
            salary: "required",
            phone: "required|min:10"
        }

        const messages = {
            required: (field) => `*${field} is required`,
            'description.min': '*description is too short',
            'address.min': '*address is too short',
            'phone.min': '*phone no. is too short'
        }

        try {

            await validateAll(data, rules, messages)

            const token = await firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
                return idToken
            })

            const response = await fetch(`https://seekjobs-6c23d.firebaseio.com/allJobs/${jobId}.json?auth=${token}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    description: data.description,
                    address: data.address,
                    salary: data.salary,
                    phone: data.phone
                })
            })

            dispatch({
                type: "UPDATE_JOB",
                jobId: jobId,
                jobUpdated: true,
                jobData: {
                    description: data.description,
                    address: data.address,
                    salary: data.salary,
                    phone: data.phone,
                }
            })

        } catch (errors) {
            const formattedErrors = {}
            errors.forEach(error => formattedErrors[error.field] = error.message)

            dispatch({
                type: "CREATE_JOB_FAILED",
                descriptionErrorMessage: formattedErrors.description,
                addressErrorMessage: formattedErrors.address,
                salaryErrorMessage: formattedErrors.salary,
                phoneErrorMessage: formattedErrors.phone
            })
        }
    }
}