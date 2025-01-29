"use client";
import ProjectCard from "@/components/ProjectCard";
import Header from "@/components/ProjectPage/Header";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { useSearchQuery } from "@/state/api";
import debounce from "lodash/debounce";
import React from "react";

const Search = () => {
  const [search, setSearch] = React.useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery({ query: search }, { skip: search.length < 3 });
  console.log(searchResults);

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, 500); // explain: debounce the search input to prevent too many requests, each request will be sent after 500ms
  React.useEffect(() => {
    return handleSearch.cancel; // explain: cancel the debounce function when the component is unmounted
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search"
          className="w-1/2 rounded-lg border p-3"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <div className="text-lg font-semibold">Loading...</div>}
        {isError && <div className="text-lg font-semibold">Error</div>}
        {!isLoading && !isError && searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks.length > 0 && (
              <h2 className="mt-7 pb-4 text-2xl font-bold">Tasks</h2>
            )}
            {searchResults.tasks &&
              searchResults.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            {searchResults.projects && searchResults.projects.length > 0 && (
              <h2 className="mt-7 pb-4 text-2xl font-bold">Projects</h2>
            )}
            {searchResults.projects &&
              searchResults.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            {searchResults.users && searchResults.users.length > 0 && (
              <h2 className="mt-7 pb-4 text-2xl font-bold">Users</h2>
            )}
            {searchResults.users &&
              searchResults.users.map((user) => (
                <UserCard key={user.userId} user={user} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
