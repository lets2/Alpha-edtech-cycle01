const orderRepository = require("../repository/todos");

/*
    d. crie uma função para registro de pedido que execute o seguinte processo:
        i. Início de uma transação;
        ii. Inserção do cabeçalho do pedido;
        iii. Inserção dos produtos no pedido;
        iv. Se qualquer processo de inserção resultar em erro, deve ser dado rollback na transação;
        v. Se não ocorrer erro, deve ser dado commit na transação.


*/
