import Grid, { GridItem } from 'components/grid';

export default function GridRelations({ grids }) {
  if (!grids) {
    return null;
  }

  return grids.map((grid, index) => (
    <Grid
      key={index}
      model={grid}
      cellComponent={({ cell }) => (
        <GridItem data={cell.item} gridCell={cell} />
      )}
    />
  ));
}
