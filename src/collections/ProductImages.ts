import { CollectionConfig } from 'payload';

export const ProductImages: CollectionConfig = {
  slug: 'product-images',
  admin: {
    useAsTitle: 'alt',
    group: 'Content Types',
  },
  upload: {
    staticDir: 'public/product-images',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
      },
    },
    adminThumbnail: ({ doc }: { doc: { url: string } }): string => {
      return doc.url;
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'A descriptive name for the image',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      hasMany: false,
      admin: {
        description: 'The product this image belongs to',
      },
    },
  ],
};

export default ProductImages; 