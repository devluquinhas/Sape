import chalk from "chalk";
import fs from "fs";

const cores = {
    danger: chalk.hex("#ff2f00ff"),
    attention: chalk.hex("#9000ffff"),
    success: chalk.hex("#00ff88ff"),
    info: chalk.hex("#f4ec15ff"),
    others: chalk.hex("#75f5f5ff"),
}

export const error = (msg, empresa) => {
    console.log(cores.danger(`[ - ]`) + ` ${empresa ? empresa : "Houve um erro"} ` + cores.danger(`[ ${msg} ]`));
}

export const success = (msg, empresa) => {
    console.log(cores.success(`[ + ]`) + ` ${empresa ? empresa : msg} ` + cores.success(`[ ${empresa ? msg : new Date().toLocaleTimeString()} ]`));
}

export const info = (msg, empresa) => {
    console.log(cores.info(`[ i ]`) + ` ${empresa ? empresa : msg} ` + cores.info(`[ ${empresa ? msg : new Date().toLocaleTimeString()} ]`));
}

export const attention = (msg, empresa) => {
    console.log(cores.attention(`[ ! ]`) + ` ${empresa ? empresa : msg} ` + cores.attention(`[ ${empresa ? msg : new Date().toLocaleTimeString()} ]`));
}

export const writer = async (type, empresa, retorno=null) => {
    const destino = `./logs/${new Date().toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')}/`;
    const arquivo = `${destino}${type}.log`;
    if (!fs.existsSync(destino)) {
        await fs.promises.mkdir(destino, { recursive: true });
    }

    await fs.promises.writeFile(arquivo, `${empresa} ${retorno ? `(${retorno}) ` : ''}[ ${new Date().toLocaleTimeString()} ]\n`, { flag: "a" });
}