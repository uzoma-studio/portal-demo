import * as migration_20250504_104541_create_theme_settings from './20250504_104541_initial_migration';

export const migrations = [
  {
    up: migration_20250504_104541_create_theme_settings.up,
    down: migration_20250504_104541_create_theme_settings.down,
    name: '20250504_104541_initial_migration'
  },
];
