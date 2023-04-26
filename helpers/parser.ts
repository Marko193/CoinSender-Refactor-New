const EXTENSION = ["xlsx", "xls", "csv"];

export const getExtention = (file: any) => {
  const parts = file.name.split(".");
  const extension = parts[parts.length - 1];
  return EXTENSION.includes(extension);
};

export const convertToJson = (data: any) => {
  return data.map((item: string[] | number[]) => {
    return {
      employee_name: item[0] ?? '',
      wallet_address: item[1] ?? '',
      amount: item[2] ?? ''
    }
  })
};

export const removeExistingObjectsByWalletId = (arr1: any, arr2: any) => {
  return [].concat(
    arr1.filter((obj2: any) =>
      arr2.every((obj1: any) => obj2.wallet_address !== obj1.wallet_address),
    ),
  ).map(({
           name: employee_name,
           id: member_id,
           amount,
           wallet_address,
         }) => ({
    member_id,
    amount,
    wallet_address,
    employee_name,
  }));
};

export const getDifference = (arr1: any[], arr2: any[]) => {
  return arr1.filter(object1 => {
    return arr2.some(object2 => {
      return object1.wallet_address === object2.wallet_address;
    });
  });
}

export const getRepeatedTransfersWalletsList = (arr1: any, arr2: any) => {
  const difference = [
    ...getDifference(arr1, arr2),
    ...getDifference(arr2, arr1)
  ];

  return difference.filter((obj, index) => {
    return index === difference.findIndex((o: { wallet_address: any }) => obj.wallet_address === o.wallet_address);
  }).map(el => el.wallet_address);
};

