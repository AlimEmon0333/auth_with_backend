const sendResponse = (isSuccessfull, message, data) => {
    return {
        isSuccessfull: isSuccessfull,
        message: isSuccessfull ? message : null,
        error: !isSuccessfull ? message : null,
        data: data
    }
}

module.exports = sendResponse