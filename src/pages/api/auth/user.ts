import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma";

const secret = process.env.SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: 'Not provider header authorization' })
  }

  const [_, token] = authorization.split(" ");

  try {
    const { user_id } = verify(token, secret) as any;
    const user = await prisma.user.findFirst({
      where: { 
        id: user_id 
      },
      select: {
        id: true,
        image: true,
        email: true,
        name: true,
        colorAvatar: true,
        avatarName: true,
      }
    })
    
    return res.status(200).json({
      entity: {
        data: {
          ...user
        }
      },
      sucess: true
    });
  } catch (error) {
    return res.status(401).json({ message: 'User not authorization' })
  }
}