export default ({
  created,
  episode,
  gender,
  image,
  location,
  name,
  origin,
  species,
  status,
  type,
} = {}) => ({
  name,
  image,
  created: created ? new Date(created).toLocaleString() : undefined,
  episode: episode?.length,
  gender,
  location: location?.name,
  origin: origin?.name,
  species,
  status,
  type,
});