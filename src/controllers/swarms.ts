import { PrismaClient, Prisma } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import { swarmValidationSchema } from "../validators/swarm";

const prisma = new PrismaClient();
export const createSwarm: RequestHandler =async (req: Request, res:Response) => {
    const swarmData = req.body

    const {error} = swarmValidationSchema.validate(swarmData);
    if (error){
        return res.status(400).json({error: error.details[0].message})
    }

    try{
        const swarm = await prisma.swarm.create({ 
            data: {
                title: '',
                category: '',
                visibility: 'PUBLIC',
                description: '',
                user: {
                    connect: {id: req.body.user_id}
                },
            },
        })
        return res.json(swarm)
    }catch(e: any){
        if (e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code==='P2002'){
                return res.status(400).json({error: `Swarm with ${e.meta?.target} already exists`})
            }
            if(e.code==='P2025'){
                return res.status(404).json({error: 'User associated with swarm not found'})
            }
        }
        console.log(e)
        res.status(500).send('Something went wrong while creating a swarm')
    }
    
}

export const getSwarms: RequestHandler =async (req: Request, res: Response) => {
    const userId = Number(req.headers.user_id)
    try{
        const swarms = await prisma.swarm.findMany({
            where: {
                user_id: userId
            }
        });
        return res.status(200).json(swarms)
    }catch(e){
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code==='P2025'){
                return res.status(404).json({error: 'User not found'})
            }
        }
    }
    
}