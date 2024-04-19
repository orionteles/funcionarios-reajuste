const { json } = require("express");
const Funcionario = require("../models/Funcionario")

const FuncionarioController = {
    getAll: async (req, res) => {
        const filtros = {}
        const campos = Object.keys(Funcionario.schema.paths)

        for(let campo in req.query){
            if(campos.includes(campo)){
                filtros[campo] = {$regex: new RegExp(req.query[campo], 'i') }
            }
        }

        res.json(await Funcionario.find(filtros))
    },
    get: async (req, res) => {
        try {
            res.json(await Funcionario.find({cargo: {$regex: new RegExp(req.params.cargo, 'i') }}))
        } catch (error) {
            res.status(404).json({error: error.message})
        }
    },
    create: async (req, res) => {
        try {

            const {cpf, cnpj, nome, sexo, cargo, salario, tipoPessoa} = req.body

            if(tipoPessoa == 'PF' && !cpf){
                return res.status(400).json({error: 'CPF não informado'})
            }

            if(cpf && cnpj){
                return res.status(400).json({error: 'Favor informar somente uma opção, CPF ou CNPJ, de acordo com o Tipo de Pessoa'})
            }

            if(tipoPessoa == 'PJ'){
                if(!cnpj){
                    return res.status(400).json({error: 'CNPJ não informado'})
                }

                if(sexo){
                    return res.status(400).json({error: 'O campo sexo só é permitido para Pessoa Física'})
                }

                if(cargo){
                    return res.status(400).json({error: 'O campo cargo só é permitido para Pessoa Física'})
                }
            }

            res.json(await Funcionario.create(req.body))
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    },
    update: async (req, res) => {
        try {

            const funcionario = await Funcionario.findById(req.params.id)
            funcionario.salario += funcionario.salario * (req.body.reajuste/100)

            return res.json(await funcionario.save())
        } catch (error) {
            res.status(404).json({error: error.message})
        }
    },
    delete: async (req, res) => {
        try {
            res.json(await Funcionario.findByIdAndDelete(req.params.id))
        } catch (error) {
            res.status(404).json({error: error.message})
        }
    },
}

module.exports = FuncionarioController