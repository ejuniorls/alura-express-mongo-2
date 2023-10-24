import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeError(error, req, res, next) {
    if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
    } else if (error instanceof mongoose.Error.ValidationError) {
        const mensagensErro = Object
            .values(error.errors)
            .map(error => error.message)
            .join("; ");

        res.status(400).send({ message: `Os seguintes erros foram encontrados: ${mensagensErro}.` });
    } else {
        new ErroBase().enviarResposta(res);
    }

}

export default manipuladorDeError;