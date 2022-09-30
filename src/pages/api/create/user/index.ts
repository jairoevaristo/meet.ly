import { hash } from "bcryptjs";
import { prisma } from "../../../../prisma";
import { randomColor } from "../../../../utils/randomColor";

export default async function handler(req, res) {
  const { name, last_name, email, password } = req.body;

  if (!name || !last_name || !email || !password) {
   return res.status(400).json({
      entity: {
        data: null,
        message: "Campos obrigatorios",
      },
      success: true,
    })
  }

  const passwordHash = await hash(password, 8);
  const avatarName = name.charAt(0) + last_name.charAt(0).toUpperCase();

  const user = await prisma.user.create({
    data: {
      name: `${name} ${last_name}`,
      email,
      avatarName,
      colorAvatar: randomColor(),
      password: passwordHash,
    }
  })

  res.status(200).json({
    entity: {
      data: {
        name: user,
        message: null,
      }
    },
    success: true,
  })
}