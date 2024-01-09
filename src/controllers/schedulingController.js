import Service from "../models/service.js";
import Scheduling from "../models/scheduling.js";
import { processAvailableDays } from "../utils/scheduling.js";
import { processTimesBySlots } from "../utils/shared.js";

const registerScheduling = async (req, res) => {
  const { serviceId, collaboratorId, date, payment } = req.body;
  const { storeId } = req.params;
  const isInvalidDatas = !(serviceId && collaboratorId && date && payment)
  if (isInvalidDatas) {
    return res.status(400).json({ message: "Dados enviados estão incompletos" });
  }

  try {
    const store = {};
    if (!store) {
      return res.status(404).json({ message: "Loja não cadastrada" });
    }

    const collaborator = { recipient_id: "12312312" };
    if (!collaborator) {
      return res.status(400).json({ message: "Colaborador não cadastrado" });
    }

    const service = { commission: 10, value: 6000, duration: 60 };
    if (!service) {
      return res.status(400).json({ message: "Serviço não cadastrado" });
    }

    const notExistsScheduling = false; // checar se a empresa com o colaborador estão ocupado nesse horário
    if (notExistsScheduling) {
      return res.status(400).json({ message: "Horário já agendado" });
    }

    const clientId = "659571a778d694bc8f309da3"; // variável de requisição
    let transactionId;
    if (payment.type === "O") {
      // pagamento realizado
      const { custommer_id: client } = { custommer_id: "324324" };
      transactionId = "123123sada32";

    } else {
      transactionId = "123123sada32";
    }
    
    const scheduling = await Scheduling({
      clientId,
      collaboratorId,
      storeId,
      serviceId,
      commission: service.commission,
      value: service.value,
      transactionId,
      date: new Date(date)
    }).save();
   

    return res
      .status(201)
      .json({ message: "Agendamento realizado com sucesso" });

  } catch ({name, message}) {
    if(name === "ValidationError") {
      return res.status(400).json({message})
    }
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
const findSchedules = async (req, res) => {
  const { storeId, serviceId, date } = req.body;
  try {
    if (storeId) {
      return res.status(400);
    }
    // Processar os dias disponíveis
    /*
   const storeFound = await Service.findById(storeId).select("-_id businessHours")

   if(!storeFound) {
    return res.status(400).json({message: "Loja não encontrada"})
   }
   */
    const storeFound = { days: [0, 1, 3, 4, 5, 6] };

    const availableDays = processAvailableDays(storeFound.days, 10);

    //Buscar os horários dos dias de funcionamento do empresa e serviço
    const schedulingTime = [
      {
        collaboratorId: {
          id: "312312321",
          name: "Alisson",
          lastName: "Alves",
        },
        serviceId: {
          duration: 60,
        },
        date: "10:30",
      },
    ];
    //tratar para um objeto de resposta
    const formatedSchedulingTime = schedulingTime.reduce(
      (formated, schudiling) => {},
      {}
    );

    console.log(formatedSchedulingTime);

    return res.status(200).json(availableDays);
  } catch (error) {}
};

export { findSchedules, registerScheduling };

const response = {
  days: [0, 2, 3, 4, 5, 6],
  collaboratorTimes: [
    {
      id: "23423423",
      name: "Alisson",
      lastname: "Alves",
      timesDay: ["08:00", "08:30", "11:00", "11:30"],
    },
    {
      id: "23adas23",
      name: "Andson",
      lastname: "josé",
      timesDay: ["09:00", "10:30", "11:00", "14:30"],
    },
  ],
};
