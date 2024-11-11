import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET Tasks from the database 
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving Users: ${error.message}` });
  }
};


// get the CognitoId ----
export const getUser = async (req: Request, res: Response): Promise<void> => {

  const { cognitoId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        cognitoId: cognitoId
      },
    });
  
    res.json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving User: ${error.message}` });
  }
};


export const postUser = async(req: Request, res: Response) => {
  try{
    const {
      username,
      cognitoId,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;
    const newUsers = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId
      },
    });
    res.json({message: "User created Successfully", newUsers});
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving Users: ${error.message}` });
  }
};
