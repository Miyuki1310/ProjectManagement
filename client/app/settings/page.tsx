import Header from "@/components/ProjectPage/Header";
import React from "react";

const Settings = () => {
  const userSettings = {
    username: "johndoe",
    email: "johndoe@gmail.com",
    teamName: "Development team",
    roleName: "Developer",
  };
  const labelStyles = "block text-sm font-medium dark:text-white";
  const testStyles =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";
  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className={labelStyles}>
            Username
          </label>
          <div className={testStyles}>{userSettings.username}</div>
        </div>
        <div>
          <label htmlFor="email" className={labelStyles}>
            Email
          </label>
          <div className={testStyles}>{userSettings.email}</div>
        </div>
        <div>
          <label htmlFor="username" className={labelStyles}>
            Team
          </label>
          <div className={testStyles}>{userSettings.teamName}</div>
        </div>
        <div>
          <label htmlFor="username" className={labelStyles}>
            Role
          </label>
          <div className={testStyles}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
