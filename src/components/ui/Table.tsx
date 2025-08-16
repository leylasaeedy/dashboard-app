import React from "react";
import TableMui from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";

type Column<T> = { header: string; accessor: (row: T) => React.ReactNode };

export function Table<T extends object>({
  columns,
  data,
}: {
  columns: Column<T>[];
  data: T[];
}) {
  const router = useRouter();
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "100%",
        overflowX: "auto",
        mx: "auto",
      }}
    >
      <TableMui>
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell key={i}>{col.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              onClick={
                "id" in row
                  ? () => router.push(`/dashboard/users/${row.id}`)
                  : undefined
              }
              key={i}
              hover
            >
              {columns.map((col, j) => (
                <TableCell key={j}>{col.accessor(row)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableMui>
    </TableContainer>
  );
}
