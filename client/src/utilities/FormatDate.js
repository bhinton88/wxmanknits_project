

export function formatDate (timeStamp) {
  const updatedStamp= timeStamp.split(/[- : T]/)
  const dateStamp = new Date(updatedStamp[0], updatedStamp[1]-1, updatedStamp[2])

  return dateStamp.toDateString()
}