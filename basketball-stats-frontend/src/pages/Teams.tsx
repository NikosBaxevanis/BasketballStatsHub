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

const Teams: React.FC = () => {
  const navigate = useNavigate();
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

  const { data: teams, isLoading } = useQuery<TeamsResponseType>({
    queryKey: ["teams", tableState],
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

  console.log(teams);

  const table = useReactTable({
    data: teamsData,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <div className="py-8 p-4 bg-white rounded-xl mx-4 mb-4 flex flex-col items-center justify-center gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
        <div className="text-center">
          <h1 className="text-slate-900 text-4xl font-bold mb-2">
            🏀 Basketball Stats Hub
          </h1>
          <p className="text-slate-500 text-lg">
            Your Ultimate Basketball Statistics Dashboard
          </p>
        </div>
        <nav className="flex justify-center gap-6 flex-wrap">
          <button className="nav-btn" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="nav-btn active" onClick={() => navigate("/teams")}>
            Teams
          </button>
          <button className="nav-btn">Players</button>
          <button className="nav-btn">League Stats</button>
        </nav>
      </div>
      <div className="py-8 p-4 bg-white rounded-xl m-4 flex flex-col items-center justify-center gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
        <input
          placeholder="Search teams..."
          value={search}
          onChange={(e) =>
            setTableState((prev) => ({ ...prev, search: e.target.value }))
          }
          style={{ marginBottom: "10px", padding: "5px" }}
        />

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
              <tr key={team.id}>
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

        <div style={{ marginTop: "10px" }}>
          <button
            disabled={page === 1}
            onClick={() => setTableState((prev) => ({ ...prev, page: 1 }))}
          >
            {"<<"}
          </button>
          <button
            disabled={page === 1}
            onClick={() =>
              setTableState((prev) => ({ ...prev, page: prev.page - 1 }))
            }
          >
            {"<"}
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() =>
              setTableState((prev) => ({ ...prev, page: prev.page + 1 }))
            }
          >
            {">"}
          </button>
          <button
            disabled={page === totalPages}
            onClick={() =>
              setTableState((prev) => ({ ...prev, page: totalPages }))
            }
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Teams;
