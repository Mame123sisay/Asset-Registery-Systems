import React from "react";

export default function AssetFilter({
  filters,
  setFilters,
  fetchAssets,
  setPage,
  page,
  pages,
}) {
  function clearFilters() {
    setFilters({
      serialNumber: "",
      model: "",
      type: "",
      ramGB: "",
      departmentName: "",
      userFullname: "",
      condition: "",
    });

    setPage(1);
  }

  return (
    <>
      {/* Filter Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Search & Filters
            </h3>

            <p className="text-sm text-gray-500">
              Search assets by serial number, model, department, owner or
              specifications.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Serial Number"
            value={filters.serialNumber}
            onChange={(e) =>
              setFilters({
                ...filters,
                serialNumber: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="Model"
            value={filters.model}
            onChange={(e) =>
              setFilters({
                ...filters,
                model: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          <select
            value={filters.type}
            onChange={(e) =>
              setFilters({
                ...filters,
                type: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Asset Type</option>
            <option value="Laptop">Laptop</option>
            <option value="Desktop">Desktop</option>
          </select>

          <input
            type="number"
            placeholder="RAM (GB)"
            value={filters.ramGB}
            onChange={(e) =>
              setFilters({
                ...filters,
                ramGB: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="Department"
            value={filters.departmentName}
            onChange={(e) =>
              setFilters({
                ...filters,
                departmentName: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="Assigned User"
            value={filters.userFullname}
            onChange={(e) =>
              setFilters({
                ...filters,
                userFullname: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            value={filters.condition}
            onChange={(e) =>
              setFilters({
                ...filters,
                condition: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Condition</option>
            <option value="New">New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>

        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-end gap-3 mt-6">

          <button
            onClick={() => {
              setPage(1);
              fetchAssets();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow transition cursor-pointer"
          >
            Apply Filters
          </button>

          <button
            onClick={clearFilters}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg shadow transition cursor-pointer"
          >
            Clear Filters
          </button>

        </div>
      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center gap-3 mb-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {page} of {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </>
  );
}