import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

export async function pendencias(token, empresa) {
    try {
        const req = await axios.get(`https://fgtsdigital.sistema.gov.br/cobranca/api/guia-rapida/`, {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br, zstd",
                "Accept-Language": "pt-BR,pt;q=0.6",
                "Connection": "keep-alive",
                "Cookie": `fgtsd_ni_usuario=${process.env.PROCURADOR}; fgtsd_tipo_perfil=2; fgtsd_ni_perfil=${empresa}; fgtsd_gateway=${token};`,
                "Host": "fgtsdigital.sistema.gov.br",
                "Referer": "https://fgtsdigital.sistema.gov.br/cobranca/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
            }
        })
        return { success: true, data: req.data }
    } catch(e) {
        const data = e?.response?.data;
        const retorno = typeof data === "string" ? data.trim() : data?.mensagem ? data.mensagem.titulo.trim() : "";
        if (retorno && retorno === "Não há débitos de interesse") {
            return { success: true, data: "Nenhuma pendência" }
        }
        return { success: false, data: retorno ? retorno : e.status ? e.status : "Erro ao obter pendências" }
    }
} 