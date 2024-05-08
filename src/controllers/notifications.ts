import { Prisma, PrismaClient } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";


const prisma = new PrismaClient();

 export const getUserNotifications: RequestHandler =async (req: Request, res: Response) => {
    const userId = Number(req.headers.user_id)
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                notifications: true
            }
        });
    
        if(!user){
           return res.json({error: 'User not found'})
        }
        return res.status(200).json(user.notifications)
    }catch(e){
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === 'P2025'){
                return res.status(404).json({error: 'User not found'})
            }
        }
        console.log(e)
        res.status(500).send('Something went wrong while getting notifications')
    }
    
}

export const createNotifications: RequestHandler = async (req: Request, res: Response) =>{
    try{
        const notification = prisma.notification.create({
            data: {
                title: '',
                content: '',
                status: 'UNREAD',             
            },
        })
    
        return res.json(notification)
    }catch(e){
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === 'P2002'){
                return res.status(400).json({error: `Notification with ${e.meta?.target} already exists`})
            }
        }
        console.log(e)
        return res.status(500).send('Something went wrong while creating a notification')
    }
}