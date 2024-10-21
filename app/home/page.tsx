"use client";
import { useState } from "react";
import SearchInput from "../components/Searchinput";
import UserProfile from "../components/UserProfile";
import RepoList from "../components/RepoList";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../components/ThemeToggle";
import { Repo } from "../types/Repo";

type User = {
  login: string;
  avatar_url: string;
  bio?: string;
  location?: string;
  public_repos: number;
  repos_url: string;
};
const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [repoMessage, setRepoMessage] = useState<string | null>(null);

  const fetchUserProfile = async (username: string) => {
    setError(null);
    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const userData: User = await userResponse.json();
      setUser(userData);

      const reposResponse = await fetch(userData.repos_url);
      const repoData: Repo[] = await reposResponse.json();
      setRepos(repoData);
    } catch (error: any) {
      setError(error.message);
      setUser(null);
      setRepos([]);
    }
  };
  const fetchRepos = async (username: string, page: number = 1) => {
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=30`
    );
    return reposResponse.json();
  };
  const handleFetchRepos = async () => {
    if (user) {
      setLoading(true);
      try {
        const repoData = await fetchRepos(user.login);
        setRepos(repoData);
        if (repoData.length < 30) {
          setRepoMessage(
            `${user.login} has only ${repoData.length} repositories.`
          );
        } else {
          setRepoMessage(null);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex flex-col items-center mt-5 ">
      <ThemeToggle />
      <SearchInput onSearch={fetchUserProfile} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {user && (
        <UserProfile
          avatar_url={user.avatar_url}
          username={user.login}
          bio={user.bio}
          location={user.location}
          public_repos={user.public_repos}
        />
      )}
      {repos.length > 0 && (
        <>
          <RepoList repos={repos} />
          {repoMessage && <p className="text-red-500 mt-4">{repoMessage}</p>}
          <Button
            type="submit"
            className="text-white bg-red-500 hover:bg-red-400 mt-10 mb-10"
            disabled={loading}
            onClick={handleFetchRepos}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  color="black"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              "Load more"
            )}
          </Button>
          
        </>
      )}
    </div>
  );
};
export default Home;
