import { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'space',
      type: 'relationship',
      relationTo: 'spaces',
      required: true,
      hasMany: false,
      index: true,
      admin: {
        description: 'Select the space this product belongs to',
      },
    },
    {
      name: 'paymentType',
      type: 'select',
      required: true,
      options: [
        { label: 'One-time', value: 'one-time' },
        { label: 'Subscription', value: 'subscription' },
      ],
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'product-images',
      hasMany: true,
      admin: {
        description: 'Add images for this product',
      },
    },
    {
      name: 'paystackPlanId',
      type: 'text',
      admin: { condition: (data) => data.paymentType === 'subscription' }, // Show only for subscriptions
    },
  ],
};

export default Products;