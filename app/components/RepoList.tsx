import { useTheme } from 'next-themes';
import {  RepoListProps } from '../types/Repo';


  const RepoList = ({ repos }: RepoListProps) => {
    const { resolvedTheme } = useTheme();
    return (
      <div className= "mt-4 flex flex-col items-center">
        <h2 className="text-xl font-bold">Repositories</h2>
        <ul className="space-y-4">
          {repos.map((repo) => (
            <li key={repo.name} className={`bg-white p-4 rounded-lg shadow-md ${
                   resolvedTheme === "dark" ? "bg-[#0d1117]" : "bg-white"
            }`}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold">
                {repo.name}
              </a>
              <p className="text-gray-700">{repo.description}</p>
              <div className="text-sm text-gray-500 mt-2">
                ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RepoList;