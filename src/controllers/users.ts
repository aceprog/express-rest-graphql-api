import { PrismaClient, Prisma } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import {isNull, isEmpty} from 'lodash';
import { userValidationSchema } from "../validators/user";

const prisma= new PrismaClient()

export const createUser: RequestHandler =async (req: Request, res: Response) => {

    const userData = req.body
    const {error} = userValidationSchema.validate(userData)
    if(error){
        return res.status(400).json({error: error.details[0].message})
    }
    try{
        const user = await prisma.user.create({
            include: {
                profile: {
                    include: {
                        settings: true
                    }
                },
                
            },
            data: {
                ...userData,
                status: 'ACTIVE',
                profile: {
                    create: {
                        notification_enabled: true,
                        profile_url: req.body.profile_url ?? '',
                    }, 
                }
            }
        })
        res.json(user)
    }catch(e){
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === 'P2002'){
                return res.status(400).json({error:`User with ${e.meta?.target} already exists`}).statusCode
            }
        }
        console.log(e)
        res.status(500).send('Something went wrong while creating a user')
    }
    
    
}

export const updateUser: RequestHandler =async (req: Request, res: Response) => {
    const userId = Number(req.headers.user_id)
    const {error} = userValidationSchema.validate(req.body)
    if(error){
        return res.status(400).json({error: error.details[0].message})
    }
    try{
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...req.body,
            }
        })
        return res.status(201).json(user)
    }catch(e){

        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code==='P2025'){
                return res.status(404).json({error: 'User not found'})
            }
        }
        console.log(e)
        res.status(500).send('Something went wrong while updating a user')
    }
    
}

export const updateProfile: RequestHandler =async (req: Request, res: Response) => {
    const userId = Number(req.params.id)
    try{
        const profile = await prisma.profile.update({
            where: {
                id: userId
            }, 
            data: {
                ...req.body
            }
        })

        return res.status(201).json(profile)
    }catch(e){
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code==='P2025'){
                res.status(400).json({error: 'Profile not found'})
            }
        }
    }
}

export const getUsers: RequestHandler =async (req: Request, res: Response) => {
    try{
        const users = await prisma.user.findMany();
        return res.status(200).json(users)
    }catch(e){
        console.log(e)
        res.status(500).send('Something went wrong')
    }
    
}