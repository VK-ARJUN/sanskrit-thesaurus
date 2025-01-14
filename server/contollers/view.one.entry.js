import Verb from "../schema/verb.schema.js";

export const ViewOneEntry=async(req,res)=>{
    try{
        const {id}=req.params;
        const entry=await Verb.findById(id);

        if(!entry){
            return res.status(404).json({message:"entry Not Found"})
        }

        res.json(entry)
    }

    catch(e){
        console.error(e);
    }
}