import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Player, PlayersResponseType, Team, TeamsResponseType } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu";
import { fetchPlayers } from "../api/endpoints/players";
import MainContent from "../components/MainContent";

const Players: React.FC = () => {
  const navigate = useNavigate();
  const [tableState, setTableState] = useState({
    page: 1,
    totalPages: 1,
    search: "",
    sortColumn: "name",
    sortOrder: "asc" as "asc" | "desc",
  });

  const { page, totalPages, search, sortColumn, sortOrder } = tableState;

  const columns = useMemo<ColumnDef<Player>[]>(
    () => [
      {
        header: "Player",
        accessorKey: "name",
      },
      {
        header: "Team",
        accessorFn: (row) => row?.team ?? "N/A",
        id: "team",
      },
      {
        header: "Position",
        accessorKey: "position",
      },
      {
        header: "PTS",
        accessorKey: "points",
      },
      {
        header: "AST",
        accessorKey: "assists",
      },
      {
        header: "REB",
        accessorKey: "rebounds",
      },
      {
        header: "STL",
        accessorKey: "steals",
      },
      {
        header: "BLK",
        accessorKey: "blocks",
      },
      {
        header: "TO",
        accessorKey: "turnovers",
      },
      {
        header: "MIN",
        accessorKey: "minutesPlayed",
      },
      {
        header: "FG%",
        accessorFn: (row) =>
          row.fieldGoalsAttempted
            ? row.fieldGoalsMade / row.fieldGoalsAttempted // numeric value for sorting
            : 0,
        cell: (info) =>
          info.getValue() !== 0
            ? `${(info.getValue() * 100).toFixed(1)}%`
            : "0%",
        id: "fgPercent",
        sortingFn: "basic", // optional, default numeric sorting
      },
      {
        header: "3PT%",
        accessorFn: (row) =>
          row.threePointsAttempted
            ? row.threePointsMade / row.threePointsAttempted
            : 0,
        cell: (info) =>
          info.getValue() !== 0
            ? `${(info.getValue() * 100).toFixed(1)}%`
            : "0%",
        id: "threePtPercent",
        sortingFn: "basic",
      },
      {
        header: "FT%",
        accessorFn: (row) =>
          row.freeThrowsAttempted
            ? row.freeThrowsMade / row.freeThrowsAttempted
            : 0,
        cell: (info) =>
          info.getValue() !== 0
            ? `${(info.getValue() * 100).toFixed(1)}%`
            : "0%",
        id: "ftPercent",
        sortingFn: "basic",
      },
    ],
    []
  );

  const { data: players, isLoading } = useQuery<PlayersResponseType>({
    queryKey: ["players", tableState],
    queryFn: () =>
      fetchPlayers({
        search: tableState.search,
        page: tableState.page,
        limit: 5,
        sort: tableState.sortColumn,
        order: tableState.sortOrder,
      }),
  });

  useEffect(() => {
    if (players) {
      setTableState((prev) => ({ ...prev, totalPages: players.pages }));
    }
  }, [players]);

  const playersData = useMemo(() => players?.data ?? [], [players]);

  const table = useReactTable({
    data: playersData,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true, // since your sorting is server-side
  });

  return (
    <div>
      <HeaderMenu />
      <MainContent>
        <div className="flex justify-start w-full">
          <input
            placeholder="Search players..."
            value={search}
            onChange={(e) =>
              setTableState((prev) => ({ ...prev, search: e.target.value }))
            }
            style={{ padding: "5px" }}
          />
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {" "}
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 py-2 border-b border-gray-200 text-sm"
                  >
                    {" "}
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}{" "}
                  </td>
                ))}{" "}
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
            onClick={() => setTableState((prev) => ({ ...prev, page: 1 }))}
            className="pagination-button"
          >
            {"<<"}
          </button>
          <button
            disabled={page === 1}
            onClick={() =>
              setTableState((prev) => ({ ...prev, page: prev.page - 1 }))
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
              setTableState((prev) => ({ ...prev, page: prev.page + 1 }))
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
      </MainContent>
    </div>
  );
};

export default Players;
