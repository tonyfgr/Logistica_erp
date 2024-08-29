import * as React from 'react';

//Imports for table building
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//Imports for table containers
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

//Imports for table styling
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function createData(article, price) {
  return { article, price };
}

const rows = [
  {
    article: 'Frozen yoghurt',
    price: 159
  },
  {
    article: 'Ice cream sandwich',
    price: 237
  },
  {
    article: 'Eclair',
    price: 262
  },
  {
    article: 'Cupcake',
    price: 305
  },
  {
    article: 'Gingerbread',
    price: 356
  }
];

//Function for table header filtering (it could be more complex in a future)
function EnhancedTableHeader(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell key="article">
          Artículos
        </TableCell>

        <TableCell key="price" align="right">
          <TableSortLabel
            active={"price" == "price"}
            direction='asc'
            // onClick={createSortHandler}
          >
            Precio
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  )

}

//Function for table title toolbar (it could be more complex in a future)
function EnhancedTableToolBar() {
  return (
    <Toolbar sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
    }}>
      <Typography sx={{
          flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
      >
        Artículos comprados
      </Typography>
    </Toolbar>
  )
}

//Principal function
export default function CompraArticulos() {
  return (
    <Box sx={{width: '50%'}}>
      <Paper sx={{width: '100%', mb: 2}}>

        {/* Table title toolbar */}
        <EnhancedTableToolBar/>

        <TableContainer component={Paper}>

        {/* Table content */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <EnhancedTableHeader/>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.article}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* Article name (principal)*/}
                <TableCell component="th" scope="row">
                  {row.article}
                </TableCell>

                {/* Article elements*/}
                <TableCell align="right">s/.{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
