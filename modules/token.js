import dotenv from "dotenv";
import axios from "axios";
dotenv.config({ quiet: true });

const extrairCookie = (cookieString, nomeCookie) => {
    const regex = new RegExp(`${nomeCookie}=([^;]+)`);
    const match = regex.exec(cookieString);
    return match ? match[1] : null;
};

export async function getToken() {
    if (!process.env.API_KEY || !process.env.API_URL) return { success: false, data: "Faltando paramêtros no .env" }
    try {
        const req = await axios.get(process.env.API_URL, {
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Authorization": `Bearer ${process.env.API_KEY}`
            }
        })

        return { success: true, data: req.data }
        
    } catch(e) {
        return { success: false, data: "Ao Buscar Token" }
    }
}

export async function getGateway(token, empresa) {
    if (!process.env.API_KEY || !process.env.API_URL) return { success: false, data: "Faltando paramêtros no .env" }
    try {
        const req = await axios.get(`https://fgtsdigital.sistema.gov.br/proxy-api/v2/perfil?tipoPerfil=2&niPerfil=${empresa}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition std-2)',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
                'Connection': 'keep-alive',
                "Cookie": `fgtsd_ni_usuario=${process.env.PROCURADOR}; fgtsd_tipo_perfil=2; fgtsd_ni_perfil=${empresa}; fgtsd_gateway=${token};`,
                'Host': 'fgtsdigital.sistema.gov.br',
                'Pragma': 'no-cache'
            }
        })

        const data = req.data;
        if (data?.mensagem.includes("Não existe procuração")) {
            return { success: false, data: "Sem Procuração" }
        }

        const cookie = req.headers['set-cookie']
        const gateway = extrairCookie(cookie, 'fgtsd_gateway')
        return { success: true, data: gateway }
        
    } catch(e) {
        const retorno = e?.response?.data.trim();
        return { success: false, data: retorno ? retorno : e.message ? e.message : "Erro ao obter gateway" }
    }
}