export const EquipmentColumns = [
    { field: "id", headerName: "ID" },
    {
      field: "type",
      headerName: "Tipo",
      //flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "state",
      headerName: "Estado",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
        field: "owner",
        headerName: "Proprietario",
        flex: 1,
    },
    {
        field: "manufacturer",
        headerName: "Fabricante",
        flex: 1,
    },
    {
        field: "identification",
        headerName: "Indetificação",
        flex: 1,
    },
    {
        field: "serial_number",
        headerName: "Numero de Serie",
        flex: 1,
    },
    {
        field: "created_at",
        headerName: "Adicionado em",
        flex: 1,
      },
      {
        field: "author",
        headerName: "Adicionado por",
        flex: 1,
      },
    
  ];