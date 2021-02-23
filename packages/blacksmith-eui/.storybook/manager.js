import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Blacksmith with Elastic UI',
    brandUrl: 'https://nunchi.studio/blacksmith',
    brandImage: 'https://nunchi.studio/assets/blacksmith/logo.svg',
  }),
});
