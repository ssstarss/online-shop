export interface GetProductsParams {
  sort?: { param: 'name' | 'price' | ''; direction: 'asc' | 'desc' | '' };
  filterPrice?: { higherThen: number; lowerThen: number };
  size?: 'Small size' | 'Medium size' | 'Large size';
  searchText?: string;
}

export interface IProduct {
  id: string;
  version: number;
  productType: {
    typeId: string;
    id: string;
  };
  name: {
    'en-US': string;
  };
  description: {
    'en-US': string;
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
  ];
  categoryOrderHints: { some: string };
  slug: {
    'en-US': string;
  };
  metaTitle: {
    'en-US': string;
  };
  metaDescription: {
    'en-US': string;
  };
  variants: [];
  masterVariant: {
    attributes: [
      {
        name: string;
        value: string;
      },
    ];
    assets: [];
    images: [
      {
        url: string;
        dimensions: {
          w: number;
          h: number;
        };
      },
      {
        url: string;
        dimensions: {
          w: number;
          h: number;
        };
      },
    ];
    prices: [
      {
        id: string;
        value: {
          type: string;
          currencyCode: string;
          centAmount: number;
          fractionDigits: number;
        };
        country: string;
        discounted: {
          value: {
            type: string;
            currencyCode: string;
            centAmount: number;
            fractionDigits: number;
          };
          discount: Idiscount;
        };
      },
    ];
    key: string;
    sku: string;
    id: number;
  };
  searchKeywords: {
    'en-US': [
      {
        text: string;
      },
    ];
  };

  hasStagedChanges: boolean;
  published: boolean;
  key: string;
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
}

export interface Idiscount {
  id: string;
  version: number;
  value: {
    permyriad: number;
    type: string;
  };
  predicate: string;
  name: {
    en: string;
  };

  isActive: boolean;
  sortOrder: string;
  references: [];
  createdAt: string;
  lastModifiedAt: string;
}
