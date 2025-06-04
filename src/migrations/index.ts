import * as migration_20250504_104541_initial_migration from './20250504_104541_initial_migration';
import * as migration_20250604_130832_multi_tenancy_migration from './20250604_130832_multi_tenancy_migration';

export const migrations = [
  {
    up: migration_20250504_104541_initial_migration.up,
    down: migration_20250504_104541_initial_migration.down,
    name: '20250504_104541_initial_migration',
  },
  {
    up: migration_20250604_130832_multi_tenancy_migration.up,
    down: migration_20250604_130832_multi_tenancy_migration.down,
    name: '20250604_130832_multi-tenancy_migration'
  },
];
