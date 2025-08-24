import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Team, TeamsResponseType } from "../types";
import { fetchTeams } from "../api/endpoints/teams";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu";
import MainContent from "../components/MainContent";
import Loader from "../components/Loader";
import TeamForm from "../components/TeamForm";
import toast from "react-hot-toast";

const Teams: React.FC = () => {
  const navigate = useNavigate();
  const [openTeamForm, setOpenTeamForm] = useState(false);
  const [tableState, setTableState] = useState({
    page: 1,
    totalPages: 1,
    search: "",
    sortColumn: "name",
    sortOrder: "asc" as "asc" | "desc",
  });

  const { page, totalPages, search, sortColumn, sortOrder } = tableState;

  const columns = useMemo<ColumnDef<Team>[]>(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "founded", header: "Founded" },
      { accessorKey: "championships", header: "Championships" },
      { accessorKey: "wins", header: "Wins" },
      { accessorKey: "defeats", header: "Defeats" },
      { accessorKey: "homeWins", header: "Home Wins" },
      { accessorKey: "homeDefeats", header: "Home Defeats" },
    ],
    []
  );

  const {
    data: teams,
    isLoading,
    isError,
    error,
  } = useQuery<TeamsResponseType>({
    queryKey: ["teams", tableState, openTeamForm],
    queryFn: () =>
      fetchTeams({
        search: tableState.search,
        page: tableState.page,
        limit: 5,
        sort: tableState.sortColumn,
        order: tableState.sortOrder,
      }),
  });

  useEffect(() => {
    if (teams) {
      setTableState((prev) => ({ ...prev, totalPages: teams.pages }));
    }
  }, [teams]);

  const teamsData = teams?.data ?? [];

  const table = useReactTable({
    data: teamsData,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.message || "Failed to load teams");
    }
  }, [isError, error]);

  return (
    <div>
      <HeaderMenu />
      <MainContent>
        {openTeamForm ? (
          <TeamForm closeTeamForm={() => setOpenTeamForm(!openTeamForm)} />
        ) : (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="text-center">
                  <h2 className="text-slate-900 text-2xl font-bold mb-2">
                    EuroLeague Teams Overview
                  </h2>
                  <p className="text-slate-500 text-lg px-4">
                    Explore all EuroLeague teams, their cities, founding years,
                    championships, and season performance. Compare wins,
                    defeats, and home records to see how each team stacks up in
                    the league standings.
                  </p>
                </div>
                <div className="flex justify-between w-full mt-4">
                  <input
                    placeholder="Search teams..."
                    value={search}
                    onChange={(e) =>
                      setTableState((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                    style={{ padding: "5px" }}
                  />
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                    onClick={() => setOpenTeamForm(!openTeamForm)}
                  >
                    Add a Team
                  </button>
                </div>

                <table>
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            onClick={() => {
                              setTableState((prev) => ({
                                ...prev,
                                sortColumn: header.id,
                                sortOrder:
                                  prev.sortColumn === header.id &&
                                  prev.sortOrder === "asc"
                                    ? "desc"
                                    : "asc",
                              }));
                            }}
                          >
                            {header.isPlaceholder ? null : (
                              <>{header.column.columnDef.header}</>
                            )}
                            {sortColumn === header.id
                              ? sortOrder === "asc"
                                ? " 🔼"
                                : " 🔽"
                              : ""}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {teamsData.map((team) => (
                      <tr key={team._id}>
                        <td>{team.name}</td>
                        <td>{team.city}</td>
                        <td>{team.founded}</td>
                        <td>{team.championships}</td>
                        <td>{team.wins}</td>
                        <td>{team.defeats}</td>
                        <td>{team.homeWins}</td>
                        <td>{team.homeDefeats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div
                  style={{ marginTop: "10px" }}
                  className="flex items-center justify-center gap-4 pt-4"
                >
                  <button
                    disabled={page === 1}
                    onClick={() =>
                      setTableState((prev) => ({ ...prev, page: 1 }))
                    }
                    className="pagination-button"
                  >
                    {"<<"}
                  </button>
                  <button
                    disabled={page === 1}
                    onClick={() =>
                      setTableState((prev) => ({
                        ...prev,
                        page: prev.page - 1,
                      }))
                    }
                    className="pagination-button"
                  >
                    {"<"}
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={() =>
                      setTableState((prev) => ({
                        ...prev,
                        page: prev.page + 1,
                      }))
                    }
                    className="pagination-button"
                  >
                    {">"}
                  </button>
                  <button
                    disabled={page === totalPages}
                    onClick={() =>
                      setTableState((prev) => ({ ...prev, page: totalPages }))
                    }
                    className="pagination-button"
                  >
                    {">>"}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </MainContent>
    </div>
  );
};

export default Teams;
