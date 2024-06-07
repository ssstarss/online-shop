export interface ICategories {
  id: string;
  version: number;

  key: string;
  name: {
    'en-US': string;
  };
  slug: {
    'en-US': string;
  };
  description: {
    'en-US': string;
  };
  ancestors: [];

  externalId: string;
  metaTitle: {
    'en-US': string;
  };
  metaDescription: {
    'en-US': string;
  };
  assets: [];
}
