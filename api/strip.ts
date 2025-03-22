const strippables = ['_server_messages'] as const;

export const strip = <T>(data: T) => {
  const stripped = data;

  // If the data is not an object, return it as is.
  if (typeof stripped !== 'object' || stripped === null) {
    return stripped;
  }

  // Remove strippable keys from the object.
  for (const strippable of strippables) {
    if (strippable in stripped) {
      delete stripped[strippable];
    }
  }

  return stripped;
};
