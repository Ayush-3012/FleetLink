export function calculateRideDuration(fromPincode, toPincode) {
  const from = parseInt(fromPincode, 10);
  const to = parseInt(toPincode, 10);
  return Math.abs(to - from) % 24; 
}
