import config from './data-source';
(async () => {
  try {
    await config.initialize();
    console.log('Database connection successful');
    await config.destroy();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();
