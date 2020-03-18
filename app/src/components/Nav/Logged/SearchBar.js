import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'
import Select from '../../Select'
import { useContext } from '../../../contexts/Search'

export default function SearchBar() {
  const classes = useStyles()
  const { handlers, filters } = useContext()

  const showCareer = handlers.filterName.value === 'Career' && filters?.careers
  const showCountry = handlers.filterName.value === 'Country' && filters?.countries

  return (
    <>
      <Select
        label='Filter by'
        handler={handlers.filterName}
        options={['Career', 'Country']}
        className={classes.select}
      />
      {showCareer && (
        <Select label='Career' handler={handlers.filter} options={filters.careers} className={classes.select} />
      )}
      {showCountry && (
        <Select label='Country' handler={handlers.filter} options={filters.countries} className={classes.select} />
      )}
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
          {...handlers.search}
        />
      </div>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  select: {
    width: 100,
    marginTop: -16,
    marginLeft: 10
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}))
