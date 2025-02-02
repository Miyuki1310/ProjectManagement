import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-3 rounded border p-4 shadow">
      {user.profilePictureUrl && (
        <Image
          src={`https://pm-3s-images.s3.us-east-1.amazonaws.com/${user.profilePictureUrl}`}
          alt={user.username}
          width={32}
          height={32}
          className="h-12 w-12 rounded-full object-cover"
        />
      )}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{user.username}</h3>
        <p className="text-md">{user.cognitoId}</p>
      </div>
    </div>
  );
};

export default UserCard;
