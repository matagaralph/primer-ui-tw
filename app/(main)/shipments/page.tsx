"use client";
import { transactions } from "@/data/transactions";
import { DataTable, Table } from "@primer/react/experimental";
import { useState } from "react";

export default function ShipmentsPage() {
  const pageSize = 10;
  const [pageIndex, setPageIndex] = useState(0);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const rows = transactions.slice(start, end);
  return (
    <main className="tw:max-w-7xl tw:mx-auto tw:px-4 tw:pt-8 tw:sm:px-6">
      <Table.Container>
        <DataTable
          aria-labelledby="repositories-default"
          data={rows}
          columns={[
            {
              header: "Transaction ID",
              field: "id",
              rowHeader: true,
              sortBy: "alphanumeric",
            },
            {
              header: "Company",
              field: "company",
              sortBy: "alphanumeric",
            },
            {
              header: "Share",
              field: "share",
            },
            {
              header: "Comission",
              field: "commission",
              sortBy: "alphanumeric",
            },
            {
              header: "Price",
              field: "price",
            },
            {
              header: "Quantity",
              field: "quantity",
            },
            {
              header: "Net amount",
              field: "netAmount",
            },
          ]}
        />
        <Table.Pagination
          aria-label="Pagination for Repositories"
          pageSize={pageSize}
          totalCount={transactions.length}
          onChange={({ pageIndex }) => {
            setPageIndex(pageIndex);
          }}
        />
      </Table.Container>
    </main>
  );
}
