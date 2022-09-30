import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { compare } from 'bcryptjs';

import { prisma } from "../../../prisma";

const secret = process.env.SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  
  const userExists = await prisma.user.findFirst({ where: { email } });
  
  if (!userExists) {
    return res.json({ 
      entity: {
        data: null,
        message: "Senha ou email estão incorretos",
      },
      success: false
    });
  }

  if (!userExists.password) {
    return res.json({ 
      entity: {
        data: null,
        message: "Você não possui uma conta em nosso sistema",
      },
      success: false
    });
  }

  const passwordCompareHash = await compare(password, userExists.password)
  console.log(passwordCompareHash);
  

  if (!passwordCompareHash) {
    console.log('ola');
    
    return res.json({ 
      entity: {
        data: null,
        message: "Senha ou email estão incorretos",
      },
      success: false
    });
  }

  console.log('ola 2');
  
  const token = sign(
    {
      exp: Date.now() + 60 * 60 * 1,
      user_id: userExists.id,
    },
    secret
    );


  return res.status(200).json({ 
    entity: {
      data: {
        user: userExists,
        token
      },
      message: null,
    },
    success: true
  });
}