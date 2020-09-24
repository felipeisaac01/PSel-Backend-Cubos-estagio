const response = (ctx, codigo, dados) => {
    const status = (200 <= codigo  && codigo <= 399) ? 'sucesso' : 'erro'
    ctx.status = codigo;
    ctx.body = {
        status: status,
        dados: dados
    };
};

module.exports = {response};