const {response} = require('./response');

/**
 * Uma lista dos usuários cadastrados;
 * 
 * Cada cadastro é um objeto do tipo:
 *      {
 *      nome: string,
 *      genero: string,
 *      email: string,
 *      idDoUsuario: number
 *      }
 */
const listaDeUsuarios = [{
    nome: 'Felipe',
    genero: 'Homem Cis',
    email: 'felipe@email.com',
    idDoUsuario: 1,
}];


/**
 * Uma lista de usuários que estão na fila;
 * Não está numerada pois existe uma funcão especifica para numerá-la quando for necessário;
 * 
 * cada item é um objeto do tipo:
 *      {
 *      nome: string,
 *      genero: string,
 *      email: string,
 *      idDoUsuario: number
 *      }
 * 
 * e quando numerada, é adicinado uma propriedade 'lugarNaFila' no começo do objeto.
 */
const fila = [{
    nome: 'Felipe',
    genero: 'Homem Cis',
    email: 'felipe@email.com',
    idDoUsuario: 1,
}];


/**
 * função responsável por procurar a posição de um usuário no array fila a partir do e-mail;
 * @param {string} email 
 */
const acharPosicao = (email) => {
    const posicao = fila.findIndex(pessoa => email === pessoa.email) + 1;

    if (posicao === 0) {
        return;
    } 

    return posicao;
};


/**
 * Função responsável por numerar o array fila;
 */
const numerarFila = () => {
    //adicionando a posição de cada um no momento em que for chamada a função
    const filaNumerada = fila.map((posicao, index) => {
        const posicaoNumerada = { posicaoNaFila: index+1, ...posicao }
        return posicaoNumerada;
    });
    
    return filaNumerada;
};


/**
 * Função responsável por buscar um cadastro a partir de um dado;
 * @param {string} dado 
 * @param {string} valor 
 */
const buscarCadastro = (dado, valor) => {
    const cadastro = listaDeUsuarios.find(item => {
        return item[`${dado}`] === valor
    });

    return cadastro;
}


/**
 * Função responsável por criar um novo cadastro;
 * @param {*} corpoDaRequisicao 
 */
const criarCadastro = (corpoDaRequisicao) => {
    const novoCadastro = {
        nome: corpoDaRequisicao.nome ? corpoDaRequisicao.nome : '-',
        genero: corpoDaRequisicao.genero ? corpoDaRequisicao.genero : '-',
        email: corpoDaRequisicao.email ? corpoDaRequisicao.email : '-',
        idDoUsuario: listaDeUsuarios.length + 1,
    };
    
    const cadastro = buscarCadastro('email', novoCadastro.email);
    // se ja existir um cadastro com esse email
    if (cadastro) {
        return false;
    };

    // se houver falta de dados
    if (novoCadastro.nome === '-' || novoCadastro.genero === '-' || novoCadastro.email === '-') {
        return;
    };

    // sem problemas
    listaDeUsuarios.push(novoCadastro);
    return novoCadastro;
};


/**
 * Função responsável por adicinar um usuário no fim da fila;
 * @param {*} cadastro 
 */
const adicionarAoFimDaFila = (cadastro) => {
    fila.push(cadastro);
    return fila.length;
};


/**
 * Função responsável por filtrar a fila a partir de um parâmetro;
 * @param {string} parametro 
 * @param {string} valorDoParametro 
 */
const filtrarFila = (parametro, valorDoParametro) => {
    // colocando os lugares de cada pessoa
    const filaNumerada = numerarFila();
    
    const listaFiltrada = filaNumerada.filter(pessoa => {
        return pessoa[`${parametro}`] === valorDoParametro;
    });

    return listaFiltrada;
};





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  





/**
 * Função responsável por procurar a posição de um usuário na fila;
 */
