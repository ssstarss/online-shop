interface Address {
  id: string;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Customer {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: Address[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: [];
  authenticationMode: string;
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
}

export type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K];
};
