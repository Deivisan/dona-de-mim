const { readdirSync } = require('fs');
const categorias = ['shorts', 'conjuntos', 'macacoes', 'bodys'];

for (const cat of categorias) {
  const files = readdirSync(`./public/imgs/${cat}/`).filter(f => f.endsWith('.jpeg'));
  console.log(`\n=== ${cat.toUpperCase()} ===`);
  files.forEach(f => console.log(f));
}
