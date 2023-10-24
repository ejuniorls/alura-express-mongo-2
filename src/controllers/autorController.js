import { autor } from "../models/Autor.js";
// import mongoose from "mongoose";

class AutorController {

    static async listarAutores(req, res, next) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (erro) {
            // res.status(500).json({ message: `${erro.message} - falha na requisição` });
            next(erro);
        }
    }

    static async listarAutorPorId(req, res, next) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);

            if (autorEncontrado !== null) {
                res.status(200).json(autorEncontrado);
            } else {
                res.status(404).send({ message: "Id do Autor não localizado." });
            }
        } catch (erro) {
            // if (erro instanceof mongoose.Error.CastError) {
            //     res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
            // } else {
            //     res.status(500).send({ message: "Erro interno de servidor." });
            // }
            next(erro);
        }
    }

    static async cadastrarAutor(req, res, next) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "criado com sucesso", livro: novoAutor });
        } catch (erro) {
            // res.status(500).json({ message: `${erro.message} - falha ao cadastrar autor` });
            next(erro);
        }
    }

    static async atualizarAutor(req, res, next) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "autor atualizado" });
        } catch (erro) {
            // res.status(500).json({ message: `${erro.message} - falha na atualização` });
            next(erro);
        }
    }

    static async excluirAutor(req, res, next) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: "autor excluído com sucesso" });
        } catch (erro) {
            // res.status(500).json({ message: `${erro.message} - falha na exclusão` });
            next(erro);
        }
    }
}

export default AutorController;