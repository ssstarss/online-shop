export default interface AuthResponse {
  body: {
    customer: {
      id: string;
      version: number;
      versionModifiedAt: string;
      lastMessageSequenceNumber: number;
      createdAt: string;
      lastModifiedAt: string;
      lastModifiedBy: {
        isPlatformClient: boolean;
        user: {
          typeId: string;
          id: string;
        };
      };
      createdBy: {
        isPlatformClient: boolean;
        user: {
          typeId: string;
          id: string;
        };
      };
      email: string;
      firstName: string;
      lastName: string;
      middleName: string;
      title: string;
      salutation: string;
      dateOfBirth: string;
      password: string;
      addresses: string[]; // You can define a proper type for addresses if needed
      shippingAddressIds: string[];
      billingAddressIds: string[];
      isEmailVerified: boolean;
      stores: string[]; // You can define a proper type for stores if needed
      authenticationMode: string;
    };
  };
}
