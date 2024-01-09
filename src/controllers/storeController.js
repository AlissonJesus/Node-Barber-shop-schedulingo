import Store from "../models/store.js";
import { distance, point } from "@turf/turf"

const renderStore = async (req, res) => {
  res.json("Gloria a deus vem");
};

const registerStore = async (req, res) => {
  try {
    const payload = req.body;
    const store = await new Store(payload).save();
    
    res.status(201).json(store)
  } catch ({message}) {
    res.status(400).json({message});
  }
};

const findStore = async (req, res) => {
  console.log("Store")
  const {id} = req.params;
  try {
    const storeFound = await Store.findById(id).select("name photo telephone address.city geo.coordinates")
    if(!storeFound) {
      return res.status(404).json({message: "Barberia não encontrada"})
    }
  
    
   // const distance = turf.distance(turf.point(storeFound.geo.coordinates), turf.point([-30.043858, -51.103487]))
   const distanceOfStore = distance(point([-30.038221, -51.114806]), point([-30.043858, -51.103487]))


    return res.status(200).json({...storeFound._doc, distance: distanceOfStore})
  } catch (error) {
    return res.status(500).json({message: "Erro interno do servidor"})
  }
}

export { renderStore, registerStore, findStore };
