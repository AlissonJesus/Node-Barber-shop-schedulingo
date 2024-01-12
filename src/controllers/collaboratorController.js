import Collaborator from "../models/collaborator.js";
import CollaboratorService from "../models/relationship/collaborator_servico.js";
import Store_Collaborator from "../models/relationship/store_Collaborator.js";
import Store from "../models/store.js";
import createSessionConnect from "../utils/transactionSession.js";

const registerCollaborator = async (req, res) => {
  const payload = req.body;

  try {
    const existingStore = await Store.findById(payload.storeId);
    if (!existingStore) {
      return res.status(404).json({ message: "Loja não cadastrada" });
    }

    const existingCollaborator = await Collaborator.findOne({
      $or: [{ email: payload.email }, { telephone: payload.telephone }],
    });

    if (existingCollaborator) {
      return res.status(400).json({ message: "Colaborador já cadastrado" });
    }

    const registeredCollaborator = await Collaborator.create(payload);

    if (!registeredCollaborator) {
      return res.status(400).json({ message: "Erro ao cadastrar colaborador" });
    }

    const storeRelationship = await Store_Collaborator.create({
      storeId: payload.storeId,
      collaboratorId: registeredCollaborator.id,
      status: payload.bond,
    });

    if (!storeRelationship) {
      await Collaborator.deleteOne({ _id: registeredCollaborator.id });
      return res.status(400).json({ message: "Erro ao cadastrar colaborador" });
    }

    const services = payload.services.map((serviceId) => ({
      collaboratorId: registeredCollaborator.id,
      serviceId,
    }));

    const servicesRelationship = await CollaboratorService.create(services);
    if (!servicesRelationship) {
      await Collaborator.deleteOne({ _id: registeredCollaborator.id });
      await Store_Collaborator.deleteOne({
        _id: registeredCollaborator.id,
        storeId: payload.storeId,
      });
      return res.status(400).json({ message: "Erro ao cadastrar colaborador" });
    }

    return res.status(200).json(registeredCollaborator);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
  }
};

export { registerCollaborator };
