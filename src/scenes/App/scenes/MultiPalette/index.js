import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useQuery, gql } from '@apollo/client';
import { Link } from "gatsby";


const useStyles = makeStyles((theme) => ({
  rightEdgeButton: {
    marginRight: '-12px',
  },
  paletteMoreButton: {
    marginRight: '-10px',
    marginTop: '-10px'
  }
}));


export default function MultiPalette(props) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(gql`
    query GetPalettes {
      palettes {
        id
        name
        colors {
          id
          shades
        }
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const onAddPalette = (event) => {
    window.location = "/app/palettes/new"
  }

  return <>
    {/* App Bar */}
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <h1 className='pl-4 text-xl flex-grow'>All</h1>
        <IconButton edge="start" className={ classes.rightEdgeButton } color="inherit" aria-label="Add Palette" onClick={onAddPalette}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>

    {/* Main palette View */}
    {data.palettes.length === 0 
      ? <p>You have no palettes. Click on '+' to create your first palette!</p>
      : (<main className="p-6 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        
        {/* Palette card */}
        { data.palettes.map(palette => {
          //Ensure that there are at least three colors
          const colors = [...palette.colors];
          if (colors.length === 0)
            colors.push({shades: ['#FFFFFF']})
          
          if (colors.length === 1)
            colors.push(colors[0])

          if (colors.length === 2)
            colors.push(colors[1])


          return <article className="rounded-md shadow-md h-40 border-2 border-grey-300 flex flex-col truncate" key={palette.id}>

            {/* Title and More button */}
            <div className="p-2 flex justify-between">
              <h2 className="text-xl flex-grow"><Link to={`/app/palettes/${palette.id}`}>{palette.name}</Link></h2>
              <IconButton className={ classes.paletteMoreButton } aria-label="More options">
                <MoreVertIcon/>
              </IconButton>
            </div>

            {/* Three palette sample stripes */}
            <div className="flex-grow flex flex-col justify-between">
            {
              colors.slice(0, 3).map(({shades,id}, index) => {
                return <div className="flex" key={id}>
                  {(shades.length === 2
                  ? [
                      shades[0],
                      shades[shades.length-1]
                    ]
                  : [
                      shades[0],
                      shades[shades.length/2],
                      shades[shades.length-1],
                    ]
                  ).map(shade => {
                    return <span className="flex-grow h-5" style={{ backgroundColor: shade }}/>
                  })}
                </div>
              })
            }
            </div>
          </article>
        }) }
      </main>)
    }
  </>
}