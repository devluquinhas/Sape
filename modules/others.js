export const formatCnpjCpf = (value) => {
  const cnpjCpf = value.replace(/\D/g, '');
  
  if (cnpjCpf.length === 11) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
  }
  
  return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
}

export const tratarInscricao = (inscricao) => {
    const cleanInsc = inscricao.replace(/\D/g, '');

    // CPF
    if (cleanInsc.length === 11) {
      return cleanInsc;
    }

    // CNPJ
    if (cleanInsc.length === 14) {
      const isFilial = cleanInsc.slice(8, 12) !== '0001';
      if (isFilial) {
          return false;
      }
      return cleanInsc;
    }
    

    return false;
}