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
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
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
              name: 'amount',
              title: 'Amount',
              type: 'string',
            },
            {
              name: 'notes',
              title: 'Notes',
              type: 'string',
            },
          ],
          preview: {
            select: {
              name: 'name.title',
              unit: 'unit',
              amount: 'amount',
            },
            prepare(selection) {
              const {name, amount = ''} = selection
              return {
                title: `${name} ${amount}`,
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
              name: 'stepImages',
              title: 'Step Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      validation: (Rule) => Rule.unique(),
    },
    {
      name: 'tips',
      title: 'Tips',
      type: 'array',
      of: [{type: 'text'}],
    },
  ],
}
