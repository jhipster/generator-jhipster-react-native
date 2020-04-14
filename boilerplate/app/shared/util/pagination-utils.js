/**
 * Retrieve new data when infinite scrolling
 * @param currentData
 * @param incomingData
 * @param links
 */
export const loadMoreDataWhenScrolled = (currentData, incomingData, links) => {
  if (links.first === links.last || !currentData.length) {
    return incomingData
  }
  if (currentData.length >= incomingData.length) {
    return [...currentData, ...incomingData]
  }
  return []
}
