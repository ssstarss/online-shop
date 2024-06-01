export interface IProduct {
  id: string;
  version: number;
  masterData: {
    current: {
      categories: [
        {
          id: string;
          typeId: string;
        },
      ];
      description: {
        en: string;
      };
      masterVariant: {
        attributes: [];
        id: number;
        images: [
          {
            dimensions: {
              h: number;
              w: number;
            };
            url: string;
          },
        ];
        prices: [
          {
            value: {
              type: string;
              fractionDigits: number;
              centAmount: number;
              currencyCode: string;
            };
            discounted?: {
              discount: {
                id: string;
                typeID: string;
                value: {
                  type: string;
                  currencyCode: string;
                  centAmount: number;
                  fractionDigits: number;
                };
              };
            };
            id: string;
          },
        ];
        sku: string;
      };
      name: {
        en: string;
      };
      slug: {
        en: string;
      };
      variants: [];
      searchKeywords: object;
    };
    hasStagedChanges: boolean;
    published: boolean;
    staged: {
      categories: [
        {
          id: string;
          typeId: string;
        },
      ];
      description: {
        en: string;
      };
      masterVariant: {
        attributes: [];
        id: number;
        images: [
          {
            dimensions: {
              h: number;
              w: number;
            };
            url: string;
          },
        ];
        prices: [
          {
            value: {
              type: string;
              fractionDigits: number;
              centAmount: number;
              currencyCode: string;
            };
            id: string;
          },
        ];
        sku: string;
      };
      name: {
        en: string;
      };
      slug: {
        en: string;
      };
      variants: [];
      searchKeywords: object;
    };
  };
  productType: {
    id: string;
    typeId: string;
  };
  taxCategory: {
    id: string;
    typeId: string;
  };
  createdAt: string;
  lastModifiedAt: string;
  discount: Idiscount;
}

export interface Idiscount {
  id: string;
  version: number;
  value: {
    type: string;
    money: [
      {
        type: string;
        fractionDigits: number;
        currencyCode: string;
        centAmount: number;
      },
    ];
    id: string;
  };
  predicate: string;
  name: {
    en: string;
  };
  description: {
    en: string;
  };
  isActive: boolean;
  sortOrder: string;
  references: [];
  createdAt: string;
  lastModifiedAt: string;
}