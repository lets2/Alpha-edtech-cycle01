Foi instalada uma dependência de desenvolvimento
que permite atualizar e recompilar automaticamente
sempre que o arquivo index.ts é modificado:
Esse script foi adicionado no arquivo package.json:
    "start":"ts-node-dev --respawn --transpile-only ./src/index.ts",

Isso instrui o ts-node-dev a monitorar o diretório src e recompilar e reiniciar o servidor sempre que houver alterações nos arquivos TypeScript. O parâmetro --transpile-only faz com que o ts-node-dev ignore erros de tempo de compilação, tornando a compilação mais rápida.

Mas, apenas para deixar salva a versão do professor:
    "start":"npx tsc && node ./dist",

que primeiro usa o compilador usando a versão local do typescript presente no nodemodules
em seguida usa o comando node que vai executar o arquivo javascript presente
no diretorio "dist".
