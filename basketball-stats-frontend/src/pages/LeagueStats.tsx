import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LeagueLeadersResponseType,
  LeagueLeaderType,
  LeagueStatsType,
} from "../types";
import {
  fetchLeagueLeaders,
  fetchLeagueStats,
} from "../api/endpoints/dashboard";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu";
import MainContent from "../components/MainContent";
import StatCard from "../components/StatCard";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const statsIndex = [
  "Points per Game (PPG)",
  "Rebounds per Game (RPG)",
  "Assists per Game (APG)",
  "Field Goal Percentage (FGP)",
  "Three-Point Percentage (TPP)",
  "Free Throw Percentage (FTP)",
];

const isPercentageValue = (index: number): boolean => {
  return index > 2;
};

const LeagueStats: React.FC = () => {
  const { data: leaders, isLoading: isLoadingLeaders } =
    useQuery<LeagueLeadersResponseType>({
      queryKey: ["league-leaders"],
      queryFn: fetchLeagueLeaders,
      staleTime: 1000 * 60, // 1 minute cache
    });

  const leadersData = useMemo(
    () => (leaders ? Object.values(leaders) : []),
    [leaders]
  );

  const { data, isLoading, isError, error } = useQuery<LeagueStatsType>({
    queryKey: ["league-stats"],
    queryFn: fetchLeagueStats,
    staleTime: 1000 * 60, // 1 minute cache
  });

  const columns = useMemo<ColumnDef<LeagueLeaderType>[]>(
    () => [
      {
        header: "Category",
        accessorFn: (_row, index) => statsIndex[index],
        id: "category",
      },
      { header: "Leader", accessorFn: (row) => row.leader, id: "leader" },
      {
        header: "Value",
        accessorFn: (row, index) =>
          isPercentageValue(index) ? `${row.value}%` : row.value,
        id: "value",
      },
      { header: "Team", accessorFn: (row) => row.team, id: "team" },
    ],
    [statsIndex]
  );

  const { leagueAPG, leaguePPG, leagueRPG, leagueTOPG, leagueSPG, leagueBPG } =
    data ?? {};

  const stats = [
    { text: "League Average PPG (Points per Game)", value: leaguePPG },
    { text: "League Average APG (Assists per Game)", value: leagueAPG },
    { text: "League Average RPG (Rebounds per Game)", value: leagueRPG },
    { text: "League Average TOPG (Turnovers per Game)", value: leagueTOPG },
    { text: "League Average SPG (Steals per Game)", value: leagueSPG },
    { text: "League Average BPG (Blocks per Game)", value: leagueBPG },
  ];

  const table = useReactTable({
    data: leadersData,
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
      <MainContent className="gap-8">
        {isLoading || isLoadingLeaders ? (
          <Loader />
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-slate-900 text-2xl font-bold mb-2">
                Euroleague Basketball Stats & Leaders
              </h2>
              <p className="text-slate-500 text-lg">
                Discover the league’s averages, top performers, and key metrics
                across points, assists, rebounds, shooting efficiency, steals,
                and blocks.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 w-full">
              {stats.map((stat) => {
                const { text, value } = stat;
                return (
                  <StatCard
                    key={text}
                    text={text}
                    value={value?.toFixed(1).toString() ?? ""}
                  />
                );
              })}
            </div>

            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <>{header.column.columnDef.header}</>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-3 py-2 border-b border-gray-200 text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </MainContent>
    </div>
  );
};

export default LeagueStats;
