export type BeginyCatalogProduct = {
  id: string;
  name: string;
  url: string;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  allowedVolumes: string[];
};

export type BeginyCatalogCategory = {
  slug: string;
  name: string;
  description: string;
  url: string;
  productCount: number;
  products: BeginyCatalogProduct[];
};

export type BeginyCatalog = {
  source: string;
  categories: BeginyCatalogCategory[];
};

const DEFAULT_API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3010/api/public/catalog'
  : 'https://www.beginy.cz/api/public/catalog';

export async function getBeginyCatalog(): Promise<BeginyCatalog | null> {
  const apiUrl = process.env.BEGINY_CATALOG_API_URL || DEFAULT_API_URL;

  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`Beginy catalog API returned ${response.status}`);
    }

    const catalog = await response.json() as BeginyCatalog;
    if (!Array.isArray(catalog.categories)) {
      throw new Error('Beginy catalog API returned an invalid response');
    }

    return catalog;
  } catch (error) {
    console.error('Unable to load Beginy catalog:', error);
    return null;
  }
}