const findPosition = (ctx) => {
    const email = ctx.request.body.email;
    const cadastrado = buscarCadastro('email', email);
    // teste para confirmar cadastro do email fornecido no sistema
    if (!cadastrado) {
        response(ctx, 400, { mensagem: 'Não existe cadastro para o email fornecido' });
        return;
    };

    const posicao = acharPosicao(email);
    // se a funcao de procurar email retornar undefined, é porque nao 
    // foi encontrado ninguem na fila com o email inserido
    if (posicao === undefined) {
        response(ctx, 200, {mensagem: 'Não há ninguém na fila com o e-mail inserido'});
        return;
    };

    response(ctx, 200, { posição: posicao });
};

/**
 * Função responsável por retornar a fila completa numerada; 
 */
const showLine = (ctx) => {
    const filaNumerada = numerarFila();

    // se a fila estiver vazia
    if (filaNumerada.length === 0) {
        response(ctx, 200, { mensagem: 'a fila está vazia' })
        return;
    };

    
    response(ctx, 200, {
        tamanhoDaFila: filaNumerada.length,
        fila: filaNumerada
    });
};

/**
 * Função responsável por retornar a lista filtrada a partir de um parâmetro;
 */
const filterLine = (ctx) => {
    const parametro = ctx.request.body.parametro;
    const valorDoParametro = ctx.request.body.valor;
    
    const filaFiltrada = filtrarFila(parametro, valorDoParametro);
    // se nao houver ninguem que se encaixe no filtro
    if (filaFiltrada.length === 0) {
        response(ctx, 200,  {
            mensagem: 'Não há ninguém que se encaixe no filtro.'
        });
        return;
    };

    
    response(ctx, 200, {
        quantidade: filaFiltrada.length,
        pessoas: filaFiltrada
    });
};

/**
 * Função responsável por excluir o primeiro elemento da fila e retorná-lo;
 */
const popLine = (ctx) => {
    const proximoDaFila = fila.shift();
    // se retornar undefined, a lista está vazia.
    if (proximoDaFila === undefined) {
        response(ctx, 200, {
            proximoDaFila: 'A fila está vazia.'
        });
        return;
    };

    response(ctx, 200, {
        proximoDaFila: proximoDaFila
    });
};

/**
 * Função responsável por criar um novo cadastro;
 */
const createUser = (ctx) => {
    const corpoDaRequisicao = ctx.request.body;

    const novoCadastro = criarCadastro(corpoDaRequisicao);
    // se a funcão retornar undefined, houve problema com os dados fornecidos
    if (novoCadastro === undefined) {
        response(ctx, 400, {
            mensagem: 'Alguma informação do usuário a ser cadastrado não foi fornecida.'
        });
        return;
    };
    // se a funcao retornar false, é porque o email fornecido ja está cadastrado
    if (!novoCadastro) {
        response(ctx, 403, {
            mensagem: 'O e-mail fornecido já está sendo utilizado.'
        });
        return;
    };

    response(ctx, 201, { cadastro: novoCadastro });
}

/**
 * Função responsável por adicionar um usuário à fila;
 */
const addToLine = (ctx) => {
    const idDoUsuario = Number(ctx.request.body.id);
    // testando a se a id é válida(numérica)
    if (isNaN(idDoUsuario)) { 
        response(ctx, 400, {
            mensgem: 'A ID inserida é inválida'
        });
        return;
    };

    const cadastro = buscarCadastro('idDoUsuario', idDoUsuario);
    // testando se existe usuario para a id fornecida
    if (!cadastro) {
        response(ctx, 400, {
            mensagem: 'Não foi encontrado cadastro para a ID fornecida.'
        });
        return;
    };
    
    const usuarioNaFila = acharPosicao(cadastro.email);
    // testando se o usuário ja está na fila, se ja estiver retorna erro e a posição dele
    if (usuarioNaFila !== undefined) {
        response(ctx, 403, {
            mensagem: 'O usuário já está na fila.',
            posição: usuarioNaFila
        });
        return;
    };

    const posicao = adicionarAoFimDaFila(cadastro);
    response(ctx, 200, {
        posição: posicao 
    });
}




module.exports = {
    findPosition,
    showLine,
    filterLine,
    popLine,
    createUser,
    addToLine
};