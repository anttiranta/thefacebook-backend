// Imports
const imageType = require('image-type');

const allowedMimeTypes = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png',
]

const isValid = (imageContent) => {
    const fileContent = Buffer.from(imageContent.base64EncodedData, 'base64');
    if (!fileContent) {
        throw new Error('The image content must be valid base64 encoded data.')
    }

    const sourceMimeType = imageType(fileContent).mime
    if (sourceMimeType != imageContent.mimeType || !isMimeTypeValid(sourceMimeType)) {
        throw new Error('The image MIME type is not valid or not supported.');
    }
    if (!isNameValid(imageContent.name)) {
        throw new Error('Provided image name contains forbidden characters.')
    }
    return true
}

const isMimeTypeValid = (mimeType) => {
    return allowedMimeTypes.includes(mimeType)
}

const isNameValid = (name) => {
    if (name === undefined || name === null) {
        return false
    }

    let regex = /^[^\\/?*:";<>()|{}\\\\]+$/
    if (regex.test(name) === false) {
        return false
    }
    return true
}

module.exports = { isValid }