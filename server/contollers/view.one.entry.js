import Verb from "../schema/verb.schema.js";
import Lookup from "../schema/lookup.schema.js";

export const ViewOneEntry=async(req,res)=>{
    try{
        const {id}=req.params;
        const entry=await Verb.findById(id);

        if(!entry){
             entry=await Lookup.findById(id);
        }

        res.json(entry)
    }

    catch(e){
        console.error(e);
    }
}