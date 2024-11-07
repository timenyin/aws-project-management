export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200 font-cutive-mono";

// Ensure you add the custom class 'font-cutive-mono' in your global CSS:

export const dataGridSxStyles = (isDarkMode: boolean) => {
    return {
      "& .MuiDataGrid-columnHeaders": {
        color: `${isDarkMode ? "#e5e7eb" : ""}`,
        fontFamily: `"Cutive Mono", monospace`,
        '& [role="row"] > *': {
          backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
          borderColor: `${isDarkMode ? "#2d3135" : ""}`,
          fontFamily: `"Cutive Mono", monospace`,
        },
      },
      "& .MuiIconButton-root": {
        color: `${isDarkMode ? "#fff" : ""}`, // Ensure white color in dark mode
      },
      "& .MuiTablePagination-root": {
        color: `${isDarkMode ? "#a3a3a3" : ""}`,
      },
      "& .MuiTablePagination-selectIcon": {
        color: `${isDarkMode ? "#a3a3a3" : ""}`,
      },
      "& .MuiDataGrid-cell": {
        border: "none",
        fontFamily: `"Cutive Mono", monospace`,
      },
      "& .MuiDataGrid-row": {
        borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "e5e7eb"}`,
      },
      "& .MuiDataGrid-withBorderColor": {
        borderColor: `${isDarkMode ? "#2d3135" : "e5e7eb"}`,
      },
    };
  };
  
  