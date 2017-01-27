function parseJSON (jsonString) {
  let result = {}
  try {
    result = JSON.parse(jsonString)
  } catch (e) {
    console.error(`[TopedAPI] Error parsing ${jsonString} to JSON. Message: ${e.getMessage}`)
    result = {}
  }

  return result
}
module.exports = parseJSON
