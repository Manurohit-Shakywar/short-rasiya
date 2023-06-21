import Search from "../services/Search"
import { Request,Response } from "express"


const search=(req:Request,res:Response)=>{

    Search.search(req,res)

}

export default{search}