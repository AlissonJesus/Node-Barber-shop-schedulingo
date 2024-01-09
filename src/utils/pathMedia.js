const createPathString = (fileName, id, model) => {
    const typeMedia = fileName.split(".").pop()
    const currentDate = new Date().getTime()
    return `${model}/${id}/${currentDate}.${typeMedia}`
}

export default createPathString