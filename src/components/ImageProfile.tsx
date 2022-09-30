import Image from "next/image";

type ImageProfileProps = {
  image: string | null
  colorAvatar: string | null;
  avatar_name: string | null;
}

export function ImageProfile({ image, colorAvatar, avatar_name }: ImageProfileProps) {
  if (image && !colorAvatar) {
    return (
      <Image 
        className="rounded-md" 
        src={image} 
        alt="avatar github"
        height={40}
        width={40}
      />
    )
  }

  return (
    <div
      className="h-10 w-10 rounded-md flex items-center justify-center"
      style={{ backgroundColor: `#${colorAvatar}` }}
    >
      <span className="text-md font-semibold text-white">
        {avatar_name}
      </span>
    </div>
  )
}
