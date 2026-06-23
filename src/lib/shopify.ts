import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const publicAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const shopifyClient = createStorefrontApiClient({
  storeDomain: storeDomain?.startsWith('http') ? storeDomain : `https://${storeDomain}`,
  apiVersion: '2024-04',
  publicAccessToken: publicAccessToken || '',
});

// Helper function to fetch the first 10 products
export const fetchProducts = async () => {
  const productsQuery = `
    query Products {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const { data, errors } = await shopifyClient.request(productsQuery);
    if (errors) {
      console.error('Shopify API Errors:', errors);
      return [];
    }
    return data?.products?.edges?.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Failed to fetch Shopify products:', error);
    return [];
  }
};

export const fetchProductByHandle = async (handle: string) => {
  const productQuery = `
    query Product($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  try {
    const { data, errors } = await shopifyClient.request(productQuery, { variables: { handle } });
    if (errors) {
      console.error('Shopify API Errors:', errors);
      return null;
    }
    return data?.product || null;
  } catch (error) {
    console.error('Failed to fetch Shopify product by handle:', error);
    return null;
  }
};
