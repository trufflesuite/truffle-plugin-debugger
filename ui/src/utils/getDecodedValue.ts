const getDecodedValue = (inputObj: any) => {
  const typeClass = inputObj.type.typeClass;

  if (inputObj.error) {
    return "NA";
  }

  if (typeClass === "magic") {
    const variable: string = inputObj.type.variable;
    if (
      variable === "block" ||
      variable === "message" ||
      variable === "transaction"
    ) {
      return inputObj.value;
    }
  }

  if (typeClass === "contract") {
    return inputObj.value.address;
  }

  if (typeClass === "int" || typeClass === "uint") {
    return inputObj.value.asBN.toString(); // temporarily converting to string to handle big numbers
  }

  if (typeClass === "bool") {
    return inputObj.value.asBoolean;
  }

  if (typeClass === "string") {
    return inputObj.value.asString;
  }

  if (typeClass === "bytes") {
    return inputObj.value.asHex;
  }

  if (typeClass === "address") {
    return inputObj.value.asAddress;
  }

  if (typeClass === "struct") {
    const data = inputObj.value;
    const arrayOfObjects = data.map(({ name, value }: any) => ({
      [name]: getDecodedValue(value),
    }));
    const mergedObject = arrayOfObjects.reduce(
      (acc: any, curr: any) => Object.assign(acc, curr),
      {}
    );
    return mergedObject;
  }

  if (typeClass === "array") {
    const array = inputObj.value;
    const strArray = array.map(getDecodedValue);
    return strArray;
  }

  return `${typeClass} is currently not supported`;
};

export default getDecodedValue;
