import app from './app';
import 'reflect-metadata';
import '../typeorm';

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333!');
});
