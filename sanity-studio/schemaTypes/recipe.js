export default {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'reference',
              to: [{type: 'ingredient'}],
            },
            {
              name: 'unit',
              title: 'Unit',
              type: 'string',
            },
            {
              name: 'amount',
              title: 'Amount',
              type: 'number',
            },
          ],
          preview: {
            select: {
              name: 'name.title',
              unit: 'unit',
              amount: 'amount',
            },
            prepare(selection) {
              const {name, unit, amount} = selection
              return {
                title: `${name} ${amount} ${unit}`,
              }
            },
          },
        },
      ],
    },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'stepDescription',
              title: 'Step Description',
              type: 'text',
            },
            {
              name: 'stepImage',
              title: 'Step Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'tips',
      title: 'Tips',
      type: 'array',
      of: [{type: 'text'}],
    },
  ],
}
