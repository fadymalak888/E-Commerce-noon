export interface IOrderLocation {
    street: string,
    city: string,
    postalCode: string
}

export interface IDeleveryMethod{
        id: number,
        methodName: string,
        methodDesc: string | null,
        deliveryTime:string
        , price: number
}


export interface IOrderItems{
        id: number,
        inventoryId: number ,
        orderId: number ,
        price: number,
        quantity: number
}


export interface ISuccessOrder{
    createdDate: string
    deliveryMethod: IDeleveryMethod ,
    id: number ,
    orderItems: IOrderItems[],
    paymentIntentId: string |null,
    shippingAddress: IOrderLocation,
    status: number,
    total: number,
    userId: string
}