const mimeTypeExtensionMap = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/png': 'png',
}

const getMimeTypeExtension = (mimeType) => {
    if (mimeTypeExtensionMap[mimeType] && mimeTypeExtensionMap[mimeType] !== null) {
        return mimeTypeExtensionMap[mimeType]
    } else {
        return ""
    }
}

module.exports = {
    getMimeTypeExtension
}