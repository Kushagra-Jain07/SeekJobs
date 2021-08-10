import JobModel from "../model/jobModel"

const initialState = {
    availableJobs: [],
    userOwnJobs: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "CREATED_JOB_SUCCESS":

            const newJob = new JobModel(action.jobData.id, action.jobData.ownerId, action.jobData.description, action.jobData.address, action.jobData.salary, action.jobData.phone)
            return {
                ...state,
                availableJobs: state.availableJobs.concat(newJob),
                userOwnJobs: state.userOwnJobs.concat(newJob),
                jobCreated: action.jobCreated
            }

        case "CREATE_JOB_FAILED":
            return {
                ...state,
                descriptionErrorMessage: action.descriptionErrorMessage,
                addressErrorMessage: action.addressErrorMessage,
                salaryErrorMessage: action.salaryErrorMessage,
                phoneErrorMessage: action.phoneErrorMessage
            }

        case "CLEAR_ERROR_MESSAGE":
            return {
                ...state,
                descriptionErrorMessage: action.descriptionErrorMessage,
                addressErrorMessage: action.addressErrorMessage,
                salaryErrorMessage: action.salaryErrorMessage,
                phoneErrorMessage: action.phoneErrorMessage,
                jobCreated: action.jobCreated,
                jobUpdated: action.jobUpdated
            }

        case "SET_JOBS":
            return {
                ...state,
                availableJobs: action.allJobs.sort((a, b) => {
                    return 0.5 - Math.random()
                }),
                userOwnJobs: action.userOwnJobs
            }

        case "DELETE_JOB":
            return {
                ...state,
                userOwnJobs: state.userOwnJobs.filter(job => job.id !== action.jobId),
                availableJobs: state.availableJobs.filter(job => job.id !== action.jobId)
            }

        case "UPDATE_JOB":
            return {
                ...state,
                jobUpdated: action.jobUpdated
            }

        default:
            return state
    }
}