import Collaborator from "../models/collaborator.js";
import createSessionConnect from "../utils/transactionSession.js";

const registerCollaborator = async (req, res) => {
  const payload = req.body;
  const sessionConnect = createSessionConnect()

  try {
    const existingCollaborator = await Collaborator.findOne({
      $or: [
        {email: payload.email},
        {telephone: payload.telephone}
      ]
    })

    if(existingCollaborator) {
      return res.status(400).json({message: "Colaborador já cadastrado"})
    }

    // criar um recebedor no gatway
    const session = sessionConnect.init()

    const { id } = await (new Collaborator(payload)).save();

    
    return res.status(200).json(id);
  } catch (error) {
    if (error.name === 'ValidationError') {
        return res.status(400).json({message: error.message})
    }
    return res.status(500).json(error.message);
  } finally {
    session.endSession()
  }
};

export { registerCollaborator };
