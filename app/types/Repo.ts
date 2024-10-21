export type Repo = {
    name: string;
    html_url: string;
    description?: string;
    stargazers_count: number;
    forks_count: number;
};

  export type RepoListProps = {
    repos: Repo[];
  };
  