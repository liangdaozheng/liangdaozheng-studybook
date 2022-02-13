export function hitTextObject(A, B) {
  return (
    A.x + A.width >= B.x &&
    B.x + B.width >= A.x &&
    A.y + A.height >= B.y &&
    B.y + B.height >= A.y
  )
}