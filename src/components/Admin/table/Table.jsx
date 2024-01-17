"use client";
import React, { useMemo, useState } from "react";
import { CSVLink,CSVDownload } from "react-csv";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { FaSortAmountDown ,FaSortAmountUp} from "react-icons/fa";



export default function Table({ label,exportData, tableData,addNew,search }) {
  const data = useMemo(() => tableData, []);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState({});
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");


  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 800,
    ...props
  }) {
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value]);

    return (
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }

  const table = useReactTable({
    data,
    columns:label,
    state: {
      columnVisibility,
      columnOrder,
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="p-10 rounded-lg border ">
      <div className="flex justify-between">
      {search &&  <div>
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 font-lg shadow border border-block"
            placeholder="Search all columns..."
          />
        </div>}

        <div className="flex">
         { exportData? <CSVLink
            className="mx-2  p-2 flex justify-center items-center h-10 bg-[#333] text-white  dark:text-[#333] dark:bg-white shadow-md "
            filename="my-file.csv"
            data={exportData}
          >
            Export to CSV
          </CSVLink>:""}
          {/* <CSVDownload data={exportData} target="_blank"></CSVDownload> */}
          

          <Dropdown
            showArrow
            radius="sm"
            classNames={{
              base: "before:bg-default-200", // change arrow background
              content: "p-0 border-small border-divider bg-background",
            }}
          >
            <DropdownTrigger>
              <button
                variant="bordered"
                className="mx-2  p-2 flex justify-center items-center h-10 bg-[#333] text-white capitalize dark:text-[#333] dark:bg-white"
              >
                columns
              </button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Multiple selection example"
              variant="flat"
              closeOnSelect={false}
              disallowEmptySelection
              selectionMode="multiple"
              className="bg-[#333]"
            >
              {table.getAllLeafColumns().map((column) => {
                return (
                  <DropdownItem key={column.id} className="px-1">
                    <label className="text-white p-2 capitalize">
                      <input
                        {...{
                          type: "checkbox",
                          checked: column.getIsVisible(),
                          className: "hidden",
                          onChange: column.getToggleVisibilityHandler(),
                        }}
                      />
                      {column.getIsVisible() && " ✔ "}
                      {column.id}
                    </label>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
         {addNew && <button
            className="mx-2  p-2 flex justify-center items-center h-10 bg-[#333] text-white capitalize dark:text-[#333] dark:bg-white"
          >
            Add a new
          </button>}
        </div>
      </div>

      <table className="m-4 mx-auto w-[90%]">
        <thead className="rounded-full mx-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="   font-semibold text-base m-10"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none px-4 py-2 uppercase"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <FaSortAmountUp className="inline mx-2"/>,
                        desc: <FaSortAmountDown className="inline mx-2"/>,
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="   ">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center gap-2 mx-auto justify-center mt-6">
        <button
          className="p-2 flex justify-center items-center h-8 bg-[#333] text-white  dark:text-[#333] dark:bg-white shadow-md "
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"Pre <"}
        </button>
        <button
          className="p-2 flex justify-center items-center h-8 bg-[#333] text-white  dark:text-[#333] dark:bg-white shadow-md "
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {"Next >"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-8 text-center"
          />
        </span>
        <select
          className="p-2 flex justify-center items-center h-8 bg-[#333] text-white  dark:text-[#333] dark:bg-white shadow-md "
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
