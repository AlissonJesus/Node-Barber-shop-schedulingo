const processAvailableDays = (diasDaSemana, quantidadeDias) => {
  const hoje = new Date();
  const diaAtual = hoje.getDate();
  const diaDaSemanaAtual = hoje.getDay(); // 0 para domingo, 1 para segunda, ..., 6 para sábado

  const proximosDias = [];
  let diaAtualCalculado = new Date(hoje);

  while (proximosDias.length < quantidadeDias) {
    const diaDaSemanaCalculado = diaAtualCalculado.getDay();

    if (diasDaSemana.includes(diaDaSemanaCalculado)) {
      proximosDias.push({
        data: new Date(diaAtualCalculado),
        diaMes: diaAtualCalculado.getDate(),
      });
    }

    diaAtualCalculado.setDate(diaAtualCalculado.getDate() + 1);
  }

  return proximosDias;
};

export { processAvailableDays };
