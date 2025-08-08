// FGTS
import { getToken, getGateway } from "./modules/token.js"
import { pendencias } from "./modules/fgts.js"
// LOGS
import { error, success, info, attention, writer } from "./modules/logs.js"
// OUTROS
import { formatCnpjCpf, tratarInscricao } from "./modules/others.js"
import fs from "fs"

async function main() {
    if (!fs.existsSync("./data/empresas.txt")) {
        info("Arquivo de empresas criado...");
        await fs.promises.mkdir("./data");
        await fs.promises.writeFile("./data/empresas.txt", "");
        
    }
    const empresas = (await fs.promises.readFile("./data/empresas.txt", "utf-8")).split("\n");
    if (!empresas) {
        return error("Nenhuma empresa cadastrada")
    }

    // Puxando Token (PAI)
    const token = await getToken()
    if (!token.success) {
        return error(token.data)
    } else {
        info("Token capturado")
    }

    // Usando Promise.all para executar todas empresas simultaneamente
    await Promise.all(empresas.map(async (inscricao) => {
        const empresa = tratarInscricao(inscricao.trim());
        if (!empresa) {
            await writer("error", inscricao ? formatCnpjCpf(inscricao) : "Sem Inscrição", "Filial Detectada");
            return error("Filial Detectada", inscricao ? formatCnpjCpf(inscricao) : "Sem Inscrição");
        };

        // Puxando Token (Filho, Empresarial)
        const gateway = await getGateway(token.data, empresa);
        if (!gateway.success) {
            await writer("error", formatCnpjCpf(empresa), gateway.data);
            return error(gateway.data, formatCnpjCpf(empresa));
        }

        const consulta = await pendencias(gateway.data, empresa);
        if (!consulta.success) {
            await writer("error", formatCnpjCpf(empresa), gateway.data);
            return error(consulta.data, formatCnpjCpf(empresa));
        } else {
            if (consulta.data === "Nenhuma pendência") {
                await writer("sem_pendencias", formatCnpjCpf(empresa));
                return success(`Sem Pendências`, formatCnpjCpf(empresa));
            } else {
                const abertas = consulta.data.filter(comp => comp.status === "Aberta");
                const competencias = abertas.map(comp => comp.competencia).join(", ");
                await writer("com_pendencias", formatCnpjCpf(empresa), competencias);
                return attention(`${abertas.length} pêndencias encontradas`, formatCnpjCpf(empresa));
            }
        }
    }));
}

main();