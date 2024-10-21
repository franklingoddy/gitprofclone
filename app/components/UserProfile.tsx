import { useTheme } from "next-themes";

 export type UserProfileProps = {
  avatar_url: string;
  username: string;
  bio?: string;
  location?: string;
  public_repos: number;
};

const UserProfile = ({
  avatar_url,
  username,
  bio,
  location,
  public_repos,
}: UserProfileProps) => {
  const { resolvedTheme } = useTheme();
  return (
    <div
      className={`flex flex-col bg-white p-4 rounded-lg shadow-md mt-10 ${
        resolvedTheme === "dark" ? "bg-[#0d1117]" : "bg-white"
      }`}
    >
      <img src={avatar_url} alt={username} className="w-24 h-24 rounded-full" />
      <h1
        className={`text-2xl font-bold mt-2 ${
          resolvedTheme === "dark" ? "text-blue-500" : "text-gray-900"
        }`}
      >
        {username}
      </h1>
      {bio && (
        <p
          className={`mt-2 ${
            resolvedTheme === "dark" ? "text-gray-500" : "text-gray-600"
          }`}
        >
          {bio}
        </p>
      )}
      {location && (
        <p className="mt-2 text-sm text-gray-500">Location: {location}</p>
      )}
      <p className="mt-2 text-sm text-gray-500">
        Public Repositories: {public_repos}
      </p>
    </div>
  );
};

export default UserProfile;