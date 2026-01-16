const mapWorkout = (workout) => {
  if (!workout) {
    return null;
  }

  const plain = workout.toObject ? workout.toObject({ versionKey: false }) : workout;
  const id = plain._id ? String(plain._id) : plain.id;
  const { _id, __v, ...rest } = plain;

  return {
    id,
    ...rest,
  };
};

module.exports = {
  mapWorkout,
};
