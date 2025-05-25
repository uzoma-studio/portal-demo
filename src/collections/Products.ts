import { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'spaceId',
      type: 'text',
      required: true,
      index: true,
    },
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
      name: 'paymentType',
      type: 'select',
      required: true,
      options: [
        { label: 'One-time', value: 'one-time' },
        { label: 'Subscription', value: 'subscription' },
      ],
    },
    {
        name: 'productImage',
        type: 'upload',
        relationTo: 'media',
    },
    {
      name: 'paystackPlanId',
      type: 'text',
      admin: { condition: (data) => data.paymentType === 'subscription' }, // Show only for subscriptions
    },
  ],
};

export default Products;