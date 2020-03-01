const addressMap = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  administrative_area_level_2: 'short_name',
  administrative_area_level_3: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

export default place => {
  const addressObject = {
    addressComponents: {},
    formattedAddress: place.formatted_address,
    name: place.name,
    location: {
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lng()
    },
    placeId: place.place_id,
    plusCode: place.plus_code,
    url: place.url
  };

  for (let addressComponent of place.address_components) {
    const addressType = addressComponent.types[0];
    if (addressMap[addressType]) {
      addressObject.addressComponents[addressType] =
        addressComponent[addressMap[addressType]];
    }
  }

  addressObject.addressComponents = JSON.stringify(
    addressObject.addressComponents
  );

  return addressObject;
};
