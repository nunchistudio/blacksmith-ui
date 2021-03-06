export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Blacksmith UI kit',
        'Sources', [
          'Scenes', [
            'Sources', 'Source', 'Trigger',
          ],
          'Cards', ['Source', 'Trigger'],
        ],
        'Destinations', [
          'Scenes', [
            'Destinations', 'Destination', 'Action',
          ],
          'Cards', ['Destination', 'Action'],
        ],
        'Store', [
          'Scenes', [
            'Store',
            'Event',
          ],
          'Cards', [
            'Event',
            'Job',
          ],
          'Atoms', [
            'Filters: View mode',
            'Filters: Events\' date range',
            'Filters: Sources\' names',
            'Filters: Sources\' triggers',
            'Filters: Sources\' versions',
            'Filters: Destinations\' names',
            'Filters: Destinations\' actions',
            'Filters: Destinations\' versions',
            'Filters: Jobs\' date range',
            'Filters: Jobs\' status',
            'Filters: Jobs\' attempts',
            'Transition',
          ],
        ],
        'Options', [
          'Scenes',
          'Cards',
        ],
        'Display', [
          'Loading',
          'Layout',
        ],
        'Pages',
      ],
    },
  },
};
