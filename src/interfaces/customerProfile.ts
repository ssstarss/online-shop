interface Address {
  id: string;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
}

export default interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
}
