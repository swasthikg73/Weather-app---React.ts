// import React, { createContext, useState } from "react";

// export type ProductType = {
//   sku: string;
//   name: string;
//   price: number;
// };

// const initState: ProductType[] = [
//   {
//     sku: "item0001",
//     name: "Widget",
//     price: 9.99,
//   },
//   {
//     sku: "item0002",
//     name: "Premium Widget",
//     price: 19.99,
//   },
//   {
//     sku: "item0003",
//     name: "Deluxe Widget",
//     price: 29.99,
//   },
// ];

// export type UseProductContextType = {
//   product: ProductType[];
// };

// const initContextState: UseProductContextType = {
//   product: [],
// };

// const productContext = createContext<UseProductContextType>(initContextState);

// constChildrenType = {children?:React.ReactElement| React.ReactElement[]}

// export const ProductsProvider = ({children})=>{

//     const [products, setProducts]  = useState();

//    const values = {products, setProducts}

//     <productContext.Provider value={values}>{children}</productContext.Provider>
// }
