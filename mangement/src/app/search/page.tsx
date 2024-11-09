"use client";

import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import TaskCard from '@/components/TaskCard';
import UserCard from '@/components/UserCard';
import Footer from "@/components/Footer";
import { useSearchQuery } from '@/state/api';
import { debounce } from "lodash";
import { GripVertical, LayoutList, UserRoundSearch } from 'lucide-react';
import React, { useEffect, useState } from "react";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const {
        data: searchResults,
        isLoading,
        isError,
    } = useSearchQuery(searchTerm, {
        skip: searchTerm.length < 3,
    });

    const handleSearch = debounce(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
        },
        500,
    );

    useEffect(() => {
        return handleSearch.cancel;
    }, [handleSearch.cancel]);

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow p-8">
                <Header name="Search" isSmallText />
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="rounded border p-3 shadow"
                        style={{ width: '320px' }}
                        onChange={handleSearch}
                    />
                </div>
                <div className="p-5">
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>Error occurred while fetching search results.</p>}
                    {!isLoading && !isError && searchResults && (
                        <div>
                            {/* Tasks Section */}
                            {searchResults.tasks && searchResults.tasks.length > 0 && (
                                <>
                                    <h2 className="mb-2 flex items-center space-x-2 dark:bg-dark-secondary dark:border-dark-border dark:text-white">
                                        <LayoutList />
                                        <span>Tasks</span>
                                    </h2>
                                    <div className="flex flex-wrap gap-4 p-4">
                                        {searchResults.tasks.map((task) => (
                                            <TaskCard key={task.id} task={task} />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Projects Section */}
                            {searchResults.projects && searchResults.projects.length > 0 && (
                                <>
                                    <h2 className="mb-2 flex items-center space-x-2 dark:bg-dark-secondary dark:border-dark-border dark:text-white">
                                        <GripVertical />
                                        <span>Projects</span>
                                    </h2>
                                    <div className="flex overflow-x-auto space-x-4 p-4">
                                        {searchResults.projects.map((project) => (
                                            <ProjectCard key={project.id} project={project} />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Users Section */}
                            {searchResults.users && searchResults.users.length > 0 && (
                                <>
                                    <h2 className="mb-2 flex items-center space-x-2 dark:bg-dark-secondary dark:border-dark-border dark:text-white">
                                        <UserRoundSearch />
                                        <span>Users</span>
                                    </h2>
                                    <div className="flex overflow-x-auto space-x-4 p-4">
                                        {searchResults.users.map((user) => (
                                            <UserCard key={user.userId} user={user} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Footer at the bottom */}
            <Footer />
        </div>
    );
};

export default Search;
