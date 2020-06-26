import app from './app';
import 'reflect-metadata';

import '@shared/infra/typeorm';

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
