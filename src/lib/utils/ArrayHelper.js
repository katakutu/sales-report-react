const ArrayHelper = {
  chunck: (arr, length) => {
    let result = []
    let copy = arr.slice()
    while (copy.length) {
      result.push(copy.splice(0, length))
    }

    return result
  }
}

export default ArrayHelper
