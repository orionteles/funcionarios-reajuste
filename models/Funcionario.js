const mongoose = require('mongoose')

const schema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
        maxLength: [20, 'O nome não pode ter mais que 20 caracteres']
    },
    tipoPessoa: {
        type: String,
        required: true,
        uppercase: true,
        enum: {
            values: ['PF', 'PJ'],
            message: 'Não pode'
        }
    },
    cpf: {
        type: String,
        match: /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/
    },
    cnpj: {
        type: String,
        match: /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/
    },
    sexo: {
        type: String,
        uppercase: true,
        enum: {
            values: ['M', 'F'],
            message: 'Não pode'
        }
    },
    cargo: {
        type: String,
        enum: {
            values: ['Estagiario', 'Tecnico', 'Gerente', 'Diretor', 'Presidente'],
            message: 'Não pode'
        }
    },
    salario: {
        type: Number,
        required: true,
        min: [1412, 'O Salário não pode ser menor que o salário mínimo (R$ 1.412,00)']
    },
})

const Funcionario = mongoose.model('Funcionario', schema)

module.exports = Funcionario