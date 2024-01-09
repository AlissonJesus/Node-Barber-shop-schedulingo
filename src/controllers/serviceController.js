import Service from "../models/service.js";
import { removePicture, uploadPicture } from "../services/storage.js";
import createPathString from "../utils/pathMedia.js";
import File from "../models/file.js";

const registerService = async (req, res) => {
  const payload = req.body;
  try {
    const service = new Service(payload);
    const registeredService = await service.save();

    const file = req.file;
    if (file) {
      const path = createPathString(
        file.originalname,
        payload.storeId,
        "service"
      );
      const { url, picturePath } = await uploadPicture(file, path);

      // Atualiza o serviço diretamente sem realizar uma nova consulta
      registeredService.photo = url;
      await registeredService.save();

      const fileDoc = await File.create({
        referenceId: registeredService._id,
        model: "Service",
        path: picturePath,
      });
    }

    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const removeServicePhoto = async (req, res) => {
  const id = req.params.id;
  //const filePath = "service/65932654782e7c44c2bfe3f7/1704236943046.jpeg"
  const service = await Service.findByIdAndDelete(id);
  await File.findOneAndDelete({ referenceId: id, model: "Service" });
  //removePicture(filePath)
  res.status(200).json("service");
};

const removeService = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Service.updateOne(
      { _id: id },
      { $set: { status: "E" } }
    );
    if (result === 0) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }
    return res.status(200).json({ message: "Serviço removido com sucesso" });
  } catch (error) {
    res.status(500).json(error);
    // res.status(500).json("Erro interno do servidor");
  }
};

const findServiceByStore = async (req, res) => {
  const { storeId } = req.params;
  console.log(storeId);
  try {
    const servicesFound = await Service.find({
      storeId,
      status: { $ne: "E" },
    }).select("_id title");
    const formattedServices = servicesFound.map(
      ({ _id: id, title: label }) => ({
        id,
        label,
      })
    );
    return res.status(200).json(formattedServices);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export {
  findServiceByStore,
  registerService,
  removeService,
  removeServicePhoto,
};
