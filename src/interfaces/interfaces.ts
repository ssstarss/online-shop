export interface IProduct {
  id: string;
  productType: {
    typeId: string;
    id: string;
  };
  masterData: {
    current: {
      name: {
        ['en-US']: string;
      };
      description: {
        ['en-US']: string;
      };
      categories: [
        {
          typeId: string;
          id: string;
        },
        {
          typeId: string;
          id: string;
        },
        {
          typeId: string;
          id: string;
        },
      ];
      categoryOrderHints: {};
      slug: {
        ['en-US']: string;
      };
      masterVariant: {
        id: number;
        sku: string;
        prices: [
          {
            id: string;
            value: {
              type: string;
              currencyCode: string;
              centAmount: number;
              fractionDigits: string;
            };
            country: string;
            discounted: {
              value: {
                type: string;
                currencyCode: string;
                centAmount: number;
                fractionDigits: number;
              };
              discount: {
                typeId: string;
                id: string;
              };
            };
          },
        ];
        images: [
          {
            url: string;
          },
        ];
        attributes: [
          {
            name: string;
            value: {
              ['en-GB']: string;
            };
          },
          {
            name: string;
            value: {
              key: string;
              label: {
                ['de-DE']: string;
              };
            };
          },
          {
            name: 'color';
            value: {
              ['en-GB']: string;
            };
          },
        ];
        assets: [];
        availability: {
          isOnStock: boolean;
          availableQuantity: number;
          version: number;
          id: string;
        };
      };
      variants: [];
      searchKeywords: {};
    };

    published: boolean;
    hasStagedChanges: boolean;
  };
  key: string;
}

export interface IProducts {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: [IProduct];
}

export interface IResponse {
  body: IProducts;
  statusCode: number;
}
