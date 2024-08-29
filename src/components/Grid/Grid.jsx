import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import useStore from "../../store/useStore";
import { AG_GRID_LOCALE_ES } from "./locale";
import { useCallback, useRef } from "react";
import { useMemo } from "react";

const Grid = ({ data, columns, onDoubleClick, setRowSelected }) => {
  // Row Data: The data to be displayed.
  const gridRef = useRef(); // Optional - for accessing Grid's API

  const { theme } = useStore();

  //gridOptions autosize
  const gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
    onGridReady: (params) => {
      params.api.sizeColumnsToFit();
    },
  };

  const className =
    theme === "light" ? "ag-theme-quartz" : "ag-theme-quartz-dark";

  const onRowDoubleClicked = (event) => {
    if (onDoubleClick) {
      onDoubleClick(event?.data);
    }
  };

  const sizeToFit = useCallback(() => {
    gridRef?.current?.api.sizeColumnsToFit({
      defaultMinWidth: 100,
    });
  }, []);

  const onGridReady = useCallback(async (params) => {
    sizeToFit();
    window.addEventListener("resize", sizeToFit);
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef?.current?.api.getSelectedRows();
    if (setRowSelected) {
      setRowSelected(selectedRows);
    }
  }, [setRowSelected]);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      cellDataType: false,
    };
  }, []);

  return (
    <div
      className={`h-[400px] md:h-[500px] ${className}`}
      style={{ maxHeight: "100%", minWidth: 270, width: "100%" }}
    >
      <AgGridReact
        gridOptions={gridOptions}
        rowData={data}
        columnDefs={columns}
        localeText={AG_GRID_LOCALE_ES}
        onRowDoubleClicked={onRowDoubleClicked}
        animateRows={true}
        rowSelection="single"
        sizeColumnsToFit
        suppressMenuHide
        ref={gridRef}
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default Grid;
