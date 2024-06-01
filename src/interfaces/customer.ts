export default interface Customer {
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
  password: string;
  addresses: [];
  shippingAddressIds: [];
  billingAddressIds: [];
  isEmailVerified: boolean;
  stores: [];
  authenticationMode: string;
}
