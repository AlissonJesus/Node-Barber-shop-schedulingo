import Service from "../models/service.js";
import Scheduling from "../models/scheduling.js";
import { processAvailableDays } from "../utils/scheduling.js";
import { processTimesBySlots } from "../utils/shared.js";
import Store from "../models/store.js";
import Collaborator from "../models/collaborator.js";
import Client from "../models/client.js";

const registerScheduling = async (req, res, next) => {
  const { serviceId, collaboratorId, date, payment } = req.body;
  const { storeId } = req.params;
  const isInvalidDatas = !(serviceId && collaboratorId && date && payment);
  if (isInvalidDatas) {
    return res
      .status(400)
      .json({ message: "Dados enviados estão incompletos" });
  }

  try {
    const storeExists = await Store.countDocuments({ _id: storeId });

    if (!storeExists) {
      return res.status(404).json({ message: "Loja não cadastrada" });
    }

    const collaborator = await Collaborator.findById(collaboratorId).select(
      "recipientId"
    );

    if (!collaborator) {
      return res.status(400).json({ message: "Colaborador não cadastrado" });
    }

    const service = await Service.findById(serviceId).select(
      "commission duration price"
    );
    
    if (!service) {
      return res.status(400).json({ message: "Serviço não cadastrado" });
    }

    const schedulingDate = new Date(date);

    const schedulingRange = new Date(date);
    schedulingRange.setMinutes(schedulingRange.getMinutes() + service.duration);

    const existsScheduling = await Scheduling.findOne({
      $or: [
        {
          $or: [
            {
              startDate: {
                $gte: schedulingDate,
                $lt: schedulingRange,
              },
              collaboratorId,
            },
            {
              endDate: {
                $gt: schedulingDate,
                $lte: schedulingRange,
              },
              collaboratorId,
            },
          ],
        },
        {
          startDate: {
            $lt: schedulingDate,
          },
          endDate: {
            $gt: schedulingRange,
          },
          collaboratorId,
        },
      ],
    }).select("id");

    if (existsScheduling) {
      return res.status(400).json({ message: "Horário já agendado" });
    }

    const clientId = "659571a778d694bc8f309da3"; // variável de requisição
    let transaction;
    if (payment.type === "O") {
      // pagamento realizado
      //const client = await Client.findById(clientId).select("customerId")
      transaction = "123123sada32";
    }

    await Scheduling({
      clientId,
      collaboratorId,
      storeId,
      serviceId,
      commission: service.commission,
      value: service.price,
      transaction,
      startDate: schedulingDate,
      endDate: schedulingRange,
    }).save();

    return res
      .status(201)
      .json({ message: "Agendamento realizado com sucesso" });
  } catch ({ name, message }) {
    if (name === "ValidationError") {
      return res.status(400).json({ message });
    }
    next();
  }
};
const findSchedules = async (req, res) => {
  const { storeId, serviceId, date } = req.body;
  try {

    if (!storeId) {
      return res.status(400).json("");
    }
    // Processar os dias disponíveis
    /*
   const storeFound = await Service.findById(storeId).select("-_id businessHours")

   if(!storeFound) {
    return res.status(400).json({message: "Loja não encontrada"})
   }
   */
    const storeFound = { days: [0, 1, 3, 4, 5, 6] };

    //const availableDays = processAvailableDays(storeFound.days, 7);

    //Buscar os horários dos dias de funcionamento do empresa e serviço
    
    const schedulingTime = {
      service: {
        duration: 60,
        price: 10.00,
        title: "Corte de cabelo",
        photo: "url",
      },
      collaborators: [
        {
          "3223234242342342": {
            name: "Alisson",
            lastName: "Alves",
            photo: "url"
          },
          time: {
            "2024-01-12": [
              "08:30", "10:30", "11:00"
            ],
            "2024-01-13": [
              "08:00", "10:30", "12:00"
            ]
          },
        },
        {
          "3223234242342342": {
            name: "Alon",
            lastName: "Aes",
            photo: "url"
          },
          time: {
            "2024-01-12": [
              "08:30", "12:30", "15:00"
            ],
            "2024-01-13": [
              "08:00", "13:30", "16:00"
            ]
          },
        }
      ]
    }
    
    //tratar para um objeto de resposta
    /*
    const formatedSchedulingTime = schedulingTime.reduce(
      (formated, schudiling) => {},
      {}
    );

    console.log(formatedSchedulingTime);
  */
    return res.status(200).json(schedulingTime);
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
