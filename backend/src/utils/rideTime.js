const calculateRideDuration = (fromPincode, toPincode) => {
  const from = parseInt(fromPincode, 10);
  const to = parseInt(toPincode, 10);
  return Math.abs(to - from) % 24;
};

export const getRideSpan = (fromPincode, toPincode, startTime) => {
  const start = new Date(startTime);
  const estimatedRideDurationHours = calculateRideDuration(
    fromPincode,
    toPincode
  );
  const end = new Date(
    start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000
  );

  return { start, end, estimatedRideDurationHours };
};
