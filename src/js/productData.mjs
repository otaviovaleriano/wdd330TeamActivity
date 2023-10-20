const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// export function getData(category = "tents") {
//   return fetch(`../json/${category}.json`)
//     .then(convertToJson)
//     .then((data) => data);
// }

export async function getData(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  // console.log(data.Result)
  return data.Result; 
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data2 = await convertToJson(response);
  // console.log(data.Result)
  return data2.Result;
}

// export async function findProductById(id) {
//   const products = await getData();
//   return products.find((item) => item.Id === id);
// }
