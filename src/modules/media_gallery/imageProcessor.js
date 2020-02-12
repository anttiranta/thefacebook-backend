// Imports
const fs = require('fs').promises;
const path = require('path');

// App Imports
const contentValidator = require('./imageContentValidator')
const mimeTypeExtensionMap = require('./mimeTypeExtensionMap')

const processImageContent = async (userId, imageContent) => {
    if (!contentValidator.isValid(imageContent)) {
        throw new Error('The image content is not valid.')
    }

    const fileContent = Buffer.from(imageContent.base64EncodedData, 'base64')
    const destinationFolder = path.join(__dirname, '..', '..', '..', 'public', 'images', 'uploads', 'user', 'photos')
    const fileName = getFileName(imageContent)
    const destFileName = userId + '-' + Date.now() + '-' + fileName 
    const absolutePath = getAbsolutePath(destinationFolder, destFileName)

    try {
        await fs.writeFile(absolutePath, fileContent)
    } catch (exception) {
        throw new Error('The file couldn\'t be saved.')
    }
    
    return getAbsolutePath(
        path.join('images', 'uploads', 'user', 'photos'), 
        destFileName
    )
}

const getAbsolutePath = (basePath, fileName) => {
    const lastChar = basePath.substr(basePath.length - 1)
    return basePath + (lastChar === '\\' ? '' : '\\') + fileName 
}

const getFileName = function (imageContent) {
    let fileName = imageContent.name
    if (!path.extname(fileName)) {
        if (!imageContent.mimeType 
            || !mimeTypeExtensionMap.getMimeTypeExtension(imageContent.mimeType))  {
                throw new Error('Cannot recognize image extension.')
            }
        fileName += '.' + mimeTypeExtensionMap.getMimeTypeExtension(imageContent.mimeType)
    }
    return fileName
}

module.exports = { processImageContent }